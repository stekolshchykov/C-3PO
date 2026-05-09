import SwiftUI

struct SettingsView: View {
    @Binding var currentPage: AppPage

    var body: some View {
        let _ = C3POLogger.shared.log("SettingsView.body")
        VStack(spacing: 0) {
            HStack {
                Button(action: { currentPage = .translator }) {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 18))
                        .foregroundColor(.c3poWhite)
                }
                .buttonStyle(.plain)

                Spacer()

                Text("Settings")
                    .font(.c3poTab)
                    .foregroundColor(.c3poWhite)

                Spacer()

                // Spacer for alignment
                Color.clear
                    .frame(width: 44, height: 1)
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .background(Color.c3poGray)

            Spacer()

            Text("Settings coming soon")
                .font(.c3poBody)
                .foregroundColor(Color.c3poWhite.opacity(0.5))

            Spacer()
        }
        .background(Color.c3poGrayLight)
    }
}
