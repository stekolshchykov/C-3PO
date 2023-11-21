import React, {useEffect, useState} from "react"
import PageLayout from "../../components/PageLasyout";
import TranslatorButtons from "../../components/TranslatorButtons";

const History = () => {

    const [history, setHistory] = useState<string[]>([])

    useEffect(() => {
        window?.electronAPI?.store(JSON.stringify({
            type: "historyGetAll"
        })).then(result => setHistory(result))
    }, []);

    return <PageLayout title={"History"}>
        <ul className={"mt-[-10px] p-0 m-0 mix-w-[10%] max-w-[100%] overflow-hidden list-none"}>
            {history?.reverse()?.map((d, i) => <li className={"relative w-[100%]"} key={i}>
                <div className={`pb-6 pt-6`}>
                    <TranslatorButtons text={d}/>
                    {d}
                </div>
                <hr className="h-[1px] bg-green-500"/>
            </li>)}
        </ul>
    </PageLayout>
}

export default History