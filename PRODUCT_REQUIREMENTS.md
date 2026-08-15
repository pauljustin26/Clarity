# Product Requirements

## Product name

Working name: **Clarity**

Tagline: **See it. Read it. Understand it.**

## Target user

Primary: people with low vision who retain useful vision and want assistance reading physical text.

Secondary: older adults and users who benefit from larger, cleaner, simpler presentation of printed text.

The MVP is not designed primarily as a navigation aid for totally blind users.

## Jobs to be done

- When text in the physical world is difficult to see, help me capture and read it comfortably.
- When a page is visually cluttered, show only the text I care about.
- When wording is difficult, help me understand it without losing access to the original.
- Remember how I prefer text to look so I do not adjust every scan repeatedly.

## Primary user journey

1. Launch app.
2. Camera opens with large Capture and Light controls.
3. Guidance indicates capture quality.
4. User captures the full frame or selects Point & Focus region.
5. OCR runs.
6. Accessible Reader opens using the Vision Profile.
7. User may change Size, Contrast, Spacing, Focus, or Listen.
8. User may open Understand: Explain, Simplify, Word Helper, What Matters.
9. User may save the scan.

## MVP functional requirements

### FR-01 Camera
The user can open the camera and capture an image of printed text.

### FR-02 Capture guidance
The app provides understandable feedback for obvious blur or poor brightness when feasible.

### FR-03 Region selection
The user can crop/select a region before OCR or choose a detected text region.

### FR-04 OCR
The app extracts printed text on-device where possible. OCR failure provides Retake and Adjust Crop actions.

### FR-05 Accessible Reader
Extracted text is displayed separately from the image in a clean reading surface.

### FR-06 Size
The user can increase/decrease text size without clipping core content.

### FR-07 Contrast
The user can select from a small set of tested high-contrast themes.

### FR-08 Spacing
The user can adjust line and/or letter spacing using simple presets.

### FR-09 Focus
The user can read one line, a few lines, or a paragraph at a time.

### FR-10 Listen
The app can speak extracted text and stop/pause playback.

### FR-11 Vision Profile
Preferred size, contrast, spacing, and focus settings persist locally and apply automatically.

### FR-12 My Reads
The user can explicitly save, reopen, rename, and delete extracted scans locally.

### FR-13 Word Helper
The user can select a word and request a plain-language definition.

### FR-14 Simplify / Explain
The system supports a comprehension provider but reading does not depend on it. If unavailable, the app communicates that clearly.

### FR-15 What Matters
The app can surface key items from supported text using source-grounded extraction. Initial supported patterns may include dates, times, currency, percentages, phone numbers, addresses, medicine strength/dosage phrases, and warning-like lines.

## Non-functional requirements

- Core read flow works without internet.
- No paid API is required for the core read flow.
- Camera images are not uploaded by default.
- App remains usable at large text scales.
- Common primary actions are reachable with large visible controls.
- OCR and capture processing should provide visible progress and avoid freezing the UI.
- Local scans survive app restart.

## Out of scope for MVP

- Navigation/obstacle avoidance
- Face recognition
- Currency recognition
- Medical diagnosis
- Medication recommendations
- Automatic prescription interpretation
- Live human assistance
- Social/community features
- Custom web backend
- Mandatory cloud account
- Cloud storage of captured images

## Success metrics for a hackathon/user study

- Task completion: user successfully captures and reads target text.
- Time to readable text.
- OCR correction/error rate on selected samples.
- Number of taps from launch to readable text.
- User-rated readability before vs. after transformation.
- User-rated usefulness of Size, Contrast, Spacing, Focus, Listen, and Understand.
- Comprehension questions answered correctly after using Simplify/Explain, if tested.

## Demo scenarios

1. Medicine package with small text: show visual transformation and label-grounded key extraction.
2. Event poster: What Matters extracts date, time, and location.
3. Formal notice: Simplify converts difficult wording into plain language while Original remains available.
4. Price/product label: Quick Read makes a small value immediately large.
