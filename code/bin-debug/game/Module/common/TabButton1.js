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
var TabButton1 = (function (_super) {
    __extends(TabButton1, _super);
    function TabButton1() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    TabButton1.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "TabButton1"));
    };
    TabButton1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
    };
    Object.defineProperty(TabButton1.prototype, "checkNotice", {
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
    TabButton1.URL = "ui://jvxpx9emtli03cv";
    return TabButton1;
}(fairygui.GButton));
__reflect(TabButton1.prototype, "TabButton1");
