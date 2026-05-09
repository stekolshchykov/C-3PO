import SwiftUI
import Translation

struct TranslatorView: View {
    @State private var sourceText: String = ""
    @State private var translatedText: String = ""
    @State private var sourceLanguage: Locale.Language = .init(identifier: "en")
    @State private var targetLanguage: Locale.Language = .init(identifier: "ru")
    @State private var isTranslating: Bool = false
    @State private var configuration: TranslationSession.Configuration?
    
    private let languages: [Locale.Language] = [
        .init(identifier: "auto"),
        .init(identifier: "en"),
        .init(identifier: "ru"),
        .init(identifier: "de"),
        .init(identifier: "fr"),
        .init(identifier: "es"),
        .init(identifier: "it"),
        .init(identifier: "zh"),
        .init(identifier: "ja"),
        .init(identifier: "ko"),
    ]
    
    var body: some View {
        VStack(spacing: 12) {
            // Language selector
            HStack {
                languagePicker(title: "From", selection: $sourceLanguage)
                
                Button(action: swapLanguages) {
                    Image(systemName: "arrow.left.arrow.right")
                }
                .buttonStyle(.plain)
                
                languagePicker(title: "To", selection: $targetLanguage)
            }
            .padding(.horizontal)
            
            // Source text
            TextEditor(text: $sourceText)
                .font(.body)
                .frame(height: 120)
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(Color.gray.opacity(0.3), lineWidth: 1)
                )
                .padding(.horizontal)
            
            // Translate button
            Button(action: triggerTranslation) {
                HStack {
                    Image(systemName: "translate")
                    Text(isTranslating ? "Translating..." : "Translate")
                }
                .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .disabled(sourceText.isEmpty || isTranslating)
            .padding(.horizontal)
            
            // Translated text
            TextEditor(text: .constant(translatedText))
                .font(.body)
                .frame(height: 120)
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(Color.gray.opacity(0.3), lineWidth: 1)
                )
                .padding(.horizontal)
                .disabled(true)
            
            Spacer()
        }
        .padding(.vertical, 8)
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
    
    private func languagePicker(title: String, selection: Binding<Locale.Language>) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
            Picker("", selection: selection) {
                ForEach(languages, id: \.identifier) { lang in
                    Text(displayName(for: lang))
                        .tag(lang)
                }
            }
            .pickerStyle(.menu)
            .frame(width: 140)
        }
    }
    
    private func displayName(for language: Locale.Language) -> String {
        if language.identifier == "auto" { return "Auto" }
        return Locale.current.localizedString(forLanguageCode: language.languageCode?.identifier ?? "") ?? language.identifier
    }
    
    private func swapLanguages() {
        guard sourceLanguage.identifier != "auto" else { return }
        let temp = sourceLanguage
        sourceLanguage = targetLanguage
        targetLanguage = temp
    }
    
    private func triggerTranslation() {
        guard !sourceText.isEmpty else { return }
        isTranslating = true
        
        if configuration == nil {
            configuration = TranslationSession.Configuration(
                source: sourceLanguage.identifier == "auto" ? nil : sourceLanguage,
                target: targetLanguage
            )
        } else {
            configuration?.invalidate()
        }
    }
}
