# Data Model

## Principle

Store the minimum data required. Raw camera images are temporary by default. Saved scans should prefer extracted text and metadata; retaining an image must be an explicit future feature.

## Local entities

### VisionProfile

- `id: string`
- `name: string`
- `textScale: number`
- `contrastMode: string`
- `spacingMode: string`
- `focusMode: string`
- `speechRate: number`
- `createdAt: string`
- `updatedAt: string`

For MVP there may be one active local profile.

### SavedRead

- `id: string` UUID
- `title: string`
- `originalText: string`
- `normalizedText?: string`
- `sourceType?: string` (document, label, poster, unknown; optional/user-selected)
- `createdAt: string`
- `updatedAt: string`
- `isFavorite: boolean`
- `syncState: string`

### ComprehensionEntry

- `id: string`
- `savedReadId: string`
- `type: string` (`explain`, `simplify`, `definition`, `key_information`)
- `inputExcerpt: string`
- `outputText: string`
- `provider: string`
- `createdAt: string`

Do not overwrite `originalText` with comprehension output.

## Optional Supabase schema

### `profiles`

- `user_id uuid primary key references auth.users`
- `display_name text nullable`
- `created_at timestamptz`
- `updated_at timestamptz`

### `vision_profiles`

- `id uuid primary key`
- `user_id uuid not null`
- `text_scale numeric`
- `contrast_mode text`
- `spacing_mode text`
- `focus_mode text`
- `speech_rate numeric`
- `created_at timestamptz`
- `updated_at timestamptz`

### `saved_reads`

- `id uuid primary key`
- `user_id uuid not null`
- `title text not null`
- `original_text text not null`
- `normalized_text text nullable`
- `source_type text nullable`
- `is_favorite boolean default false`
- `created_at timestamptz`
- `updated_at timestamptz`

### `comprehension_entries`

Do not sync by default in the first MVP. If later enabled, apply the same user ownership/RLS rules.

## RLS principle

Every cloud row is owned by `user_id`. Policies must ensure authenticated users can select/insert/update/delete only their own rows.

## Migration policy

All Supabase schema changes go through versioned SQL migrations under `supabase/migrations/`. Do not make undocumented dashboard-only production changes.
