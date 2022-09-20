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
var ViewMineralTips = (function (_super) {
    __extends(ViewMineralTips, _super);
    function ViewMineralTips() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewMineralTips.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("crossKing", "ViewMineralTips").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        var cfg = Config.kfkz_275[Model_CrossMineral.MAX_LEVEL];
        var arr = JSON.parse(cfg.max1);
        var itemVo0 = ConfigHelp.makeItem(arr[0]);
        var itemVo1 = ConfigHelp.makeItem(arr[1]);
        IconUtil.setImg(self.moneyIcon0, Enum_Path.ICON70_URL + itemVo0.icon + ".png");
        IconUtil.setImg(self.moneyIcon1, Enum_Path.ICON70_URL + itemVo1.icon + ".png");
        self.moneyLb0.text = itemVo0.count + "";
        self.moneyLb1.text = itemVo1.count + "";
        _super.prototype.childrenCreated.call(this);
        self.openBt.addClickListener(self.OnOpen, self);
        self.startBt.addClickListener(self.OnStart, self);
    };
    ViewMineralTips.prototype.OnStart = function () {
        this.doHideAnimation();
        GGlobal.modelCrossMineral.CG_START_MINE();
    };
    ViewMineralTips.prototype.OnOpen = function () {
        this.doHideAnimation();
        GGlobal.layerMgr.open(UIConst.CROSS_MINERAL_REFRESH);
    };
    ViewMineralTips.prototype.onShown = function () {
    };
    ViewMineralTips.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.CROSS_MINE_PROMPT);
    };
    ViewMineralTips.URL = "ui://yqpfulef7cuy5i";
    return ViewMineralTips;
}(UIModalPanel));
__reflect(ViewMineralTips.prototype, "ViewMineralTips");
