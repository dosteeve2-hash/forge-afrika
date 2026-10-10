# Statut juridique, identité, e-mail et domaine

*Octobre 2026. Ceci n'est pas un avis juridique. Chaque point marqué ⚠️ se vérifie auprès d'une source officielle ou d'un professionnel avant d'agir.*

## 1. Ce que Forge Afrika peut dire aujourd'hui

| Peut être affirmé | Ne peut pas être affirmé |
|---|---|
| « Startup / projet technologique en phase de démarrage » | « Société », « SARL », « groupe », « holding », « filiales » au sens juridique |
| « Fondée par Steeve Donald Compaoré » | Un numéro RCCM, IFU ou une adresse de siège |
| « Pré-revenu, aucun client, aucun financement » | Toute traction |

Le site applique déjà cette ligne (pied de page, `/a-propos`, `/confidentialite`).

## 2. 🔴 Le point bloquant : vendre des services depuis la Turquie

C'est **la** question à trancher avant le premier devis, et elle ne se règle pas avec du code.

Steeve vit en Turquie avec un titre de séjour étudiant. Ce que disent les sources consultées (universités turques, guides) :
- les étudiants de licence ne peuvent travailler qu'avec un **permis de travail demandé par l'employeur**, à temps partiel, en général après la première année ;
- le permis de travail **indépendant** existe mais vise des profils expérimentés — peu adapté à un étudiant ;
- **aucune source ne traite clairement le cas du freelance pour des clients étrangers** ;
- le travail non autorisé peut entraîner l'annulation du titre de séjour.

⚠️ **Action :** poser la question par écrit au bureau international de l'Université de Tokat Gaziosmanpaşa (ou à la ligne ALO 170 du ministère du Travail) : *« Puis-je facturer, via une entreprise immatriculée au Burkina Faso, des prestations de développement logiciel réalisées à distance pour des clients situés hors de Turquie ? »* Ne rien facturer avant la réponse.

Sources : [Özyeğin — règles pour étudiants étrangers](https://ie.ozyegin.edu.tr/sites/default/files/upload/MuhendislikFakultesi/rules_for_foreign_students.pdf), [Anadolu University](https://international.anadolu.edu.tr/en/work-13), [İstinye University](https://www.istinye.edu.tr/en/ikamet/announcements/regarding-work-rights-international-students), [PILC — permis de travail](https://www.pilc.law/?p=17374).

## 3. Immatriculation au Burkina Faso

Piste la plus naturelle : **entreprise individuelle** (ou SARL unipersonnelle plus tard) via la **Maison de l'Entreprise du Burkina Faso** (CEFORE, guichet unique : RCCM + IFU + CNSS en un dossier). Une plateforme en ligne existe : **eCreation — creerentreprise.me.bf**.

| Point | Ce qu'on sait | Fiabilité |
|---|---|---|
| Coût entreprise individuelle | 30 000 – 90 000 FCFA | ⚠️ blog, non officiel |
| Délai | quelques jours à une semaine | ⚠️ blog |
| Faisable à distance ? | Inconnu — pièces d'identité, adresse, éventuellement présence ou mandataire | ⚠️ à demander à la MEBF |

Sources : [Burkina24 — communiqué MEBF](https://burkina24.com/?p=251118), [Kolonell — créer au CEFORE](https://kolonell.com/fr/blog/creer-entreprise-burkina-faso-cefore-2026), [Africarrières](https://africarrieres.com/burkina-faso/fr/guide/employeur-entreprise/creer-entreprise).

**Ce qui peut attendre l'immatriculation :** le site, les prototypes, le travail gratuit/pilote non rémunéré, les candidatures à des programmes qui n'exigent pas d'entité.
**Ce qui ne peut pas :** facturer, signer un contrat commercial, encaisser.
**Ce qui exige une licence :** l'expertise comptable (CompTrack reste un *logiciel*), toute collecte ou gestion de fonds de tiers (voir `ambition/AMBITION.md` §III).

## 4. Domaine et e-mail professionnel

**Vérifié le 10/10/2026 (registre via Vercel, lecture seule, rien acheté) :**

| Domaine | Disponible | Prix 1ʳᵉ année / renouvellement (Vercel) |
|---|---|---|
| `forge-afrika.com` | ✅ oui | 11,25 USD / 11,25 USD |
| `forgeafrika.com` | ✅ oui | non demandé |

**Recommandation :** acheter **`forge-afrika.com`** (identique au nom du dépôt et de l'URL actuelle). Acheter aussi `forgeafrika.com` en redirection est optionnel (~11 USD/an) mais évite qu'un tiers le prenne.

**Architecture :**
```
forge-afrika.com          → site (projet Vercel forge-afrika)
www.forge-afrika.com      → redirection vers l'apex
app.forge-afrika.com      → plus tard, le jour où un produit est commercialisé sous la marque
api.forge-afrika.com      → seulement quand une API publique existe (pas avant)
```

**E-mail — deux options, par ordre de coût :**
1. **Gratuit pour démarrer :** Zoho Mail (offre gratuite, ⚠️ vérifier les conditions actuelles) ou redirection (Cloudflare Email Routing / ImprovMX) vers la Gmail existante. La redirection ne permet pas d'*envoyer* proprement depuis l'adresse pro sans configuration SMTP supplémentaire.
2. **Payant, le plus simple :** Google Workspace (~quelques USD/utilisateur/mois, ⚠️ prix à vérifier) — même interface que Gmail.

**Adresses :** `steeve@forge-afrika.com` (personnelle, pour GitHub/Vercel/Supabase/Anthropic) + `contact@forge-afrika.com` (alias publique sur le site). Pas plus : une personne qui répond depuis cinq adresses fait plus petit, pas plus grand.

**Étapes (≈ 1 h, à faire par Steeve car ça engage une dépense) :**
1. Acheter le domaine (Vercel → Domains, ou un registrar).
2. L'ajouter au projet Vercel `forge-afrika` ; poser la redirection `www`.
3. Créer la messagerie, poser les enregistrements MX, SPF, DKIM, DMARC fournis par le prestataire.
4. Changer `SITE.email` et `SITE.url` dans `lib/site.ts` — une ligne chacun.
5. Mettre l'adresse pro sur GitHub, Vercel, Supabase/Neon, et la Console Anthropic.
