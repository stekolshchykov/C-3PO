const Reverso = require('reverso-api')
const available = require('reverso-api/src/languages/available.js')

const reverso = new Reverso()

// {'arabic' | 'german' | 'spanish' | 'french' | 'hebrew' | 'italian' | 'japanese' | 'dutch' | 'polish' | 'portuguese' | 'romanian' | 'russian' | 'turkish' | 'chinese' | 'english'}

// ok
const run = async () => {
    for (const c of available.context) {
        for (const c2 of available.context) {
            let result = ""
            try {
                result = await reverso.getContext(
                    'meet me half way',
                    c,
                    c2,
                    (err, response) => {
                        // if (err) throw new Error(err.message)
                        return err ? false : true
                    }
                )
            } catch (e) {
//
            }
            console.log(c, c2, result.ok)
        }
    }
}


run()


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

// reverso.getConjugation('идти', 'russian', (err, response) => {
//     if (err) throw new Error(err.message)
//
//     console.log(JSON.stringify(response, null, "\t"))
// })
