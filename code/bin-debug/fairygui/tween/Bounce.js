var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var Bounce = (function () {
        function Bounce() {
        }
        Bounce.easeIn = function (time, duration) {
            return 1 - Bounce.easeOut(duration - time, duration);
        };
        Bounce.easeOut = function (time, duration) {
            if ((time /= duration) < (1 / 2.75)) {
                return (7.5625 * time * time);
            }
            if (time < (2 / 2.75)) {
                return (7.5625 * (time -= (1.5 / 2.75)) * time + 0.75);
            }
            if (time < (2.5 / 2.75)) {
                return (7.5625 * (time -= (2.25 / 2.75)) * time + 0.9375);
            }
            return (7.5625 * (time -= (2.625 / 2.75)) * time + 0.984375);
        };
        Bounce.easeInOut = function (time, duration) {
            if (time < duration * 0.5) {
                return Bounce.easeIn(time * 2, duration) * 0.5;
            }
            return Bounce.easeOut(time * 2 - duration, duration) * 0.5 + 0.5;
        };
        return Bounce;
    }());
    fairygui.Bounce = Bounce;
    __reflect(Bounce.prototype, "fairygui.Bounce");
})(fairygui || (fairygui = {}));
