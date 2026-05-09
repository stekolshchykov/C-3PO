import SwiftUI
import Translation

struct TranslatorView: View {
    @State private var sourceText: String = ""
    @State private var translatedText: String = ""
    @State private var sourceLanguageCode: String = "en"
    @State private var targetLanguageCode: String = "ru"
    @State private var isTranslating: Bool = false
    @State private var configuration: TranslationSession.Configuration?
    
    private let languageCodes: [String] = [
        "auto", "en", "ru", "de", "fr", "es", "it", "zh", "ja", "ko"
    ]
    
    var body: some View {
        VStack(spacing: 12) {
            // Language selector
            HStack {
                languagePicker(title: "From", selection: $sourceLanguageCode)
                
                Button(action: swapLanguages) {
                    Image(systemName: "arrow.left.arrow.right")
                }
                .buttonStyle(.plain)
                
                languagePicker(title: "To", selection: $targetLanguageCode)
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
    
    private func languagePicker(title: String, selection: Binding<String>) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
            Picker("", selection: selection) {
                ForEach(languageCodes, id: \.self) { code in
                    Text(displayName(for: code))
                        .tag(code)
                }
            }
            .pickerStyle(.menu)
            .frame(width: 140)
        }
    }
    
    private func displayName(for code: String) -> String {
        if code == "auto" { return "Auto" }
        return Locale.current.localizedString(forLanguageCode: code) ?? code
    }
    
    private func swapLanguages() {
        guard sourceLanguageCode != "auto" else { return }
        let temp = sourceLanguageCode
        sourceLanguageCode = targetLanguageCode
        targetLanguageCode = temp
    }
    
    private func triggerTranslation() {
        guard !sourceText.isEmpty else { return }
        isTranslating = true
        
        let source = sourceLanguageCode == "auto" ? nil : Locale.Language(identifier: sourceLanguageCode)
        let target = Locale.Language(identifier: targetLanguageCode)
        
        if configuration == nil {
            configuration = TranslationSession.Configuration(source: source, target: target)
        } else {
            configuration = TranslationSession.Configuration(source: source, target: target)
        }
    }
}
