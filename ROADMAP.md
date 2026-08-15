# Roadmap

## Phase 0 — Foundation

- Create React Native Expo go + TypeScript project

## Phase 1 — Read

Goal: camera to accessible text works offline.

- VisionCamera screen
- Capture
- Crop / Point & Focus
- `OcrService`
- Google ML Kit adapter
- Loading/error states
- Accessible Reader
- Size / Contrast / Spacing

**Hackathon milestone:** scan small printed text and make it comfortably readable.

## Phase 2 — Personalize

- Vision Profile onboarding
- Persist settings through AsyncStorage repository
- Focus mode
- TTS
- Apply profile automatically

## Phase 3 — Understand without paid AI

- Word Helper
- Pattern-based What Matters
- Explain/Simplify provider interface
- Deterministic fallback behavior

## Phase 4 — Remember

- My Reads
- Rename/delete/favorite
- Preserve Original separately from transformed output

## Phase 5 — Optional Supabase

Only after offline flow is stable:
- Auth
- RLS migrations
- Vision Profile sync
- Saved-text sync
- Retry queue

Do not upload images for MVP.

## Phase 6 — Optional local AI experiment

- Benchmark a small local model on target devices
- Add a local `ComprehensionService` adapter
- Measure model size, memory, latency, and battery impact
- Preserve deterministic/offline reading if the model cannot run

## Recommended hackathon cut line

Ship Phases 1–3 with polished accessibility rather than incomplete cloud/AI features.
