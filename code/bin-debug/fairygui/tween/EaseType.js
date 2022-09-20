var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var EaseType = (function () {
        function EaseType() {
        }
        EaseType.Linear = 0;
        EaseType.SineIn = 1;
        EaseType.SineOut = 2;
        EaseType.SineInOut = 3;
        EaseType.QuadIn = 4;
        EaseType.QuadOut = 5;
        EaseType.QuadInOut = 6;
        EaseType.CubicIn = 7;
        EaseType.CubicOut = 8;
        EaseType.CubicInOut = 9;
        EaseType.QuartIn = 10;
        EaseType.QuartOut = 11;
        EaseType.QuartInOut = 12;
        EaseType.QuintIn = 13;
        EaseType.QuintOut = 14;
        EaseType.QuintInOut = 15;
        EaseType.ExpoIn = 16;
        EaseType.ExpoOut = 17;
        EaseType.ExpoInOut = 18;
        EaseType.CircIn = 19;
        EaseType.CircOut = 20;
        EaseType.CircInOut = 21;
        EaseType.ElasticIn = 22;
        EaseType.ElasticOut = 23;
        EaseType.ElasticInOut = 24;
        EaseType.BackIn = 25;
        EaseType.BackOut = 26;
        EaseType.BackInOut = 27;
        EaseType.BounceIn = 28;
        EaseType.BounceOut = 29;
        EaseType.BounceInOut = 30;
        EaseType.Custom = 31;
        return EaseType;
    }());
    fairygui.EaseType = EaseType;
    __reflect(EaseType.prototype, "fairygui.EaseType");
})(fairygui || (fairygui = {}));
