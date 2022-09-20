var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils;
(function (Utils) {
    var DisplayUtil = (function () {
        function DisplayUtil() {
        }
        DisplayUtil.addPop = function (disObj) {
            if (disObj) {
                disObj["scaleBefore"] = { x: disObj.scaleX, y: disObj.scaleY };
                disObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
            }
        };
        DisplayUtil.onBegin = function (evt) {
            var tar = evt.currentTarget;
            tar.scaleX = tar["scaleBefore"].x * 1.05;
            tar.scaleY = tar["scaleBefore"].y * 1.05;
            tar.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            tar.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
        };
        DisplayUtil.onEnd = function (evt) {
            var tar = evt.currentTarget;
            tar.scaleX = tar["scaleBefore"].x;
            tar.scaleY = tar["scaleBefore"].y;
            tar.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            tar.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
        };
        return DisplayUtil;
    }());
    Utils.DisplayUtil = DisplayUtil;
    __reflect(DisplayUtil.prototype, "Utils.DisplayUtil");
})(Utils || (Utils = {}));
