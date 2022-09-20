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
var ViewGridBaZT = (function (_super) {
    __extends(ViewGridBaZT, _super);
    function ViewGridBaZT() {
        var _this = _super.call(this) || this;
        _this.isShowEff = false;
        return _this;
    }
    ViewGridBaZT.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewGridBaZT"));
    };
    ViewGridBaZT.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Object.defineProperty(ViewGridBaZT.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            this._vo = v;
            this.lbName.text = v ? ConfigHelp.createColorName(v.name, v.pz) : "";
            if (v && v.id > 0) {
                this.starLb.text = v.starLv + "";
                this.starGroup.visible = true;
                ImageLoader.instance.loader(Enum_Path.BAZHENTU_URL + v.icon + ".png", this.imgIcon);
                this.imgIcon.visible = true;
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + v.pz + ".png", this.bg);
                this.showEff(this.isShowEff);
            }
            else {
                this.starLb.text = "";
                this.starGroup.visible = false;
                this.imgIcon.visible = false;
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_1.png", this.bg);
                this.showEff(false);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewGridBaZT.prototype.setTemp = function (v) {
        this._temp = v;
        if (v) {
            ImageLoader.instance.loader(Enum_Path.BAZHENTU_URL + v.icon + ".png", this.imgIcon);
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + v.pz + ".png", this.bg);
            this.imgIcon.visible = true;
            this.starLb.text = 1 + "";
            this.showEffTemp(this.isShowEff);
        }
        else {
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_1.png", this.bg);
            this.imgIcon.visible = false;
            this.starLb.text = "";
            this.showEffTemp(false);
        }
    };
    Object.defineProperty(ViewGridBaZT.prototype, "tipEnable", {
        set: function (bo) {
            if (bo) {
                this.addClickListener(this.onTips, this);
            }
            else {
                this.removeClickListener(this.onTips, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewGridBaZT.prototype.onTips = function () {
        if (this._vo && this._vo.id > 0) {
            GGlobal.layerMgr.open(UIConst.TIP_BAZHENTU_ITEM, this._vo);
        }
    };
    ViewGridBaZT.prototype.showEff = function (v) {
        if (v && this.vo && this.vo.id > 0) {
            this._temp = this.vo.cfg;
            this.showEffTemp(v);
        }
        else {
            if (this.effPart) {
                EffectMgr.instance.removeEff(this.effPart);
                this.effPart = null;
            }
        }
    };
    ViewGridBaZT.prototype.showEffTemp = function (v) {
        if (v && this._temp && this._temp.pz >= 5) {
            if (this.effPart) {
                EffectMgr.instance.removeEff(this.effPart);
                this.effPart = null;
            }
            if (this.effPart == null) {
                var idx = 0;
                if (this._temp.pz >= 8) {
                    idx = 10055;
                }
                else {
                    idx = 10001 + (this._temp.pz - 5);
                    idx = idx > 10002 ? 10002 : idx;
                }
                this.effPart = EffectMgr.addEff("uieff/" + idx, this.displayListContainer, 96 / 2 + 3 + this.bg.x, 96 / 2 - 1 + this.bg.y, 800, -1);
            }
        }
        else {
            if (this.effPart) {
                EffectMgr.instance.removeEff(this.effPart);
                this.effPart = null;
            }
        }
    };
    ViewGridBaZT.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.showEff(false);
        this.removeClickListener(this.onTips, this);
    };
    ViewGridBaZT.URL = "ui://jvxpx9emtszw3gr";
    return ViewGridBaZT;
}(fairygui.GComponent));
__reflect(ViewGridBaZT.prototype, "ViewGridBaZT");
