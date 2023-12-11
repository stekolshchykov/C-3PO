import React from "react"
import Btn from "./Btn";
import Input from "./Input";

const UI = () => {
    return <>
        <div></div>
        <div className={"flex gap-2 p-2 align-text-bottom"}>
            <Input placeholder={"test"} width={50} onChange={() => {
                // test
            }}/>
            <Btn type={"normal"} size={1} clickHandler={() => {
                //
            }}>test</Btn>
        </div>
        <div className={"flex gap-2 p-2"}>

            <Btn type={"normal"} size={1} clickHandler={() => {
                //
            }}>test</Btn>

            <Btn type={"active"} size={1} clickHandler={() => {
                //
            }}>test</Btn>
        </div>

    </>
}

export default UI
