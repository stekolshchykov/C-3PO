import SwiftUI

struct C3PONavTab: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void
    @State private var isHovered = false

    var body: some View {
        Button(action: action) {
            ZStack {
                Rectangle()
                    .fill(backgroundColor)
                Text(title)
                    .font(.c3poTab)
                    .lineLimit(1)
                    .minimumScaleFactor(0.85)
                    .foregroundColor(isSelected ? .c3poGray : .c3poWhite)
                    .padding(.horizontal, 16)
            }
        }
        .buttonStyle(.plain)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .contentShape(Rectangle())
        .onHover { isHovered = $0 }
    }

    private var backgroundColor: Color {
        if isSelected { return .c3poYellow }
        if isHovered { return .c3poGrayDark }
        return .c3poGray
    }
}
