# Domaine et e-mail professionnel

*Octobre 2026.*

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
