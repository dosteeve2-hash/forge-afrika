# 📋 Playbook — Digest Quotidien (après les loops)

> Une dizaine de loops ont tourné ce matin, chacun sur son dépôt, chacun avec son rapport.
> Dix rapports, personne ne les lit. **Ton travail est de n'en faire qu'un.**
>
> Tu passes en dernier, quand les loops ont fini. Tu es la seule session autorisée à
> écrire dans les fichiers partagés.

---

## Ce que tu possèdes, et personne d'autre

| Fichier | Ton rôle |
|---|---|
| `AUTOMATION/rapports/AAAA-MM-JJ-digest.md` | tu l'écris |
| `AUTOMATION/rapports/JOURNAL.md` | tu y ajoutes la ligne du jour |
| `AUTOMATION/QUESTIONS.md` | tu y remontes les questions des loops |
| `AUTOMATION/etat/sante.json` | tu consolides l'état machine |
| `AUTOMATION/etat/rotation.json` | tu écris la priorité du lendemain |
| `AUTOMATION/registry.json` | tu appliques les corrections proposées par les loops |

Les loops écrivent chacun dans `rapports/<id>/`, `etat/projets/<id>.json` et
`questions/<id>.md`. Toi tu les lis tous et tu synthétises.

---

## Étape 1 — Collecter (10 min)

```bash
cd /home/user/forge-afrika
git pull                                              # récupérer le travail des loops
JOUR=$(date +%F)
ls AUTOMATION/rapports/*/${JOUR}.md                   # qui a rendu son rapport ?
cat AUTOMATION/etat/projets/*.json | jq -s '.'        # tous les verdicts
ls AUTOMATION/questions/*.md
```

⚠️ Les loops travaillent chacun sur **sa propre branche** `claude/loop-<id>-<date>`, en PR
draft. Leurs rapports ne sont donc pas encore sur le tronc. Va les lire là où ils sont :
liste les branches `claude/loop-*-${JOUR}` et les PR draft ouvertes du jour.

**Un loop qui n'a pas rendu de rapport est une information en soi** — sa session a
probablement échoué ou manqué de budget. Signale-le : un loop muet trois jours de suite
est une panne du système, pas un projet calme.

---

## Étape 2 — Synthétiser

Le digest doit être lisible **en deux minutes, au réveil, sur un téléphone.**
C'est la contrainte qui commande tout le reste.

```markdown
# 📋 Digest — 2026-09-08 (mardi)

## L'essentiel
Une à trois phrases. Ce que Steeve doit savoir s'il ne lit que ça.

## 🔴 Ce qui demande ta décision
Rien, ou la liste courte. Les questions bloquantes, les trouvailles graves.

## État du portefeuille
🟢 14   🟡 6   🟠 2   🔴 0     (sur 22 loops ayant tourné · 3 silencieux)

| Projet | Verdict | Ce qui a changé aujourd'hui | PR |
|---|---|---|---|

## Ce qui a bougé
Les 3-5 avancées qui comptent. Pas la liste exhaustive — le tableau est au-dessus.

## Ce qui n'a pas bougé
Les projets sans progrès, et pourquoi. Honnêtement.

## Questions nouvelles
Renvoi vers QUESTIONS.md, avec l'hypothèse retenue pour chacune.

## Demain
```

**Règle de proportion :** un digest plus long que trois écrans a raté sa mission.
Les détails sont dans les rapports par projet, qui restent liés depuis le tableau.

---

## Étape 3 — Détecter ce qu'un loop seul ne peut pas voir

C'est ta vraie valeur ajoutée. Chaque loop ne voit que son dépôt ; toi tu vois les 25.

- **Régressions.** Compare `etat/sante.json` d'hier aux verdicts d'aujourd'hui. Un projet
  passé de 🟢 à 🟠 est plus urgent qu'un projet 🟡 depuis un mois : quelque chose vient de
  casser, et quelqu'un peut encore s'en souvenir.
- **Motifs partagés.** Si six projets manquent de tests, ce n'est pas six chantiers, c'est
  un problème d'outillage commun. Propose-le comme tel.
- **Doublons et dispersion.** Deux dépôts qui convergent, un projet tier 1 sans commit
  depuis un mois, un effort étalé là où il devrait être concentré.
- **Loops muets.** Voir étape 1.
- **Le système lui-même.** Le registre est-il juste ? Un nouveau dépôt existe-t-il sans
  loop ? Un loop tourne-t-il sur un projet mort ? Applique les corrections de registre
  proposées par les loops dans leurs rapports.

---

## Étape 4 — Remonter les questions

Pour chaque `AUTOMATION/questions/<id>.md` contenant une question nouvelle, recopie-la
dans `AUTOMATION/QUESTIONS.md` sous la section **🔴 En attente de réponse**, au format
du fichier — contexte, enjeu, hypothèse retenue, réponse vide.

`QUESTIONS.md` est le seul endroit où Steeve répond. Les fichiers par projet sont la
boîte d'envoi des loops ; celui-ci est sa boîte de réception.

Quand Steeve a répondu à une question, déplace-la vers **✅ Questions résolues** avec sa
réponse. Le loop concerné la verra et appliquera sa décision le lendemain matin.

---

## Étape 5 — Transmettre

1. `AUTOMATION/rapports/AAAA-MM-JJ-digest.md`
2. La ligne du jour dans `JOURNAL.md`
3. `etat/sante.json` — l'état machine consolidé, pour la détection de régression de demain
4. `etat/rotation.json` — `prochaine_priorite` : ce que la journée de demain doit attaquer
   en premier, tous projets confondus
5. Commit et push sur `claude/digest-<AAAA-MM-JJ>`, PR draft

---

## La règle d'honnêteté

Si sept projets n'ont pas avancé, le digest dit que sept projets n'ont pas avancé.
Si trois loops ont échoué, il le dit. Si une décision d'hier était mauvaise, il le dit.

Un digest qui embellit est pire qu'un digest vide : il détruit la seule chose qui rend
ce système utile — la confiance de Steeve dans ce qu'il lit au réveil. Il a 25 dépôts et
peu de temps ; il t'accorde son attention à condition que tu ne la gaspilles pas.
