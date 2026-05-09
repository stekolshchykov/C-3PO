import Foundation
import Translation
import NaturalLanguage

enum TranslationError: LocalizedError {
    case modelNotInstalled(String)
    case unsupportedLanguagePair(String)
    case translationFailed(String)

    var errorDescription: String? {
        switch self {
        case .modelNotInstalled(let msg):
            return msg
        case .unsupportedLanguagePair(let msg):
            return msg
        case .translationFailed(let msg):
            return msg
        }
    }
}

actor TranslationService {
    static let shared = TranslationService()
    private init() {}

    func translate(text: String, from sourceCode: String, to targetCode: String) async throws -> String {
        await C3POLogger.shared.log("TranslationService.translate: \(text.prefix(30)) from=\(sourceCode) to=\(targetCode)")
        guard !text.isEmpty else { return "" }

        let src: Locale.Language?
        if sourceCode == "auto" {
            src = nil
        } else {
            src = Locale.Language(identifier: sourceCode)
        }
        let tgt = Locale.Language(identifier: targetCode)

        let availability = LanguageAvailability()
        let status: LanguageAvailability.Status
        if let src = src {
            status = await availability.status(from: src, to: tgt)
        } else {
            status = try await availability.status(for: text, to: tgt)
        }

        switch status {
        case .installed:
            return try await performTranslation(text: text, source: src, target: tgt)
        case .supported:
            throw TranslationError.modelNotInstalled(
                "Translation model not installed. Download it in System Settings → General → Language & Region → Translation Languages."
            )
        case .unsupported:
            throw TranslationError.unsupportedLanguagePair("Unsupported language pair: \(sourceCode) → \(targetCode)")
        @unknown default:
            throw TranslationError.translationFailed("Unknown translation availability status")
        }
    }

    func backTranslate(text: String, from sourceCode: String, via targetCode: String) async throws -> String {
        await C3POLogger.shared.log("TranslationService.backTranslate: \(text.prefix(30)) via=\(targetCode)")
        let forward = try await translate(text: text, from: sourceCode, to: targetCode)
        return try await translate(text: forward, from: targetCode, to: sourceCode)
    }

    private func performTranslation(text: String, source: Locale.Language?, target: Locale.Language) async throws -> String {
        guard let source = source else {
            let recognizer = NLLanguageRecognizer()
            recognizer.processString(text)
            let detected = recognizer.dominantLanguage?.rawValue ?? "en"
            let detectedLang = Locale.Language(identifier: detected)
            let session = TranslationSession(installedSource: detectedLang, target: target)
            let response = try await session.translate(text)
            return response.targetText
        }
        let session = TranslationSession(installedSource: source, target: target)
        let response = try await session.translate(text)
        return response.targetText
    }
}
