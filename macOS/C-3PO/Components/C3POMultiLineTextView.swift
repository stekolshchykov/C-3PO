import SwiftUI

struct C3POMultiLineTextView: NSViewRepresentable {
    @Binding var text: String
    var isReadOnly: Bool = false
    var accessibilityId: String? = nil

    func makeNSView(context: Context) -> NSScrollView {
        C3POLogger.shared.log("makeNSView readOnly=\(isReadOnly)")
        let scrollView = NSTextView.scrollableTextView()
        scrollView.drawsBackground = false
        scrollView.hasVerticalScroller = false
        scrollView.hasHorizontalScroller = false
        scrollView.automaticallyAdjustsContentInsets = false

        let textView = scrollView.documentView as! NSTextView
        textView.isEditable = !isReadOnly
        textView.isSelectable = true
        textView.isRichText = false
        textView.drawsBackground = true
        textView.backgroundColor = NSColor(Color.c3poGrayDark)
        textView.textColor = NSColor(Color.c3poWhite)
        textView.font = NSFont.systemFont(ofSize: 16)
        textView.textContainerInset = NSSize(width: 8, height: 8)
        textView.isAutomaticQuoteSubstitutionEnabled = false
        textView.isAutomaticDashSubstitutionEnabled = false
        textView.isAutomaticTextReplacementEnabled = false
        textView.isAutomaticSpellingCorrectionEnabled = false
        textView.insertionPointColor = NSColor(Color.c3poYellow)
        textView.selectedTextAttributes = [
            .backgroundColor: NSColor(Color.c3poYellow),
            .foregroundColor: NSColor(Color.c3poGrayDark)
        ]
        textView.delegate = context.coordinator

        if let id = accessibilityId {
            textView.setAccessibilityIdentifier(id)
        }

        return scrollView
    }

    func updateNSView(_ nsView: NSScrollView, context: Context) {
        let textView = nsView.documentView as! NSTextView
        if textView.string != text {
            textView.string = text
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, NSTextViewDelegate {
        var parent: C3POMultiLineTextView

        init(_ parent: C3POMultiLineTextView) {
            self.parent = parent
        }

        func textDidChange(_ notification: Notification) {
            guard let textView = notification.object as? NSTextView else { return }
            parent.text = textView.string
        }
    }
}
