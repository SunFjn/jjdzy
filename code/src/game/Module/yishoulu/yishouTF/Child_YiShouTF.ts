class Child_YiShouTF extends fairygui.GComponent implements IPanel {

	public static URL: string = "ui://7y83phvnpz9ks";
	public static createInstance(): Child_YiShouTF {
		return <Child_YiShouTF><any>(fairygui.UIPackage.createObject("YiShouLu", "Child_YiShouTF"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public c1: fairygui.Controller;
	private _tabContronller: TabController;
	private tabArr: TabButton[];
	public initView(pParent: fairygui.GObject) {
		let self = this;
		self.tabArr = [self["tab0"], self["tab1"], self["tab2"]];
		self._uidList = [UIConst.YISHOULU_TF, UIConst.YISHOULU_TFCOLOR, UIConst.XIULIAN_TF];
		self._tabContronller = new TabController();
		self._tabContronller.initView(self, self.c1);
		self._tabContronller.setPanelClassMap(
			[
				Item_YiShouTF_UpLv,
				Item_YiShouTF_UpLv,
				Item_XiuLianTF,
			]
		);
		self._tabContronller.tabChange = self.onTabChange;
		self._tabContronller.tabChangeCaller = self;
	}

	private _uidList = [];
	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		let arr = this._uidList;
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}
		pVo.data = pTabIndex;
		return true;
	}

	private checkNotcie() {
		let self = this;
		let red = GGlobal.reddot;
		self.tabArr[0].checkNotice = red.checkCondition(UIConst.YISHOULU_TF, 0);
		self.tabArr[1].checkNotice = red.checkCondition(UIConst.YISHOULU_TF, 1);
		self.tabArr[2].checkNotice = red.checkCondition(UIConst.XIULIAN_TF, 0);
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
		if (!Model_YiShouLu.hasTFData) {
			GGlobal.modelYiShouLu.CG_OPENYISHOW_TF();
		}
		self.checkNotcie();
		let r = GGlobal.reddot;
		r.listen(UIConst.YISHOULU_TF, self.checkNotcie, self);
	}

	closePanel(pData?: any) {
		let self = this;
		self._tabContronller.registerEvent(false);
		self._tabContronller.close();
		let r = GGlobal.reddot;
		r.remove(UIConst.YISHOULU_TF, self.checkNotcie, self);
	}
}