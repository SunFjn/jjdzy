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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ItemCJDJ = (function (_super) {
    __extends(ItemCJDJ, _super);
    function ItemCJDJ() {
        return _super.call(this) || this;
    }
    ItemCJDJ.createInstance = function () {
        return (fairygui.UIPackage.createObject("huoDong", "ItemCJDJ"));
    };
    ItemCJDJ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.ylq = (this.getChild("ylq"));
    };
    ItemCJDJ.prototype.clean = function () {
        this.n0.tipEnabled = false;
        this.n0.showEff(false);
    };
    ItemCJDJ.prototype.setdata = function (dta) {
        var idx = dta[0];
        var vo = dta[1];
        var showYLQ = false;
        var arr = GGlobal.modelHuoDong.CJDJ_data;
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][2] == vo.id) {
                    showYLQ = true;
                    break;
                }
            }
        }
        var maxNum = GGlobal.modelHuoDong.CJDJ_hasGet;
        this.n0.vo = vo;
        this.n0.tipEnabled = true;
        this.n0.showEff(true);
        this.ylq.visible = showYLQ;
    };
    ItemCJDJ.URL = "ui://vrw7je9rs56p11";
    return ItemCJDJ;
}(fairygui.GComponent));
__reflect(ItemCJDJ.prototype, "ItemCJDJ");
