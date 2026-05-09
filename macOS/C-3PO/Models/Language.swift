import Foundation

struct Language: Identifiable, Hashable {
    let id: String
    let name: String

    static let all: [Language] = [
        Language(id: "zh-CN", name: "Chinese Simplified"),
        Language(id: "zh-TW", name: "Chinese Traditional"),
        Language(id: "da", name: "Danish"),
        Language(id: "nl", name: "Dutch"),
        Language(id: "en", name: "English"),
        Language(id: "fr", name: "French"),
        Language(id: "de", name: "German"),
        Language(id: "hi", name: "Hindi"),
        Language(id: "id", name: "Indonesian"),
        Language(id: "it", name: "Italian"),
        Language(id: "ja", name: "Japanese"),
        Language(id: "ko", name: "Korean"),
        Language(id: "no", name: "Norwegian"),
        Language(id: "pl", name: "Polish"),
        Language(id: "pt", name: "Portuguese"),
        Language(id: "ru", name: "Russian"),
        Language(id: "es", name: "Spanish"),
        Language(id: "sv", name: "Swedish"),
        Language(id: "th", name: "Thai"),
        Language(id: "tr", name: "Turkish"),
        Language(id: "uk", name: "Ukrainian"),
        Language(id: "vi", name: "Vietnamese"),
        Language(id: "ar", name: "Arabic"),
    ]
}
