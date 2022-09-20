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
var ViewGrid1 = (function (_super) {
    __extends(ViewGrid1, _super);
    function ViewGrid1() {
        return _super.call(this) || this;
    }
    ViewGrid1.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewGrid1"));
    };
    ViewGrid1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbName = (this.getChild("lbName"));
        this.grid = (this.getChild("grid"));
    };
    ViewGrid1.create = function () {
        return ViewGrid1.POOL.length ? ViewGrid1.POOL.pop() : new ViewGrid1();
    };
    ViewGrid1.prototype.showEff = function (v) {
        if (v) {
            if (this.effPart == null) {
                this.effPart = EffectMgr.addEff("eff/9011", this.displayListContainer, 32, 31, 1000, -1, true, 1, Main.skill_part_type);
            }
        }
        else {
            if (this.effPart) {
                EffectMgr.instance.removeEff(this.effPart);
                this.effPart = null;
            }
        }
    };
    Object.defineProperty(ViewGrid1.prototype, "vo", {
        get: function () {
            if (this.grid) {
                return this.grid.vo;
            }
            return null;
        },
        set: function (v) {
            var a = this.grid;
            var b = this;
            var c = v;
            this.grid.vo = v;
            if (v) {
                if (v.gType == Enum_Attr.ITEM) {
                    this.lbName.text = v.name;
                }
                else if (v.gType == Enum_Attr.EQUIP) {
                    var ve = v;
                    this.lbName.text = ve.gridName;
                }
                else {
                    this.lbName.text = v.name;
                }
                this.lbName.color = v.qColor;
            }
            else {
                this.lbName.text = "";
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewGrid1.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        ViewGrid1.POOL.push(this);
    };
    ViewGrid1.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.showEff(false);
    };
    ViewGrid1.URL = "ui://jvxpx9emetorp";
    ViewGrid1.POOL = [];
    return ViewGrid1;
}(fairygui.GComponent));
__reflect(ViewGrid1.prototype, "ViewGrid1");
