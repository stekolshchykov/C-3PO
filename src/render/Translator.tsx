import React from 'react';
import SVG from "./components/SVG";


const Translator = () => {

    return <div className={"bg-grey grid grid-rows-[min-content_minmax(0,1fr)]"}>
        <div className={"flex justify-between mx-auto my-3"}>
            <button className={"volumetricButton"}>Russian</button>
            <div className={"mx-10 flex items-center justify-center"}>
                <SVG type={"switchArrow"}/>
            </div>
            <button className={"volumetricButton"}>English</button>
        </div>
        <div className={"flex justify-between mx-2"}>
            <textarea className={" bg-grayDark mr-[1px] w-full outline-none px-3 py-2 resize-none"} placeholder="from"/>
            <textarea className={" bg-grayDark ml-[1px] w-full outline-none px-3 py-2 resize-none"} placeholder="to"/>
        </div>
    </div>
};

export default Translator;
