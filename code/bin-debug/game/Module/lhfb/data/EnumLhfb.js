var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2020-03-02 10:16:31
 */
var EnumLhfb = (function () {
    function EnumLhfb() {
    }
    /** 副本数量 跟轮回id最大值一致 */
    EnumLhfb.COPY_COUNT = 10;
    /** 最大星数 */
    EnumLhfb.MAX_STAR = 5;
    return EnumLhfb;
}());
__reflect(EnumLhfb.prototype, "EnumLhfb");
