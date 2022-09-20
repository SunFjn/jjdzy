class ItemActComBuyLimit extends fairygui.GComponent {

	public n18: fairygui.GImage;
	public grid: ViewGrid;
	public buyBt: Button2;
	public lineImg: fairygui.GImage;
	public buyImg: fairygui.GImage;
	public dataLb1: fairygui.GRichTextField;
	public disImg: fairygui.GImage;
	public nameLb: fairygui.GRichTextField;
	public dataLb: fairygui.GRichTextField;
	public disLb: fairygui.GTextField;
	public LbLast: fairygui.GRichTextField;
	public LbLimit: fairygui.GRichTextField;
	public typeImg0: fairygui.GLoader;
	public typeImg1: fairygui.GLoader;

	public static URL: string = "ui://vagtkxbkqsq25";

	public static createInstance(): ItemActComBuyLimit {
		return <ItemActComBuyLimit><any>(fairygui.UIPackage.createObject("actComBuyLimit", "ItemActComBuyLimit"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.buyBt.addClickListener(s.buyHandle, s);
	}

	private buyHandle(): void {
		let a = this;

		let itemArr = JSON.parse(a._cfg.item)
		let moneyArr = JSON.parse(a._cfg.money)
		if (itemArr[0][0] == Enum_Attr.EQUIP && Model_Bag.getResNum() <= 0) {
			GGlobal.layerMgr.open(UIConst.RONGLIAN, 0);
			return;
		}
		let buyCt = a._vo ? a._vo.buyCt : 0;
		if (buyCt >= a._cfg.time && a._cfg.time != 0) {
			ViewCommonWarn.text("已达最大购买数量");
			return;
		}
		let lasCt = a._vo ? a._vo.lasCt : a._cfg.max;
		if (lasCt <= 0 && a._cfg.max != 0) {
			ViewCommonWarn.text("该商品已售罄");
			return;
		}
		if (Model_player.voMine.yuanbao < Number(moneyArr[0][2])) {
			ModelChongZhi.guideToRecharge();
			return;
		}
		GGlobal.model_actCom.CG_BUY_LIMIT_BUY(a._cfg.ID);
	}

	private _vo: { id: number, buyCt: number, lasCt: number };
	private _cfg: Ixhdxsqg_403;
	public setVo(cfg: Ixhdxsqg_403, hour, off) {
		let s = this;
		s._cfg = cfg
		let m = GGlobal.model_actCom
		s._vo = m.limBuyObj[cfg.ID];
		//道具
		let itemArr = JSON.parse(cfg.item)
		let moneyArr = JSON.parse(cfg.money)
		let oldmoneyArr = JSON.parse(cfg.oldmoney)
		let buyCt = s._vo ? s._vo.buyCt : 0
		let lasCt = s._vo ? s._vo.lasCt : cfg.max
		let gridVo: IGridImpl;
		if (itemArr[0][0] == Enum_Attr.ITEM) {
			gridVo = VoItem.create(itemArr[0][1]);
		} else if (itemArr[0][0] == Enum_Attr.EQUIP) {
			gridVo = VoEquip.create(itemArr[0][1]);
		} else {
			gridVo = Vo_Currency.create(itemArr[0][0]);
		}
		gridVo.count = itemArr[0][2];
		s.grid.isShowEff = true;
		s.grid.vo = gridVo;
		s.grid.tipEnabled = true;
		s.nameLb.text = gridVo.name;
		s.nameLb.color = Color.getColorInt(gridVo.quality);

		let color: number;
		if (Model_player.voMine.yuanbao < Number(moneyArr[0][2])) {
			color = Color.REDINT;
		} else {
			color = Color.GREENINT;
		}
		if (buyCt < cfg.time || cfg.time == 0) {
			s.buyBt.checkNotice = (lasCt > 0 || cfg.max == 0);
		} else {
			s.buyBt.checkNotice = false;
		}
		if (cfg.time == 0 || cfg.time - buyCt > 0) {
			s.buyBt.visible = true;
			s.buyBt.enabled = true
			s.buyImg.visible = false;
		} else {
			s.buyImg.visible = true;
			s.buyBt.visible = false;
		}

		if (lasCt > 0 || cfg.max == 0) {

		} else {
			s.buyBt.enabled = false
		}

		s.typeImg0.url = CommonManager.getMoneyUrl(oldmoneyArr[0][0], oldmoneyArr[0][1]);
		s.typeImg0.grayed = true;
		if (cfg.off > 0) {
			s.disLb.text = (cfg.off / 10) + "";
			s.disImg.visible = s.disLb.visible = true;
			s.dataLb.text = HtmlUtil.fontNoSize("原价：      " + ConfigHelp.getYiWanText(oldmoneyArr[0][2]), "#999999");
			s.dataLb1.text = "现价：      " + ConfigHelp.getYiWanText(moneyArr[0][2]);
			s.dataLb1.color = color
			s.typeImg1.url = CommonManager.getMoneyUrl(moneyArr[0][0]);
			s.typeImg1.visible = true;
			s.lineImg.visible = true;
		} else {
			s.disImg.visible = s.disLb.visible = false;
			s.dataLb.text = "售价：      " + ConfigHelp.getYiWanText(oldmoneyArr[0][2]);
			s.dataLb.color = color
			s.dataLb1.text = "";
			s.typeImg1.visible = false;
			s.lineImg.visible = false;
		}
		if (cfg.time == 0) {
			s.LbLimit.text = ""
			s.LbLast.text = "";
		} else {
			s.LbLimit.text = "限购(" + (cfg.time - buyCt) + "/" + cfg.time + ")"
			s.LbLimit.color = (cfg.time - buyCt == 0) ? Color.REDINT : Color.GREENINT
			s.LbLast.text = "剩余:" + lasCt
			s.LbLast.color = lasCt == 0 ? Color.REDINT : Color.GREENINT
		}

		if (hour != cfg.opentime - off - 8) {
			s.buyImg.visible = false
			s.buyBt.enabled = false;
			s.buyBt.checkNotice = false;
		}
	}

	public clean() {
		ConfigHelp.cleanGridEff(this.grid);
	}
}