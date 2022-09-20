var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-10-23 15:36:50
 */
var EnumQice = (function () {
    function EnumQice() {
    }
    /** 魂类型 兵魂 */
    EnumQice.HUN_TYPE_BH = 1;
    /** 魂类型 将魂 */
    EnumQice.HUN_TYPE_JH = 2;
    return EnumQice;
}());
__reflect(EnumQice.prototype, "EnumQice");
