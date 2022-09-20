var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2020-03-25 11:17:26
 */
var EnumHorse = (function () {
    function EnumHorse() {
    }
    //===== 坐骑类型
    /** 类型 普通坐骑 */
    EnumHorse.TYPE_COMMON = 0;
    /** 类型 幻化坐骑 */
    EnumHorse.TYPE_HH = 1;
    return EnumHorse;
}());
__reflect(EnumHorse.prototype, "EnumHorse");
