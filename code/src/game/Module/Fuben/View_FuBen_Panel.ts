class View_FuBen_Panel extends UIPanelBase {

	//>>>>start
	public c1: fairygui.Controller;
	public frame: WindowFrame1;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public tab3: TabButton;
	//>>>>end

	public static URL: string = "ui://pkuzcu87jie00";

	private _tabContronller: TabController;

	public constructor() {
		super();
		this.setSkin("FuBen", "FuBen_atlas0", "View_FuBen_Panel");
	}
	protected setExtends() {
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
	}

	protected initView(): void {
		super.initView();

		this._tabContronller = new TabController();
		this._tabContronller.initView(this, this.c1);
		this._tabContronller.setPanelClassMap(
			[
				Child_Peacock,
				Child_CaiLiaoFB,
				Child_YJDQ,
				Child_RunMan,
			]
		);

		this._tabContronller.tabChange = this.onTabChange;
		this._tabContronller.tabChangeCaller = this;
	}

	private _uidList = [UIConst.PEACOCK, UIConst.FUBEN_CAILIAO, UIConst.FUBEN_YJDQ, UIConst.RUNMAN];
	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		let arr = this._uidList;
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}
		return true;
	}

	public updateShow(): void {
		this._tabContronller.forceUpdate(this._tabContronller.selectedIndex);
	}

	private checkTabNotice(): void {
		this._tabContronller.getTabBtnByIndex(0).checkNotice = Model_Peacock.checkNotice();
		this._tabContronller.getTabBtnByIndex(1).checkNotice = GGlobal.reddot.checkCondition(UIConst.FUBEN_CAILIAO);
		this._tabContronller.getTabBtnByIndex(2).checkNotice = GGlobal.reddot.checkCondition(UIConst.FUBEN_YJDQ);
		this._tabContronller.getTabBtnByIndex(3).checkNotice = GGlobal.reddot.checkCondition(UIConst.RUNMAN);
	}

	protected onShown(): void {
		this._tabContronller.registerEvent(true);
		let a = this;

		let t_selectIndex = 0;
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
	}

	protected onHide(): void {
		this._tabContronller.registerEvent(false);
		this._tabContronller.close();

		let a = this;
		var layerMgr = GGlobal.layerMgr;
		layerMgr.close(UIConst.FUBEN);
		GGlobal.control.remove(Enum_MsgType.PEACOCK_OPENUI, a.updateShow, a)
		GGlobal.control.remove(Enum_MsgType.PEACOCK_OPENUI, a.checkTabNotice, a)
		GGlobal.control.remove(Enum_MsgType.PEACOCK_PASSLAYER_NUM, a.checkTabNotice, a)
		GGlobal.reddot.remove(ReddotEvent.CHECK_YJDQ, a.checkTabNotice, a);
		GGlobal.reddot.remove(ReddotEvent.CHECK_FUBEN_CAILIAO, a.checkTabNotice, a);
		GGlobal.reddot.remove(ReddotEvent.CHECK_RUNMAN, a.checkTabNotice, a);
	}

	public check_guideTab(arg) {
		return this.c1.selectedIndex == arg;
	}

	public guideTab(arg) {
		let tab = this._tabContronller.getTabBtnByIndex(arg);
		if (tab)
			GuideStepManager.instance.showGuide(tab, tab.width / 2, tab.height / 2);
	}

	public guide_peacock_battle(step) {
		let t_panel: Child_Peacock = <any>this._tabContronller.getTabPanelInstByIndex(0);
		if (t_panel)
			t_panel.guide_peacock_battle(step);
	}

	public guideCaiLiao(step) {
		let t_panel: Child_CaiLiaoFB = <any>this._tabContronller.getTabPanelInstByIndex(1);
		if (t_panel)
			t_panel.guideBattle(step);
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