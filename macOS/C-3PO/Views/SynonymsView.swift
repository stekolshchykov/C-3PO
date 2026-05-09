import SwiftUI

struct SynonymsView: View {
    @State private var inputText: String = ""

    var body: some View {
        let _ = C3POLogger.shared.log("SynonymsView.body")
        VStack(spacing: 12) {
            C3POTextArea(text: $inputText, placeholder: "Enter word for synonyms...", language: "en", isReadOnly: false, showActions: false)
                .padding(.horizontal, 8)
                .padding(.top, 8)

            C3POButton(title: "Find Synonyms", isActive: false, action: {}, isFullWidth: false)
                .padding(.horizontal, 12)

            Spacer()
        }
        .background(Color.c3poGrayLight)
    }
}
