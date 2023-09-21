import React, {useEffect, useRef, useState} from 'react';
import SVG from "../../components/SVG";
import {useAppDispatch, useAppSelector} from "./../../hooks";
import {
    translatorSetFromTextAndTranslate,
    translatorSetLanguageFrom,
    translatorSetLanguageTo,
    translatorSwapDirection
} from "./actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {ILanguage, languages} from "./languageList";

const Translator = () => {

    const dispatch = useAppDispatch()

    const inputFromRef = useRef<HTMLTextAreaElement>(null);

    const [languagesListStatus, setLanguageListStatus] = useState<null | "from" | "to">(null)
    const [inputSearchLanguage, setInputSearchLanguage] = useState("")

    const translator = useAppSelector((state) => state.translator)
    const toText = useAppSelector((state) => state.translator.toText)
    const fromText = useAppSelector((state) => state.translator.fromText)
    const fromLanguage = useAppSelector((state) => state.translator.fromLanguage)
    const toLanguage = useAppSelector((state) => state.translator.toLanguage)

    useEffect(() => {
        if (fromText.trim() !== inputFromRef?.current?.value.trim()) {
            inputFromRef!.current!.value = fromText
        }
    }, [fromText]);

    const swapDirectionHandler = () => {
        dispatch(translatorSwapDirection())
    }

    const isActiveLanguage = (code: string) => {
        return fromLanguage.code === code || toLanguage.code === code
    }

    const selectNewLanguage = (newLanguage: ILanguage) => {
        dispatch(languagesListStatus === "from" ? translatorSetLanguageFrom(newLanguage) : translatorSetLanguageTo(newLanguage))
        setLanguageListStatus(null)
    }

    const selectToHandler = () =>
        languagesListStatus === "to" ? setLanguageListStatus(null) : setLanguageListStatus("to")
    const selectFromHandler = () =>
        languagesListStatus === "from" ? setLanguageListStatus(null) : setLanguageListStatus("from")

    console.log(translator)

    return <div className={"bg-grey grid grid-rows-[min-content_minmax(0,1fr)]"}>
        <div className={"grid grid-cols-[1fr_1fr_1fr] justify-evenly mx-auto my-3"}>
            <button className={"volumetricButton"} onClick={selectFromHandler}>
                {fromLanguage.name}
            </button>
            <div className={"flex items-center justify-center"} onClick={swapDirectionHandler}>
                <SVG type={"switchArrow"}/>
            </div>
            <button className={"volumetricButton"} onClick={selectToHandler}>
                {toLanguage.name}
            </button>
        </div>
        <div className={"flex justify-between mx-2 relative overflow-auto"}>
            <div className={"w-full mr-[1px] grid grid-cols-[1fr] relative"}>
                <textarea
                    ref={inputFromRef}
                    className={" bg-grayDark w-full outline-none px-3 py-2 resize-none"}
                    placeholder="from"
                    onChange={e => dispatch(translatorSetFromTextAndTranslate(e.target.value))}/>
                <FontAwesomeIcon
                    className={"icon absolute right-6 top-5 cursor-pointer"}
                    size={"lg"}
                    onClick={() => navigator.clipboard.writeText(fromText)}
                    icon={faCopy}/>
            </div>
            <div className={"w-full grid grid-cols-[1fr] relative"}>
               <textarea
                   className={" bg-grayDark w-full outline-none px-3 py-2 resize-none"}
                   placeholder="to"
                   value={toText}
                   disabled={true}/>
                <FontAwesomeIcon
                    className={"icon absolute right-6 top-5 cursor-pointer"}
                    color={"#DCD8D8"}
                    size={"lg"}
                    onClick={() => navigator.clipboard.writeText(toText)}
                    icon={faCopy}/>
            </div>
            {languagesListStatus && <div
                className={"p-4 m-0 absolute l-0 t-0 w-[100%] bg-grayDark grid grid-cols-[1fr] grid-rows-[min-content_minmax(355px,_1fr)]"}>
                <input
                    value={inputSearchLanguage}
                    onChange={e => setInputSearchLanguage(e.target.value)}
                    className={"p-4 m-0 w-[100%] mb-4 bg-gray outline-none"}
                    placeholder={"Language name..."}/>
                <ul className={" m-0 p-0 grid grid-cols-[1fr_1fr_1fr] gap-4"}>
                    {languages.map((l, k) =>
                        l.name.toLowerCase().includes(inputSearchLanguage.toLowerCase().trim())
                            ? <li className={"m-auto"} key={k}>
                                <button
                                    onClick={() => selectNewLanguage(l)}
                                    className={`volumetricButton ${isActiveLanguage(l.code) && "active"}`}>
                                    {l.name}
                                </button>
                            </li>
                            : null
                    )}
                </ul>
            </div>}
        </div>
    </div>
};

export default Translator;
