class Child_YiShou extends fairygui.GComponent implements IPanel {

	public static URL: string = "ui://7y83phvnpz9kq";
	public static createInstance(): Child_YiShou {
		return <Child_YiShou><any>(fairygui.UIPackage.createObject("YiShouLu", "Child_YiShou"));
	}

	public constructor() {
		super();
	}

	public c1: fairygui.Controller;
	private _tabContronller: TabController;
	private tabArr: TabButton[];
	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		let self = this;
		self.tabArr = [self["tab0"], self["tab1"]];
		self._uidList = [UIConst.YISHOULU, UIConst.XIANSHAN_XUNSHOU];
		self._tabContronller = new TabController();
		self._tabContronller.initView(self, self.c1);
		self._tabContronller.setPanelClassMap(
			[
				YiShouLuView,
				Child_XSXS,
			]
		);
		self._tabContronller.tabChange = self.onTabChange;
		self._tabContronller.tabChangeCaller = self;
		self._viewParent = pParent;
		self.addRelation(self._viewParent, fairygui.RelationType.Size);
	}

	private _uidList = [];
	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		let arr = this._uidList;
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}
		pVo.data = this._args;
		return true;
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	private checkTabNotice() {
		let self = this;
		let red = GGlobal.reddot;
		self.tabArr[0].checkNotice = red.checkCondition(UIConst.YISHOULU, 0);
		self.tabArr[1].checkNotice = red.checkCondition(UIConst.XIANSHAN_XUNSHOU, 0);
	}

	private _args = 0;
	openPanel(pData?: any) {
		let self = this;
		self._args = pData;
		self._tabContronller.registerEvent(true);
		let t_selectIndex = 0;
		if (self._args) {
			t_selectIndex = self._args % 10;
		}
		self._tabContronller.selectedIndex = -1;
		self._tabContronller.selectedIndex = t_selectIndex;
		self.checkTabNotice();
		let r = GGlobal.reddot;
		r.listen(UIConst.XIANSHAN_XUNSHOU, self.checkTabNotice, self);
		r.listen(UIConst.YISHOULU, self.checkTabNotice, self);
		GGlobal.control.listen(UIConst.YISHOULU, self.checkTabNotice, self);
	}

	closePanel() {
		let self = this;
		self._tabContronller.registerEvent(false);
		self._tabContronller.close();
		let r = GGlobal.reddot;
		r.remove(UIConst.XIANSHAN_XUNSHOU, self.checkTabNotice, self);
		r.remove(UIConst.YISHOULU, self.checkTabNotice, self);
		GGlobal.control.remove(UIConst.YISHOULU, self.checkTabNotice, self);
	}
}