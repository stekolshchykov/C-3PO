class TranslationEncoderDecoder {

    private sentenceSeparators: string[] = ["!", "?", ".", ";"]

    // Decodes a string
    public decode = (text: string) => {
        return text
            .replaceAll("○○○", ";")
            .replaceAll("¶¶¶", "?")
    }

    // Encodes a string
    public encode = (text: string): string[] => {
        return text
            .replaceAll("?", "?*******")
            .replaceAll(";", "○○○*******")
            .replaceAll("!", "!*******")
            .replaceAll(".", ".*******")
            .replace(/\?/gi, "¶¶¶")
            .split("*******")
            .map(e => e.trim()).filter(e => e.length > 0)
    }

    // Adds spaces to text
    public spacer = (text: string) => {
        let result = ""
        for (let i = 0; i < text.length; i++) {
            const isLast = i === text.length - 1
            const isNeedSeparator = this.sentenceSeparators.some(x => x === text[i])
            if (!isLast && isNeedSeparator) {
                result += text[i] + " "
            } else {
                result += text[i]
            }
        }
        return result
    }
}

const translationEncoderDecoder = new TranslationEncoderDecoder()
export default translationEncoderDecoder
