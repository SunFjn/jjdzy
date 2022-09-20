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
 * 少主护送奖励面板
 */
var ShaoZhuEscortRewardView = (function (_super) {
    __extends(ShaoZhuEscortRewardView, _super);
    function ShaoZhuEscortRewardView() {
        var _this = _super.call(this) || this;
        _this._awards = [];
        fairygui.UIObjectFactory.setPackageItemExtension(EscortRewardItem.URL, EscortRewardItem);
        _this.loadRes();
        return _this;
    }
    ShaoZhuEscortRewardView.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscortRewardView"));
    };
    ShaoZhuEscortRewardView.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("ShaoZhuEscort");
        // self.isShowMask = false;
        self.view = fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscortRewardView").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ShaoZhuEscortRewardView.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._awards[idx], idx, Model_ShaoZhuEscort.interArr[idx]);
    };
    ShaoZhuEscortRewardView.prototype.onShown = function () {
        var self = this;
        self.addListen();
        self._awards = ConfigHelp.makeItemListArr(Model_ShaoZhuEscort.rewardArr);
        self.list.numItems = self._awards.length;
        self.head.setdata(Model_ShaoZhuEscort.headID, -1, null, 0, false, Model_ShaoZhuEscort.frameID, Model_ShaoZhuEscort.country);
        self.nameLb.text = Model_ShaoZhuEscort.roleName + "";
        self.powerLb.text = "战力：" + Model_ShaoZhuEscort.power;
        var cfg = Config.szhs_401[Model_ShaoZhuEscort.guardId];
        if (cfg) {
            self.guardNameLb.text = HtmlUtil.fontNoSize("护送武将：" + cfg.name, Color.getColorStr(cfg.pz));
        }
        self.rewardBtn.checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_ESCORT, 0);
    };
    ShaoZhuEscortRewardView.prototype.onHide = function () {
        this.removeListen();
        this.getAward();
        GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT_REWARD);
        this.list.numItems = 0;
    };
    ShaoZhuEscortRewardView.prototype.addListen = function () {
        var self = this;
        self.rewardBtn.addClickListener(self.getAward, self);
    };
    ShaoZhuEscortRewardView.prototype.removeListen = function () {
        var self = this;
        self.rewardBtn.removeClickListener(self.getAward, self);
    };
    ShaoZhuEscortRewardView.show = function () {
        if (!GGlobal.layerMgr.isOpenView(UIConst.SHAOZHU_ESCORT_REWARD)) {
            GGlobal.layerMgr.open(UIConst.SHAOZHU_ESCORT_REWARD);
        }
    };
    /**
     * 领取奖励
     */
    ShaoZhuEscortRewardView.prototype.getAward = function () {
        GGlobal.modelShaoZhuEscort.CG_GET_AWARD();
    };
    ShaoZhuEscortRewardView.URL = "ui://lnw94ki2lnit9";
    return ShaoZhuEscortRewardView;
}(UIModalPanel));
__reflect(ShaoZhuEscortRewardView.prototype, "ShaoZhuEscortRewardView");
