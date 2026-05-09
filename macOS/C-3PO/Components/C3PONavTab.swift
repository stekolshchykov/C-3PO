import SwiftUI

struct C3PONavTab: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void
    let accessibilityId: String
    @State private var isHovered = false

    var body: some View {
        let _ = C3POLogger.shared.log("C3PONavTab.body: \(title) selected=\(isSelected)")
        Button(action: action) {
            ZStack {
                Rectangle()
                    .fill(backgroundColor)
                Text(title)
                    .font(.c3poTab)
                    .lineLimit(1)
                    .truncationMode(.tail)
                    .foregroundColor(isSelected ? .c3poGray : .c3poWhite)
                    .padding(.horizontal, 8)
            }
        }
        .buttonStyle(.plain)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .contentShape(Rectangle())
        .accessibilityIdentifier(accessibilityId)
        .onHover { isHovered = $0 }
    }

    private var backgroundColor: Color {
        C3POLogger.shared.log("backgroundColor: selected=\(isSelected) hovered=\(isHovered)")
        if isSelected { return .c3poYellow }
        if isHovered { return .c3poGrayDark }
        return .c3poGray
    }
}
