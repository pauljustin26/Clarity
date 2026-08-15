# Security and Privacy

## Privacy posture

Clarity may scan highly sensitive text. Treat every camera frame and OCR result as private by default.

## Default behavior

- OCR locally when possible.
- Do not upload camera frames.
- Do not save a scan unless the user chooses Save.
- Do not require an account for core functionality.
- Cloud sync is opt-in.
- Provide Delete for saved reads.

## Logging

Production logs must not contain:
- Full OCR text
- Captured images
- Medication/document contents
- Auth tokens
- Supabase secrets
- Personal identifiers extracted from documents

Use event names and non-sensitive diagnostics instead.

## Secrets

- `.env` is gitignored.
- `.env.example` contains placeholders.
- Never ship a Supabase service-role key in React Native.
- Assume anything bundled in a client app can be extracted.

## Supabase

- RLS enabled for every user-owned table.
- Test cross-account isolation.
- Use least privilege.
- Do not rely on hidden UI as authorization.

## Medical content

Clarity may help read medicine packaging, but it is not a medical decision system.

UI should distinguish:
- `Original text` / `From the label`
- `Simplified explanation`

Never present generated content as prescribing instructions. If OCR confidence is poor around numbers or medicine names, encourage the user to inspect the original/retake rather than guessing.

## Data deletion

Deleting a local saved read removes its local text and derived comprehension entries. If sync exists, deletion must eventually propagate to the user's cloud row while remaining resilient to temporary network failure.
