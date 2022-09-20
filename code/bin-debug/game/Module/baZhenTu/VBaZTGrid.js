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
var VBaZTGrid = (function (_super) {
    __extends(VBaZTGrid, _super);
    function VBaZTGrid() {
        var _this = _super.call(this) || this;
        _this.isShowEff = false;
        return _this;
    }
    VBaZTGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "VBaZTGrid"));
    };
    VBaZTGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Object.defineProperty(VBaZTGrid.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            this._vo = v;
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
    VBaZTGrid.prototype.setTemp = function (v) {
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
    Object.defineProperty(VBaZTGrid.prototype, "tipEnable", {
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
    VBaZTGrid.prototype.onTips = function () {
        if (this._vo && this._vo.id > 0) {
            GGlobal.layerMgr.open(UIConst.TIP_BAZHENTU_ITEM, this._vo);
        }
    };
    VBaZTGrid.prototype.showEff = function (v) {
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
    VBaZTGrid.prototype.showEffTemp = function (v) {
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
                this.effPart = EffectMgr.addEff("uieff/" + idx, this.displayListContainer, this.width / 2 + 3, this.height / 2 - 1, 800, -1);
            }
        }
        else {
            if (this.effPart) {
                EffectMgr.instance.removeEff(this.effPart);
                this.effPart = null;
            }
        }
    };
    VBaZTGrid.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.showEff(false);
        this.removeClickListener(this.onTips, this);
    };
    VBaZTGrid.URL = "ui://xrzn9ppaf8nk4";
    return VBaZTGrid;
}(fairygui.GComponent));
__reflect(VBaZTGrid.prototype, "VBaZTGrid");
