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
var XSXS_JiFenGrid = (function (_super) {
    __extends(XSXS_JiFenGrid, _super);
    function XSXS_JiFenGrid() {
        return _super.call(this) || this;
    }
    XSXS_JiFenGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("YiShouLu", "XSXS_JiFenGrid"));
    };
    XSXS_JiFenGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    XSXS_JiFenGrid.prototype.setVo = function (cfg) {
        var self = this;
        var model = GGlobal.modelxsxs;
        self.vo = cfg;
        var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.grid.tipEnabled = false;
        self.grid.isShowEff = true;
        self.grid.vo = arr[0];
        self.noticeGroup.visible = model.rewardData[cfg.id] > 0;
        self.numLb.visible = model.rewardData[cfg.id] > 1;
        self.numLb.text = model.rewardData[cfg.id] + "";
        self.jifenLb.text = "积分:" + cfg.point;
        self.imgHas.visible = model.rewardData[cfg.id] == -1;
    };
    XSXS_JiFenGrid.prototype.setTfVo = function (cfg) {
        var self = this;
        var model = GGlobal.modelTalent;
        self.vo1 = cfg;
        var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.jl));
        self.grid.tipEnabled = false;
        self.grid.isShowEff = true;
        self.grid.vo = arr[0];
        self.noticeGroup.visible = model.targetData[cfg.id] > 0;
        self.numLb.visible = model.targetData[cfg.id] > 1;
        self.numLb.text = model.targetData[cfg.id] + "";
        self.jifenLb.text = cfg.cs + "次";
        self.imgHas.visible = model.targetData[cfg.id] == -1;
    };
    XSXS_JiFenGrid.prototype.clean = function () {
        this.grid.clean();
    };
    XSXS_JiFenGrid.URL = "ui://7y83phvndsdyp";
    return XSXS_JiFenGrid;
}(fairygui.GComponent));
__reflect(XSXS_JiFenGrid.prototype, "XSXS_JiFenGrid");
