import SwiftUI

struct SynonymsView: View {
    @State private var inputText: String = ""
    @State private var synonyms: [String] = []
    @State private var isLoading: Bool = false

    var body: some View {
        let _ = C3POLogger.shared.log("SynonymsView.body")
        VStack(spacing: 0) {
            C3POTextArea(
                text: $inputText,
                placeholder: "Enter word for synonyms...",
                language: "en",
                isReadOnly: false,
                showActions: false
            )
            .padding(.horizontal, 8)
            .padding(.top, 8)

            HStack {
                C3POButton(title: "Find Synonyms", isActive: false, action: findSynonyms, isFullWidth: false)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                Spacer()
            }

            if isLoading {
                ProgressView()
                    .padding()
            } else if !synonyms.isEmpty {
                ScrollView {
                    FlowLayout(spacing: 8) {
                        ForEach(synonyms, id: \.self) { synonym in
                            Text(synonym)
                                .font(.c3poBody)
                                .foregroundColor(.c3poWhite)
                                .padding(.horizontal, 12)
                                .padding(.vertical, 6)
                                .background(Color.c3poGray)
                                .cornerRadius(6)
                        }
                    }
                    .padding(12)
                }
            }

            Spacer()
        }
        .background(Color.c3poGrayLight)
    }

    private func findSynonyms() {
        C3POLogger.shared.log("SynonymsView.findSynonyms: \(inputText)")
        guard !inputText.isEmpty else { return }
        isLoading = true
        Task {
            let result = await SynonymsService.shared.synonyms(for: inputText, languageCode: "en")
            await MainActor.run {
                synonyms = result
                isLoading = false
            }
        }
    }
}

struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let result = FlowResult(in: proposal.width ?? 0, subviews: subviews, spacing: spacing)
        return result.size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = FlowResult(in: bounds.width, subviews: subviews, spacing: spacing)
        for (index, subview) in subviews.enumerated() {
            subview.place(at: CGPoint(x: bounds.minX + result.positions[index].x, y: bounds.minY + result.positions[index].y), proposal: .unspecified)
        }
    }

    struct FlowResult {
        var size: CGSize = .zero
        var positions: [CGPoint] = []

        init(in maxWidth: CGFloat, subviews: Subviews, spacing: CGFloat) {
            var x: CGFloat = 0
            var y: CGFloat = 0
            var rowHeight: CGFloat = 0

            for subview in subviews {
                let size = subview.sizeThatFits(.unspecified)
                if x + size.width > maxWidth, x > 0 {
                    x = 0
                    y += rowHeight + spacing
                    rowHeight = 0
                }
                positions.append(CGPoint(x: x, y: y))
                rowHeight = max(rowHeight, size.height)
                x += size.width + spacing
            }

            self.size = CGSize(width: maxWidth, height: y + rowHeight)
        }
    }
}
