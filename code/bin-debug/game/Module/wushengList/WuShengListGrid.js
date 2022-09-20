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
var WuShengListGrid = (function (_super) {
    __extends(WuShengListGrid, _super);
    function WuShengListGrid() {
        return _super.call(this) || this;
    }
    WuShengListGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("wushengList", "WuShengListGrid"));
    };
    WuShengListGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    WuShengListGrid.prototype.setVo = function (rewardArr, isGrade) {
        if (isGrade === void 0) { isGrade = false; }
        var self = this;
        var gridVo = ConfigHelp.makeItem(rewardArr);
        if (rewardArr[3] == 1) {
            self.grid.isShowEff = false;
            self.rewardGroup0.visible = true;
            self.grid.grayed = !isGrade;
            if (!self.eff)
                self.eff = EffectMgr.addEff("uieff/" + 10022, self.rewardBt0.displayListContainer, self.rewardBt0.width / 2, self.rewardBt0.height / 2, 800, -1);
        }
        else {
            self.grid.isShowEff = true;
            self.rewardGroup0.visible = false;
            self.grid.grayed = false;
            if (self.eff) {
                EffectMgr.instance.removeEff(self.eff);
                self.eff = null;
            }
        }
        self.grid.vo = gridVo;
        self.grid.tipEnabled = true;
    };
    WuShengListGrid.prototype.clean = function () {
        var self = this;
        self.grid.showEff(false);
        self.grid.vo = null;
        self.grid.tipEnabled = false;
        if (self.eff) {
            EffectMgr.instance.removeEff(self.eff);
            self.eff = null;
        }
    };
    WuShengListGrid.URL = "ui://a8l39nm9tv5mt";
    return WuShengListGrid;
}(fairygui.GComponent));
__reflect(WuShengListGrid.prototype, "WuShengListGrid");
