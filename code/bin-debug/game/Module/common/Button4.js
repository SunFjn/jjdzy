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
var Button4 = (function (_super) {
    __extends(Button4, _super);
    function Button4() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    Button4.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "Button4"));
    };
    Button4.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
        // this.getTextField().stroke = 0.8;
    };
    Object.defineProperty(Button4.prototype, "checkNotice", {
        get: function () {
            return this._checkNotice;
        },
        set: function (value) {
            this._checkNotice = value;
            this.noticeImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Button4.URL = "ui://jvxpx9emiqo83ch";
    return Button4;
}(fairygui.GButton));
__reflect(Button4.prototype, "Button4");
