# Job Application Autofill (Chrome extension)

Brief rule-based Chrome extension that scans form fields, matches them to a saved user profile, and autofills supported inputs.

## Key Features
- Rule-based field detection and matching
- Save and edit a reusable `userProfile` via the options page
- Popup preview of detected matches before filling
- Autofill for text, email, tel, textarea, and select fields

## Installation (dev)
1. Install dependencies:

```bash
cd /Users/ananya/Chrome_JobPlugin
npm install
```

2. Development server (live reload for extension pages):

```bash
npm run dev
```

3. Build for distribution:

```bash
npm run build
```

Load the built `dist` folder in Chrome via Extensions → Load unpacked.

## Usage
1. Open the extension popup and click "Scan" to detect form fields on the active page.
2. Review matched fields in the popup and click "Fill" to apply values from your profile.
3. Edit or create profiles in the Options page (accessible from the extension or `chrome://extensions` → Details → Options).

## Configuration & Storage
- Profile is stored in `chrome.storage.local` under the key `userProfile`.
- Profile schema (examples) include name, email, phone, address, education, work history, and links; see `src/shared/types.ts` for full typings.

## Project structure (important files)
- `src/content.ts` — content script: scans and applies fills
- `src/popup.tsx` — popup UI and messaging
- `src/options.tsx` — profile editor
- `src/shared/` — `storage.ts`, `fieldScanner.ts`, `fieldMatcher.ts`, `ProfileForm.tsx`, `types.ts`

## Development notes
- Built with React + TypeScript + Vite for fast iteration and multiple entry points.
- Styling uses Tailwind CSS for a compact UI.
- Manifest V3 is used for Chrome compatibility.

## Phase 1 scope
- Implements profile storage, scanning, matching, and autofill for standard inputs. No AI features included.

## Contributing
- File issues or open pull requests for bugs and small improvements. Follow TypeScript and linting rules in the repo.

## License
MIT
