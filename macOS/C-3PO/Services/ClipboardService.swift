import Foundation
import AppKit

struct ClipboardService {
    static let shared = ClipboardService()
    private init() {}

    func copy(_ text: String) {
        C3POLogger.shared.log("ClipboardService.copy: \(text.prefix(30))")
        let pasteboard = NSPasteboard.general
        pasteboard.clearContents()
        pasteboard.setString(text, forType: .string)
    }

    func paste() -> String? {
        C3POLogger.shared.log("ClipboardService.paste")
        return NSPasteboard.general.string(forType: .string)
    }
}
