import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClockRotateLeft, faGear, faThumbtack} from "@fortawesome/free-solid-svg-icons";
import SVG from "../../components/SVG";
import {Link, useLocation} from "react-router-dom";

const Menu = () => {

    const [dockedWindowMode, setDockedWindowMode] = useState<"off" | "on">("off")
    const location = useLocation();

    const clickHandler = () => {
        if (dockedWindowMode === "on") {
            window.electronAPI.dockedWindowModeOff()
            setDockedWindowMode("off")
        } else {
            window.electronAPI.dockedWindowModeOn()
            setDockedWindowMode("on")
        }
    }

    const isShow = () => {
        const hiddenIn = ["/settings", "/history"]
        return !hiddenIn.includes(location.pathname)
    }


    if (isShow()) {
        return <div className="flex justify-between items-center px-4 py-3">
            <div className={"w-[70px]"}>
                <FontAwesomeIcon
                    className={`iconMenuControl ${dockedWindowMode === "on" && "iconMenuControlActive"}`}
                    icon={faThumbtack} size={"2x"} onClick={clickHandler}/>
            </div>
            <SVG type={"logo"}/>
            <div className="flex justify-between gap-4 w-[70px]">
                <Link to="/history" relative="path">
                    <FontAwesomeIcon className={"iconMenuControl"} icon={faClockRotateLeft} size={"2x"}/>
                </Link>
                <Link to="/settings" relative="path">
                    <FontAwesomeIcon className={"iconMenuControl"} icon={faGear} size={"2x"}/>
                </Link>
            </div>
        </div>
    } else {
        return null
    }


};

export default Menu;
