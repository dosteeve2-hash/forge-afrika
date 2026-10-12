# Onze PR sur quatre-vingt-onze ne livreraient rien

**20 septembre 2026.** La priorité laissée par la veille était claire : *relire les fichiers
d'état avant de diagnostiquer quoi que ce soit, parce que plusieurs décrivaient encore un
tronc d'avant les 29 fusions du 16.* Fait — et la relecture a produit autre chose que prévu.

---

## Ce que les fichiers affirmaient, et ce que la mesure dit

Huit fichiers citaient un tronc périmé. Attendu. Mais quatre portaient une affirmation
devenue **fausse**, pas seulement vieille :

| fichier | ce qu'il disait | la mesure |
|---|---|---|
| `african-hybrid-agent` | « 73 jours d'immobilité » | `main` a bougé le 16 — c'est la fusion qui a fermé Q11 |
| `ueemt-tokat` | « aucune CI » | la CI existe depuis la #14, fusionnée le 16 |
| `comptrack` | « 20 PR ouvertes, **AUCUNE** fusionnée » | 21 ouvertes, et **deux** fusionnées (#39, #40) |
| `milltrack` | « 6 PR ouvertes au 15 septembre » | **4** — les #13 et #14 sont parties le 16 |

**Une seule chose que j'allais corriger était juste.** `taama.json` annonce 18 PR ouvertes.
La mesure en donne 18. La #37 a été créée après le 7 septembre puis fusionnée le 16 : le
total n'a pas bougé. J'ai failli « corriger » un compteur exact.

---

## Le recensement, et la question qu'il pose

**91 PR ouvertes, 17 dépôts.** Écrit dans `etat/recensement-pr.json`, daté, pour que demain
ne le refasse pas.

Trois dépôts en concentrent **57** : comptrack 21, taama 18, Mifa 18. Trois sont à **zéro**
— Problem-to-Projects-Africa, BurkinaCollect, phone-showcase. Ces trois-là n'attendent plus
un clic : ils attendent une décision (Q13, Q12, et rien du tout pour le dernier, qui est fini).

---

## 🔴 Onze PR ne livreraient rien

Le 16 septembre, `duka-boutique#12` — qui corrigeait une vente perdue chez les commerçants —
a été fusionnée **dans la branche de la #11**, pas dans `master`. Quatre jours plus tard,
`ecrireLocal` est toujours absent du tronc. Le clic a été dépensé, rien n'a changé.

**Le clic est la ressource rare de ce portefeuille.** Onze PR ouvertes sont dans ce cas :

### Empilées sur la tête d'une autre PR ouverte

| PR | sa base | est la tête de |
|---|---|---|
| `mifa-life-shop#48` | `claude/motion-bklit-kokonut-animations-vthtl6` | **#45** |
| `mifa-life-shop#47` | idem | **#45** |
| `african-hybrid-agent#5` | `feat/improvements-0629` | **#4** |

Vérifié par **égalité exacte de SHA** entre la base de l'une et la tête de l'autre
(`e90b936`, `12e94045`), pas par ressemblance de nom.

→ **Ordre** : fusionner la parente d'abord (#45, #4), puis recibler les filles sur le tronc.

### Ne visent pas le tronc

- `ueemt-tokat#8 #7 #6 #5` → base `dev`, mesurée morte le 18 (0 commit unique, 33 de retard). **Q17.**
- `comptrack#38 #36 #30 #8` → base `feat/comptrack-v1`, qui n'a **jamais** produit de
  déploiement de production. **Ma #38 en fait partie.** **Q15.**

**80 PR visent leur tronc. 11 non, soit 12 %.**

---

## L'outil, et la preuve qu'il vaut quelque chose

`AUTOMATION/scripts/forge-pr-empilees.py`, à lancer **avant** de recommander une fusion.

La provocation qui compte n'est pas synthétique : j'ai rejoué l'état de `duka-boutique` au
**15 septembre**, la veille de la fusion perdue. Le script signale `#12` comme empilée sur
la #11. Il l'aurait dit avant le clic. Et il ne produit aucun faux positif sur une PR qui
vise bien son tronc.

---

## ⚠️ Deux fois mes propres outils m'ont pris en faute

**1. Mon script a reproduit la règle 22, à l'intérieur de l'outil censé prévenir la règle 29.**
Première version : il lisait le champ `tronc` de `comptrack.json`, qui dit
`feat/comptrack-v1` — la branche **par défaut** de GitHub — et annonçait donc que les
**17 PR visant `main` « ne livreraient rien »**. L'exact contraire de la vérité : les six
déploiements `target: production` viennent tous de `main`. Corrigé avant publication. C'est
la même forme que la règle 31 : *une erreur déjà nommée se reproduit à l'intérieur de son
propre correctif.*

**2. J'ai contourné mon 16ᵉ contrôle sans le vouloir.** Il vérifie qu'une affirmation
réfutée ne survit pas dans son fichier — mais il n'inspectait que les blocs nommés
`CORRECTION*`. J'ai posé mes quatre réfutations du jour dans des blocs `MESURE_2026_09_20`.
**Il ne les voyait pas, et il affichait vert.**

Élargi : le signal est le **champ** `affirmation_refutee`, pas le nom du bloc. Relancé, il
a immédiatement trouvé les quatre — toutes réelles, toutes en haut de leur fichier, exactement
l'erreur du 15 septembre. Couverture passée de 7 à 11 corrections.

**Règle 34 : quand un contrôle filtre par convention de nommage, la convention est la faille.**
Un attaquant aurait eu à y penser. Moi non — je suis tombé dedans en travaillant normalement,
ce qui est la pire façon de l'apprendre et la meilleure preuve que le trou était réel.

---

## 18ᵉ contrôle

Le recensement doit rester cohérent et daté : totaux qui s'additionnent, détail par base qui
correspond au compteur, et l'audit qui tourne. **Les 18 contrôles passent.**

---

## Ce qui reste chez Steeve

**Dix PR à moi, toutes vertes.** **Dix-neuf questions, zéro réponse.**
Et toujours : `duka-boutique#11` attend un clic — c'est la seule qui livrerait enfin la
correction de vente perdue.
