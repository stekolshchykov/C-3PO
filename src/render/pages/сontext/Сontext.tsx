import React, {useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react-lite";
import {availableLang, reverso} from "../../reverso";
import Input from "../../UI/Input";
import Btn from "../../UI/Btn";
import {useRootStore} from "../../providers/RootStoreProvider";
import SVG from "../../components/SVG";

const Context = observer(() => {

    const [text, setText] = useState("")
    const [selectMode, setSelectMode] = useState<null | "from" | "to">(null)
    const [langFrom, setLangFrom] = useState("russian")
    const [langTo, setLangTo] = useState("english")
    const [context, setContext] = useState<{ source: string, target: string }[]>([])
    const store = useRootStore();

    const selectModeHandler = (l: null | "from" | "to") => {
        setSelectMode(selectMode !== l ? l : null)
    }

    const selectLang = (l: string, position: "from" | "to" | null) => {
        selectModeHandler(null)
        if (position) {
            if (position === "from") {
                setLangFrom(l)
            } else {
                setLangTo(l)
            }
        }
    }

    const switchDirection = () => {
        const tmpFrom = langFrom
        const tmpTo = langTo
        setLangFrom(tmpTo)
        setLangTo(tmpFrom)
    }

    const getContextHandler = async () => {
        try {
            const response = await reverso.getContext(text, langFrom, langTo);
            if (response.status === 404) {
                console.error('Error: Reverso API returned 404');
                setContext([]);
            } else {
                const examples: { source: string, target: string }[] = response.examples;
                if (examples) {
                    if (store.config?.tabs.context.autofillOut)
                        navigator.clipboard.writeText(`${examples[0].source} - ${examples[0].target}`)
                    setContext(examples);
                }
            }
        } catch (e) {
            console.error(e);
            setContext([]);
        }
    }

    //arabic

    return <div className={"px-2 pt-4 grid grid-rows-[min-content_1fr] overflow-auto"}>
        <div className={"flex items-center gap-2"}>
            <Input
                isAutoFocus={true}
                isDefaultTextFromClipboard={store.config?.tabs.context.autofill}
                placeholder={"Enter word"}
                width={100}
                onChange={e => setText(e)}
                onEnter={() => getContextHandler()}/>
            <div className={"w-[15px]"}></div>
            <Btn type={"normal"} size={1} clickHandler={() => selectModeHandler("from")}
                 addedArrow={selectMode !== "from"}>
                <div className={"capitalize"}>{langFrom}</div>
            </Btn>
            <div className={"text-center cursor-pointer"} onClick={switchDirection}>
                <SVG type={"switchArrow"}/>
            </div>
            <Btn type={"normal"} size={1} clickHandler={() => selectModeHandler("to")} addedArrow={selectMode !== "to"}>
                <div className={"capitalize"}>{langTo}</div>
            </Btn>
            <Btn type={"normal"} size={1} clickHandler={() => getContextHandler()}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </Btn>
        </div>
        <div className={"my-3  overflow-auto relative"}>
            {selectMode === null && <ul>
                {context.map((e, i) => {
                    return <li key={i} className={"grid grid-cols-2 mb-2"}>
                        <div className={"border-l-4 border-grayDark pl-3"}
                             onClick={() => selectMode && selectModeHandler("from")}
                        >{e.source}</div>
                        <div className={"border-l-4 border-grayDark pl-3"}
                             onClick={() => selectMode && selectModeHandler("to")}
                        >{e.target}</div>
                    </li>
                })}
            </ul>}
            {selectMode !== null &&
                <ul className={"p-3 absolute top-0 left-0 bg-grayDark w-full h-full m-0 grid grid-cols-[1fr_1fr_1fr] auto-rows-min gap-3 "}>
                    {availableLang.context.filter(e => e !== "arabic").map((e, i) => {
                        return <li key={i} className={"text-center flex h-[35.5px] justify-center"}>
                            <Btn type={langFrom === e || langTo === e ? "li-active" : "li"} size={1}
                                 clickHandler={() => selectLang(e, selectMode)}>
                                <div className={"capitalize m-auto"}>{e}</div>
                            </Btn>
                        </li>
                    })}
                </ul>}
        </div>

    </div>
})

export default Context
