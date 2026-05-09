import {observer} from "mobx-react-lite";
import React, {useState} from "react";
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
            const page = await wiki.page(text)
            const content = await page.content()
            setResult(content)
        } catch (error) {
            console.log(error);
        }
    }

    return <div className={"px-2 pt-4 h-full overflow-hidden grid grid-rows-[min-content_1fr] gap-3"}>
        <div className={"flex items-center gap-2"}>
            <Input
                isAutoFocus={true}
                isDefaultTextFromClipboard={store.config?.tabs.wikipedia.autofill}
                placeholder={"Enter word"}
                width={100}
                onChange={e => setText(e)}
                onEnter={() => getInfo()}/>
            <div className={"w-[15px]"}></div>
            <Btn type={"normal"} size={1} clickHandler={() => getInfo()}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </Btn>
        </div>
        <pre className={"select-text my-0 relative h-full max-w-[100%] overflow-y-auto overflow-x-hidden text-wrap"}
             dangerouslySetInnerHTML={{__html: result}}>
        </pre>
    </div>

})
export default Wikipedia
