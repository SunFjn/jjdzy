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
var BtnLiuYi = (function (_super) {
    __extends(BtnLiuYi, _super);
    function BtnLiuYi() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    BtnLiuYi.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhu", "BtnLiuYi"));
    };
    BtnLiuYi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Object.defineProperty(BtnLiuYi.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            this._vo = v;
            if (v) {
                IconUtil.setImg(this.img, Enum_Path.SHAOZHU_URL + v.lyId + "s.png");
                IconUtil.setImg(this.imgBg, Enum_Path.SHAOZHU_URL + v.lyId + ".png");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BtnLiuYi.prototype, "lyId", {
        get: function () {
            return this._lyId;
        },
        set: function (v) {
            this._lyId = v;
            IconUtil.setImg(this.img, Enum_Path.SHAOZHU_URL + v + "s.png");
            IconUtil.setImg(this.imgBg, Enum_Path.SHAOZHU_URL + v + ".png");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BtnLiuYi.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (v) {
            var s = this;
            s._open = v;
            this.imgBg.grayed = !v;
            this.img.grayed = !v;
        },
        enumerable: true,
        configurable: true
    });
    BtnLiuYi.prototype.clean = function () {
        _super.prototype.clean.call(this);
        IconUtil.setImg(this.img, null);
        IconUtil.setImg(this.imgBg, null);
    };
    Object.defineProperty(BtnLiuYi.prototype, "checkNotice", {
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
    BtnLiuYi.URL = "ui://p83wyb2bad1l1y";
    return BtnLiuYi;
}(fairygui.GButton));
__reflect(BtnLiuYi.prototype, "BtnLiuYi");
