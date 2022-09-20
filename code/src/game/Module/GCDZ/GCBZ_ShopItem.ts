class GCBZ_ShopItem extends fairygui.GComponent {

	public grid: ViewGrid;
	public buyBt: fairygui.GButton;
	public typeImg: fairygui.GLoader;
	public buyImg: fairygui.GImage;
	public nameLb: fairygui.GRichTextField;
	public dataLb: fairygui.GRichTextField;

	public static URL: string = "ui://vgiijkm8r5gej";
	public static createInstance(): GCBZ_ShopItem {
		return <GCBZ_ShopItem><any>(fairygui.UIPackage.createObject("GCBZ", "GCBZ_ShopItem"));
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

	private vo: Igcbk_777;
	public onShown(value: { cfg: Igcbk_777, buyNum: number }) {
		let self = this;
		let cfg = value.cfg;
		self.vo = cfg;
		let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.item));
		let costArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.money));
		let count = Model_Bag.getItemCount(costArr[0].id);
		self.grid.isShowEff = self.grid.tipEnabled = true;
		self.grid.vo = rewardArr[0];
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + costArr[0].icon + ".png", self.typeImg);
		let color = count >= costArr[0].count ? 2 : 6;
		self.dataLb.text = "限购：" + (cfg.xg - value.buyNum) + "/" + cfg.xg + "\n单价：     " +
			HtmlUtil.fontNoSize(ConfigHelp.numToStr(costArr[0].count), Color.getColorStr(color));
		self.buyBt.visible = value.buyNum < cfg.xg;
		self.buyImg.visible = value.buyNum >= cfg.xg;
		self.nameLb.text = rewardArr[0].name;
		self.nameLb.color = rewardArr[0].qColor;
		self.buyBt.addClickListener(self.onBuy, self);
	}

	private onBuy() {
		let self = this;
		let costArr = ConfigHelp.makeItemListArr(JSON.parse(self.vo.money));
		let count = Model_Bag.getItemCount(costArr[0].id);
		if (count >= costArr[0].count) {
			GGlobal.modelgcbz.CG_AttackCity_buyItem_12067(self.vo.id);
		} else {
			View_CaiLiao_GetPanel.show(costArr[0] as VoItem);
		}
	}

	public clean() {
		let self = this;
		self.buyBt.removeClickListener(self.onBuy, self);
		self.grid.clean();
	}
}