import React, {useEffect, useState} from "react";
import PageLayout from "../../components/PageLasyout";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../../providers/RootStoreProvider";
import KeyCapture from "../../components/KeyCapture";
import {hotKeyStringToObj} from "./funtions";

const Settings = observer(() => {


    const store = useRootStore();
    const [autoStartInitStatus, setAutoStartInitStatus] = useState<boolean | null>(null)

    const onClickAutoStartHandler = async (e: boolean) => {
        await window.electronAPI.autoLaunch(JSON.stringify({
            type: "setStatus",
            value: e.toString()
        }))
    }

    useEffect(() => {
        async function initAutoStart() {
            const status = await window.electronAPI.autoLaunch(JSON.stringify({
                type: "getStatus"
            }))
            setAutoStartInitStatus(status)
        }

        initAutoStart()
    }, []);

    const quitFromAppHandler = () => {
        window?.electronAPI?.store(JSON.stringify({
            type: "quitFromAppHandler"
        })).finally()
    }

    const saveHandler = () => {
        console.log("saveHandler")
        store.saveConfig()
    }
    // store.config.hotKeys.forEach(e => {
    //     console.log("++++forEach", JSON.stringify(e))
    //
    // })

// console.log(store.config.hotKeys)
//     const translatorKey = store.config.hotKeys.find(e => e.page === "translator")
//     let translatorData: IHotKey[] = []
//     if (translatorKey) {
//         translatorData = translatorKey.key.split("+").map(e => {
//             return {
//                 name: e,
//                 code: 0
//             }
//         })
//     }
    const translatorHotKey = hotKeyStringToObj(store.config, "translator")
    const contextHotKey = hotKeyStringToObj(store.config, "context")
    console.log("+++translatorHotKey", JSON.stringify(translatorHotKey))
    // console.log("+++translatorData", JSON.stringify(translatorData))
    console.log("+++contextHotKey", JSON.stringify(contextHotKey))
    return <PageLayout title={"Settings"}>

        <section>
            <div className={"text-2xl"}>General</div>
            {/*
                TODO: windows size
                TODO: position mode
            */}
        </section>

        <section>
            <div className={"text-2xl"}>Translator</div>
            <KeyCapture hotKeys={translatorHotKey} onChangeHandler={(e) => {
                console.log("++++onChangeHandler", e)
                store.addHotKey(e, "translator")
            }
            }/>
            {/*
                TODO: hotkey
                TODO: auto fill
            */}
        </section>

        {/*<section>*/}
        {/*    <div className={"text-2xl"}>Context</div>*/}
        {/*    /!**/}
        {/*        TODO: hotkey*/}
        {/*        TODO: auto fill*/}
        {/*    *!/*/}
        {/*</section>*/}

        {/*<section>*/}
        {/*    <div className={"text-2xl"}>Synonyms</div>*/}
        {/*    /!**/}
        {/*        TODO: hotkey*/}
        {/*        TODO: auto fill*/}
        {/*    *!/*/}
        {/*</section>*/}

        {/*<section>*/}
        {/*    <div className={"text-2xl"}>SpellCheck</div>*/}
        {/*    /!**/}
        {/*        TODO: hotkey*/}
        {/*        TODO: auto fill*/}
        {/*    *!/*/}
        {/*</section>*/}

        {/*<section>*/}
        {/*    <div className={"text-2xl"}>Conjugation</div>*/}
        {/*    /!**/}
        {/*        TODO: hotkey*/}
        {/*        TODO: auto fill*/}
        {/*    *!/*/}
        {/*</section>*/}

        <section>
            {/*
                TODO: save
                TODO: exit
            */}

            <button
                onClick={saveHandler}
                className="text-base p-3 border-2 border-red border-solid rounded text-yellow hover:bg-yellow transition hover:text-grayDark">
                Save
            </button>
            {/*<button*/}
            {/*    onClick={quitFromAppHandler}*/}
            {/*    className="text-base p-3 border-2 border-red border-solid rounded text-red hover:bg-red transition hover:text-grayDark">*/}
            {/*    Quit*/}
            {/*</button>*/}

        </section>


        {/*<div className={"grid grid-cols-[1fr_min-content]"}>*/}
        {/*    <div>*/}
        {/*        <div className={"text-xl"}>AutoStart</div>*/}
        {/*        <div className={"text-sm"}>Launch the application while the operating system boots.</div>*/}
        {/*    </div>*/}
        {/*    <div className={"flex align-middle m-auto"}>*/}
        {/*        {autoStartInitStatus !== null &&*/}
        {/*            <Select initValue={autoStartInitStatus} onClick={onClickAutoStartHandler}/>}*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<div className={"grid grid-cols-[1fr] gap-2"}>*/}
        {/*    <div>*/}
        {/*        <div className={"text-xl"}>HotKey</div>*/}
        {/*        <div className={"text-sm"}>Open translator with a shortcut at any time.</div>*/}
        {/*    </div>*/}
        {/*    <div className={"flex align-middle"}>*/}
        {/*        <KeyCapture/>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<button*/}
        {/*    onClick={quitFromAppHandler}*/}
        {/*    className="text-base p-3 border-2 border-red border-solid rounded text-red hover:bg-red transition hover:text-grayDark">*/}
        {/*    Quit*/}
        {/*</button>*/}
    </PageLayout>

})

export default Settings;
