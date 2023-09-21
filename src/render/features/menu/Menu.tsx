import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faThumbtack} from "@fortawesome/free-solid-svg-icons";
import SVG from "../../components/SVG";

const Menu = () => {

    const [dockedWindowMode, setDockedWindowMode] = useState<"off" | "on">("off")

    const clickHandler = () => {
        if (dockedWindowMode === "on") {
            window.electronAPI.dockedWindowModeOff()
            setDockedWindowMode("off")
        } else {
            window.electronAPI.dockedWindowModeOn()
            setDockedWindowMode("on")
        }
    }

    return <div className="flex justify-between items-center px-4 py-3">

        <FontAwesomeIcon
            className={`iconMenuControl ${dockedWindowMode === "on" && "iconMenuControlActive"}`}
            icon={faThumbtack} size={"2x"} onClick={clickHandler}/>
        <SVG type={"logo"}/>
        <FontAwesomeIcon className={"iconMenuControl"} icon={faGear} size={"2x"}/>
    </div>
};

export default Menu;
