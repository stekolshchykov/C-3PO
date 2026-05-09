# C-3PO macOS (Native)

This directory contains the native macOS version of C-3PO, built with Swift, SwiftUI, and AppKit.

## Structure

```
macOS/
├── C-3PO.xcodeproj/      # Xcode project (created via Xcode)
├── C-3PO/
│   ├── App/              # App entry point, lifecycle
│   ├── Services/         # Business logic: translation, TTS, spell check
│   ├── Models/           # Data models, config, history
│   ├── Views/            # SwiftUI views
│   └── Resources/        # Assets, icons, localized strings
├── C-3POTests/           # Unit tests
└── README.md             # This file
```

## Getting Started

1. Open **Xcode**.
2. Create a new macOS App project inside this `macOS/` folder.
3. Name it `C-3PO` (or `C_3PO` if Xcode rejects hyphens).
4. Start building using the native Apple APIs mapped in the project documentation.

## Key Native APIs

- **Translation** — `Translation` framework (iOS 18+ / macOS 15+)
- **TTS** — `AVSpeechSynthesizer`
- **Spell Check** — `NSSpellChecker` / `NSTextCheckingController`
- **Language Detection** — `NLLanguageRecognizer`
- **POS Tagging / Lemmatization** — `NLTagger`
- **Global Hotkeys** — `NSEvent` / `MASShortcut`
- **Menu Bar** — `NSStatusBar`
- **Clipboard** — `NSPasteboard`
- **Storage** — `UserDefaults` / `SwiftData`

## Notes

- The Electron version lives in `../electron/`.
- This native version targets macOS 15+ to leverage the full `Translation` framework.
