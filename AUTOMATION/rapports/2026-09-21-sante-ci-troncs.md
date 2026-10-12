# Onze troncs verts, un rouge depuis cinq jours, cinq sans filet

**21 septembre 2026.** En diagnostiquant Mifa Life Shop, j'ai trouvé sa CI rouge depuis
le 16. La bonne question n'était alors plus « comment la réparer » mais **« combien
d'autres le sont sans que personne le sache ? »**. J'ai fait le tour des dix-sept troncs
plutôt que de supposer.

---

## Le tour complet

| état | dépôts |
|---|---|
| ✅ **vert** (11) | milltrack · agrotrack-bf · burkinacollect · Problem-to-Projects-Africa · african-hybrid-agent · ueemt-tokat · indubot-afrika · valuechain-connect · Mon-Portfolio-2.0 · sahel-commerce-ai · phone-showcase |
| ❌ **rouge** (1) | **Mifa_Life_shop** — depuis le 16 septembre à 15h04 |
| ⬜ **aucune CI** (5) | forja · taama · livestockos · duka-boutique · comptrack |

Mesuré sur le **tronc réel** de chaque dépôt, pas sur sa branche par défaut — la règle 31
s'applique ici aussi : `livestockos` a pour défaut `feat/animaux-rapports`.

---

## Le rouge : une ligne, cinq jours

```
src/app/compte/parametres/ParametresClient.tsx:721
@next/next/no-html-link-for-pages — Do not use an `<a>` element to navigate to `/profil/`
```

Le lien « Retour au profil » était la **seule** ancre HTML vers une route interne des 318
fichiers suivis. Sur un Android d'entrée de gamme en 2G — `VISION.md §4` — revenir sur une
page déjà visitée retéléchargeait toute la coque de l'application.

### Comment c'est passé inaperçu

| run | déclencheur | heure | résultat |
|---|---|---|---|
| #3 | fusion de la **#46** — *celle qui installe la CI* | 14:59:57 | ✅ succès |
| #4 | fusion de la #13 | 15:02:05 | ⏹️ annulé |
| #5 | fusion de la #23 | 15:02:22 | ⏹️ annulé |
| #6 | fusion de la **#29** — *elle apporte le commit fautif* | 15:02:51 | ⏹️ **annulé 18 s plus tard** |
| #7 | fusion de la #30 | 15:03:08 | ❌ échec — dernier état de `main` |

**La CI que j'ai installée a été verte quatre minutes.**

Et ce n'est **pas** un défaut de configuration. Quand cinq PR sont fusionnées en quatre-vingt-dix
secondes, seul l'état final mérite d'être vérifié — il l'a été, et il a échoué. Le garde-fou a
parfaitement fonctionné. **Personne n'a regardé le résultat.** C'est exactement la fonction
qu'aurait remplie la veille quotidienne, morte depuis le 14 — **Q20**.

→ **PR #49** : lint 1 erreur → 0, tests 90/90, build code 0. Aucune règle désactivée, aucun
test ajouté — la règle de lint qui a trouvé le défaut *est* le garde-fou.

---

## Les cinq sans filet, et ce qu'ils ont en commun

**Chacun a une PR ouverte qui lui apporterait une CI. Les cinq sont non fusionnées.**

| dépôt | la PR qui poserait le filet |
|---|---|
| **forja** | #27 — fusion à blanc propre, vérifiée le 19 |
| **taama** | #35 — fusion à blanc propre, vérifiée le 19 |
| **livestockos** | #9 — brouillon, 5 conflits antérieurs à mon travail |
| **duka-boutique** | #11 — verte, 80/80, et c'est **aussi elle qui livrerait `ecrireLocal`** |
| **comptrack** | #38 — **mais elle vise `feat/comptrack-v1`** |

Le cas de CompTrack mérite d'être dit clairement : **même fusionnée, ma #38 laisserait sans
filet le tronc qui livre.** Elle vise la branche qui n'a jamais produit de déploiement de
production. Ce n'est pas le code qui bloque, c'est **Q15**.

---

## Ce que ça dit du portefeuille

Sur dix-sept troncs : **onze verts, un rouge, cinq sans surveillance du tout.** Les cinq
sans filet attendent tous le même geste. Le seul rouge l'est resté cinq jours parce que
**rien ne regarde les troncs** depuis le 14 septembre.

Le goulot n'est toujours pas le code. Mais aujourd'hui il a un coût mesurable : cinq jours
de tronc rouge sur une boutique en ligne, pour une ligne de correctif.

Données : `AUTOMATION/etat/sante-ci-troncs.json`.
