class Child_DuanZao_Stone extends fairygui.GComponent implements IPanel {

	//>>>>start
	public grid: ViewGrid;
	public suitBt: Button2;
	public getBt: fairygui.GRichTextField;
	public stoneBt0: GemBt;
	public stoneBt1: GemBt;
	public stoneBt2: GemBt;
	public stoneBt3: GemBt;
	public keyBt: Button1;
	public suitLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	//>>>>end

	public gemBtArr: Array<GemBt> = [];

	public static URL: string = "ui://pofv8989z1r82";

	public static createInstance(): Child_DuanZao_Stone {
		return <Child_DuanZao_Stone><any>(fairygui.UIPackage.createObject("DuanZao", "Child_DuanZao_Stone"));
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
		for (let i = 0; i < 4; i++) {
			let gemBt: GemBt = <GemBt><any>(a.getChild("stoneBt" + i));
			gemBt.data = i;
			a.gemBtArr.push(gemBt);
			gemBt.addClickListener(a.stoneHandle, a);
		}

		a.keyBt.addClickListener(a.keyHandle, a);
		a.suitBt.addClickListener(a.suitHandle, a);
		a.getBt.addClickListener(a.OnGet, a);
	}

	private OnGet(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		View_CaiLiao_GetPanel.show(VoItem.create(422000));
	}


	private suitHandle(): void {
		GGlobal.layerMgr.open(UIConst.DUANZAO_STONE_SUIT);
	}

	private keyHandle(): void {
		if (!this.vo) return;
		if (this.keyBt.checkNotice) {
			GGlobal.modelDuanZao.CG_DUANZAO_STONEID_KEYXQ(this.vo.type);
		} else {
			View_CaiLiao_GetPanel.show(VoItem.create(422000));
		}
	}

	private stoneHandle(event: egret.TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.DUANZAO_STONE_BAG, { equipVo: this.grid.vo, stonePart: event.target.data, stoneId: this.vo.bs[event.target.data] });
	}

	private gemNameStr: Array<any> = ["青木宝石", "碧水宝石", "朱焰宝石", "紫雷宝石"];
	public vo: VoEquip;
	public setVo(vo: VoEquip) {
		let a = this;
		a.vo = vo;
		if (vo) {
			Model_Bag.gemList.sort(a.sortFunc);
			a.grid.vo = vo;
			a.grid.tipEnabled = true;
			a.suitLb.text = Model_DuanZao.suitArr[1] + "阶";
			a.nameLb.text = Model_Equip.getPartName(vo.type);
			let len = a.gemBtArr.length;
			for (let i = 0; i < len; i++) {
				a.gemBtArr[i].updateShow(vo.bs[i]);
				a.gemBtArr[i].setCheckNotice(Model_DuanZao.gemShowNotice(vo.bs[i], i));
				if (vo.bs[i] > 0) {
				} else {
					a.gemBtArr[i].showText(a.gemNameStr[i]);
				}
			}
			a.keyBt.checkNotice = Model_DuanZao.checkKeyBtNotice();
			var nextCfg = Config.dzgemsuit_209[Model_DuanZao.suitArr[1] + 1];
			if (nextCfg) {
				a.suitBt.checkNotice = Model_DuanZao.gemLv >= nextCfg.lv;
			} else {
				a.suitBt.checkNotice = false;
			}
		} else {
			a.grid.vo = null;
		}
	}

	public sortFunc(a: IGridImpl, b: IGridImpl): number {
		return a.paixu - b.paixu;
	}

	public clean() {
		let a = this;
		let len = a.gemBtArr.length;
		for (let i = 0; i < len; i++) {
			a.gemBtArr[i].updateShow(0)
		}
		ConfigHelp.cleanGridEff(a.grid);
	}
}