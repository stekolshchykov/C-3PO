import Cocoa
import SwiftUI
import Carbon

class AppDelegate: NSObject, NSApplicationDelegate {
    private var statusItem: NSStatusItem!
    private var panel: NSPanel!
    private var eventMonitor: Any?
    private let panelWidth: CGFloat = 600
    private let panelHeight: CGFloat = 730
    private let triangleHeight: CGFloat = 20

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.accessory)
        setupStatusItem()
        setupPanel()
        setupGlobalMonitor()
        registerGlobalHotkey()
    }

    private func setupStatusItem() {
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
        if let button = statusItem.button {
            let image = NSImage(named: "trayIcon") ?? NSImage(systemSymbolName: "translate", accessibilityDescription: "C-3PO")
            image?.size = NSSize(width: 18, height: 18)
            image?.isTemplate = true
            button.image = image
            button.action = #selector(togglePanel)
            button.target = self
        }
    }

    private func setupPanel() {
        panel = NSPanel(
            contentRect: NSRect(x: 0, y: 0, width: panelWidth, height: panelHeight),
            styleMask: [.borderless, .nonactivatingPanel],
            backing: .buffered,
            defer: false
        )
        panel.isOpaque = false
        panel.backgroundColor = .clear
        panel.hasShadow = true
        panel.level = .floating
        panel.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary]
        panel.contentViewController = NSHostingController(rootView: ContentView().frame(width: panelWidth, height: panelHeight))
    }

    private func setupGlobalMonitor() {
        addGlobalMonitor()
        NotificationCenter.default.addObserver(self, selector: #selector(dockedModeChanged(_:)), name: .dockedModeChanged, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(togglePanel), name: .toggleC3POPanel, object: nil)
    }

    private func addGlobalMonitor() {
        guard eventMonitor == nil else { return }
        eventMonitor = NSEvent.addGlobalMonitorForEvents(matching: [.leftMouseDown, .rightMouseDown]) { [weak self] _ in
            guard let self, self.panel.isVisible else { return }
            if !self.panel.frame.contains(NSEvent.mouseLocation) {
                self.hidePanel()
            }
        }
    }

    private func removeGlobalMonitor() {
        guard let monitor = eventMonitor else { return }
        NSEvent.removeMonitor(monitor)
        eventMonitor = nil
    }

    @objc private func dockedModeChanged(_ notification: Notification) {
        guard let isDocked = notification.object as? Bool else { return }
        if isDocked {
            removeGlobalMonitor()
        } else {
            addGlobalMonitor()
        }
    }

    private func registerGlobalHotkey() {
        var eventType = EventTypeSpec(eventClass: OSType(kEventClassKeyboard), eventKind: OSType(kEventHotKeyPressed))

        let handler: EventHandlerUPP = { _, event, _ -> OSStatus in
            var hkID = EventHotKeyID()
            GetEventParameter(
                event,
                EventParamName(kEventParamDirectObject),
                EventParamType(typeEventHotKeyID),
                nil,
                MemoryLayout<EventHotKeyID>.size,
                nil,
                &hkID
            )
            if hkID.id == 1 {
                DispatchQueue.main.async {
                    NotificationCenter.default.post(name: .toggleC3POPanel, object: nil)
                }
            }
            return noErr
        }

        InstallEventHandler(GetApplicationEventTarget(), handler, 1, &eventType, nil, nil)

        var hotKeyID = EventHotKeyID(signature: 0x4333504F, id: 1)
        var hotKeyRef: EventHotKeyRef?
        RegisterEventHotKey(UInt32(kVK_ANSI_G), UInt32(cmdKey), hotKeyID, GetApplicationEventTarget(), 0, &hotKeyRef)
    }

    @objc private func togglePanel() {
        if panel.isVisible {
            hidePanel()
        } else {
            showPanel()
        }
    }

    private func showPanel() {
        guard let button = statusItem.button else { return }
        let buttonRect = button.window?.convertToScreen(button.frame) ?? .zero
        let x = buttonRect.midX - panelWidth / 2
        let y = buttonRect.minY - panelHeight
        panel.setFrameOrigin(NSPoint(x: x, y: y))
        panel.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }

    private func hidePanel() {
        panel.orderOut(nil)
    }
}
