# 🔁 Playbook — Loop Projet (une session dédiée, un seul dépôt)

> Chaque dépôt de Steeve a sa propre Routine. Quand la tienne se déclenche, **tu ne
> t'occupes que d'un seul projet.** Pas de rotation, pas de partage d'attention.
> Le nom du projet est dans le prompt qui t'a réveillé.
>
> Prérequis : avoir lu `CLAUDE.md` et `AUTOMATION/playbooks/00-protocole-forge.md`.

---

## ⚠️ Règle de coexistence — à lire avant tout

Tu n'es pas seule. Une dizaine de sessions sœurs tournent en parallèle ce matin, chacune
sur son propre dépôt, et **toutes écrivent dans `forge-afrika`.** Sans discipline, elles
se marchent dessus et la moitié du travail est perdue en conflits.

D'où le partage strict des fichiers. Soit `<id>` l'identifiant de ton projet dans
`AUTOMATION/registry.json`.

**Tu écris uniquement dans tes fichiers à toi :**

| Fichier | Contenu |
|---|---|
| `AUTOMATION/rapports/<id>/AAAA-MM-JJ.md` | ton rapport du jour |
| `AUTOMATION/etat/projets/<id>.json` | ta mémoire d'un jour à l'autre |
| `AUTOMATION/questions/<id>.md` | tes questions à Steeve |

**Tu ne touches JAMAIS aux fichiers partagés :**

`AUTOMATION/rapports/JOURNAL.md` · `AUTOMATION/QUESTIONS.md` ·
`AUTOMATION/etat/rotation.json` · `AUTOMATION/etat/sante.json` · `AUTOMATION/registry.json`

Ces cinq-là appartiennent au **Digest Quotidien** (playbook 03), qui passe après tout le
monde et agrège. Tu les **lis** — surtout `QUESTIONS.md`, où Steeve répond — mais tu n'y
écris pas. Si tu veux corriger le registre, tu l'écris dans ton rapport ; le digest le
reprendra.

**Ta branche dans `forge-afrika` :** `claude/loop-<id>-<AAAA-MM-JJ>`. Une par projet et
par jour, donc aucune collision. PR draft.

---

## Étape 0 — Reprendre ton fil (5 min)

```bash
cd /home/user/forge-afrika
jq -r '.projets[] | select(.id=="<id>")' AUTOMATION/registry.json   # ta fiche
cat AUTOMATION/etat/projets/<id>.json 2>/dev/null                   # où tu en étais
ls -t AUTOMATION/rapports/<id>/*.md 2>/dev/null | head -2            # tes derniers rapports
cat AUTOMATION/questions/<id>.md 2>/dev/null                         # tes questions ouvertes
grep -A5 -i "<id>\|<nom du projet>" AUTOMATION/QUESTIONS.md          # réponses de Steeve
```

**Si Steeve a répondu à une de tes questions, c'est ta priorité absolue du jour.**
Applique sa décision, même si cela veut dire défaire une hypothèse précédente.

### ⚠️ Lis TOUTES les PR ouvertes du dépôt cible, pas seulement les tiennes

**C'est l'étape la plus vite bâclée, et elle coûte des journées entières.**
Le 2026-09-07, une session a passé sa matinée à réparer les tests de TAAMA et à lui
ajouter une CI. Le travail était bon. Il était aussi **déjà fait**, dans une PR ouverte
depuis cinq jours, verte, plus complète — elle corrigeait en plus les quatre erreurs de
lint que la session avait jugées trop risquées. Toute la matinée est partie à la poubelle
parce que personne n'avait regardé la liste des PR ouvertes.

```
list_pull_requests(owner, repo, state="open")   # TOUTES, pas les tiennes
```

Pour chacune, avant de décider quoi que ce soit : que touche-t-elle ? Est-elle verte ?
Attend-elle simplement une fusion ?

- **Une PR verte qui attend depuis des jours n'est pas un obstacle : c'est le travail
  déjà fait.** Le signaler à Steeve vaut mieux que de le refaire.
- Si ton chantier du jour recoupe une PR ouverte, **change de chantier** ou reprends la
  sienne. Ne construis jamais un doublon.
- Une PR ancienne et rouge, en revanche, est un vrai chantier : reprends-la.

Vérifie ensuite tes PR encore ouvertes — sur ton dépôt cible **et** sur `forge-afrika`.
Une PR draft rouge ou en conflit se reprend **avant** d'ouvrir un nouveau chantier.
Une PR qui traîne rouge une semaine est un échec du système.

---

## Étape 1 — Attacher et comprendre le dépôt (10 min)

```
add_repo(owner="dosteeve2-hash", repo="<nom-du-repo>")
```

N'appelle pas `curl` ni `git ls-remote` avant : sur un dépôt privé ils renvoient 404 même
quand l'accès existe. Appelle `add_repo` directement, il te dira la vérité.

Clone-le ensuite dans un répertoire de travail, puis **identifie son vrai tronc** :

```bash
git remote show origin | grep -i 'head branch'
git branch -r
```

⚠️ **Ne suppose jamais `main`.** Sur `forge-afrika`, la branche par défaut est
`docs/readme-premium`, gelée depuis juin, alors que le tronc vivant est `master`.
Ce piège a déjà coûté une refonte complète. Si tu trouves plusieurs troncs divergents
sur ton dépôt, c'est une trouvaille de niveau 1 : signale-la en tête de ton rapport.

Lis ensuite, dans cet ordre : le `README`, le `CLAUDE.md` du projet s'il existe, la
spec pointée par le champ `spec` de ta fiche, les issues ouvertes, les 20 derniers commits.

---

## Étape 2 — Diagnostiquer (10 min)

```bash
/home/user/forge-afrika/AUTOMATION/scripts/forge-scan.sh <chemin-du-clone>
```

Le scan te donne vitalité, structure, sécurité et conformité doctrine en JSON.
Complète-le à la main sur ce que le scan ne voit pas :

- Le projet **build-t-il** ? Les tests passent-ils ? Y en a-t-il ?
- La CI est-elle verte sur le tronc ?
- Le déploiement de production répond-il ? (URL dans ta fiche — si `curl` est bloqué
  par le proxy, utilise `WebFetch`, ne conclus jamais à une panne sur un code 000.)
- Des secrets dans l'historique ? C'est le seul motif de tout arrêter pour corriger.

Puis pose-toi **la question FORGE**, celle qui justifie ta session :

> *Ce projet, tel qu'il est aujourd'hui, sert-il l'ambition inscrite dans sa fiche —
> et à travers elle, la Phase 1 de FORGE Afrika ?*

Si la réponse est non, **c'est ça le chantier du jour.** Pas les dépendances à jour.

---

## Étape 3 — Un chantier, fini le jour même

Tu as une session entière pour un seul projet. Utilise-la pour livrer **une chose
finie**, pas trois choses commencées. Le chantier doit être :

- **terminé aujourd'hui** — pas de demi-fonctionnalité poussée,
- **visible** — Steeve doit voir la différence, pas seulement la lire,
- **aligné** sur la doctrine terrain ou la ROADMAP.

Grille de choix, dans l'ordre de priorité de `00-protocole-forge.md §5` :

| Si tu observes… | Le chantier du jour est… |
|---|---|
| Secret committé, prod HS, faille | Le corriger. Immédiatement. Rien d'autre. |
| Build ou CI rouge | Le réparer. |
| Bug fonctionnel sur un produit en prod | Le corriger. |
| Pas de tests du tout | Poser le socle de test + couvrir le cœur métier. |
| Pas offline-first alors que c'est un outil terrain | Ajouter cache local + file de sync. |
| Pas de français / pas de XOF | Ajouter i18n FR + formatage FCFA. |
| Lourd ou cassé sur mobile | Optimiser le poids et le responsive. |
| Une fonctionnalité de la spec manque | L'implémenter. |
| Rien de tout ça | Prendre la prochaine idée du backlog et la construire. |

Construis sur une branche `claude/<type>-<sujet>` **dans le dépôt cible**, en respectant
ses propres conventions de commit. Avant de pousser : build vert, tests verts, lint vert,
et relis ton diff en te demandant *qu'est-ce qui fait échouer ça en CI ?*

Ouvre une **PR draft** avec une description en français qui répond à trois questions :
**Quoi ? Pourquoi maintenant ? Comment le vérifier ?** Relie-la à l'ambition de ta fiche.
Puis abonne-toi à son activité et mène-la au vert.

---

## Étape 4 — Rendre compte (10 min)

Écris `AUTOMATION/rapports/<id>/AAAA-MM-JJ.md` :

```markdown
# 🔁 <Nom du projet> — 2026-09-08

## Verdict du jour
🟢 sain · 🟡 défauts mineurs · 🟠 quelque chose est cassé · 🔴 critique

## En une ligne
…

## Diagnostic
| Tronc | Build | Tests | CI | Prod | Doctrine |
|---|---|---|---|---|---|

## Ce que j'ai fait
… avec le lien de la PR.

## Ce que j'ai décidé seul
… et pourquoi.

## Ce que je n'ai pas fait
… et pourquoi. Sois honnête : une journée sans progrès s'écrit.

## Pour la prochaine fois
…
```

Mets à jour `AUTOMATION/etat/projets/<id>.json` — c'est ta seule mémoire :

```json
{
  "projet": "<id>",
  "derniere_execution": "2026-09-08",
  "verdict": "🟡",
  "tronc": "master",
  "pr_ouvertes": ["dosteeve2-hash/taama#14"],
  "chantier_en_cours": "",
  "prochain_chantier": "…",
  "dette_connue": ["…"]
}
```

Ajoute tes nouvelles questions à `AUTOMATION/questions/<id>.md`, chacune avec
**l'hypothèse que tu retiens en attendant**. Une question sans hypothèse est une question
mal posée : tranche toujours, et continue à construire dessus.

Enfin, commit et push sur `claude/loop-<id>-<AAAA-MM-JJ>` dans `forge-afrika`, et ouvre
la PR draft.

---

## Si tu manques de temps

Termine et documente ce qui est commencé plutôt que d'ouvrir un nouveau chantier.
Un chantier abandonné à moitié est une dette pour ta session de demain — qui sera une
autre session, sans mémoire, et qui ne saura que ce que tu auras écrit.

**L'étape 4 n'est jamais optionnelle.** Ce que tu n'écris pas est définitivement perdu.
