var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-11-07 18:22:23
 */
var EnumAchievement = (function () {
    function EnumAchievement() {
    }
    /** 状态 不可领 */
    EnumAchievement.STATE_NONE = 0;
    /** 状态 可以领取 */
    EnumAchievement.STATE_CAN_GET = 1;
    /** 状态 已领取 */
    EnumAchievement.SATTE_DONE = 2;
    return EnumAchievement;
}());
__reflect(EnumAchievement.prototype, "EnumAchievement");
