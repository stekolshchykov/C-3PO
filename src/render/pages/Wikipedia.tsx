import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import Input from "../UI/Input";
import Btn from "../UI/Btn";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useRootStore} from "../providers/RootStoreProvider";
import wiki from "wikipedia";

const Wikipedia = observer(() => {

    const store = useRootStore();
    const [text, setText] = useState("")
    const [result, setResult] = useState("")


    const getInfo = async () => {
        setResult("")
        try {
            const page = await wiki.page(text);
            const intro = await page.intro();
            setResult(intro)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInfo()
    }, [text])

    return <div className={"px-2 pt-4 h-full overflow-hidden grid grid-rows-[min-content_1fr]"}>
        <div className={"flex items-center gap-2"}>
            <Input
                isDefaultTextFromClipboard={store.config?.autofill}
                placeholder={"Enter word"}
                width={100}
                onChange={e => setText(e)}
                onEnter={() => getInfo()}/>
            <div className={"w-[15px]"}></div>
            <Btn type={"normal"} size={1} clickHandler={() => getInfo()}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </Btn>
        </div>
        <div className={"my-3 relative h-full overflow-auto"}>
            {result}
        </div>
    </div>

})
export default Wikipedia
