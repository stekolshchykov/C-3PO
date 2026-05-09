import SwiftUI
import Translation

struct TranslatorView: View {
    @State private var sourceText: String = ""
    @State private var translatedText: String = ""
    @State private var sourceLanguage: String = "en"
    @State private var targetLanguage: String = "ru"
    @State private var isTranslating: Bool = false
    @State private var configuration: TranslationSession.Configuration?

    @State private var languageListStatus: String? = nil // "from", "to", or nil
    @State private var searchLanguage: String = ""

    private let languages = Language.all
    private let debounceDelay: TimeInterval = 0.5
    @State private var debounceTask: Task<Void, Never>?

    var body: some View {
        VStack(spacing: 0) {
            // Top language bar
            HStack(spacing: 0) {
                languageButton(title: displayName(for: sourceLanguage), isOpen: languageListStatus == "from") {
                    toggleLanguageList("from")
                }
                .frame(maxWidth: .infinity)

                Button(action: swapLanguages) {
                    Image(systemName: "arrow.left.arrow.right")
                        .font(.system(size: 18))
                        .foregroundColor(.c3poWhite)
                        .frame(width: 44)
                }
                .buttonStyle(.plain)

                languageButton(title: displayName(for: targetLanguage), isOpen: languageListStatus == "to") {
                    toggleLanguageList("to")
                }
                .frame(maxWidth: .infinity)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 12)

            // Text areas
            ZStack {
                HStack(spacing: 1) {
                    textArea(text: $sourceText, placeholder: "from", language: sourceLanguage)
                    textArea(text: .constant(translatedText), placeholder: "to", language: targetLanguage, isReadOnly: true)
                }
                .padding(.horizontal, 8)

                // Language overlay
                if let status = languageListStatus {
                    languageOverlay(status: status)
                        .padding(.horizontal, 8)
                }
            }
            .frame(maxHeight: .infinity)
        }
        .background(Color.c3poGrayLight)
        .onChange(of: sourceText) { _, newValue in
            debounceTask?.cancel()
            debounceTask = Task {
                try? await Task.sleep(nanoseconds: UInt64(debounceDelay * 1_000_000_000))
                guard !Task.isCancelled else { return }
                triggerTranslation(newValue)
            }
        }
        .translationTask(configuration) { session in
            do {
                let response = try await session.translate(sourceText)
                translatedText = response.targetText
            } catch {
                translatedText = "Error: \(error.localizedDescription)"
            }
            isTranslating = false
        }
    }

    private func languageButton(title: String, isOpen: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            HStack(spacing: 8) {
                Text(title.capitalized)
                    .font(.c3poBody)
                Image(systemName: isOpen ? "chevron.up" : "chevron.down")
                    .font(.system(size: 12))
            }
            .foregroundColor(.c3poWhite)
            .padding(.horizontal, 20)
            .frame(height: 36)
            .background(Color.c3poGray)
            .cornerRadius(6)
            .overlay(
                Group {
                    if isOpen {
                        Triangle()
                            .fill(Color.c3poGrayDark)
                            .frame(width: 14, height: 10)
                            .rotationEffect(.degrees(180))
                            .offset(y: 23)
                    }
                }
            )
        }
        .buttonStyle(.plain)
    }

    private func textArea(text: Binding<String>, placeholder: String, language: String, isReadOnly: Bool = false) -> some View {
        ZStack(alignment: .topLeading) {
            Color.c3poGrayDark

            TextEditor(text: text)
                .font(.c3poBody)
                .foregroundColor(.c3poWhite)
                .scrollContentBackground(.hidden)
                .background(Color.clear)
                .padding(8)
                .disabled(isReadOnly)

            if text.wrappedValue.isEmpty && !isReadOnly {
                Text(placeholder)
                    .foregroundColor(Color.c3poWhite.opacity(0.4))
                    .padding(.horizontal, 20)
                    .padding(.vertical, 16)
                    .allowsHitTesting(false)
            }

            // Floating buttons
            if !text.wrappedValue.isEmpty {
                VStack(spacing: 10) {
                    if !isReadOnly {
                        Button(action: { speak(text.wrappedValue, language: language) }) {
                            Image(systemName: "speaker.wave.2")
                                .font(.system(size: 16))
                                .foregroundColor(.c3poWhite.opacity(0.6))
                        }
                        .buttonStyle(.plain)
                    }
                    Button(action: { copyToClipboard(text.wrappedValue) }) {
                        Image(systemName: "doc.on.doc")
                            .font(.system(size: 16))
                            .foregroundColor(.c3poWhite.opacity(0.6))
                    }
                    .buttonStyle(.plain)
                }
                .padding(.trailing, 12)
                .padding(.top, 12)
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topTrailing)
            }
        }
    }

    private func languageOverlay(status: String) -> some View {
        VStack(spacing: 0) {
            TextField("", text: $searchLanguage, prompt: Text("Language name...").foregroundColor(Color.c3poWhite.opacity(0.5)))
                .font(.c3poBody)
                .foregroundColor(.c3poWhite)
                .textFieldStyle(.plain)
                .padding(12)
                .background(Color.c3poGray)

            ScrollView {
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                    if status == "from" {
                        languageButtonGrid(title: "Auto", code: "auto", status: status)
                    }
                    ForEach(filteredLanguages, id: \.id) { lang in
                        languageButtonGrid(title: lang.name, code: lang.id, status: status)
                    }
                }
                .padding(12)
            }
        }
        .background(Color.c3poGrayDark)
    }

    private func languageButtonGrid(title: String, code: String, status: String) -> some View {
        let isActive = (status == "from" && sourceLanguage == code) || (status == "to" && targetLanguage == code)
        return Button(action: {
            if status == "from" {
                sourceLanguage = code
            } else {
                targetLanguage = code
            }
            languageListStatus = nil
            searchLanguage = ""
            triggerTranslation(sourceText)
        }) {
            Text(title)
                .font(.c3poBody)
                .foregroundColor(isActive ? .c3poGray : .c3poWhite)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 8)
                .background(isActive ? Color.c3poYellow : Color.clear)
                .cornerRadius(4)
        }
        .buttonStyle(.plain)
    }

    private var filteredLanguages: [Language] {
        let list = languages.filter { $0.id != "auto" }
        if searchLanguage.isEmpty { return list }
        return list.filter { $0.name.lowercased().contains(searchLanguage.lowercased().trimmingCharacters(in: .whitespaces)) }
    }

    private func displayName(for code: String) -> String {
        if code == "auto" { return "Auto" }
        return languages.first(where: { $0.id == code })?.name ?? code
    }

    private func swapLanguages() {
        guard sourceLanguage != "auto" else { return }
        let temp = sourceLanguage
        sourceLanguage = targetLanguage
        targetLanguage = temp
        let tempText = sourceText
        sourceText = translatedText
        translatedText = tempText
        languageListStatus = nil
        triggerTranslation(sourceText)
    }

    private func toggleLanguageList(_ status: String) {
        if languageListStatus == status {
            languageListStatus = nil
        } else {
            languageListStatus = status
            searchLanguage = ""
        }
    }

    private func triggerTranslation(_ text: String) {
        guard !text.isEmpty else {
            translatedText = ""
            return
        }
        isTranslating = true
        let src: Locale.Language? = sourceLanguage == "auto" ? nil : Locale.Language(identifier: sourceLanguage)
        let tgt = Locale.Language(identifier: targetLanguage)
        configuration = TranslationSession.Configuration(source: src, target: tgt)
    }

    private func copyToClipboard(_ text: String) {
        let pasteboard = NSPasteboard.general
        pasteboard.clearContents()
        pasteboard.setString(text, forType: .string)
    }

    private func speak(_ text: String, language: String) {
        // TODO: implement TTS via AVSpeechSynthesizer
    }
}
