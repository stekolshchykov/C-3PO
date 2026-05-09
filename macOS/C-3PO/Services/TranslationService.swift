import Foundation
import Translation

actor TranslationService {
    private var session: TranslationSession?
    
    func translate(
        text: String,
        from source: Locale.Language?,
        to target: Locale.Language
    ) async throws -> String {
        C3POLogger.shared.log("translate: \(text.prefix(30)) from=\(source.map { String(describing: $0) } ?? "auto") to=\(String(describing: target))")
        // TranslationSession создается через SwiftUI .translationTask
        // Этот сервис для будущей программной работы без SwiftUI view
        fatalError("Use SwiftUI .translationTask modifier for now")
    }
    
    func checkAvailability(from source: Locale.Language, to target: Locale.Language) async -> LanguageAvailability.Status {
        C3POLogger.shared.log("checkAvailability: \(String(describing: source)) -> \(String(describing: target))")
        let availability = LanguageAvailability()
        return await availability.status(from: source, to: target)
    }
    
    func checkAvailability(for text: String, to target: Locale.Language) async throws -> LanguageAvailability.Status {
        C3POLogger.shared.log("checkAvailability(forText): \(text.prefix(30)) -> \(String(describing: target))")
        let availability = LanguageAvailability()
        return try await availability.status(for: text, to: target)
    }
}
