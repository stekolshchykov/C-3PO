import Foundation
import AVFoundation

@MainActor
final class TTSService {
    static let shared = TTSService()
    private let synthesizer = AVSpeechSynthesizer()

    func speak(text: String, languageCode: String) {
        guard !text.isEmpty else { return }
        C3POLogger.shared.log("TTSService.speak: \(text.prefix(30)) lang=\(languageCode)")

        let utterance = AVSpeechUtterance(string: text)
        let voice = bestVoice(for: languageCode)
        utterance.voice = voice
        utterance.rate = AVSpeechUtteranceDefaultSpeechRate

        synthesizer.speak(utterance)
    }

    private func bestVoice(for languageCode: String) -> AVSpeechSynthesisVoice? {
        let voices = AVSpeechSynthesisVoice.speechVoices()
        if let exact = voices.first(where: { $0.language.hasPrefix(languageCode) }) {
            return exact
        }
        let twoLetter = String(languageCode.prefix(2))
        return voices.first(where: { $0.language.hasPrefix(twoLetter) })
            ?? AVSpeechSynthesisVoice(language: "en-US")
    }
}
