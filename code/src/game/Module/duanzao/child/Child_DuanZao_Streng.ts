class Child_DuanZao_Streng extends fairygui.GComponent implements IPanel {

	//>>>>start
	public costGrid: ViewGrid2;
	public suitBt: Button2;
	public grid: ViewGrid;
	public keyStrengBt: Button1;
	public suitLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	public costLb0: ViewResource;
	public costLb1: ViewResource;
	public curAttLb: fairygui.GRichTextField;
	public nextAttLb: fairygui.GRichTextField;
	public nameTitle: fairygui.GRichTextField;
	//>>>>end

	public static URL: string = "ui://pofv8989z1r81";

	public static createInstance(): Child_DuanZao_Streng {
		return <Child_DuanZao_Streng><any>(fairygui.UIPackage.createObject("DuanZao", "Child_DuanZao_Streng"));
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
		a.keyStrengBt.addClickListener(a.strengHandle, a);
		a.suitBt.addClickListener(a.suitHandle, a);
	}

	private suitHandle(): void {
		GGlobal.layerMgr.open(UIConst.DUANZAO_STRENG_SUIT);
	}

	private strengHandle(event: egret.TouchEvent): void {
		let a = this;
		if (!a.vo) {
			ViewCommonWarn.text("没有装备不能强化");
			return;
		}
		let cfg: any = Config.dzqianghua_209[a.vo.qh];
		if (a.keyStrengBt.checkNotice) {
			GGlobal.modelDuanZao.CG_DUANZAO_KEYSTRENG();
		} else {
			if (cfg.consume == "0") {
				ViewCommonWarn.text("已满级");
			} else {
				let gridArr: Array<any> = JSON.parse(cfg.consume);
				let gridNum = Model_Bag.getItemCount(gridArr[1][1]);
				let itemVo = VoItem.create(gridArr[1][1]);
				if (gridNum < gridArr[1][2]) {
					View_CaiLiao_GetPanel.show(itemVo);
				} else {
					ViewCommonWarn.text("铜币不足");
				}
			}
		}
	}

	public vo: VoEquip;
	public setVo(vo: VoEquip) {
		let a = this;
		a.vo = vo;
		if (vo) {
			a.grid.vo = vo;
			a.grid.tipEnabled = true;
			let cfg: any = Config.dzqianghua_209[vo.qh];
			let arr: Array<any> = JSON.parse(cfg["attr" + vo.type]);
			a.suitLb.text = Model_DuanZao.suitArr[0] + "阶";
			a.nameLb.text = Model_Equip.getPartName(vo.type);
			a.nameTitle.text = Model_Equip.getPartName(vo.type);
			let nextcfg = Config.dzqianghua_209[vo.qh + 1];
			let attstr0: string = "";
			let attstr1: string = "";
			if (nextcfg) {
				let arr1: Array<any> = JSON.parse(nextcfg["attr" + vo.type]);
				for (let i = 0; i < arr.length; i++) {
					if (i == 0) {
						attstr0 += Vo_attr.getShowStr(arr[i][0], arr[i][1]);
						attstr1 += Vo_attr.getShowStr(arr1[i][0], arr1[i][1]);
					} else {
						attstr0 += "\n" + Vo_attr.getShowStr(arr[i][0], arr[i][1]);
						attstr1 += "\n" + Vo_attr.getShowStr(arr1[i][0], arr1[i][1]);
					}
				}

				let gridArr: Array<any> = JSON.parse(cfg.consume);
				let gridNum = Model_Bag.getItemCount(gridArr[1][1]);

				let costVo = VoItem.create(gridArr[1][1]);
				a.costLb0.setImgUrl("3");
				if (Model_player.voMine.tongbi >= gridArr[0][2]) {
					a.costLb0.setCount(HtmlUtil.fontNoSize(gridArr[0][2] + "", Color.getColorStr(1)));
				} else {
					a.costLb0.setCount(HtmlUtil.fontNoSize(gridArr[0][2] + "", Color.getColorStr(6)));
				}
				a.costLb1.setImgUrl(costVo.icon);
				if (gridNum >= gridArr[1][2]) {
					a.costLb1.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(gridNum) + "/" + gridArr[1][2], Color.getColorStr(1)));
				} else {
					a.costLb1.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(gridNum) + "/" + gridArr[1][2], Color.getColorStr(6)));
				}
			} else {
				for (let i = 0; i < arr.length; i++) {
					if (i == 0) {
						attstr0 += Vo_attr.getShowStr(arr[i][0], arr[i][1]);
					} else {
						attstr0 += "\n" + Vo_attr.getShowStr(arr[i][0], arr[i][1]);
					}
				}
				attstr1 = attstr0;
				a.costLb0.setImgUrl();
				a.costLb1.setImgUrl();
				a.costLb0.text = "已满级";
				a.costLb1.getTextField().align = fairygui.AlignType.Center;
				a.costLb1.text = "已满级";
			}
			a.curAttLb.text = attstr0;
			a.nextAttLb.text = attstr1;
			a.keyStrengBt.checkNotice = Model_DuanZao.checkKeyStrengNotice();
			var nextCfg = Config.dzqianghuasuit_209[Model_DuanZao.suitArr[0] + 1];
			if (nextCfg) {
				a.suitBt.checkNotice = Model_DuanZao.strengMinLV >= nextCfg.yaoqiu;
			} else {
				a.suitBt.checkNotice = false;
			}
		} else {
			a.grid.vo = null;
		}
	}

	public clean() {
		ConfigHelp.cleanGridEff(this.grid);
	}

	public guide_duanzao_keyStreng(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.keyStrengBt, self.keyStrengBt.width / 2, self.keyStrengBt.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.keyStrengBt, self.keyStrengBt.width / 2, 0, -90, -106, -100);
		if (self.keyStrengBt.parent) self.keyStrengBt.parent.setChildIndex(self.keyStrengBt, self.keyStrengBt.parent.numChildren - 1);
	}
}