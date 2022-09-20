class ViewCrossKingStore extends UIPanelBase {

	public frame: fairygui.GLabel;
	public titleImg: fairygui.GLoader;
	public moneyIcon: fairygui.GLoader;
	public moneyLb: fairygui.GRichTextField;
	public list: fairygui.GList;
	public lbCount: fairygui.GRichTextField;

	public static URL: string = "ui://yqpfulefn9y02s";

	public static createInstance(): ViewCrossKingStore {
		return <ViewCrossKingStore><any>(fairygui.UIPackage.createObject("Arena", "ViewCrossKingStore"));
	}

	public constructor() {
		super();
		this.setSkin("Arena", "Arena_atlas0", "ViewCrossKingStore");
	}

	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(VCrossKingStore.URL, VCrossKingStore);
	}

	protected initView(): void {
		super.initView();
		this.list.itemRenderer = this.renderList;
		this.list.callbackThisObj = this;

	}

	protected onShown(): void {
		this.addListen();
		this.upView();
		IconUtil.setImg(this.titleImg, Enum_Path.BACK_URL + "crossking.jpg");
		GGlobal.modelCrossKing.CG_OPEN_STORE();
	}

	protected onHide(): void {
		this.removeListen();
		IconUtil.setImg(this.titleImg, null);
	}

	private addListen(): void {
		GGlobal.control.listen(Enum_MsgType.CROSSKING_OPEN_STORE, this.upView, this);
		// GGlobal.control.listen(Enum_MsgType.CROSSKING_BUY_ITEM, this.upView, this);
	}

	private removeListen(): void {
		GGlobal.control.remove(Enum_MsgType.CROSSKING_OPEN_STORE, this.upView, this);
		// GGlobal.control.remove(Enum_MsgType.CROSSKING_BUY_ITEM, this.upView, this);
		GGlobal.layerMgr.close(UIConst.CROSS_KING_STORE);
		this.list.numItems = 0;
	}

	private _listData;
	private upView(): void {
		let arr1 = [];
		let arr2 = [];
		let arr3 = [];
		for (let i = 0; i < Model_CrossKing.storeArr.length; i++) {
			let v = Model_CrossKing.storeArr[i];
			if (v.status == 0) {
				arr2.push(v)
			} else if (v.status == 1) {
				arr1.push(v);
			} else {
				arr3.push(v);
			}
		}
		this._listData = arr1.concat(arr2).concat(arr3);
		this.list.numItems = this._listData.length;
		if (this._listData.length > 0) {
			this.list.scrollToView(0);
		}
		this.lbCount.text = "累计挑战次数：" + Model_CrossKing.storeCount;

		this.moneyIcon.url = CommonManager.getMoneyUrl(4);
		this.moneyLb.text = ConfigHelp.numToStr(Model_player.getCurrencyCount(4));
	}

	private renderList(index: number, obj: fairygui.GObject): void {
		var item: VCrossKingStore = obj as VCrossKingStore;
		item.vo = this._listData[index];
	}

}
