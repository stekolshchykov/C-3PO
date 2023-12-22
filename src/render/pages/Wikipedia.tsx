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
    const [HTML, setHTML] = useState("<h3>123123123</h3>")


    const getInfo = async () => {
        setResult("")
        try {
            const page = await wiki.page(text);
            // const intro = await page.intro()
            // const html = await page.html()
            const content = await page.content()

            // if (store.config?.tabs.wikipedia.autofillOut)
            //     navigator.clipboard.writeText(intro)
            // setResult(content.replace(/(^[ \t]*\n)/gm, ""))
            setResult(content)

            // console.log("html", html)
            // @ts-ignore
            // setResult(html)
            // setResult(html)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // getInfo()
    }, [text])

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
            {/*{result}*/}
            {/*/!*<div c dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(thisIsMyCopy)}}></div>*!/*/}
            {/*<pre className={"w-[30px]"} dangerouslySetInnerHTML={{__html: result}}/>*/}
            {/*/!*{HTML}*!/*/}
        </pre>
    </div>

})
export default Wikipedia
