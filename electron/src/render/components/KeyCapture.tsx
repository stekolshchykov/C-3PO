import React, {useEffect, useState} from 'react';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IHotKey} from "../../type";
import {observer} from "mobx-react-lite";

interface IProps {
    hotKeys: IHotKey[]
    onChangeHandler: (keys: IHotKey[]) => void
}


const KeyCapture = observer(({onChangeHandler, hotKeys}: IProps) => {

    const [keys, setKeys] = useState<IHotKey[]>([])
    const [active, setActive] = useState<boolean>(false)

    useEffect(() => {
        const handleKeyUp = (e: any) => {
            if (active) {
                const key: string = e.key.toLowerCase()
                const canStartFrom = ["shift", "meta", "alt", "control"]
                if ((keys.length === 0 && canStartFrom.includes(key)) || (keys.length > 0 && keys.length < 2) && !canStartFrom.includes(key)) {
                    setKeys([...keys, {
                        name: key.toUpperCase(),
                        code: e.keyCode
                    }])
                }
            }
        }
        window.document.addEventListener('keyup', handleKeyUp);
        return () => {
            window.document.removeEventListener('keyup', handleKeyUp);
        }
    }, [keys, active]);

    useEffect(() => {
        if (keys.length === 2) onChangeHandler(keys)
    }, [keys]);

    useEffect(() => {
        setKeys(hotKeys)
    }, []);

    const baseClasses = "transition h-[52px] border rounded grid grid-cols-[max-content_min-content] w-[100%] p-2 justify-between align-middle"
    const activeClasses = baseClasses + " border-yellow"

    const noKeysBaseClasses = "transition px-3 py-0 list-none flex align-middle gap-2 text-sm m-auto"
    const activeNoKeysBaseClasses = noKeysBaseClasses + " text-yellow"

    const keyBaseClasses = "transition px-4 py-1 m-0 border rounded flex align-middle items-center"
    const activeKeyBaseClasses = keyBaseClasses + " border-yellow text-yellow"

    const clear = () => {
        setKeys([])
        onChangeHandler([])
    }

    return <div
        onClick={() => setActive(!active)}
        onMouseLeave={() => {
            setActive(false)
        }}
        className={(keys.length < 2 && active) ? activeClasses : baseClasses}>
        {keys.length > 0 && <ul className={"p-0 m-0 list-none grid grid-cols-[min-content_min-content] gap-2"}>
            {keys.map((key, i) =>
                <li key={i} className={active && keys.length < 2 ? activeKeyBaseClasses : keyBaseClasses}>
                    {key.name}
                </li>
            )}
        </ul>}
        {keys.length == 0 &&
            <div className={active ? activeNoKeysBaseClasses : noKeysBaseClasses}>
                Click on this field and then press a desired shortcut
            </div>}
        <div className={"flex align-middle m-auto cursor-pointer"} onClick={() => clear()}>
            <FontAwesomeIcon
                icon={faXmark}
                // color={"#494949"}
                size={"1x"}
                onClick={() => setKeys([])}/>
        </div>
    </div>
})

export default KeyCapture;
