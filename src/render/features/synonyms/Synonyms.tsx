import React, {useState} from "react"
import Input from "../../UI/Input";
import Btn from "../../UI/Btn";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {availableLang, reverso} from "../../reverso";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../../providers/RootStoreProvider";

const Synonyms = observer(() => {

    const [text, setText] = useState("")
    const [lang, setLang] = useState("english")
    const [selectMode, setSelectMode] = useState<boolean>(false)
    const [synonyms, setSynonyms] = useState<string[]>([])
    const store = useRootStore();

    const getSynonymsHandler = async () => {
        try {
            const response = await reverso.getSynonyms(text, lang);
            if (response.status === 404) {
                console.error('Error: Reverso API returned 404');
                setSynonyms([])
            } else {
                const synonyms: { synonym: string }[] = response?.synonyms
                if (synonyms) {
                    setSynonyms(synonyms.map(e => e.synonym))
                }
            }
        } catch (e) {
            console.error(e);
            setSynonyms([]);
        }
    }


    return <div className={"px-2 pt-4 overflow-auto"}>
        <div className={"flex items-center gap-2"}>
            <Input
                isDefaultTextFromClipboard={store.config?.autofill}
                placeholder={"Enter word"}
                width={100}
                onChange={e => setText(e)}
                onEnter={() => getSynonymsHandler()}/>
            <div className={"w-[15px]"}></div>
            <Btn type={"normal"} size={1} clickHandler={() => setSelectMode(!selectMode)}>
                <div className={"capitalize"}>{lang}</div>
                <FontAwesomeIcon icon={faCaretDown}/>
            </Btn>
            <Btn type={"normal"} size={1} clickHandler={() => getSynonymsHandler()}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </Btn>
        </div>
        <div className={"my-3  overflow-auto relative"}>
            {selectMode === false && <ul>
                {synonyms.map((e, i) => {
                    return <li key={i} className={"grid grid-cols-1 mb-2"}>
                        <div className={"border-l-4 border-grayDark pl-3"}>{e}</div>
                    </li>
                })}
            </ul>}
            {selectMode &&
                <ul className={"pt-3 absolute top-0 left-0 bg-grayDark w-full h-full m-0 p-0 grid grid-cols-[1fr_1fr_1fr_1fr_1fr] auto-rows-min gap-3 "}>
                    {availableLang.synonyms.map((e, i) => {
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
})

export default Synonyms
