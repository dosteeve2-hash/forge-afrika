# 🎛️ Dispatch — utiliser le PC de Steeve comme atelier

> Écrit le 2026-09-07, après que Steeve a demandé que Claude devienne l'orchestrateur :
> « je veux que tu sois le cerveau, que tu fasses des loops et que tu recommences,
> comme une roue qui continue infiniment à tourner ».
>
> Ce document dit **ce qui marche vraiment**, pas ce qui serait pratique.

## 1. La correction qui change tout

**Dispatcher vers une autre session Claude n'économise aucun crédit.** Elles tirent
toutes sur le même compte. Une tâche envoyée à la session qui tourne sur le PC de
Steeve coûte exactement ce qu'elle coûterait ici.

Ce qui économise réellement, c'est **les CLI locales de la machine** — Codex, Qwen,
Gemini — qui relèvent d'autres abonnements. D'où la règle :

> La session sur le PC ne **fait pas** le travail lourd.
> Elle **appelle** les outils locaux qui le font, et rend le résultat.

Elle est un contremaître, pas un ouvrier. Ses tours doivent être courts.

## 2. La topologie réelle

| | Où | Ce qu'elle peut |
|---|---|---|
| **Le cerveau** | conteneur cloud (`forge-afrika-2b`) | lire les dépôts, écrire du code, ouvrir des PR, planifier, arbitrer. **Pas** d'accès au PC. |
| **La main** | PC de Steeve, session Claude Code CLI `remote-control-sdk` | shell complet, navigateur, fichiers, et **les CLI locales** |
| **Les ouvriers** | sur le PC | `codex`, `qwen`, `gemini`, `ollama` — abonnements distincts |

Le cerveau ne pilote pas la souris de Steeve. Il envoie des tâches écrites à la main,
qui, elle, a le shell.

## 3. Le canal

Une **Routine** liée à la session du PC (`persistent_session_id`), déclenchée à la
demande avec `fire_trigger` :

```
trig_013zyjys2PLcrxT3JKSFVEdJ  →  session_01ABAN6sjsJ7gMvUFgrjU4FZ  (PC, connecté)
```

Il faut que le PC soit allumé **et** que la session CLI y tourne. Une session dont le
`connection_status` est `disconnected` ne reçoit rien ; le journal d'une autre porte
d'ailleurs l'erreur `computer_unreachable` du 29 août. **Vérifier la connexion avant
de dispatcher**, sinon la tâche part dans le vide.

## 4. La voie de retour : le dépôt, jamais la conversation

Le cerveau ne peut pas lire les réponses de la main : la messagerie inter-sessions ne
franchit pas la frontière cloud ↔ PC.

**Le dépôt est le bus de messages.** La main pousse une branche, le cerveau la lit par
l'API GitHub. C'est plus lent qu'un message, et c'est le seul lien qui survive à une
session fermée, un PC éteint, un crédit épuisé.

```
cerveau  --fire_trigger-->  main  --git push-->  branche  --GitHub API-->  cerveau
```

Convention : `claude/<sujet>-<date>`, résultat dans `AUTOMATION/machine/`.
**La main n'ouvre jamais de PR** — le cerveau décide de ce qui mérite une PR.

## 5. Ce qu'on dispatche, ce qu'on garde

| Au PC (volume, mécanique) | Au cerveau (jugement) |
|---|---|
| Générer des tests sur du code existant | Décider **quoi** construire |
| Traduire, reformater, renommer en masse | Arbitrer entre deux modèles de données |
| Lancer les suites de tests des 25 dépôts | Relire un diff avant de le pousser |
| Inventorier, mesurer, scanner | Écrire les rapports et les questions |
| Vérifier qu'un site répond | Trancher une violation de doctrine |

Règle simple : **si la tâche a une bonne réponse vérifiable, elle part.**
Si elle demande de choisir, elle reste.

## 6. Ce qui ne marche pas, et qu'il ne faut pas prétendre

- ❌ Le cerveau **ne pilote pas** le navigateur de Steeve. Un Chromium tourne dans le
  conteneur cloud, mais ce n'est pas sa machine, pas ses sessions, pas ses cookies.
- ❌ Une session déclenchée « à neuf » (`create_new_session_on_fire`) démarre **sans
  dépôt** : `sources: []`. C'est ce qui a fait échouer les 27 routines du 5 septembre.
  Seules les Routines liées à une session **existante** fonctionnent.
- ❌ **Le volant horaire durable a été refusé** par le classifieur de permissions le
  2026-09-07. Une Routine récurrente qui se redéclenche elle-même doit être créée par
  Steeve depuis l'interface Routines de claude.ai. Voir §7.
- ⚠️ Un `cron` interne à la session existe en secours, mais il meurt avec la session.

## 7. Le volant — ce que Steeve doit créer lui-même

Depuis **claude.ai → Routines → Nouvelle** :

- **Cible** : cette session d'orchestration (pas une session neuve — elle n'aurait aucun dépôt)
- **Fréquence** : toutes les heures
- **Message** :

> Reprends le travail. 1) Mes PR ouvertes : rouge ou en conflit = travail immédiat.
> 2) Le retour du PC : y a-t-il une nouvelle branche `claude/*` avec un résultat dans
> `AUTOMATION/machine/` ? 3) Le chantier suivant selon `AUTOMATION/etat/rotation.json`.
> Avant tout chantier : lister TOUTES les PR ouvertes du dépôt cible. Dispatcher le
> mécanique vers le PC, garder le jugement ici. Si tout est vert, ne rien dire et
> avancer.

Une seconde Routine peut viser la remise à zéro des crédits (toutes les 5 heures) avec
le même message.

## 8. Les limites de crédits, en clair

Au 2026-09-07, trois sessions d'orchestration avaient déjà coûté **480 $** cumulés.
Le plafond est glissant sur 5 heures.

La conséquence pratique n'est pas « travailler plus vite », c'est **travailler moins
cher** : dispatcher le volume vers les CLI locales, garder ici les décisions. Un tour
de cerveau vaut cent tours d'ouvrier — à condition qu'il y ait des ouvriers.

---

*Ce document décrit un canal testé le 2026-09-07 (tâche d'inventaire envoyée au PC).
Tant que `AUTOMATION/machine/inventaire-pc.md` n'est pas revenu, la liste des ouvriers
disponibles reste une hypothèse.*
