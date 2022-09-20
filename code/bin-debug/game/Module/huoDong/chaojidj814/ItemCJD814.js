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
var ItemCJD814 = (function (_super) {
    __extends(ItemCJD814, _super);
    function ItemCJD814() {
        return _super.call(this) || this;
    }
    ItemCJD814.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.ylq = (this.getChild("ylq"));
    };
    ItemCJD814.prototype.clean = function () {
        this.n0.tipEnabled = false;
        this.n0.showEff(false);
    };
    ItemCJD814.prototype.setdata = function (dta) {
        var idx = dta[0];
        var vo = dta[1];
        var showYLQ = false;
        var arr = GGlobal.modelHuoD814.CJDJ_data;
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][2] == vo.id) {
                    showYLQ = true;
                    break;
                }
            }
        }
        var maxNum = GGlobal.modelHuoD814.CJDJ_hasGet;
        this.n0.vo = vo;
        this.n0.tipEnabled = true;
        this.n0.showEff(true);
        this.ylq.visible = showYLQ;
    };
    ItemCJD814.URL = "ui://vrw7je9rs56p11";
    return ItemCJD814;
}(fairygui.GComponent));
__reflect(ItemCJD814.prototype, "ItemCJD814");
