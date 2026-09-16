# NameFinder

**NameFinder** (NameGenius) is an AI-powered business-name generator and brand exploration workbench for solo founders.

## Workspace Structure

The project contains multiple prototype implementations under `PALS-CCode/`:

| Path | Description |
|---|---|
| `PALS-CCode/index.html`, `app.js`, `style.css` | Vanilla JS prototype with live `.com` RDAP checks. |
| `PALS-CCode/namegenius/` | Full React + Vite + Tailwind 3 app with deterministic generator (`port 5180`). |
| `PALS-CCode/result-card-app/` | Modern UI pass featuring brief exploration, carousel, and result cards (`port 5178`). |
| `PALS-CCode/s3-card-app/` | Isolated result card gallery (`port 5190`). |
| `PALS-CCode/design/`, `wireframe/`, `s3-card/` | Visual references and canvas comps. |

## Quick Start

```bash
# Run result-card-app
cd PALS-CCode/result-card-app
npm install
npm run dev

# Or run full NameGenius app
cd PALS-CCode/namegenius
npm install
npm run dev
```

For full architectural notes, conventions, and guidelines, see [PALS-CCode/CLAUDE.md](PALS-CCode/CLAUDE.md).
