import axios from "axios";
import translationEncoderDecoder from "./TranslationEncoderDecoder";

export const translateText = async (text: string, fromCode: string, toCode: string) => {
    let translateText = ""
    const textArray = translationEncoderDecoder.encode(text)
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
            .then(e => translationEncoderDecoder.decode(e.data[0][0][0]))
            .catch(e => {
                console.log(e)
                return ""
            })
        translateText += response
    }
    translationEncoderDecoder.spacer(translateText)
    return translationEncoderDecoder.spacer(translateText)
}
