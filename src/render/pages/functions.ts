import axios from "axios";

export const translateText = async (text: string, fromCode: string, toCode: string) => {
    let translateText = ""
    const textArray = text
        .replace(/\?/gi, "?*******")
        .replace(/\!/gi, "!*******")
        .replace(/\./gi, ".*******")
        .replace(/\?/gi, "??")
        .split("*******")
        .map(e => e.trim()).filter(e => e.length > 0)
    for (const suggestion of textArray) {
        const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
            params: {
                client: "gtx",
                sl: fromCode,
                tl: toCode,
                dt: "t",
                q: suggestion
            }
        })
            .then(e => e.data[0][0][0].replace("??", "?"))
            .catch(e => {
                console.log(e)
                return ""
            })
        translateText += response + " "
    }
    return translateText.trim()
}