import SwiftUI

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }

    static let c3poWhite = Color(hex: "DCD8D8")
    static let c3poGray = Color(hex: "313131")
    static let c3poGrayLight = Color(hex: "494949")
    static let c3poGrayDark = Color(hex: "262626")
    static let c3poYellow = Color(hex: "F8CB5C")
    static let c3poRed = Color(hex: "F54A2E")
}

extension Font {
    static let c3poBody = Font.system(size: 16, weight: .regular)
    static let c3poTab = Font.system(size: 18, weight: .regular)
    static let c3poCaption = Font.system(size: 12, weight: .regular)
}
