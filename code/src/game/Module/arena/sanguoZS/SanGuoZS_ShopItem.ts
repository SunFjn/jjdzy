class SanGuoZS_ShopItem extends fairygui.GComponent {

	public grid: ViewGrid;
	public buyBt: Button1;
	public typeImg0: fairygui.GLoader;
	public buyImg: fairygui.GImage;
	public nameLb: fairygui.GRichTextField;
	public dataLb: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;

	public static URL: string = "ui://me1skowlm40k3l";

	public static createInstance(): SanGuoZS_ShopItem {
		return <SanGuoZS_ShopItem><any>(fairygui.UIPackage.createObject("Arena", "SanGuoZS_ShopItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.grid = <ViewGrid><any>(s.getChild("grid"));
		s.grid.isShowEff = true;
		s.buyBt = <Button1><any>(s.getChild("buyBt"));
		s.typeImg0 = <fairygui.GLoader><any>(s.getChild("typeImg0"));
		s.buyImg = <fairygui.GImage><any>(s.getChild("buyImg"));
		s.nameLb = <fairygui.GRichTextField><any>(s.getChild("nameLb"));
		s.dataLb = <fairygui.GRichTextField><any>(s.getChild("dataLb"));
		s.promptLb = <fairygui.GRichTextField><any>(s.getChild("promptLb"));
		s.buyBt.addClickListener(s.buyHandler, s);
	}

	private buyHandler() {
		let moneyArr = JSON.parse(this.vo.price);
		if (Model_player.voMine.yuanbao >= moneyArr[0][2]) {
			GGlobal.modelsgzs.CG_SANGUO_ZHANSHEN_BUY_BZ(this.vo.id);
		} else {
			ModelChongZhi.guideToRecharge();
		}
	}

	private vo: Iwarstore_222;
	public setVo(cfg: Iwarstore_222) {
		let s = this;
		s.vo = cfg;
		let itemArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.store));
		let moneyArr = JSON.parse(cfg.price);
		s.grid.vo = itemArr[0];
		s.grid.tipEnabled = true;
		s.nameLb.text = itemArr[0].name;
		s.nameLb.color = itemArr[0].qColor;
		s.dataLb.text = "价格：      " + moneyArr[0][2];
		IconUtil.setImg(s.typeImg0, Enum_Path.ICON70_URL + moneyArr[0][0] + ".png");
		s.buyImg.visible = false;
		s.buyBt.visible = false;
		s.promptLb.visible = false;
		if (Model_SGZS.buyShopArr.indexOf(cfg.id) != -1) {
			s.buyImg.visible = true;
		} else {
			if (Model_SGZS.lastRank <= cfg.time) {
				s.buyBt.visible = true;
				s.buyBt.checkNotice = Model_player.voMine.yuanbao >= moneyArr[0][2];
			} else {
				s.promptLb.text = cfg.tips;
				s.promptLb.visible = true;
			}
		}
	}

	public clean() {
		this.grid.clean();
	}
}