var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var fairygui;
(function (fairygui) {
    var DropEvent = (function (_super) {
        __extends(DropEvent, _super);
        function DropEvent(type, source) {
            if (source === void 0) { source = null; }
            var _this = _super.call(this, type, false) || this;
            _this.source = source;
            return _this;
        }
        DropEvent.DROP = "__drop";
        return DropEvent;
    }(egret.Event));
    fairygui.DropEvent = DropEvent;
    __reflect(DropEvent.prototype, "fairygui.DropEvent");
})(fairygui || (fairygui = {}));
