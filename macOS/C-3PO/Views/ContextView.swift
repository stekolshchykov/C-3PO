import SwiftUI

struct ContextView: View {
    @State private var inputText: String = ""
    @State private var tokens: [ContextToken] = []
    @State private var isAnalyzing: Bool = false

    var body: some View {
        let _ = C3POLogger.shared.log("ContextView.body")
        VStack(spacing: 0) {
            C3POTextArea(
                text: $inputText,
                placeholder: "Enter text for context analysis...",
                language: "en",
                isReadOnly: false,
                showActions: false
            )
            .padding(.horizontal, 8)
            .padding(.top, 8)

            HStack {
                C3POButton(title: "Analyze", isActive: false, action: analyze, isFullWidth: false)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                Spacer()
            }

            ScrollView {
                LazyVStack(alignment: .leading, spacing: 8) {
                    ForEach(tokens) { token in
                        HStack(spacing: 8) {
                            Text(token.text)
                                .font(.c3poBody)
                                .foregroundColor(.c3poWhite)

                            if let lexicalClass = token.lexicalClass {
                                Text(lexicalClass)
                                    .font(.c3poCaption)
                                    .foregroundColor(.c3poGrayDark)
                                    .padding(.horizontal, 6)
                                    .padding(.vertical, 2)
                                    .background(Color.c3poYellow)
                                    .cornerRadius(4)
                            }

                            if let lemma = token.lemma, lemma != token.text {
                                Text("→ \(lemma)")
                                    .font(.c3poCaption)
                                    .foregroundColor(Color.c3poWhite.opacity(0.6))
                            }

                            Spacer()
                        }
                        .padding(.horizontal, 12)
                        .padding(.vertical, 4)
                    }
                }
            }

            Spacer()
        }
        .background(Color.c3poGrayLight)
    }

    private func analyze() {
        C3POLogger.shared.log("ContextView.analyze: \(inputText.prefix(30))")
        guard !inputText.isEmpty else { return }
        isAnalyzing = true
        Task {
            let result = await ContextService.shared.analyze(text: inputText, languageCode: "en")
            await MainActor.run {
                tokens = result
                isAnalyzing = false
            }
        }
    }
}
