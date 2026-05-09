import Foundation
import NaturalLanguage

struct ContextToken: Identifiable {
    let id = UUID()
    let text: String
    let lemma: String?
    let lexicalClass: String?
}

actor ContextService {
    static let shared = ContextService()
    private init() {}

    func analyze(text: String, languageCode: String) async -> [ContextToken] {
        await C3POLogger.shared.log("ContextService.analyze: \(text.prefix(30)) lang=\(languageCode)")
        guard !text.isEmpty else { return [] }

        let tagger = NLTagger(tagSchemes: [.lexicalClass, .lemma])
        tagger.string = text

        let validCodes = ["zh-Hans", "zh-Hant", "ja", "ko"]
        let unit: NLTokenUnit = validCodes.contains(languageCode) ? .word : .word
        let options: NLTagger.Options = [.omitPunctuation, .omitWhitespace]

        var tokens: [ContextToken] = []
        tagger.enumerateTags(in: text.startIndex..<text.endIndex, unit: unit, scheme: .lexicalClass, options: options) { tag, range in
            let word = String(text[range])
            let lemma = tagger.tag(at: range.lowerBound, unit: unit, scheme: .lemma).0?.rawValue
            tokens.append(ContextToken(text: word, lemma: lemma, lexicalClass: tag?.rawValue))
            return true
        }
        return tokens
    }
}
