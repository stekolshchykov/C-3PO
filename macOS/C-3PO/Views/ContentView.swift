import SwiftUI

struct ContentView: View {
    @State private var selectedTab = 0
    
    var body: some View {
        VStack(spacing: 0) {
            // Tab bar
            HStack(spacing: 0) {
                TabButton(title: "Translator", icon: "translate", isSelected: selectedTab == 0) {
                    selectedTab = 0
                }
                // TODO: Add more tabs here
            }
            .padding(.horizontal, 8)
            .padding(.top, 8)
            
            Divider()
            
            // Content
            Group {
                switch selectedTab {
                case 0:
                    TranslatorView()
                default:
                    TranslatorView()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .frame(width: 400, height: 500)
    }
}

struct TabButton: View {
    let title: String
    let icon: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.system(size: 18))
                Text(title)
                    .font(.caption)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 8)
            .foregroundColor(isSelected ? .yellow : .primary)
            .background(isSelected ? Color.gray.opacity(0.3) : Color.clear)
            .cornerRadius(6)
        }
        .buttonStyle(.plain)
    }
}
