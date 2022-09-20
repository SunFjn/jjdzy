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
var VZhenYanBtn = (function (_super) {
    __extends(VZhenYanBtn, _super);
    function VZhenYanBtn() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    VZhenYanBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "VZhenYanBtn"));
    };
    VZhenYanBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    Object.defineProperty(VZhenYanBtn.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (v) {
            var s = this;
            s._data = v;
            IconUtil.setImg(s.img, Enum_Path.ZHENYAN_URL + v.cfg.tb + ".png");
            s.img.grayed = v.lv == 0;
            var m = GGlobal.modelZhenYan;
            s.checkNotice = m.isRedYan(v);
            if (v.star == 0) {
                s.lb.text = "";
                s.star.visible = false;
                s.starBg.visible = false;
            }
            else {
                s.lb.text = v.star + "";
                s.star.visible = true;
                s.starBg.visible = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    VZhenYanBtn.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var s = this;
        IconUtil.setImg(s.img, null);
    };
    Object.defineProperty(VZhenYanBtn.prototype, "checkNotice", {
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
    VZhenYanBtn.URL = "ui://xrzn9ppacaql22";
    return VZhenYanBtn;
}(fairygui.GButton));
__reflect(VZhenYanBtn.prototype, "VZhenYanBtn");
