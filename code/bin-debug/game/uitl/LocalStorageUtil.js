var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 本地缓存工具（封装了玩家id作为key）
 * @author: lujiahao
 * @date: 2018-05-18 17:33:28
 */
var LocalStorageUtil = (function () {
    function LocalStorageUtil() {
    }
    LocalStorageUtil.getItem = function (pKey) {
        return egret.localStorage.getItem(this.roleId + "#" + pKey);
    };
    LocalStorageUtil.setItem = function (pKey, pValue) {
        return egret.localStorage.setItem(this.roleId + "#" + pKey, pValue);
    };
    LocalStorageUtil.removeItem = function (pKey) {
        egret.localStorage.removeItem(this.roleId + "#" + pKey);
    };
    Object.defineProperty(LocalStorageUtil, "roleId", {
        get: function () {
            var t_userId = Model_player.voMine.id;
            if (t_userId)
                return t_userId;
            else
                return 0;
        },
        enumerable: true,
        configurable: true
    });
    return LocalStorageUtil;
}());
__reflect(LocalStorageUtil.prototype, "LocalStorageUtil");
