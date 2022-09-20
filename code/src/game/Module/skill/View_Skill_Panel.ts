class View_Skill_Panel extends UIPanelBase {
	//>>>>start
	public c1: fairygui.Controller;
	public frame: WindowFrame1;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	//>>>>end

	public static URL: string = "ui://c7onhgk8c14zf";

	// private tabArr: TabButton[] = [];
	private panelArr = [];

	private _tabContronller: TabController;

	public constructor() {
		super();
		this.setSkin("Skill", "Skill_atlas0", "View_Skill_Panel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(Child_SKill_Learn.URL, Child_SKill_Learn);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_GodSkill.URL, Child_GodSkill);
		fairygui.UIObjectFactory.setPackageItemExtension(SkillItem.URL, SkillItem);
		fairygui.UIObjectFactory.setPackageItemExtension(XingTuTab.URL, XingTuTab);
		fairygui.UIObjectFactory.setPackageItemExtension(View_XingTu_Panel.URL, View_XingTu_Panel);
	}
	protected initView(): void {
		super.initView();
		let a = this;

		this._tabContronller = new TabController();
		this._tabContronller.initView(this, this.c1);
		this._tabContronller.setPanelClassMap(
			[
				Child_SKill_Learn,
				Child_GodSkill,
				View_XingTu_Panel,
			]
		);

		this._tabContronller.tabChange = this.onTabChange;
		this._tabContronller.tabChangeCaller = this;

		a.panelArr = [UIConst.MAIN_SKILL, UIConst.MAIN_SKILL_GOD, UIConst.XING_TU];
	}

	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		let arr = this.panelArr;
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}
		return true;
	}

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

	private checkTab() {
		let t_tabBtnList = this._tabContronller.tabBtnList;
		for (let i = 0; i < t_tabBtnList.length; i++) {
			t_tabBtnList[i].btn.checkNotice = GGlobal.reddot.checkCondition(this.panelArr[i]);
		}
	}

	protected onShown(): void {
		let a = this;

		a._tabContronller.registerEvent(true);

		let t_selectIndex = 0;
		if (a._args)
			t_selectIndex = a._args;
		a._tabContronller.selectedIndex = -1;
		a._tabContronller.selectedIndex = t_selectIndex;

		a.checkTab();
		GGlobal.reddot.listen(ReddotEvent.CHECK_SKILL, a.checkTab, this);
		GGlobal.reddot.listen(ReddotEvent.CHECK_GOD_SKILL, a.checkTab, this);
		GGlobal.reddot.listen(ReddotEvent.CHECK_XINGTU, a.checkTab, a);
	}

	protected onHide(): void {
		this._tabContronller.registerEvent(false);
		this._tabContronller.close();

		let self = this;
		GGlobal.layerMgr.close(UIConst.MAIN_SKILL);
		GGlobal.reddot.remove(ReddotEvent.CHECK_SKILL, self.checkTab, self);
		GGlobal.reddot.remove(ReddotEvent.CHECK_GOD_SKILL, self.checkTab, self);
		GGlobal.reddot.remove(ReddotEvent.CHECK_XINGTU, self.checkTab, self);
	}

	public dispose() {
		if (this._tabContronller)
			this._tabContronller.destroy();
		super.dispose();
	}

	public guideUpgradeSkill(step) {
		let t_panel: Child_SKill_Learn = <any>this._tabContronller.getTabPanelInstByIndex(0);
		if (t_panel) {
			GuideStepManager.instance.showGuide(t_panel.keyBt, t_panel.keyBt.width / 2, t_panel.keyBt.height / 2);
			GuideStepManager.instance.showGuide1(step.source.index, t_panel.keyBt, t_panel.keyBt.width / 2, 0, -90, -106, -100);
		}
	}

	public guideClosePanel(step) {
		let self = this;
		let btn = self.closeButton.asButton;
		GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
		GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
	}

	public guideCheckTab(arg) {
		return this.c1.selectedIndex == arg;
	}
}