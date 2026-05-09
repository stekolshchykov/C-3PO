import SwiftUI

struct C3POLanguagePicker: View {
    @Binding var sourceLanguage: String
    @Binding var targetLanguage: String
    @Binding var sourceText: String
    @Binding var translatedText: String
    let onTriggerTranslation: (String) -> Void

    @State private var languageListStatus: String? = nil
    @State private var searchLanguage: String = ""

    private let languages = Language.all

    var body: some View {
        let _ = C3POLogger.shared.log("C3POLanguagePicker.body: source=\(sourceLanguage) target=\(targetLanguage)")
        VStack(spacing: 0) {
            HStack(spacing: 0) {
                languageButton(title: displayName(for: sourceLanguage), isOpen: languageListStatus == "from") {
                    toggleLanguageList("from")
                }
                .frame(maxWidth: .infinity)

                Button(action: swapLanguages) {
                    Image(systemName: "arrow.left.arrow.right")
                        .font(.system(size: 18))
                        .foregroundColor(.c3poWhite)
                        .frame(width: 44)
                }
                .buttonStyle(.plain)

                languageButton(title: displayName(for: targetLanguage), isOpen: languageListStatus == "to") {
                    toggleLanguageList("to")
                }
                .frame(maxWidth: .infinity)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 12)

            ZStack {
                HStack(spacing: 1) {
                    C3POTextArea(text: $sourceText, placeholder: "from", language: sourceLanguage, isReadOnly: false, accessibilityId: "sourceTextArea")
                    C3POTextArea(text: $translatedText, placeholder: "to", language: targetLanguage, isReadOnly: true, accessibilityId: "targetTextArea")
                }
                .padding(.horizontal, 8)

                if let status = languageListStatus {
                    languageOverlay(status: status)
                        .padding(.horizontal, 8)
                }
            }
            .frame(maxHeight: .infinity)
        }
    }

    @ViewBuilder
    private func languageButton(title: String, isOpen: Bool, action: @escaping () -> Void) -> some View {
        let _ = C3POLogger.shared.log("languageButton: \(title) isOpen=\(isOpen)")
        Button(action: action) {
            HStack(spacing: 8) {
                Text(title.capitalized)
                    .font(.c3poBody)
                Image(systemName: isOpen ? "chevron.up" : "chevron.down")
                    .font(.system(size: 12))
            }
            .foregroundColor(.c3poWhite)
            .padding(.horizontal, 20)
            .frame(maxWidth: .infinity, minHeight: 36)
            .background(Color.c3poGray)
            .cornerRadius(6)
            .overlay(
                Group {
                    if isOpen {
                        Triangle()
                            .fill(Color.c3poGrayDark)
                            .frame(width: 14, height: 10)
                            .rotationEffect(.degrees(180))
                            .offset(y: 23)
                    }
                }
            )
        }
        .buttonStyle(.plain)
    }

    @ViewBuilder
    private func languageOverlay(status: String) -> some View {
        let _ = C3POLogger.shared.log("languageOverlay: \(status)")
        VStack(spacing: 0) {
            TextField("", text: $searchLanguage, prompt: Text("Language name...").foregroundColor(Color.c3poWhite.opacity(0.5)))
                .font(.c3poBody)
                .foregroundColor(.c3poWhite)
                .textFieldStyle(.plain)
                .padding(12)
                .background(Color.c3poGray)

            ScrollView {
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                    if status == "from" {
                        C3POButton(title: "Auto", isActive: sourceLanguage == "auto", action: {
                            sourceLanguage = "auto"
                            languageListStatus = nil
                            searchLanguage = ""
                            onTriggerTranslation(sourceText)
                        }, isFullWidth: true)
                    }
                    ForEach(filteredLanguages(for: status), id: \.id) { lang in
                        let isActive = (status == "from" && sourceLanguage == lang.id) || (status == "to" && targetLanguage == lang.id)
                        C3POButton(title: lang.name, isActive: isActive, action: {
                            if status == "from" {
                                sourceLanguage = lang.id
                            } else {
                                targetLanguage = lang.id
                            }
                            languageListStatus = nil
                            searchLanguage = ""
                            onTriggerTranslation(sourceText)
                        }, isFullWidth: true)
                    }
                }
                .padding(12)
            }
        }
        .background(Color.c3poGrayDark)
    }

    private func filteredLanguages(for status: String) -> [Language] {
        C3POLogger.shared.log("filteredLanguages: search=\(searchLanguage)")
        let base = languages.filter { $0.id != "auto" }
        let list = (status == "to") ? base.filter { $0.id != "ar" } : base
        if searchLanguage.isEmpty { return list }
        return list.filter { $0.name.lowercased().contains(searchLanguage.lowercased().trimmingCharacters(in: .whitespaces)) }
    }

    private func displayName(for code: String) -> String {
        C3POLogger.shared.log("displayName: \(code)")
        if code == "auto" { return "Auto" }
        return languages.first(where: { $0.id == code })?.name ?? code
    }

    private func swapLanguages() {
        C3POLogger.shared.log("swapLanguages: \(sourceLanguage) <-> \(targetLanguage)")
        let temp = sourceLanguage
        sourceLanguage = targetLanguage
        targetLanguage = temp
        let tempText = sourceText
        sourceText = translatedText
        translatedText = tempText
        languageListStatus = nil
        onTriggerTranslation(sourceText)
    }

    private func toggleLanguageList(_ status: String) {
        C3POLogger.shared.log("toggleLanguageList: \(status)")
        if languageListStatus == status {
            languageListStatus = nil
        } else {
            languageListStatus = status
            searchLanguage = ""
        }
    }
}
