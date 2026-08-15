# Supabase Guide

## Role in Clarity

Supabase is optional infrastructure for cloud convenience. It is not required for the camera-to-reader flow.

## Use Supabase for

- Optional email/social authentication if the team chooses to implement accounts
- Syncing Vision Profile settings
- Syncing saved extracted text across devices
- Future user preferences

## Do not use Supabase for MVP

- OCR processing
- TTS processing
- Mandatory app startup
- Raw camera-image storage
- Medical reasoning
- Secrets that require a trusted server

## Local-only mode

The app must launch and support scanning/reading without Supabase configuration. Cloud-only UI should be hidden or show an optional setup path.

## Environment variables

Use compile-time/environment configuration. `.env.example` may contain placeholders only.

Never commit:
- service-role key
- private API tokens
- real user credentials

## RLS

Enable Row Level Security on every user-owned table before allowing client access.

Conceptual ownership condition:

```sql
user_id = auth.uid()
```

Create explicit policies for SELECT, INSERT, UPDATE, and DELETE. Test policies with two different users to ensure cross-user access fails.

## Sync strategy for MVP

- Local storage is immediately updated.
- Sync is best-effort when signed in and online.
- Failed sync keeps local data intact.
- Preferences can use last-write-wins based on `updated_at`.
- Never infer that a missing cloud row means local content should be deleted.

## Images

Do not upload captured images in MVP. OCR source images may contain sensitive personal, financial, school, or health information. If image backup is added later, require explicit consent, private buckets, signed access, retention controls, and a clear delete flow.
