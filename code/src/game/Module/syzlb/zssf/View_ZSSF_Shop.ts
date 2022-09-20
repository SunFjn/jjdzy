class View_ZSSF_Shop extends UIModalPanel {

	public frame: fairygui.GLabel;
	public bg: fairygui.GLoader;
	public list: fairygui.GList;
	public moneyLb: ViewResource;

	public static URL: string = "ui://3o8q23uucenr1h";

	public static createInstance(): View_ZSSF_Shop {
		return <View_ZSSF_Shop><any>(fairygui.UIPackage.createObject("syzlb", "View_ZSSF_Shop"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("syzlb", "View_ZSSF_Shop").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		super.childrenCreated();
	}

	private renderHandler(index: number, item: ZSSF_ShopItem) {
		item.onShown(GGlobal.modelzssf.shopArr[index]);
	}

	private updateShow() {
		let self = this;
		self.moneyLb.setImgUrl(20);
		self.moneyLb.setCount(GGlobal.modelzssf.rongyu);
		self.list.numItems = GGlobal.modelzssf.shopArr.length;
	}

	protected onShown(): void {
		let self = this;
		let model = GGlobal.modelzssf;
		GGlobal.control.listen(UIConst.ZSSF_SHOP, self.updateShow, self);
		IconUtil.setImg(self.bg, Enum_Path.BACK_URL + "zssf2.jpg");
		model.CG_GuardArea_openShopUI_10917();
	}

	protected onHide(): void {
		let self = this;
		GGlobal.control.remove(UIConst.ZSSF_SHOP, self.updateShow, self);
		IconUtil.setImg(self.bg, null);
		self.list.numItems = 0;
	}
}