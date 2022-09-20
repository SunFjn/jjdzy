var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var GTween = (function () {
        function GTween() {
        }
        GTween.to = function (start, end, duration) {
            return fairygui.TweenManager.createTween()._to(start, end, duration);
        };
        GTween.to2 = function (start, start2, end, end2, duration) {
            return fairygui.TweenManager.createTween()._to2(start, start2, end, end2, duration);
        };
        GTween.to3 = function (start, start2, start3, end, end2, end3, duration) {
            return fairygui.TweenManager.createTween()._to3(start, start2, start3, end, end2, end3, duration);
        };
        GTween.to4 = function (start, start2, start3, start4, end, end2, end3, end4, duration) {
            return fairygui.TweenManager.createTween()._to4(start, start2, start3, start4, end, end2, end3, end4, duration);
        };
        GTween.toColor = function (start, end, duration) {
            return fairygui.TweenManager.createTween()._toColor(start, end, duration);
        };
        GTween.delayedCall = function (delay) {
            return fairygui.TweenManager.createTween().setDelay(delay);
        };
        GTween.shake = function (startX, startY, amplitude, duration) {
            return fairygui.TweenManager.createTween()._shake(startX, startY, amplitude, duration);
        };
        GTween.isTweening = function (target, propType) {
            return fairygui.TweenManager.isTweening(target, propType);
        };
        GTween.kill = function (target, complete, propType) {
            if (complete === void 0) { complete = false; }
            if (propType === void 0) { propType = null; }
            fairygui.TweenManager.killTweens(target, false, null);
        };
        GTween.getTween = function (target, propType) {
            if (propType === void 0) { propType = null; }
            return fairygui.TweenManager.getTween(target, propType);
        };
        GTween.catchCallbackExceptions = true;
        return GTween;
    }());
    fairygui.GTween = GTween;
    __reflect(GTween.prototype, "fairygui.GTween");
})(fairygui || (fairygui = {}));
