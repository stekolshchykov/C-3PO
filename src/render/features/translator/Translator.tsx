import React, {useEffect, useRef} from 'react';
import SVG from "../../components/SVG";
import {useAppDispatch, useAppSelector} from "./../../hooks";
import {translatorSetFromTextAndTranslate, translatorSwapDirection} from "./actions";


const Translator = () => {

    const dispatch = useAppDispatch()

    const inputFromRef = useRef<HTMLTextAreaElement>(null);

    const toText = useAppSelector((state) => state.translator.toText)
    const fromText = useAppSelector((state) => state.translator.fromText)
    const fromLanguage = useAppSelector((state) => state.translator.fromLanguage)
    const toLanguage = useAppSelector((state) => state.translator.toLanguage)
    // const fromText = useAppSelector((state) => state.translator.fromText)

    useEffect(() => {
        if (fromText.trim() !== inputFromRef?.current?.value.trim()) {
            inputFromRef!.current!.value = fromText
        }
    }, [fromText]);

    function swapDirectionHandler() {
        dispatch(translatorSwapDirection())
    }
    
    return <div className={"bg-grey grid grid-rows-[min-content_minmax(0,1fr)]"}>
        <div className={"flex justify-between mx-auto my-3"}>
            <button className={"volumetricButton"}>{toLanguage.name}</button>
            <div className={"mx-10 flex items-center justify-center"} onClick={swapDirectionHandler}>
                <SVG type={"switchArrow"}/>
            </div>
            <button className={"volumetricButton"}>{fromLanguage.name}</button>
        </div>
        <div className={"flex justify-between mx-2"}>
            <textarea
                ref={inputFromRef}
                className={" bg-grayDark mr-[1px] w-full outline-none px-3 py-2 resize-none"}
                placeholder="from"
                onChange={e => dispatch(translatorSetFromTextAndTranslate(e.target.value))}/>
            <textarea
                className={" bg-grayDark ml-[1px] w-full outline-none px-3 py-2 resize-none"}
                placeholder="to"
                value={toText}
                disabled={true}/>
        </div>
    </div>
};

export default Translator;
