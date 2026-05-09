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
            Triangle()
                .fill(Color.c3poGray)
                .frame(width: 20, height: 20)
                .offset(y: 1)

            VStack(spacing: 0) {
                HStack(spacing: 0) {
                    ForEach(tabs, id: \.1) { tab in
                        C3PONavTab(title: tab.0, isSelected: selectedTab == tab.1) {
                            selectedTab = tab.1
                        }
                    }
                }
                .frame(height: 50)

                Group {
                    switch selectedTab {
                    case 0: TranslatorView()
                    case 1: ContextView()
                    case 2: SynonymsView()
                    case 3: SpellCheckView()
                    case 4: ConjugationView()
                    case 5: WikipediaView()
                    default: TranslatorView()
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)

                C3POMenuBar(isDocked: $isDocked, onHistory: {}, onSettings: {})
            }
            .background(Color.c3poGrayLight)
            .clipShape(RoundedRectangle(cornerRadius: 10))
        }
        .frame(width: 600, height: 730)
        .font(.c3poBody)
        .foregroundColor(.c3poWhite)
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
