# Implementation Checklist

## Repository setup
- [ ] Create React Native + TypeScript project.
- [ ] Copy documentation into the repository.
- [ ] Apply `.gitignore.additions`.
- [ ] Confirm dependency choices before installation.
- [ ] Confirm Android build runs on a physical device.
- [ ] Enable TypeScript strict mode.

## Foundation
- [ ] Establish `src/` architecture folders.
- [ ] Create accessible theme primitives.
- [ ] Add navigation shell.
- [ ] Add local storage repository abstraction.
- [ ] Add test fixtures.

## Scan
- [ ] VisionCamera preview.
- [ ] Large Capture control.
- [ ] Light/torch control when supported.
- [ ] Capture-quality feedback.
- [ ] Crop / Point & Focus.
- [ ] `OcrService` interface.
- [ ] Google ML Kit on-device OCR adapter.
- [ ] OCR loading/error states.

## Reader
- [ ] Original OCR text view.
- [ ] A+ Size control.
- [ ] Contrast presets.
- [ ] Spacing presets.
- [ ] Focus mode.
- [ ] TTS.
- [ ] Vision Profile persistence.

## Understand
- [ ] Original text always available.
- [ ] Word Helper.
- [ ] What Matters deterministic extractor.
- [ ] Explain/Simplify provider interface.
- [ ] Safe unavailable/fallback state.
- [ ] Medical-content boundaries enforced.

## My Reads
- [ ] Save extracted text locally.
- [ ] List/open/rename/favorite/delete saved reads.

## Optional cloud
- [ ] Supabase auth.
- [ ] Versioned migrations.
- [ ] RLS.
- [ ] Vision Profile sync.
- [ ] Saved text sync.
- [ ] Offline retry.
- [ ] Cross-user isolation test.

## Release QA
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] Test large system text/font scaling.
- [ ] Test TalkBack/VoiceOver semantics for primary flow.
- [ ] Test offline.
- [ ] Test poor light and blur.
- [ ] Confirm no camera image upload by default.
- [ ] Confirm no paid API required.
- [ ] Confirm no secrets committed.
