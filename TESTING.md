# Testing Strategy

## Definition of done

A feature is not done until:
- formatting/linting follows repository configuration
- TypeScript checks have no new errors
- relevant Jest tests pass
- important accessibility states are manually checked
- offline behavior is considered
- no paid service is accidentally required

## Unit tests

Prioritize:
- Vision Profile mapping/persistence
- OCR result normalization
- What Matters extractors
- Word Helper lookup
- sync conflict logic
- repository behavior
- deterministic medical-content guardrails

## Component tests

Use React Native Testing Library for:
- Reader with large text/font scaling
- Contrast and Spacing presets
- Focus mode controls
- OCR error/empty states
- Understand unavailable state
- visible labels + accessibility roles for core buttons
- My Reads states

## Native integration checks

Camera, ML Kit OCR, permissions, TTS, and haptics require physical-device testing. Mock them at the JS boundary in unit/component tests; verify real adapters manually/in integration tests.

## Manual accessibility QA

- large system font
- screen magnification where available
- TalkBack/VoiceOver traversal
- high-contrast themes
- controls usable without relying on icon shape/color alone
- no clipped text at large scale
- visible alternative for gestures

## OCR test corpus

Keep non-sensitive fixtures representing:
- medicine packaging
- event poster
- formal notice
- product/price label
- receipt-like text
- low light / blur samples when legally distributable

Do not commit real private user documents.

## Commands

Use scripts defined in `package.json`. Expected baseline:

```bash
npm run lint
npm run typecheck
npm test
```

Do not claim a command passed unless it was actually executed.
