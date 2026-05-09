import SwiftUI

struct C3POMenuBar: View {
    @Binding var isDocked: Bool
    let onHistory: () -> Void
    let onSettings: () -> Void

    var body: some View {
        let _ = C3POLogger.shared.log("C3POMenuBar.body: isDocked=\(isDocked)")
        HStack {
            C3POIconButton(systemName: isDocked ? "pin.fill" : "pin", isActive: isDocked, action: { isDocked.toggle() })
                .frame(width: 70, alignment: .leading)

            Spacer()

            Image("logo")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(height: 21)

            Spacer()

            HStack(spacing: 16) {
                C3POIconButton(systemName: "clock.arrow.circlepath", isActive: false, action: onHistory)
                C3POIconButton(systemName: "gear", isActive: false, action: onSettings)
            }
            .frame(width: 70, alignment: .trailing)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .background(Color.c3poGrayLight)
    }
}
