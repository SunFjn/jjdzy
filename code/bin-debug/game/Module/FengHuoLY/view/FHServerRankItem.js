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
var FHServerRankItem = (function (_super) {
    __extends(FHServerRankItem, _super);
    function FHServerRankItem() {
        return _super.call(this) || this;
    }
    FHServerRankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "FHServerRankItem"));
    };
    FHServerRankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        sf.n8 = (sf.getChild("n8"));
        sf.lbServer = (sf.getChild("lbServer"));
        sf.n1 = (sf.getChild("n1"));
        sf.n3 = (sf.getChild("n3"));
        sf.n4 = (sf.getChild("n4"));
        sf.n5 = (sf.getChild("n5"));
        sf.n6 = (sf.getChild("n6"));
        sf.n9 = (sf.getChild("n9"));
        sf.n10 = (sf.getChild("n10"));
        sf.grids = [sf.n3, sf.n4, sf.n5, sf.n6];
    };
    FHServerRankItem.prototype.setRank = function (val) {
        var sf = this;
        sf.n9.visible = val == 1;
        var m = GGlobal.modelFengHuoLY;
        sf.rank = val;
        var cfg = m.cfg_rank_server[sf.rank - 1];
        var award = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        for (var i = 0; i < 4; i++) {
            if (award[i]) {
                sf.grids[i].showEff(true);
                sf.grids[i].vo = award[i];
            }
            else {
                sf.grids[i].visible = false;
            }
        }
    };
    FHServerRankItem.prototype.setdata = function (dta, idx) {
        var sf = this;
        sf.setRank(idx + 1);
        var m = GGlobal.modelFengHuoLY;
        if (dta) {
            var server = dta[1];
            sf.lbServer.text = "S." + server;
            var score = dta[2];
            if (server == m.redServer) {
                m.redScore = score;
            }
            else {
                m.blueScore = score;
            }
            sf.n1.text = "总积分：" + score;
            sf.n10.visible = false;
            for (var i = 0; i < 4; i++) {
                sf.grids[i].showEff(true);
                sf.grids[i].tipEnabled = true;
                if (sf.grids[i].vo)
                    sf.grids[i].visible = true;
            }
        }
        else {
            sf.lbServer.text = "";
            sf.n1.text = "";
            sf.n10.visible = true;
            for (var i = 0; i < 4; i++) {
                sf.grids[i].visible = false;
            }
        }
    };
    FHServerRankItem.prototype.clean = function () {
        var sf = this;
        for (var i = 0; i < 4; i++) {
            sf.grids[i].showEff(false);
        }
    };
    FHServerRankItem.URL = "ui://edvdots4kzd9j";
    return FHServerRankItem;
}(fairygui.GComponent));
__reflect(FHServerRankItem.prototype, "FHServerRankItem");
