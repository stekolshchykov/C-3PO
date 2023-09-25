import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faXmark} from "@fortawesome/free-solid-svg-icons";
import Select from "../../components/Select";

const Settings = () => {

    return <div
        className={"bg-grey grid grid-rows-[min-content_minmax(0,1fr)] grid-cols-[1fr] overflow-none"}>
        <div className={"grid grid-cols-[1fr_1fr_1fr] justify-evenly align-middle my-3 mx-2"}>
            <Link to={"/"}>
                <FontAwesomeIcon icon={faAngleLeft} size={"2x"}/>
            </Link>
            <div className={"text-center text-xl m-auto"}>Settings</div>
            <FontAwesomeIcon icon={faXmark} size={"2x"}/>
        </div>
        <div className={"grid grid grid-flow-row auto-rows-min gap-2 p-2 bg-grayDark"}>
            <div className={"bg-[red] grid grid-cols-[1fr_min-content]"}>
                <div>
                    <div className={"text-xl"}>AutoStart</div>
                    <div className={"text-base"}>Launch the application while the operating system boots.</div>
                </div>
                <div>
                    <Select/>
                </div>
            </div>
            <div className={"bg-[green]"}>
                <div>1</div>
                <div>2</div>
            </div>
        </div>
    </div>
};

export default Settings;
