var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var TValue = (function () {
        function TValue() {
            this.f1 = this.f2 = this.f3 = this.f4 = 0;
            this.b1 = this.b2 = true;
        }
        return TValue;
    }());
    fairygui.TValue = TValue;
    __reflect(TValue.prototype, "fairygui.TValue");
})(fairygui || (fairygui = {}));
