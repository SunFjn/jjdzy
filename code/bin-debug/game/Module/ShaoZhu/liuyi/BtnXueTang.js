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
var BtnXueTang = (function (_super) {
    __extends(BtnXueTang, _super);
    function BtnXueTang() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    BtnXueTang.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhu", "BtnXueTang"));
    };
    BtnXueTang.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Object.defineProperty(BtnXueTang.prototype, "vo", {
        set: function (v) {
            var s = this;
            IconUtil.setImg(s.imgBg, Enum_Path.SHAOZHU_URL + "pic" + v.xtId + ".png");
            s.imgBg.grayed = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BtnXueTang.prototype, "cfg", {
        set: function (v) {
            var s = this;
            IconUtil.setImg(s.imgBg, Enum_Path.SHAOZHU_URL + "pic" + v.id + ".png");
            s.imgBg.grayed = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BtnXueTang.prototype, "checkNotice", {
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
    BtnXueTang.URL = "ui://p83wyb2bkc1n2b";
    return BtnXueTang;
}(fairygui.GButton));
__reflect(BtnXueTang.prototype, "BtnXueTang");
