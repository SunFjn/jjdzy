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
var TabButton2 = (function (_super) {
    __extends(TabButton2, _super);
    function TabButton2() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    TabButton2.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "TabButton2"));
    };
    TabButton2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
    };
    Object.defineProperty(TabButton2.prototype, "checkNotice", {
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
    TabButton2.URL = "ui://jvxpx9em6hpm3ft";
    return TabButton2;
}(fairygui.GButton));
__reflect(TabButton2.prototype, "TabButton2");
