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
var VCountryBtn = (function (_super) {
    __extends(VCountryBtn, _super);
    function VCountryBtn() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    VCountryBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "VCountryBtn"));
    };
    VCountryBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.img = (this.getChild("img"));
        this.noticeImg = (this.getChild("noticeImg"));
        this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    VCountryBtn.prototype.onRemove = function () {
        IconUtil.setImg(this.img, null);
    };
    VCountryBtn.prototype.setIcon = function (v) {
        // ImageLoader.instance.loader(Enum_Path.BACK_URL + "county" + v + ".jpg", this.img);
        IconUtil.setImg(this.img, Enum_Path.BACK_URL + "county" + v + ".jpg");
    };
    Object.defineProperty(VCountryBtn.prototype, "checkNotice", {
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
    VCountryBtn.URL = "ui://uwzc58njiala1t";
    return VCountryBtn;
}(fairygui.GButton));
__reflect(VCountryBtn.prototype, "VCountryBtn");
