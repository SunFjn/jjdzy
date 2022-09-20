/**
 * 本地缓存工具（封装了玩家id作为key）
 * @author: lujiahao 
 * @date: 2018-05-18 17:33:28 
 */
class LocalStorageUtil {
    constructor() {
    }

    public static getItem(pKey: string): string {
        return egret.localStorage.getItem(this.roleId + "#" + pKey);
    }

    public static setItem(pKey: string, pValue: string): boolean {
        return egret.localStorage.setItem(this.roleId + "#" + pKey, pValue);
    }

    public static removeItem(pKey: string) {
        egret.localStorage.removeItem(this.roleId + "#" + pKey);
    }

    private static get roleId(): number {
        let t_userId = Model_player.voMine.id;
        if (t_userId)
            return t_userId;
        else
            return 0;
    }
}