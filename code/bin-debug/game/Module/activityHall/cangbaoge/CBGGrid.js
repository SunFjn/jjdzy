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
var CBGGrid = (function (_super) {
    __extends(CBGGrid, _super);
    function CBGGrid() {
        var _this = _super.call(this) || this;
        _this.idx = 0;
        return _this;
    }
    CBGGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("cangbaoge", "CBGGrid"));
    };
    CBGGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.grid = (this.getChild("grid"));
        this.imgSelected = (this.getChild("imgSelected"));
        this.imgSepurise = (this.getChild("imgSepurise"));
        this.imgSelected.visible = false;
    };
    CBGGrid.prototype.showBgEffect = function (val) {
        this.imgSelected.visible = val;
    };
    CBGGrid.prototype.showGetEffect = function () {
        EffectMgr.addEff("uieff/" + 10007, this.displayListContainer, 50, 50, 1000, 1000, false);
    };
    CBGGrid.prototype.setvo = function (vo, isBig) {
        if (isBig === void 0) { isBig = false; }
        this.grid.vo = vo;
        this.grid.showEff(true);
        this.grid.tipEnabled = true;
        if (vo) {
            this.idx = vo.id;
        }
        this.imgSepurise.visible = isBig;
    };
    CBGGrid.prototype.setEffect = function (v) {
        this.grid.showEff(v);
    };
    CBGGrid.URL = "ui://1tr9e6d8m0yoz";
    return CBGGrid;
}(fairygui.GComponent));
__reflect(CBGGrid.prototype, "CBGGrid");
