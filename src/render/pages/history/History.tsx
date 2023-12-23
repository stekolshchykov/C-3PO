import React from "react"
import PageLayout from "../../components/PageLasyout";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../../providers/RootStoreProvider";

const History = observer(() => {

    const store = useRootStore();
    const dateFromTime = (time: number): string => {
        const date = new Date(time)
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDay()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        return `${day}/${month}/${year} ${hour}:${minute}:${second}`
    }

    let history = store.history
    if (store.history.length > 1) {
        history = store.history.slice().reverse()
    }

    return <PageLayout title={"History"}>
        <button
            onClick={store.clearHistory}
            className="p-3 border-2 border-red border-solid rounded text-red hover:bg-red transition hover:text-grayDark">
            Clear history
        </button>
        <ul className={"mt-[-10px] p-0 m-0 mix-w-[10%] max-w-[100%] overflow-hidden list-none"}>
            {history.map((d, i) => <li className={"relative w-[100%]"} key={i}>
                <div className={`pb-6 pt-6`}>
                    <div className={"mb-1 text-xs text-whiteDark"}>{dateFromTime(d.time)}</div>
                    {d.text}
                </div>
                <hr className="h-[1px] bg-green-500"/>
            </li>)}
        </ul>
    </PageLayout>
})

export default History
