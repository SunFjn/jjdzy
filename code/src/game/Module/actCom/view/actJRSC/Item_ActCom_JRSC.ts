class Item_ActCom_JRSC extends fairygui.GComponent {

	public grid: ViewGrid;
	public nameLb: fairygui.GRichTextField;
	public dataLb: fairygui.GRichTextField;
	public buyBt: Button1;
	public disLb: fairygui.GTextField;
	public disImg: fairygui.GImage;
	public buyImg: fairygui.GImage;
	public lineImg: fairygui.GImage;
	public typeImg0: fairygui.GLoader;
	public typeImg1: fairygui.GLoader;
	public promptLb: fairygui.GRichTextField;


	public static URL: string = "ui://zq6iymuqocq25";

	public static createInstance(): Item_ActCom_JRSC {
		return <Item_ActCom_JRSC><any>(fairygui.UIPackage.createObject("actCom_JRSC", "Item_ActCom_JRSC"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		CommonManager.parseChildren(a, a);
		a.grid.isShowEff = true;
		a.dataLb.leading = 10;
		a.buyBt.addClickListener(a.buyHandle, a);
	}

	private buyHandle(): void {
		let a = this;
		let itemArr = JSON.parse(a.vo.cfg.dj)
		if (itemArr[0][0] == Enum_Attr.EQUIP && Model_Bag.getResNum() <= 0) {
			GGlobal.layerMgr.open(UIConst.RONGLIAN, 0);
			return;
		}
		if (a.vo.ct >= a.vo.cfg.time && a.vo.cfg.time != 0) {
			ViewCommonWarn.text("该商品已售罄");
			return;
		}
		let moneyArr = JSON.parse(a.vo.cfg.yj)
		let voMine = Model_player.voMine;
		let money = moneyArr[0][2] * a.off / 10
		if (voMine.yuanbao < money) {
			ModelChongZhi.guideToRecharge();
			return;
		}
		GGlobal.model_ActJRSC.CG_BUY_10805(a.vo.id);
	}

	private _vo: { id: number, ct: number, cfg: Ijrscspb_334 };
	private off
	public setVo(vo: { id: number, ct: number, cfg: Ijrscspb_334 }, off) {
		let a = this;
		a.off = off;
		a._vo = vo;
		if (vo) {
			let gridVo: IGridImpl;
			let itemArr = JSON.parse(vo.cfg.dj)
			if (itemArr[0][0] == Enum_Attr.ITEM) {
				gridVo = VoItem.create(itemArr[0][1]);
			} else if (itemArr[0][0] == Enum_Attr.EQUIP) {
				gridVo = VoEquip.create(itemArr[0][1]);
			} else {
				gridVo = Vo_Currency.create(itemArr[0][0]);
			}
			gridVo.count = itemArr[0][2];
			a.grid.vo = gridVo;
			a.grid.tipEnabled = true;
			a.nameLb.text = gridVo.name;
			a.nameLb.color = Color.getColorInt(gridVo.quality);

			let voMine = Model_player.voMine;
			let color: number;
			let moneyArr = JSON.parse(vo.cfg.yj)
			let newItem = ConfigHelp.makeItemListArr(moneyArr)[0];
			let money = moneyArr[0][2] * a.off / 10
			if (voMine.yuanbao < money) {
				color = 6;
			} else {
				color = 1;
			}
			a.buyImg.visible = false;
			a.buyBt.visible = true;
			var buyVisSig = false;
			let color1;
			if (vo.cfg.time == 0 || vo.cfg.time - vo.ct > 0) {
				color1 = 2;
				buyVisSig = true;
			} else {
				color1 = 6;
				a.buyImg.visible = true;
				a.buyBt.visible = false;
				buyVisSig = false;
			}

			IconUtil.setImg(a.typeImg0, Enum_Path.ICON70_URL + newItem.icon + ".png");
			IconUtil.setImg(a.typeImg1, Enum_Path.ICON70_URL + newItem.icon + ".png");
			if (off > 0) {
				a.disLb.text = off + "折";
				a.disImg.visible = a.disLb.visible = true;
				let str = HtmlUtil.fontNoSize("原价：      " + ConfigHelp.getYiWanText(moneyArr[0][2]), "#999999") + "\n现价：      " +
					HtmlUtil.fontNoSize(ConfigHelp.getYiWanText(moneyArr[0][2] * off / 10), Color.getColorStr(color));
				if (vo.cfg.time != 0) {
					str += "\n" + HtmlUtil.fontNoSize("今日(" + (vo.cfg.time - vo.ct) + "/" + vo.cfg.time + ")", Color.getColorStr(color1));
				}
				a.dataLb.text = str
				a.typeImg1.visible = true;
				a.lineImg.visible = true;
			} else {
				a.disImg.visible = a.disLb.visible = false;
				if (vo.cfg.time == 0) {
					a.dataLb.text = "售价：      " + ConfigHelp.getYiWanText(moneyArr[0][2]);
				} else {
					a.dataLb.text = "售价：      " + ConfigHelp.getYiWanText(moneyArr[0][2]) + "\n\n" +
						HtmlUtil.fontNoSize("今日(" + (vo.cfg.time - vo.ct) + "/" + vo.cfg.time + ")", Color.getColorStr(color1));
				}
				a.typeImg1.visible = false;
				a.lineImg.visible = false;
			}
			a.promptLb.visible = false;
		}
	}

	public get vo() {
		return this._vo
	}

	public clean() {
		let a = this;
		ConfigHelp.cleanGridEff(a.grid);
		IconUtil.setImg(a.typeImg0, null);
		IconUtil.setImg(a.typeImg1, null);
	}
}