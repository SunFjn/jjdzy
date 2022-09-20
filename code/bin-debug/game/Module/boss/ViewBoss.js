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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewBoss = (function (_super) {
    __extends(ViewBoss, _super);
    function ViewBoss() {
        var _this = _super.call(this) || this;
        _this._uidList = [UIConst.DRBOSS, UIConst.QMBOSS, UIConst.BOSS_BATTLEFIELD_LOCAL, UIConst.YSBOSS];
        _this.isShowOpenAnimation = false;
        _this.setSkin("Boss", "Boss_atlas0", "ViewBoss");
        return _this;
    }
    ViewBoss.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "ViewBoss"));
    };
    ViewBoss.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(PersonalItem.URL, PersonalItem);
        f(ChildPersonalBoss.URL, ChildPersonalBoss);
        f(QuanMinHead.URL, QuanMinHead);
        f(ChildQuanMinBoss.URL, ChildQuanMinBoss);
        f(QMBossInfo.URL, QMBossInfo);
        f(QMBossRnk.URL, QMBossRnk);
        f(Child7MengHuo.URL, Child7MengHuo);
        f(MHTargetItem.URL, MHTargetItem);
        f(MengHuoSceneInfo.URL, MengHuoSceneInfo);
        f(MengHuoItem.URL, MengHuoItem);
        f(Child_BOSSZC.URL, Child_BOSSZC);
        f(BossZCTimer.URL, BossZCTimer);
        f(BossZCPveTimer.URL, BossZCPveTimer);
        f(BossZCItem.URL, BossZCItem);
        f(ChildYiShouBoss.URL, ChildYiShouBoss);
        f(ChildYSBossTip.URL, ChildYSBossTip);
        f(YiShowBossScenePanel.URL, YiShowBossScenePanel);
    };
    ViewBoss.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this._tabContronller = new TabController();
        this._tabContronller.initView(this, this.c1);
        this._tabContronller.setPanelClassMap([
            ChildPersonalBoss,
            ChildQuanMinBoss,
            Child_BOSSZC,
            ChildYiShouBoss,
        ]);
        this._tabContronller.tabChange = this.onTabChange;
        this._tabContronller.tabChangeCaller = this;
    };
    ViewBoss.prototype.onTabChange = function (pTabIndex, pVo) {
        var arr = this._uidList;
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        return true;
    };
    ViewBoss.prototype.checkBoss = function () {
        var r = GGlobal.reddot;
        this.tb0.checkNotice = r.checkCondition(UIConst.DRBOSS);
        this.tb1.checkNotice = r.checkCondition(UIConst.QMBOSS);
        this.tb2.checkNotice = r.checkCondition(UIConst.BOSS_BATTLEFIELD_LOCAL) || r.checkCondition(UIConst.BOSS_BATTLEFIELD_CROSS) || r.checkCondition(UIConst.SHOP);
        this.tb3.checkNotice = r.checkCondition(UIConst.YSBOSS);
    };
    ViewBoss.prototype.onShown = function () {
        this._tabContronller.registerEvent(true);
        var s = this;
        var r = GGlobal.reddot;
        var t_selectIndex = 0;
        if (s._args) {
            if (s._args >= 10) {
                t_selectIndex = Math.floor(s._args / 10);
                if (t_selectIndex == 2) {
                    GGlobal.modelBossZc.sceneType = (s._args % 10) + 1;
                }
            }
            else {
                t_selectIndex = s._args;
            }
        }
        this._tabContronller.selectedIndex = -1;
        this._tabContronller.selectedIndex = t_selectIndex;
        // s.onPage();
        s.checkBoss();
        r.listen(UIConst.YSBOSS, s.checkBoss, s);
        r.listen(UIConst.DRBOSS, s.checkBoss, s);
        r.listen(UIConst.QMBOSS, s.checkBoss, s);
        r.listen(UIConst.BOSS_BATTLEFIELD_LOCAL, s.checkBoss, s);
        r.listen(UIConst.BOSS_BATTLEFIELD_CROSS, s.checkBoss, s);
        var act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
        var boo = (act != null);
        this.imgDoub0.visible = boo;
        this.imgDoub1.visible = boo;
    };
    ViewBoss.prototype.onHide = function () {
        var s = this;
        this._tabContronller.registerEvent(false);
        this._tabContronller.close();
        var r = GGlobal.reddot;
        r.remove(UIConst.YSBOSS, s.checkBoss, s);
        r.remove(UIConst.DRBOSS, s.checkBoss, s);
        r.remove(UIConst.QMBOSS, s.checkBoss, s);
        r.remove(UIConst.BOSS_BATTLEFIELD_LOCAL, s.checkBoss, s);
        r.remove(UIConst.BOSS_BATTLEFIELD_CROSS, s.checkBoss, s);
        GGlobal.layerMgr.close(UIConst.BOSS);
    };
    ViewBoss.prototype.check_guideTab = function (arg) {
        var isCheck = true;
        if (this.c1.selectedIndex == 0) {
            var t_panel = this._tabContronller.getTabPanelInstByIndex(0);
            if (t_panel)
                isCheck = t_panel.lst.numItems > 0;
        }
        return this.c1.selectedIndex == arg && isCheck;
    };
    ViewBoss.prototype.guideTab = function (arg) {
        var tab = this["tb" + arg];
        GuideStepManager.instance.showGuide(tab, tab.width / 2, tab.height / 2);
    };
    ViewBoss.prototype.guide_DRBOSS_battle = function (step) {
        var t_panel = this._tabContronller.getTabPanelInstByIndex(0);
        if (t_panel)
            t_panel.setGuide(Handler.create(t_panel, t_panel.guide_DRBOSS_battle, [step], true));
    };
    ViewBoss.prototype.guide_QMBOSS_battle = function (step) {
        var t_panel = this._tabContronller.getTabPanelInstByIndex(1);
        if (t_panel)
            t_panel.guide_QMBOSS_battle(step);
    };
    ViewBoss.prototype.guideClosePanel = function (step) {
        var btn = this.closeButton.asButton;
        GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
        GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
    };
    //>>>>end
    ViewBoss.URL = "ui://47jfyc6etujy2";
    return ViewBoss;
}(UIPanelBase));
__reflect(ViewBoss.prototype, "ViewBoss");
