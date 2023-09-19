export const translateText = async (text: string, fromCode: string, toCode: string) => {
    let translateText = ""
    for (const t of text.split(".")) {
        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromCode}&tl=${toCode}&dt=t&q=${t}`
        )
            .then(e => e.json())
            .then(e => e[0][0][0])
        translateText += response
    }
    return translateText
}