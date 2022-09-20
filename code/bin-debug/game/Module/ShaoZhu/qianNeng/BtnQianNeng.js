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
var BtnQianNeng = (function (_super) {
    __extends(BtnQianNeng, _super);
    function BtnQianNeng() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    BtnQianNeng.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhu", "BtnQianNeng"));
    };
    BtnQianNeng.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
    };
    Object.defineProperty(BtnQianNeng.prototype, "checkNotice", {
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
    BtnQianNeng.URL = "ui://p83wyb2bo89h3z";
    return BtnQianNeng;
}(fairygui.GButton));
__reflect(BtnQianNeng.prototype, "BtnQianNeng");
