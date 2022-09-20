class QDShopItem extends fairygui.GComponent {

	public grid: ViewGrid;
	public buyBt: Button1;
	public typeImg0: fairygui.GLoader;
	public typeImg1: fairygui.GLoader;
	public buyImg: fairygui.GImage;
	public disImg: fairygui.GImage;
	public nameLb: fairygui.GRichTextField;
	public dataLb: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;
	public disLb: fairygui.GTextField;

	public static URL: string = "ui://kdt501v2qrkf1r";

	public static createInstance(): QDShopItem {
		return <QDShopItem><any>(fairygui.UIPackage.createObject("sanGuoQingDian", "QDShopItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.grid.isShowEff = true;
		self.dataLb.leading = 10;
		self.buyBt.addClickListener(self.buyHandle, this);
	}

	private buyHandle(): void {
		let a = this;
		if (this.grid.vo.gType == Enum_Attr.EQUIP && Model_Bag.getResNum() <= 0) {
			GGlobal.layerMgr.open(UIConst.RONGLIAN, 0);
			return;
		}
		if (a.vo.cfg.time - a.vo.buyNum <= 0 && a.vo.cfg.time != 0) {
			ViewCommonWarn.text("该商品已售罄");
			return;
		}

		let moneyArr = JSON.parse(a.vo.cfg.money);
		let voMine = Model_player.voMine;
		switch (moneyArr[0][0]) {
			case Enum_Attr.yuanBao:
				if (voMine.yuanbao < moneyArr[0][2]) {
					ModelChongZhi.guideToRecharge();
					return;
				}
				break;
			case Enum_Attr.TONGBI:
				if (voMine.tongbi < moneyArr[0][2]) {
					ViewCommonWarn.text("铜币不足");
					return;
				}
				break;
		}
		GGlobal.modelSGQD.CG_SGQD_BUYITEM(a.vo.cfg.id);
	}

	public vo: { cfg: Isgqdsc_261, buyNum: number };
	public setVo(vo: { cfg: Isgqdsc_261, buyNum: number }) {
		let a = this;
		a.vo = vo;
		if (vo) {
			let itemArr = ConfigHelp.makeItemListArr(JSON.parse(vo.cfg.item));
			let gridVo = itemArr[0];
			a.grid.vo = gridVo;
			a.grid.tipEnabled = true;
			a.nameLb.text = gridVo.name;
			a.nameLb.color = Color.getColorInt(gridVo.quality);
			let oldmoneyArr = JSON.parse(vo.cfg.oldmoney);
			let moneyArr = JSON.parse(vo.cfg.money);
			let voMine = Model_player.voMine;
			let color: number;
			switch (moneyArr[0][0]) {
				case Enum_Attr.yuanBao:
					if (voMine.yuanbao < moneyArr[0][2]) {
						color = 6;
					} else {
						color = 1;
					}
					break;
				case Enum_Attr.TONGBI:
					if (voMine.tongbi < moneyArr[0][2]) {
						color = 6;
					} else {
						color = 1;
					}
					break;
			}

			a.buyBt.visible = true;
			a.buyImg.visible = false;
			let color1;
			if (vo.cfg.time - vo.buyNum > 0 || vo.cfg.time == 0) {
				color1 = 2;
			} else {
				color1 = 6;
				a.buyImg.visible = true;
				a.buyBt.visible = false;
			}
			if (vo.cfg.time == 0) {
				a.dataLb.text = HtmlUtil.fontNoSize("原价：      " + ConfigHelp.getYiWanText(oldmoneyArr[0][2]), "#999999") + "\n现价：      " +
					HtmlUtil.fontNoSize(ConfigHelp.getYiWanText(moneyArr[0][2]), Color.getColorStr(color));
			} else {
				a.dataLb.text = HtmlUtil.fontNoSize("原价：      " + ConfigHelp.getYiWanText(oldmoneyArr[0][2]), "#999999") + "\n现价：      " +
					HtmlUtil.fontNoSize(ConfigHelp.getYiWanText(moneyArr[0][2]), Color.getColorStr(color)) + "\n" +
					HtmlUtil.fontNoSize("限购(" + (vo.cfg.time - vo.buyNum) + "/" + vo.cfg.time + ")", Color.getColorStr(color1));
			}
			a.typeImg0.url = CommonManager.getMoneyUrl(oldmoneyArr[0][0]);
			a.typeImg1.url = CommonManager.getMoneyUrl(moneyArr[0][0]);
			if (vo.cfg.off > 0) {
				a.disLb.text = (vo.cfg.off / 100) + "折";
				a.disImg.visible = a.disLb.visible = true;
			} else {
				a.disImg.visible = a.disLb.visible = false;
			}
			a.promptLb.visible = false;
		}
	}

	public clean() {
		ConfigHelp.cleanGridEff(this.grid);
	}
}