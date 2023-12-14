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
        className={"bg-grey grid grid-rows-[min-content_1fr] grid-cols-[1fr] overflow-hidden"}>
        <div
            className={"grid grid-cols-[1fr_1fr_1fr] justify-evenly align-middle my-0 mx-0 px-3 h-[60px] bg-gray items-center"}>
            <Link to={"/"}>
                <FontAwesomeIcon icon={faAngleLeft} size={"2x"}/>
            </Link>
            <div className={"text-center text-2xl m-auto"}>{title}</div>
        </div>
        <div className={"grid grid-flow-row auto-rows-min gap-4 px-2 py-4 overflow-x-auto"}>
            {children}
        </div>
    </div>
}

export default PageLayout
