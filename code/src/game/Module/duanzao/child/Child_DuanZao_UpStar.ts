class Child_DuanZao_UpStar extends fairygui.GComponent {

	//>>>>start
	public costItem: ViewResource;
	public costItem1: ViewResource;
	public grid: ViewGrid;
	public suitBt: Button2;
	public perBt: Button2;
	public upStar: Button0;
	public starLb: fairygui.GTextField;
	public sucRate: fairygui.GRichTextField;
	public curLb: fairygui.GRichTextField;
	public nextLb: fairygui.GRichTextField;
	public suitLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	//>>>>end

	public static URL: string = "ui://pofv8989z1r83";

	public static createInstance(): Child_DuanZao_UpStar {
		return <Child_DuanZao_UpStar><any>(fairygui.UIPackage.createObject("DuanZao", "Child_DuanZao_UpStar"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.setVo(pData);
		this.grid.gridSource = ViewGrid.ROLE;
	}

	closePanel(pData?: any) {
		this.clean();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		CommonManager.parseChildren(a, a);

		
		a.grid.isShowEff = true;

		a.upStar.addClickListener(a.upStarHandle, a);
		a.suitBt.addClickListener(a.suitHandle, a);
		a.perBt.addClickListener(a.perHandle, a);
	}

	private perHandle(): void {
		let a = this;
		if (a.perBt.checkNotice) {
			GGlobal.modelDuanZao.CG_DUANZAO_UPSTAR_PERFECT(this.vo.type);
		} else {
			if (Config.dzstar_209[a.vo.starLv].consume != "0") {
				View_CaiLiao_GetPanel.show(VoItem.create(410014))
			} else {
				ViewCommonWarn.text("已满星");
			}
		}
	}

	private suitHandle(): void {
		GGlobal.layerMgr.open(UIConst.DUANZAO_STAR_SUIT);
	}

	private upStarHandle(): void {
		let a = this;
		if (a.upStar.checkNotice) {
			GGlobal.modelDuanZao.CG_DUANZAO_UPGRADESTAR(a.vo.type);
		} else {
			if (Config.dzstar_209[a.vo.starLv].consume == "0") {
				ViewCommonWarn.text("已满星");
			} else {
				let costArr: Array<any> = JSON.parse(Config.dzstar_209[a.vo.starLv].consume);
				let itemVo: VoItem = VoItem.create(costArr[0][1]);
				View_CaiLiao_GetPanel.show(itemVo);
			}
		}
	}

	private vo: VoEquip;
	public setVo(vo: VoEquip) {
		let a = this;
		a.vo = vo;
		a.grid.vo = vo;
		if (vo) {
			a.grid.tipEnabled = true;
			a.starLb.text = ConfigHelp.getStarFontStr(vo.starLv);
			a.suitLb.text = Model_DuanZao.suitArr[2] + "阶";
			a.nameLb.text = Model_Equip.getPartName(vo.type);
			let per = Config.VIP_710[Model_player.voMine.viplv + 1].STAR
			if (per > 0) {
				a.sucRate.text = "升星成功率    " + (Math.floor(Config.dzstar_209[vo.starLv].cg / 1000)) + "%    " +
					HtmlUtil.fontNoSize("VIP" + Model_player.voMine.viplv + "   +" + per + "%", Color.getColorStr(2));
			} else {
				a.sucRate.text = "升星成功率    " + (Math.floor(Config.dzstar_209[vo.starLv].cg / 1000)) + "%";
			}

			a.curLb.text = "装备基本属性 \n+" + (Config.dzstar_209[vo.starLv].addition / 1000) + "%";
			if (Config.dzstar_209[vo.starLv + 1]) {
				a.nextLb.text = "装备基本属性 \n+" + (Config.dzstar_209[vo.starLv + 1].addition / 1000) + "%";
				let costArr: Array<any> = JSON.parse(Config.dzstar_209[vo.starLv].consume);
				let count: number = Model_Bag.getItemCount(costArr[0][1]);
				let itemVo: VoItem = VoItem.create(costArr[0][1]);
				if (count >= costArr[0][2]) {
					a.costItem.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(count) + "/" + costArr[0][2], Color.getColorStr(2)));
				} else {
					a.costItem.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(count) + "/" + costArr[0][2], Color.getColorStr(6)));
				}
				a.costItem.setImgUrl(itemVo.icon);
				a.upStar.checkNotice = count >= costArr[0][2];

				let nextCfg = Config.dzstarsuit_209[Model_DuanZao.suitArr[2] + 1];
				if (nextCfg) {
					a.suitBt.checkNotice = Model_DuanZao.starMinLv >= nextCfg.yaoqiu;
				} else {
					a.suitBt.checkNotice = false;
				}
				let costArr1: Array<any> = JSON.parse(Config.dzstar_209[vo.starLv].consume1);
				let itemVo1: VoItem = VoItem.create(costArr1[0][1]);
				a.costItem1.setImgUrl(itemVo1.icon);
				let count1: number = Model_Bag.getItemCount(costArr1[0][1]);
				a.costItem1.setLb(count1, costArr1[0][2]);
				if (count1 >= costArr1[0][2]) {
					a.perBt.checkNotice = true;
				} else {
					a.perBt.checkNotice = false;
				}
			} else {
				a.costItem.setCount(HtmlUtil.fontNoSize("已满星", Color.getColorStr(1)));
				a.costItem1.setCount(HtmlUtil.fontNoSize("已满星", Color.getColorStr(1)));
				a.costItem.setImgUrl();
				a.costItem1.setImgUrl();
				a.upStar.checkNotice = false;
				a.perBt.checkNotice = false;
				a.nextLb.text = "装备基本属性 \n+" + (Config.dzstar_209[vo.starLv].addition / 1000) + "%";
				let nextCfg = Config.dzstarsuit_209[Model_DuanZao.suitArr[2] + 1];
				if (nextCfg) {
					a.suitBt.checkNotice = Model_DuanZao.starMinLv >= nextCfg.yaoqiu;
				} else {
					a.suitBt.checkNotice = false;
				}
			}
		}
	}

	public clean() {
		ConfigHelp.cleanGridEff(this.grid);
	}
}