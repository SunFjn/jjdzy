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
var FHPlayerRankItem = (function (_super) {
    __extends(FHPlayerRankItem, _super);
    function FHPlayerRankItem() {
        var _this = _super.call(this) || this;
        _this.grids = [];
        return _this;
    }
    FHPlayerRankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "FHPlayerRankItem"));
    };
    FHPlayerRankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        sf.lbRank = (sf.getChild("lbRank"));
        sf.lbName = (sf.getChild("lbName"));
        sf.lbScore = (sf.getChild("lbScore"));
        sf.n8 = (sf.getChild("n8"));
        sf.n3 = (sf.getChild("n3"));
        sf.n4 = (sf.getChild("n4"));
        sf.n5 = (sf.getChild("n5"));
        sf.grids = [sf.n3, sf.n4, sf.n5];
        sf.n8.visible = false;
    };
    FHPlayerRankItem.prototype.clean = function () {
        var sf = this;
        for (var i = 0; i < 3; i++) {
            sf.grids[i].showEff(false);
        }
    };
    FHPlayerRankItem.prototype.setdata = function (dta, idx) {
        var sf = this;
        var rank = idx + 1;
        var cfg;
        var cfgs = GGlobal.modelFengHuoLY.cfg_rank_player;
        for (var j = 0; j < cfgs.length; j++) {
            var temp = JSON.parse(cfgs[j].rank)[0];
            if (rank >= temp[0] && rank <= temp[1]) {
                cfg = cfgs[j];
            }
        }
        sf.lbRank.text = BroadCastManager.reTxt("第{0}名", rank);
        if (dta) {
            sf.lbName.text = dta[1];
            sf.lbScore.text = BroadCastManager.reTxt("积分：{0}", dta[2]);
            sf.n8.visible = false;
        }
        else {
            sf.lbName.text = "";
            sf.lbScore.text = "";
            sf.n8.visible = true;
        }
        var award = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        for (var i = 0; i < 3; i++) {
            sf.grids[i].vo = award[i];
            sf.grids[i].showEff(true);
            sf.grids[i].tipEnabled = true;
        }
    };
    FHPlayerRankItem.URL = "ui://edvdots4kzd9h";
    return FHPlayerRankItem;
}(fairygui.GComponent));
__reflect(FHPlayerRankItem.prototype, "FHPlayerRankItem");
