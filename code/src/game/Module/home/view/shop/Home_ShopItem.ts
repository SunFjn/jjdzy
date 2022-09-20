class Home_ShopItem extends fairygui.GComponent {

	public grid: ViewGrid;
	public buyBt: fairygui.GButton;
	public typeImg: fairygui.GLoader;
	public buyImg: fairygui.GImage;
	public nameLb: fairygui.GRichTextField;
	public dataLb: fairygui.GRichTextField;

	public static URL: string = "ui://ypo8uejwi2ij5";

	public static createInstance(): Home_ShopItem {
		return <Home_ShopItem><any>(fairygui.UIPackage.createObject("JiaDing", "Home_ShopItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.dataLb.leading = 25;
	}

	private index: number = 0;
	private vo: Ifdshop_019;
	public onShown(value: { cfg: Ifdshop_019, buyNum: number }, index: number) {
		let self = this;
		let cfg = value.cfg;
		self.index = index;
		self.vo = cfg;
		let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.dj));
		let costArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.yj));
		self.grid.isShowEff = self.grid.tipEnabled = true;
		self.grid.vo = rewardArr[0];
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + costArr[0].icon + ".png", self.typeImg);
		let color = Model_player.voMine.homeMoney >= costArr[0].count ? 2 : 6;
		self.dataLb.text = "限购：" + (cfg.xiangou - value.buyNum) + "/" + cfg.xiangou + "\n单价：     " +
			HtmlUtil.fontNoSize(ConfigHelp.getYiWanText(costArr[0].count), Color.getColorStr(color));
		self.buyBt.visible = value.buyNum < cfg.xiangou;
		self.buyImg.visible = value.buyNum >= cfg.xiangou;
		self.nameLb.text = rewardArr[0].name;
		self.nameLb.color = rewardArr[0].qColor;
		self.buyBt.addClickListener(self.onBuy, self);
	}

	private onBuy() {
		let self = this;
		let costArr = ConfigHelp.makeItemListArr(JSON.parse(self.vo.yj));
		if (Model_player.voMine.homeMoney >= costArr[0].count) {
			GGlobal.homemodel.CG_SHOP_BUY_11405(self.index);
		} else {
			ViewCommonWarn.text("府邸币不足");
		}
	}

	public clean() {
		let self = this;
		self.buyBt.removeClickListener(self.onBuy, self);
		self.grid.clean();
	}
}