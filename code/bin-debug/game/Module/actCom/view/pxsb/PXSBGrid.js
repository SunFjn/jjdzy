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
/**
 * 貔貅散宝大奖Item
 */
var PXSBGrid = (function (_super) {
    __extends(PXSBGrid, _super);
    function PXSBGrid() {
        return _super.call(this) || this;
    }
    PXSBGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCom_PXSB", "PXSBGrid"));
    };
    PXSBGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    PXSBGrid.prototype.setVo = function (rewardArr, isGrade) {
        if (isGrade === void 0) { isGrade = false; }
        var self = this;
        self.rewardGroup0.visible = true;
        var gridVo = ConfigHelp.makeItem(rewardArr);
        self.grid.isShowEff = false;
        self.grid.grayed = !isGrade;
        if (!self.eff)
            self.eff = EffectMgr.addEff("uieff/" + 10022, self.rewardBt0.displayListContainer, self.rewardBt0.width / 2, self.rewardBt0.height / 2, 800, -1);
        self.grid.vo = gridVo;
        self.grid.tipEnabled = true;
    };
    PXSBGrid.prototype.clean = function () {
        var self = this;
        self.grid.showEff(false);
        self.grid.vo = null;
        self.grid.tipEnabled = false;
        if (self.eff) {
            EffectMgr.instance.removeEff(self.eff);
            self.eff = null;
        }
    };
    PXSBGrid.URL = "ui://qb4y6bxeq54c4";
    return PXSBGrid;
}(fairygui.GComponent));
__reflect(PXSBGrid.prototype, "PXSBGrid");
