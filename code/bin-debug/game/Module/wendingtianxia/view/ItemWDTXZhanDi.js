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
var ItemWDTXZhanDi = (function (_super) {
    __extends(ItemWDTXZhanDi, _super);
    function ItemWDTXZhanDi() {
        var _this = _super.call(this) || this;
        _this.idx = 0;
        return _this;
    }
    ItemWDTXZhanDi.createInstance = function () {
        return (fairygui.UIPackage.createObject("wendingTX", "ItemWDTXZhanDi"));
    };
    ItemWDTXZhanDi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n9 = (this.getChild("n9"));
        this.lbTitle = (this.getChild("lbTitle"));
        this.lbCondition = (this.getChild("lbCondition"));
        this.lbWDC = (this.getChild("lbWDC"));
        this.n6 = (this.getChild("n6"));
        this.imgYlq = (this.getChild("imgYlq"));
        this.n2 = (this.getChild("n2"));
        this.n3 = (this.getChild("n3"));
        this.n4 = (this.getChild("n4"));
        this.grids = [this.n3, this.n4, this.n2];
        this.n6.checkNotice = true;
    };
    ItemWDTXZhanDi.prototype.clean = function () {
        for (var i = 0; i < 3; i++) {
            this.grids[i].tipEnabled = false;
            this.grids[i].showEff(false);
        }
        this.n6.removeClickListener(this.lqHD, this);
    };
    ItemWDTXZhanDi.prototype.lqHD = function () {
        GGlobal.modelWenDingTX.lianzhanAwards4219(this.idx);
    };
    ItemWDTXZhanDi.prototype.setdata = function (data) {
        var idx;
        this.idx = idx = data[0];
        this.n6.addClickListener(this.lqHD, this);
        var s = this;
        var cfg = Config.wdtxlzjl_260[idx];
        s.lbTitle.text = cfg.name;
        s.lbCondition.text = cfg.tips;
        var floorAward = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        for (var i = 0; i < 3; i++) {
            this.grids[i].tipEnabled = false;
            if (i < floorAward.length) {
                this.grids[i].vo = floorAward[i];
                this.grids[i].showEff(true);
                this.grids[i].tipEnabled = true;
                this.grids[i].visible = true;
            }
            else {
                this.grids[i].vo = floorAward[i];
                this.grids[i].showEff(false);
                this.grids[i].visible = false;
            }
        }
        var st = data[1];
        s.imgYlq.visible = st == 2;
        s.n6.visible = st == 1;
        s.lbWDC.visible = st == 0;
    };
    ItemWDTXZhanDi.URL = "ui://gxs8kn67rudj17";
    return ItemWDTXZhanDi;
}(fairygui.GComponent));
__reflect(ItemWDTXZhanDi.prototype, "ItemWDTXZhanDi");
