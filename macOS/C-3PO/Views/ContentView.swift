import SwiftUI

struct ContentView: View {
    @State private var selectedTab = 0
    @State private var isDocked = false

    private let tabs = [
        ("Translator", 0),
        ("Context", 1),
        ("Synonyms", 2),
        ("SpellCheck", 3),
        ("Conjugation", 4),
        ("Wikipedia", 5)
    ]

    var body: some View {
        VStack(spacing: 0) {
            // Triangle arrow
            Triangle()
                .fill(Color.c3poGray)
                .frame(width: 20, height: 20)
                .offset(y: 1) // overlap slightly

            // Main container
            VStack(spacing: 0) {
                // Top Nav
                HStack(spacing: 0) {
                    ForEach(tabs, id: \.1) { tab in
                        NavTab(title: tab.0, isSelected: selectedTab == tab.1) {
                            selectedTab = tab.1
                        }
                    }
                }
                .frame(height: 50)

                // Content
                Group {
                    switch selectedTab {
                    case 0: TranslatorView()
                    case 1: PlaceholderView(title: "Context")
                    case 2: PlaceholderView(title: "Synonyms")
                    case 3: PlaceholderView(title: "SpellCheck")
                    case 4: PlaceholderView(title: "Conjugation")
                    case 5: PlaceholderView(title: "Wikipedia")
                    default: TranslatorView()
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)

                // Bottom Menu
                HStack {
                    Button(action: { isDocked.toggle() }) {
                        Image(systemName: isDocked ? "pin.fill" : "pin")
                            .font(.system(size: 22))
                            .foregroundColor(isDocked ? .c3poYellow : .c3poWhite)
                    }
                    .buttonStyle(.plain)
                    .frame(width: 70, alignment: .leading)

                    Spacer()

                    Image("logo")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(height: 21)

                    Spacer()

                    HStack(spacing: 16) {
                        Button(action: {}) {
                            Image(systemName: "clock.arrow.circlepath")
                                .font(.system(size: 22))
                                .foregroundColor(.c3poWhite)
                        }
                        .buttonStyle(.plain)

                        Button(action: {}) {
                            Image(systemName: "gear")
                                .font(.system(size: 22))
                                .foregroundColor(.c3poWhite)
                        }
                        .buttonStyle(.plain)
                    }
                    .frame(width: 70, alignment: .trailing)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
                .background(Color.c3poGrayLight)
            }
            .background(Color.c3poGrayLight)
            .clipShape(RoundedRectangle(cornerRadius: 10))
        }
        .frame(width: 600, height: 730)
        .font(.c3poBody)
        .foregroundColor(.c3poWhite)
    }
}

struct NavTab: View {
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
                    .minimumScaleFactor(0.7)
                    .foregroundColor(isSelected ? .c3poGray : .c3poWhite)
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

struct Triangle: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.midX, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY))
        path.addLine(to: CGPoint(x: rect.minX, y: rect.maxY))
        path.closeSubpath()
        return path
    }
}

struct PlaceholderView: View {
    let title: String
    var body: some View {
        Color.c3poGrayLight
            .overlay(
                Text(title)
                    .foregroundColor(.c3poWhite)
                    .font(.c3poBody)
            )
    }
}
