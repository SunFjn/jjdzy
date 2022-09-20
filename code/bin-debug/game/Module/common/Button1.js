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
var Button1 = (function (_super) {
    __extends(Button1, _super);
    function Button1() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    Button1.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "Button1"));
    };
    Button1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
        this.noticeImg.visible = false;
    };
    Object.defineProperty(Button1.prototype, "checkNotice", {
        get: function () {
            return this._checkNotice;
        },
        set: function (value) {
            if (this._checkNotice != value) {
                this._checkNotice = value;
                this.noticeImg.visible = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Button1.URL = "ui://jvxpx9emy1z8l";
    return Button1;
}(fairygui.GButton));
__reflect(Button1.prototype, "Button1");
