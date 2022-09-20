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
var Tip = (function (_super) {
    __extends(Tip, _super);
    function Tip() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    Tip.prototype.initView = function () { };
    Tip.prototype.show = function (obj, type) {
        if (type === void 0) { type = 1; }
        throw new Error("abstract function must override");
    };
    Tip.prototype.clear = function () {
        if (this.parent)
            this.parent.removeChild(this);
    };
    Tip.prototype.constructFromXML = function (xml) {
        this.closeButton = (this.getChild("closeButton"));
        if (!this.closeButton) {
            var frame = (this.getChild("frame"));
            if (frame) {
                this.closeButton = (frame.getChild("closeButton"));
            }
        }
        if (this.closeButton) {
            this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseView, this);
        }
    };
    Tip.prototype.onCloseView = function (event) {
        TipManager.hide();
    };
    return Tip;
}(fairygui.GComponent));
__reflect(Tip.prototype, "Tip");
