import React, {ReactNode} from "react"
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";

interface Props {
    children: ReactNode
    title: string
}

const PageLayout: React.FC<Props> = ({children, title}) => {

    return <div
        className={"bg-grey grid grid-rows-[min-content_minmax(0,1fr)] grid-cols-[1fr] overflow-none"}>
        <div className={"grid grid-cols-[1fr_1fr_1fr] justify-evenly align-middle my-3 mx-2"}>
            <Link to={"/"}>
                <FontAwesomeIcon icon={faAngleLeft} size={"2x"}/>
            </Link>
            <div className={"text-center text-2xl m-auto"}>{title}</div>
        </div>
        <div className={"grid grid-flow-row auto-rows-min gap-4 px-2 py-4 bg-grayDark"}>
            {children}
        </div>
    </div>
}

export default PageLayout