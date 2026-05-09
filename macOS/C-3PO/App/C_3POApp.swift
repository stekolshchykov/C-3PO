import SwiftUI

@main
struct C_3POApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    
    var body: some Scene {
        Settings {
            Text("Settings")
        }
    }
}
