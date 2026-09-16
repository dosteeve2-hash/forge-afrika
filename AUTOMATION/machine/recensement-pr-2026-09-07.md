# 📊 Recensement des PR ouvertes — 2026-09-07

## La méthode, et ce qu'elle vaut

Compter les PR ouvertes de 25 dépôts par l'API coûte cher en contexte. GitHub expose
`refs/pull/<n>/merge` — une référence qui n'existe **que** tant qu'une PR est ouverte et
fusionnable. Un `git ls-remote` suffit donc, sans un seul appel d'API :

```bash
git ls-remote "$url" 'refs/pull/*/merge' | wc -l
```

**Calibrage** : sur CompTrack, la méthode donne 19 là où l'API en compte 20 — l'écart est
la PR ouverte mais **en conflit**, qui n'a pas de ref `merge`. Le chiffre est donc à lire
comme « ouvertes **et** fusionnables », et l'écart avec l'API est lui-même une information.

**Vérification croisée** : sur TAAMA, la méthode annonçait 18 alors que mon propre fichier
d'état disait 5. L'API a tranché : **18**. Mon état était faux, établi sur une liste
partielle. La méthode avait raison contre ma note.

## Les chiffres

| Dépôt | Tier | PR ouvertes | Branches |
|---|---|---|---|
| **comptrack** | 1 | **19** (20 par l'API) | 33 |
| **taama** | 1 | **18** | 25 |
| **african-hybrid-agent** | 1 | **6** | 7 |
| agrotrack-bf | 1 | 3 | 12 |
| burkinacollect | 1 | 2 | 5 |
| livestockos | 1 | 1 | 7 |
| phone-showcase | 2 | 1 | 2 |
| Mon-Portfolio- | 3 | 1 | 2 |
| binary-search-tree-java | 3 | 1 | 2 |
| Mon-Portfolio-2.0 | 2 | 0 | 8 |
| sahel-commerce-ai | 2 | 0 | 1 |
| Donald · Steeve-Donald- | 3 | 0 | 1 |

**Total mesurable : 52 PR ouvertes.**

### Les dépôts que je n'ai pas pu joindre

`valuechain-connect` · `milltrack` · `forja` · `indubot-afrika` ·
`Problem-to-Projects-Africa` · `duka-boutique` · `Mifa_Life_shop` · `ueemt-tokat` ·
`livestock-os` · `LLM-africain-agent-AI` · `steevedo.github.io` · `desktop-tutorial`

Douze dépôts, dont **six en tier 1**. Le `git ls-remote` anonyme échoue sur eux alors
qu'il réussit sur les autres : l'hypothèse la plus simple est qu'ils sont **privés**.
À confirmer — je ne l'ai pas vérifié.

Si l'hypothèse tient, le total réel dépasse largement 52.

## Ce que ça dit

Les deux plus gros dépôts de la Phase 1 — TAAMA et CompTrack, le cœur du portefeuille —
portent à eux seuls **37 PR ouvertes** dont les plus anciennes datent du **29 juin**.
Soixante-dix jours.

Ce n'est pas un problème de vélocité : le code a été écrit, il a été poussé, il a
souvent été relu par CodeRabbit. **Il n'a jamais été fusionné.**

Un dépôt où l'on construit sans fusionner ne grandit pas. Il accumule des versions
parallèles de lui-même, et chaque nouvelle session — humaine ou non — repart d'un doute :
« est-ce que ce que je m'apprête à écrire existe déjà, quelque part, dans une branche
ouverte ? » Sur CompTrack, la réponse était oui dix-sept fois sur vingt.

## Ce que ça change pour l'automatisation

Le registre fait tourner 13 loops quotidiens qui **construisent**. À 52 PR en attente,
construire davantage ajoute à la pile au lieu de la réduire.

**Proposition** : tant qu'un dépôt dépasse 5 PR ouvertes, son loop passe en mode
**triage** — il ne construit rien, il lit les PR ouvertes, détecte les doublons et les
périmées, et produit une recommandation. Il ne repasse en mode construction qu'une fois
la pile redescendue.

C'est une modification du protocole, pas une décision technique : elle attend l'accord
de Steeve. Elle est notée dans `AUTOMATION/QUESTIONS.md`.

## Reproduire

```bash
jq -r '.projets[].repo' AUTOMATION/registry.json | while read -r r; do
  printf '%-28s %s\n' "${r#*/}" \
    "$(git ls-remote "https://github.com/$r" 'refs/pull/*/merge' 2>/dev/null | wc -l)"
done
```
