import React, {useEffect, useState} from 'react';
import SVG from "../../components/SVG";
import {useAppDispatch, useAppSelector} from "./../../hooks";
import {translatorSwapDirection} from "./actions";


const Translator = () => {

    const dispatch = useAppDispatch()

    const [fromText, setFromText] = useState("")
    const toText = useAppSelector((state) => state.translator.toText)
    const fromTextFromStore = useAppSelector((state) => state.translator.fromText)

    useEffect(() => {
        setFromText(fromTextFromStore)
    }, [fromTextFromStore]);

    function swapDirectionHandler() {
        dispatch(translatorSwapDirection())
    }

    return <div className={"bg-grey grid grid-rows-[min-content_minmax(0,1fr)]"}>
        <div className={"flex justify-between mx-auto my-3"}>
            <button className={"volumetricButton"}>Russian</button>
            <div className={"mx-10 flex items-center justify-center"} onClick={swapDirectionHandler}>
                <SVG type={"switchArrow"}/>
            </div>
            <button className={"volumetricButton"}>English</button>
        </div>
        <div className={"flex justify-between mx-2"}>
            <textarea className={" bg-grayDark mr-[1px] w-full outline-none px-3 py-2 resize-none"} placeholder="from"
                      value={fromText} onChange={e => setFromText(e.target.value)}/>
            <textarea className={" bg-grayDark ml-[1px] w-full outline-none px-3 py-2 resize-none"} placeholder="to"
                      value={toText} disabled={true}/>
        </div>
    </div>
};

export default Translator;
