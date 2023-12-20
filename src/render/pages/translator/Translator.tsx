import React, {useEffect, useRef, useState} from 'react';
import SVG from "../../components/SVG";

import {languages} from "./languageList";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../../providers/RootStoreProvider";
import TranslatorButtons from "../../components/TranslatorButtons";
import Btn from "./../../UI/Btn";

const Translator = observer(() => {

    const store = useRootStore();
    const inputFromRef = useRef<HTMLTextAreaElement>(null);

    const [isShowLangList, setIsShowLangList] = useState(false)
    const [languagesListStatus, setLanguageListStatus] = useState<null | "from" | "to">(null)
    const [inputSearchLanguage, setInputSearchLanguage] = useState("")

    const swapDirectionHandler = () => {
        const oldFrom = store.config.translator.from
        store.config.translator.from = store.config.translator.to
        store.config.translator.to = oldFrom
        setIsShowLangList(false)
        setLanguageListStatus(null)
        setInputSearchLanguage("")
    }

    const isActiveLanguage = (code: string) => {
        return store.config.translator.from.code === code || store.config.translator.to.code === code
    }

    const selectToHandler = () => {
        setIsShowLangList(!isShowLangList)
        languagesListStatus === "to" ? setLanguageListStatus(null) : setLanguageListStatus("to")
    }

    const selectFromHandler = () => {
        setIsShowLangList(!isShowLangList)
        languagesListStatus === "from" ? setLanguageListStatus(null) : setLanguageListStatus("from")
    }

    useEffect(() => {
        if (store.config?.autofill) {
            if (inputFromRef.current) {
                inputFromRef.current.value = store.clipboard
            }
        } else {
            if (inputFromRef.current) {
                inputFromRef.current.value = ""
            }
        }
    }, [inputFromRef])

    return <div className={"bg-grey grid grid-rows-[min-content_minmax(0,1fr)]"}>
        <div className={"grid grid-cols-[min-content_min-content_min-content] justify-evenly mx-auto my-3 w-full"}>
            <Btn type={"normal"} size={1} clickHandler={selectFromHandler} addedArrow={languagesListStatus === null}>
                <div className={"capitalize"}>
                    {store?.config?.translator?.from?.name}
                </div>
                {/*<FontAwesomeIcon icon={faCaretDown}/>*/}
            </Btn>
            <div className={"flex items-center justify-center"} onClick={swapDirectionHandler}>
                <div className={"cursor-pointer"}>
                    <SVG type={"switchArrow"}/>
                </div>
            </div>
            <Btn type={"normal"} size={1} clickHandler={selectToHandler} addedArrow={languagesListStatus !== "to"}>
                <div className={"capitalize"}>
                    {store?.config?.translator?.to?.name}
                </div>
                {/*<FontAwesomeIcon icon={faCaretDown}/>*/}
            </Btn>
        </div>
        <div className={"flex justify-between mx-2 relative overflow-auto"}>
            <div className={"w-full mr-[1px] grid grid-cols-[1fr] relative"}>
                      <textarea
                          ref={inputFromRef}
                          className={" bg-grayDark w-full outline-none px-3 py-2 resize-none"}
                          placeholder="from"
                          onChange={e => store.translatorText.from = e.target?.value}/>
                <TranslatorButtons text={store.translatorText.from} language={store.config.translator.from}/>
            </div>
            <div className={"w-full grid grid-cols-[1fr] relative"}>
                <textarea
                    className={" bg-grayDark w-full outline-none px-3 py-2 resize-none"}
                    placeholder="to"
                    value={store.translatorText.to}
                    disabled={true}/>
                <TranslatorButtons text={store.translatorText.to} language={store.config.translator.to}/>
            </div>
            {isShowLangList && <div
                className={"p-4 m-0 absolute l-0 t-0 w-full h-full overflow-auto bg-grayDark grid grid-cols-[1fr] grid-rows-[min-content_1fr]"}>
                {/*className={"p-4 m-0 absolute l-0 t-0 w-full overflow-auto bg-grayDark grid grid-cols-[1fr] grid-rows-[min-content_minmax(355px,_1fr)]"}>*/}
                <input
                    value={inputSearchLanguage}
                    onChange={e => setInputSearchLanguage(e.target.value)}
                    className={"p-4 m-0 w-[100%] mb-4 bg-gray outline-none"}
                    placeholder={"Language name..."}/>
                <ul className={" m-0 p-0 grid grid-cols-[1fr_1fr_1fr] gap-4"}>
                    {languagesListStatus === "from" && <>
                        <li className={"m-auto"}>
                            <Btn type={isActiveLanguage("Auto") ? "active" : "normal"} size={1} clickHandler={() => {
                                setIsShowLangList(false)
                                store.config.translator.from = {code: "Auto", name: "Auto"}

                                setIsShowLangList(false)
                                setLanguageListStatus(null)
                                setInputSearchLanguage("")

                            }}>
                                <div className={"capitalize"}>Auto</div>
                            </Btn>
                        </li>
                    </>}
                    {languages.map((l, k) =>
                        l.name.toLowerCase().includes(inputSearchLanguage.toLowerCase().trim())
                            ? <li className={"m-auto"} key={k}>
                                <Btn type={isActiveLanguage(l.code) ? "active" : "normal"} size={1} clickHandler={() => {
                                    setIsShowLangList(false)
                                    if (languagesListStatus === "from") store.config.translator.from = l
                                    else if (languagesListStatus === "to") store.config.translator.to = l

                                    setIsShowLangList(false)
                                    setLanguageListStatus(null)
                                    setInputSearchLanguage("")

                                }}>
                                    <div className={"capitalize"}>{l.name}</div>
                                </Btn>
                            </li>
                            : null
                    )}
                </ul>
            </div>}
        </div>
    </div>
})

export default Translator;
