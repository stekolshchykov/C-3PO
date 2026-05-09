import SwiftUI

struct C3POTextArea: View {
    @Binding var text: String
    let placeholder: String
    let language: String
    var isReadOnly: Bool = false
    var showActions: Bool = true
    var accessibilityId: String? = nil

    var body: some View {
        let _ = C3POLogger.shared.log("C3POTextArea.body: placeholder=\(placeholder) readOnly=\(isReadOnly)")
        ZStack(alignment: .topLeading) {
            if let id = accessibilityId {
                Color.clear.accessibilityIdentifier(id)
                    .allowsHitTesting(false)
            }
            Color.c3poGrayDark

            TextField(placeholder, text: $text, axis: .vertical)
                .font(.c3poBody)
                .foregroundColor(.c3poWhite)
                .lineLimit(5...20)
                .padding(8)
                .accessibilityIdentifier(accessibilityId ?? "")
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
        C3POLogger.shared.log("copyToClipboard: \(text.prefix(30))")
        let pasteboard = NSPasteboard.general
        pasteboard.clearContents()
        pasteboard.setString(text, forType: .string)
    }

    private func speak(_ text: String, language: String) {
        C3POLogger.shared.log("speak: lang=\(language) text=\(text.prefix(30))")
        // TODO: implement TTS via AVSpeechSynthesizer
    }
}
