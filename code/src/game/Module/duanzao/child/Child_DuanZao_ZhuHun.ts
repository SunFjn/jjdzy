class Child_DuanZao_ZhuHun extends fairygui.GComponent implements IPanel {

	//>>>>start
	public grid: ViewGrid;
	public expBar: fairygui.GProgressBar;
	public keyZhuHunBt: Button1;
	public iconBt0: Button2;
	public iconBt1: Button2;
	public iconBt2: Button2;
	public curLb: fairygui.GRichTextField;
	public nextLb: fairygui.GRichTextField;
	public jieLb: fairygui.GRichTextField;
	public countLb0: ViewResource;
	public countLb1: ViewResource;
	public countLb2: ViewResource;
	public nameLb: fairygui.GRichTextField;
	//>>>>end

	public static URL: string = "ui://pofv8989z1r84";

	public static createInstance(): Child_DuanZao_ZhuHun {
		return <Child_DuanZao_ZhuHun><any>(fairygui.UIPackage.createObject("DuanZao", "Child_DuanZao_ZhuHun"));
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
		a.iconBt0.data = 1;
		a.iconBt1.data = 2;
		a.iconBt2.data = 3;
		// a.zhuHunBt.addClickListener(a.zhuHunHandle, a);
		a.keyZhuHunBt.addClickListener(a.keyZhuHunHandle, a);
		// a.checkbox0.addClickListener(a.checkHandle, a);
		// a.checkbox1.addClickListener(a.checkHandle, a);
		// a.checkbox2.addClickListener(a.checkHandle, a);

		a.iconBt0.addClickListener(a.iconHandle, a);
		a.iconBt1.addClickListener(a.iconHandle, a);
		a.iconBt2.addClickListener(a.iconHandle, a);
	}

	private iconHandle(event: egret.TouchEvent): void {
		let btn: fairygui.GButton = event.target as fairygui.GButton;
		GGlobal.layerMgr.open(UIConst.DUANZAO_ZHUHUN_SHIHUN, { id: btn.data });
	}

	private check: fairygui.GButton;
	private checkHandle(event: egret.TouchEvent): void {
		let a = this;
		let btn: fairygui.GButton = event.target as fairygui.GButton;
		if (btn.id == a.check.id) return;
		if (a.check) a.check.selected = false;
		a.check = btn;
	}

	private keyZhuHunHandle(): void {
		let a = this;
		let cfg = Config.dzsoul_209[a.vo.zhuHunLv];
		for (let i = 0; i < 3; i++) {
			let num = Model_Bag.getItemCount(Model_DuanZao.itemIDArr[i]);
			if (num > 0 && cfg.exp > 0) {
				GGlobal.modelDuanZao.CG_DUANZAO_KEY_ZHUHUN(a.vo.type, 0);
				return;
			}
		}
		if (cfg.exp <= 0) {
			ViewCommonWarn.text("已满阶");
		} else {
			View_CaiLiao_GetPanel.show(VoItem.create(Model_DuanZao.itemIDArr[2]));
		}
	}

	private needExp: number
	public vo: VoEquip;
	public setVo(vo: VoEquip) {
		let a = this;
		a.vo = vo;
		a.grid.vo = vo;
		if (vo) {
			a.grid.tipEnabled = true;
			let cfg = Config.dzsoul_209[vo.zhuHunLv];
			let itemVo0 = VoItem.create(Model_DuanZao.itemIDArr[0]);
			let itemVo1 = VoItem.create(Model_DuanZao.itemIDArr[1]);
			let itemVo2 = VoItem.create(Model_DuanZao.itemIDArr[2]);
			let num0 = Model_Bag.getItemCount(Model_DuanZao.itemIDArr[0]);
			let num1 = Model_Bag.getItemCount(Model_DuanZao.itemIDArr[1]);
			let num2 = Model_Bag.getItemCount(Model_DuanZao.itemIDArr[2]);
			a.nameLb.text = Model_Equip.getPartName(vo.type);
			a.countLb0.setCount(num0);
			a.countLb1.setCount(num1);
			a.countLb2.setCount(num2);
			a.countLb0.setImgUrl(itemVo0.icon);
			a.countLb1.setImgUrl(itemVo1.icon);
			a.countLb2.setImgUrl(itemVo2.icon);
			a.jieLb.text = vo.zhuHunLv + "阶";
			let attArr: Array<any> = JSON.parse(cfg["attr" + vo.type]);
			let attstr: string = "";
			for (let i = 0; i < attArr.length; i++) {
				if (i == 0) {
					attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				} else {
					attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				}
			}
			a.curLb.text = attstr;
			a.needExp = 0;
			if (cfg.exp > 0) {
				a.expBar.value = vo.zhuHunExp;
				a.expBar.max = cfg.exp;
				a.needExp = cfg.exp - vo.zhuHunExp;
				a.keyZhuHunBt.checkNotice = (num0 * Model_DuanZao.expArr[0] + num1 * Model_DuanZao.expArr[1] + num2 * Model_DuanZao.expArr[2]) >= a.needExp;
				var nectCfg = Config.dzsoul_209[vo.zhuHunLv + 1];
				let attArr1: Array<any> = JSON.parse(nectCfg["attr" + vo.type]);
				let attstr1: string = "";
				for (let i = 0; i < attArr.length; i++) {
					if (i == 0) {
						attstr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
					} else {
						attstr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
					}
				}
				a.nextLb.text = attstr1;

			} else {
				a.expBar.value = 1;
				a.expBar.max = 1;
				a.nextLb.text = "已满阶";
				a.expBar._titleObject.text = "已满阶";
				// a.zhuHunBt.checkNotice = false;
				a.keyZhuHunBt.checkNotice = false;
			}
			a.iconBt0.checkNotice = Model_DuanZao.checkShiHunNotice(1);
			a.iconBt1.checkNotice = Model_DuanZao.checkShiHunNotice(2);
			a.iconBt2.checkNotice = Model_DuanZao.checkShiHunNotice(3);
		}
	}

	private isUpdate: boolean = true;
	public clean() {
		ConfigHelp.cleanGridEff(this.grid);
		this.isUpdate = true;
	}
}