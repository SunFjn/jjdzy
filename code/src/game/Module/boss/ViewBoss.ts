/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewBoss extends UIPanelBase {

	//>>>>start
	public c1: fairygui.Controller;
	public frame: WindowFrame1;
	public tb0: TabButton;
	public tb1: TabButton;
	public tb2: TabButton;
	public tb3: TabButton;
	public imgDoub0: fairygui.GImage;
	public imgDoub1: fairygui.GImage;
	//>>>>end

	public static URL: string = "ui://47jfyc6etujy2";

	private _tabContronller: TabController;

	public static createInstance(): ViewBoss {
		return <ViewBoss><any>(fairygui.UIPackage.createObject("Boss", "ViewBoss"));
	}

	public constructor() {
		super();
		this.isShowOpenAnimation = false;
		this.setSkin("Boss", "Boss_atlas0", "ViewBoss");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
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
	}

	protected initView(): void {
		super.initView();

		this._tabContronller = new TabController();
		this._tabContronller.initView(this, this.c1);
		this._tabContronller.setPanelClassMap(
			[
				ChildPersonalBoss,
				ChildQuanMinBoss,
				Child_BOSSZC,
				ChildYiShouBoss,
			]
		);

		this._tabContronller.tabChange = this.onTabChange;
		this._tabContronller.tabChangeCaller = this;
	}

	private _uidList = [UIConst.DRBOSS, UIConst.QMBOSS, UIConst.BOSS_BATTLEFIELD_LOCAL, UIConst.YSBOSS];
	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		let arr = this._uidList;
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}
		return true;
	}

	private checkBoss() {
		let r = GGlobal.reddot;
		this.tb0.checkNotice = r.checkCondition(UIConst.DRBOSS);
		this.tb1.checkNotice = r.checkCondition(UIConst.QMBOSS);
		this.tb2.checkNotice = r.checkCondition(UIConst.BOSS_BATTLEFIELD_LOCAL) || r.checkCondition(UIConst.BOSS_BATTLEFIELD_CROSS) || r.checkCondition(UIConst.SHOP);
		this.tb3.checkNotice = r.checkCondition(UIConst.YSBOSS);
	}

	protected onShown() {
		this._tabContronller.registerEvent(true);

		let s = this;
		let r = GGlobal.reddot;

		let t_selectIndex = 0;
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

		let act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
		let boo = (act != null);
		this.imgDoub0.visible = boo
		this.imgDoub1.visible = boo
	}

	protected onHide() {
		let s = this;

		this._tabContronller.registerEvent(false);
		this._tabContronller.close();

		let r = GGlobal.reddot;
		r.remove(UIConst.YSBOSS, s.checkBoss, s);
		r.remove(UIConst.DRBOSS, s.checkBoss, s);
		r.remove(UIConst.QMBOSS, s.checkBoss, s);
		r.remove(UIConst.BOSS_BATTLEFIELD_LOCAL, s.checkBoss, s);
		r.remove(UIConst.BOSS_BATTLEFIELD_CROSS, s.checkBoss, s);
		GGlobal.layerMgr.close(UIConst.BOSS);
	}

	public check_guideTab(arg) {
		let isCheck = true;
		if (this.c1.selectedIndex == 0) {
			let t_panel: ChildPersonalBoss = <any>this._tabContronller.getTabPanelInstByIndex(0);
			if (t_panel)
				isCheck = t_panel.lst.numItems > 0;
		}
		return this.c1.selectedIndex == arg && isCheck;
	}

	public guideTab(arg) {
		let tab = this["tb" + arg];
		GuideStepManager.instance.showGuide(tab, tab.width / 2, tab.height / 2);
	}

	public guide_DRBOSS_battle(step) {
		let t_panel: ChildPersonalBoss = <any>this._tabContronller.getTabPanelInstByIndex(0);
		if (t_panel)
			t_panel.setGuide(Handler.create(t_panel, t_panel.guide_DRBOSS_battle, [step], true));
	}

	public guide_QMBOSS_battle(step) {
		let t_panel: ChildQuanMinBoss = <any>this._tabContronller.getTabPanelInstByIndex(1);
		if (t_panel)
			t_panel.guide_QMBOSS_battle(step);
	}

	public guideClosePanel(step) {
		let btn = this.closeButton.asButton;
		GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
		GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
	}
}