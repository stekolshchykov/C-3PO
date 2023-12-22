import React from "react";
import PageLayout from "../../components/PageLasyout";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../../providers/RootStoreProvider";
import KeyCapture from "../../components/KeyCapture";
import {hotKeyStringToObj} from "./funtions";
import Select from "../../components/Select";
import Input from "../../UI/Input";

const Settings = observer(() => {

    const store = useRootStore();

    const translatorHotKey = hotKeyStringToObj(store.config, "translator")
    const contextHotKey = hotKeyStringToObj(store.config, "context")
    const synonymsHotKey = hotKeyStringToObj(store.config, "synonyms")
    const spellCheckHotKey = hotKeyStringToObj(store.config, "spell-check")
    const conjugationHotKey = hotKeyStringToObj(store.config, "conjugation")
    const historyHotKey = hotKeyStringToObj(store.config, "history")
    const settingsHotKey = hotKeyStringToObj(store.config, "settings")
    const wikipediaHotKey = hotKeyStringToObj(store.config, "wikipedia")

    return <PageLayout title={"Settings"}>
        <div className={"grid gap-10"}>

            <section className={"grid gap-3"}>
                <div className={"text-2xl mb-2"}>General</div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Load clipboard on launch</div>
                        <div className={"text-sm"}>Loads the clipboard contents into the program when it launches.</div>
                    </div>
                    <div className={"flex align-middle m-auto"}>
                        <Select initValue={store.config.autoStart} onClick={(e) => store.config.autoStart = e}/>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Windows width</div>
                        <div className={"text-sm"}>Customize program window width.</div>
                    </div>
                    <div className={"flex align-middle m-auto w-[80px]"}>
                        <Input
                            forceValue={store.config.windowWidth}
                            width={100}
                            max={1500}
                            min={500}
                            placeholder={"730"}
                            type={"number"}
                            onChange={(text) => {
                                let n = +text
                                if (n < 500) n = 500
                                if (n > 1500) n = 1500
                                store.config.windowWidth = n
                            }}/>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Windows height</div>
                        <div className={"text-sm"}>Customize program window height.</div>
                    </div>
                    <div className={"flex align-middle m-auto w-[80px]"}>
                        <Input
                            type={"number"}
                            forceValue={store.config.windowHeight}
                            width={100}
                            placeholder={"600"}
                            max={1000}
                            min={300}
                            onChange={(text) => {
                                let n = +text
                                if (n < 300) n = 300
                                if (n > 1000) n = 1000
                                store.config.windowHeight = n
                            }}/>
                    </div>
                </div>
                {/*
                TODO: position mode
            */}
            </section>

            <section className={"grid gap-3"}>
                <div className={"text-2xl mb-2"}>Translator</div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Enable/disable section</div>
                        <div className={"text-sm"}>Toggles the visibility of the section.</div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs.translator.on}
                                    onClick={(e) => store.config.tabs.translator.on = e}/>
                        </div>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr] gap-2"}>
                    <div>
                        <div className={"text-lg"}>Hotkey</div>
                        <div className={"text-sm"}>Assign a hotkey for instant translation.</div>
                    </div>
                    <div>
                        <KeyCapture hotKeys={translatorHotKey}
                                    onChangeHandler={(e) => store.addHotKey(e, "translator")}/>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Load clipboard on launch</div>
                        <div className={"text-sm"}>Loads the clipboard contents into the program when it launches.</div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs.translator.autofill}
                                    onClick={(e) => store.config.tabs.translator.autofill = e}/>
                        </div>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Paste processed data to clipboard</div>
                        <div className={"text-sm"}>Pastes the processed data into the clipboard.</div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs.translator.autofillOut}
                                    onClick={(e) => store.config.tabs.translator.autofillOut = e}/>
                        </div>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Reverse translation</div>
                        <div className={"text-sm"}>Automatically translate even if the language directions are
                            incorrect
                        </div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs.translator.isReverse}
                                    onClick={(e) => store.config.tabs.translator.isReverse = e}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className={"grid gap-3"}>
                <div className={"text-2xl mb-2"}>Context</div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Enable/disable section</div>
                        <div className={"text-sm"}>Toggles the visibility of the section.</div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs.context.on}
                                    onClick={(e) => store.config.tabs.context.on = e}/>
                        </div>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr] gap-2"}>
                    <div>
                        <div className={"text-lg"}>Hotkey</div>
                        <div className={"text-sm"}>Assign a hotkey for instant context.</div>
                    </div>
                    <div className={""}>
                        <KeyCapture hotKeys={contextHotKey} onChangeHandler={(e) => store.addHotKey(e, "context")}/>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Load clipboard on launch</div>
                        <div className={"text-sm"}>Loads the clipboard contents into the program when it launches.</div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs.context.autofill}
                                    onClick={(e) => store.config.tabs.context.autofill = e}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className={"grid gap-3"}>
                <div className={"text-2xl mb-2"}>Synonyms</div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Enable/disable section</div>
                        <div className={"text-sm"}>Toggles the visibility of the section.</div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs.synonyms.on}
                                    onClick={(e) => store.config.tabs.synonyms.on = e}/>
                        </div>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr] gap-2"}>
                    <div>
                        <div className={"text-lg"}>Hotkey</div>
                        <div className={"text-sm"}>Assign a hotkey for instant synonyms.</div>
                    </div>
                    <div className={""}>
                        <KeyCapture hotKeys={synonymsHotKey} onChangeHandler={(e) => store.addHotKey(e, "synonyms")}/>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Load clipboard on launch</div>
                        <div className={"text-sm"}>Loads the clipboard contents into the program when it launches.</div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs.synonyms.autofill}
                                    onClick={(e) => store.config.tabs.synonyms.autofill = e}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className={"grid gap-3"}>
                <div className={"text-2xl mb-2"}>SpellCheck</div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Enable/disable section</div>
                        <div className={"text-sm"}>Toggles the visibility of the section.</div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs.spellCheck.on}
                                    onClick={(e) => store.config.tabs.spellCheck.on = e}/>
                        </div>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr] gap-2"}>
                    <div>
                        <div className={"text-lg"}>Hotkey</div>
                        <div className={"text-sm"}>Assign a hotkey for instant spell check.</div>
                    </div>
                    <div className={""}>
                        <KeyCapture hotKeys={spellCheckHotKey}
                                    onChangeHandler={(e) => store.addHotKey(e, "spell-check")}/>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Load clipboard on launch</div>
                        <div className={"text-sm"}>Loads the clipboard contents into the program when it launches.</div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs.spellCheck.autofill}
                                    onClick={(e) => store.config.tabs.spellCheck.autofill = e}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className={"grid gap-3"}>
                <div className={"text-2xl mb-2"}>Conjugation</div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Enable/disable section</div>
                        <div className={"text-sm"}>Toggles the visibility of the section.</div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs.conjugation.on}
                                    onClick={(e) => store.config.tabs.conjugation.on = e}/>
                        </div>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr] gap-2"}>
                    <div>
                        <div className={"text-lg"}>Hotkey</div>
                        <div className={"text-sm"}>Assign a hotkey for instant conjugation.</div>
                    </div>
                    <div className={""}>
                        <KeyCapture hotKeys={conjugationHotKey}
                                    onChangeHandler={(e) => store.addHotKey(e, "conjugation")}/>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Load clipboard on launch</div>
                        <div className={"text-sm"}>Loads the clipboard contents into the program when it launches.</div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs.conjugation.autofill}
                                    onClick={(e) => store.config.tabs.conjugation.autofill = e}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className={"grid gap-3"}>
                <div className={"text-2xl mb-2"}>Wikipedia</div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Enable/disable section</div>
                        <div className={"text-sm"}>Toggles the visibility of the section.</div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs?.wikipedia?.on || false}
                                    onClick={(e) => {
                                        // @ts-ignore
                                        store.config.tabs?.wikipedia?.on = e
                                    }}/>
                        </div>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr] gap-2"}>
                    <div>
                        <div className={"text-lg"}>Hotkey</div>
                        <div className={"text-sm"}>Assign a hotkey for instant wikipedia.</div>
                    </div>
                    <div className={""}>
                        <KeyCapture hotKeys={wikipediaHotKey}
                                    onChangeHandler={(e) => store.addHotKey(e, "wikipedia")}/>
                    </div>
                </div>
                <div className={"grid grid-cols-[1fr_min-content] items-center"}>
                    <div>
                        <div className={"text-lg"}>Load clipboard on launch</div>
                        <div className={"text-sm"}>Loads the clipboard contents into the program when it launches.</div>
                    </div>
                    <div className={""}>
                        <div className={"flex align-middle m-auto"}>
                            <Select initValue={store.config.tabs.wikipedia.autofill}
                                    onClick={(e) => store.config.tabs.wikipedia.autofill = e}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className={"grid gap-3"}>
                <div className={"text-2xl mb-2"}>History</div>
                <div className={"grid grid-cols-[1fr] gap-2"}>
                    <div>
                        <div className={"text-lg"}>Hotkey</div>
                        <div className={"text-sm"}>Assign a hotkey for instant history.</div>
                    </div>
                    <div className={""}>
                        <KeyCapture hotKeys={historyHotKey} onChangeHandler={(e) => store.addHotKey(e, "history")}/>
                    </div>
                </div>
            </section>

            <section className={"grid gap-3"}>
                <div className={"text-2xl mb-2"}>Settings</div>
                <div className={"grid grid-cols-[1fr] gap-2"}>
                    <div>
                        <div className={"text-lg"}>Hotkey</div>
                        <div className={"text-sm"}>Assign a hotkey for instant settings.</div>
                    </div>
                    <div className={""}>
                        <KeyCapture hotKeys={settingsHotKey} onChangeHandler={(e) => store.addHotKey(e, "settings")}/>
                    </div>
                </div>
            </section>

            <section className={"grid gap-3"}>
                <button
                    onClick={() => store.resetConfig()}
                    className="text-base p-3 border-2 border-red border-solid rounded text-red hover:bg-red transition hover:text-grayDark w-full">
                    Reset config
                </button>
                <button
                    onClick={() => store.mainCommand("quitFromAppHandler")}
                    className="text-base p-3 border-2 border-red border-solid rounded text-red hover:bg-red transition hover:text-grayDark w-full">
                    Quit
                </button>
            </section>

        </div>
    </PageLayout>

})

export default Settings;
