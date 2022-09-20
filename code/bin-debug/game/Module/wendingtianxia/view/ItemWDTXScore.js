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
var ItemWDTXScore = (function (_super) {
    __extends(ItemWDTXScore, _super);
    function ItemWDTXScore() {
        return _super.call(this) || this;
    }
    ItemWDTXScore.createInstance = function () {
        return (fairygui.UIPackage.createObject("wendingTX", "ItemWDTXScore"));
    };
    ItemWDTXScore.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n9 = (this.getChild("n9"));
        this.lbCondition = (this.getChild("lbCondition"));
        this.n3 = (this.getChild("n3"));
        this.n4 = (this.getChild("n4"));
        this.lbWDC = (this.getChild("lbWDC"));
        this.n6 = (this.getChild("n6"));
        this.imgYlq = (this.getChild("imgYlq"));
        this.n6.checkNotice = true;
        this.grids = [this.n3, this.n4];
    };
    ItemWDTXScore.prototype.lqHD = function () {
        GGlobal.modelWenDingTX.rankScore4237(this.idx);
    };
    ItemWDTXScore.prototype.clean = function () {
        for (var i = 0; i < 2; i++) {
            this.grids[i].tipEnabled = false;
            this.grids[i].showEff(false);
        }
        this.n6.removeClickListener(this.lqHD, this);
    };
    ItemWDTXScore.prototype.setdata = function (data) {
        this.n6.addClickListener(this.lqHD, this);
        var s = this;
        var m = GGlobal.modelWenDingTX;
        var rank = data[0];
        s.idx = rank;
        var st = data[1];
        this.n6.visible = st == 1;
        this.lbWDC.visible = st == 0;
        this.imgYlq.visible = st == 2;
        var cfg = Config.wdtxpoint_260[rank];
        var myscrore = GGlobal.modelWenDingTX.score;
        this.lbCondition.text = "积分到达(" + myscrore + "/" + cfg.point + ")";
        this.lbCondition.color = myscrore >= cfg.point ? Color.GREENINT : Color.REDINT;
        var award = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        for (var i = 0; i < 2; i++) {
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
    ItemWDTXScore.URL = "ui://gxs8kn67fl2h8";
    return ItemWDTXScore;
}(fairygui.GComponent));
__reflect(ItemWDTXScore.prototype, "ItemWDTXScore");
