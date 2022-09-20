var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 矿藏类型
 */
var MieralType = (function () {
    function MieralType() {
    }
    MieralType.OWNER = 0; //矿主
    MieralType.ASSIST = 1; //协助
    return MieralType;
}());
__reflect(MieralType.prototype, "MieralType");
