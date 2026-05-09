import XCTest

final class C_3POUITests: XCTestCase {

    static let appURL = URL(fileURLWithPath: "/Users/mk/Library/Developer/Xcode/DerivedData/C-3PO-awxomvhbqwygnsadwaetbhfrefrp/Build/Products/Debug/C-3PO.app")
    static var sharedApp: XCUIApplication!

    override class func setUp() {
        super.setUp()
        sharedApp = XCUIApplication(url: appURL)
        sharedApp.launchArguments = ["--ui-testing"]
        sharedApp.launch()
    }

    var app: XCUIApplication { Self.sharedApp }

    func testAppLaunches() throws {
        XCTAssertTrue(app.exists)
    }

    func testAllNavTabsExist() throws {
        let tabs = [
            "translatorTab",
            "contextTab",
            "synonymsTab",
            "spellCheckTab",
            "conjugationTab",
            "wikipediaTab"
        ]

        for tab in tabs {
            let button = app.buttons[tab]
            XCTAssertTrue(button.waitForExistence(timeout: 3), "Tab \(tab) should exist")
        }
    }

    func testSourceTextAreaExists() throws {
        let textArea = app.otherElements["sourceTextArea"]
        XCTAssertTrue(textArea.waitForExistence(timeout: 3))
    }
}
