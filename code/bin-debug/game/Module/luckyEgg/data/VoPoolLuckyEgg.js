var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 奖池数据结构
 * @author: lujiahao
 * @date: 2020-01-04 15:36:00
 */
var VoPoolLuckyEgg = (function () {
    function VoPoolLuckyEgg() {
    }
    Object.defineProperty(VoPoolLuckyEgg.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.luckegg_295[this.id];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoPoolLuckyEgg.prototype, "poolType", {
        /** 奖池类型 */
        get: function () {
            var t = this;
            if (t._poolType === undefined) {
                t._poolType = t.id % 10;
            }
            return t._poolType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoPoolLuckyEgg.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.show);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    return VoPoolLuckyEgg;
}());
__reflect(VoPoolLuckyEgg.prototype, "VoPoolLuckyEgg");
