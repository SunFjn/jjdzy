class ZSSF_ShopItem extends fairygui.GComponent {

	public grid: ViewGrid;
	public buyBt: fairygui.GButton;
	public typeImg: fairygui.GLoader;
	public buyImg: fairygui.GImage;
	public nameLb: fairygui.GRichTextField;
	public dataLb: fairygui.GRichTextField;

	public static URL: string = "ui://3o8q23uucenr1j";

	public static createInstance(): ZSSF_ShopItem {
		return <ZSSF_ShopItem><any>(fairygui.UIPackage.createObject("syzlb", "ZSSF_ShopItem"));
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

	private vo: Izssfstore_294;
	public onShown(cfg: Izssfstore_294) {
		let self = this;
		let model = GGlobal.modelzssf;
		self.vo = cfg;
		let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		let costArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.consume));
		self.grid.isShowEff = self.grid.tipEnabled = true;
		self.grid.vo = rewardArr[0];
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + costArr[0].icon + ".png", self.typeImg);
		let color = model.rongyu >= costArr[0].count ? 2 : 6;
		self.dataLb.text = "限购：" + (cfg.time - model.shopData[cfg.id]) + "/" + cfg.time + "\n单价：     " +
			HtmlUtil.fontNoSize(ConfigHelp.numToStr(costArr[0].count), Color.getColorStr(color));
		self.buyBt.visible = model.shopData[cfg.id] < cfg.time;
		self.buyImg.visible = model.shopData[cfg.id] >= cfg.time;
		self.nameLb.text = rewardArr[0].name;
		self.nameLb.color = rewardArr[0].qColor;
		self.buyBt.addClickListener(self.onBuy, self);
	}

	private onBuy() {
		let self = this;
		let model = GGlobal.modelzssf;
		let costArr = ConfigHelp.makeItemListArr(JSON.parse(self.vo.consume));
		if (model.rongyu >= costArr[0].count) {
			GGlobal.modelzssf.CG_GuardArea_buyItem_10919(self.vo.id);
		} else {
			ViewCommonWarn.text("荣誉不足");
		}
	}

	public clean() {
		let self = this;
		self.buyBt.removeClickListener(self.onBuy, self);
		self.grid.clean();
	}
}