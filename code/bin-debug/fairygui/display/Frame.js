var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var Frame = (function () {
        function Frame() {
            this.addDelay = 0;
        }
        return Frame;
    }());
    fairygui.Frame = Frame;
    __reflect(Frame.prototype, "fairygui.Frame");
})(fairygui || (fairygui = {}));
