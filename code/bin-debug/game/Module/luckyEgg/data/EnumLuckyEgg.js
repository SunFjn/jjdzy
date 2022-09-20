var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2020-01-09 10:39:59
 */
var EnumLuckyEgg = (function () {
    function EnumLuckyEgg() {
    }
    /** 最大的抽奖次数 */
    EnumLuckyEgg.MAX_LOTTERY_COUNT = 7;
    return EnumLuckyEgg;
}());
__reflect(EnumLuckyEgg.prototype, "EnumLuckyEgg");
