var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var GearLookValue = (function () {
        function GearLookValue(alpha, rotation, grayed, touchable) {
            if (alpha === void 0) { alpha = 0; }
            if (rotation === void 0) { rotation = 0; }
            if (grayed === void 0) { grayed = false; }
            if (touchable === void 0) { touchable = true; }
            this.alpha = alpha;
            this.rotation = rotation;
            this.grayed = grayed;
            this.touchable = touchable;
        }
        return GearLookValue;
    }());
    fairygui.GearLookValue = GearLookValue;
    __reflect(GearLookValue.prototype, "fairygui.GearLookValue");
})(fairygui || (fairygui = {}));
