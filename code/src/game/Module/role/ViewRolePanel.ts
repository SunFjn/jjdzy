class ViewRolePanel extends UIPanelBase {

	//>>>>start
	public ctr1: fairygui.Controller;
	public frame: frame3;
	public btnRole: TabButton;
	public btnZS: TabButton;
	public btnShenZhuang: TabButton;
	public btnTitle: TabButton;
	//>>>>end

	public static URL: string = "ui://3tzqotadua8b4";

	private _tabContronller: TabController;

	public static createInstance(): ViewRolePanel {
		return <ViewRolePanel><any>(fairygui.UIPackage.createObject("role", "ViewRolePanel"));
	}

	public constructor() {
		super();
		this.isFullScreen = true;
		this.setSkin("role", "role_atlas0", "ViewRolePanel");
	}
	protected setExtends() {
		var f = fairygui.UIObjectFactory;
		f.setPackageItemExtension(ChildRebirth.URL, ChildRebirth);
		f.setPackageItemExtension(ChildRolePanel.URL, ChildRolePanel);
		f.setPackageItemExtension(ViewGodEquipPanel.URL, ViewGodEquipPanel);
		f.setPackageItemExtension(ChildTitle.URL, ChildTitle);
		f.setPackageItemExtension(TitlePage.URL, TitlePage);
	}

	protected initView(): void {
		super.initView();
		this._tabContronller = new TabController();
		this._tabContronller.initView(this, this.ctr1);
		this._tabContronller.setPanelClassMap(
			[
				ChildRolePanel,
				ChildRebirth,
				ViewGodEquipPanel,
				ChildTitle,
			]
		);

		this._tabContronller.tabChange = this.onTabChange;
		this._tabContronller.tabChangeCaller = this;
	}

	private _uidList = [UIConst.ROLE, UIConst.REBIRTH, UIConst.GOD_EQUIP, UIConst.TITLE];
	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		let self = this;
		let arr = self._uidList;
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}
		self.frame.setTitleVis(arr[pTabIndex] != UIConst.ROLE);
		return true;
	}

	private closeHnadler(evt) {
		GGlobal.layerMgr.close(UIConst.ROLE);
	}

	protected onShown() {
		this._tabContronller.registerEvent(true);

		let t_selectIndex = 0;
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
	}

	protected onHide() {
		this._tabContronller.registerEvent(false);
		this._tabContronller.close();

		this.closeButton.removeClickListener(this.closeHnadler, this);
		GGlobal.reddot.remove(ReddotEvent.CHECK_ROLE, this.checkRolelNotice, this);
		GGlobal.reddot.remove(ReddotEvent.CHECK_ZHAN_JIA, this.checkRolelNotice, this);
		GGlobal.reddot.remove(ReddotEvent.CHECK_REBIRTH, this.checkZsNotice, this);
		GGlobal.reddot.remove(ReddotEvent.CHECK_BAOWU, this.checkRolelNotice, this);
		GGlobal.reddot.remove(ReddotEvent.CHECK_TIANSHU, this.checkRolelNotice, this);
		GGlobal.reddot.remove(ReddotEvent.CHECK_BINGFA, this.checkRolelNotice, this);
	}

	public checkRolelNotice() {
		var r = GGlobal.reddot
		//称号按钮
		this.btnTitle.checkNotice = r.checkCondition(UIConst.TITLE, 0);
		this.btnShenZhuang.checkNotice = r.checkCondition(UIConst.GOD_EQUIP, 0) || r.checkCondition(UIConst.GOD_EQUIP, 1);

		//宝物
		let checkBW = r.checkCondition(UIConst.BAOWU, 0) || r.checkCondition(UIConst.BAOWU, 1);
		//天书
		let checkTS = r.checkCondition(UIConst.TIANSHU, 0) || r.checkCondition(UIConst.TIANSHU, 1) || r.checkCondition(UIConst.TIANSHU, 2)
			|| r.checkCondition(UIConst.TIANSHU, 3) || r.checkCondition(UIConst.TIANSHU, 4) || r.checkCondition(UIConst.TIANSHU, 5);
		//神剑
		let checkShenJian = r.checkCondition(UIConst.SHEN_JIAN, 0) || r.checkCondition(UIConst.SHEN_JIAN, 1) || r.checkCondition(UIConst.SHEN_JIAN, 2);
		//异宝
		let checkYB;
		if (Model_YiBao.isFirstOpen) {
			checkYB = r.checkCondition(UIConst.YIBAO, 0) || r.checkCondition(UIConst.YIBAO, 1) || r.checkCondition(UIConst.YIBAO, 2);
		} else {
			checkYB = r.checkCondition(UIConst.ROLE, UIConst.YIBAO);
		}
		//战甲
		let checkZJ = r.checkCondition(UIConst.ZHAN_JIA, 0)
		//兵法
		let checkBF = r.checkCondition(UIConst.BINGFA, 0) || r.checkCondition(UIConst.BINGFA, 1) || r.checkCondition(UIConst.BINGFA, 2) || r.checkCondition(UIConst.BINGFA, 3);

		let checkLH = r.checkCondition(UIConst.LUNHUI) || r.checkCondition(UIConst.TIANMING) || Model_LunHui.checkSWNotice();
		//角色按钮
		this.btnRole.checkNotice = r.checkCondition(UIConst.ROLE, 1) ||
			checkBF || checkZJ || checkYB || checkShenJian || checkTS || checkBW || checkLH;
	}

	private checkZsNotice() {
		var r = GGlobal.reddot
		this.btnZS.checkNotice = r.checkCondition(UIConst.REBIRTH, 0);
	}

	public guidePage(step: any): void {
		let s = this;
		if (!s.isInit) return;
		if (Number(step.arg) == UIConst.ROLE) {
			let t_index = s._uidList.indexOf(~~step.arg);
			let t_panel: ChildRolePanel = <any>this._tabContronller.getTabPanelInstByIndex(t_index);
			if (t_panel) {
				GuideStepManager.instance.showGuide(t_panel.btnOneKey, t_panel.btnOneKey.width / 2, t_panel.btnOneKey.height / 2);
				GuideStepManager.instance.showGuide1(step.source.index, t_panel.btnOneKey, t_panel.btnOneKey.width / 2, 0, -90, -106, -100);
			}
		} else if (Number(step.arg) == UIConst.REBIRTH) {
			let t_index = s._uidList.indexOf(~~step.arg);
			let t_panel: ChildRebirth = <any>this._tabContronller.getTabPanelInstByIndex(t_index);
			if (t_panel) {
				GuideStepManager.instance.showGuide(t_panel.btnReBirth, t_panel.btnReBirth.width / 2, t_panel.btnReBirth.height / 2);
				GuideStepManager.instance.showGuide1(step.source.index, t_panel.btnReBirth, t_panel.btnReBirth.width / 2, 0, -90, -106, -100);
				if (t_panel.btnReBirth.parent) t_panel.btnReBirth.parent.setChildIndex(t_panel.btnReBirth, t_panel.btnReBirth.parent.numChildren - 1);
			}
		}
	}

	public guideClosePanel(step) {
		let btn = this.frame.closeButton;
		GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
		GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
	}

	public check_guideTab(arg) {
		return this.ctr1.selectedIndex == arg;
	}

	public guideTab(step) {
		let tab = this._tabContronller.getTabBtnByIndex(step.arg);
		GuideStepManager.instance.showGuide(tab, tab.width / 2, tab.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, tab, tab.width / 2, 0, -90, -106, -100);
		if (tab.parent) tab.parent.setChildIndex(tab, tab.parent.numChildren - 1);
	}

	public dispose() {
		if (this._tabContronller)
			this._tabContronller.destroy();
		super.dispose();
	}
}