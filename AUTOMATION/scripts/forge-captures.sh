#!/usr/bin/env bash
# forge-captures.sh — regarder ce qu'on vient de construire, au lieu de le supposer.
#
# Playbook 05 §2. Capture chaque page en 360x640 (Android d'entrée de gamme) et en
# 1280x800, en thème sombre et clair, plus une passe prefers-reduced-motion, et relève
# les erreurs de console.
#
#   ./AUTOMATION/scripts/forge-captures.sh                      # build + start + /
#   ./AUTOMATION/scripts/forge-captures.sh / /ecosystem /roadmap
#   BASE=http://localhost:3000 ./AUTOMATION/scripts/forge-captures.sh / /caisse
#
# Les captures vont dans le répertoire temporaire de la session, jamais dans le dépôt.
set -uo pipefail

SORTIE="${SORTIE:-${TMPDIR:-/tmp}/forge-captures-$(date +%H%M%S)}"
BASE="${BASE:-}"
CHEMINS=("$@")
[ ${#CHEMINS[@]} -eq 0 ] && CHEMINS=("/")

# Chromium est préinstallé dans le conteneur ; on ne télécharge jamais rien.
CHROME="$(ls -d /opt/pw-browsers/chromium*/chrome-linux/chrome 2>/dev/null | head -1)"
if [ -z "$CHROME" ]; then
  echo "⚠️  Aucun Chromium trouvé sous /opt/pw-browsers."
  echo "    Je ne peux pas capturer : je le DIS, je ne le devine pas (playbook 05 §2)."
  exit 2
fi

if ! node -e "require.resolve('playwright')" 2>/dev/null && ! node -e "require.resolve('playwright-core')" 2>/dev/null; then
  echo "⚠️  Ce dépôt n'a ni playwright ni playwright-core dans node_modules."
  echo "    Lance d'abord 'npm ci' dans un dépôt qui en dépend, ou capture depuis celui-là."
  exit 2
fi

SERVEUR=""
if [ -z "$BASE" ]; then
  echo "→ npm run build"
  npm run build >"$SORTIE.build.log" 2>&1 || { echo "❌ build en échec — voir $SORTIE.build.log"; exit 1; }
  echo "→ npm run start (port 3100)"
  PORT=3100 npm run start >"$SORTIE.serve.log" 2>&1 &
  SERVEUR=$!
  BASE="http://localhost:3100"
  for _ in $(seq 1 40); do
    curl -sf -o /dev/null "$BASE" && break
    sleep 1
  done
fi
trap '[ -n "$SERVEUR" ] && kill "$SERVEUR" 2>/dev/null' EXIT

mkdir -p "$SORTIE"
BASE="$BASE" SORTIE="$SORTIE" CHROME="$CHROME" CHEMINS="${CHEMINS[*]}" node - <<'JS'
const path = require('path');
let pw;
try { pw = require('playwright'); } catch { pw = require('playwright-core'); }

const { BASE, SORTIE, CHROME } = process.env;
const chemins = process.env.CHEMINS.split(' ').filter(Boolean);

// 360x640 : le téléphone de la doctrine. 1280x800 : l'écran sur lequel on code,
// et qui ment sur tout le reste.
const ecrans = [
  { nom: 'tel-360', viewport: { width: 360, height: 640 }, deviceScaleFactor: 2, isMobile: true },
  { nom: 'bureau-1280', viewport: { width: 1280, height: 800 } },
];
const themes = ['dark', 'light'];

(async () => {
  const navigateur = await pw.chromium.launch({ executablePath: CHROME });
  let erreurs = 0;

  for (const ecran of ecrans) {
    for (const theme of themes) {
      for (const motion of ['no-preference', 'reduce']) {
        // La passe reduced-motion ne se fait qu'une fois par écran : c'est le CSS
        // qu'on vérifie, pas le thème.
        if (motion === 'reduce' && theme !== 'dark') continue;

        const ctx = await navigateur.newContext({
          ...ecran,
          colorScheme: theme,
          reducedMotion: motion,
          locale: 'fr-FR',
        });
        const page = await ctx.newPage();
        const suffixe = motion === 'reduce' ? '-reduced-motion' : '';
        const journal = [];
        page.on('console', (m) => m.type() === 'error' && journal.push(m.text()));
        page.on('pageerror', (e) => journal.push(String(e)));

        for (const chemin of chemins) {
          const url = BASE.replace(/\/$/, '') + chemin;
          const nom = chemin.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'accueil';
          const fichier = path.join(SORTIE, `${nom}.${ecran.nom}.${theme}${suffixe}.png`);
          try {
            // networkidle, pas domcontentloaded : une page Next n'est pas hydratée
            // au DOMContentLoaded, et une capture prise trop tôt ne montre rien.
            await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
            await page.screenshot({ path: fichier, fullPage: true });
            console.log(`  ✅ ${path.basename(fichier)}`);
          } catch (e) {
            erreurs++;
            console.log(`  ❌ ${url} (${ecran.nom}/${theme}${suffixe}) : ${e.message.split('\n')[0]}`);
          }
        }
        if (journal.length) {
          erreurs += journal.length;
          console.log(`  ⚠️  ${journal.length} erreur(s) de console en ${ecran.nom}/${theme}${suffixe} :`);
          for (const l of journal.slice(0, 5)) console.log(`      ${l.split('\n')[0].slice(0, 160)}`);
        }
        await ctx.close();
      }
    }
  }

  await navigateur.close();
  console.log(`\nCaptures dans ${SORTIE}`);
  console.log(erreurs === 0
    ? '✅ Aucune erreur de console, aucune page en échec. Maintenant REGARDE les captures.'
    : `❌ ${erreurs} problème(s) relevé(s) — à corriger avant de dire que c'est propre.`);
  process.exit(erreurs === 0 ? 0 : 1);
})();
JS
