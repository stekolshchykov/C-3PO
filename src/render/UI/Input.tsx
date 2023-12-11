import React from "react"

interface Props {
    width: number
    placeholder: string
}

const Input = ({width, placeholder}: Props) => {

    return <>
        <input
            className={`w-[${width}%] px-4 py-2 outline-0 rounded flex border-0 m-0 bg-gray focus:bg-grayDark transition`}
            placeholder={placeholder}
        />
    </>

}

export default Input
