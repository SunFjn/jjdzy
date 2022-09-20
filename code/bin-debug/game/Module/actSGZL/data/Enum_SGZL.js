var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-09-20 12:01:54
 */
var Enum_SGZL = (function () {
    function Enum_SGZL() {
    }
    /** 状态 不可领 */
    Enum_SGZL.STATE_NONE = 0;
    /** 状态 可以领取 */
    Enum_SGZL.STATE_CAN_GET = 1;
    /** 状态 已领取 */
    Enum_SGZL.SATTE_DONE = 2;
    return Enum_SGZL;
}());
__reflect(Enum_SGZL.prototype, "Enum_SGZL");
