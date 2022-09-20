/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var FengHuoScoreItem = (function (_super) {
    __extends(FengHuoScoreItem, _super);
    function FengHuoScoreItem() {
        return _super.call(this) || this;
    }
    FengHuoScoreItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "FengHuoScoreItem"));
    };
    FengHuoScoreItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        sf.n10 = (sf.getChild("n10"));
        sf.n11 = (sf.getChild("n11"));
        sf.lbCondition = (sf.getChild("lbCondition"));
        sf.n1 = (sf.getChild("n1"));
        sf.n2 = (sf.getChild("n2"));
        sf.n3 = (sf.getChild("n3"));
        sf.n12 = (sf.getChild("n12"));
        sf.n4 = (sf.getChild("n4"));
        sf.n5 = (sf.getChild("n5"));
        sf.n4.addClickListener(sf.onClick, sf);
        sf.grids = [sf.n1, sf.n2, sf.n3, sf.n12];
    };
    FengHuoScoreItem.prototype.onClick = function () {
        GGlobal.modelFengHuoLY.CG_SCOREAWARD_3569(this.idx);
    };
    FengHuoScoreItem.prototype.clean = function () {
        var sf = this;
        for (var i = 0; i < 4; i++) {
            sf.grids[i].showEff(false);
        }
    };
    FengHuoScoreItem.prototype.setdata = function (data) {
        var sf = this;
        var idx = data[0];
        var state = data[1];
        this.idx = idx;
        var cfg = Config.fhlypotion_254[idx];
        sf.n5.visible = state == 2;
        sf.n4.visible = state != 2;
        sf.n4.enabled = state == 1;
        sf.n4.checkNotice = state == 1;
        var m = GGlobal.modelFengHuoLY.myScore;
        if (m >= cfg.potion) {
            sf.lbCondition.text = "积分达到<font color='#00FF00'>（" + m + "/" + cfg.potion + "）</font>";
        }
        else {
            sf.lbCondition.text = "积分达到<font color='#fe0000'>（" + m + "/" + cfg.potion + "）</font>";
        }
        var award = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        for (var i = 0; i < 4; i++) {
            if (award[i]) {
                sf.grids[i].visible = true;
                sf.grids[i].vo = award[i];
                sf.grids[i].showEff(true);
                sf.grids[i].tipEnabled = true;
            }
            else {
                sf.grids[i].showEff(false);
                sf.grids[i].visible = false;
            }
        }
    };
    FengHuoScoreItem.URL = "ui://edvdots4kzd9l";
    return FengHuoScoreItem;
}(fairygui.GComponent));
__reflect(FengHuoScoreItem.prototype, "FengHuoScoreItem");
