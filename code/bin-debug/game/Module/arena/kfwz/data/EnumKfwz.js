var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跨服王者相关枚举
 * @author: lujiahao
 * @date: 2019-12-09 17:41:38
 */
var EnumKfwz = (function () {
    function EnumKfwz() {
    }
    /** 活动持续时间 s */
    EnumKfwz.ACT_LAST_TIME = 3600;
    return EnumKfwz;
}());
__reflect(EnumKfwz.prototype, "EnumKfwz");
