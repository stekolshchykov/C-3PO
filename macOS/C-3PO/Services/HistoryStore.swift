import Foundation
import Combine

struct HistoryRecord: Codable, Identifiable {
    let id: UUID
    let text: String
    let time: Date
}

@MainActor
final class HistoryStore: ObservableObject {
    static let shared = HistoryStore()
    private let key = "c3po.history"

    @Published var records: [HistoryRecord] = []

    private init() {
        load()
    }

    func add(text: String) {
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }
        let record = HistoryRecord(id: UUID(), text: trimmed, time: Date())
        records.append(record)
        save()
    }

    func clear() {
        records.removeAll()
        save()
    }

    private func save() {
        if let data = try? JSONEncoder().encode(records) {
            UserDefaults.standard.set(data, forKey: key)
        }
    }

    private func load() {
        guard let data = UserDefaults.standard.data(forKey: key),
              let loaded = try? JSONDecoder().decode([HistoryRecord].self, from: data)
        else { return }
        records = loaded
    }
}
