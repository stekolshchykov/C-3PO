import React, {useState} from "react"
import {availableLang, reverso} from "../../reverso";
import Input from "../../UI/Input";
import Btn from "../../UI/Btn";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

interface IVerbForms {
    id: number
    conjugation: string
    verbs: string[]
}

const Conjugation = () => {

    const [text, setText] = useState("идти")
    const [lang, setLang] = useState("russian")
    const [conjugations, setConjugations] = useState<IVerbForms[]>([])
    const [selectMode, setSelectMode] = useState<boolean>(false)

    const getConjugationsHandler = async () => {
        try {
            const response: { verbForms: IVerbForms[], status?: any } = await reverso.getConjugation(text, lang);
            if (response.status === 404) {
                console.error('Error: Reverso API returned 404');
                setConjugations([])
            } else {
                const verbForms = response.verbForms
                if (verbForms) {
                    setConjugations(verbForms)
                }
            }
        } catch (e) {
            console.error(e);
            setConjugations([]);
        }
    };

    return <div className={"px-2 pt-4"}>
        <div className={"flex items-center gap-2"}>
            <Input placeholder={"Enter word"} width={100} onChange={e => setText(e)}
                   onEnter={() => getConjugationsHandler()}/>
            <div className={"w-[15px]"}></div>
            <Btn type={"normal"} size={1} clickHandler={() => setSelectMode(!selectMode)}>
                <div className={"capitalize"}>{lang}</div>
                <FontAwesomeIcon icon={faCaretDown}/>
            </Btn>
            <Btn type={"normal"} size={1} clickHandler={() => getConjugationsHandler()}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </Btn>
        </div>
        <div className={"my-3 h-[395px] overflow-auto relative"}>
            {selectMode === false && <ul>
                {conjugations.map((e, i) => {
                    return <li key={i} className={"grid grid-cols-1 mb-2"}>
                        <div className={"border-l-4 border-grayDark pl-3"}>
                            {e.conjugation}
                            <div>
                                Verbs: {e.verbs.map(ee => {
                                return <>
                                    <span key={i}>{ee}{e?.verbs?.length > i + 1 && ", "}</span>
                                </>
                            })}
                            </div>
                        </div>
                    </li>
                })}
            </ul>}
            {selectMode &&
                <ul className={"pt-3 absolute top-0 left-0 bg-grayDark w-full h-full m-0 p-0 grid grid-cols-[1fr_1fr_1fr_1fr_1fr] auto-rows-min gap-3 "}>
                    {availableLang.conjugation.map((e, i) => {
                        return <li key={i} className={"text-center flex h-[35.5px] justify-center"}>
                            <Btn type={"normal"} size={1} clickHandler={() => {
                                setLang(e)
                                setSelectMode(false)
                            }}>
                                <div className={"capitalize"}>{e}</div>
                            </Btn>
                        </li>
                    })}
                </ul>}
        </div>
    </div>

}

export default Conjugation
