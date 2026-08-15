# AI Rules for Codex and Other Coding Agents

These rules are mandatory unless the human developer explicitly overrides them.

## 1. Read before coding

Before a non-trivial change, read `README.md`, `PRODUCT_REQUIREMENTS.md`, `ARCHITECTURE.md`, `AI_RULES.md`, then the task-relevant docs. Inspect existing code before creating files or abstractions.

## 2. Scope discipline

- Implement only the requested task.
- Do not perform unrelated refactors.
- Do not rename routes, public APIs, storage keys, database columns, or folders without a reason.
- Prefer the smallest maintainable change.
- If requirements conflict, report the conflict before making a risky assumption.

## 3. Dependency rule

- **Do not add, remove, or upgrade npm packages without asking first.**
- Prefer React Native/JavaScript platform capabilities and already-installed dependencies.
- Core functionality must not depend on paid APIs.
- Do not add a custom backend unless explicitly approved.
- Before proposing a dependency, state its purpose, license/cost status when known, and whether it is required or optional.

## 4. React Native / TypeScript rules

- Use TypeScript strict mode; do not weaken strictness to silence errors.
- Use React functional components and hooks only; do not create class components.
- Prefer immutable updates and explicit types at service/domain boundaries.
- Use `async`/`await`; avoid deeply nested Promise chains.
- Keep screen components thin.
- Keep vendor SDK calls out of components.
- Prefer local state; use Context/useReducer for genuinely shared state.
- Use the repository's existing React Navigation setup; do not introduce a second router.
- Avoid `any`; if unavoidable at a native/vendor boundary, isolate and document it.
- Never block the JS thread with expensive image/text processing that can be handled natively or asynchronously.

## 5. Architecture rules

- Follow `ARCHITECTURE.md` dependency direction.
- Supabase code belongs under `src/data/remote/supabase/`.
- OCR adapters belong under `src/data/services/ocr/`.
- Local storage code belongs under `src/data/local/`.
- Feature UI belongs under `src/features/<feature>/`.
- Do not create generic `helpers.ts` or `utils.ts` dumping grounds.
- Google ML Kit must be accessed behind `OcrService`.

## 6. Accessibility is a functional requirement

- Never rely on color alone for state.
- Pair meaningful icons with visible text for core actions.
- Respect system font scaling.
- Avoid fixed-height containers that clip enlarged text.
- Target touch controls at least 48x48 density-independent pixels where practical.
- Maintain strong contrast.
- Add React Native `accessibilityLabel`, `accessibilityRole`, and state metadata where appropriate.
- Ensure logical VoiceOver/TalkBack traversal even though the primary target is low vision.
- Do not hide a core action behind an unlabeled gesture.

## 7. Privacy rules

- OCR camera images locally whenever possible.
- Do not upload captured images by default.
- Never log full OCR text, medicine labels, document contents, images, auth tokens, or private identifiers in production.
- Cloud sync is opt-in.
- Never commit `.env`, service-role keys, or private tokens.
- Supabase clients may use only publishable/anon client credentials with correct RLS.

## 8. Medical-content safety

Allowed: OCR/reformat/read label text, define general terms, summarize clearly labeled source text, extract exact printed dosage/warnings as “From the label.”

Not allowed: invent/recommend dosage, tell users to start/stop/change medicine, diagnose, infer missing contraindications, or present generated medical content as authoritative.

## 9. AI/comprehension rules

- Reading must work if comprehension is unavailable.
- Generated/simplified output never overwrites `originalText`.
- Always provide access to Original text.
- Label transformed output clearly.
- `What Matters` should prefer source-grounded extraction over generation.
- Never hallucinate missing dates, dosages, prices, addresses, warnings, or names.

## 10. Supabase rules

- Use versioned migrations.
- Enable RLS on every user-owned table.
- Enforce ownership in the database, not only in the app UI.
- Do not store raw camera images in Supabase for MVP.

## 11. Testing rules

For changed behavior:
- Add/update Jest unit tests for logic.
- Add React Native Testing Library tests for important component states.
- Add regression tests for bugs.
- Do not delete failing tests just to pass CI.
- Run repository-defined lint, typecheck, and test commands before claiming completion.

## 12. Error handling

- Never expose raw stack traces to users.
- OCR failure offers Retry/Retake/Adjust Crop.
- Network failure never breaks local reading.
- Supabase failure must preserve local data.

## 13. Completion report

Report what changed, files changed, commands actually run and results, assumptions, and remaining manual checks. Never claim a command passed if it was not run.
