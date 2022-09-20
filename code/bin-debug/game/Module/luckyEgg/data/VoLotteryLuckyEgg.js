var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2020-01-04 15:39:37
 */
var VoLotteryLuckyEgg = (function () {
    function VoLotteryLuckyEgg() {
    }
    Object.defineProperty(VoLotteryLuckyEgg.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.luckeggtime_295[this.id];
        },
        enumerable: true,
        configurable: true
    });
    return VoLotteryLuckyEgg;
}());
__reflect(VoLotteryLuckyEgg.prototype, "VoLotteryLuckyEgg");
