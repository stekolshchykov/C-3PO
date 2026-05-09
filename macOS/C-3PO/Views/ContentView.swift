import SwiftUI

struct ContentView: View {
    @State private var currentPage: AppPage = .translator
    @State private var isDocked = false

    private let navTabs: [(String, AppPage)] = [
        ("Translator", .translator),
        ("Context", .context),
        ("Synonyms", .synonyms),
        ("SpellCheck", .spellCheck),
        ("Conjugation", .conjugation),
        ("Wikipedia", .wikipedia),
    ]

    var body: some View {
        VStack(spacing: 0) {
            Triangle()
                .fill(Color.c3poGray)
                .frame(width: 20, height: 20)
                .offset(y: 1)

            VStack(spacing: 0) {
                if showNavTabs {
                    HStack(spacing: 0) {
                        ForEach(navTabs, id: \.1) { tab in
                            C3PONavTab(title: tab.0, isSelected: currentPage == tab.1) {
                                currentPage = tab.1
                            }
                        }
                    }
                    .frame(height: 50)
                }

                Group {
                    switch currentPage {
                    case .translator: TranslatorView()
                    case .context: ContextView()
                    case .synonyms: SynonymsView()
                    case .spellCheck: SpellCheckView()
                    case .conjugation: ConjugationView()
                    case .wikipedia: WikipediaView()
                    case .history: HistoryView(currentPage: $currentPage)
                    case .settings: SettingsView(currentPage: $currentPage)
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)

                if showNavTabs {
                    C3POMenuBar(
                        isDocked: $isDocked,
                        onHistory: { currentPage = .history },
                        onSettings: { currentPage = .settings }
                    )
                }
            }
            .background(Color.c3poGrayLight)
            .clipShape(RoundedRectangle(cornerRadius: 10))
        }
        .frame(width: 600, height: 730)
        .font(.c3poBody)
        .foregroundColor(.c3poWhite)
        .onChange(of: isDocked) { _, newValue in
            NotificationCenter.default.post(name: .dockedModeChanged, object: newValue)
        }
    }

    private var showNavTabs: Bool {
        switch currentPage {
        case .history, .settings:
            return false
        default:
            return true
        }
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
