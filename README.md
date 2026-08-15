# Clarity

**See it. Read it. Understand it.**

Clarity is an offline-first **React Native + TypeScript** mobile application for people with low vision. It helps users point a phone camera at difficult-to-read printed text, extract that text on-device, transform it into a personalized accessible reading view, and optionally explain or simplify difficult content.

## Problem

People with low vision may still prefer to read visually, but everyday text can be too small, low-contrast, cluttered, poorly spaced, or difficult to understand. Clarity focuses on preserving visual reading while making captured text easier to see and understand.

## Core experience

1. Open the camera.
2. Point at printed text.
3. Receive capture guidance such as hold steady, move closer, or improve lighting.
4. Capture or crop the relevant text region.
5. OCR extracts the text on-device.
6. The Accessible Reader applies the user's Vision Profile.
7. The user can change Size, Contrast, Spacing, Focus, or Listen.
8. Optional Understand tools can Explain, Simplify, define a selected Word, or surface What Matters.
9. The user can save extracted text locally to My Reads.

## Camera-to-reader pipeline

```text
React Native VisionCamera
   ↓
Capture / Crop Image
   ↓
Optional OpenCV preprocessing
   ↓
Google ML Kit Text Recognition
   ↓
Extracted text
   ↓
Accessible Reader
   ├── A+ Size
   ├── ◐ Contrast
   ├── ↔ Spacing
   ├── ☰ Focus
   ├── 🔊 Listen
   └── ✨ Understand
```

> The original concept used the label “Flutter Camera.” Since this repository uses React Native, the implementation uses **React Native VisionCamera** instead.

## MVP features

- Accessible camera with large controls
- Capture-quality guidance
- Google ML Kit on-device OCR for printed text
- Point & Focus / crop-to-read
- Accessible Reader
- Text size controls
- High-contrast reading themes
- Letter and line spacing controls
- Focus / reading-ruler mode
- Text-to-speech
- Vision Profile saved on device
- My Reads local history
- Word Helper
- Explain / Simplify provider interface
- What Matters structured extraction

## Tech stack

- **Client:** React Native + TypeScript
- **State:** React hooks + Context/useReducer for shared app state; do not add a second state library without approval
- **Navigation:** React Navigation
- **Camera:** `react-native-vision-camera`
- **OCR:** Google ML Kit Text Recognition through a vendor-isolated React Native adapter/native bridge
- **Image processing:** OpenCV only if needed for blur/brightness/document-boundary analysis; prefer lightweight native/JS checks first
- **Local storage:** `@react-native-async-storage/async-storage` for MVP preferences and saved text; migrate behind the repository interface if SQLite is later needed
- **Text-to-speech:** platform TTS behind a `SpeechService` adapter
- **Cloud/BaaS:** Supabase for optional authentication, settings backup, and saved-text sync
- **AI/comprehension:** provider abstraction; core reading must not require a paid AI API
- **Testing:** Jest + React Native Testing Library; end-to-end tests may be added later

## OCR choice

The MVP uses **Google ML Kit Text Recognition** because it is free to use, designed for Android/iOS, and supports on-device text recognition. ML Kit is free but is not itself an open-source OCR engine. If the project later requires a strictly open-source OCR stack, implement a Tesseract or PaddleOCR adapter behind the same `OcrService` interface.

Do not upload camera images to Supabase for OCR.

## Do we need a backend?

**No custom backend is required for the MVP.**

Camera, OCR, accessible reading, Vision Profile, TTS, and saved reads should work locally. Supabase is optional infrastructure for accounts and cross-device sync. Do not create an Express, NestJS, FastAPI, or other custom server unless a future requirement cannot safely be handled on-device or by Supabase.

## Cost rule

The core experience must work without a paid API key, credit card, or subscription. Prefer free and open-source libraries. A free proprietary SDK such as ML Kit may be used when explicitly documented and when it does not create per-request cost.

## Local setup

### Prerequisites

- Node.js LTS
- npm
- Android Studio + Android SDK
- JDK version required by the current React Native toolchain
- A physical Android device is strongly recommended for camera/OCR testing
- Supabase project only if testing optional cloud sync

### Install and run

```bash
npm install
cp .env.example .env
npm run android
```

If Supabase is not configured, the app must still run in local-only mode.

### Quality checks

```bash
npm run lint
npm run typecheck
npm test
```

If the repository uses different script names, follow `package.json`; do not invent commands in completion reports.

## Documentation map

- `PRODUCT_REQUIREMENTS.md` — product scope and acceptance criteria
- `ARCHITECTURE.md` — system design and folder ownership
- `AI_RULES.md` — mandatory rules for Codex/AI coding agents
- `UX_ACCESSIBILITY.md` — accessibility and interaction rules
- `DATA_MODEL.md` — local and Supabase data models
- `SUPABASE.md` — cloud responsibilities and RLS expectations
- `OCR_AI.md` — OCR and comprehension architecture
- `SECURITY_PRIVACY.md` — privacy, security, and medical-content boundaries
- `TESTING.md` — testing strategy and definition of done
- `ROADMAP.md` — staged implementation plan
- `IMPLEMENTATION_CHECKLIST.md` — build checklist
- `CODEX_PROMPT.md` — reusable master prompt for Codex

## Product principle

Clarity is not a diagnostic or medical-advice application. It helps users access and understand text. When handling medicine labels, it may extract, enlarge, speak, or explain text already present, but it must not invent dosage, diagnose conditions, recommend medication, or replace a clinician/pharmacist.
