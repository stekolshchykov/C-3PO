import Cocoa
import SwiftUI
import Carbon

class AppDelegate: NSObject, NSApplicationDelegate {
    private var statusItem: NSStatusItem!
    private var popover: NSPopover!
    private var tempAnchorWindow: NSPanel?

    func applicationDidFinishLaunching(_ notification: Notification) {
        C3POLogger.shared.log("applicationDidFinishLaunching")
        let isUITesting = ProcessInfo.processInfo.arguments.contains("--ui-testing")
        if !isUITesting {
            NSApp.setActivationPolicy(.accessory)
        }
        setupStatusItem()
        setupPopover()
        setupNotifications()
        registerGlobalHotkey()

        if isUITesting {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                self.showPopover()
            }
        }
    }

    private func setupStatusItem() {
        C3POLogger.shared.log("setupStatusItem")
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
        if let button = statusItem.button {
            let image = NSImage(named: "trayIcon") ?? NSImage(systemSymbolName: "translate", accessibilityDescription: "C-3PO")
            let targetHeight: CGFloat = 18
            if let image {
                let ratio = image.size.width / image.size.height
                image.size = NSSize(width: targetHeight * ratio, height: targetHeight)
            }
            image?.isTemplate = false
            button.image = image
            button.action = #selector(togglePanel)
            button.target = self
        }
    }

    private func setupPopover() {
        C3POLogger.shared.log("setupPopover")
        popover = NSPopover()
        popover.contentSize = NSSize(width: 720, height: 730)
        popover.behavior = .transient
        let hostingController = NSHostingController(rootView: ContentView())
        hostingController.preferredContentSize = popover.contentSize
        popover.contentViewController = hostingController
    }

    private func setupNotifications() {
        C3POLogger.shared.log("setupNotifications")
        NotificationCenter.default.addObserver(self, selector: #selector(dockedModeChanged(_:)), name: .dockedModeChanged, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(togglePanel), name: .toggleC3POPanel, object: nil)
    }

    @objc private func dockedModeChanged(_ notification: Notification) {
        C3POLogger.shared.log("dockedModeChanged: \(notification.object ?? "nil")")
        guard let isDocked = notification.object as? Bool else { return }
        popover.behavior = isDocked ? .applicationDefined : .transient
    }

    private func registerGlobalHotkey() {
        C3POLogger.shared.log("registerGlobalHotkey")
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
        C3POLogger.shared.log("togglePanel: isShown=\(popover.isShown)")
        if popover.isShown {
            hidePopover()
        } else {
            showPopover()
        }
    }

    private func showPopover() {
        C3POLogger.shared.log("showPopover")
        NSRunningApplication.current.activate(options: [.activateIgnoringOtherApps])

        if let button = statusItem.button,
           let window = button.window,
           window.isVisible,
           NSScreen.screens.contains(where: { $0.frame.intersects(window.convertToScreen(button.frame)) }) {
            popover.show(relativeTo: button.bounds, of: button, preferredEdge: .minY)
        } else {
            showPopoverAtMouse()
        }
        captureClipboardToHistory()
    }

    private func showPopoverAtMouse() {
        let mouseLoc = NSEvent.mouseLocation
        tempAnchorWindow?.orderOut(nil)
        tempAnchorWindow = NSPanel(contentRect: NSRect(x: mouseLoc.x, y: mouseLoc.y, width: 1, height: 1), styleMask: [.borderless], backing: .buffered, defer: false)
        tempAnchorWindow?.level = .floating
        tempAnchorWindow?.backgroundColor = .clear
        tempAnchorWindow?.isOpaque = false
        tempAnchorWindow?.orderFront(nil)
        if let view = tempAnchorWindow?.contentView {
            popover.show(relativeTo: view.bounds, of: view, preferredEdge: .minY)
        }
    }

    private func captureClipboardToHistory() {
        C3POLogger.shared.log("captureClipboardToHistory")
        guard let text = NSPasteboard.general.string(forType: .string) else { return }
        HistoryStore.shared.add(text: text)
        NotificationCenter.default.post(name: .clipboardCaptured, object: text)
    }

    private func hidePopover() {
        C3POLogger.shared.log("hidePopover")
        popover.performClose(nil)
        tempAnchorWindow?.orderOut(nil)
        tempAnchorWindow = nil
    }
}
