import Foundation
import NaturalLanguage
import Translation

actor SynonymsService {
    static let shared = SynonymsService()
    private init() {}

    private let embeddingLanguages: Set<String> = [
        "en", "zh-Hans", "zh-Hant", "ja", "es", "de", "fr", "it", "ko", "pt", "ru", "ar"
    ]

    func synonyms(for word: String, languageCode: String) async -> [String] {
        await C3POLogger.shared.log("SynonymsService.synonyms: \(word) lang=\(languageCode)")
        guard !word.isEmpty else { return [] }

        if embeddingLanguages.contains(languageCode) {
            return await synonymsViaEmbedding(word: word, languageCode: languageCode)
        }

        return await synonymsViaBackTranslation(word: word, languageCode: languageCode)
    }

    private func synonymsViaEmbedding(word: String, languageCode: String) async -> [String] {
        guard let embedding = NLEmbedding.wordEmbedding(for: NLLanguage(languageCode)) else {
            return []
        }
        let neighbors = embedding.neighbors(for: word.lowercased(), maximumCount: 10)
        return neighbors.map { $0.0 }
    }

    private func synonymsViaBackTranslation(word: String, languageCode: String) async -> [String] {
        let targetCodes = ["en", "ru", "es", "de", "fr"]
        var results: [String] = []

        for targetCode in targetCodes where targetCode != languageCode {
            do {
                let translated = try await TranslationService.shared.translate(text: word, from: languageCode, to: targetCode)
                let back = try await TranslationService.shared.translate(text: translated, from: targetCode, to: languageCode)
                if back.lowercased() != word.lowercased(), !results.contains(back) {
                    results.append(back)
                }
            } catch {
                await C3POLogger.shared.log("Back-translation fallback failed: \(error.localizedDescription)")
            }
        }
        return results
    }
}
