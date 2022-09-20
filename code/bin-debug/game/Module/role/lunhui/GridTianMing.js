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
var GridTianMing = (function (_super) {
    __extends(GridTianMing, _super);
    function GridTianMing() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    GridTianMing.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "GridTianMing"));
    };
    GridTianMing.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Object.defineProperty(GridTianMing.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            var s = this;
            s.vv = v;
            s.checkNotice = GGlobal.modellh.checkVo(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridTianMing.prototype, "vo1", {
        set: function (v) {
            var s = this;
            s.vv = v;
            s.lbName.text = "";
            s.checkNotice = false;
            s.selectImg.visible = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridTianMing.prototype, "vv", {
        set: function (v) {
            var s = this;
            s._vo = v;
            if (v.lvId == 0) {
                ImageLoader.instance.loader(Enum_Path.TIANMING_URL + v.id + "0" + ".png", s.imgIcon);
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_1.png", s.bg);
                s.lbLv.text = "";
                s.lbName.text = HtmlUtil.fontNoSize(v.cfg.lh + "世轮回开启", Color.REDSTR);
            }
            else {
                ImageLoader.instance.loader(Enum_Path.TIANMING_URL + v.id + "1" + ".png", s.imgIcon);
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + (v.pinId % 10) + ".png", s.bg);
                s.lbLv.text = "+" + (v.lvId % 100000);
                s.lbName.text = HtmlUtil.fontNoSize(v.cfg.name, Color.getColorStr(v.pinId % 10));
            }
            s.showEff(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridTianMing.prototype, "checkNotice", {
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
    GridTianMing.prototype.showEff = function (v) {
        var self = this;
        var quality = self.vo.pinId % 10;
        if (v && self.vo && quality >= 5) {
            if (self.effPart) {
                EffectMgr.instance.removeEff(self.effPart);
                self.effPart = null;
            }
            if (self.effPart == null) {
                var idx = 0;
                if (quality >= 8) {
                    idx = 10055;
                }
                else {
                    idx = 10001 + (quality - 5);
                    idx = idx > 10002 ? 10002 : idx;
                }
                self.effPart = EffectMgr.addEff("uieff/" + idx, self.displayListContainer, self.width / 2, self.height / 2, 800, -1);
            }
        }
        else {
            if (self.effPart) {
                EffectMgr.instance.removeEff(self.effPart);
                self.effPart = null;
            }
        }
    };
    GridTianMing.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.showEff(false);
    };
    GridTianMing.URL = "ui://ehelf5bhh2o6p";
    return GridTianMing;
}(fairygui.GButton));
__reflect(GridTianMing.prototype, "GridTianMing");
