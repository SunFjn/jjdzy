class View_GCBZ_Shop extends UIModalPanel {

	public frame: fairygui.GLabel;
	public bg: fairygui.GLoader;
	public list: fairygui.GList;
	public moneyLb: ViewResource;

	public static URL: string = "ui://vgiijkm8r5gee";

	public static createInstance(): View_GCBZ_Shop {
		return <View_GCBZ_Shop><any>(fairygui.UIPackage.createObject("GCBZ", "View_GCBZ_Shop"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated() {
		let self = this;
		self.view = fairygui.UIPackage.createObject("GCBZ", "View_GCBZ_Shop").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();
		super.childrenCreated();
	}

	private renderHandler(index: number, item: GCBZ_ShopItem) {
		item.onShown(GGlobal.modelgcbz.shopData[index]);
	}

	private itemID = 410438;
	private updateShow() {
		let self = this;
		let itemVo = VoItem.create(self.itemID);
		self.moneyLb.setImgUrl(itemVo.icon);
		self.moneyLb.setCount(Model_Bag.getItemCount(self.itemID));
		self.list.numItems = GGlobal.modelgcbz.shopData.length;
	}

	protected onShown(): void {
		let self = this;
		let model = GGlobal.modelgcbz;
		GGlobal.control.listen(UIConst.GCBZ_SHOP, self.updateShow, self);
		IconUtil.setImg(self.bg, Enum_Path.BACK_URL + "7831_shop.jpg");
		model.CG_AttackCity_openShopUI_12065();
	}

	protected onHide(): void {
		let self = this;
		GGlobal.control.remove(UIConst.GCBZ_SHOP, self.updateShow, self);
		IconUtil.setImg(self.bg, null);
		self.list.numItems = 0;
	}
}