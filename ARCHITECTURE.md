# Architecture

## Goals

- Offline-first
- Low-vision-first UI
- No paid dependency required for core functionality
- Privacy by default
- Replaceable OCR and comprehension engines
- Thin screens, testable domain logic
- Supabase optional, never required for local reading

## High-level design

```text
React Native UI
   |
   +-- Camera / Capture
   +-- Accessible Reader
   +-- My Reads
   +-- Vision Profile
   +-- Understand
           |
Application / Use Cases
           |
Domain interfaces
   |        |          |             |
 OCR      Speech     Storage     Comprehension
   |        |          |             |
ML Kit   Native TTS  AsyncStorage  Rules/dictionary
adapter    adapter    repository    optional local model
                           |
                      Sync repository
                           |
                     Supabase (optional)
```

## Backend decision

Do not build a custom backend for the MVP. Supabase may provide Auth, Postgres storage for opt-in text/settings sync, and Row Level Security. Raw camera images are not uploaded in the MVP.

## Recommended folder structure

```text
clarity/
├── android/
├── ios/
├── assets/
│   ├── dictionaries/
│   └── fixtures/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── navigation/
│   │   └── theme/
│   ├── core/
│   │   ├── accessibility/
│   │   ├── errors/
│   │   ├── logging/
│   │   └── utils/
│   ├── domain/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── services/
│   ├── data/
│   │   ├── local/
│   │   │   ├── storage/
│   │   │   └── preferences/
│   │   ├── remote/
│   │   │   └── supabase/
│   │   ├── repositories/
│   │   └── services/
│   │       ├── ocr/
│   │       ├── speech/
│   │       ├── imageQuality/
│   │       └── comprehension/
│   └── features/
│       ├── camera/
│       ├── reader/
│       ├── understand/
│       ├── myReads/
│       ├── visionProfile/
│       ├── onboarding/
│       └── settings/
├── __tests__/
├── e2e/
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── docs/
├── .env.example
├── package.json
├── tsconfig.json
├── README.md
├── ARCHITECTURE.md
└── AI_RULES.md
```

## Layer responsibilities

### `src/features/`
Screens, feature-specific hooks, presentation components, and feature orchestration. Do not call Supabase, ML Kit, AsyncStorage, or native vendor SDKs directly from screen components.

### `src/domain/`
Pure TypeScript models and interfaces. This layer must not import React Native UI, Supabase, VisionCamera, ML Kit, or storage implementations.

### `src/data/`
Concrete repository and service adapters. Vendor-specific integration belongs here.

### `src/core/`
Shared accessibility primitives, error handling, logging policy, and small cross-feature utilities. Do not turn this into a dumping ground.

## Important interfaces

```ts
export interface OcrService {
  recognize(input: OcrInput): Promise<OcrResult>;
}

export interface ComprehensionService {
  explain(text: string): Promise<ComprehensionResult>;
  simplify(text: string): Promise<ComprehensionResult>;
  defineWord(word: string, context?: string): Promise<ComprehensionResult>;
  extractKeyInformation(text: string): Promise<KeyInformationResult>;
}

export interface SpeechService {
  speak(text: string): Promise<void>;
  stop(): Promise<void>;
}

export interface SavedReadRepository {
  list(): Promise<SavedRead[]>;
  getById(id: string): Promise<SavedRead | null>;
  save(read: SavedRead): Promise<void>;
  delete(id: string): Promise<void>;
}
```

## Scan-to-reader data flow

1. VisionCamera produces a captured image.
2. Image-quality service checks simple blur/brightness signals.
3. User captures/crops a region.
4. `OcrService` invokes Google ML Kit Text Recognition.
5. Adapter returns normalized text blocks plus geometry/confidence when available.
6. Reader opens with source text intact.
7. Vision Profile settings are applied at render time.
8. TTS and Understand operate on extracted text, not on camera frames.
9. Saving persists text/metadata locally; raw images are temporary by default.

## State management

Prefer local component state for local UI. Use React Context + hooks/useReducer only for truly shared app state such as the active Vision Profile. Avoid a global store for everything. Do not add Redux, Zustand, MobX, or another state package without explicit approval.

## Local persistence

For the hackathon MVP, AsyncStorage is acceptable for Vision Profile and a modest number of saved text records. Access it only through repository adapters. This keeps migration to SQLite possible without rewriting UI/domain code.

## Dependency direction

`presentation -> application/use-cases -> domain <- data/adapters`

Domain code never imports presentation or concrete data implementations.
