# Recensement des fusions du 16 septembre — établi le 19

**J'ai annoncé quinze fusions. Puis seize. Le compte réel est vingt-neuf.**

---

## Pourquoi je me suis trompé deux fois

Le 16, mon décompte venait des **notifications GitHub reçues** — donc uniquement des dépôts
auxquels j'étais abonné. Le 18 j'ai découvert une fusion manquante (`ueemt-tokat#14`), corrigé
à seize, et écrit la **règle 30** : *compter dans les dépôts, pas dans ses notifications*.

Le 19, en appliquant enfin cette règle, j'en ai trouvé **treize de plus**.

Et mon propre script de recensement a reproduit un piège que j'avais déjà nommé : il comptait
sur la **branche par défaut** de chaque dépôt. Or `livestockos` a pour branche par défaut
`feat/animaux-rapports`, et `forge-afrika` `docs/readme-premium`. Trois dépôts manquaient encore.
C'est la **règle 22** — branche par défaut ≠ tronc — qui se venge à l'intérieur du correctif de
la règle 30. **Règle 31.**

---

## Les vingt-neuf fusions, dans l'ordre (UTC)

| heure | dépôt | PR |
|---|---|---|
| 14:59:52 | Mifa_Life_shop | #46 |
| 15:00:00 | **african-hybrid-agent** | **#7** |
| 15:00:11 | **burkinacollect** | **#4** |
| 15:00:20 | ueemt-tokat | #14 |
| 15:00:33 | livestockos | #10 |
| 15:00:56 | indubot-afrika | #3 |
| 15:01:07 | milltrack | #13 |
| 15:01:19 | valuechain-connect | #9 |
| 15:01:40 | agrotrack-bf | #19 |
| 15:02:01 | Mifa_Life_shop | #13 |
| 15:02:19 | Mifa_Life_shop | #23 |
| 15:02:26 | forja | #4 |
| 15:02:33 | forja | #5 |
| 15:02:47 | Mifa_Life_shop | #29 |
| 15:03:05 | Mifa_Life_shop | #30 |
| 15:03:20 | livestockos | #8 |
| 15:03:27 | **Problem-to-Projects-Africa** | **#10** |
| 15:03:35 | **phone-showcase** | **#1** |
| 15:03:41 | indubot-afrika | #2 |
| 15:03:52 | forge-afrika | #9 |
| 15:04:03 | agrotrack-bf | #17 |
| 15:04:15 | agrotrack-bf | #18 |
| 15:04:29 | Mon-Portfolio-2.0 | #10 |
| 15:04:41 | sahel-commerce-ai | #1 |
| 15:05:01 | comptrack | #39 |
| 15:05:20 | milltrack | #14 |
| 15:05:39 | taama | #37 |
| 15:05:58 | livestock-os | #3 |
| 15:32:13 | Mon-Portfolio-2.0 | #12 |

**Dix-neuf dépôts. Six minutes** pour vingt-huit d'entre elles.

**Une trentième PR a été fusionnée et n'a atteint aucun tronc** : `duka-boutique#12`, versée dans
la branche de la #11 — c'est la règle 29, et le correctif de vente perdue **n'est toujours pas
livré** (vérifié le 19 : `ecrireLocal` absent de `master`).

---

## Ce que ces fusions ont débloqué, et que je ne savais pas

| | |
|---|---|
| **african-hybrid-agent #7** | **Q11 est CLOSE.** La limite de débit est sur `main`, et la production a été redéployée depuis ce commit |
| **burkinacollect #4** | l'application est **publiée** : `main` passe de 2 à 17 fichiers, et la perte silencieuse de soumissions est corrigée sur le tronc |
| **Problem-to-Projects-Africa #10** | `tsc` passe enfin sur `main`, les deux `@ts-nocheck` sont partis, première CI |
| **Mifa_Life_shop #46** | le dépôt s'installe à nouveau — `npm ci` échouait depuis toujours |
| **phone-showcase #1** | son unique chantier est terminé : **zéro PR ouverte**, CI en place |
| **forja #4 et #5** | deux PR dont je n'avais jamais eu connaissance |
| **indubot-afrika #2** | le README et les captures — c'est elle qui a créé les conflits de mes #4 et #5 |

---

## Q11 — close, vérifiée dans les deux sens

Ce que je signalais depuis le 8 septembre : `burkinacollect.vercel.app` sert
`african-hybrid-agent`, dont `/api/chat` tournait **sans limite de débit**, sur un dépôt public.

**Dans le code de `main` :**

```
src/lib/rate-limit.ts:4:  export const AI_RATE_LIMIT = { limit: 20, windowSeconds: 3600 }
src/app/api/chat/route.ts:41:  await logOptional("orchestrator", "rate_limited", "info", …)
```

Vingt requêtes par heure — exactement la règle de `CLAUDE.md`.

**En production :** déploiement `target: production`, état `READY`, créé le 16 à ~19h UTC depuis
`main @ f99cc32`, dont le message de commit est *« Merge pull request #7 — Limite de débit sur
l'endpoint IA »*.

Je n'ai **pas** sollicité `/api/chat` pour le vérifier : la métadonnée du déploiement et le code
source suffisent, et le solliciter dépenserait le crédit que la limite protège.

---

## La leçon, et elle est à moi

Pendant **trois jours**, j'ai porté Q11 en tête de mes check-ins comme « urgente, sans réponse »
— alors que Steeve l'avait fermée le 16 à 15h00:00, soit la **deuxième** fusion de sa session.

Ce n'est pas lui qui n'a pas répondu. C'est moi qui n'ai pas regardé.
