import React, {useEffect, useState} from "react";
import Select from "../../components/Select";
import KeyCapture from "../../components/KeyCapture";
import PageLayout from "../../components/PageLasyout";

const Settings = () => {

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

    return <PageLayout title={"Settings"}>
        <div className={"grid grid-cols-[1fr_min-content]"}>
            <div>
                <div className={"text-xl"}>AutoStart</div>
                <div className={"text-sm"}>Launch the application while the operating system boots.</div>
            </div>
            <div className={"flex align-middle m-auto"}>
                {autoStartInitStatus !== null &&
                    <Select initValue={autoStartInitStatus} onClick={onClickAutoStartHandler}/>}
            </div>
        </div>
        <div className={"grid grid-cols-[1fr] gap-2"}>
            <div>
                <div className={"text-xl"}>HotKey</div>
                <div className={"text-sm"}>Open translator with a shortcut at any time.</div>
            </div>
            <div className={"flex align-middle"}>
                <KeyCapture/>
            </div>
        </div>
        <button
            onClick={quitFromAppHandler}
            className="text-base p-3 border-2 border-red border-solid rounded text-red hover:bg-red transition hover:text-grayDark">
            Quit
        </button>
    </PageLayout>

};

export default Settings;
