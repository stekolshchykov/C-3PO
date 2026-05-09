import SwiftUI
import Translation

struct TranslatorView: View {
    @State private var sourceText: String = ""
    @State private var translatedText: String = ""
    @State private var sourceLanguage: String = "en"
    @State private var targetLanguage: String = "ru"
    @State private var isTranslating: Bool = false
    @State private var configuration: TranslationSession.Configuration?

    private let debounceDelay: TimeInterval = 0.5
    @State private var debounceTask: Task<Void, Never>?

    var body: some View {
        C3POLanguagePicker(
            sourceLanguage: $sourceLanguage,
            targetLanguage: $targetLanguage,
            sourceText: $sourceText,
            translatedText: $translatedText,
            onTriggerTranslation: triggerTranslation
        )
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
}
