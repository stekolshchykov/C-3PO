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

    const saveHandler = () => {
        store.saveConfig()
    }

    const translatorHotKey = hotKeyStringToObj(store.config, "translator")
    const contextHotKey = hotKeyStringToObj(store.config, "context")
    const synonymsHotKey = hotKeyStringToObj(store.config, "synonyms")
    const spellCheckHotKey = hotKeyStringToObj(store.config, "spell-check")
    const conjugationHotKey = hotKeyStringToObj(store.config, "conjugation")

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
            <KeyCapture hotKeys={translatorHotKey} onChangeHandler={(e) => store.addHotKey(e, "translator")}/>
            {/*
                TODO: auto fill
            */}
        </section>

        <section>
            <div className={"text-2xl"}>Context</div>
            <KeyCapture hotKeys={contextHotKey} onChangeHandler={(e) => store.addHotKey(e, "context")}/>
            {/*
                TODO: auto fill
            */}
        </section>

        <section>
            <div className={"text-2xl"}>Synonyms</div>
            <KeyCapture hotKeys={synonymsHotKey} onChangeHandler={(e) => store.addHotKey(e, "synonyms")}/>
            {/* TODO: auto fill */}
        </section>

        <section>
            <div className={"text-2xl"}>SpellCheck</div>
            <KeyCapture hotKeys={spellCheckHotKey} onChangeHandler={(e) => store.addHotKey(e, "spell-check")}/>
            {/* TODO: auto fill  */}
        </section>

        <section>
            <div className={"text-2xl"}>Conjugation</div>
            <KeyCapture hotKeys={conjugationHotKey} onChangeHandler={(e) => store.addHotKey(e, "conjugation")}/>
            {/* TODO: auto fill */}
        </section>

        <section className={""}>
            <button
                onClick={() => store.mainCommand("quitFromAppHandler")}
                className="text-base p-3 border-2 border-red border-solid rounded text-red hover:bg-red transition hover:text-grayDark w-full">
                Quit
            </button>

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
