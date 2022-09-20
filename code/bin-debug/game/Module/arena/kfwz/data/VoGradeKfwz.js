var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跨服王者段位数据结构
 * @author: lujiahao
 * @date: 2019-12-07 14:48:59
 */
var VoGradeKfwz = (function () {
    function VoGradeKfwz() {
    }
    Object.defineProperty(VoGradeKfwz.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.kfwzdw_770[this.id];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoGradeKfwz.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.jl);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    return VoGradeKfwz;
}());
__reflect(VoGradeKfwz.prototype, "VoGradeKfwz");
