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
var ViewRolePanel = (function (_super) {
    __extends(ViewRolePanel, _super);
    function ViewRolePanel() {
        var _this = _super.call(this) || this;
        _this._uidList = [UIConst.ROLE, UIConst.REBIRTH, UIConst.GOD_EQUIP, UIConst.TITLE];
        _this.isFullScreen = true;
        _this.setSkin("role", "role_atlas0", "ViewRolePanel");
        return _this;
    }
    ViewRolePanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "ViewRolePanel"));
    };
    ViewRolePanel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory;
        f.setPackageItemExtension(ChildRebirth.URL, ChildRebirth);
        f.setPackageItemExtension(ChildRolePanel.URL, ChildRolePanel);
        f.setPackageItemExtension(ViewGodEquipPanel.URL, ViewGodEquipPanel);
        f.setPackageItemExtension(ChildTitle.URL, ChildTitle);
        f.setPackageItemExtension(TitlePage.URL, TitlePage);
    };
    ViewRolePanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this._tabContronller = new TabController();
        this._tabContronller.initView(this, this.ctr1);
        this._tabContronller.setPanelClassMap([
            ChildRolePanel,
            ChildRebirth,
            ViewGodEquipPanel,
            ChildTitle,
        ]);
        this._tabContronller.tabChange = this.onTabChange;
        this._tabContronller.tabChangeCaller = this;
    };
    ViewRolePanel.prototype.onTabChange = function (pTabIndex, pVo) {
        var self = this;
        var arr = self._uidList;
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        self.frame.setTitleVis(arr[pTabIndex] != UIConst.ROLE);
        return true;
    };
    ViewRolePanel.prototype.closeHnadler = function (evt) {
        GGlobal.layerMgr.close(UIConst.ROLE);
    };
    ViewRolePanel.prototype.onShown = function () {
        this._tabContronller.registerEvent(true);
        var t_selectIndex = 0;
        if (this._args)
            t_selectIndex = this._args;
        this._tabContronller.selectedIndex = -1;
        this._tabContronller.selectedIndex = t_selectIndex;
        this.closeButton.addClickListener(this.closeHnadler, this);
        this.checkRolelNotice();
        this.checkZsNotice();
        GGlobal.reddot.listen(ReddotEvent.CHECK_ROLE, this.checkRolelNotice, this);
        GGlobal.reddot.listen(ReddotEvent.CHECK_ZHAN_JIA, this.checkRolelNotice, this);
        GGlobal.reddot.listen(ReddotEvent.CHECK_REBIRTH, this.checkZsNotice, this);
        GGlobal.reddot.listen(ReddotEvent.CHECK_BAOWU, this.checkRolelNotice, this);
        GGlobal.reddot.listen(ReddotEvent.CHECK_TIANSHU, this.checkRolelNotice, this);
    };
    ViewRolePanel.prototype.onHide = function () {
        this._tabContronller.registerEvent(false);
        this._tabContronller.close();
        this.closeButton.removeClickListener(this.closeHnadler, this);
        GGlobal.reddot.remove(ReddotEvent.CHECK_ROLE, this.checkRolelNotice, this);
        GGlobal.reddot.remove(ReddotEvent.CHECK_ZHAN_JIA, this.checkRolelNotice, this);
        GGlobal.reddot.remove(ReddotEvent.CHECK_REBIRTH, this.checkZsNotice, this);
        GGlobal.reddot.remove(ReddotEvent.CHECK_BAOWU, this.checkRolelNotice, this);
        GGlobal.reddot.remove(ReddotEvent.CHECK_TIANSHU, this.checkRolelNotice, this);
        GGlobal.reddot.remove(ReddotEvent.CHECK_BINGFA, this.checkRolelNotice, this);
    };
    ViewRolePanel.prototype.checkRolelNotice = function () {
        var r = GGlobal.reddot;
        //称号按钮
        this.btnTitle.checkNotice = r.checkCondition(UIConst.TITLE, 0);
        this.btnShenZhuang.checkNotice = r.checkCondition(UIConst.GOD_EQUIP, 0) || r.checkCondition(UIConst.GOD_EQUIP, 1);
        //宝物
        var checkBW = r.checkCondition(UIConst.BAOWU, 0) || r.checkCondition(UIConst.BAOWU, 1);
        //天书
        var checkTS = r.checkCondition(UIConst.TIANSHU, 0) || r.checkCondition(UIConst.TIANSHU, 1) || r.checkCondition(UIConst.TIANSHU, 2)
            || r.checkCondition(UIConst.TIANSHU, 3) || r.checkCondition(UIConst.TIANSHU, 4) || r.checkCondition(UIConst.TIANSHU, 5);
        //神剑
        var checkShenJian = r.checkCondition(UIConst.SHEN_JIAN, 0) || r.checkCondition(UIConst.SHEN_JIAN, 1) || r.checkCondition(UIConst.SHEN_JIAN, 2);
        //异宝
        var checkYB;
        if (Model_YiBao.isFirstOpen) {
            checkYB = r.checkCondition(UIConst.YIBAO, 0) || r.checkCondition(UIConst.YIBAO, 1) || r.checkCondition(UIConst.YIBAO, 2);
        }
        else {
            checkYB = r.checkCondition(UIConst.ROLE, UIConst.YIBAO);
        }
        //战甲
        var checkZJ = r.checkCondition(UIConst.ZHAN_JIA, 0);
        //兵法
        var checkBF = r.checkCondition(UIConst.BINGFA, 0) || r.checkCondition(UIConst.BINGFA, 1) || r.checkCondition(UIConst.BINGFA, 2) || r.checkCondition(UIConst.BINGFA, 3);
        var checkLH = r.checkCondition(UIConst.LUNHUI) || r.checkCondition(UIConst.TIANMING) || Model_LunHui.checkSWNotice();
        //角色按钮
        this.btnRole.checkNotice = r.checkCondition(UIConst.ROLE, 1) ||
            checkBF || checkZJ || checkYB || checkShenJian || checkTS || checkBW || checkLH;
    };
    ViewRolePanel.prototype.checkZsNotice = function () {
        var r = GGlobal.reddot;
        this.btnZS.checkNotice = r.checkCondition(UIConst.REBIRTH, 0);
    };
    ViewRolePanel.prototype.guidePage = function (step) {
        var s = this;
        if (!s.isInit)
            return;
        if (Number(step.arg) == UIConst.ROLE) {
            var t_index = s._uidList.indexOf(~~step.arg);
            var t_panel = this._tabContronller.getTabPanelInstByIndex(t_index);
            if (t_panel) {
                GuideStepManager.instance.showGuide(t_panel.btnOneKey, t_panel.btnOneKey.width / 2, t_panel.btnOneKey.height / 2);
                GuideStepManager.instance.showGuide1(step.source.index, t_panel.btnOneKey, t_panel.btnOneKey.width / 2, 0, -90, -106, -100);
            }
        }
        else if (Number(step.arg) == UIConst.REBIRTH) {
            var t_index = s._uidList.indexOf(~~step.arg);
            var t_panel = this._tabContronller.getTabPanelInstByIndex(t_index);
            if (t_panel) {
                GuideStepManager.instance.showGuide(t_panel.btnReBirth, t_panel.btnReBirth.width / 2, t_panel.btnReBirth.height / 2);
                GuideStepManager.instance.showGuide1(step.source.index, t_panel.btnReBirth, t_panel.btnReBirth.width / 2, 0, -90, -106, -100);
                if (t_panel.btnReBirth.parent)
                    t_panel.btnReBirth.parent.setChildIndex(t_panel.btnReBirth, t_panel.btnReBirth.parent.numChildren - 1);
            }
        }
    };
    ViewRolePanel.prototype.guideClosePanel = function (step) {
        var btn = this.frame.closeButton;
        GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
        GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
    };
    ViewRolePanel.prototype.check_guideTab = function (arg) {
        return this.ctr1.selectedIndex == arg;
    };
    ViewRolePanel.prototype.guideTab = function (step) {
        var tab = this._tabContronller.getTabBtnByIndex(step.arg);
        GuideStepManager.instance.showGuide(tab, tab.width / 2, tab.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, tab, tab.width / 2, 0, -90, -106, -100);
        if (tab.parent)
            tab.parent.setChildIndex(tab, tab.parent.numChildren - 1);
    };
    ViewRolePanel.prototype.dispose = function () {
        if (this._tabContronller)
            this._tabContronller.destroy();
        _super.prototype.dispose.call(this);
    };
    //>>>>end
    ViewRolePanel.URL = "ui://3tzqotadua8b4";
    return ViewRolePanel;
}(UIPanelBase));
__reflect(ViewRolePanel.prototype, "ViewRolePanel");
