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
var View_FuBen_Panel = (function (_super) {
    __extends(View_FuBen_Panel, _super);
    function View_FuBen_Panel() {
        var _this = _super.call(this) || this;
        _this._uidList = [UIConst.PEACOCK, UIConst.FUBEN_CAILIAO, UIConst.FUBEN_YJDQ, UIConst.RUNMAN];
        _this.setSkin("FuBen", "FuBen_atlas0", "View_FuBen_Panel");
        return _this;
    }
    View_FuBen_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(Child_YJDQ.URL, Child_YJDQ);
        fairygui.UIObjectFactory.setPackageItemExtension(YJDQ_RankItem.URL, YJDQ_RankItem);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_Peacock.URL, Child_Peacock);
        fairygui.UIObjectFactory.setPackageItemExtension(VPeacockPly.URL, VPeacockPly);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_CaiLiaoFB.URL, Child_CaiLiaoFB);
        fairygui.UIObjectFactory.setPackageItemExtension(CaiLiaoFBItem.URL, CaiLiaoFBItem);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_RunMan.URL, Child_RunMan);
        fairygui.UIObjectFactory.setPackageItemExtension(VRunManGrid.URL, VRunManGrid);
        fairygui.UIObjectFactory.setPackageItemExtension(YJDQ_Tab.URL, YJDQ_Tab);
        fairygui.UIObjectFactory.setPackageItemExtension(VRunManLayer.URL, VRunManLayer);
    };
    View_FuBen_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this._tabContronller = new TabController();
        this._tabContronller.initView(this, this.c1);
        this._tabContronller.setPanelClassMap([
            Child_Peacock,
            Child_CaiLiaoFB,
            Child_YJDQ,
            Child_RunMan,
        ]);
        this._tabContronller.tabChange = this.onTabChange;
        this._tabContronller.tabChangeCaller = this;
    };
    View_FuBen_Panel.prototype.onTabChange = function (pTabIndex, pVo) {
        var arr = this._uidList;
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        return true;
    };
    View_FuBen_Panel.prototype.updateShow = function () {
        this._tabContronller.forceUpdate(this._tabContronller.selectedIndex);
    };
    View_FuBen_Panel.prototype.checkTabNotice = function () {
        this._tabContronller.getTabBtnByIndex(0).checkNotice = Model_Peacock.checkNotice();
        this._tabContronller.getTabBtnByIndex(1).checkNotice = GGlobal.reddot.checkCondition(UIConst.FUBEN_CAILIAO);
        this._tabContronller.getTabBtnByIndex(2).checkNotice = GGlobal.reddot.checkCondition(UIConst.FUBEN_YJDQ);
        this._tabContronller.getTabBtnByIndex(3).checkNotice = GGlobal.reddot.checkCondition(UIConst.RUNMAN);
    };
    View_FuBen_Panel.prototype.onShown = function () {
        this._tabContronller.registerEvent(true);
        var a = this;
        var t_selectIndex = 0;
        if (this._args)
            t_selectIndex = this._args;
        this._tabContronller.selectedIndex = -1;
        this._tabContronller.selectedIndex = t_selectIndex;
        GGlobal.modelPeacock.CG_OPENUI();
        a.checkTabNotice();
        GGlobal.control.listen(Enum_MsgType.PEACOCK_OPENUI, a.updateShow, a);
        GGlobal.control.listen(Enum_MsgType.PEACOCK_OPENUI, a.checkTabNotice, a);
        GGlobal.control.listen(Enum_MsgType.PEACOCK_PASSLAYER_NUM, a.checkTabNotice, a);
        GGlobal.reddot.listen(ReddotEvent.CHECK_YJDQ, a.checkTabNotice, a);
        GGlobal.reddot.listen(ReddotEvent.CHECK_FUBEN_CAILIAO, a.checkTabNotice, a);
        GGlobal.reddot.listen(ReddotEvent.CHECK_RUNMAN, a.checkTabNotice, a);
    };
    View_FuBen_Panel.prototype.onHide = function () {
        this._tabContronller.registerEvent(false);
        this._tabContronller.close();
        var a = this;
        var layerMgr = GGlobal.layerMgr;
        layerMgr.close(UIConst.FUBEN);
        GGlobal.control.remove(Enum_MsgType.PEACOCK_OPENUI, a.updateShow, a);
        GGlobal.control.remove(Enum_MsgType.PEACOCK_OPENUI, a.checkTabNotice, a);
        GGlobal.control.remove(Enum_MsgType.PEACOCK_PASSLAYER_NUM, a.checkTabNotice, a);
        GGlobal.reddot.remove(ReddotEvent.CHECK_YJDQ, a.checkTabNotice, a);
        GGlobal.reddot.remove(ReddotEvent.CHECK_FUBEN_CAILIAO, a.checkTabNotice, a);
        GGlobal.reddot.remove(ReddotEvent.CHECK_RUNMAN, a.checkTabNotice, a);
    };
    View_FuBen_Panel.prototype.check_guideTab = function (arg) {
        return this.c1.selectedIndex == arg;
    };
    View_FuBen_Panel.prototype.guideTab = function (arg) {
        var tab = this._tabContronller.getTabBtnByIndex(arg);
        if (tab)
            GuideStepManager.instance.showGuide(tab, tab.width / 2, tab.height / 2);
    };
    View_FuBen_Panel.prototype.guide_peacock_battle = function (step) {
        var t_panel = this._tabContronller.getTabPanelInstByIndex(0);
        if (t_panel)
            t_panel.guide_peacock_battle(step);
    };
    View_FuBen_Panel.prototype.guideCaiLiao = function (step) {
        var t_panel = this._tabContronller.getTabPanelInstByIndex(1);
        if (t_panel)
            t_panel.guideBattle(step);
    };
    View_FuBen_Panel.prototype.guideClosePanel = function (step) {
        var btn = this.closeButton.asButton;
        GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
        GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
    };
    View_FuBen_Panel.prototype.dispose = function () {
        if (this._tabContronller)
            this._tabContronller.destroy();
        _super.prototype.dispose.call(this);
    };
    //>>>>end
    View_FuBen_Panel.URL = "ui://pkuzcu87jie00";
    return View_FuBen_Panel;
}(UIPanelBase));
__reflect(View_FuBen_Panel.prototype, "View_FuBen_Panel");
