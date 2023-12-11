import React, {ReactNode} from "react"

interface Props {
    type: "normal" | "active"
    size: 1
    clickHandler: () => void
    children: ReactNode
}

const Btn = ({type, clickHandler, size, children}: Props) => {

    const textSize = size === 1 ? 16 : 16
    const bgColor = type === "normal" ? "gray" : "yellow"
    const textColor = type === "normal" ? "white" : "gray"

    return <>
        <button
            className={`items-center flex bg-${bgColor} px-4 py-2 rounded text-[${textSize}px] text-${textColor} hover:bg-yellow hover:text-gray transition active:opacity-80 outline-0 border-0`}
            onClick={clickHandler}
        >
            {children}
        </button>
    </>
}

export default Btn
