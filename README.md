# Job Application Autofill — Phase 1

## Overview
This is a Chrome extension prototype for rule-based job application autofill. It stores a user profile in `chrome.storage.local`, scans page form fields, maps them to profile values, and fills supported inputs on demand.

## Tech Stack Choices

- **React**: Rapid UI development for popup and profile options pages.
- **TypeScript**: Strong typing helps maintain predictable message contracts and safer field matching logic.
- **Vite**: Fast build and development experience with modern ES modules.
- **Tailwind CSS**: Lightweight styling for a clean, compact extension UI.
- **Manifest V3**: Required by Chrome for new extension APIs and service model.

### Why this stack?
- React + TypeScript provides a maintainable foundation for future phases, especially as the UI grows and AI features are introduced.
- Vite is a great fit for Chrome extension development because it supports multiple entrypoints and fast rebuilds.
- Tailwind keeps the UI simple without adding heavy CSS frameworks.
- Manifest V3 is the current Chrome extension standard and ensures compatibility with modern browser security and permissions.

## Architecture

### Component structure
- `src/popup.tsx`: Popup UI for scanning pages and launching autofill.
- `src/options.tsx`: Profile settings editor where users store their personal, education, professional, and link data.
- `src/shared/ProfileForm.tsx`: Shared profile form component used in options.
- `src/shared/*`: Shared logic for profile defaults, storage, field scanning, and rule-based matching.

### Content script flow
- `src/content.ts` is injected into pages using `content_scripts`.
- It listens for messages from the popup.
- A scan request triggers `scanFields()` and then `matchField()` for each detected form element.
- A fill request re-locates each target element and applies the selected profile value.

### Storage flow
- User profile is saved in `chrome.storage.local` under `userProfile`.
- The options page reads and writes the profile data.
- The content script reads the profile when scanning fields.

## How to run

```bash
cd /Users/ananya/Chrome_JobPlugin
npm install
npm run build
```

After build, load the `dist` folder in Chrome as an unpacked extension.

## Phase 1 coverage
- Profile data storage
- Page field detection via content script
- Modular rule-based mapping engine
- Popup preview of matched fields
- Autofill for standard text, email, tel, textarea, and select fields
- No AI integration in this phase
