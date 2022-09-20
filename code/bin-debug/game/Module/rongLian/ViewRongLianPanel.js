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
var ViewRongLianPanel = (function (_super) {
    __extends(ViewRongLianPanel, _super);
    function ViewRongLianPanel() {
        var _this = _super.call(this) || this;
        _this._first = false;
        _this.setSkin("rongLian", "rongLian_atlas0", "ViewRongLianPanel");
        return _this;
    }
    ViewRongLianPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("rongLian", "ViewRongLianPanel"));
    };
    ViewRongLianPanel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ChildRongLian.URL, ChildRongLian);
        f(ChildFenJie.URL, ChildFenJie);
        f(VFenJieGrid.URL, VFenJieGrid);
        f(VHeChengTab.URL, VHeChengTab);
        f(ChildHeCheng.URL, ChildHeCheng);
    };
    ViewRongLianPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this._tabContronller = new TabController();
        this._tabContronller.initView(this, this.c1);
        this._tabContronller.setPanelClassMap([
            ChildRongLian,
            ChildFenJie,
            ChildHeCheng,
        ]);
        this._tabContronller.tabChange = this.onTabChange;
        this._tabContronller.tabChangeCaller = this;
    };
    ViewRongLianPanel.prototype.onTabChange = function (pTabIndex, pVo) {
        return true;
    };
    ViewRongLianPanel.prototype.onShown = function () {
        this._tabContronller.registerEvent(true);
        var t_selectIndex = 0;
        if (this._args)
            t_selectIndex = this._args;
        this._tabContronller.selectedIndex = -1;
        this._tabContronller.selectedIndex = t_selectIndex;
        this.addListen();
        this.upCheck();
    };
    ViewRongLianPanel.prototype.onHide = function () {
        this._tabContronller.registerEvent(false);
        this._tabContronller.close();
        this.removeListen();
    };
    ViewRongLianPanel.prototype.addListen = function () {
        GGlobal.reddot.listen(UIConst.RONGLIAN, this.upCheck, this);
        GGlobal.reddot.listen(UIConst.BAG, this.upCheck, this);
        GGlobal.modelRL.CG_RL_INFO();
        if (!this._first) {
            GGlobal.modelEquip.CGGetEquips(3);
            this._first = true;
        }
    };
    ViewRongLianPanel.prototype.removeListen = function () {
        GGlobal.reddot.remove(UIConst.RONGLIAN, this.upCheck, this);
        GGlobal.reddot.remove(UIConst.BAG, this.upCheck, this);
        GGlobal.layerMgr.close(UIConst.RONGLIAN);
    };
    ViewRongLianPanel.prototype.upCheck = function () {
        var s = this;
        var r = GGlobal.reddot;
        s.tab0.checkNotice = r.checkCondition(UIConst.RONGLIAN, 0);
        s.tab1.checkNotice = r.checkCondition(UIConst.RONGLIAN, 1);
        s.tab2.checkNotice = r.checkCondition(UIConst.RONGLIAN, 2);
    };
    ViewRongLianPanel.prototype.check_guideTab = function (arg) {
        var isCheck = true;
        return this.c1.selectedIndex == arg && isCheck;
    };
    ViewRongLianPanel.prototype.guideTab = function (arg) {
        var tab = this._tabContronller.getTabBtnByIndex(arg);
        GuideStepManager.instance.showGuide(tab, tab.width / 2, tab.height / 2);
    };
    ViewRongLianPanel.prototype.guide_ronglian = function (step) {
        var t_panel = this._tabContronller.getTabPanelInstByIndex(0);
        if (t_panel)
            t_panel.guide_ronglian(step);
    };
    ViewRongLianPanel.prototype.guideClosePanel = function (step) {
        var btn = this.closeButton.asButton;
        GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
        GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
    };
    ViewRongLianPanel.prototype.dispose = function () {
        if (this._tabContronller)
            this._tabContronller.destroy();
        _super.prototype.dispose.call(this);
    };
    //>>>>end
    ViewRongLianPanel.URL = "ui://ny9kb4yzetor0";
    return ViewRongLianPanel;
}(UIPanelBase));
__reflect(ViewRongLianPanel.prototype, "ViewRongLianPanel");
