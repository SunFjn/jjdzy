var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-10-21 10:50:52
 */
var CfgLevelQice = (function () {
    function CfgLevelQice() {
    }
    Object.defineProperty(CfgLevelQice.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.qcsj_760[this.id];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgLevelQice.prototype, "consumeList", {
        /** 升级消耗 */
        get: function () {
            if (this._consumeList === undefined) {
                this._consumeList = ConfigHelp.makeItemListArr(this.cfg.xh);
            }
            return this._consumeList;
        },
        enumerable: true,
        configurable: true
    });
    return CfgLevelQice;
}());
__reflect(CfgLevelQice.prototype, "CfgLevelQice");
