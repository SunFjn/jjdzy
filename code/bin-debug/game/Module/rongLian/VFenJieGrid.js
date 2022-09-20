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
var VFenJieGrid = (function (_super) {
    __extends(VFenJieGrid, _super);
    function VFenJieGrid() {
        return _super.call(this) || this;
    }
    VFenJieGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("rongLian", "VFenJieGrid"));
    };
    VFenJieGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.grid = (this.getChild("grid"));
        this.lbName = (this.getChild("lbName"));
        this.selectImg = (this.getChild("selectImg"));
    };
    Object.defineProperty(VFenJieGrid.prototype, "vo", {
        get: function () {
            return this.grid.vo;
        },
        set: function (v) {
            this.grid.vo = v;
            this.grid.tipEnabled = false;
            if (v != null) {
                if (v.gType == Enum_Attr.ITEM) {
                    var voi = v;
                    this.lbName.text = voi.name;
                    this.lbName.color = voi.qColor;
                }
                else if (v.gType == Enum_Attr.EQUIP) {
                    var voe = v;
                    this.lbName.text = voe.gridName;
                    this.lbName.color = voe.qColor;
                }
                else {
                    var voc = v;
                    this.lbName.text = voc.name;
                    this.lbName.color = voc.qColor;
                }
                //显示特效
                this.grid.showEff(v.showEffect);
                this.lbNum.visible = false;
                if (v.count > 1) {
                    this.lbNum.visible = true;
                    this.lbNum.text = ConfigHelp.getYiWanText(v.count);
                }
            }
            else {
                this.lbName.text = "";
                this.lbNum.visible = false;
                this.grid.tipEnabled = false;
                this.grid.showEff(false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VFenJieGrid.prototype, "lbNum", {
        get: function () {
            if (this.grid) {
                return this.grid.lbNum;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    VFenJieGrid.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.grid.clean();
    };
    VFenJieGrid.URL = "ui://ny9kb4yze1fic";
    return VFenJieGrid;
}(fairygui.GButton));
__reflect(VFenJieGrid.prototype, "VFenJieGrid");
