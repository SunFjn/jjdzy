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
 * 连冲豪礼大奖item
*/
var WSZWListGrid = (function (_super) {
    __extends(WSZWListGrid, _super);
    function WSZWListGrid() {
        return _super.call(this) || this;
    }
    WSZWListGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("WSZWActLCHL", "WSZWListGrid"));
    };
    WSZWListGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    WSZWListGrid.prototype.setVo = function (rewardArr, isGrade) {
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
    WSZWListGrid.prototype.clean = function () {
        var self = this;
        self.grid.showEff(false);
        self.grid.vo = null;
        self.grid.tipEnabled = false;
        if (self.eff) {
            EffectMgr.instance.removeEff(self.eff);
            self.eff = null;
        }
    };
    WSZWListGrid.URL = "ui://niyo89mic4543";
    return WSZWListGrid;
}(fairygui.GComponent));
__reflect(WSZWListGrid.prototype, "WSZWListGrid");
