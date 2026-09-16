# Product Requirements Document (PRD): NameFinder

**Product**: NameFinder (AI Brand Studio)  
**Target Audience**: Multi-purpose creators (SaaS builders, newsletter authors, consumer brands, podcasters)  
**Generation Engine**: AI-first (Google Gemini LLM with deep contextual linguistic reasoning + offline fallback)  
**Validation Suite**: Real-time Verisign RDAP domain verification, linguistic scorecards, live multi-format brand mockups, head-to-head comparison arena, and shortlist export.

---

## 1. Executive Summary

Most name generators spit out generic, random keyword concatenations or unpronounceable domain hacks without contextual understanding. **NameFinder** is an AI-first branding workbench designed for creators across diverse domains—whether launching a B2B SaaS, a weekly newsletter, a boutique consumer brand, or an indie podcast.

NameFinder bridges the gap between **creative conceptualization**, **domain feasibility**, and **visual brand validation** in one unified studio.

---

## 2. Target Personas & Use Cases

| Persona | Primary Goal | Critical Constraints |
|---|---|---|
| **SaaS & Tool Builders** | Crisp, modern, memorable tech names with high domain credibility. | Defensible trademark, `.com` / `.ai` / `.io` availability, punchy 1-2 syllables. |
| **Newsletter Authors & Curators** | Engaging, topic-evocative editorial titles with voice and authority. | High memorability, clean URL, matches content tone (investigative, witty, analytical). |
| **Direct-to-Consumer (DTC) Brands** | Tactile, sensory, warm, or prestigious names that look great on physical packaging. | Emotional resonance, evokes quality/craft, luxury or approachable vibe. |
| **Podcasters & Media Creators** | Catchy, conversational titles that stand out in audio directories (Spotify / Apple). | Phonetically rhythmic, punchy audio cadence, standout square cover presence. |

---

## 3. Core Product Pillars

### Pillar 1: Smart Multi-Format Brief Intake
- **Category Selector**: Quickly toggles between `SaaS / Tech`, `Newsletter / Publication`, `DTC / Consumer Brand`, `Podcast / Show`, or `General Startup`.
- **Project Essence**: Intuitive input ("What are you creating? What is its core superpower?").
- **Vibe & Tone Archetypes**:
  - *Modern Tech & Invented* (e.g. Stripe, Figma, Vercel)
  - *Editorial & Thoughtful* (e.g. The Atlantic, Morning Brew, Verge)
  - *Tactile & Organic* (e.g. Aesop, Allbirds, Ember)
  - *Punchy & Compound* (e.g. Ironclad, Basecamp, Snap)
  - *Prestigious & Latinate* (e.g. Veritas, Monocle, Lumina)
- **Target TLD Matrix**: Primary extension preference (`.com`, `.ai`, `.io`, `.co`, `.app`, `.fm`, `.xyz`).

### Pillar 2: AI-First Generative Core
- **Semantic Prompt Engine**: Leverages Gemini 1.5/2.0 with prompt architectures designed specifically for trademark naming theory (phonosemantics, morpheme fusion, sound symbolism).
- **Linguistic Diagnostics for Each Candidate**:
  - Syllable cadence & phonetic pronunciation ease.
  - Brand story rationale ("Why this works for your category").
  - Target audience impression.
- **Offline High-Craft Fallback**: If an API key is omitted or quota is exhausted, seamlessly engages the local linguistic synthesizer so the user experience never stalls.

### Pillar 3: Real-Time Domain Feasibility Suite
- **Direct RDAP Query Engine**: Hits authoritative registries (e.g. Verisign RDAP for `.com` and `.net`) in parallel to report genuine live availability (HTTP 404 = Available, HTTP 200 = Taken).
- **Multi-Extension Feasibility Matrix**: Instant visual badges for `.com`, `.ai`, `.io`, `.co`, `.app`, etc.
- **One-Click Action**: Instant direct registration links to transparent registrars (Porkbun, Namecheap) without loud affiliate popups.

### Pillar 4: Live Multi-Format Brand Mockups
Creators struggle to envision raw text. NameFinder renders any candidate name dynamically across 4 contextual mockups:
1. **SaaS Landing Page Hero**: Browser window frame with live navigation, hero headline, and interactive CTA.
2. **Mobile App Icon (Squircle)**: High-resolution iOS app icon with dynamic monogram branding on an iPhone canvas.
3. **Luxury Matte Business Card**: Minimalist debossed presentation with gold/silver foil accent.
4. **Editorial / Media Header**: Clean newsletter masthead or square podcast cover art.

### Pillar 5: Evaluation, Comparison & Export
- **Head-to-Head Comparison Arena**: Side-by-side battle between 2 finalists comparing length, syllables, domain feasibility, and brand vibe with a "Crown Winner" celebration.
- **Shortlist Drawer**: Persistent bookmarking across sessions (`localStorage`).
- **One-Click Export**:
  - Formatted text summary (Name + Domains + Rationale) for team Slack / Notion.
  - CSV format (for spreadsheet analysis).
  - JSON format (for developer integration).

---

## 4. Stage-Wise Implementation Roadmap

We will build and review this application across 5 sequential stages:

### 📍 Stage 1: Design System & Visual Foundation
- Align on the user's visual references (locking color tokens, typography, glassmorphism, responsive grid).
- Establish the master application layout: Header, Studio Navigator, and Status Bar.
- Build the foundation styles and reusable UI components.

### 📍 Stage 2: Brief Intake & AI Generation Engine
- Build the interactive Multi-Format Brief studio with category-aware presets (SaaS, Newsletter, Consumer, Podcast).
- Implement the Gemini AI integration with prompt chaining and structured JSON output.
- Implement the offline linguistic backup engine for guaranteed zero-downtime generation.

### 📍 Stage 3: Real-Time RDAP Domain Suite & Result Cards
- Connect live Verisign RDAP checking for authoritative `.com` verification.
- Build the rich Result Card component (custom monograms, domain status pills, phonetic score, brand story).
- Implement filtering, sorting (by fit, length, availability), and search.

### 📍 Stage 4: Live Multi-Format Brand Mockup Visualizer
- Build the dynamic mockup modal displaying candidate names across the 4 canvases:
  - SaaS Browser Hero
  - Mobile App Icon
  - Minimal Business Card
  - Media / Podcast Masthead
- Interactive controls to toggle mockup styles and color themes.

### 📍 Stage 5: Comparison Arena, Shortlist & Export
- Build the side-by-side Head-to-Head Compare drawer with criteria scoring.
- Implement the Shortlist manager with persistent local storage.
- Add multi-format export (Clipboard, CSV, JSON).
- End-to-end browser walkthrough, performance polish, and final verification.

---

## 5. Visual Aesthetic Alignment (Pending Reference)
*(Awaiting your visual references to tune exact color accents, card borders, typography weights, and interaction motion).*
