var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var TweenConfig = (function () {
        function TweenConfig() {
            this.duration = 0;
            this.repeat = 0;
            this.yoyo = false;
            this.easeType = fairygui.EaseType.QuadOut;
            this.startValue = new fairygui.TValue();
            this.endValue = new fairygui.TValue();
        }
        return TweenConfig;
    }());
    fairygui.TweenConfig = TweenConfig;
    __reflect(TweenConfig.prototype, "fairygui.TweenConfig");
})(fairygui || (fairygui = {}));
