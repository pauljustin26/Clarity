# OCR and Comprehension Design

## Principle

OCR, presentation, and comprehension are separate capabilities.

- OCR: **What text is here?**
- Reader: **How should this text be presented?**
- Comprehension: **What does this text mean?**

The Reader must work even when comprehension is unavailable.

## MVP OCR decision

**Primary OCR:** Google ML Kit Text Recognition, on-device.

**React Native integration:** access ML Kit behind `OcrService` through an approved React Native native module/wrapper. Vendor-specific types must be converted into domain `OcrResult` objects before reaching feature UI.

Why:
- no per-request OCR fee
- mobile-focused
- works on-device
- avoids uploading potentially sensitive images
- suitable for printed labels, notices, documents, menus, and packaging

ML Kit is free but not an open-source OCR engine. If a strictly open-source requirement is introduced, create a Tesseract or PaddleOCR adapter behind the same interface.

## OCR pipeline

```text
React Native VisionCamera
   ↓
Capture / Crop Image
   ↓
Optional OpenCV preprocessing
   ↓
Google ML Kit Text Recognition
   ↓
OcrResult normalization
   ↓
Accessible Reader
```

Detailed steps:
1. Capture image with VisionCamera.
2. Allow crop / Point & Focus.
3. Evaluate basic image quality.
4. Normalize orientation if needed.
5. Run ML Kit Text Recognition locally.
6. Preserve raw recognized source text.
7. Normalize display whitespace without changing meaning.
8. Open Accessible Reader using the active Vision Profile.

Never silently autocorrect medicine names, numbers, dates, prices, strengths, or dosages.

## Domain result

```ts
export type OcrBlock = {
  text: string;
  boundingBox?: { x: number; y: number; width: number; height: number };
  confidence?: number;
};

export type OcrResult = {
  fullText: string;
  blocks: OcrBlock[];
};
```

If a platform/wrapper does not expose confidence, leave it undefined rather than inventing a value.

## Capture-quality helpers

Low-cost/free heuristics:
- brightness threshold
- blur estimation
- orientation metadata
- crop/region selection

OpenCV is optional. Do not add it unless the simple implementation is insufficient and the dependency is approved.

## Understand architecture

`ComprehensionService` must have replaceable implementations.

### Stage 1 — no LLM
- Word Helper from bundled/open dictionary data
- regex/pattern extraction for dates, times, prices, phone numbers, percentages
- cue-line extraction for warnings/headings
- basic deterministic text cleanup

### Stage 2 — optional local model
A small local model may be investigated later. It must be optional because model size, memory, speed, and device support vary.

### Stage 3 — optional cloud provider
Only if explicitly approved later. Core reading may never depend on it.

## What Matters

Prefer source-grounded extraction.

Examples:
- poster: date, time, venue, fee
- product: price, expiry, warnings
- medicine label: medicine name, strength, printed directions, printed warnings

Every extracted item must map back to OCR source text. If extraction is uncertain, show the source excerpt rather than guessing.

## Simplify / Explain

- Original text always remains available.
- Label output `Simplified` or `Explanation`.
- Do not add unsupported facts.
- For medicine, explain terminology but do not prescribe/recommend treatment.

## Word Helper

MVP flow:
1. User selects a word.
2. Normalize the token.
3. Look up a local dictionary entry.
4. Show a short plain-language definition using the user's Vision Profile.
5. Offer Listen.
