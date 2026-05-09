import Foundation
import Translation

actor TranslationService {
    private var session: TranslationSession?
    
    func translate(
        text: String,
        from source: Locale.Language?,
        to target: Locale.Language
    ) async throws -> String {
        // TranslationSession создается через SwiftUI .translationTask
        // Этот сервис для будущей программной работы без SwiftUI view
        fatalError("Use SwiftUI .translationTask modifier for now")
    }
    
    func checkAvailability(from source: Locale.Language?, to target: Locale.Language) async -> TranslationAvailability.Status {
        let availability = LanguageAvailability()
        return await availability.status(from: source, to: target)
    }
}
