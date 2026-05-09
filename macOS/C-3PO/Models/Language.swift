import Foundation

struct Language: Identifiable, Hashable {
    let id: String
    let name: String
    
    static let supported: [Language] = [
        Language(id: "auto", name: "Auto-detect"),
        Language(id: "en", name: "English"),
        Language(id: "ru", name: "Russian"),
        Language(id: "de", name: "German"),
        Language(id: "fr", name: "French"),
        Language(id: "es", name: "Spanish"),
        Language(id: "it", name: "Italian"),
        Language(id: "zh", name: "Chinese"),
        Language(id: "ja", name: "Japanese"),
        Language(id: "ko", name: "Korean"),
    ]
}
