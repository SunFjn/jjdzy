var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DEBUGWARING = (function () {
    function DEBUGWARING() {
    }
    DEBUGWARING.log = function (str) {
        if (true) {
            console.log(str);
            // ViewCommonWarn.text(str);
        }
    };
    return DEBUGWARING;
}());
__reflect(DEBUGWARING.prototype, "DEBUGWARING");
