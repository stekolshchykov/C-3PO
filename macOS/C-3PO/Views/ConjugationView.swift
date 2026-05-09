import SwiftUI

struct ConjugationView: View {
    @State private var inputText: String = ""

    var body: some View {
        VStack(spacing: 12) {
            C3POTextArea(text: $inputText, placeholder: "Enter verb to conjugate...", language: "en", isReadOnly: false, showActions: false)
                .padding(.horizontal, 8)
                .padding(.top, 8)

            C3POButton(title: "Conjugate", isActive: false, action: {}, isFullWidth: false)
                .padding(.horizontal, 12)

            Spacer()
        }
        .background(Color.c3poGrayLight)
    }
}
