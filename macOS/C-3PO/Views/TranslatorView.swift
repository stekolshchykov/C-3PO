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
        let _ = C3POLogger.shared.log("TranslatorView.body: sourceLang=\(sourceLanguage) targetLang=\(targetLanguage)")
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
        .onReceive(NotificationCenter.default.publisher(for: .clipboardCaptured)) { notification in
            guard let text = notification.object as? String else { return }
            sourceText = text
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
        C3POLogger.shared.log("triggerTranslation: \(text.prefix(30))")
        guard !text.isEmpty else {
            translatedText = ""
            return
        }
        isTranslating = true

        if sourceLanguage == "auto" {
            configuration = TranslationSession.Configuration(target: Locale.Language(identifier: targetLanguage))
            return
        }

        Task {
            do {
                let result = try await TranslationService.shared.translate(
                    text: text,
                    from: sourceLanguage,
                    to: targetLanguage
                )
                await MainActor.run {
                    translatedText = result
                    isTranslating = false
                }
            } catch TranslationError.modelNotInstalled {
                await MainActor.run {
                    configuration = TranslationSession.Configuration(
                        source: Locale.Language(identifier: sourceLanguage),
                        target: Locale.Language(identifier: targetLanguage)
                    )
                }
            } catch {
                await MainActor.run {
                    translatedText = "Error: \(error.localizedDescription)"
                    isTranslating = false
                }
            }
        }
    }
}
