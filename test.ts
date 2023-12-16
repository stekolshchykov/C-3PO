import Store from "electron-store";

const store = new Store()
const main = async () => {
    const config = await store.get("config")
    console.log(config)
}
main()
