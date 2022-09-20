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
 * 洗练大奖item
*/
var XiLianListGrid = (function (_super) {
    __extends(XiLianListGrid, _super);
    function XiLianListGrid() {
        return _super.call(this) || this;
    }
    XiLianListGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "XiLianListGrid"));
    };
    XiLianListGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    XiLianListGrid.prototype.setVo = function (rewardArr, isGrade) {
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
    XiLianListGrid.prototype.clean = function () {
        var self = this;
        self.grid.showEff(false);
        self.grid.vo = null;
        self.grid.tipEnabled = false;
        if (self.eff) {
            EffectMgr.instance.removeEff(self.eff);
            self.eff = null;
        }
    };
    XiLianListGrid.URL = "ui://d5y9ngt6cl031m";
    return XiLianListGrid;
}(fairygui.GComponent));
__reflect(XiLianListGrid.prototype, "XiLianListGrid");
