import React from "react"
import Btn from "./Btn";

const UI = () => {
    return <>
        <div></div>
        <div className={"flex gap-2 p-2"}>
            
            <Btn type={"normal"} size={1} clickHandler={() => {
                //
            }}>fwef</Btn>

            <Btn type={"active"} size={1} clickHandler={() => {
                //
            }}>Gsdf</Btn>
        </div>
    </>
}

export default UI
