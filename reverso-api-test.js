const Reverso = require('reverso-api')
const available = require('reverso-api/src/languages/available.js')
const reverso = new Reverso()

// {'arabic' | 'german' | 'spanish' | 'french' | 'hebrew' | 'italian' | 'japanese' | 'dutch' | 'polish' | 'portuguese' | 'romanian' | 'russian' | 'turkish' | 'chinese' | 'english'}

// ok
// reverso.getContext(
//     'meet me half way',
//     'english',
//     'russian',
//     (err, response) => {
//         if (err) throw new Error(err.message)
//
//         console.log(response)
//     }
// )

// ok
// reverso.getSpellCheck("Hello mommm", 'english', (err, response) => {
//     if (err) throw new Error(err.message)
//
//     // console.log(response)
//     console.log(JSON.stringify(response, null, "\t"))
// })

// ok
// reverso.getSynonyms('Хрен', 'russian', (err, response) => {
//     if (err) throw new Error(err.message)
//
//     console.log(response)
// })

reverso.getConjugation('идти', 'russian', (err, response) => {
    if (err) throw new Error(err.message)

    console.log(JSON.stringify(response, null, "\t"))
})
