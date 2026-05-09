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
        C3POLogger.shared.log("init")
        load()
    }

    func add(text: String) {
        C3POLogger.shared.log("add(text: \(text.prefix(30)))")
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }
        let record = HistoryRecord(id: UUID(), text: trimmed, time: Date())
        records.append(record)
        save()
    }

    func clear() {
        C3POLogger.shared.log("clear")
        records.removeAll()
        save()
    }

    private func save() {
        C3POLogger.shared.log("save: \(records.count) records")
        if let data = try? JSONEncoder().encode(records) {
            UserDefaults.standard.set(data, forKey: key)
        }
    }

    private func load() {
        C3POLogger.shared.log("load")
        guard let data = UserDefaults.standard.data(forKey: key),
              let loaded = try? JSONDecoder().decode([HistoryRecord].self, from: data)
        else { return }
        records = loaded
    }
}
