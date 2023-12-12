const Reverso = require('reverso-api')
const reverso = new Reverso()

// {'arabic' | 'german' | 'spanish' | 'french' | 'hebrew' | 'italian' | 'japanese' | 'dutch' | 'polish' | 'portuguese' | 'romanian' | 'russian' | 'turkish' | 'chinese' | 'english'}

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

// reverso.getSpellCheck('helo man', 'english', (err, response) => {
//     if (err) throw new Error(err.message)
//
//     // console.log(response)
//     console.log(JSON.stringify(response.corrections))
// })


reverso.getSynonyms('Хрен', 'russian', (err, response) => {
    if (err) throw new Error(err.message)

    console.log(response)
})

// reverso.getConjugation('идти', 'russian', (err, response) => {
//     if (err) throw new Error(err.message)
//
//     console.log(response)
// })
