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
var ActCom_ListGrid = (function (_super) {
    __extends(ActCom_ListGrid, _super);
    function ActCom_ListGrid() {
        return _super.call(this) || this;
    }
    ActCom_ListGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_SystemRank", "ActCom_ListGrid"));
    };
    ActCom_ListGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ActCom_ListGrid.prototype.setVo = function (rewardArr, isGrade) {
        if (isGrade === void 0) { isGrade = false; }
        var self = this;
        self.rewardGroup0.visible = true;
        var gridVo = ConfigHelp.makeItem(rewardArr);
        self.grid.isShowEff = false;
        self.grid.grayed = !isGrade;
        if (!self.eff)
            self.eff = EffectMgr.addEff("uieff/10022", self.rewardBt0.displayListContainer, self.rewardBt0.width / 2, self.rewardBt0.height / 2, 800, -1);
        self.grid.vo = gridVo;
        self.grid.tipEnabled = true;
    };
    ActCom_ListGrid.prototype.clean = function () {
        var self = this;
        self.grid.clean();
        if (self.eff) {
            EffectMgr.instance.removeEff(self.eff);
            self.eff = null;
        }
    };
    ActCom_ListGrid.URL = "ui://qz5r0meldsdy1";
    return ActCom_ListGrid;
}(fairygui.GComponent));
__reflect(ActCom_ListGrid.prototype, "ActCom_ListGrid");
