import React, {useState} from "react"
import Textarea from "../../UI/Textarea";
import Btn from "../../UI/Btn";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {reverso} from "../../reverso";

interface ICorrection {
    explanation?: string,
    corrected?: string
    suggestions: {
        text: string
        definition: string
        category: string
    }[]

}

const SpellCheck = () => {

    const [text, setText] = useState<string>("")
    const [corrections, setCorrections] = useState<ICorrection[]>([])
    const [lang, setLang] = useState("english")

    const spellCheckHandler = async () => {
        try {
            const response = await reverso.getSpellCheck(text, lang);
            if (response.status === 404) {
                console.error('Error: Reverso API returned 404');
                setCorrections([])
            } else {
                const corrections: ICorrection[] = response?.corrections
                if (corrections) {
                    corrections.forEach(e => {
                        console.log(e.suggestions)

                    })
                    setCorrections(corrections)
                }
            }
        } catch (e) {
            console.error(e);
            setCorrections([]);
        }
    };

    return <div className={"px-2 pt-4"}>

        <div className={"flex-row items-center gap-2"}>

            <Textarea rows={4} placeholder={"Enter expression"} onChange={(e) => setText(e)}/>

            <div className={"flex gap-2 justify-end pt-3"}>
                <Btn type={"normal"}>Russian <FontAwesomeIcon icon={faCaretDown}/></Btn>
                <Btn type={"normal"} clickHandler={spellCheckHandler}>Check</Btn>
            </div>

            <div className={"text-lg pt-3"}>Corrections({corrections.length}):</div>

            <ul className={"pt-3 pb-2 grid grid-cols-1 gap-2 h-[275px] overflow-auto"}>
                {corrections.map((e, i) =>
                    <li key={i} className={"px-3 py-3 border-l-4 border-grayDark cursor-pointer"}>
                        {e.explanation}: {e.corrected}
                        <div>Suggestions: {e?.suggestions?.map(((ee, i) =>
                                <span key={i + ee.text}>{ee.text}{e?.suggestions?.length > i + 1 && ", "} </span>
                        ))}</div>
                    </li>
                )}
            </ul>

        </div>
    </div>
}

export default SpellCheck
