import SwiftUI

struct HistoryView: View {
    @StateObject private var store = HistoryStore.shared
    @Binding var currentPage: AppPage

    var body: some View {
        let _ = C3POLogger.shared.log("HistoryView.body: records=\(store.records.count)")
        VStack(spacing: 0) {
            HStack {
                Button(action: { currentPage = .translator }) {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 18))
                        .foregroundColor(.c3poWhite)
                }
                .buttonStyle(.plain)

                Spacer()

                Text("History")
                    .font(.c3poTab)
                    .foregroundColor(.c3poWhite)

                Spacer()

                Button(action: { store.clear() }) {
                    Text("Clear history")
                        .font(.c3poBody)
                        .foregroundColor(.c3poRed)
                }
                .buttonStyle(.plain)
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .background(Color.c3poGray)

            ScrollView {
                LazyVStack(spacing: 0) {
                    ForEach(store.records.reversed()) { record in
                        VStack(alignment: .leading, spacing: 4) {
                            Text(formattedDate(record.time))
                                .font(.c3poCaption)
                                .foregroundColor(Color.c3poWhite.opacity(0.6))
                            Text(record.text)
                                .font(.c3poBody)
                                .foregroundColor(.c3poWhite)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 10)

                        Divider()
                            .background(Color.c3poGrayDark)
                    }
                }
            }
        }
        .background(Color.c3poGrayLight)
    }

    private func formattedDate(_ date: Date) -> String {
        C3POLogger.shared.log("formattedDate: \(date)")
        let formatter = DateFormatter()
        formatter.dateFormat = "dd/MM/yyyy HH:mm:ss"
        return formatter.string(from: date)
    }
}
