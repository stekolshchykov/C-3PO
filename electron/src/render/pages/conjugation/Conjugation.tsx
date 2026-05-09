import React, {useState} from "react"
import {availableLang, reverso} from "../../reverso";
import Input from "../../UI/Input";
import Btn from "../../UI/Btn";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useRootStore} from "../../providers/RootStoreProvider";
import {observer} from "mobx-react-lite";

interface IVerbForms {
    id: number
    conjugation: string
    verbs: string[]
}

const Conjugation = observer(() => {

    const store = useRootStore();

    const [text, setText] = useState("")
    const [lang, setLang] = useState("english")
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
                    if (store.config?.tabs.conjugation.autofillOut)
                        navigator.clipboard.writeText(verbForms.join(", "))
                }
            }
        } catch (e) {
            console.error(e);
            setConjugations([]);
        }
    };

    return <div className={"px-2 pt-4 h-full overflow-hidden grid grid-rows-[min-content_1fr]"}>
        <div className={"flex items-center gap-2"}>
            <Input
                isAutoFocus={true}
                isDefaultTextFromClipboard={store.config?.tabs.conjugation.autofill}
                placeholder={"Enter word"}
                width={100}
                onChange={e => setText(e)}
                onEnter={() => getConjugationsHandler()}/>
            <div className={"w-[15px]"}></div>
            <Btn type={"normal"} size={1} clickHandler={() => setSelectMode(!selectMode)} addedArrow={!selectMode}>
                <div className={"capitalize"}>{lang}</div>
                {/*<FontAwesomeIcon icon={faCaretDown}/>*/}
            </Btn>
            <Btn type={"normal"} size={1} clickHandler={() => getConjugationsHandler()}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </Btn>
        </div>
        <div className={"my-3 relative h-full overflow-auto"}>
            {selectMode === false && <ul>
                {conjugations.map((e, i) => {
                    return <li key={i} className={"grid grid-cols-1 mb-2"}>
                        <div className={"border-l-4 border-grayDark pl-3"}>
                            {e.conjugation}
                            <div>
                                Verbs: {e.verbs.map((ee, ii) =>
                                <span key={i + ee}>{ee}{e?.verbs?.length > ii + 1 && ", "}</span>
                            )}
                            </div>
                        </div>
                    </li>
                })}
            </ul>}
            {selectMode &&
                <ul className={"p-3 absolute top-0 left-0 bg-grayDark w-full h-full m-0 grid grid-cols-[1fr_1fr_1fr] auto-rows-min gap-3 "}>
                    {availableLang.conjugation.filter(e => e !== "arabic").map((e, i) => {
                        return <li key={i} className={"text-center flex h-[35.5px] justify-center"}>
                            <Btn type={lang === e ? "li-active" : "li"} size={1} clickHandler={() => {
                                setLang(e)
                                setSelectMode(false)
                            }}>
                                <div className={"capitalize m-auto"}>{e}</div>
                            </Btn>
                        </li>
                    })}
                </ul>}
        </div>
    </div>

})

export default Conjugation
