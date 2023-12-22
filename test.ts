// // import Store from "electron-store";
// //
// // const store = new Store()
// // const main = async () => {
// //     const config = await store.get("config")
// //     console.log(config)
// // }
// // main()
//
// import wiki from 'wikipedia';
//
// (async () => {
//     try {
//         const page = await wiki.page('хтмл');
//         console.log(page);
//         //Response of type @Page object
//         // const summary = await page.summary();
//         // const images = await page.images();
//         const intro = await page.intro();
//         // console.log(summary);
//         // console.log(images);
//         console.log(intro);
//         //Response of type @wikiSummary - contains the intro and the main image
//     } catch (error) {
//         console.log(error);
//         //=> Typeof wikiError
//     }
// })();
const fs = require('node:fs');


export interface ILanguage {
    name: string;
    code: string;
}

export interface ICountry {
    code: string
    name: string
    native: string
    phone: number | string
    continent: string
    capital: string
    currency: string
    languages: string
}

export interface ICountry2 {
    country: string
    languages: string[]

}

// export interface ICountriesList {
//     [key: string]: ICountry
// }

const countries2: ICountry2[] = [
    {
        country: "Aruba",
        languages: [
            "Dutch",
            "English",
            "Papiamento",
            "Spanish"
        ]
    },
    {
        country: "Afghanistan",
        languages: [
            "Balochi",
            "Dari",
            "Pashto",
            "Turkmenian",
            "Uzbek"
        ]
    },
    {
        country: "Angola",
        languages: [
            "Ambo",
            "Chokwe",
            "Kongo",
            "Luchazi",
            "Luimbe-nganguela",
            "Luvale",
            "Mbundu",
            "Nyaneka-nkhumbi",
            "Ovimbundu"
        ]
    },
    {
        country: "Anguilla",
        languages: [
            "English"
        ]
    },
    {
        country: "Albania",
        languages: [
            "Albaniana",
            "Greek",
            "Macedonian"
        ]
    },
    {
        country: "Andorra",
        languages: [
            "Catalan",
            "French",
            "Portuguese",
            "Spanish"
        ]
    },
    {
        country: "Netherlands Antilles",
        languages: [
            "Dutch",
            "English",
            "Papiamento"
        ]
    },
    {
        country: "United Arab Emirates",
        languages: [
            "Arabic",
            "Hindi"
        ]
    },
    {
        country: "Argentina",
        languages: [
            "Indian Languages",
            "Italian",
            "Spanish"
        ]
    },
    {
        country: "Armenia",
        languages: [
            "Armenian",
            "Azerbaijani"
        ]
    },
    {
        country: "American Samoa",
        languages: [
            "English",
            "Samoan",
            "Tongan"
        ]
    },
    {
        country: "Antigua and Barbuda",
        languages: [
            "Creole English",
            "English"
        ]
    },
    {
        country: "Australia",
        languages: [
            "Arabic",
            "Canton Chinese",
            "English",
            "German",
            "Greek",
            "Italian",
            "Serbo-Croatian",
            "Vietnamese"
        ]
    },
    {
        country: "Austria",
        languages: [
            "Czech",
            "German",
            "Hungarian",
            "Polish",
            "Romanian",
            "Serbo-Croatian",
            "Slovene",
            "Turkish"
        ]
    },
    {
        country: "Azerbaijan",
        languages: [
            "Armenian",
            "Azerbaijani",
            "Lezgian",
            "Russian"
        ]
    },
    {
        country: "Burundi",
        languages: [
            "French",
            "Kirundi",
            "Swahili"
        ]
    },
    {
        country: "Belgium",
        languages: [
            "Arabic",
            "Dutch",
            "French",
            "German",
            "Italian",
            "Turkish"
        ]
    },
    {
        country: "Benin",
        languages: [
            "Adja",
            "Aizo",
            "Bariba",
            "Fon",
            "Ful",
            "Joruba",
            "Somba"
        ]
    },
    {
        country: "Burkina Faso",
        languages: [
            "Busansi",
            "Dagara",
            "Dyula",
            "Ful",
            "Gurma",
            "Mossi"
        ]
    },
    {
        country: "Bangladesh",
        languages: [
            "Bengali",
            "Chakma",
            "Garo",
            "Khasi",
            "Marma",
            "Santhali",
            "Tripuri"
        ]
    },
    {
        country: "Bulgaria",
        languages: [
            "Bulgariana",
            "Macedonian",
            "Romani",
            "Turkish"
        ]
    },
    {
        country: "Bahrain",
        languages: [
            "Arabic",
            "English"
        ]
    },
    {
        country: "Bahamas",
        languages: [
            "Creole English",
            "Creole French"
        ]
    },
    {
        country: "Bosnia and Herzegovina",
        languages: [
            "Bosnian"
        ]
    },
    {
        country: "Belarus",
        languages: [
            "Belorussian",
            "Polish",
            "Russian",
            "Ukrainian"
        ]
    },
    {
        country: "Belize",
        languages: [
            "English",
            "Garifuna",
            "Maya Languages",
            "Spanish"
        ]
    },
    {
        country: "Bermuda",
        languages: [
            "English"
        ]
    },
    {
        country: "Bolivia",
        languages: [
            "Aimar√°",
            "Guaran√≠",
            "Ket¬öua",
            "Spanish"
        ]
    },
    {
        country: "Brazil",
        languages: [
            "German",
            "Indian Languages",
            "Italian",
            "Japanese",
            "Portuguese"
        ]
    },
    {
        country: "Barbados",
        languages: [
            "Bajan",
            "English"
        ]
    },
    {
        country: "Brunei",
        languages: [
            "Chinese",
            "English",
            "Malay",
            "Malay-English"
        ]
    },
    {
        country: "Bhutan",
        languages: [
            "Asami",
            "Dzongkha",
            "Nepali"
        ]
    },
    {
        country: "Botswana",
        languages: [
            "Khoekhoe",
            "Ndebele",
            "San",
            "Shona",
            "Tswana"
        ]
    },
    {
        country: "Central African Republic",
        languages: [
            "Banda",
            "Gbaya",
            "Mandjia",
            "Mbum",
            "Ngbaka",
            "Sara"
        ]
    },
    {
        country: "Canada",
        languages: [
            "Chinese",
            "Dutch",
            "English",
            "Eskimo Languages",
            "French",
            "German",
            "Italian",
            "Polish",
            "Portuguese",
            "Punjabi",
            "Spanish",
            "Ukrainian"
        ]
    },
    {
        country: "Cocos (Keeling) Islands",
        languages: [
            "English",
            "Malay"
        ]
    },
    {
        country: "Switzerland",
        languages: [
            "French",
            "German",
            "Italian",
            "Romansh"
        ]
    },
    {
        country: "Chile",
        languages: [
            "Aimar√°",
            "Araucan",
            "Rapa nui",
            "Spanish"
        ]
    },
    {
        country: "China",
        languages: [
            "Chinese",
            "Dong",
            "Hui",
            "Mant¬öu",
            "Miao",
            "Mongolian",
            "Puyi",
            "Tibetan",
            "Tujia",
            "Uighur",
            "Yi",
            "Zhuang"
        ]
    },
    {
        country: "Ivory Coast",
        languages: [
            "Akan",
            "Gur",
            "Kru",
            "Malinke",
            "[South]Mande"
        ]
    },
    {
        country: "Cameroon",
        languages: [
            "Bamileke-bamum",
            "Duala",
            "Fang",
            "Ful",
            "Maka",
            "Mandara",
            "Masana",
            "Tikar"
        ]
    },
    {
        country: "Congo, The Democratic Republic of the",
        languages: [
            "Lingala",
            "Kikongo",
            "Swahili",
            "Tshiluba"
        ]
    },
    {
        country: "Congo",
        languages: [
            "Kongo",
            "Mbete",
            "Mboshi",
            "Punu",
            "Sango",
            "Teke"
        ]
    },
    {
        country: "Cook Islands",
        languages: [
            "English",
            "Maori"
        ]
    },
    {
        country: "Colombia",
        languages: [
            "Arawakan",
            "Caribbean",
            "Chibcha",
            "Creole English",
            "Spanish"
        ]
    },
    {
        country: "Comoros",
        languages: [
            "Comorian",
            "Comorian-Arabic",
            "Comorian-French",
            "Comorian-madagassi",
            "Comorian-Swahili"
        ]
    },
    {
        country: "Cape Verde",
        languages: [
            "Crioulo",
            "Portuguese"
        ]
    },
    {
        country: "Costa Rica",
        languages: [
            "Chibcha",
            "Chinese",
            "Creole English",
            "Spanish"
        ]
    },
    {
        country: "Cuba",
        languages: [
            "Spanish"
        ]
    },
    {
        country: "Christmas Island",
        languages: [
            "Chinese",
            "English"
        ]
    },
    {
        country: "Cayman Islands",
        languages: [
            "English"
        ]
    },
    {
        country: "Cyprus",
        languages: [
            "Greek",
            "Turkish"
        ]
    },
    {
        country: "Czech Republic",
        languages: [
            "Czech",
            "German",
            "Hungarian",
            "Moravian",
            "Polish",
            "Romani",
            "Silesiana",
            "Slovak"
        ]
    },
    {
        country: "Germany",
        languages: [
            "German",
            "Greek",
            "Italian",
            "Polish",
            "Southern Slavic Languages",
            "Turkish"
        ]
    },
    {
        country: "Djibouti",
        languages: [
            "Afar",
            "Arabic",
            "Somali"
        ]
    },
    {
        country: "Dominica",
        languages: [
            "Creole English",
            "Creole French"
        ]
    },
    {
        country: "Denmark",
        languages: [
            "Arabic",
            "Danish",
            "English",
            "German",
            "Norwegian",
            "Swedish",
            "Turkish"
        ]
    },
    {
        country: "Dominican Republic",
        languages: [
            "Creole French",
            "Spanish"
        ]
    },
    {
        country: "Algeria",
        languages: [
            "Arabic",
            "Berberi"
        ]
    },
    {
        country: "Ecuador",
        languages: [
            "Ket¬öua",
            "Spanish"
        ]
    },
    {
        country: "Egypt",
        languages: [
            "Arabic",
            "Sinaberberi"
        ]
    },
    {
        country: "Eritrea",
        languages: [
            "Afar",
            "Bilin",
            "Hadareb",
            "Saho",
            "Tigre",
            "Tigrigna"
        ]
    },
    {
        country: "Western Sahara",
        languages: [
            "Arabic"
        ]
    },
    {
        country: "Spain",
        languages: [
            "Basque",
            "Catalan",
            "Galecian",
            "Spanish"
        ]
    },
    {
        country: "Estonia",
        languages: [
            "Belorussian",
            "Estonian",
            "Finnish",
            "Russian",
            "Ukrainian"
        ]
    },
    {
        country: "Ethiopia",
        languages: [
            "Amharic",
            "Gurage",
            "Oromo",
            "Sidamo",
            "Somali",
            "Tigrigna",
            "Walaita"
        ]
    },
    {
        country: "Finland",
        languages: [
            "Estonian",
            "Finnish",
            "Russian",
            "Saame",
            "Swedish"
        ]
    },
    {
        country: "Fiji Islands",
        languages: [
            "Fijian",
            "Hindi"
        ]
    },
    {
        country: "Falkland Islands",
        languages: [
            "English"
        ]
    },
    {
        country: "France",
        languages: [
            "Arabic",
            "French",
            "Italian",
            "Portuguese",
            "Spanish",
            "Turkish"
        ]
    },
    {
        country: "Faroe Islands",
        languages: [
            "Danish",
            "Faroese"
        ]
    },
    {
        country: "Micronesia, Federated States of",
        languages: [
            "Kosrean",
            "Mortlock",
            "Pohnpei",
            "Trukese",
            "Wolea",
            "Yap"
        ]
    },
    {
        country: "Gabon",
        languages: [
            "Fang",
            "Mbete",
            "Mpongwe",
            "Punu-sira-nzebi"
        ]
    },
    {
        country: "United Kingdom",
        languages: [
            "English",
            "Gaeli",
            "Kymri"
        ]
    },
    {
        country: "Georgia",
        languages: [
            "Abhyasi",
            "Armenian",
            "Azerbaijani",
            "Georgiana",
            "Osseetti",
            "Russian"
        ]
    },
    {
        country: "Ghana",
        languages: [
            "Akan",
            "Ewe",
            "Ga-adangme",
            "Gurma",
            "Joruba",
            "Mossi"
        ]
    },
    {
        country: "Gibraltar",
        languages: [
            "Arabic",
            "English"
        ]
    },
    {
        country: "Guinea",
        languages: [
            "Ful",
            "Kissi",
            "Kpelle",
            "Loma",
            "Malinke",
            "Susu",
            "Yalunka"
        ]
    },
    {
        country: "Guadeloupe",
        languages: [
            "Creole French",
            "French"
        ]
    },
    {
        country: "Gambia",
        languages: [
            "Diola",
            "Ful",
            "Malinke",
            "Soninke",
            "Wolof"
        ]
    },
    {
        country: "Guinea-Bissau",
        languages: [
            "Balante",
            "Crioulo",
            "Ful",
            "Malinke",
            "Mandyako",
            "Portuguese"
        ]
    },
    {
        country: "Equatorial Guinea",
        languages: [
            "Bubi",
            "Fang"
        ]
    },
    {
        country: "Greece",
        languages: [
            "Greek",
            "Turkish"
        ]
    },
    {
        country: "Grenada",
        languages: [
            "Creole English"
        ]
    },
    {
        country: "Greenland",
        languages: [
            "Danish",
            "Greenlandic"
        ]
    },
    {
        country: "Guatemala",
        languages: [
            "Cakchiquel",
            "Kekch√≠",
            "Mam",
            "Quich√©",
            "Spanish"
        ]
    },
    {
        country: "French Guiana",
        languages: [
            "Creole French",
            "Indian Languages"
        ]
    },
    {
        country: "Guam",
        languages: [
            "Chamorro",
            "English",
            "Japanese",
            "Korean",
            "Philippene Languages"
        ]
    },
    {
        country: "Guyana",
        languages: [
            "Arawakan",
            "Caribbean",
            "Creole English"
        ]
    },
    {
        country: "Hong Kong",
        languages: [
            "Canton Chinese",
            "Chiu chau",
            "English",
            "Fukien",
            "Hakka"
        ]
    },
    {
        country: "Honduras",
        languages: [
            "Creole English",
            "Garifuna",
            "Miskito",
            "Spanish"
        ]
    },
    {
        country: "Croatia",
        languages: [
            "Serbo-Croatian",
            "Slovene"
        ]
    },
    {
        country: "Haiti",
        languages: [
            "French",
            "Haiti Creole"
        ]
    },
    {
        country: "Hungary",
        languages: [
            "German",
            "Hungarian",
            "Romani",
            "Romanian",
            "Serbo-Croatian",
            "Slovak"
        ]
    },
    {
        country: "Indonesia",
        languages: [
            "Bahasa",
            "Bali",
            "Banja",
            "Batakki",
            "Bugi",
            "Javanese",
            "Madura",
            "Malay",
            "Minangkabau",
            "Sunda"
        ]
    },
    {
        country: "India",
        languages: [
            "Asami",
            "Bengali",
            "Gujarati",
            "Hindi",
            "Kannada",
            "Malayalam",
            "Marathi",
            "Odia",
            "Punjabi",
            "Tamil",
            "Telugu",
            "Urdu",
            "Sanskrit",
            "English",
            "Konkani",
            "Nepali",
            "Bodo",
            "Kashmiri",
            "Maithili",
            "Santali",
            "Sindhi"
        ]
    },
    {
        country: "Ireland",
        languages: [
            "English",
            "Irish"
        ]
    },
    {
        country: "Iran",
        languages: [
            "Arabic",
            "Azerbaijani",
            "Bakhtyari",
            "Balochi",
            "Gilaki",
            "Kurdish",
            "Luri",
            "Mazandarani",
            "Persian",
            "Turkmenian"
        ]
    },
    {
        country: "Iraq",
        languages: [
            "Arabic",
            "Assyrian",
            "Azerbaijani",
            "Kurdish",
            "Persian"
        ]
    },
    {
        country: "Iceland",
        languages: [
            "English",
            "Icelandic"
        ]
    },
    {
        country: "Israel",
        languages: [
            "Arabic",
            "Hebrew",
            "Russian"
        ]
    },
    {
        country: "Italy",
        languages: [
            "Albaniana",
            "French",
            "Friuli",
            "German",
            "Italian",
            "Romani",
            "Sardinian",
            "Slovene"
        ]
    },
    {
        country: "Jamaica",
        languages: [
            "Creole English",
            "Hindi"
        ]
    },
    {
        country: "Jordan",
        languages: [
            "Arabic",
            "Armenian",
            "Circassian"
        ]
    },
    {
        country: "Japan",
        languages: [
            "Ainu",
            "Chinese",
            "English",
            "Japanese",
            "Korean",
            "Philippene Languages"
        ]
    },
    {
        country: "Kazakhstan",
        languages: [
            "German",
            "Kazakh",
            "Russian",
            "Tatar",
            "Ukrainian",
            "Uzbek"
        ]
    },
    {
        country: "Kenya",
        languages: [
            "Gusii",
            "Kalenjin",
            "Kamba",
            "Kikuyu",
            "Luhya",
            "Luo",
            "Masai",
            "Meru",
            "Nyika",
            "Turkana"
        ]
    },
    {
        country: "Kyrgyzstan",
        languages: [
            "Kazakh",
            "Kirgiz",
            "Russian",
            "Tadzhik",
            "Tatar",
            "Ukrainian",
            "Uzbek"
        ]
    },
    {
        country: "Cambodia",
        languages: [
            "Khmer"
        ]
    },
    {
        country: "Kiribati",
        languages: [
            "Kiribati",
            "Tuvalu"
        ]
    },
    {
        country: "Saint Kitts and Nevis",
        languages: [
            "Creole English",
            "English"
        ]
    },
    {
        country: "South Korea",
        languages: [
            "Chinese",
            "Korean"
        ]
    },
    {
        country: "Kuwait",
        languages: [
            "Arabic",
            "English"
        ]
    },
    {
        country: "Laos",
        languages: [
            "Lao",
            "Lao-Soung",
            "Mon-khmer",
            "Thai"
        ]
    },
    {
        country: "Lebanon",
        languages: [
            "Arabic",
            "Armenian",
            "French"
        ]
    },
    {
        country: "Liberia",
        languages: [
            "Bassa",
            "Gio",
            "Grebo",
            "Kpelle",
            "Kru",
            "Loma",
            "Malinke",
            "Mano"
        ]
    },
    {
        country: "Libyan Arab Jamahiriya",
        languages: [
            "Arabic",
            "Berberi"
        ]
    },
    {
        country: "Saint Lucia",
        languages: [
            "Creole French",
            "English"
        ]
    },
    {
        country: "Liechtenstein",
        languages: [
            "German",
            "Italian",
            "Turkish"
        ]
    },
    {
        country: "Sri Lanka",
        languages: [
            "Mixed Languages",
            "Singali",
            "Tamil"
        ]
    },
    {
        country: "Lesotho",
        languages: [
            "English",
            "Sotho",
            "Zulu"
        ]
    },
    {
        country: "Lithuania",
        languages: [
            "Belorussian",
            "Lithuanian",
            "Polish",
            "Russian",
            "Ukrainian"
        ]
    },
    {
        country: "Luxembourg",
        languages: [
            "French",
            "German",
            "Italian",
            "Luxembourgish",
            "Portuguese"
        ]
    },
    {
        country: "Latvia",
        languages: [
            "Belorussian",
            "Latvian",
            "Lithuanian",
            "Polish",
            "Russian",
            "Ukrainian"
        ]
    },
    {
        country: "Macao",
        languages: [
            "Canton Chinese",
            "English",
            "Mandarin Chinese",
            "Portuguese"
        ]
    },
    {
        country: "Morocco",
        languages: [
            "Arabic",
            "Berberi"
        ]
    },
    {
        country: "Monaco",
        languages: [
            "English",
            "French",
            "Italian",
            "Monegasque"
        ]
    },
    {
        country: "Moldova",
        languages: [
            "Bulgariana",
            "Gagauzi",
            "Romanian",
            "Russian",
            "Ukrainian"
        ]
    },
    {
        country: "Madagascar",
        languages: [
            "French",
            "Malagasy"
        ]
    },
    {
        country: "Maldives",
        languages: [
            "Dhivehi",
            "English"
        ]
    },
    {
        country: "Mexico",
        languages: [
            "Mixtec",
            "N√°huatl",
            "Otom√≠",
            "Spanish",
            "Yucatec",
            "Zapotec"
        ]
    },
    {
        country: "Marshall Islands",
        languages: [
            "English",
            "Marshallese"
        ]
    },
    {
        country: "Macedonia",
        languages: [
            "Albaniana",
            "Macedonian",
            "Romani",
            "Serbo-Croatian",
            "Turkish"
        ]
    },
    {
        country: "Mali",
        languages: [
            "Bambara",
            "Ful",
            "Senufo and Minianka",
            "Songhai",
            "Soninke",
            "Tamashek"
        ]
    },
    {
        country: "Malta",
        languages: [
            "English",
            "Maltese"
        ]
    },
    {
        country: "Myanmar",
        languages: [
            "Burmese",
            "Chin",
            "Kachin",
            "Karen",
            "Kayah",
            "Mon",
            "Rakhine",
            "Shan"
        ]
    },
    {
        country: "Mongolia",
        languages: [
            "Bajad",
            "Buryat",
            "Dariganga",
            "Dorbet",
            "Kazakh",
            "Mongolian"
        ]
    },
    {
        country: "Northern Mariana Islands",
        languages: [
            "Carolinian",
            "Chamorro",
            "Chinese",
            "English",
            "Korean",
            "Philippene Languages"
        ]
    },
    {
        country: "Mozambique",
        languages: [
            "Chuabo",
            "Lomwe",
            "Makua",
            "Marendje",
            "Nyanja",
            "Ronga",
            "Sena",
            "Shona",
            "Tsonga",
            "Tswa"
        ]
    },
    {
        country: "Mauritania",
        languages: [
            "Ful",
            "Hassaniya",
            "Soninke",
            "Tukulor",
            "Wolof",
            "Zenaga"
        ]
    },
    {
        country: "Montserrat",
        languages: [
            "English"
        ]
    },
    {
        country: "Martinique",
        languages: [
            "Creole French",
            "French"
        ]
    },
    {
        country: "Mauritius",
        languages: [
            "Bhojpuri",
            "Creole French",
            "French",
            "Hindi",
            "Marathi",
            "Tamil"
        ]
    },
    {
        country: "Malawi",
        languages: [
            "Chichewa",
            "Lomwe",
            "Ngoni",
            "Yao"
        ]
    },
    {
        country: "Malaysia",
        languages: [
            "Chinese",
            "Dusun",
            "English",
            "Iban",
            "Malay",
            "Tamil"
        ]
    },
    {
        country: "Mayotte",
        languages: [
            "French",
            "Mahor√©",
            "Malagasy"
        ]
    },
    {
        country: "Namibia",
        languages: [
            "Afrikaans",
            "Caprivi",
            "German",
            "Herero",
            "Kavango",
            "Nama",
            "Ovambo",
            "San"
        ]
    },
    {
        country: "New Caledonia",
        languages: [
            "French",
            "Malenasian Languages",
            "Polynesian Languages"
        ]
    },
    {
        country: "Niger",
        languages: [
            "Ful",
            "Hausa",
            "Kanuri",
            "Songhai-zerma",
            "Tamashek"
        ]
    },
    {
        country: "Norfolk Island",
        languages: [
            "English"
        ]
    },
    {
        country: "Nigeria",
        languages: [
            "Bura",
            "Edo",
            "Ful",
            "Hausa",
            "Ibibio",
            "Ibo",
            "Ijo",
            "Yoruba",
            "Kanuri",
            "Tiv"
        ]
    },
    {
        country: "Nicaragua",
        languages: [
            "Creole English",
            "Miskito",
            "Spanish",
            "Sumo"
        ]
    },
    {
        country: "Niue",
        languages: [
            "English",
            "Niue"
        ]
    },
    {
        country: "Netherlands",
        languages: [
            "Arabic",
            "Dutch",
            "Fries",
            "Turkish"
        ]
    },
    {
        country: "Norway",
        languages: [
            "Danish",
            "English",
            "Norwegian",
            "Saame",
            "Swedish"
        ]
    },
    {
        country: "Nepal",
        languages: [
            "Bhojpuri",
            "Hindi",
            "Maithili",
            "Nepali",
            "Newari",
            "Tamang",
            "Tharu"
        ]
    },
    {
        country: "Nauru",
        languages: [
            "Chinese",
            "English",
            "Kiribati",
            "Nauru",
            "Tuvalu"
        ]
    },
    {
        country: "New Zealand",
        languages: [
            "English",
            "Maori"
        ]
    },
    {
        country: "Oman",
        languages: [
            "Arabic",
            "Balochi"
        ]
    },
    {
        country: "Pakistan",
        languages: [
            "Balochi",
            "Brahui",
            "Hindko",
            "Pashto",
            "Punjabi",
            "Saraiki",
            "Sindhi",
            "Urdu"
        ]
    },
    {
        country: "Panama",
        languages: [
            "Arabic",
            "Creole English",
            "Cuna",
            "Embera",
            "Guaym√≠",
            "Spanish"
        ]
    },
    {
        country: "Pitcairn",
        languages: [
            "Pitcairnese"
        ]
    },
    {
        country: "Peru",
        languages: [
            "Aimar√°",
            "Ket¬öua",
            "Spanish"
        ]
    },
    {
        country: "Philippines",
        languages: [
            "Bicol",
            "Cebuano",
            "Hiligaynon",
            "Ilocano",
            "Maguindanao",
            "Maranao",
            "Pampango",
            "Pangasinan",
            "Pilipino",
            "Waray-waray"
        ]
    },
    {
        country: "Palau",
        languages: [
            "Chinese",
            "English",
            "Palau",
            "Philippene Languages"
        ]
    },
    {
        country: "Papua New Guinea",
        languages: [
            "Malenasian Languages",
            "Papuan Languages"
        ]
    },
    {
        country: "Poland",
        languages: [
            "Belorussian",
            "German",
            "Polish",
            "Ukrainian"
        ]
    },
    {
        country: "Puerto Rico",
        languages: [
            "English",
            "Spanish"
        ]
    },
    {
        country: "North Korea",
        languages: [
            "Chinese",
            "Korean"
        ]
    },
    {
        country: "Portugal",
        languages: [
            "Portuguese"
        ]
    },
    {
        country: "Paraguay",
        languages: [
            "German",
            "Guaran√≠",
            "Portuguese",
            "Spanish"
        ]
    },
    {
        country: "Palestine",
        languages: [
            "Arabic",
            "Hebrew"
        ]
    },
    {
        country: "French Polynesia",
        languages: [
            "Chinese",
            "French",
            "Tahitian"
        ]
    },
    {
        country: "Qatar",
        languages: [
            "Arabic",
            "Urdu"
        ]
    },
    {
        country: "Reunion",
        languages: [
            "Chinese",
            "Comorian",
            "Creole French",
            "Malagasy",
            "Tamil"
        ]
    },
    {
        country: "Romania",
        languages: [
            "German",
            "Hungarian",
            "Romani",
            "Romanian",
            "Serbo-Croatian",
            "Ukrainian"
        ]
    },
    {
        country: "Russian Federation",
        languages: [
            "Avarian",
            "Bashkir",
            "Belorussian",
            "Chechen",
            "Chuvash",
            "Kazakh",
            "Mari",
            "Mordva",
            "Russian",
            "Tatar",
            "Udmur",
            "Ukrainian"
        ]
    },
    {
        country: "Rwanda",
        languages: [
            "French",
            "Rwanda"
        ]
    },
    {
        country: "Saudi Arabia",
        languages: [
            "Arabic"
        ]
    },
    {
        country: "Sudan",
        languages: [
            "Arabic",
            "Bari",
            "Beja",
            "Chilluk",
            "Dinka",
            "Fur",
            "Lotuko",
            "Nubian Languages",
            "Nuer",
            "Zande"
        ]
    },
    {
        country: "Senegal",
        languages: [
            "Diola",
            "Ful",
            "Malinke",
            "Serer",
            "Soninke",
            "Wolof"
        ]
    },
    {
        country: "Serbia",
        languages: [
            "Serbian",
            "Hungarian",
            "Slovak",
            "Romanian",
            "Croatian",
            "Rusyn",
            "Albanian",
            "Bulgarian",
            "English"
        ]
    },
    {
        country: "Singapore",
        languages: [
            "Chinese",
            "Malay",
            "Tamil"
        ]
    },
    {
        country: "Saint Helena",
        languages: [
            "English"
        ]
    },
    {
        country: "Svalbard and Jan Mayen",
        languages: [
            "Norwegian",
            "Russian"
        ]
    },
    {
        country: "Solomon Islands",
        languages: [
            "Malenasian Languages",
            "Papuan Languages",
            "Polynesian Languages"
        ]
    },
    {
        country: "Sierra Leone",
        languages: [
            "Bullom-sherbro",
            "Ful",
            "Kono-vai",
            "Kuranko",
            "Limba",
            "Mende",
            "Temne",
            "Yalunka"
        ]
    },
    {
        country: "El Salvador",
        languages: [
            "Nahua",
            "Spanish"
        ]
    },
    {
        country: "San Marino",
        languages: [
            "Italian"
        ]
    },
    {
        country: "Somalia",
        languages: [
            "Arabic",
            "Somali"
        ]
    },
    {
        country: "Saint Pierre and Miquelon",
        languages: [
            "French"
        ]
    },
    {
        country: "Sao Tome and Principe",
        languages: [
            "Crioulo",
            "French"
        ]
    },
    {
        country: "Suriname",
        languages: [
            "Hindi",
            "Sranantonga"
        ]
    },
    {
        country: "Slovakia",
        languages: [
            "Czech and Moravian",
            "Hungarian",
            "Romani",
            "Slovak",
            "Ukrainian and Russian"
        ]
    },
    {
        country: "Slovenia",
        languages: [
            "Hungarian",
            "Serbo-Croatian",
            "Slovene"
        ]
    },
    {
        country: "Sweden",
        languages: [
            "Arabic",
            "Finnish",
            "Norwegian",
            "Southern Slavic Languages",
            "Spanish",
            "Swedish"
        ]
    },
    {
        country: "Swaziland",
        languages: [
            "Swazi",
            "Zulu"
        ]
    },
    {
        country: "Seychelles",
        languages: [
            "English",
            "French",
            "Seselwa"
        ]
    },
    {
        country: "Syria",
        languages: [
            "Arabic",
            "Kurdish"
        ]
    },
    {
        country: "Turks and Caicos Islands",
        languages: [
            "English"
        ]
    },
    {
        country: "Chad",
        languages: [
            "Arabic",
            "Gorane",
            "Hadjarai",
            "Kanem-bornu",
            "Mayo-kebbi",
            "Ouaddai",
            "Sara",
            "Tandjile"
        ]
    },
    {
        country: "Togo",
        languages: [
            "Ane",
            "Ewe",
            "Gurma",
            "Kaby√©",
            "Kotokoli",
            "Moba",
            "Naudemba",
            "Watyi"
        ]
    },
    {
        country: "Thailand",
        languages: [
            "Chinese",
            "Khmer",
            "Kuy",
            "Lao",
            "Malay",
            "Thai"
        ]
    },
    {
        country: "Tajikistan",
        languages: [
            "Russian",
            "Tadzhik",
            "Uzbek"
        ]
    },
    {
        country: "Tokelau",
        languages: [
            "English",
            "Tokelau"
        ]
    },
    {
        country: "Turkmenistan",
        languages: [
            "Kazakh",
            "Russian",
            "Turkmenian",
            "Uzbek"
        ]
    },
    {
        country: "East Timor",
        languages: [
            "Portuguese",
            "Sunda"
        ]
    },
    {
        country: "Tonga",
        languages: [
            "English",
            "Tongan"
        ]
    },
    {
        country: "Trinidad and Tobago",
        languages: [
            "Creole English",
            "English",
            "Hindi"
        ]
    },
    {
        country: "Tunisia",
        languages: [
            "Arabic",
            "Arabic-French",
            "Arabic-French-English"
        ]
    },
    {
        country: "Turkey",
        languages: [
            "Arabic",
            "Kurdish",
            "Turkish"
        ]
    },
    {
        country: "Tuvalu",
        languages: [
            "English",
            "Kiribati",
            "Tuvalu"
        ]
    },
    {
        country: "Taiwan",
        languages: [
            "Ami",
            "Atayal",
            "Hakka",
            "Mandarin Chinese",
            "Min",
            "Paiwan"
        ]
    },
    {
        country: "Tanzania",
        languages: [
            "Chaga and Pare",
            "Sambaa",
            "Bondei",
            "Digo",
            "Gogo",
            "Ha",
            "Haya",
            "Hehet",
            "Luguru",
            "Makonde",
            "Nyakusa",
            "Nyamwezi",
            "Shambala",
            "Swahili"
        ]
    },
    {
        country: "Uganda",
        languages: [
            "Acholi",
            "Ganda",
            "Gisu",
            "Kiga",
            "Lango",
            "Lugbara",
            "Nkole",
            "Rwanda",
            "Soga",
            "Teso"
        ]
    },
    {
        country: "Ukraine",
        languages: [
            "Belorussian",
            "Bulgariana",
            "Hungarian",
            "Polish",
            "Romanian",
            "Russian",
            "Ukrainian"
        ]
    },
    {
        country: "United States Minor Outlying Islands",
        languages: [
            "English"
        ]
    },
    {
        country: "Uruguay",
        languages: [
            "Spanish"
        ]
    },
    {
        country: "United States",
        languages: [
            "Chinese",
            "English",
            "French",
            "German",
            "Italian",
            "Japanese",
            "Korean",
            "Polish",
            "Portuguese",
            "Spanish",
            "Tagalog",
            "Vietnamese"
        ]
    },
    {
        country: "Uzbekistan",
        languages: [
            "Karakalpak",
            "Kazakh",
            "Russian",
            "Tadzhik",
            "Tatar",
            "Uzbek"
        ]
    },
    {
        country: "Holy See (Vatican City State)",
        languages: [
            "Italian"
        ]
    },
    {
        country: "Saint Vincent and the Grenadines",
        languages: [
            "Creole English",
            "English"
        ]
    },
    {
        country: "Venezuela",
        languages: [
            "Goajiro",
            "Spanish",
            "Warrau"
        ]
    },
    {
        country: "Virgin Islands, British",
        languages: [
            "English"
        ]
    },
    {
        country: "Virgin Islands, U.S.",
        languages: [
            "English",
            "French",
            "Spanish"
        ]
    },
    {
        country: "Vietnam",
        languages: [
            "Chinese",
            "Khmer",
            "Man",
            "Miao",
            "Muong",
            "Nung",
            "Thai",
            "Tho",
            "Vietnamese"
        ]
    },
    {
        country: "Vanuatu",
        languages: [
            "Bislama",
            "English",
            "French"
        ]
    },
    {
        country: "Wallis and Futuna",
        languages: [
            "Futuna",
            "Wallis"
        ]
    },
    {
        country: "Samoa",
        languages: [
            "English",
            "Samoan",
            "Samoan-English"
        ]
    },
    {
        country: "Yemen",
        languages: [
            "Arabic",
            "Soqutri"
        ]
    },
    {
        country: "South Africa",
        languages: [
            "Afrikaans",
            "English",
            "Ndebele",
            "Northsotho",
            "Southsotho",
            "Swazi",
            "Tsonga",
            "Tswana",
            "Venda",
            "Xhosa",
            "Zulu"
        ]
    },
    {
        country: "Zambia",
        languages: [
            "Bemba",
            "Chewa",
            "Lozi",
            "Nsenga",
            "Nyanja",
            "Tongan"
        ]
    },
    {
        country: "Zimbabwe",
        languages: [
            "English",
            "Ndebele",
            "Nyanja",
            "Shona"
        ]
    }
]
const countries: ICountry[] = [
    {
        code: "AD",
        name: "Andorra",
        native: "Andorra",
        phone: 376,
        continent: "Europe",
        capital: "Andorra la Vella",
        currency: "EUR",
        languages: "ca"
    },
    {
        code: "AE",
        name: "United Arab Emirates",
        native: "دولة الإمارات العربية المتحدة",
        phone: 971,
        continent: "Asia",
        capital: "Abu Dhabi",
        currency: "AED",
        languages: "ar"
    },
    {
        code: "AF",
        name: "Afghanistan",
        native: "افغانستان",
        phone: 93,
        continent: "Asia",
        capital: "Kabul",
        currency: "AFN",
        languages: "ps,uz,tk"
    },
    {
        code: "AG",
        name: "Antigua and Barbuda",
        native: "Antigua and Barbuda",
        phone: 1268,
        continent: "North America",
        capital: "Saint John's",
        currency: "XCD",
        languages: "en"
    },
    {
        code: "AI",
        name: "Anguilla",
        native: "Anguilla",
        phone: 1264,
        continent: "North America",
        capital: "The Valley",
        currency: "XCD",
        languages: "en"
    },
    {
        code: "AL",
        name: "Albania",
        native: "Shqipëria",
        phone: 355,
        continent: "Europe",
        capital: "Tirana",
        currency: "ALL",
        languages: "sq"
    },
    {
        code: "AM",
        name: "Armenia",
        native: "Հայաստան",
        phone: 374,
        continent: "Asia",
        capital: "Yerevan",
        currency: "AMD",
        languages: "hy,ru"
    },
    {
        code: "AO",
        name: "Angola",
        native: "Angola",
        phone: 244,
        continent: "Africa",
        capital: "Luanda",
        currency: "AOA",
        languages: "pt"
    },
    {
        code: "AQ",
        name: "Antarctica",
        native: "Antarctica",
        phone: 672,
        continent: "Antarctica",
        capital: "",
        currency: "",
        languages: ""
    },
    {
        code: "AR",
        name: "Argentina",
        native: "Argentina",
        phone: 54,
        continent: "South America",
        capital: "Buenos Aires",
        currency: "ARS",
        languages: "es,gn"
    },
    {
        code: "AS",
        name: "American Samoa",
        native: "American Samoa",
        phone: 1684,
        continent: "Oceania",
        capital: "Pago Pago",
        currency: "USD",
        languages: "en,sm"
    },
    {
        code: "AT",
        name: "Austria",
        native: "Österreich",
        phone: 43,
        continent: "Europe",
        capital: "Vienna",
        currency: "EUR",
        languages: "de"
    },
    {
        code: "AU",
        name: "Australia",
        native: "Australia",
        phone: 61,
        continent: "Oceania",
        capital: "Canberra",
        currency: "AUD",
        languages: "en"
    },
    {
        code: "AW",
        name: "Aruba",
        native: "Aruba",
        phone: 297,
        continent: "North America",
        capital: "Oranjestad",
        currency: "AWG",
        languages: "nl,pa"
    },
    {
        code: "AX",
        name: "Aland",
        native: "Åland",
        phone: 358,
        continent: "Europe",
        capital: "Mariehamn",
        currency: "EUR",
        languages: "sv"
    },
    {
        code: "AZ",
        name: "Azerbaijan",
        native: "Azərbaycan",
        phone: 994,
        continent: "Asia",
        capital: "Baku",
        currency: "AZN",
        languages: "az"
    },
    {
        code: "BA",
        name: "Bosnia and Herzegovina",
        native: "Bosna i Hercegovina",
        phone: 387,
        continent: "Europe",
        capital: "Sarajevo",
        currency: "BAM",
        languages: "bs,hr,sr"
    },
    {
        code: "BB",
        name: "Barbados",
        native: "Barbados",
        phone: 1246,
        continent: "North America",
        capital: "Bridgetown",
        currency: "BBD",
        languages: "en"
    },
    {
        code: "BD",
        name: "Bangladesh",
        native: "Bangladesh",
        phone: 880,
        continent: "Asia",
        capital: "Dhaka",
        currency: "BDT",
        languages: "bn"
    },
    {
        code: "BE",
        name: "Belgium",
        native: "België",
        phone: 32,
        continent: "Europe",
        capital: "Brussels",
        currency: "EUR",
        languages: "nl,fr,de"
    },
    {
        code: "BF",
        name: "Burkina Faso",
        native: "Burkina Faso",
        phone: 226,
        continent: "Africa",
        capital: "Ouagadougou",
        currency: "XOF",
        languages: "fr,ff"
    },
    {
        code: "BG",
        name: "Bulgaria",
        native: "България",
        phone: 359,
        continent: "Europe",
        capital: "Sofia",
        currency: "BGN",
        languages: "bg"
    },
    {
        code: "BH",
        name: "Bahrain",
        native: "‏البحرين",
        phone: 973,
        continent: "Asia",
        capital: "Manama",
        currency: "BHD",
        languages: "ar"
    },
    {
        code: "BI",
        name: "Burundi",
        native: "Burundi",
        phone: 257,
        continent: "Africa",
        capital: "Bujumbura",
        currency: "BIF",
        languages: "fr,rn"
    },
    {
        code: "BJ",
        name: "Benin",
        native: "Bénin",
        phone: 229,
        continent: "Africa",
        capital: "Porto-Novo",
        currency: "XOF",
        languages: "fr"
    },
    {
        code: "BL",
        name: "Saint Barthelemy",
        native: "Saint-Barthélemy",
        phone: 590,
        continent: "North America",
        capital: "Gustavia",
        currency: "EUR",
        languages: "fr"
    },
    {
        code: "BM",
        name: "Bermuda",
        native: "Bermuda",
        phone: 1441,
        continent: "North America",
        capital: "Hamilton",
        currency: "BMD",
        languages: "en"
    },
    {
        code: "BN",
        name: "Brunei",
        native: "Negara Brunei Darussalam",
        phone: 673,
        continent: "Asia",
        capital: "Bandar Seri Begawan",
        currency: "BND",
        languages: "ms"
    },
    {
        code: "BO",
        name: "Bolivia",
        native: "Bolivia",
        phone: 591,
        continent: "South America",
        capital: "Sucre",
        currency: "BOB,BOV",
        languages: "es,ay,qu"
    },
    {
        code: "BQ",
        name: "Bonaire",
        native: "Bonaire",
        phone: 5997,
        continent: "North America",
        capital: "Kralendijk",
        currency: "USD",
        languages: "nl"
    },
    {
        code: "BR",
        name: "Brazil",
        native: "Brasil",
        phone: 55,
        continent: "South America",
        capital: "Brasília",
        currency: "BRL",
        languages: "pt"
    },
    {
        code: "BS",
        name: "Bahamas",
        native: "Bahamas",
        phone: 1242,
        continent: "North America",
        capital: "Nassau",
        currency: "BSD",
        languages: "en"
    },
    {
        code: "BT",
        name: "Bhutan",
        native: "ʼbrug-yul",
        phone: 975,
        continent: "Asia",
        capital: "Thimphu",
        currency: "BTN,INR",
        languages: "dz"
    },
    {
        code: "BV",
        name: "Bouvet Island",
        native: "Bouvetøya",
        phone: 47,
        continent: "Antarctica",
        capital: "",
        currency: "NOK",
        languages: "no,nb,nn"
    },
    {
        code: "BW",
        name: "Botswana",
        native: "Botswana",
        phone: 267,
        continent: "Africa",
        capital: "Gaborone",
        currency: "BWP",
        languages: "en,tn"
    },
    {
        code: "BY",
        name: "Belarus",
        native: "Белару́сь",
        phone: 375,
        continent: "Europe",
        capital: "Minsk",
        currency: "BYN",
        languages: "be,ru"
    },
    {
        code: "BZ",
        name: "Belize",
        native: "Belize",
        phone: 501,
        continent: "North America",
        capital: "Belmopan",
        currency: "BZD",
        languages: "en,es"
    },
    {
        code: "CA",
        name: "Canada",
        native: "Canada",
        phone: 1,
        continent: "North America",
        capital: "Ottawa",
        currency: "CAD",
        languages: "en,fr"
    },
    {
        code: "CC",
        name: "Cocos (Keeling) Islands",
        native: "Cocos (Keeling) Islands",
        phone: 61,
        continent: "Asia",
        capital: "West Island",
        currency: "AUD",
        languages: "en"
    },
    {
        code: "CD",
        name: "Democratic Republic of the Congo",
        native: "République démocratique du Congo",
        phone: 243,
        continent: "Africa",
        capital: "Kinshasa",
        currency: "CDF",
        languages: "fr,ln,kg,sw,lu"
    },
    {
        code: "CF",
        name: "Central African Republic",
        native: "Ködörösêse tî Bêafrîka",
        phone: 236,
        continent: "Africa",
        capital: "Bangui",
        currency: "XAF",
        languages: "fr,sg"
    },
    {
        code: "CG",
        name: "Republic of the Congo",
        native: "République du Congo",
        phone: 242,
        continent: "Africa",
        capital: "Brazzaville",
        currency: "XAF",
        languages: "fr,ln"
    },
    {
        code: "CH",
        name: "Switzerland",
        native: "Schweiz",
        phone: 41,
        continent: "Europe",
        capital: "Bern",
        currency: "CHE,CHF,CHW",
        languages: "de,fr,it"
    },
    {
        code: "CI",
        name: "Ivory Coast",
        native: "Côte d'Ivoire",
        phone: 225,
        continent: "Africa",
        capital: "Yamoussoukro",
        currency: "XOF",
        languages: "fr"
    },
    {
        code: "CK",
        name: "Cook Islands",
        native: "Cook Islands",
        phone: 682,
        continent: "Oceania",
        capital: "Avarua",
        currency: "NZD",
        languages: "en"
    },
    {
        code: "CL",
        name: "Chile",
        native: "Chile",
        phone: 56,
        continent: "South America",
        capital: "Santiago",
        currency: "CLF,CLP",
        languages: "es"
    },
    {
        code: "CM",
        name: "Cameroon",
        native: "Cameroon",
        phone: 237,
        continent: "Africa",
        capital: "Yaoundé",
        currency: "XAF",
        languages: "en,fr"
    },
    {
        code: "CN",
        name: "China",
        native: "中国",
        phone: 86,
        continent: "Asia",
        capital: "Beijing",
        currency: "CNY",
        languages: "zh"
    },
    {
        code: "CO",
        name: "Colombia",
        native: "Colombia",
        phone: 57,
        continent: "South America",
        capital: "Bogotá",
        currency: "COP",
        languages: "es"
    },
    {
        code: "CR",
        name: "Costa Rica",
        native: "Costa Rica",
        phone: 506,
        continent: "North America",
        capital: "San José",
        currency: "CRC",
        languages: "es"
    },
    {
        code: "CU",
        name: "Cuba",
        native: "Cuba",
        phone: 53,
        continent: "North America",
        capital: "Havana",
        currency: "CUC,CUP",
        languages: "es"
    },
    {
        code: "CV",
        name: "Cape Verde",
        native: "Cabo Verde",
        phone: 238,
        continent: "Africa",
        capital: "Praia",
        currency: "CVE",
        languages: "pt"
    },
    {
        code: "CW",
        name: "Curacao",
        native: "Curaçao",
        phone: 5999,
        continent: "North America",
        capital: "Willemstad",
        currency: "ANG",
        languages: "nl,pa,en"
    },
    {
        code: "CX",
        name: "Christmas Island",
        native: "Christmas Island",
        phone: 61,
        continent: "Asia",
        capital: "Flying Fish Cove",
        currency: "AUD",
        languages: "en"
    },
    {
        code: "CY",
        name: "Cyprus",
        native: "Κύπρος",
        phone: 357,
        continent: "Europe",
        capital: "Nicosia",
        currency: "EUR",
        languages: "el,tr,hy"
    },
    {
        code: "CZ",
        name: "Czech Republic",
        native: "Česká republika",
        phone: 420,
        continent: "Europe",
        capital: "Prague",
        currency: "CZK",
        languages: "cs"
    },
    {
        code: "DE",
        name: "Germany",
        native: "Deutschland",
        phone: 49,
        continent: "Europe",
        capital: "Berlin",
        currency: "EUR",
        languages: "de"
    },
    {
        code: "DJ",
        name: "Djibouti",
        native: "Djibouti",
        phone: 253,
        continent: "Africa",
        capital: "Djibouti",
        currency: "DJF",
        languages: "fr,ar"
    },
    {
        code: "DK",
        name: "Denmark",
        native: "Danmark",
        phone: 45,
        continent: "Europe",
        capital: "Copenhagen",
        currency: "DKK",
        languages: "da"
    },
    {
        code: "DM",
        name: "Dominica",
        native: "Dominica",
        phone: 1767,
        continent: "North America",
        capital: "Roseau",
        currency: "XCD",
        languages: "en"
    },
    {
        code: "DO",
        name: "Dominican Republic",
        native: "República Dominicana",
        phone: "1809,1829,1849",
        continent: "North America",
        capital: "Santo Domingo",
        currency: "DOP",
        languages: "es"
    },
    {
        code: "DZ",
        name: "Algeria",
        native: "الجزائر",
        phone: 213,
        continent: "Africa",
        capital: "Algiers",
        currency: "DZD",
        languages: "ar"
    },
    {
        code: "EC",
        name: "Ecuador",
        native: "Ecuador",
        phone: 593,
        continent: "South America",
        capital: "Quito",
        currency: "USD",
        languages: "es"
    },
    {
        code: "EE",
        name: "Estonia",
        native: "Eesti",
        phone: 372,
        continent: "Europe",
        capital: "Tallinn",
        currency: "EUR",
        languages: "et"
    },
    {
        code: "EG",
        name: "Egypt",
        native: "مصر‎",
        phone: 20,
        continent: "Africa",
        capital: "Cairo",
        currency: "EGP",
        languages: "ar"
    },
    {
        code: "EH",
        name: "Western Sahara",
        native: "الصحراء الغربية",
        phone: 212,
        continent: "Africa",
        capital: "El Aaiún",
        currency: "MAD,DZD,MRU",
        languages: "es"
    },
    {
        code: "ER",
        name: "Eritrea",
        native: "ኤርትራ",
        phone: 291,
        continent: "Africa",
        capital: "Asmara",
        currency: "ERN",
        languages: "ti,ar,en"
    },
    {
        code: "ES",
        name: "Spain",
        native: "España",
        phone: 34,
        continent: "Europe",
        capital: "Madrid",
        currency: "EUR",
        languages: "es,eu,ca,gl,oc"
    },
    {
        code: "ET",
        name: "Ethiopia",
        native: "ኢትዮጵያ",
        phone: 251,
        continent: "Africa",
        capital: "Addis Ababa",
        currency: "ETB",
        languages: "am"
    },
    {
        code: "FI",
        name: "Finland",
        native: "Suomi",
        phone: 358,
        continent: "Europe",
        capital: "Helsinki",
        currency: "EUR",
        languages: "fi,sv"
    },
    {
        code: "FJ",
        name: "Fiji",
        native: "Fiji",
        phone: 679,
        continent: "Oceania",
        capital: "Suva",
        currency: "FJD",
        languages: "en,fj,hi,ur"
    },
    {
        code: "FK",
        name: "Falkland Islands",
        native: "Falkland Islands",
        phone: 500,
        continent: "South America",
        capital: "Stanley",
        currency: "FKP",
        languages: "en"
    },
    {
        code: "FM",
        name: "Micronesia",
        native: "Micronesia",
        phone: 691,
        continent: "Oceania",
        capital: "Palikir",
        currency: "USD",
        languages: "en"
    },
    {
        code: "FO",
        name: "Faroe Islands",
        native: "Føroyar",
        phone: 298,
        continent: "Europe",
        capital: "Tórshavn",
        currency: "DKK",
        languages: "fo"
    },
    {
        code: "FR",
        name: "France",
        native: "France",
        phone: 33,
        continent: "Europe",
        capital: "Paris",
        currency: "EUR",
        languages: "fr"
    },
    {
        code: "GA",
        name: "Gabon",
        native: "Gabon",
        phone: 241,
        continent: "Africa",
        capital: "Libreville",
        currency: "XAF",
        languages: "fr"
    },
    {
        code: "GB",
        name: "United Kingdom",
        native: "United Kingdom",
        phone: 44,
        continent: "Europe",
        capital: "London",
        currency: "GBP",
        languages: "en"
    },
    {
        code: "GD",
        name: "Grenada",
        native: "Grenada",
        phone: 1473,
        continent: "North America",
        capital: "St. George's",
        currency: "XCD",
        languages: "en"
    },
    {
        code: "GE",
        name: "Georgia",
        native: "საქართველო",
        phone: 995,
        continent: "Asia",
        capital: "Tbilisi",
        currency: "GEL",
        languages: "ka"
    },
    {
        code: "GF",
        name: "French Guiana",
        native: "Guyane française",
        phone: 594,
        continent: "South America",
        capital: "Cayenne",
        currency: "EUR",
        languages: "fr"
    },
    {
        code: "GG",
        name: "Guernsey",
        native: "Guernsey",
        phone: 44,
        continent: "Europe",
        capital: "St. Peter Port",
        currency: "GBP",
        languages: "en,fr"
    },
    {
        code: "GH",
        name: "Ghana",
        native: "Ghana",
        phone: 233,
        continent: "Africa",
        capital: "Accra",
        currency: "GHS",
        languages: "en"
    },
    {
        code: "GI",
        name: "Gibraltar",
        native: "Gibraltar",
        phone: 350,
        continent: "Europe",
        capital: "Gibraltar",
        currency: "GIP",
        languages: "en"
    },
    {
        code: "GL",
        name: "Greenland",
        native: "Kalaallit Nunaat",
        phone: 299,
        continent: "North America",
        capital: "Nuuk",
        currency: "DKK",
        languages: "kl"
    },
    {
        code: "GM",
        name: "Gambia",
        native: "Gambia",
        phone: 220,
        continent: "Africa",
        capital: "Banjul",
        currency: "GMD",
        languages: "en"
    },
    {
        code: "GN",
        name: "Guinea",
        native: "Guinée",
        phone: 224,
        continent: "Africa",
        capital: "Conakry",
        currency: "GNF",
        languages: "fr,ff"
    },
    {
        code: "GP",
        name: "Guadeloupe",
        native: "Guadeloupe",
        phone: 590,
        continent: "North America",
        capital: "Basse-Terre",
        currency: "EUR",
        languages: "fr"
    },
    {
        code: "GQ",
        name: "Equatorial Guinea",
        native: "Guinea Ecuatorial",
        phone: 240,
        continent: "Africa",
        capital: "Malabo",
        currency: "XAF",
        languages: "es,fr"
    },
    {
        code: "GR",
        name: "Greece",
        native: "Ελλάδα",
        phone: 30,
        continent: "Europe",
        capital: "Athens",
        currency: "EUR",
        languages: "el"
    },
    {
        code: "GS",
        name: "South Georgia and the South Sandwich Islands",
        native: "South Georgia",
        phone: 500,
        continent: "Antarctica",
        capital: "King Edward Point",
        currency: "GBP",
        languages: "en"
    },
    {
        code: "GT",
        name: "Guatemala",
        native: "Guatemala",
        phone: 502,
        continent: "North America",
        capital: "Guatemala City",
        currency: "GTQ",
        languages: "es"
    },
    {
        code: "GU",
        name: "Guam",
        native: "Guam",
        phone: 1671,
        continent: "Oceania",
        capital: "Hagåtña",
        currency: "USD",
        languages: "en,ch,es"
    },
    {
        code: "GW",
        name: "Guinea-Bissau",
        native: "Guiné-Bissau",
        phone: 245,
        continent: "Africa",
        capital: "Bissau",
        currency: "XOF",
        languages: "pt"
    },
    {
        code: "GY",
        name: "Guyana",
        native: "Guyana",
        phone: 592,
        continent: "South America",
        capital: "Georgetown",
        currency: "GYD",
        languages: "en"
    },
    {
        code: "HK",
        name: "Hong Kong",
        native: "香港",
        phone: 852,
        continent: "Asia",
        capital: "City of Victoria",
        currency: "HKD",
        languages: "zh,en"
    },
    {
        code: "HM",
        name: "Heard Island and McDonald Islands",
        native: "Heard Island and McDonald Islands",
        phone: 61,
        continent: "Antarctica",
        capital: "",
        currency: "AUD",
        languages: "en"
    },
    {
        code: "HN",
        name: "Honduras",
        native: "Honduras",
        phone: 504,
        continent: "North America",
        capital: "Tegucigalpa",
        currency: "HNL",
        languages: "es"
    },
    {
        code: "HR",
        name: "Croatia",
        native: "Hrvatska",
        phone: 385,
        continent: "Europe",
        capital: "Zagreb",
        currency: "EUR",
        languages: "hr"
    },
    {
        code: "HT",
        name: "Haiti",
        native: "Haïti",
        phone: 509,
        continent: "North America",
        capital: "Port-au-Prince",
        currency: "HTG,USD",
        languages: "fr,ht"
    },
    {
        code: "HU",
        name: "Hungary",
        native: "Magyarország",
        phone: 36,
        continent: "Europe",
        capital: "Budapest",
        currency: "HUF",
        languages: "hu"
    },
    {
        code: "ID",
        name: "Indonesia",
        native: "Indonesia",
        phone: 62,
        continent: "Asia",
        capital: "Jakarta",
        currency: "IDR",
        languages: "id"
    },
    {
        code: "IE",
        name: "Ireland",
        native: "Éire",
        phone: 353,
        continent: "Europe",
        capital: "Dublin",
        currency: "EUR",
        languages: "ga,en"
    },
    {
        code: "IL",
        name: "Israel",
        native: "יִשְׂרָאֵל",
        phone: 972,
        continent: "Asia",
        capital: "Jerusalem",
        currency: "ILS",
        languages: "he,ar"
    },
    {
        code: "IM",
        name: "Isle of Man",
        native: "Isle of Man",
        phone: 44,
        continent: "Europe",
        capital: "Douglas",
        currency: "GBP",
        languages: "en,gv"
    },
    {
        code: "IN",
        name: "India",
        native: "भारत",
        phone: 91,
        continent: "Asia",
        capital: "New Delhi",
        currency: "INR",
        languages: "hi,en"
    },
    {
        code: "IO",
        name: "British Indian Ocean Territory",
        native: "British Indian Ocean Territory",
        phone: 246,
        continent: "Asia",
        capital: "Diego Garcia",
        currency: "USD",
        languages: "en"
    },
    {
        code: "IQ",
        name: "Iraq",
        native: "العراق",
        phone: 964,
        continent: "Asia",
        capital: "Baghdad",
        currency: "IQD",
        languages: "ar,ku"
    },
    {
        code: "IR",
        name: "Iran",
        native: "ایران",
        phone: 98,
        continent: "Asia",
        capital: "Tehran",
        currency: "IRR",
        languages: "fa"
    },
    {
        code: "IS",
        name: "Iceland",
        native: "Ísland",
        phone: 354,
        continent: "Europe",
        capital: "Reykjavik",
        currency: "ISK",
        languages: "is"
    },
    {
        code: "IT",
        name: "Italy",
        native: "Italia",
        phone: 39,
        continent: "Europe",
        capital: "Rome",
        currency: "EUR",
        languages: "it"
    },
    {
        code: "JE",
        name: "Jersey",
        native: "Jersey",
        phone: 44,
        continent: "Europe",
        capital: "Saint Helier",
        currency: "GBP",
        languages: "en,fr"
    },
    {
        code: "JM",
        name: "Jamaica",
        native: "Jamaica",
        phone: 1876,
        continent: "North America",
        capital: "Kingston",
        currency: "JMD",
        languages: "en"
    },
    {
        code: "JO",
        name: "Jordan",
        native: "الأردن",
        phone: 962,
        continent: "Asia",
        capital: "Amman",
        currency: "JOD",
        languages: "ar"
    },
    {
        code: "JP",
        name: "Japan",
        native: "日本",
        phone: 81,
        continent: "Asia",
        capital: "Tokyo",
        currency: "JPY",
        languages: "ja"
    },
    {
        code: "KE",
        name: "Kenya",
        native: "Kenya",
        phone: 254,
        continent: "Africa",
        capital: "Nairobi",
        currency: "KES",
        languages: "en,sw"
    },
    {
        code: "KG",
        name: "Kyrgyzstan",
        native: "Кыргызстан",
        phone: 996,
        continent: "Asia",
        capital: "Bishkek",
        currency: "KGS",
        languages: "ky,ru"
    },
    {
        code: "KH",
        name: "Cambodia",
        native: "Kâmpŭchéa",
        phone: 855,
        continent: "Asia",
        capital: "Phnom Penh",
        currency: "KHR",
        languages: "km"
    },
    {
        code: "KI",
        name: "Kiribati",
        native: "Kiribati",
        phone: 686,
        continent: "Oceania",
        capital: "South Tarawa",
        currency: "AUD",
        languages: "en"
    },
    {
        code: "KM",
        name: "Comoros",
        native: "Komori",
        phone: 269,
        continent: "Africa",
        capital: "Moroni",
        currency: "KMF",
        languages: "ar,fr"
    },
    {
        code: "KN",
        name: "Saint Kitts and Nevis",
        native: "Saint Kitts and Nevis",
        phone: 1869,
        continent: "North America",
        capital: "Basseterre",
        currency: "XCD",
        languages: "en"
    },
    {
        code: "KP",
        name: "North Korea",
        native: "북한",
        phone: 850,
        continent: "Asia",
        capital: "Pyongyang",
        currency: "KPW",
        languages: "ko"
    },
    {
        code: "KR",
        name: "South Korea",
        native: "대한민국",
        phone: 82,
        continent: "Asia",
        capital: "Seoul",
        currency: "KRW",
        languages: "ko"
    },
    {
        code: "KW",
        name: "Kuwait",
        native: "الكويت",
        phone: 965,
        continent: "Asia",
        capital: "Kuwait City",
        currency: "KWD",
        languages: "ar"
    },
    {
        code: "KY",
        name: "Cayman Islands",
        native: "Cayman Islands",
        phone: 1345,
        continent: "North America",
        capital: "George Town",
        currency: "KYD",
        languages: "en"
    },
    {
        code: "KZ",
        name: "Kazakhstan",
        native: "Қазақстан",
        phone: "76,77",
        continent: "Asia",
        capital: "Astana",
        currency: "KZT",
        languages: "kk,ru"
    },
    {
        code: "LA",
        name: "Laos",
        native: "ສປປລາວ",
        phone: 856,
        continent: "Asia",
        capital: "Vientiane",
        currency: "LAK",
        languages: "lo"
    },
    {
        code: "LB",
        name: "Lebanon",
        native: "لبنان",
        phone: 961,
        continent: "Asia",
        capital: "Beirut",
        currency: "LBP",
        languages: "ar,fr"
    },
    {
        code: "LC",
        name: "Saint Lucia",
        native: "Saint Lucia",
        phone: 1758,
        continent: "North America",
        capital: "Castries",
        currency: "XCD",
        languages: "en"
    },
    {
        code: "LI",
        name: "Liechtenstein",
        native: "Liechtenstein",
        phone: 423,
        continent: "Europe",
        capital: "Vaduz",
        currency: "CHF",
        languages: "de"
    },
    {
        code: "LK",
        name: "Sri Lanka",
        native: "śrī laṃkāva",
        phone: 94,
        continent: "Asia",
        capital: "Colombo",
        currency: "LKR",
        languages: "si,ta"
    },
    {
        code: "LR",
        name: "Liberia",
        native: "Liberia",
        phone: 231,
        continent: "Africa",
        capital: "Monrovia",
        currency: "LRD",
        languages: "en"
    },
    {
        code: "LS",
        name: "Lesotho",
        native: "Lesotho",
        phone: 266,
        continent: "Africa",
        capital: "Maseru",
        currency: "LSL,ZAR",
        languages: "en,st"
    },
    {
        code: "LT",
        name: "Lithuania",
        native: "Lietuva",
        phone: 370,
        continent: "Europe",
        capital: "Vilnius",
        currency: "EUR",
        languages: "lt"
    },
    {
        code: "LU",
        name: "Luxembourg",
        native: "Luxembourg",
        phone: 352,
        continent: "Europe",
        capital: "Luxembourg",
        currency: "EUR",
        languages: "fr,de,lb"
    },
    {
        code: "LV",
        name: "Latvia",
        native: "Latvija",
        phone: 371,
        continent: "Europe",
        capital: "Riga",
        currency: "EUR",
        languages: "lv"
    },
    {
        code: "LY",
        name: "Libya",
        native: "‏ليبيا",
        phone: 218,
        continent: "Africa",
        capital: "Tripoli",
        currency: "LYD",
        languages: "ar"
    },
    {
        code: "MA",
        name: "Morocco",
        native: "المغرب",
        phone: 212,
        continent: "Africa",
        capital: "Rabat",
        currency: "MAD",
        languages: "ar"
    },
    {
        code: "MC",
        name: "Monaco",
        native: "Monaco",
        phone: 377,
        continent: "Europe",
        capital: "Monaco",
        currency: "EUR",
        languages: "fr"
    },
    {
        code: "MD",
        name: "Moldova",
        native: "Moldova",
        phone: 373,
        continent: "Europe",
        capital: "Chișinău",
        currency: "MDL",
        languages: "ro"
    },
    {
        code: "ME",
        name: "Montenegro",
        native: "Црна Гора",
        phone: 382,
        continent: "Europe",
        capital: "Podgorica",
        currency: "EUR",
        languages: "sr,bs,sq,hr"
    },
    {
        code: "MF",
        name: "Saint Martin",
        native: "Saint-Martin",
        phone: 590,
        continent: "North America",
        capital: "Marigot",
        currency: "EUR",
        languages: "en,fr,nl"
    },
    {
        code: "MG",
        name: "Madagascar",
        native: "Madagasikara",
        phone: 261,
        continent: "Africa",
        capital: "Antananarivo",
        currency: "MGA",
        languages: "fr,mg"
    },
    {
        code: "MH",
        name: "Marshall Islands",
        native: "M̧ajeļ",
        phone: 692,
        continent: "Oceania",
        capital: "Majuro",
        currency: "USD",
        languages: "en,mh"
    },
    {
        code: "MK",
        name: "North Macedonia",
        native: "Северна Македонија",
        phone: 389,
        continent: "Europe",
        capital: "Skopje",
        currency: "MKD",
        languages: "mk"
    },
    {
        code: "ML",
        name: "Mali",
        native: "Mali",
        phone: 223,
        continent: "Africa",
        capital: "Bamako",
        currency: "XOF",
        languages: "fr"
    },
    {
        code: "MM",
        name: "Myanmar (Burma)",
        native: "မြန်မာ",
        phone: 95,
        continent: "Asia",
        capital: "Naypyidaw",
        currency: "MMK",
        languages: "my"
    },
    {
        code: "MN",
        name: "Mongolia",
        native: "Монгол улс",
        phone: 976,
        continent: "Asia",
        capital: "Ulan Bator",
        currency: "MNT",
        languages: "mn"
    },
    {
        code: "MO",
        name: "Macao",
        native: "澳門",
        phone: 853,
        continent: "Asia",
        capital: "",
        currency: "MOP",
        languages: "zh,pt"
    },
    {
        code: "MP",
        name: "Northern Mariana Islands",
        native: "Northern Mariana Islands",
        phone: 1670,
        continent: "Oceania",
        capital: "Saipan",
        currency: "USD",
        languages: "en,ch"
    },
    {
        code: "MQ",
        name: "Martinique",
        native: "Martinique",
        phone: 596,
        continent: "North America",
        capital: "Fort-de-France",
        currency: "EUR",
        languages: "fr"
    },
    {
        code: "MR",
        name: "Mauritania",
        native: "موريتانيا",
        phone: 222,
        continent: "Africa",
        capital: "Nouakchott",
        currency: "MRU",
        languages: "ar"
    },
    {
        code: "MS",
        name: "Montserrat",
        native: "Montserrat",
        phone: 1664,
        continent: "North America",
        capital: "Plymouth",
        currency: "XCD",
        languages: "en"
    },
    {
        code: "MT",
        name: "Malta",
        native: "Malta",
        phone: 356,
        continent: "Europe",
        capital: "Valletta",
        currency: "EUR",
        languages: "mt,en"
    },
    {
        code: "MU",
        name: "Mauritius",
        native: "Maurice",
        phone: 230,
        continent: "Africa",
        capital: "Port Louis",
        currency: "MUR",
        languages: "en"
    },
    {
        code: "MV",
        name: "Maldives",
        native: "Maldives",
        phone: 960,
        continent: "Asia",
        capital: "Malé",
        currency: "MVR",
        languages: "dv"
    },
    {
        code: "MW",
        name: "Malawi",
        native: "Malawi",
        phone: 265,
        continent: "Africa",
        capital: "Lilongwe",
        currency: "MWK",
        languages: "en,ny"
    },
    {
        code: "MX",
        name: "Mexico",
        native: "México",
        phone: 52,
        continent: "North America",
        capital: "Mexico City",
        currency: "MXN",
        languages: "es"
    },
    {
        code: "MY",
        name: "Malaysia",
        native: "Malaysia",
        phone: 60,
        continent: "Asia",
        capital: "Kuala Lumpur",
        currency: "MYR",
        languages: "ms"
    },
    {
        code: "MZ",
        name: "Mozambique",
        native: "Moçambique",
        phone: 258,
        continent: "Africa",
        capital: "Maputo",
        currency: "MZN",
        languages: "pt"
    },
    {
        code: "NA",
        name: "Namibia",
        native: "Namibia",
        phone: 264,
        continent: "Africa",
        capital: "Windhoek",
        currency: "NAD,ZAR",
        languages: "en,af"
    },
    {
        code: "NC",
        name: "New Caledonia",
        native: "Nouvelle-Calédonie",
        phone: 687,
        continent: "Oceania",
        capital: "Nouméa",
        currency: "XPF",
        languages: "fr"
    },
    {
        code: "NE",
        name: "Niger",
        native: "Niger",
        phone: 227,
        continent: "Africa",
        capital: "Niamey",
        currency: "XOF",
        languages: "fr"
    },
    {
        code: "NF",
        name: "Norfolk Island",
        native: "Norfolk Island",
        phone: 672,
        continent: "Oceania",
        capital: "Kingston",
        currency: "AUD",
        languages: "en"
    },
    {
        code: "NG",
        name: "Nigeria",
        native: "Nigeria",
        phone: 234,
        continent: "Africa",
        capital: "Abuja",
        currency: "NGN",
        languages: "en"
    },
    {
        code: "NI",
        name: "Nicaragua",
        native: "Nicaragua",
        phone: 505,
        continent: "North America",
        capital: "Managua",
        currency: "NIO",
        languages: "es"
    },
    {
        code: "NL",
        name: "Netherlands",
        native: "Nederland",
        phone: 31,
        continent: "Europe",
        capital: "Amsterdam",
        currency: "EUR",
        languages: "nl"
    },
    {
        code: "NO",
        name: "Norway",
        native: "Norge",
        phone: 47,
        continent: "Europe",
        capital: "Oslo",
        currency: "NOK",
        languages: "no,nb,nn"
    },
    {
        code: "NP",
        name: "Nepal",
        native: "नेपाल",
        phone: 977,
        continent: "Asia",
        capital: "Kathmandu",
        currency: "NPR",
        languages: "ne"
    },
    {
        code: "NR",
        name: "Nauru",
        native: "Nauru",
        phone: 674,
        continent: "Oceania",
        capital: "Yaren",
        currency: "AUD",
        languages: "en,na"
    },
    {
        code: "NU",
        name: "Niue",
        native: "Niuē",
        phone: 683,
        continent: "Oceania",
        capital: "Alofi",
        currency: "NZD",
        languages: "en"
    },
    {
        code: "NZ",
        name: "New Zealand",
        native: "New Zealand",
        phone: 64,
        continent: "Oceania",
        capital: "Wellington",
        currency: "NZD",
        languages: "en,mi"
    },
    {
        code: "OM",
        name: "Oman",
        native: "عمان",
        phone: 968,
        continent: "Asia",
        capital: "Muscat",
        currency: "OMR",
        languages: "ar"
    },
    {
        code: "PA",
        name: "Panama",
        native: "Panamá",
        phone: 507,
        continent: "North America",
        capital: "Panama City",
        currency: "PAB,USD",
        languages: "es"
    },
    {
        code: "PE",
        name: "Peru",
        native: "Perú",
        phone: 51,
        continent: "South America",
        capital: "Lima",
        currency: "PEN",
        languages: "es"
    },
    {
        code: "PF",
        name: "French Polynesia",
        native: "Polynésie française",
        phone: 689,
        continent: "Oceania",
        capital: "Papeetē",
        currency: "XPF",
        languages: "fr"
    },
    {
        code: "PG",
        name: "Papua New Guinea",
        native: "Papua Niugini",
        phone: 675,
        continent: "Oceania",
        capital: "Port Moresby",
        currency: "PGK",
        languages: "en"
    },
    {
        code: "PH",
        name: "Philippines",
        native: "Pilipinas",
        phone: 63,
        continent: "Asia",
        capital: "Manila",
        currency: "PHP",
        languages: "en"
    },
    {
        code: "PK",
        name: "Pakistan",
        native: "Pakistan",
        phone: 92,
        continent: "Asia",
        capital: "Islamabad",
        currency: "PKR",
        languages: "en,ur"
    },
    {
        code: "PL",
        name: "Poland",
        native: "Polska",
        phone: 48,
        continent: "Europe",
        capital: "Warsaw",
        currency: "PLN",
        languages: "pl"
    },
    {
        code: "PM",
        name: "Saint Pierre and Miquelon",
        native: "Saint-Pierre-et-Miquelon",
        phone: 508,
        continent: "North America",
        capital: "Saint-Pierre",
        currency: "EUR",
        languages: "fr"
    },
    {
        code: "PN",
        name: "Pitcairn Islands",
        native: "Pitcairn Islands",
        phone: 64,
        continent: "Oceania",
        capital: "Adamstown",
        currency: "NZD",
        languages: "en"
    },
    {
        code: "PR",
        name: "Puerto Rico",
        native: "Puerto Rico",
        phone: "1787,1939",
        continent: "North America",
        capital: "San Juan",
        currency: "USD",
        languages: "es,en"
    },
    {
        code: "PS",
        name: "Palestine",
        native: "فلسطين",
        phone: 970,
        continent: "Asia",
        capital: "Ramallah",
        currency: "ILS",
        languages: "ar"
    },
    {
        code: "PT",
        name: "Portugal",
        native: "Portugal",
        phone: 351,
        continent: "Europe",
        capital: "Lisbon",
        currency: "EUR",
        languages: "pt"
    },
    {
        code: "PW",
        name: "Palau",
        native: "Palau",
        phone: 680,
        continent: "Oceania",
        capital: "Ngerulmud",
        currency: "USD",
        languages: "en"
    },
    {
        code: "PY",
        name: "Paraguay",
        native: "Paraguay",
        phone: 595,
        continent: "South America",
        capital: "Asunción",
        currency: "PYG",
        languages: "es,gn"
    },
    {
        code: "QA",
        name: "Qatar",
        native: "قطر",
        phone: 974,
        continent: "Asia",
        capital: "Doha",
        currency: "QAR",
        languages: "ar"
    },
    {
        code: "RE",
        name: "Reunion",
        native: "La Réunion",
        phone: 262,
        continent: "Africa",
        capital: "Saint-Denis",
        currency: "EUR",
        languages: "fr"
    },
    {
        code: "RO",
        name: "Romania",
        native: "România",
        phone: 40,
        continent: "Europe",
        capital: "Bucharest",
        currency: "RON",
        languages: "ro"
    },
    {
        code: "RS",
        name: "Serbia",
        native: "Србија",
        phone: 381,
        continent: "Europe",
        capital: "Belgrade",
        currency: "RSD",
        languages: "sr"
    },
    {
        code: "RU",
        name: "Russia",
        native: "Россия",
        phone: 7,
        continent: "Asia",
        capital: "Moscow",
        currency: "RUB",
        languages: "ru"
    },
    {
        code: "RW",
        name: "Rwanda",
        native: "Rwanda",
        phone: 250,
        continent: "Africa",
        capital: "Kigali",
        currency: "RWF",
        languages: "rw,en,fr"
    },
    {
        code: "SA",
        name: "Saudi Arabia",
        native: "العربية السعودية",
        phone: 966,
        continent: "Asia",
        capital: "Riyadh",
        currency: "SAR",
        languages: "ar"
    },
    {
        code: "SB",
        name: "Solomon Islands",
        native: "Solomon Islands",
        phone: 677,
        continent: "Oceania",
        capital: "Honiara",
        currency: "SBD",
        languages: "en"
    },
    {
        code: "SC",
        name: "Seychelles",
        native: "Seychelles",
        phone: 248,
        continent: "Africa",
        capital: "Victoria",
        currency: "SCR",
        languages: "fr,en"
    },
    {
        code: "SD",
        name: "Sudan",
        native: "السودان",
        phone: 249,
        continent: "Africa",
        capital: "Khartoum",
        currency: "SDG",
        languages: "ar,en"
    },
    {
        code: "SE",
        name: "Sweden",
        native: "Sverige",
        phone: 46,
        continent: "Europe",
        capital: "Stockholm",
        currency: "SEK",
        languages: "sv"
    },
    {
        code: "SG",
        name: "Singapore",
        native: "Singapore",
        phone: 65,
        continent: "Asia",
        capital: "Singapore",
        currency: "SGD",
        languages: "en,ms,ta,zh"
    },
    {
        code: "SH",
        name: "Saint Helena",
        native: "Saint Helena",
        phone: 290,
        continent: "Africa",
        capital: "Jamestown",
        currency: "SHP",
        languages: "en"
    },
    {
        code: "SI",
        name: "Slovenia",
        native: "Slovenija",
        phone: 386,
        continent: "Europe",
        capital: "Ljubljana",
        currency: "EUR",
        languages: "sl"
    },
    {
        code: "SJ",
        name: "Svalbard and Jan Mayen",
        native: "Svalbard og Jan Mayen",
        phone: 4779,
        continent: "Europe",
        capital: "Longyearbyen",
        currency: "NOK",
        languages: "no"
    },
    {
        code: "SK",
        name: "Slovakia",
        native: "Slovensko",
        phone: 421,
        continent: "Europe",
        capital: "Bratislava",
        currency: "EUR",
        languages: "sk"
    },
    {
        code: "SL",
        name: "Sierra Leone",
        native: "Sierra Leone",
        phone: 232,
        continent: "Africa",
        capital: "Freetown",
        currency: "SLL",
        languages: "en"
    },
    {
        code: "SM",
        name: "San Marino",
        native: "San Marino",
        phone: 378,
        continent: "Europe",
        capital: "City of San Marino",
        currency: "EUR",
        languages: "it"
    },
    {
        code: "SN",
        name: "Senegal",
        native: "Sénégal",
        phone: 221,
        continent: "Africa",
        capital: "Dakar",
        currency: "XOF",
        languages: "fr"
    },
    {
        code: "SO",
        name: "Somalia",
        native: "Soomaaliya",
        phone: 252,
        continent: "Africa",
        capital: "Mogadishu",
        currency: "SOS",
        languages: "so,ar"
    },
    {
        code: "SR",
        name: "Suriname",
        native: "Suriname",
        phone: 597,
        continent: "South America",
        capital: "Paramaribo",
        currency: "SRD",
        languages: "nl"
    },
    {
        code: "SS",
        name: "South Sudan",
        native: "South Sudan",
        phone: 211,
        continent: "Africa",
        capital: "Juba",
        currency: "SSP",
        languages: "en"
    },
    {
        code: "ST",
        name: "Sao Tome and Principe",
        native: "São Tomé e Príncipe",
        phone: 239,
        continent: "Africa",
        capital: "São Tomé",
        currency: "STN",
        languages: "pt"
    },
    {
        code: "SV",
        name: "El Salvador",
        native: "El Salvador",
        phone: 503,
        continent: "North America",
        capital: "San Salvador",
        currency: "SVC,USD",
        languages: "es"
    },
    {
        code: "SX",
        name: "Sint Maarten",
        native: "Sint Maarten",
        phone: 1721,
        continent: "North America",
        capital: "Philipsburg",
        currency: "ANG",
        languages: "nl,en"
    },
    {
        code: "SY",
        name: "Syria",
        native: "سوريا",
        phone: 963,
        continent: "Asia",
        capital: "Damascus",
        currency: "SYP",
        languages: "ar"
    },
    {
        code: "SZ",
        name: "Eswatini",
        native: "Eswatini",
        phone: 268,
        continent: "Africa",
        capital: "Lobamba",
        currency: "SZL",
        languages: "en,ss"
    },
    {
        code: "TC",
        name: "Turks and Caicos Islands",
        native: "Turks and Caicos Islands",
        phone: 1649,
        continent: "North America",
        capital: "Cockburn Town",
        currency: "USD",
        languages: "en"
    },
    {
        code: "TD",
        name: "Chad",
        native: "Tchad",
        phone: 235,
        continent: "Africa",
        capital: "N'Djamena",
        currency: "XAF",
        languages: "fr,ar"
    },
    {
        code: "TF",
        name: "French Southern Territories",
        native: "Territoire des Terres australes et antarctiques fr",
        phone: 262,
        continent: "Antarctica",
        capital: "Port-aux-Français",
        currency: "EUR",
        languages: "fr"
    },
    {
        code: "TG",
        name: "Togo",
        native: "Togo",
        phone: 228,
        continent: "Africa",
        capital: "Lomé",
        currency: "XOF",
        languages: "fr"
    },
    {
        code: "TH",
        name: "Thailand",
        native: "ประเทศไทย",
        phone: 66,
        continent: "Asia",
        capital: "Bangkok",
        currency: "THB",
        languages: "th"
    },
    {
        code: "TJ",
        name: "Tajikistan",
        native: "Тоҷикистон",
        phone: 992,
        continent: "Asia",
        capital: "Dushanbe",
        currency: "TJS",
        languages: "tg,ru"
    },
    {
        code: "TK",
        name: "Tokelau",
        native: "Tokelau",
        phone: 690,
        continent: "Oceania",
        capital: "Fakaofo",
        currency: "NZD",
        languages: "en"
    },
    {
        code: "TL",
        name: "East Timor",
        native: "Timor-Leste",
        phone: 670,
        continent: "Oceania",
        capital: "Dili",
        currency: "USD",
        languages: "pt"
    },
    {
        code: "TM",
        name: "Turkmenistan",
        native: "Türkmenistan",
        phone: 993,
        continent: "Asia",
        capital: "Ashgabat",
        currency: "TMT",
        languages: "tk,ru"
    },
    {
        code: "TN",
        name: "Tunisia",
        native: "تونس",
        phone: 216,
        continent: "Africa",
        capital: "Tunis",
        currency: "TND",
        languages: "ar"
    },
    {
        code: "TO",
        name: "Tonga",
        native: "Tonga",
        phone: 676,
        continent: "Oceania",
        capital: "Nuku'alofa",
        currency: "TOP",
        languages: "en,to"
    },
    {
        code: "TR",
        name: "Turkey",
        native: "Türkiye",
        phone: 90,
        continent: "Asia",
        capital: "Ankara",
        currency: "TRY",
        languages: "tr"
    },
    {
        code: "TT",
        name: "Trinidad and Tobago",
        native: "Trinidad and Tobago",
        phone: 1868,
        continent: "North America",
        capital: "Port of Spain",
        currency: "TTD",
        languages: "en"
    },
    {
        code: "TV",
        name: "Tuvalu",
        native: "Tuvalu",
        phone: 688,
        continent: "Oceania",
        capital: "Funafuti",
        currency: "AUD",
        languages: "en"
    },
    {
        code: "TW",
        name: "Taiwan",
        native: "臺灣",
        phone: 886,
        continent: "Asia",
        capital: "Taipei",
        currency: "TWD",
        languages: "zh"
    },
    {
        code: "TZ",
        name: "Tanzania",
        native: "Tanzania",
        phone: 255,
        continent: "Africa",
        capital: "Dodoma",
        currency: "TZS",
        languages: "sw,en"
    },
    {
        code: "UA",
        name: "Ukraine",
        native: "Україна",
        phone: 380,
        continent: "Europe",
        capital: "Kyiv",
        currency: "UAH",
        languages: "uk"
    },
    {
        code: "UG",
        name: "Uganda",
        native: "Uganda",
        phone: 256,
        continent: "Africa",
        capital: "Kampala",
        currency: "UGX",
        languages: "en,sw"
    },
    {
        code: "UM",
        name: "U.S. Minor Outlying Islands",
        native: "United States Minor Outlying Islands",
        phone: 1,
        continent: "Oceania",
        capital: "",
        currency: "USD",
        languages: "en"
    },
    {
        code: "US",
        name: "United States",
        native: "United States",
        phone: 1,
        continent: "North America",
        capital: "Washington D.C.",
        currency: "USD,USN,USS",
        languages: "en"
    },
    {
        code: "UY",
        name: "Uruguay",
        native: "Uruguay",
        phone: 598,
        continent: "South America",
        capital: "Montevideo",
        currency: "UYI,UYU",
        languages: "es"
    },
    {
        code: "UZ",
        name: "Uzbekistan",
        native: "O'zbekiston",
        phone: 998,
        continent: "Asia",
        capital: "Tashkent",
        currency: "UZS",
        languages: "uz,ru"
    },
    {
        code: "VA",
        name: "Vatican City",
        native: "Vaticano",
        phone: 379,
        continent: "Europe",
        capital: "Vatican City",
        currency: "EUR",
        languages: "it,la"
    },
    {
        code: "VC",
        name: "Saint Vincent and the Grenadines",
        native: "Saint Vincent and the Grenadines",
        phone: 1784,
        continent: "North America",
        capital: "Kingstown",
        currency: "XCD",
        languages: "en"
    },
    {
        code: "VE",
        name: "Venezuela",
        native: "Venezuela",
        phone: 58,
        continent: "South America",
        capital: "Caracas",
        currency: "VES",
        languages: "es"
    },
    {
        code: "VG",
        name: "British Virgin Islands",
        native: "British Virgin Islands",
        phone: 1284,
        continent: "North America",
        capital: "Road Town",
        currency: "USD",
        languages: "en"
    },
    {
        code: "VI",
        name: "U.S. Virgin Islands",
        native: "United States Virgin Islands",
        phone: 1340,
        continent: "North America",
        capital: "Charlotte Amalie",
        currency: "USD",
        languages: "en"
    },
    {
        code: "VN",
        name: "Vietnam",
        native: "Việt Nam",
        phone: 84,
        continent: "Asia",
        capital: "Hanoi",
        currency: "VND",
        languages: "vi"
    },
    {
        code: "VU",
        name: "Vanuatu",
        native: "Vanuatu",
        phone: 678,
        continent: "Oceania",
        capital: "Port Vila",
        currency: "VUV",
        languages: "bi,en,fr"
    },
    {
        code: "WF",
        name: "Wallis and Futuna",
        native: "Wallis et Futuna",
        phone: 681,
        continent: "Oceania",
        capital: "Mata-Utu",
        currency: "XPF",
        languages: "fr"
    },
    {
        code: "WS",
        name: "Samoa",
        native: "Samoa",
        phone: 685,
        continent: "Oceania",
        capital: "Apia",
        currency: "WST",
        languages: "sm,en"
    },
    {
        code: "XK",
        name: "Kosovo",
        native: "Republika e Kosovës",
        phone: "377,381,383,386",
        continent: "Europe",
        capital: "Pristina",
        currency: "EUR",
        languages: "sq,sr"
    },
    {
        code: "YE",
        name: "Yemen",
        native: "اليَمَن",
        phone: 967,
        continent: "Asia",
        capital: "Sana'a",
        currency: "YER",
        languages: "ar"
    },
    {
        code: "YT",
        name: "Mayotte",
        native: "Mayotte",
        phone: 262,
        continent: "Africa",
        capital: "Mamoudzou",
        currency: "EUR",
        languages: "fr"
    },
    {
        code: "ZA",
        name: "South Africa",
        native: "South Africa",
        phone: 27,
        continent: "Africa",
        capital: "Pretoria",
        currency: "ZAR",
        languages: "af,en,nr,st,ss,tn,ts,ve,xh,zu"
    },
    {
        code: "ZM",
        name: "Zambia",
        native: "Zambia",
        phone: 260,
        continent: "Africa",
        capital: "Lusaka",
        currency: "ZMW",
        languages: "en"
    },
    {
        code: "ZW",
        name: "Zimbabwe",
        native: "Zimbabwe",
        phone: 263,
        continent: "Africa",
        capital: "Harare",
        currency: "USD,ZAR,BWP,GBP,AUD,CNY,INR,JPY",
        languages: "en,sn,nd"
    }
]


export const languages: ILanguage[] = [
    {name: 'Afrikaans', code: 'af'},
    {name: 'Irish', code: 'ga'},
    {name: 'Albanian', code: 'sq'},
    {name: 'Italian', code: 'it'},
    {name: 'Arabic', code: 'ar'},
    {name: 'Japanese', code: 'ja'},
    {name: 'Azerbaijani', code: 'az'},
    {name: 'Kannada', code: 'kn'},
    {name: 'Basque', code: 'eu'},
    {name: 'Korean', code: 'ko'},
    {name: 'Bengali', code: 'bn'},
    {name: 'Latin', code: 'la'},
    {name: 'Belarusian', code: 'be'},
    {name: 'Latvian', code: 'lv'},
    {name: 'Bulgarian', code: 'bg'},
    {name: 'Lithuanian', code: 'lt'},
    {name: 'Catalan', code: 'ca'},
    {name: 'Macedonian', code: 'mk'},
    {name: 'Chinese Simplified', code: 'zh-CN'},
    {name: 'Malay', code: 'ms'},
    {name: 'Chinese Traditional', code: 'zh-TW'},
    {name: 'Maltese', code: 'mt'},
    {name: 'Croatian', code: 'hr'},
    {name: 'Norwegian', code: 'no'},
    {name: 'Czech', code: 'cs'},
    {name: 'Persian', code: 'fa'},
    {name: 'Danish', code: 'da'},
    {name: 'Polish', code: 'pl'},
    {name: 'Dutch', code: 'nl'},
    {name: 'Portuguese', code: 'pt'},
    {name: 'English', code: 'en'},
    {name: 'Romanian', code: 'ro'},
    {name: 'Esperanto', code: 'eo'},
    {name: 'Russian', code: 'ru'},
    {name: 'Estonian', code: 'et'},
    {name: 'Serbian', code: 'sr'},
    {name: 'Filipino', code: 'tl'},
    {name: 'Slovak', code: 'sk'},
    {name: 'Finnish', code: 'fi'},
    {name: 'Slovenian', code: 'sl'},
    {name: 'French', code: 'fr'},
    {name: 'Spanish', code: 'es'},
    {name: 'Galician', code: 'gl'},
    {name: 'Swahili', code: 'sw'},
    {name: 'Georgian', code: 'ka'},
    {name: 'Swedish', code: 'sv'},
    {name: 'German', code: 'de'},
    {name: 'Tamil', code: 'ta'},
    {name: 'Greek', code: 'el'},
    {name: 'Telugu', code: 'te'},
    {name: 'Gujarati', code: 'gu'},
    {name: 'Thai', code: 'th'},
    {name: 'Haitian Creole', code: 'ht'},
    {name: 'Turkish', code: 'tr'},
    {name: 'Hebrew', code: 'iw'},
    {name: 'Ukrainian', code: 'uk'},
    {name: 'Hindi', code: 'hi'},
    {name: 'Urdu', code: 'ur'},
    {name: 'Hungarian', code: 'hu'},
    {name: 'Vietnamese', code: 'vi'},
    {name: 'Icelandic', code: 'is'},
    {name: 'Welsh', code: 'cy'},
    {name: 'Indonesian', code: 'id'},
    {name: 'Yiddish', code: 'yi'}
];

// const getCountryByLanguage = (language: ILanguage): ICountry => {
//     let code = language.code.toUpperCase()
//     if (code.indexOf("-") > -1) {
//         console.log(code, code.split("-")[0])
//         code = code.split("-")[0]
//     }
//     return countries[code]
// }

const finalResult: { country: any; name: string; code: string; }[] = []

languages.forEach(l => {
    const res: any[] = []

    countries.forEach(e => {
        //
        if (e.languages.includes(l.code)) {
            res.push(e)
        }
    })
    countries2.forEach(e => {
        if (e.languages.includes(l.name)) {
            res.push(e)
        }
    })

    // getCountryByLanguage(l)
    // if (res.length === 0)

    if (res) {
        const country = res[0]?.name || res[0]?.country
        finalResult.push({...l, country: country || ""})

    }

})
fs.writeFile('./ssss.txt', JSON.stringify(finalResult), (err: any) => {
    if (err) {
        console.error(err);
    }
    // file written successfully
});

// https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-languages.json
// https://github.com/annexare/Countries/tree/main/dist
