class TranslationEncoderDecoder {

    private sentenceSeparators: string[] = ["!", "?", ".", ";"]
    private newLineSeparator = "___"

    // Decodes a string
    public decode = (text: string) => {
        return text.replaceAll("○○○", "\n")
    }

    // Encodes a string
    public encode = (text: string): string => {
        return text.replaceAll("\n", "○○○")
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
            .replaceAll(". .", "..")
            .replaceAll(". .", "..")
            .replaceAll(this.newLineSeparator, "\n")
    }

    public splitString = (inputString: string, delimiters = ['.', '!', '?']): string[] => {
        const result: string[] = [];
        let currentToken = ''
        for (const char of inputString) {
            if (delimiters.includes(char)) {
                if (currentToken !== '') {
                    currentToken += char
                    result.push(currentToken)
                    currentToken = ''
                }
            } else {
                currentToken += char
            }
        }
        if (currentToken !== '') {
            result.push(currentToken)
        }
        return result
    }
}

const translationEncoderDecoder = new TranslationEncoderDecoder()
export default translationEncoderDecoder
