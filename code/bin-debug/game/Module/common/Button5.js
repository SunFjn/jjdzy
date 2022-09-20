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
var Button5 = (function (_super) {
    __extends(Button5, _super);
    function Button5() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    Button5.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "Button5"));
    };
    Button5.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
    };
    Object.defineProperty(Button5.prototype, "checkNotice", {
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
    Button5.prototype.scalRed = function () {
        this.noticeImg.x = -10; //按钮scaleX = -1 时需要把红点倒转下
    };
    Button5.prototype.setNoticeXY = function (_x, _y) {
        this.noticeImg.setXY(_x, _y);
    };
    Button5.URL = "ui://jvxpx9emfy1c3fz";
    return Button5;
}(fairygui.GButton));
__reflect(Button5.prototype, "Button5");
