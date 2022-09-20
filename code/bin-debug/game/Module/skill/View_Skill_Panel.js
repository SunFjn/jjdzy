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
var View_Skill_Panel = (function (_super) {
    __extends(View_Skill_Panel, _super);
    function View_Skill_Panel() {
        var _this = _super.call(this) || this;
        // private tabArr: TabButton[] = [];
        _this.panelArr = [];
        _this.setSkin("Skill", "Skill_atlas0", "View_Skill_Panel");
        return _this;
    }
    View_Skill_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(Child_SKill_Learn.URL, Child_SKill_Learn);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_GodSkill.URL, Child_GodSkill);
        fairygui.UIObjectFactory.setPackageItemExtension(SkillItem.URL, SkillItem);
        fairygui.UIObjectFactory.setPackageItemExtension(XingTuTab.URL, XingTuTab);
        fairygui.UIObjectFactory.setPackageItemExtension(View_XingTu_Panel.URL, View_XingTu_Panel);
    };
    View_Skill_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        this._tabContronller = new TabController();
        this._tabContronller.initView(this, this.c1);
        this._tabContronller.setPanelClassMap([
            Child_SKill_Learn,
            Child_GodSkill,
            View_XingTu_Panel,
        ]);
        this._tabContronller.tabChange = this.onTabChange;
        this._tabContronller.tabChangeCaller = this;
        a.panelArr = [UIConst.MAIN_SKILL, UIConst.MAIN_SKILL_GOD, UIConst.XING_TU];
    };
    View_Skill_Panel.prototype.onTabChange = function (pTabIndex, pVo) {
        var arr = this.panelArr;
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        return true;
    };
    // public controllerHandler(): void {
    // 	let a = this;
    // 	a.updateShow();
    // }
    // private curItem;
    // public updateShow(): void {
    // 	let a = this;
    // 	if (a.curItem) {
    // 		a.curItem.close();
    // 	}
    // 	switch (a.c1.selectedIndex) {
    // 		case 0:
    // 			a.curItem = a.item0;
    // 			break;
    // 		case 1:
    // 			a.curItem = a.item1;
    // 			break;
    // 		case 2:
    // 			a.curItem = a.item2;
    // 			break;
    // 	}
    // 	if (a.curItem) {
    // 		a.curItem.open();
    // 	}
    // }
    View_Skill_Panel.prototype.checkTab = function () {
        var t_tabBtnList = this._tabContronller.tabBtnList;
        for (var i = 0; i < t_tabBtnList.length; i++) {
            t_tabBtnList[i].btn.checkNotice = GGlobal.reddot.checkCondition(this.panelArr[i]);
        }
    };
    View_Skill_Panel.prototype.onShown = function () {
        var a = this;
        a._tabContronller.registerEvent(true);
        var t_selectIndex = 0;
        if (a._args)
            t_selectIndex = a._args;
        a._tabContronller.selectedIndex = -1;
        a._tabContronller.selectedIndex = t_selectIndex;
        a.checkTab();
        GGlobal.reddot.listen(ReddotEvent.CHECK_SKILL, a.checkTab, this);
        GGlobal.reddot.listen(ReddotEvent.CHECK_GOD_SKILL, a.checkTab, this);
        GGlobal.reddot.listen(ReddotEvent.CHECK_XINGTU, a.checkTab, a);
    };
    View_Skill_Panel.prototype.onHide = function () {
        this._tabContronller.registerEvent(false);
        this._tabContronller.close();
        var self = this;
        GGlobal.layerMgr.close(UIConst.MAIN_SKILL);
        GGlobal.reddot.remove(ReddotEvent.CHECK_SKILL, self.checkTab, self);
        GGlobal.reddot.remove(ReddotEvent.CHECK_GOD_SKILL, self.checkTab, self);
        GGlobal.reddot.remove(ReddotEvent.CHECK_XINGTU, self.checkTab, self);
    };
    View_Skill_Panel.prototype.dispose = function () {
        if (this._tabContronller)
            this._tabContronller.destroy();
        _super.prototype.dispose.call(this);
    };
    View_Skill_Panel.prototype.guideUpgradeSkill = function (step) {
        var t_panel = this._tabContronller.getTabPanelInstByIndex(0);
        if (t_panel) {
            GuideStepManager.instance.showGuide(t_panel.keyBt, t_panel.keyBt.width / 2, t_panel.keyBt.height / 2);
            GuideStepManager.instance.showGuide1(step.source.index, t_panel.keyBt, t_panel.keyBt.width / 2, 0, -90, -106, -100);
        }
    };
    View_Skill_Panel.prototype.guideClosePanel = function (step) {
        var self = this;
        var btn = self.closeButton.asButton;
        GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
        GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
    };
    View_Skill_Panel.prototype.guideCheckTab = function (arg) {
        return this.c1.selectedIndex == arg;
    };
    //>>>>end
    View_Skill_Panel.URL = "ui://c7onhgk8c14zf";
    return View_Skill_Panel;
}(UIPanelBase));
__reflect(View_Skill_Panel.prototype, "View_Skill_Panel");
