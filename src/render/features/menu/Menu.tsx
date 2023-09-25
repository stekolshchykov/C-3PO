import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faThumbtack} from "@fortawesome/free-solid-svg-icons";
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

    if (location.pathname !== "/settings") {
        return <div className="flex justify-between items-center px-4 py-3">
            <FontAwesomeIcon
                className={`iconMenuControl ${dockedWindowMode === "on" && "iconMenuControlActive"}`}
                icon={faThumbtack} size={"2x"} onClick={clickHandler}/>
            <SVG type={"logo"}/>
            <Link to="/settings" relative="path">
                <FontAwesomeIcon className={"iconMenuControl"} icon={faGear} size={"2x"}/>
            </Link>
        </div>
    } else {
        return null
    }


};

export default Menu;
