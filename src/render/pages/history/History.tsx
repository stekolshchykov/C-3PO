import React from "react"
import PageLayout from "../../components/PageLasyout";
import TranslatorButtons from "../../components/TranslatorButtons";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../../providers/RootStoreProvider";

const History = observer(() => {

    const store = useRootStore();


    return <PageLayout title={"History"}>
        <button
            onClick={store.clearHistory}
            className="p-3 border-2 border-red border-solid rounded text-red hover:bg-red transition hover:text-grayDark">
            Clear history
        </button>
        <ul className={"mt-[-10px] p-0 m-0 mix-w-[10%] max-w-[100%] overflow-hidden list-none"}>
            {store.history.map((d, i) => <li className={"relative w-[100%]"} key={i}>
                <div className={`pb-6 pt-6`}>
                    <TranslatorButtons text={d}/>
                    {d}
                </div>
                <hr className="h-[1px] bg-green-500"/>
            </li>)}
        </ul>
    </PageLayout>
})

export default History
