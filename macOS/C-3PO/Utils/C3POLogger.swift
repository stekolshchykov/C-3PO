import os.log
import Foundation

struct C3POLogger {
    static let shared = C3POLogger()
    private init() {}

    func log(_ message: String, level: OSLogType = .debug, file: String = #file, function: String = #function, line: Int = #line) {
        let category = URL(fileURLWithPath: file).deletingPathExtension().lastPathComponent
        let logger = Logger(subsystem: "mk.C-3PO", category: category)
        logger.log(level: level, "[\(function):\(line)] \(message)")
        #if DEBUG
        print("[\(category)] [\(function):\(line)] \(message)")
        #endif
    }
}
