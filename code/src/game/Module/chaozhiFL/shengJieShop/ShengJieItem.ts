class ShengJieItem extends fairygui.GComponent {

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

	public static URL:string = "ui://qzsojhcrpdbd1i";

	public static createInstance(): DisShopItem {
		return <DisShopItem><any>(fairygui.UIPackage.createObject("chaozhifanli", "ShengJieItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		a.grid = <ViewGrid><any>(a.getChild("grid"));
		a.grid.isShowEff = true;
		a.buyBt = <Button1><any>(a.getChild("buyBt"));
		a.typeImg0 = <fairygui.GLoader><any>(a.getChild("typeImg0"));
		a.typeImg1 = <fairygui.GLoader><any>(a.getChild("typeImg1"));
		a.buyImg = <fairygui.GImage><any>(a.getChild("buyImg"));
		a.disImg = <fairygui.GImage><any>(a.getChild("disImg"));
		a.nameLb = <fairygui.GRichTextField><any>(a.getChild("nameLb"));
		a.dataLb = <fairygui.GRichTextField><any>(a.getChild("dataLb"));
		a.dataLb.leading = 10;
		a.promptLb = <fairygui.GRichTextField><any>(a.getChild("promptLb"));
		a.disLb = <fairygui.GTextField><any>(a.getChild("disLb"));
		a.buyBt.addClickListener(a.buyHandle, this);
	}

	private buyHandle(): void {
		let a = this;
		if (this.grid.vo.gType == Enum_Attr.EQUIP && Model_Bag.getResNum() <= 0) {
			GGlobal.layerMgr.open(UIConst.RONGLIAN, 0);
			return;
		}
		if (a.vo.buyNum <= 0 && a.vo.buyNum != -1) {
			ViewCommonWarn.text("该商品已售罄");
			return;
		}

		let moneyArr = JSON.parse(a.vo.money);
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
		GGlobal.modelCZFL.CG_SHENGJIESHOP_BUY(a.vo.id);
	}

	/**iid	day	wz	name	item	money	oldmoney	off	time	lv
id	天数	位置	商品名（策划查找用）	商品	价格	原价	折扣	购买次数	对应系统升阶等级
 */
	public vo: any;
	public setVo(vo: any) {
		let a = this;
		a.vo = vo;
		if (vo) {
			let itemArr = ConfigHelp.makeItemListArr(JSON.parse(vo.item));
			let gridVo = itemArr[0];
			a.grid.isShowEff = true;
			a.grid.vo = gridVo;
			a.grid.tipEnabled = true;
			a.nameLb.text = gridVo.name;
			a.nameLb.color = Color.getColorInt(gridVo.quality);
			let oldmoneyArr = JSON.parse(vo.oldmoney);
			let moneyArr = JSON.parse(vo.money);
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
			if (vo.buyNum > 0 || vo.buyNum == -1) {
				color1 = 2;
			} else {
				color1 = 6;
				a.buyImg.visible = true;
				a.buyBt.visible = false;
			}
			if (vo.buyNum == -1) {
				a.dataLb.text = HtmlUtil.fontNoSize("原价：      " + ConfigHelp.getYiWanText(oldmoneyArr[0][2]), "#999999") + "\n现价：      " +
					HtmlUtil.fontNoSize(ConfigHelp.getYiWanText(moneyArr[0][2]), Color.getColorStr(color));
			} else {
				a.dataLb.text = HtmlUtil.fontNoSize("原价：      " + ConfigHelp.getYiWanText(oldmoneyArr[0][2]), "#999999") + "\n现价：      " +
					HtmlUtil.fontNoSize(ConfigHelp.getYiWanText(moneyArr[0][2]), Color.getColorStr(color));
			}
			a.typeImg0.url = CommonManager.getMoneyUrl(oldmoneyArr[0][0]);
			a.typeImg1.url = CommonManager.getMoneyUrl(moneyArr[0][0]);
			if (vo.off > 0) {
				a.disLb.text = vo.off + "折";
				a.disImg.visible = a.disLb.visible = true;
			} else {
				a.disImg.visible = a.disLb.visible = false;
			}

			let arr = ["", "武将", "宝物", "天书", "神剑", "异宝", "战甲", "兵法"]
			let arr1 = [0, Model_WuJiang.jieShu, Model_BaoWu.level, GGlobal.modeltianshu.level, Model_BySys.sysJie(Model_BySys.SHEN_JIAN),
				Model_BySys.sysJie(Model_BySys.YI_BAO), Model_ZhanJia.jieShu, Model_BySys.sysJie(Model_BySys.BING_FA)];
			let jieshu = arr1[vo.day];
			if (jieshu < vo.lv) {
				a.promptLb.visible = true;
				a.buyBt.visible = false;
				a.promptLb.text = arr[vo.day] + Math.floor(vo.lv / 10) + "阶可购买";
			} else {
				a.promptLb.visible = false;
			}
		}
	}

	public clean() {
		ConfigHelp.cleanGridEff(this.grid);
	}
}