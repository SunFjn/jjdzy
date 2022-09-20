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
var ItemWDTXRank = (function (_super) {
    __extends(ItemWDTXRank, _super);
    function ItemWDTXRank() {
        return _super.call(this) || this;
    }
    ItemWDTXRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("wendingTX", "ItemWDTXRank"));
    };
    ItemWDTXRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbRank = (this.getChild("lbRank"));
        this.lbName = (this.getChild("lbName"));
        this.lbScore = (this.getChild("lbScore"));
        this.n10 = (this.getChild("n10"));
        this.n5 = (this.getChild("n5"));
        this.n6 = (this.getChild("n6"));
        this.n7 = (this.getChild("n7"));
        this.grids = [this.n7, this.n6, this.n5];
    };
    ItemWDTXRank.prototype.clean = function () {
        for (var i = 0; i < 3; i++) {
            this.grids[i].tipEnabled = false;
            this.grids[i].showEff(false);
        }
    };
    ItemWDTXRank.prototype.setdata = function (data) {
        var s = this;
        var m = GGlobal.modelWenDingTX;
        var rank = data[0];
        var playerName = data[1];
        var score = data[2];
        var cfg = m.getRankItemCFG(rank);
        var rankDta = JSON.parse(cfg.rank)[0];
        s.lbRank.text = "第" + rank + "名";
        s.lbRank.y = 16;
        s.n10.visible = false;
        if (rank == 11) {
            s.lbRank.text = "10+";
            s.lbRank.y = 46;
            s.lbName.text = '';
            s.lbScore.text = "";
        }
        else {
            if (playerName == "虚位以待") {
                s.n10.visible = true;
                s.lbName.text = "";
                s.lbScore.text = "";
            }
            else {
                s.lbName.text = playerName;
                s.lbScore.text = "积分：" + score;
            }
        }
        var award = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        for (var i = 0; i < 3; i++) {
            this.grids[i].tipEnabled = false;
            if (i < award.length) {
                this.grids[i].vo = award[i];
                this.grids[i].showEff(true);
                this.grids[i].tipEnabled = true;
                this.grids[i].visible = true;
            }
            else {
                this.grids[i].vo = award[i];
                this.grids[i].showEff(false);
                this.grids[i].visible = false;
            }
        }
    };
    ItemWDTXRank.URL = "ui://gxs8kn67fl2h6";
    return ItemWDTXRank;
}(fairygui.GComponent));
__reflect(ItemWDTXRank.prototype, "ItemWDTXRank");
