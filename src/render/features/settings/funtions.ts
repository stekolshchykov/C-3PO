import {IConfig, IHotKey} from "../../../type";

export const hotKeyStringToObj = (config: IConfig, page: string): IHotKey[] => {
    const keyStr = config.hotKeys.find(e => e.page === page)
    let result: IHotKey[] = []
    if (keyStr) {
        result = keyStr.key.split("+").map(e => {
            return {
                name: e,
                code: 0
            }
        })
    }
    return result
}
