import React, {useEffect, useState} from "react"
import {useLocation, useNavigate} from "react-router-dom";
import {useRootStore} from "../../providers/RootStoreProvider";
import {observer} from "mobx-react-lite";

interface ITab {
    title: string
    path: string
    isOn: boolean
}

const Nav = observer(() => {

    const location = useLocation();

    const navigate = useNavigate()
    const store = useRootStore();
    const [hide, setHide] = useState(false)
    // navigate.
    const tabs: ITab[] = [
        {
            title: "Translator",
            path: "/translator",
            isOn: store.config.tabs?.translator?.on || false
        },
        {
            title: "Context",
            path: "/context",
            isOn: store.config.tabs?.context?.on || false
        },
        {
            title: "Synonyms",
            path: "/synonyms",
            isOn: store.config.tabs?.synonyms?.on || false
        },
        {
            title: "SpellCheck",
            path: "/spell-check",
            isOn: store.config.tabs?.spellCheck?.on || false
        },
        {
            title: "Conjugation",
            path: "/conjugation",
            isOn: store.config.tabs?.conjugation?.on || false
        },
        {
            title: "Wikipedia",
            path: "/wikipedia",
            isOn: store.config.tabs?.wikipedia?.on || false

        }
    ]

    const [selectedTab, setSelectedTab] = useState(tabs[0])

    const navHandler = (tab: ITab) => {
        setSelectedTab(tab)
        navigate(tab.path);
        store.openPage = tab.path
    }

    useEffect(() => {
        navigate(store.openPage);
        const targetPage = tabs.find(e => e.path.includes(store.openPage))
        if (targetPage) {
            navHandler(targetPage)
        }
    }, [store.openPage])

    useEffect(() => {
        const targetTab = tabs.find(e => e.path === location.pathname)
        if (targetTab) {
            setSelectedTab(targetTab)
        }
        if (location.pathname === '/history' || location.pathname === '/settings') {
            setHide(true)
        } else {
            setHide(false)
        }
    }, [location]);

    if (hide) return <></>
    return <nav className={"pt-0 px-0 overflow-hidden"}>
        <ul className={"inline-flex flex-wrap gap-0 list-none w-full"}>
            {tabs.map((e, i) => {
                    if (e.isOn) return <li
                        key={i}
                        onClick={() => navHandler(e)}
                        className={`text-[18px] py-5 text-center border-0 flex-auto transition cursor-pointer ${e.path === selectedTab.path ? "bg-yellow text-gray" : "bg-gray hover:bg-grayDark"}`}>
                        {e.title}
                    </li>
                }
            )}
        </ul>
    </nav>

})

export default Nav

