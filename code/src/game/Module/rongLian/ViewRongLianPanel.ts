class ViewRongLianPanel extends UIPanelBase {

	//>>>>start
	public c1: fairygui.Controller;
	public frame: frame3;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	//>>>>end

	public static URL: string = "ui://ny9kb4yzetor0";

	private _tabContronller: TabController;

	public static createInstance(): ViewRongLianPanel {
		return <ViewRongLianPanel><any>(fairygui.UIPackage.createObject("rongLian", "ViewRongLianPanel"));
	}

	public constructor() {
		super();
		this.setSkin("rongLian", "rongLian_atlas0", "ViewRongLianPanel");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ChildRongLian.URL, ChildRongLian);
		f(ChildFenJie.URL, ChildFenJie);
		f(VFenJieGrid.URL, VFenJieGrid);
		f(VHeChengTab.URL, VHeChengTab);
		f(ChildHeCheng.URL, ChildHeCheng);
	}

	protected initView(): void {
		super.initView();

		this._tabContronller = new TabController();
		this._tabContronller.initView(this, this.c1);
		this._tabContronller.setPanelClassMap(
			[
				ChildRongLian,
				ChildFenJie,
				ChildHeCheng,
			]
		);

		this._tabContronller.tabChange = this.onTabChange;
		this._tabContronller.tabChangeCaller = this;
	}

	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		return true;
	}


	protected onShown(): void {
		this._tabContronller.registerEvent(true);

		let t_selectIndex = 0;
		if (this._args)
			t_selectIndex = this._args;
		this._tabContronller.selectedIndex = -1;
		this._tabContronller.selectedIndex = t_selectIndex;

		this.addListen();
		this.upCheck()
	}

	protected onHide(): void {
		this._tabContronller.registerEvent(false);
		this._tabContronller.close();

		this.removeListen();
	}

	private _first: boolean = false
	private addListen(): void {
		GGlobal.reddot.listen(UIConst.RONGLIAN, this.upCheck, this);
		GGlobal.reddot.listen(UIConst.BAG, this.upCheck, this);
		GGlobal.modelRL.CG_RL_INFO();
		if (!this._first) {
			GGlobal.modelEquip.CGGetEquips(3);
			this._first = true
		}
	}

	private removeListen(): void {
		GGlobal.reddot.remove(UIConst.RONGLIAN, this.upCheck, this);
		GGlobal.reddot.remove(UIConst.BAG, this.upCheck, this);
		GGlobal.layerMgr.close(UIConst.RONGLIAN);
	}

	private upCheck() {
		let s = this
		let r = GGlobal.reddot;
		s.tab0.checkNotice = r.checkCondition(UIConst.RONGLIAN, 0);
		s.tab1.checkNotice = r.checkCondition(UIConst.RONGLIAN, 1);
		s.tab2.checkNotice = r.checkCondition(UIConst.RONGLIAN, 2);
	}

	public check_guideTab(arg) {
		let isCheck = true;
		return this.c1.selectedIndex == arg && isCheck;
	}

	public guideTab(arg) {
		let tab = this._tabContronller.getTabBtnByIndex(arg);
		GuideStepManager.instance.showGuide(tab, tab.width / 2, tab.height / 2);
	}

	public guide_ronglian(step) {
		let t_panel: ChildRongLian = <any>this._tabContronller.getTabPanelInstByIndex(0);
		if (t_panel)
			t_panel.guide_ronglian(step);
	}

	public guideClosePanel(step) {
		let btn = this.closeButton.asButton;
		GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
		GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
	}

	public dispose() {
		if (this._tabContronller)
			this._tabContronller.destroy();
		super.dispose();
	}
}