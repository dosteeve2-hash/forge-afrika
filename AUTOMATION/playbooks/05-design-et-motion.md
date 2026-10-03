# Playbook 05 — Design et motion design

> Ajouté le 28 septembre 2026, à la demande de Steeve : « avoir de meilleurs designs
> animés avec motion design et tout ». Ce playbook est l'instrument du passage de 60 %
> à 80 % de ses attentes.

## 0. La tension qu'il faut regarder en face

Les références premium qui font envie — Linear, Vercel, Spotify, Superhuman, Arc — sont
dessinées pour un MacBook sur fibre. Nos utilisateurs sont sur un **Android d'entrée de
gamme, en 2G/3G intermittente, avec une batterie faible et un stockage plein**
(`VISION.md §4`).

Copier leur finition sans copier leur budget, c'est fabriquer une app magnifique
**inutilisable à Ouagadougou**. Le but de ce playbook n'est donc pas « mettre des
animations », c'est **atteindre leur niveau de soin sous notre contrainte**. C'est plus
dur, et c'est ça qui fait la différence.

Formulé autrement : **un design ne se juge pas sur un écran 27 pouces.** Il se juge sur
une capture à 360 × 640.

---

## 1. Le budget de motion — non négociable

Cinq règles. Elles ne se discutent pas parce qu'elles découlent de la doctrine, pas du goût.

1. **On n'anime que `transform` et `opacity`.** Ce sont les deux seules propriétés que le
   compositeur traite sans repasser par la mise en page. Animer `width`, `height`, `top`,
   `left`, `margin`, `box-shadow` ou `filter` dans une boucle fait ramer un téléphone
   d'entrée de gamme — et ça ne se voit pas sur nos machines.
2. **Durées : 120–200 ms pour un retour d'action** (appui, bascule, focus), **200–320 ms
   pour une transition** (page, modale, panneau), **au-delà de 400 ms seulement pour un
   hero joué une seule fois**. Une animation perçue comme « premium » est courte et
   précise, pas lente.
3. **`prefers-reduced-motion: reduce` coupe tout ce qui n'est pas essentiel.** Ce n'est
   pas une option d'accessibilité décorative : c'est un réglage que des utilisateurs ont
   réellement activé, et l'ignorer donne la nausée à certains. Une seule media query en
   fin de feuille de style, et le travail est fait.
4. **Jamais une deuxième bibliothèque d'animation dans un dépôt.** `framer-motion` est
   déjà dans forge-afrika (avec `type: 'spring' as const`, cf. `CLAUDE.md`), `gsap` dans
   african-hybrid-agent. En ajouter une autre est refusé d'office. Et **le CSS d'abord** :
   un `@keyframes` plus une `transition` couvrent 90 % des cas pour **0 Ko de JavaScript**.
5. **Le contenu ne dépend jamais d'une animation.** Pas d'apparition qui masque le texte
   jusqu'à la fin, pas de rideau qui bloque la saisie. Offline-first veut dire que le
   contenu arrive d'abord ; l'animation l'accompagne, elle ne le précède pas.

**Le budget JavaScript se mesure, il ne s'estime pas.** `next build` imprime le poids du
premier chargement pour chaque route. On le lit. Une route de produit qui dépasse
**~150 Ko gzip de JS au premier chargement** est un problème à traiter, pas un détail.

Et une animation qui tourne **en boucle, indéfiniment, dans le viewport** est interdite
sur un écran que l'utilisateur regarde longtemps : c'est de la batterie brûlée pour rien.
Un fond animé sur une page d'accueil visitée dix secondes, oui. Sur un tableau de bord
ouvert toute la journée, non.

---

## 2. La boucle de vérification — « regarder » est une étape, pas une option

C'est le vrai apport du navigateur automatisé, et c'est la version design de la règle 45 :
**une CI verte ne dit rien de ce que l'utilisateur voit.**

```bash
./AUTOMATION/scripts/forge-captures.sh            # build + serve + captures
./AUTOMATION/scripts/forge-captures.sh http://… / /ecosystem   # un serveur déjà lancé
```

Le script capture chaque page en **360 × 640** (Android d'entrée de gamme) et en
**1280 × 800**, en thème clair et sombre, plus une passe `prefers-reduced-motion`, et il
relève les **erreurs de console**. Chromium est déjà dans le conteneur
(`/opt/pw-browsers/...`) : rien à installer.

**Règle de conduite : je ne déclare jamais un écran « propre » sans avoir regardé sa
capture.** Si je ne peux pas capturer, je le dis — je ne le devine pas.

---

## 3. La boucle de goût — extraire des règles, pas des pixels

Quand Steeve envoie une référence (capture, lien, maquette) :

1. **Nommer ce qui marche** en trois points maximum : le rythme vertical ? le contraste
   typographique ? la retenue des couleurs ? Ne pas dire « c'est beau ».
2. **Extraire les règles chiffrées** : échelle d'espacement, échelle typographique, rayon
   des angles, élévation, courbes de motion. Ce sont des nombres, et ils se copient.
3. **Les couler dans nos jetons** — pas dans le composant. La charte est fixée
   (`CLAUDE.md`) : navy `#0A1628`, gold `#D4AF37`, cyan `#00BCD4`. Une référence ne change
   jamais la charte ; elle change la façon de s'en servir.
4. **Ne jamais recopier une page.** Une page qui ressemble à Linear avec nos couleurs
   dessus n'est pas notre design, c'est un déguisement — et ça se voit.

Les 121 marques de `designs-drift` servent à l'étape 2, pas à l'étape 4.

---

## 4. Les jetons avant les composants

Un design system, chez nous, c'est **une seule source de vérité par dépôt** :

- les couleurs, espacements, rayons, ombres et **durées/courbes de motion** définis comme
  variables CSS sur `:root` ;
- le mode sombre d'abord — notre navy `#0A1628` est un fond sombre, c'est notre défaut ;
- aucune valeur en dur dans un composant. Un `#0A1628` écrit à la main dans un `.tsx` est
  une dette : le jour où la charte bouge, il reste en arrière.

Un composant qui n'utilise que des jetons est un composant qu'on peut redessiner en une
heure. Un composant truffé de valeurs littérales, non.

---

## 5. Où ça se branche dans l'ordre de priorité

Le §5 du protocole met le « refactor esthétique » au **niveau 7**, tout en bas. Cette
place reste juste pour l'esthétique interne. Mais elle est fausse pour **les surfaces
qu'un acheteur regarde** : le site du QG, le portfolio, une page de vente, l'écran de
caisse d'un commerçant. Là, le design **est** le produit — c'est le niveau 4, « ce qui
avance la ROADMAP », parce que c'est ce qui décroche un premier utilisateur réel.

La distinction opérationnelle :

| Travail | Niveau |
|---|---|
| Polir un écran qui porte **le verbe du métier** (la caisse, le formulaire, la vitrine) | **4** |
| Rendre une surface publique conforme à la charte et au budget de motion | **4** |
| Corriger une animation qui coûte de la batterie ou ignore `reduced-motion` | **3** — c'est une violation de doctrine |
| Embellir un écran interne que personne ne voit | 7 |

Et la contrainte du §5 bis tient toujours : polir un écran existant n'est **pas** une
nouvelle fonctionnalité, donc c'est autorisé même sans premier utilisateur nommé. Ajouter
un écran pour avoir plus de choses à animer, c'est le niveau 6 — et c'est interdit sur un
projet sans acheteur nommé.

---

## 6. Les outils, et ce qu'ils ne remplacent pas

| Outil | Ce qu'il apporte | Sa limite |
|---|---|---|
| `designs-drift` | règles Vercel, 121 marques, hook de garde | `privileged` : son hook s'exécute à chaque écriture d'UI. Un hook peut refuser mon code — très bien, mes propres vérificateurs le font déjà. Il **ne peut pas** élargir le §3. |
| `design-skills` | critique, élévation, interaction, accessibilité | `contained`, donc plus sûr. Ne mesure rien : il conseille. |
| `playwright` | navigateur piloté | déjà disponible ici. Le plugin sert surtout aux sessions qui n'ont pas de conteneur. |
| `Figma` | `figma-design-to-code`, `figma-implement-motion` | inutile tant qu'il n'y a pas de fichier Figma. À installer le jour où il y en aura un. |

Aucun de ces outils ne mesure le poids d'une page sur un téléphone à 40 €. **Ça, c'est
notre travail**, et c'est le §1 de ce playbook.

---

## 7. La checklist avant de dire « c'est fini »

- [ ] capture à **360 × 640** regardée, pas seulement le desktop
- [ ] zéro erreur de console
- [ ] seules `transform` et `opacity` sont animées
- [ ] `prefers-reduced-motion` coupe tout le non-essentiel
- [ ] aucune animation en boucle infinie sur un écran de travail
- [ ] aucune valeur de couleur en dur hors des jetons
- [ ] le poids JS du premier chargement est **lu** dans la sortie de `next build`
- [ ] les montants restent en `Intl.NumberFormat('fr-FR') + ' FCFA'`, **sans décimales**
- [ ] `npm run build` passe à 0 erreur
