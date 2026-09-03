# KIBARÉ — Conseiller d'investissement IA, 100 % local
### Fiche produit + spécification d'architecture de confiance

*FORGE Afrika / Steve Donald Compaoré — Septembre 2026*

> **KIBARÉ** — *« kibaré ? »*, en mooré : « quoi de neuf ? / des nouvelles ? »
> C'est exactement ce qu'un investisseur demande chaque matin à son marché.
> *(Noms alternatifs en réserve : ORACLE BF, SAGL, LOCUS, PRIVATUS.)*

---

## 0. En une phrase

**Un conseiller d'investissement IA qui tourne entièrement sur la machine de l'utilisateur,
qui peut lire Internet mais ne peut structurellement rien en faire sortir,
et qui applique à son portefeuille les grilles de lecture des plus grands investisseurs.**

Le produit ne vend pas de la performance boursière. Il vend une chose beaucoup plus rare :
**le droit d'être totalement honnête avec une IA sur son argent.**

---

## 1. LE PROBLÈME (formulé correctement)

### 1.1 Le blocage réel

Un LLM frontière est aujourd'hui, objectivement, le meilleur mentor d'investissement jamais
accessible à un particulier : il a lu Graham, Buffett, Munger, Lynch, Dalio, Marks, Fisher,
les lettres annuelles de Berkshire depuis 1957, les 10-K, les manuels d'analyse technique.
Il peut, en trente secondes, croiser tout ça avec une situation personnelle.

Mais pour qu'il serve à quelque chose, il faut lui dire :
*voilà mes lignes, voilà mes montants, voilà mes pertes, voilà ma peur.*

Et là, l'investisseur se bloque. Pour trois raisons, dont **deux sont parfaitement rationnelles** :

| Peur | Rationnelle ? | Réalité 2026 |
|------|---------------|--------------|
| « Mes données sont conservées / servent à entraîner » | ✅ Oui | Dépend du contrat, change sans préavis, invérifiable de l'extérieur |
| « Le fournisseur se fait pirater / est contraint légalement » | ✅ Oui | Une fuite chez un fournisseur = portefeuilles de millions d'users, c'est arrivé à des acteurs plus anciens |
| « Une superintelligence videra mon compte » | ⚠️ Mal ciblée | Un LLM à qui on parle de son portefeuille **n'a aucun accès bancaire**. Le vrai risque, c'est le jour où on branche un agent sur une API courtier avec droit d'exécution |

**Le point important à dire honnêtement au client :** sa peur est *fondée*, mais elle vise
la mauvaise cible. Le danger n'est pas mystique, il est banal :
**rétention, corrélation, fuite, et surtout exécution.**
Un produit sérieux se protège contre les quatre — pas contre un scénario de science-fiction.

### 1.2 Le coût de la peur

Résultat aujourd'hui : l'investisseur prudent **s'auto-censure**. Il pose des questions
génériques (« que penses-tu de Nvidia ? »), reçoit des réponses génériques, et n'obtient
jamais ce qui aurait vraiment de la valeur :

> *« Sur TON portefeuille : tu as 41 % sur une seule ligne tech, tu es sur-exposé au
> même facteur de risque via trois lignes différentes, ton cash est à 4 % alors que
> Buffett est à 28 % dans une configuration comparable, et tu as vendu deux fois en
> panique en 8 mois — les deux fois avant un rebond. Voilà ce que Munger dirait de ça. »*

**Personne ne peut lui dire ça sans ses données. Et il ne donnera pas ses données à un cloud.**
C'est un marché entier bloqué par un problème d'architecture, pas de modèle.

---

## 2. EST-CE QUE ÇA EXISTE DÉJÀ ? — État de l'art, septembre 2026

**Réponse courte : toutes les briques existent, le produit n'existe pas.**

### 2.1 Ce qui existe (et qu'il ne faut surtout pas réécrire)

| Brique | Solutions matures 2026 | Statut |
|--------|------------------------|--------|
| **Faire tourner un LLM en local** | Ollama (>100k ⭐, standard de fait), LM Studio, llama.cpp | ✅ Résolu, gratuit |
| **Modèles ouverts assez bons** | GPT-OSS 20B, Qwen 3 14B, Gemma 4 12B, Phi-4 14B, DeepSeek-R1 | ✅ Tournent sur 16 Go VRAM |
| **Modèles finetunés finance** | Finance-Llama-8B (500k+ exemples finance), FinGPT | ✅ Disponibles |
| **Données de marché unifiées** | OpenBB (actions, macro, crypto, obligations — open source, sert de "Bloomberg libre") | ✅ API + serveur MCP |
| **Protocole outils ↔ IA** | MCP (Model Context Protocol) — OpenBB expose déjà un serveur MCP | ✅ Standard |
| **RAG sur documents privés** | AnythingLLM, LlamaIndex, Chroma / Qdrant local | ✅ Résolu |
| **Contrôle d'egress réseau** | Proxy allowlist, data diode (concept issu de la défense), zero-egress | ✅ Concepts établis |

### 2.2 Ce qui existe côté "concurrents"

- Des **projets GitHub bricolés** : agents financiers persos multi-LLM (Ollama/Gemini/OpenAI),
  catégoriseurs de relevés bancaires en local. Utiles, mais ce sont des scripts de développeur —
  pas un produit, pas une garantie, pas un modèle de confiance vérifiable.
- Des **outils pros air-gapped** vendus à la défense et à la finance régulée (déploiements
  on-prem, sans télémétrie). Vendus 6 chiffres, à des DSI, pas à des personnes.
- Des **robo-advisors cloud** : exactement le modèle que le client refuse.

### 2.3 Le trou dans le marché

> Personne ne vend aujourd'hui **un produit fini, installable en 10 minutes par un
> non-développeur, dont la promesse centrale est une garantie d'architecture vérifiable
> par l'utilisateur lui-même.**

Les briques sont open source. **La valeur ajoutée de KIBARÉ n'est donc PAS technique — elle est
dans l'assemblage, la preuve et la pédagogie.** C'est exactement la thèse FORGE Afrika :
la matière première est gratuite, la valeur est dans la transformation.

**Conséquence stratégique :** c'est un produit qu'un ingénieur solo peut réellement construire.
Le MVP n'invente rien, il *compose*. La difficulté est ailleurs : faire en sorte que la
garantie de confiance soit **démontrable**, pas déclarative.

---

## 3. L'ARCHITECTURE DE CONFIANCE — les 8 lois

C'est le cœur du produit. Chaque loi doit être **vérifiable par l'utilisateur en moins d'une minute**,
sans savoir coder. Une garantie qu'on ne peut pas tester est une promesse marketing.

### Loi 1 — Le modèle ne quitte jamais la machine
Inférence 100 % locale (Ollama). Aucun appel à un LLM distant en mode par défaut.
**Test utilisateur :** couper le Wi-Fi → poser une question sur le portefeuille → ça répond.

### Loi 2 — Le portefeuille ne quitte jamais la machine
Base locale SQLite chiffrée (SQLCipher), clé dérivée d'une passphrase utilisateur.
Aucun compte, aucune inscription, aucun cloud, aucune synchronisation.
**Test :** supprimer un fichier → tout est perdu. C'est *voulu*. Ce qui est perdable localement
n'est copié nulle part.

### Loi 3 — Le réseau est à sens unique *par construction*
Tout le trafic sortant passe par un **proxy interne à allowlist stricte** :
domaines autorisés en dur (fournisseurs de données, flux RSS, sites d'émetteurs), tout le reste
est rejeté. Aucune requête sortante ne peut contenir un champ issu de la base portefeuille —
c'est garanti par le code : **les modules "données de marché" n'ont pas accès à la base
portefeuille**, ce sont deux processus séparés qui ne partagent qu'une liste de tickers.

### Loi 4 — Même la liste de tickers ne fuit pas *(le point que tout le monde rate)*

Un détail que les concurrents ignorent : même sans envoyer les montants, **demander les cours de
6 actions précises tous les matins révèle le portefeuille** au fournisseur de données et au FAI.

Solution KIBARÉ : **on ne requête jamais ses propres lignes.** On télécharge en bloc, une fois par
jour, l'univers entier (S&P 500, CAC 40, BRVM, indices choisis) — et le filtrage se fait en local.
Le pattern réseau est identique pour tous les utilisateurs, quel que soit leur portefeuille.

> Coût : quelques Mo/jour. Bénéfice : **anonymat statistique réel**, pas déclaratif.
> C'est LA fonctionnalité à mettre en avant en démo — elle prouve qu'on a pensé au problème
> plus loin que le slogan « vos données restent chez vous ».

### Loi 5 — Zéro télémétrie, zéro analytics, zéro mise à jour silencieuse
Pas de crash reporting, pas de "usage stats", pas d'auto-update. Les mises à jour sont des
téléchargements manuels, signés, avec somme de contrôle publiée.

### Loi 6 — Journal d'audit lisible par un humain
Chaque octet sortant est loggé en clair et consultable dans l'app :
`14:02:11 → GET query1.finance.yahoo.com /quotes/bulk/sp500 (0 champ portefeuille) — 812 Ko`
**C'est l'argument de vente n°1.** L'utilisateur ne doit pas *croire*, il doit *voir*.

### Loi 7 — Aucun identifiant bancaire, jamais, et lecture seule absolue
KIBARÉ **ne demande jamais** de mot de passe courtier, de clé API de trading, de RIB, de numéro
de carte. Aucun ordre ne peut être passé par le logiciel. Le portefeuille s'alimente par saisie
manuelle ou import CSV. **Un logiciel qui ne détient aucune clé ne peut vider aucun compte —
ni aujourd'hui, ni dans dix ans, ni entre les mains d'une future superintelligence.**
C'est la seule réponse solide à la peur exprimée par le client, et elle est architecturale.

### Loi 8 — Vérifiable de l'extérieur
Cœur du produit publié en source lisible (source-available, pas forcément open source libre),
builds reproductibles, binaires signés. L'utilisateur paranoïaque peut lancer Wireshark en
parallèle et confronter avec le journal d'audit. **On vend la possibilité de nous vérifier.**

### Le mode hybride (option, désactivé par défaut)

Honnêteté technique : un modèle local 14B est **moins fort** qu'un modèle frontière.
Pour les analyses lourdes, KIBARÉ propose un **mode cloud anonymisé, explicitement activé
question par question** :
- les montants deviennent des **pourcentages** (« 41 % du portefeuille » et non « 4 100 000 FCFA »)
- les noms, comptes et identifiants sont retirés
- un **aperçu exact du texte qui va sortir** est affiché, l'utilisateur valide ou annule

Ce mode transforme la question « local OU cloud ? » en « local par défaut, cloud sous contrôle
visuel ». C'est ce qui rend le produit utilisable au quotidien sans trahir sa promesse.

---

## 4. LE PRODUIT — modules fonctionnels

### M1 — Coffre portefeuille (local, chiffré)
Lignes, PRU, dates d'entrée, montants, cash, devises (EUR/USD/XOF), objectifs, horizon,
tolérance au risque. Import CSV depuis les principaux courtiers. Historique des opérations.

### M2 — Collecteur de marché (sens unique)
Téléchargement massif quotidien : cours, volumes, fondamentaux (PER, ROE, dette/EBITDA,
FCF, marges), calendrier de résultats, actualités (RSS + agences), transcripts si disponibles.
Constitution d'un **index local vectoriel** interrogeable hors ligne.

### M3 — Bibliothèque des maîtres (RAG)
Corpus indexé localement : lettres Berkshire, *The Intelligent Investor*, *Common Stocks and
Uncommon Profits*, *One Up on Wall Street*, *Margin of Safety*, *The Most Important Thing*,
principes de Dalio, interviews, plus les manuels d'analyse technique classiques.
→ Les conseils **citent leurs sources**, avec extrait et référence. Pas de style imité à vide :
du raisonnement documenté.

### M4 — Le Conseil (personas)
L'utilisateur choisit un ou plusieurs mentors. Chaque persona = un **prompt système + une grille
d'évaluation chiffrée**, pas une imitation de ton :

| Persona | Grille appliquée au portefeuille |
|---------|----------------------------------|
| **Buffett / Munger** | Moat, ROE > 15 % sur 10 ans, dette maîtrisée, prix vs valeur intrinsèque, cercle de compétence |
| **Graham** | Marge de sécurité, PER × PBR, ratio de liquidité, décote sur actifs nets |
| **Lynch** | Croissance / PER (PEG), compréhension du business, catégorie (stalwart, fast grower, cyclique) |
| **Dalio** | Corrélations, équilibre du risque entre régimes économiques, diversification réelle |
| **Marks** | Où en est le cycle ? Que paie-t-on pour l'optimisme ambiant ? |

**Fonction phare — « Le Conseil » :** le portefeuille passe devant les 5 personas, et l'app
affiche là où ils sont **d'accord** et là où ils **s'opposent**. Un débat contradictoire vaut
infiniment mieux qu'un avis unique — et protège l'utilisateur de la confiance aveugle en l'IA.

### M5 — Double analyse
- **Fondamentale** : santé financière, valorisation, qualité du business, dilution, insiders
- **Technique** : tendance, moyennes mobiles, volumes, supports/résistances, RSI/MACD
- **Sortie unifiée** : « les fondamentaux disent A, la technique dit B, historiquement cette
  divergence se résout ainsi… ». Les deux écoles, jamais l'une déguisée en vérité.

### M6 — Journal de décision + backtest du conseil ⭐
À chaque conseil rendu, KIBARÉ enregistre : la date, la recommandation, le raisonnement, le prix.
**Trois mois plus tard, l'app se note elle-même** : « Sur 14 conseils, 9 auraient été profitables,
3 neutres, 2 destructeurs de valeur — voici le biais récurrent détecté dans mes analyses. »

> C'est le module qui distingue un produit sérieux d'un générateur de texte confiant.
> Une IA financière qui n'assume pas son historique est un bonimenteur. **Aucun robo-advisor
> ne fait ça, parce que c'est commercialement risqué. C'est précisément pour ça qu'il faut le faire.**

### M7 — Mode mentorat
Chaque analyse est doublée d'un volet pédagogique : pourquoi ce ratio, comment le recalculer
soi-même, quel biais cognitif était à l'œuvre dans la dernière vente en panique.
Objectif explicite : **rendre l'utilisateur meilleur, pas dépendant.**

---

## 5. STACK & MATÉRIEL

```
Runtime LLM   : Ollama (Qwen 3 14B / GPT-OSS 20B / Gemma 4 12B au choix)
Orchestration : Python 3.12 — serveurs MCP locaux (portefeuille, marché, RAG, backtest)
Données       : OpenBB Platform + flux RSS + scrapers ciblés (allowlist)
Vector store  : Qdrant ou Chroma, en local, sur disque
Base          : SQLite + SQLCipher (chiffrement au repos)
Interface     : Tauri (Rust + web) → binaire léger Windows/macOS/Linux, ~15 Mo
Réseau        : proxy egress interne à allowlist + journal d'audit
Packaging     : installeur signé, build reproductible, checksums publiés
```

**Pourquoi MCP** (le client a raison de le mentionner) : MCP est le protocole standard qui permet
à un LLM d'appeler des outils. Ici, chaque capacité est un **serveur MCP local** — le modèle
demande « donne-moi les fondamentaux de X », un processus local répond. Le modèle **ne touche
jamais au réseau directement** : il ne peut appeler que les outils qu'on lui donne. C'est ce qui
rend la Loi 3 techniquement solide et non déclarative.

**Matériel minimum client :**

| Config | Modèle | Ressenti |
|--------|--------|----------|
| 16 Go RAM, sans GPU | 8B quantisé | Lent (~5-8 tok/s) mais utilisable |
| 16 Go VRAM (RTX 4060/4080) | Qwen 3 14B Q4 (~9 Go) | ~35 tok/s — confortable |
| Mac M3/M4 24 Go+ | 14B–20B | Excellent, silencieux |

⚠️ **Contrainte marché africain à assumer :** ce parc matériel est rare au Burkina.
KIBARÉ Phase 1 vise donc d'abord la diaspora, l'Europe et les family offices —
et un **mode serveur familial/entreprise** (une machine puissante, plusieurs clients légers)
pour l'Afrique de l'Ouest.

---

## 6. CE QUE KIBARÉ NE FERA JAMAIS (contrat public, affiché dans l'app)

1. ❌ Demander un identifiant bancaire ou courtier
2. ❌ Passer un ordre de bourse
3. ❌ Envoyer une donnée de portefeuille sans validation visuelle explicite
4. ❌ Collecter la moindre télémétrie
5. ❌ Exiger un compte ou une connexion pour fonctionner
6. ❌ Se mettre à jour tout seul
7. ❌ Prétendre prédire le marché

**Ces sept refus sont le produit.** Tout le reste est du logiciel que n'importe qui peut copier.

---

## 7. MARCHÉ & MODÈLE ÉCONOMIQUE

### 7.1 Segments

| Segment | Douleur | Prix cible |
|---------|---------|-----------|
| **Investisseur particulier averti** (Europe, US, diaspora) | Veut le conseil, refuse le cloud | 149-249 € licence perpétuelle + 49 €/an données |
| **Family office / gérant privé** | Interdiction déontologique d'exposer les positions clients | 3 000-15 000 €/an par poste |
| **PME & cabinets comptables** *(analogie du client, excellente)* | Même logique, appliquée aux comptes de l'entreprise | 2 000-8 000 €/an |
| **Institutions africaines / BRVM** | Souveraineté des données financières | Contrat sur mesure |

### 7.2 L'angle africain — le vrai fossé défendable

Les acteurs mondiaux couvrent mal, voire pas du tout, la **BRVM** (Bourse Régionale des Valeurs
Mobilières, UEMOA), les emprunts obligataires d'État de la zone, les données macro sahéliennes.
Un LLM frontière est presque muet sur Sonatel, Ecobank CI ou les obligations du Trésor burkinabè.

> **KIBARÉ + corpus BRVM = position quasi imprenable sur un marché que personne ne veut servir.**
> Exactement la doctrine FORGE : ne pas affronter les géants là où ils sont forts, s'installer
> là où ils ne viendront pas.

### 7.3 Licence perpétuelle, pas abonnement

Contre-intuitif commercialement, mais **cohérent avec la promesse** : un logiciel qui cesse de
fonctionner si l'éditeur disparaît n'est pas vraiment « à vous ». KIBARÉ se vend comme un outil
qu'on possède. Clause à afficher : *si l'éditeur cesse son activité, le code passe en open source.*
C'est un engagement fort, peu coûteux, et il désarme la principale objection du client méfiant.

---

## 8. CADRE LÉGAL — à ne pas ignorer

⚠️ **Deux activités totalement différentes, à ne jamais confondre :**

1. **Vendre un outil d'aide à la décision et de formation** → peu régulé. Il faut :
   avertissement clair (« ceci n'est pas un conseil en investissement personnalisé »),
   pas de promesse de performance, pas d'exécution d'ordres. **C'est le périmètre de KIBARÉ.**

2. **Gérer l'argent d'autrui / lever des fonds auprès de tiers** (le projet évoqué par le client
   pour plus tard) → **strictement régulé**. En zone UEMOA : agrément CREPMF pour la gestion pour
   compte de tiers et l'appel public à l'épargne. En France : statut CIF/SGP sous l'AMF.
   Sans agrément, c'est un délit — pas une zone grise.

**Recommandation :** garder les deux projets **hermétiquement séparés**. KIBARÉ = un logiciel.
Le fonds = une entité régulée, plus tard, avec un avocat. Mélanger les deux tue le logiciel.

---

## 9. FEUILLE DE ROUTE MVP

### Palier 1 — « La preuve » (3 semaines, en solo)
Ollama + Qwen 3 14B, base portefeuille chiffrée, saisie manuelle, un persona (Buffett),
collecte de cours en bloc, journal d'audit visible.
**Critère de réussite :** couper le Wi-Fi, obtenir une analyse de portefeuille argumentée.

### Palier 2 — « Le Conseil » (6 semaines)
5 personas + vue contradictoire, RAG sur le corpus des maîtres avec citations,
analyse fondamentale + technique, ingestion des news, proxy egress durci.
**Critère :** un investisseur tiers l'utilise une semaine sans aide.

### Palier 3 — « La confiance » (6 semaines)
Journal de décision + auto-notation, mode cloud anonymisé avec aperçu, installeur signé
Windows/macOS, contrat des 7 refus dans l'UI, documentation d'audit réseau.
**Critère :** une personne méfiante lance Wireshark, ne trouve rien, et achète.

### Ensuite
Corpus BRVM/UEMOA · mode serveur familial · édition entreprise (comptabilité déconnectée).

---

## 10. RISQUES

| Risque | Gravité | Réponse |
|--------|---------|---------|
| Le modèle local donne un mauvais conseil financier | 🔴 Élevée | Débat contradictoire multi-personas, citations obligatoires, auto-notation, avertissements permanents |
| Les briques sont open source → copiable | 🟠 Moyenne | Le fossé est la confiance prouvée, le corpus BRVM et la marque — pas le code |
| Parc matériel insuffisant chez la cible africaine | 🟠 Moyenne | Cibler diaspora/Europe d'abord, mode serveur ensuite |
| Coût des données de marché de qualité | 🟠 Moyenne | Démarrer sur sources gratuites/OpenBB, licences payantes en option client |
| Dispersion vis-à-vis de TAAMA | 🔴 **Élevée** | Voir §11 |
| Confusion produit / activité de gestion régulée | 🔴 Élevée | Séparation stricte (§8) |

---

## 11. AVIS FRANC SUR LA PRIORISATION

Le dossier `idees-produits.md` porte déjà une règle d'or, et elle est juste :

> *« Un produit à la fois. AgroTrack d'abord. La dispersion est l'ennemi de l'entrepreneur solo. »*

KIBARÉ est **une bonne idée avec un vrai trou de marché**. Ce n'est pas pour autant le bon
produit à lancer *maintenant*, tant que TAAMA n'a pas ses premiers clients payants.

**Position recommandée :** priorité #7, statut 🔵 *Vision — 2027*.
Avec une exception utile : construire le **Palier 1 pour soi-même**, comme outil personnel
de formation à l'investissement. Coût : ~3 semaines de soirées. Bénéfices : on se forme
réellement à l'investissement, on maîtrise la stack IA locale (réutilisable dans IndustrIA),
et on valide le concept sur le seul utilisateur qui compte au début — soi.
**Un outil qu'on utilise tous les jours soi-même est le meilleur cahier des charges qui existe.**

---

## 12. PROCHAINE ÉTAPE CONCRÈTE (ce week-end)

1. Installer Ollama + `qwen3:14b` (ou 8B selon la machine)
2. Saisir son portefeuille réel dans un simple CSV local
3. Écrire un prompt système « Buffett » de 30 lignes avec sa grille chiffrée
4. Poser la question, hors ligne, et juger la qualité de la réponse
5. **Décider sur pièces** : si un 14B local produit un conseil utile → le produit est viable.
   Sinon → le mode hybride anonymisé devient le cœur du produit, pas une option.

Une semaine d'expérimentation vaut trois mois de spéculation.

---

## Sources — état de l'art consulté (septembre 2026)

- [OpenBB — plateforme de données financières open source (+ serveur MCP)](https://github.com/OpenBB-finance/OpenBB)
- [Ollama — exécution locale de LLM, standard de fait](https://www.lionscripts.com/blog/run-local-llm-ollama-private-offline-ai)
- [Meilleurs modèles locaux pour 16 Go VRAM en 2026](https://localllm.in/blog/best-local-llms-16gb-vram)
- [Personal Financial AI Agent — projet open source multi-LLM](https://github.com/merendamattia/personal-financial-ai-agent)
- [Analyse financière privée avec LLM local](https://dzone.com/articles/local-llm-finance-tracker)
- [IA air-gapped en finance régulée et défense](https://www.truefoundry.com/blog/air-gapped-ai-deploying-enterprise-llms-in-highly-regulated-industries)
- [Contrôle d'egress réseau pour agents IA](https://www.stride.build/blog/network-egress-control-ai-agents)
- [Data diode — transfert de données à sens unique](https://www.valiantcom.com/data-diode/data-diode.html)

---

*Fiche rédigée : 3 septembre 2026*
*Statut : 🔵 Vision — à réévaluer après les premiers clients payants de TAAMA*
