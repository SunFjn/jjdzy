var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-10-21 10:49:02
 */
var CfgStarQice = (function () {
    function CfgStarQice() {
    }
    Object.defineProperty(CfgStarQice.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.qcsx_760[this.id];
        },
        enumerable: true,
        configurable: true
    });
    return CfgStarQice;
}());
__reflect(CfgStarQice.prototype, "CfgStarQice");
