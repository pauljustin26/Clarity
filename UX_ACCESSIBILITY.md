# UX and Accessibility Specification

## Design principle

The UI itself must never become the accessibility barrier.

## Navigation model

Keep top-level navigation minimal:
- Scan
- My Reads
- Settings / Vision Profile

Avoid deep nested menus for core reading actions.

## Camera screen

Primary visible controls:
- Capture
- Light
- Optional Gallery import if included
- Point & Focus / crop

Feedback examples:
- `Move closer`
- `Too dark`
- `Hold steady`
- `Ready to read`

Feedback must use text plus visual/haptic cues where possible. Never use color alone.

## Reader toolbar

Recommended primary actions:

`A+ Size` | `Contrast` | `Spacing` | `Focus` | `Listen`

`Understand` is a separate prominent action, not mixed into formatting controls.

## Understand actions

- Explain
- Simplify
- Word Helper
- What Matters

Always provide `Original` so generated/transformed text never replaces source text.

## Vision Profile

Store simple presets instead of exposing dozens of technical controls.

Suggested settings:
- Text size: Medium / Large / Extra Large / Huge
- Contrast: Dark on Light / Light on Dark / High Contrast
- Spacing: Normal / Comfortable / Wide
- Focus: Full / Paragraph / 3 Lines / 1 Line
- Speech rate

Use a live preview during configuration.

## Interaction requirements

- Target touch controls at least 48x48 density-independent pixels.
- Avoid tiny icon-only buttons.
- Icons must have visible text for core actions.
- Support portrait orientation first; landscape may be added if tested.
- Do not disable system font scaling.
- Avoid hard-coded heights around text.
- Allow scrolling when content expands.
- Preserve focus position when changing size/contrast when practical.
- Use haptic feedback sparingly for capture/readiness/success.

## Contrast

Use a small number of intentionally designed themes. Do not provide arbitrary foreground/background color pickers in the MVP. Test contrast for text and controls. Disabled states must remain distinguishable.

## Focus mode

Focus mode should reduce visual clutter rather than merely enlarge the same page.

Modes:
- 1 line
- 3 lines
- Paragraph

Provide visible Previous/Next controls in addition to swipe gestures.

## TTS

- Speak current text.
- Stop/pause must remain easy to find.
- If word/sentence highlighting is technically reliable, highlight spoken content; otherwise do not fake synchronization.
- TTS is optional, not the default replacement for visual reading.

## Empty/error states

Examples:

OCR no text:
`No readable text found. Try moving closer, improving the light, or selecting a smaller area.`

Offline cloud sync:
`You're offline. Your scan is saved on this device and can sync later.`

Understand unavailable:
`Reading still works. Understanding tools are unavailable right now.`

## Accessibility QA checklist

Before merging a major screen:
- Test normal and large system text.
- Verify no clipped buttons/labels.
- Verify controls have semantic labels.
- Verify keyboard/screen-reader traversal where applicable.
- Verify state is not communicated only by color.
- Verify all core actions have visible alternatives to gestures.
- Verify dark/light high-contrast modes.
