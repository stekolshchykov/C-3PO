import SwiftUI

@main
struct C_3POApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    
    var body: some Scene {
        let _ = C3POLogger.shared.log("C_3POApp.body")
        Settings {
            Text("Settings")
        }
    }
}
