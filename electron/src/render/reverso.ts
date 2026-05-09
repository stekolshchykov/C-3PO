// @ts-ignore
import Reverso from "reverso-api";

// @ts-ignore
import available from "reverso-api/src/languages/available.js";

export const availableLang: {
    context: string[]
    spell: string[]
    synonyms: []
    translation: []
    conjugation: []
} = available

export const reverso = new Reverso();

