class ViewBagPanel extends UIPanelBase {

	//>>>>start
	public c1: fairygui.Controller;
	public frame: frame3;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public tab3: TabButton;
	//>>>>end

	public static URL: string = "ui://v4sxjak57jrg0";

	private _tabContronller: TabController;

	/** 存储标签传入的数据 */
	private _panelDataMap: any[] = [];

	public static createInstance(): ViewBagPanel {
		return <ViewBagPanel><any>(fairygui.UIPackage.createObject("bag", "ViewBagPanel"));
	}
	public constructor() {
		super();
		this.setSkin("bag", "bag_atlas0", "ViewBagPanel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(ViewBagOpenGrid.URL, ViewBagOpenGrid);
		fairygui.UIObjectFactory.setPackageItemExtension(ChildBagEquip.URL, ChildBagEquip);
		fairygui.UIObjectFactory.setPackageItemExtension(ChildBagItem.URL, ChildBagItem);
	}
	protected initView(): void {
		super.initView();

		this._tabContronller = new TabController();
		this._tabContronller.initView(this, this.c1);
		this._tabContronller.setPanelClassMap(
			[
				ChildBagItem,
				ChildBagEquip,
				ChildBagItem,
			]
		);

		this._panelDataMap =
			[
				0,
				null,
				1,
			];

		this._tabContronller.tabChange = this.onTabChange;
		this._tabContronller.tabChangeCaller = this;

		this.frame.getChild("icon").asLoader.url = "ui://v4sxjak5t570e";
	}

	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		pVo.data = this._panelDataMap[pTabIndex];
		return true;
	}

	protected onShown(): void {
		this.addListen();
		this.selectPage();

		this._tabContronller.selectedIndex = -1;
		this._tabContronller.selectedIndex = 0;
	}

	protected onHide(): void {
		this.removeListen();
		this._tabContronller.close();
	}

	private addListen(): void {
		GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.selectPage, this);
		GGlobal.control.listen(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, this.selectPage, this);
		GGlobal.control.listen(Enum_MsgType.MSG_BAG_SIZE_UPDATE, this.selectPage, this);
		this.tab3.addClickListener(this.onOpenHC, this);
		this._tabContronller.registerEvent(true);
	}


	private removeListen(): void {
		GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.selectPage, this);
		GGlobal.control.remove(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, this.selectPage, this);
		GGlobal.control.remove(Enum_MsgType.MSG_BAG_SIZE_UPDATE, this.selectPage, this);
		this.tab3.removeClickListener(this.onOpenHC, this);
		GGlobal.layerMgr.close(UIConst.BAG);
		this._tabContronller.registerEvent(false);
	}

	public selectPage() {
		let t_curIndex = this._tabContronller.selectedIndex;
		this._tabContronller.forceUpdate(t_curIndex);

		this.tab0.checkNotice = Model_Bag.checkItemBagNotice();
		this.tab1.checkNotice = Model_Bag.checkEquipNotice();
		this.tab3.checkNotice = Model_RongLian.checkHeCheng();
	}


	private onOpenHC() {
		this.tab3.selected = false;
		GGlobal.layerMgr.open(UIConst.RONGLIAN_HC);
	}

	public dispose() {
		if (this._tabContronller)
			this._tabContronller.destroy();
		super.dispose();
	}
}