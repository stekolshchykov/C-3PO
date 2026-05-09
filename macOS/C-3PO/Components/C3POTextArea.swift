import SwiftUI

struct C3POTextArea: View {
    @Binding var text: String
    let placeholder: String
    let language: String
    var isReadOnly: Bool = false
    var showActions: Bool = true

    var body: some View {
        ZStack(alignment: .topLeading) {
            Color.c3poGrayDark

            TextEditor(text: $text)
                .font(.c3poBody)
                .foregroundColor(.c3poWhite)
                .scrollContentBackground(.hidden)
                .background(Color.clear)
                .padding(8)
                .disabled(isReadOnly)

            if text.isEmpty && !isReadOnly {
                Text(placeholder)
                    .foregroundColor(Color.c3poWhite.opacity(0.4))
                    .padding(.horizontal, 20)
                    .padding(.vertical, 16)
                    .allowsHitTesting(false)
            }

            if showActions && !text.isEmpty {
                VStack(spacing: 10) {
                    if !isReadOnly {
                        C3POIconButton(systemName: "speaker.wave.2", isActive: false, action: { speak(text, language: language) }, size: 16)
                    }
                    C3POIconButton(systemName: "doc.on.doc", isActive: false, action: { copyToClipboard(text) }, size: 16)
                }
                .padding(.trailing, 12)
                .padding(.top, 12)
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topTrailing)
            }
        }
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
