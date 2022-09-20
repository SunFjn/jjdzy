var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var GearColorValue = (function () {
        function GearColorValue(color, strokeColor) {
            if (color === void 0) { color = 0; }
            if (strokeColor === void 0) { strokeColor = 0; }
            this.color = color;
            this.strokeColor = strokeColor;
        }
        return GearColorValue;
    }());
    fairygui.GearColorValue = GearColorValue;
    __reflect(GearColorValue.prototype, "fairygui.GearColorValue");
})(fairygui || (fairygui = {}));
