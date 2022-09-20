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
var VZhenYanBtnBig = (function (_super) {
    __extends(VZhenYanBtnBig, _super);
    function VZhenYanBtnBig() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    VZhenYanBtnBig.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "VZhenYanBtnBig"));
    };
    VZhenYanBtnBig.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    Object.defineProperty(VZhenYanBtnBig.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (v) {
            var s = this;
            s._data = v;
            IconUtil.setImg(s.img, Enum_Path.ZHENYAN_URL + "zhyXin.png");
            IconUtil.setImg(s.imgBg, Enum_Path.ZHENYAN_URL + "zhyXinBg.png");
            s.img.grayed = (v % 1000 == 0);
            var m = GGlobal.modelZhenYan;
            s.checkNotice = m.isRedXin();
            if (v % 1000 == 0) {
                s.lb.text = "";
                s.star.visible = false;
                s.starBg.visible = false;
            }
            else {
                s.lb.text = v % 1000 + "";
                s.star.visible = true;
                s.starBg.visible = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    VZhenYanBtnBig.prototype.clean = function () {
        var s = this;
        IconUtil.setImg(s.img, null);
        IconUtil.setImg(s.imgBg, null);
    };
    Object.defineProperty(VZhenYanBtnBig.prototype, "checkNotice", {
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
    VZhenYanBtnBig.URL = "ui://xrzn9ppacaql23";
    return VZhenYanBtnBig;
}(fairygui.GButton));
__reflect(VZhenYanBtnBig.prototype, "VZhenYanBtnBig");
