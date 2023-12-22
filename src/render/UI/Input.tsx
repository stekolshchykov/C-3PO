import React, {useEffect, useState} from "react"
import {observer} from "mobx-react-lite";
import {useRootStore} from "../providers/RootStoreProvider";

interface Props {
    width: number
    placeholder: string
    onChange: (text: string) => void
    onEnter?: () => void
    isDefaultTextFromClipboard?: boolean
    isAutoFocus?: boolean
    forceValue?: string | number
    type?: "text" | "number"
    max?: number
    min?: number
}

const Input = observer(({
                            min,
                            max,
                            type,
                            forceValue,
                            isAutoFocus,
                            isDefaultTextFromClipboard,
                            width,
                            placeholder,
                            onChange,
                            onEnter
                        }: Props) => {

    const store = useRootStore();
    const [text, setText] = useState<string | number>(isDefaultTextFromClipboard ? store.clipboard : "")

    useEffect(() => {
        if (isDefaultTextFromClipboard) {
            setText(store.clipboard)
            onChange(store.clipboard)
        }
    }, [store.activeEvent])
    useEffect(() => {
        if (forceValue)
            setText(forceValue)
    }, [forceValue])

    return <>
        <input
            ref={input => input && isAutoFocus ? input.focus() : ""}
            type={type ? type : "string"}
            max={max}
            min={min}
            value={text}
            onKeyPress={(event) => {
                if (event.key === 'Enter' && onEnter) {
                    onEnter()
                }
            }}
            onChange={(event) => {
                setText(event.target.value)
                onChange(event.target.value)
            }}
            className={`w-[${width}%] px-4 py-2 outline-0 rounded flex border-0 m-0 bg-gray focus:bg-grayDark transition duration-0 `}
            placeholder={placeholder}
        />
    </>
})

export default Input
