import React, {useState} from "react"
import {useNavigate} from "react-router-dom";

interface ITab {
    title: string
    path: string
}

const Nav = () => {

    const navigate = useNavigate()

    const tabs: ITab[] = [
        {
            title: "Translator",
            path: "/"
        },
        {
            title: "Context",
            path: "/context"
        },
        {
            title: "Synonyms",
            path: "/synonyms"
        },
        {
            title: "SpellCheck",
            path: "/spell-check"
        },
        {
            title: "Conjugation",
            path: "/conjugation"
        }
    ]
    const [selectedTab, setSelectedTab] = useState(tabs[0])

    const navHandler = (tab: ITab) => {
        setSelectedTab(tab)
        navigate(tab.path);
    }

    return <nav className={"pt-4 px-2"}>
        <ul className={"inline-flex flex-wrap gap-2 list-none"}>
            {tabs.map((e, i) =>
                <li
                    key={i}
                    onClick={() => navHandler(e)}
                    className={`py-2 px-4 border-0 rounded transition cursor-pointer ${e.path === selectedTab.path ? "bg-yellow text-gray" : "bg-gray hover:bg-grayDark"}`}>
                    {e.title}
                </li>
            )}
        </ul>
    </nav>

}

export default Nav

