var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ARPGUtils = (function () {
    function ARPGUtils() {
    }
    /**
     * 触点 x1,y1
     * 目标坐标 x2,y2 height width
     *
     * */
    ARPGUtils.hitTestPoint = function (x1, y1, x2, y2, height, wid) {
        if (wid === void 0) { wid = 100; }
        var ret = false;
        return ret;
    };
    return ARPGUtils;
}());
__reflect(ARPGUtils.prototype, "ARPGUtils");
