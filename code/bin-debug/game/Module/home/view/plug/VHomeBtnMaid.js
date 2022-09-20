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
var VHomeBtnMaid = (function (_super) {
    __extends(VHomeBtnMaid, _super);
    function VHomeBtnMaid() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    VHomeBtnMaid.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "VHomeBtnMaid"));
    };
    VHomeBtnMaid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.img = (this.getChild("img"));
        this.noticeImg = (this.getChild("noticeImg"));
    };
    Object.defineProperty(VHomeBtnMaid.prototype, "checkNotice", {
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
    VHomeBtnMaid.URL = "ui://y0plc878qeas20";
    return VHomeBtnMaid;
}(fairygui.GButton));
__reflect(VHomeBtnMaid.prototype, "VHomeBtnMaid");
