import SwiftUI
import Translation
import NaturalLanguage

struct TranslatorView: View {
    @State private var sourceText: String = ""
    @State private var translatedText: String = ""
    @State private var sourceLanguage: String = "en"
    @State private var targetLanguage: String = "ru"
    @State private var isTranslating: Bool = false
    @State private var configuration: TranslationSession.Configuration?
    @State private var needsDownload: Bool = false
    @State private var downloadConfig: TranslationSession.Configuration?

    private let debounceDelay: TimeInterval = 0.5
    @State private var debounceTask: Task<Void, Never>?

    var body: some View {
        let _ = C3POLogger.shared.log("TranslatorView.body: sourceLang=\(sourceLanguage) targetLang=\(targetLanguage)")
        ZStack {
            C3POLanguagePicker(
                sourceLanguage: $sourceLanguage,
                targetLanguage: $targetLanguage,
                sourceText: $sourceText,
                translatedText: $translatedText,
                onTriggerTranslation: triggerTranslation
            )
            .background(Color.c3poGrayLight)

            if needsDownload {
                VStack {
                    HStack(spacing: 12) {
                        Image(systemName: "arrow.down.circle")
                            .foregroundColor(.c3poYellow)
                        Text("Translation model needed for this language pair.")
                            .font(.c3poCaption)
                            .foregroundColor(.c3poWhite)
                        Spacer()
                        Button(action: startDownload) {
                            Text("Download")
                                .font(.c3poCaption)
                                .foregroundColor(.c3poGrayDark)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 4)
                                .background(Color.c3poYellow)
                                .cornerRadius(4)
                        }
                        .buttonStyle(.plain)
                        Button(action: { needsDownload = false }) {
                            Image(systemName: "xmark")
                                .font(.system(size: 12))
                                .foregroundColor(.c3poWhite)
                        }
                        .buttonStyle(.plain)
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(Color.c3poGray)
                    .cornerRadius(6)
                    .padding(.horizontal, 8)
                    .padding(.top, 8)

                    Spacer()
                }
                .translationTask(downloadConfig) { session in
                    do {
                        try await session.prepareTranslation()
                        needsDownload = false
                    } catch {
                        C3POLogger.shared.log("Download failed: \(error.localizedDescription)")
                    }
                }
            }
        }
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
        .onAppear {
            Task { await checkLanguageAvailability() }
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

    private func checkLanguageAvailability() async {
        guard sourceLanguage != "auto" else { return }
        let availability = LanguageAvailability()
        let source = Locale.Language(identifier: sourceLanguage)
        let target = Locale.Language(identifier: targetLanguage)
        let status = await availability.status(from: source, to: target)
        if status == .supported {
            needsDownload = true
        }
    }

    private func startDownload() {
        downloadConfig = TranslationSession.Configuration(
            source: Locale.Language(identifier: sourceLanguage),
            target: Locale.Language(identifier: targetLanguage)
        )
    }

    private func detectLanguage(_ text: String) -> String {
        let recognizer = NLLanguageRecognizer()
        recognizer.processString(text)
        let hypotheses = recognizer.languageHypotheses(withMaximum: 5)
        let supportedCodes = Set(Language.all.map { $0.id })
        let codeMapping: [String: String] = [
            "zh-Hans": "zh-CN",
            "zh-Hant": "zh-TW",
        ]
        for (language, _) in hypotheses.sorted(by: { $0.value > $1.value }) {
            let rawCode = language.rawValue
            let mappedCode = codeMapping[rawCode] ?? rawCode
            if supportedCodes.contains(mappedCode) {
                return mappedCode
            }
        }
        return "en"
    }

    private func triggerTranslation(_ text: String) {
        C3POLogger.shared.log("triggerTranslation: \(text.prefix(30))")
        guard !text.isEmpty else {
            translatedText = ""
            return
        }
        isTranslating = true

        if sourceLanguage == "auto" {
            let detected = detectLanguage(text)
            configuration = TranslationSession.Configuration(
                source: Locale.Language(identifier: detected),
                target: Locale.Language(identifier: targetLanguage)
            )
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
