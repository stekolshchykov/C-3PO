import React, {useState} from "react"

const Nav = () => {

    const tabs = ["Translator", "Context", "Synonyms", "SpellCheck", "Conjugation"]
    const [selectedTab, setSelectedTab] = useState(tabs[0])

    return <nav className={"pt-4 px-2"}>
        <ul className={"inline-flex flex-wrap gap-2 list-none"}>
            {tabs.map(e =>
                <li
                    onClick={() => setSelectedTab(e)}
                    className={`py-2 px-4 border-0 rounded transition cursor-pointer ${e === selectedTab ? "bg-yellow text-gray" : "bg-gray hover:bg-grayDark"}`}>
                    {e}
                </li>
            )}
        </ul>
    </nav>

}

export default Nav

