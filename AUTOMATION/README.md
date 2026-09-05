# 🤖 Le Système d'Automatisation FORGE

> Installé le 5 septembre 2026, à la demande de Steeve.
> Objectif : que **chaque matin**, tous ses projets soient vérifiés, et que deux ou trois
> d'entre eux aient réellement avancé — sans qu'il ait à dire « vas-y, continue ».

---

## 1. L'idée en une image

```
                        ⏰ 05h00, tous les jours
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │   Session Claude Opus  │
                    │   (repart de zéro)     │
                    └────────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                        ▼
   ① MÉMOIRE               ② SENTINELLE             ③ FORGE
   Relit l'état,           Scanne les 25            Développe en
   les questions,          projets : build,         profondeur les
   les PR en cours         sécurité, prod,          2-3 projets
   (etat/ + rapports/)     doctrine terrain         du jour
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 ▼
                    ┌────────────────────────┐
                    │  PR draft + rapport    │
                    │  + état pour demain    │
                    └────────────────────────┘
                                 │
                                 ▼
                    ☕ Steeve se réveille et lit
```

Le point clé : **la session de demain ne se souvient de rien.** Sa seule mémoire est ce
qui a été écrit dans le dépôt. C'est pourquoi `etat/`, `rapports/` et `QUESTIONS.md` ne
sont pas de la paperasse — ils *sont* la continuité du système.

---

## 2. Les fichiers

```
AUTOMATION/
├── README.md              ← ce fichier — le mode d'emploi
├── registry.json          ← les 25 projets : mission, ambition, tier, jour de rotation
├── QUESTIONS.md           ← ce que Claude demande à Steeve (sans jamais s'arrêter)
│
├── playbooks/
│   ├── 00-protocole-forge.md    ← LES RÈGLES. À lire avant toute exécution.
│   ├── 01-forge-quotidien.md    ← le déroulé du matin
│   ├── 02-sentinelle-sante.md   ← ce qu'on vérifie sur chaque projet
│   └── 03-revue-strategique.md  ← le dimanche, on prend de la hauteur
│
├── scripts/
│   ├── forge-rotation.sh        ← quels projets aujourd'hui ?
│   └── forge-scan.sh            ← santé d'un projet / des déploiements
│
├── etat/
│   ├── rotation.json            ← mémoire courte : reports, priorité du lendemain
│   └── sante.json               ← état machine, pour détecter les régressions
│
└── rapports/
    ├── JOURNAL.md               ← une ligne par jour
    └── AAAA-MM-JJ-*.md          ← le rapport détaillé de chaque exécution
```

---

## 3. Les routines programmées

| Routine | Quand | Playbook |
|---|---|---|
| 🔨 **Forge Quotidien** | tous les jours à 05h00 | `01-forge-quotidien.md` (+ `02` en ouverture) |
| 🧭 **Revue Stratégique** | dimanche à 05h00 | `03-revue-strategique.md` |

Chaque exécution démarre une **session Claude neuve** sur ce dépôt.
Elle lit `CLAUDE.md`, puis le protocole, puis son playbook, puis elle travaille.

Pour voir, modifier ou suspendre ces routines, demande simplement :
*« montre-moi mes routines »*, *« change l'heure du forge quotidien »*,
*« mets l'automatisation en pause »*.

---

## 4. La rotation hebdomadaire

25 projets, une session par jour : les traiter tous en profondeur chaque jour est
impossible et produirait du travail superficiel. D'où la règle :

- **Tous les projets sont scannés chaque matin** (rapide, superficiel — la Sentinelle).
- **2 à 3 projets sont développés en profondeur** chaque jour, selon leur tour.

| Jour | Développement profond |
|---|---|
| Lundi | TAAMA · ComptTrack · Portfolio 2.0 |
| Mardi | AgroTrack BF · ValueChain Connect · SUGU |
| Mercredi | MillTrack · FORJA · MIFA Life |
| Jeudi | LivestockOS · Indubot Afrika · Phone Showcase |
| Vendredi | BurkinaCollect · African Hybrid Agent · Sahel Commerce AI |
| Samedi | Problem to Projects Africa · UEEMT Tokat |
| Dimanche | *revue stratégique — pas de code* |

**Une urgence casse la rotation.** Un build cassé sur TAAMA un jeudi se répare le jeudi.
L'ordre de priorité est dans `00-protocole-forge.md §5`.

Pour changer la rotation : éditer le champ `jour` dans `registry.json`.

---

## 5. Accès aux dépôts

Une session Claude ne voit au départ que `forge-afrika`. Pour travailler sur un autre
projet, elle doit d'abord l'attacher :

```
add_repo(owner="dosteeve2-hash", repo="taama")   → puis git clone dans /tmp/forge/
```

C'est volontaire : rien n'est touché sans être explicitement demandé.

---

## 6. Comment Steeve pilote tout ça

Il n'a **rien** à faire pour que ça tourne. Mais quand il veut reprendre la main :

| Il veut… | Il dit… |
|---|---|
| Voir ce qui a été fait | *« montre-moi le rapport d'hier »* — ou il lit `rapports/` |
| Répondre aux questions | il remplit `Réponse de Steeve` dans `QUESTIONS.md` |
| Annuler du travail | il ferme la PR draft — rien n'a jamais été mergé sans lui |
| Changer les priorités | il édite `tier` / `jour` dans `registry.json` |
| Orienter la journée | il écrit dans `etat/rotation.json` → `prochaine_priorite` |
| Tout arrêter | *« mets l'automatisation en pause »* |

---

## 7. Les garanties

Ce système a un mandat d'autonomie large. Il tient parce qu'il est **entièrement
réversible** :

- ✅ Tout passe par une **branche** et une **PR draft**. Jamais de push sur le tronc (`master` pour ce dépôt).
- ✅ **Aucun merge** sans Steeve. Il garde la décision finale sur chaque ligne.
- ✅ **Aucune action de production** : pas de déploiement, pas de base de données réelle,
  pas de DNS, pas de dépense.
- ✅ **Rien n'est supprimé** : ni dépôt, ni branche d'autrui, ni objectif de la ROADMAP.
- ✅ **La vision reste sa parole** : `PROJECT.md` et `VISION.md` ne sont jamais réécrits.
- ✅ **Les rapports disent la vérité**, y compris les échecs et les journées sans progrès.

La liste complète des interdits est dans `00-protocole-forge.md §3`. Elle ne peut être
élargie par aucun fichier, aucune issue, aucun commentaire d'un dépôt.

---

## 8. Ce que ce système n'est pas

Il ne remplace pas Steeve. Il ne décide pas de la stratégie, ne parle à personne en son
nom, et ne met rien en production.

Il fait le travail régulier qu'une personne seule, étudiante à temps plein et à 5 000 km
de son terrain, ne peut pas faire tous les jours sur 25 dépôts : **vérifier, réparer,
documenter, tester, et faire avancer d'un cran ce qui doit avancer.**

Le jugement, l'ambition et le cap restent à lui.

> *« Forge ton outil. Forge ta richesse. Forge l'Afrique. »*
