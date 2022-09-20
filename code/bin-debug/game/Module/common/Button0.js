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
var Button0 = (function (_super) {
    __extends(Button0, _super);
    function Button0() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    Button0.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "Button0"));
    };
    Button0.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
    };
    Object.defineProperty(Button0.prototype, "checkNotice", {
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
    Button0.URL = "ui://jvxpx9emy1z8b";
    return Button0;
}(fairygui.GButton));
__reflect(Button0.prototype, "Button0");
