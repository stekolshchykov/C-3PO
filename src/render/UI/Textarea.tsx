import React, {useEffect, useState} from "react"
import {observer} from "mobx-react-lite";
import {useRootStore} from "../providers/RootStoreProvider";

interface Props {
    width?: number
    placeholder?: string
    onChange?: (text: string) => void
    rows?: number
    resize?: boolean
    isDefaultTextFromClipboard?: boolean
}

const Textarea = observer(({isDefaultTextFromClipboard, width, placeholder, onChange, rows, resize}: Props) => {

    const store = useRootStore();
    const [text, setText] = useState(isDefaultTextFromClipboard ? store.clipboard : "")

    useEffect(() => {
        if (isDefaultTextFromClipboard) {
            setText(store.clipboard)
            onChange && onChange(store.clipboard)
        }
    }, [store.activeEvent])

    return <>
        <textarea
            style={{resize: resize === true ? "both" : "none"}}
            rows={rows || 3}
            value={text}
            onChange={(event) => {
                setText(event.target.value)
                if (onChange) {
                    onChange(event.target.value)
                }
            }}
            className={`w-[${width || 100}%] px-4 py-2 outline-0 rounded flex border-0 m-0 bg-gray focus:bg-grayDark transition`}
            placeholder={placeholder}
        />
    </>
})

export default Textarea
