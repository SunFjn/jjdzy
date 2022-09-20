var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EnumMapType = (function () {
    function EnumMapType() {
    }
    EnumMapType.WDTX = 5;
    EnumMapType.BOSSZC_LOCAL = 6;
    EnumMapType.BOSSZC_CROSS = 7;
    EnumMapType.SANGUO_YT = 8;
    EnumMapType.LIANGCAO = 9; //粮草
    EnumMapType.SYZLB = 10; //三英战吕布
    EnumMapType.YANHUI = 11; //宴会
    EnumMapType.HOME = 12; //家园
    EnumMapType.HOME_JD = 13; //家丁
    return EnumMapType;
}());
__reflect(EnumMapType.prototype, "EnumMapType");
