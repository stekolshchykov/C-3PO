import SwiftUI

struct C3POButton: View {
    let title: String
    let isActive: Bool
    let action: () -> Void
    var isFullWidth: Bool = false
    @State private var isHovered = false

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.c3poBody)
                .foregroundColor(isActive ? .c3poGray : .c3poWhite)
                .frame(maxWidth: isFullWidth ? .infinity : nil)
                .padding(.horizontal, isFullWidth ? 0 : 20)
                .padding(.vertical, 8)
                .background(isActive ? Color.c3poYellow : (isHovered ? Color.c3poGrayDark : Color.c3poGray))
                .cornerRadius(isFullWidth ? 4 : 6)
        }
        .buttonStyle(.plain)
        .onHover { isHovered = $0 }
    }
}

struct C3POIconButton: View {
    let systemName: String
    let isActive: Bool
    let action: () -> Void
    var size: CGFloat = 22
    @State private var isHovered = false

    var body: some View {
        Button(action: action) {
            Image(systemName: systemName)
                .font(.system(size: size))
                .foregroundColor(isActive ? .c3poYellow : (isHovered ? Color.c3poWhite.opacity(0.6) : .c3poWhite))
        }
        .buttonStyle(.plain)
        .onHover { isHovered = $0 }
    }
}
