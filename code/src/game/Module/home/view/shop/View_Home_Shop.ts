class View_Home_Shop extends UIPanelBase {

	public frame: fairygui.GLabel;
	public bg: fairygui.GLoader;
	public list: fairygui.GList;
	public moneyLb: ViewResource;
	public resBt: fairygui.GButton;
	public resCostLb: ViewResource2;

	public static URL: string = "ui://ypo8uejwi2ij3";

	public static createInstance(): View_Home_Shop {
		return <View_Home_Shop><any>(fairygui.UIPackage.createObject("JiaDing", "View_Home_Shop"));
	}

	public constructor() {
		super();
		this.setSkin("JiaDing", "JiaDing_atlas0", "View_Home_Shop");
	}

	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(Home_ShopItem.URL, Home_ShopItem);
	}
	protected initView() {
		let self = this;
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
	}

	private renderHandler(index: number, item: Home_ShopItem) {
		item.onShown(GGlobal.homemodel.shopData[index], index);
	}

	private updateShow() {
		let self = this;
		self.moneyLb.setImgUrl(22);
		self.moneyLb.setCount(Model_player.voMine.homeMoney);
		self.list.numItems = GGlobal.homemodel.shopData.length;
		let costItem = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[7117].other))[0];
		self.resCostLb.setImgUrl(costItem.icon);
		self.resCostLb.setCount(costItem.count);
	}

	protected onShown(): void {
		let self = this;
		let model = GGlobal.homemodel;
		GGlobal.control.listen(UIConst.HOME_SHOP, self.updateShow, self);
		self.resBt.addClickListener(self.onReset, self);
		IconUtil.setImg(self.bg, Enum_Path.BACK_URL + "home_shop.jpg");
		GGlobal.homemodel.CG_OPEN_SHOP_11401();
	}

	protected onHide(): void {
		let self = this;
		GGlobal.control.remove(UIConst.HOME_SHOP, self.updateShow, self);
		self.resBt.removeClickListener(self.onReset, self);
		IconUtil.setImg(self.bg, null);
		self.list.numItems = 0;
	}

	private onReset() {
		let self = this;
		if (ConfigHelp.checkEnough(Config.xtcs_004[7117].other, true)) {
			GGlobal.homemodel.CG_SHOP_RESET_11403();
		}
	}
}