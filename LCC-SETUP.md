# LocalCodeCli Setup — forge-afrika

LocalCodeCli (LCC v2.4.7) routes Claude Code / Codex requests through **free AI providers** — no Anthropic API credits needed.

---

## Installation summary

| Tool | Version | Location |
|------|---------|----------|
| uv | 0.11.30 | `C:\Users\pc\.local\bin` |
| Python | 3.14.6 | via uv |
| LocalCodeCli | **2.4.7** | uv tool (`lcc-server`, `lcc-claude`, `lcc-codex`) |

---

## Step 1 – Get a free Gemini API key (best starting point)

1. Visit **https://aistudio.google.com/apikey**
2. Sign in with a Google account
3. Click **Create API key**
4. Copy the key — 100% free, no credit card required

---

## Step 2 – Configure model routing

Create `C:\Users\pc\.lcc\.env` (or set these as environment variables):

```env
# Google Gemini — free primary provider
GEMINI_API_KEY=your_gemini_key_here

# Optional: NVIDIA NIM key for the heavy Opus replacement (free tier at build.nvidia.com)
# NVIDIA_NIM_API_KEY=your_nvidia_key_here

# Multi-model routing
MODEL_OPUS=nvidia_nim/moonshotai/kimi-k2.5
MODEL_SONNET=gemini/models/gemini-2.0-flash
MODEL_HAIKU=gemini/models/gemini-2.0-flash-lite
```

### Recommended free model mapping

| Claude tier | Free model | Strengths |
|-------------|------------|-----------|
| **Opus** (heavy) | `nvidia_nim/moonshotai/kimi-k2.5` | Architecture, security, complex reasoning |
| **Sonnet** (normal) | `gemini/models/gemini-2.0-flash` | Everyday coding, refactoring |
| **Haiku** (fast) | `gemini/models/gemini-2.0-flash-lite` | Quick completions, simple lookups |

> Get a free NVIDIA NIM key at **https://build.nvidia.com** (sign in → API Keys). If you skip this, fall back to `gemini/models/gemini-2.0-flash` for all tiers.

---

## Step 3 – Start the proxy

### Quickstart (recommended)

Run the startup script (opens server in a new window, then launches Claude Code here):

```powershell
.\start-lcc.ps1
```

### Manual start

```powershell
# Window 1 — keep this running
lcc-server

# Window 2 — Claude Code through LCC
lcc-claude
```

---

## Installed commands

| Command | Purpose |
|---------|---------|
| `lcc-server` | Local proxy server (must stay running) |
| `lcc-claude` | Claude Code routed through LCC |
| `lcc-codex` | Codex routed through LCC |
| `fcc-server` / `fcc-claude` | Alternative fully-free-provider variants |
| `lcc-init` | Initialize/configure LCC in a project |

---

## Troubleshooting

**`lcc-server` not found after opening a new terminal:**
Add the uv bin directory to your permanent PATH:
- System Properties → Advanced → Environment Variables
- Add `C:\Users\pc\.local\bin` to **User PATH**

**Gemini rate limits hit:**
Set `MODEL_OPUS=nvidia_nim/moonshotai/kimi-k2.5` to offload heavy tasks to NVIDIA NIM's free tier.

**Re-install / upgrade LCC:**
```powershell
uv tool install --force git+https://github.com/Corporationakht/LocalCodeCli.git
```

**GitHub:** https://github.com/Corporationakht/LocalCodeCli
