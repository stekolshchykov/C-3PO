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
}

const Input = observer(({isAutoFocus, isDefaultTextFromClipboard, width, placeholder, onChange, onEnter}: Props) => {

    const store = useRootStore();
    const [text, setText] = useState(isDefaultTextFromClipboard ? store.clipboard : "")

    useEffect(() => {
        if (isDefaultTextFromClipboard) {
            setText(store.clipboard)
            onChange(store.clipboard)
        }
    }, [store.activeEvent])

    return <>
        <input
            ref={input => input && isAutoFocus ? input.focus() : ""}
            type={"text"}
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
            className={`w-[${width}%] px-4 py-2 outline-0 rounded flex border-0 m-0 bg-gray focus:bg-grayDark transition`}
            placeholder={placeholder}
        />
    </>
})

export default Input
