import React, {useState} from "react"
import Input from "../../UI/Input";
import Btn from "../../UI/Btn";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {lanList, reverso} from "../../reverso";

const Context = () => {

    const [text, setText] = useState("")
    const [selectMode, setSelectMode] = useState<null | "from" | "to">(null)
    const [langFrom, setLangFrom] = useState("russian")
    const [langTo, setLangTo] = useState("english")

    const [context, setContext] = useState<{ source: string, target: string }[]>([])

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

    const getContextHandler = async () => {
        try {
            const response = await reverso.getContext(text, langFrom, langTo);
            if (response.status === 404) {
                console.error('Error: Reverso API returned 404');
                setContext([]);
            } else {
                const examples = response.examples;
                if (examples) {
                    setContext(examples);
                }
            }
        } catch (e) {
            console.error(e);
            setContext([]);
        }
    };

    return <div className={"px-2 pt-4"}>

        <div className={"flex items-center gap-2"}>
            <Input placeholder={"Enter word"} width={100} onChange={e => setText(e)}
                   onEnter={() => getContextHandler()}/>
            <div className={"w-[15px]"}></div>
            <Btn type={"normal"} size={1} clickHandler={() => selectModeHandler("from")}>
                <div className={"capitalize"}>{langFrom}</div>
            </Btn>
            <div className={"text-center"}>
                <FontAwesomeIcon icon={faArrowRight}/>
            </div>
            <Btn type={"normal"} size={1} clickHandler={() => selectModeHandler("to")}>
                <div className={"capitalize"}>{langTo}</div>
            </Btn>
            <Btn type={"normal"} size={1} clickHandler={() => getContextHandler()}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </Btn>
        </div>
        <div className={"my-3 h-[395px] overflow-auto relative"}>
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
                <ul className={"pt-3 absolute top-0 left-0 bg-grayDark w-full h-full m-0 p-0 grid grid-cols-[1fr_1fr_1fr_1fr_1fr] auto-rows-min gap-3 "}>
                    {lanList.map((e, i) => {
                        return <li key={i} className={"text-center flex h-[35.5px] justify-center"}>
                            <Btn type={"normal"} size={1} clickHandler={() => selectLang(e, selectMode)}>
                                <div className={"capitalize"}>{e}</div>
                            </Btn>
                        </li>
                    })}
                </ul>}
        </div>

    </div>
}

export default Context
