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
var Button2 = (function (_super) {
    __extends(Button2, _super);
    function Button2() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    Button2.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "Button2"));
    };
    Button2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
    };
    Object.defineProperty(Button2.prototype, "checkNotice", {
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
    Button2.prototype.scalRed = function () {
        this.noticeImg.x = -10; //按钮scaleX = -1 时需要把红点倒转下
    };
    Button2.prototype.setNoticeXY = function (_x, _y) {
        this.noticeImg.setXY(_x, _y);
    };
    Button2.URL = "ui://jvxpx9emc14z16";
    return Button2;
}(fairygui.GButton));
__reflect(Button2.prototype, "Button2");
