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
var ViewRebirthPanel = (function (_super) {
    __extends(ViewRebirthPanel, _super);
    function ViewRebirthPanel() {
        var _this = _super.call(this) || this;
        _this._uidList = [UIConst.JINSHENG, UIConst.GUANXIAN, UIConst.ACHIEVEMENT];
        _this.setSkin("rebirth", "rebirth_atlas0", "ViewRebirthPanel");
        return _this;
    }
    ViewRebirthPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "ViewRebirthPanel"));
    };
    ViewRebirthPanel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(JXGrid.URL, JXGrid);
        f(ChildGuanXian.URL, ChildGuanXian);
        f(Child_JinSheng.URL, Child_JinSheng);
        f(JinShengItem.URL, JinShengItem);
        f(JinShengGrid.URL, JinShengGrid);
        f(ChildAchievement.URL, ChildAchievement);
        f(AchieveIconBtn.URL, AchieveIconBtn);
        f(AchieveTaskItem.URL, AchieveTaskItem);
        f(AchievementMasterItem.URL, AchievementMasterItem);
        f(AchieveRewardItem.URL, AchieveRewardItem);
    };
    ViewRebirthPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this._tabContronller = new TabController();
        this._tabContronller.initView(this, this.ctr1);
        this._tabContronller.setPanelClassMap([
            Child_JinSheng,
            ChildGuanXian,
            ChildAchievement,
        ]);
        this._tabContronller.tabChange = this.onTabChange;
        this._tabContronller.tabChangeCaller = this;
        this.resetPosition();
    };
    ViewRebirthPanel.prototype.onTabChange = function (pTabIndex, pVo) {
        var arr = this._uidList;
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        return true;
    };
    ViewRebirthPanel.prototype.onShown = function () {
        this._tabContronller.registerEvent(true);
        var s = this;
        ReddotMgr.ins().register(UIConst.ACHIEVEMENT + "|" + 0, s.btn2.noticeImg);
        var t_selectIndex = 0;
        if (this._args)
            t_selectIndex = this._args;
        this._tabContronller.selectedIndex = -1;
        this._tabContronller.selectedIndex = t_selectIndex;
        GGlobal.reddot.listen(ReddotEvent.CHECK_REBIRTH, s.setNotice, s);
        GGlobal.reddot.listen(ReddotEvent.CHECK_ROLE, s.setNotice, s);
        s.setNotice();
        if (ModuleManager.isOpen(UIConst.PEACOCK) && Model_Peacock.curLayer == 0) {
            GGlobal.modelPeacock.CG_OPENUI(); //转生需要孔雀台层数
        }
    };
    ViewRebirthPanel.prototype.onHide = function () {
        var s = this;
        s._tabContronller.registerEvent(false);
        s._tabContronller.close();
        ReddotMgr.ins().unregister(s.btn2.noticeImg);
        GGlobal.reddot.remove(ReddotEvent.CHECK_REBIRTH, s.setNotice, s);
        GGlobal.reddot.remove(ReddotEvent.CHECK_ROLE, s.setNotice, s);
        GGlobal.layerMgr.close(UIConst.JINSHENG);
    };
    ViewRebirthPanel.prototype.onOpen = function (arg) {
        if (!arg)
            arg = 0;
        this._args = arg;
        if (this.isInit) {
            if (this.isShowing) {
                this.onShown();
            }
            else {
                _super.prototype.show.call(this);
            }
        }
        if (this.isFullScreen)
            GGlobal.setUnitLayerVis(false);
    };
    ViewRebirthPanel.prototype.setNotice = function () {
        this._tabContronller.getTabBtnByIndex(0).checkNotice = GGlobal.reddot.checkCondition(UIConst.JINSHENG);
        this._tabContronller.getTabBtnByIndex(1).checkNotice = GGlobal.reddot.checkCondition(UIConst.GUANXIAN);
    };
    ViewRebirthPanel.prototype.guideFinishCheck = function (taskId) {
        if (this.ctr1.selectedIndex == 0) {
            var taskcfg = Config.mission_243[taskId];
            var t_panel = this._tabContronller.getTabPanelInstByIndex(0);
            if (t_panel)
                return t_panel.guideFinishCheck(taskcfg.can2);
        }
    };
    ViewRebirthPanel.prototype.guide_jinSheng_draw = function (step) {
        var self = this;
        var t_panel = this._tabContronller.getTabPanelInstByIndex(0);
        if (t_panel)
            t_panel.setGuide(Handler.create(t_panel, t_panel.guideTask, [step], true));
    };
    ViewRebirthPanel.prototype.guide_jinSheng_jihuo = function (step) {
        if (this.ctr1.selectedIndex == 0) {
            var t_panel = this._tabContronller.getTabPanelInstByIndex(0);
            if (t_panel) {
                GuideStepManager.instance.showGuide(t_panel.jihuoBt, t_panel.jihuoBt.width / 2, t_panel.jihuoBt.height / 2);
                GuideStepManager.instance.showGuide1(step.source.index, t_panel.jihuoBt, t_panel.jihuoBt.width / 2, t_panel.jihuoBt.height, 90, -106, 35);
                if (t_panel.jihuoBt.parent)
                    t_panel.jihuoBt.parent.setChildIndex(t_panel.jihuoBt, t_panel.jihuoBt.parent.numChildren - 1);
            }
        }
    };
    ViewRebirthPanel.prototype.guideClosePanel = function (step) {
        var btn = this.closeButton.asButton;
        GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
        GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
    };
    ViewRebirthPanel.prototype.check_guideTab = function (arg) {
        return this.ctr1.selectedIndex == arg;
    };
    ViewRebirthPanel.prototype.guideTab = function (arg) {
        var tab = this._tabContronller.getTabBtnByIndex(arg);
        GuideStepManager.instance.showGuide(tab, tab.width / 2, tab.height / 2);
    };
    ViewRebirthPanel.prototype.guide_jianxian = function (step) {
        var t_panel = this._tabContronller.getTabPanelInstByIndex(1);
        if (t_panel) {
            GuideStepManager.instance.showGuide(t_panel.btnLvUp, t_panel.btnLvUp.width / 2, t_panel.btnLvUp.height / 2);
            GuideStepManager.instance.showGuide1(step.source.index, t_panel.btnLvUp, t_panel.btnLvUp.width / 2, 0, -90, -106, -100);
            if (t_panel.btnLvUp.parent)
                t_panel.btnLvUp.parent.setChildIndex(t_panel.btnLvUp, t_panel.btnLvUp.parent.numChildren - 1);
        }
    };
    ViewRebirthPanel.prototype.dispose = function () {
        if (this._tabContronller)
            this._tabContronller.destroy();
        _super.prototype.dispose.call(this);
    };
    //>>>>end
    ViewRebirthPanel.URL = "ui://dllc71i9vaaj0";
    return ViewRebirthPanel;
}(UIPanelBase));
__reflect(ViewRebirthPanel.prototype, "ViewRebirthPanel");
