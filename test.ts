// import Store from "electron-store";
//
// const store = new Store()
// const main = async () => {
//     const config = await store.get("config")
//     console.log(config)
// }
// main()

import wiki from 'wikipedia';

(async () => {
    try {
        const page = await wiki.page('хтмл');
        console.log(page);
        //Response of type @Page object
        // const summary = await page.summary();
        // const images = await page.images();
        const intro = await page.intro();
        // console.log(summary);
        // console.log(images);
        console.log(intro);
        //Response of type @wikiSummary - contains the intro and the main image
    } catch (error) {
        console.log(error);
        //=> Typeof wikiError
    }
})();
