/**
 * 万兽之王-连充豪礼
 */
class Child_WSZW_LianChong extends fairygui.GComponent implements IPanel {
	//>>>>start
	public labTime: fairygui.GRichTextField;
	public moneyIcon: fairygui.GLoader;
	public titleList: fairygui.GList;
	public list: fairygui.GList;
	public labTips: fairygui.GRichTextField;
	public bpList: fairygui.GList;
	public imgHeadbg: fairygui.GLoader;
	//>>>>end
	private _act: Vo_Activity;
	private _index: number = 0;
	private tabArr: Array<Ilxcz_764 | Ilxczzs_764> = [];

	private _listData: Array<any>;
	private _bigAwards = [];

	public static pkg = "WSZWActLCHL";

	public static URL: string = "ui://niyo89miq6qw0";

	public static createInstance(): Child_WSZW_LianChong {
		return <Child_WSZW_LianChong><any>(fairygui.UIPackage.createObject("WSZWActLCHL", "Child_WSZW_LianChong"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(WSZW_LianChong_Item.URL, WSZW_LianChong_Item);
		f(WSZWListGrid.URL, WSZWListGrid);
	}

	initView(pParent: fairygui.GObject) {
		let self = this;
		self.titleList.callbackThisObj = self;
		self.titleList.itemRenderer = self.renderHandle;

		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandle1;
		self.list.setVirtual();

		self.bpList.itemRenderer = self.itemRender;
		self.bpList.callbackThisObj = self;
	}

	openPanel(pData?: Vo_Activity) {
		this.y = 264;
		this._act = pData;
		if (this._act.id == UIConst.WSZW_LIANCHONGHAOLI) {
			this.tabArr = Model_WanShouZhiWang.getIlchlzs_756s(this._act.qs);
			GGlobal.modelEightLock.CG4571(this._act.id);
		} else if (this._act.id == UIConst.XINHD_LXCZ) {
			this.tabArr = Model_WanShouZhiWang.getIlxczzs_764(this._act.qs);
			GGlobal.modelActivity.CG_OPENACT(this._act.id)
		}
		this.titleList.numItems = this.tabArr.length;
		this.show();
	}

	closePanel(pData?: any) {
		this.disposePanel();
	}

	dispose() {
		this.disposePanel();
		super.dispose()
	}

	/**注销事件 */
	private disposePanel() {
		let self = this;
		self.list.numItems = 0;
		self.titleList.numItems = 0
		self.bpList.numItems = 0;
		Timer.instance.remove(self.onUpdate, self);
		GGlobal.control.remove(UIConst.WSZW_LIANCHONGHAOLI, self.updateList, self);
		self.titleList.removeEventListener(fairygui.ItemEvent.CLICK, self.tabHandle, self);
		IconUtil.setImg(self.imgHeadbg, null);
	}

	private show(): void {
		let self = this;
		Timer.instance.listen(self.onUpdate, self);
		GGlobal.control.listen(UIConst.WSZW_LIANCHONGHAOLI, self.updateList, self);
		self.titleList.addEventListener(fairygui.ItemEvent.CLICK, self.tabHandle, self);
		this.titleList.selectedIndex = 0;
		self._index = 0;
		IconUtil.setImg1(Enum_Path.ACTCOM_URL + "lianchonghaoli.jpg", this.imgHeadbg);
	}

	private onUpdate() {
		const end = this._act ? this._act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			this.labTime.text = "00:00:00";
		}
	}

	private renderHandle(index: number, obj: fairygui.GButton): void {
		let tab: fairygui.GButton = obj as fairygui.GButton;
		tab.text = this.tabArr[index].rmb + "元";
		tab.data = index;
		tab.getChild("noticeImg").visible = Model_WanShouZhiWang.checkNoticeLCHLByTab(index);
	}

	private renderHandle1(index: number, obj: fairygui.GComponent): void {
		var item: WSZW_LianChong_Item = obj as WSZW_LianChong_Item;
		item.setVo(this._listData[index], this._act.id, this._index);
	}

	/**
	 * 顶部list点击事件
	 */
	private tabHandle(evt: fairygui.ItemEvent) {
		let a = this;
		let tab = evt.itemObject as fairygui.GButton;
		a._index = tab.data;
		a.updateList();
	}

	private updateList() {
		let self = this;
		let cfg: Ilchlzs_756 | Ilxczzs_764
		if (this._act.id == UIConst.WSZW_LIANCHONGHAOLI) {
			cfg = Model_WanShouZhiWang.getIlchlzs_756(this._act.qs, this.tabArr[self._index].rmb);

		} else if (this._act.id == UIConst.XINHD_LXCZ) {
			cfg = Model_WanShouZhiWang.getIIlxczzs_764(this._act.qs, this.tabArr[self._index].rmb);
		}
		self._bigAwards = JSON.parse(cfg.jl);
		self.bpList.numItems = self._bigAwards.length;

		self.titleList.numItems = self.tabArr.length;

		this.labTips.text = "今日已充：" + Model_WanShouZhiWang.topUpNum + "元";
		IconUtil.setImg(self.moneyIcon, Enum_Path.ACTCOM_URL + cfg.tpz + ".png");
		self._listData = [];
		self._listData = Model_WanShouZhiWang.getListData(Model_WanShouZhiWang.rewardArr[self._index]);
		self.list.numItems = self._listData ? self._listData.length : 0;
		if (self.list.numItems > 0) {
			self.list.scrollToView(0);
		}
	}

	private itemRender(idx, obj) {
		let item: WSZWListGrid = obj as WSZWListGrid;
		item.setVo(this._bigAwards[idx], true);
	}

}