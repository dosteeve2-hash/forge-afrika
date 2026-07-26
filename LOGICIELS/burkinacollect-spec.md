# BurkinaCollect — Spécification Technique v1.1

> *Document de référence — FORGE Afrika / Steeve Donald Compaore*
> *Mis à jour : 2026-06-28*

---

## 1. Contexte & Problème

Dans les zones rurales du Burkina Faso et d'Afrique de l'Ouest, les agents terrain (agricoles, sanitaires, humanitaires) opèrent dans des zones sans connexion Internet stable. Les outils actuels (Excel hors ligne, papier) entraînent :

- Perte de données estimée à **15–30%** par cycle terrain
- Délais de synchronisation de **3 à 7 jours** après retour en zone connectée
- Impossibilité de supervision en temps réel pour les coordinateurs

**BurkinaCollect** résout ce problème avec une architecture **offline-first** permettant la collecte, le stockage local et la synchronisation différée des données terrain.

---

## 2. Architecture Technique

### Stack principale

```
Frontend    : Next.js 16 (App Router) + React 19 + TypeScript 5
State       : Zustand + React Query (TanStack)
Offline     : Service Worker (Workbox) + IndexedDB + localStorage Queue
Sync        : Custom useOfflineSync hook + WebSocket (reconnect auto)
UI          : Tailwind CSS v4 + shadcn/ui
Maps        : Leaflet.js (tiles offline cachés)
Export      : Papa Parse (CSV) + jsPDF
Deploy      : Vercel (PWA + Edge Functions)
```

### Architecture offline-first

```
┌─────────────────────────────────────────────────────┐
│                   Agent Terrain                       │
│                                                       │
│  [Formulaire] → [IndexedDB Local] → [Sync Queue]    │
│                       ↓                               │
│               Service Worker cache                    │
│               (assets + tiles carte)                  │
└──────────────────────┬──────────────────────────────┘
                        │ Connexion retrouvée
                        ▼
┌─────────────────────────────────────────────────────┐
│                  Serveur / Cloud                      │
│                                                       │
│  [Sync API] → [PostgreSQL] → [Dashboard superviseur] │
└─────────────────────────────────────────────────────┘
```

### Hook clé : `useOfflineSync`

Le hook gère une file persistante en localStorage. Quand la connectivité revient :

1. Il draine la file dans l'ordre FIFO
2. Retentige jusqu'à `MAX_RETRIES = 3` par item
3. Émet des événements `status: "synced" | "error"` au composant parent

```typescript
const { queue, status, isOnline, pendingCount, enqueue, flushQueue } = useOfflineSync(myApiSync);
```

---

## 3. Modules Fonctionnels

| Module | Description | Priorité |
|--------|-------------|----------|
| **Form Builder** | Construction de formulaires terrain glisser-déposer | P0 |
| **Sync Queue** | File offline persistante avec retry auto | P0 |
| **Agent Manager** | Statuts et affectations des agents terrain | P1 |
| **Zone Map** | Carte hors ligne avec marqueurs d'alertes | P1 |
| **Superviseur Dashboard** | Métriques de qualité et de couverture terrain | P1 |
| **Audit Log** | Traçabilité immuable de toutes les actions | P2 |
| **CSV Export** | Export des données collectées par période | P2 |
| **Push Notifications** | Alertes superviseur via Service Worker | P2 |

---

## 4. Modèle de Données

### `FormSubmission`

```typescript
interface FormSubmission {
  id: string;                    // UUID local
  formId: string;                // Référence au formulaire
  agentId: string;               // Agent terrain
  zoneId: string;                // Zone géographique
  payload: Record<string, unknown>; // Réponses
  status: "pending" | "synced" | "failed";
  createdAt: string;             // ISO 8601
  syncedAt?: string;
  retries: number;
}
```

### `SyncQueueItem` (localStorage)

```typescript
interface SyncQueueItem {
  id: string;
  type: "form_submission" | "agent_status" | "zone_alert";
  payload: Record<string, unknown>;
  createdAt: string;
  retries: number;
}
```

---

## 5. PWA & Offline Strategy

### Service Worker (Workbox)

```
Stratégie       : StaleWhileRevalidate (pages/assets)
Stratégie tiles : CacheFirst (OpenStreetMap tiles, 7j TTL)
Stratégie API   : NetworkFirst avec fallback cache 1h
```

### Manifest PWA

```json
{
  "name": "BurkinaCollect",
  "short_name": "BKCollect",
  "start_url": "/dashboard",
  "display": "standalone",
  "background_color": "#0d1117",
  "theme_color": "#3fb950",
  "orientation": "portrait-primary"
}
```

---

## 6. Sécurité & RGPD

- Chiffrement AES-256 des données en IndexedDB (via `crypto.subtle`)
- Authentification JWT + refresh token (expiry 8h)
- Données personnelles des agents anonymisées à l'export
- Conformité RGPD : droit à l'oubli via purge sélective de la queue

---

## 7. Performance & Métriques Cibles

| Métrique | Cible |
|----------|-------|
| LCP (First Load) | < 2.5s sur 3G |
| Sync latency (retour connexion) | < 5s |
| Capacité offline locale | 10 000 soumissions / appareil |
| Fiabilité sync (retry 3x) | > 99.5% |

---

## 8. Roadmap Immédiate

- [ ] **v1.1** — Carte hors ligne avec Leaflet + tiles pré-cachés
- [ ] **v1.2** — Form Builder drag-and-drop (react-dnd)
- [ ] **v1.3** — Notifications Push superviseur (Service Worker)
- [ ] **v2.0** — Intégration KoboToolbox / ODK import/export

---

## 9. Connexions Écosystème FORGE Afrika

BurkinaCollect est interconnecté avec :

- **TAAMA** — Export des données de collecte terrain vers les bilans matières
- **African Hybrid Agent** — Orchestration IA pour analyse prédictive des zones
- **CompTrack** — Export comptable des coûts de collecte terrain

---

*Spécification rédigée le 2026-06-28 — FORGE Afrika — Steeve Donald Compaore*
*Contact : docompaore2@gmail.com*
