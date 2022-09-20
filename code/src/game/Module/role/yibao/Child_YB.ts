class Child_YB extends fairygui.GComponent {

	public useImg: fairygui.GImage;
	public bwIcon: fairygui.GLoader;
	public drugBt: Button2;
	public useBt: Button2;
	public list: fairygui.GList;
	public powerLb: fairygui.GLabel;
	public nameLb: fairygui.GLabel;
	public starLb: fairygui.GTextField;
	public curAtt: fairygui.GRichTextField;
	public nextAtt: fairygui.GRichTextField;
	public attGroup: fairygui.GGroup;
	public upStarBt: Button0;
	public costLb: fairygui.GRichTextField;
	public upStarGroup: fairygui.GGroup;
	public maxGroup: fairygui.GGroup;
	public drugCount: fairygui.GRichTextField;
	public skillDes: fairygui.GRichTextField;
	public showAtt: fairygui.GRichTextField;
	public t0: fairygui.Transition;
	public lbTip: fairygui.GRichTextField;
	public showBt: fairygui.GButton;
	public starPowerLb: fairygui.GTextField;
	public jueXingBt: Button2;
	public promptLb0: fairygui.GLabel;

	public static URL: string = "ui://3tzqotadqqvu23";
	public static createInstance(): Child_YB {
		return <Child_YB><any>(fairygui.UIPackage.createObject("role", "Child_BaoWu"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		CommonManager.parseChildren(a, a);
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandle;
		a.list.addEventListener(fairygui.ItemEvent.CLICK, a.itemHandler, a);
		a.promptLb0.text = "异宝效果";
		a.drugBt.addClickListener(a.drugHandle, a);
		a.upStarBt.addClickListener(a.upStarHandler, a);
		a.showBt.addClickListener(a.showHandler, a);
		a.jueXingBt.addClickListener(a.OnJueXing, a);
	}

	private OnJueXing() {
		GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.YIBAO);
	}

	private showHandler() {
		let vo: Vo_YiBao = this.curGrid.vo;
		if (vo) {
			GGlobal.modelchat.CG_CHAT_SHOW_DATA(4, vo.id);
		}
	}

	private drugHandle(): void {
		GGlobal.layerMgr.open(UIConst.YIBAO_DRUG)
	}

	private upStarHandler(): void {
		let a = this;
		let vo: Vo_YiBao = a.curGrid.vo;
		if (a.upStarBt.checkNotice) {
			GGlobal.modelYiBao.CG_YIBAO_JIHUO(vo.id);
		} else {
			View_CaiLiao_GetPanel.show(this.costItem);
		}
	}

	public renderHandle(index: number, obj: fairygui.GObject): void {
		let a = this;
		let grid: ViewYBGrid = obj as ViewYBGrid;
		let vo = Model_YiBao.YBArr[index];
		grid.vo = vo;
		if (Model_GlobalMsg.selectID > 0 && Model_GlobalMsg.selectID == vo.id) {
			if (a.curGrid) a.curGrid.choose = false;
			grid.choose = true;
			a.curGrid = grid;
			a.curVo = vo;
		} else if (!a.curVo && index == 0 && Model_GlobalMsg.selectID <= 0) {
			grid.choose = true;
			a.curGrid = grid;
			a.curVo = vo;
		} else if (a.curVo && a.curVo.id == grid.vo.id) {
			a.curGrid.choose = false;
			grid.choose = true;
			a.curGrid = grid;
			a.curVo = vo;
		}
		Model_YiBao.drugMax += grid.vo.starLv * grid.vo.drugMax;
		grid.checkNotice = Model_YiBao.checkUpStarGridNotice(grid.vo);
	}

	private itemHandler(event: fairygui.ItemEvent): void {
		let a = this;
		let grid: ViewYBGrid = event.itemObject as ViewYBGrid;
		if (a.curGrid && grid.vo.id == a.curVo.id) return;
		if (a.curGrid) a.curGrid.choose = false;
		grid.choose = true;
		a.curGrid = grid;
		a.curVo = grid.vo;
		Model_GlobalMsg.selectID = 0;
		a.updateShow();
	}

	private curGrid: ViewYBGrid;
	private curVo: Vo_YiBao;
	public onOpen(): void {
		let a = this;
		a.updateList();
		if (Model_YiBao.YBArr.length > 0) {
			a.list.scrollToView(0);
		}
		GGlobal.reddot.listen(ReddotEvent.CHECK_YIBAO, a.updateList, a);
		GGlobal.reddot.listen(UIConst.JUEXING, a.updateJuexing, a);
	}

	public onClose(): void {
		let a = this;
		a.disposePanel();
		GGlobal.reddot.remove(ReddotEvent.CHECK_YIBAO, a.updateList, a);
		GGlobal.reddot.remove(UIConst.JUEXING, a.updateJuexing, a);
	}

	public updateList(): void {
		let a = this;
		Model_YiBao.drugMax = 0;
		for (let i = 0; i < Model_YiBao.YBArr.length; i++) {
			let vo = Model_YiBao.YBArr[i];
			if (vo.starLv <= 0 && Model_YiBao.checkUpStarGridNotice(vo)) {
				vo.state = 0;
			} else if (vo.starLv > 0) {
				vo.state = 1;
			} else {
				vo.state = 2;
			}
		}
		Model_YiBao.YBArr.sort(Model_YiBao.sortYiBao);
		a.list.numItems = Model_YiBao.YBArr.length;
		a.updateShow();
	}

	private bwEff: Part;
	public updateShow(): void {
		let a = this;
		let cf = Config.ybstar_217;
		if (!a.curGrid) return;
		let vo: Vo_YiBao = a.curGrid.vo;
		a.nameLb.text = vo.name;
		a.nameLb.color = Color.getColorInt(vo.quality);
		IconUtil.setImg(a.bwIcon, Enum_Path.PIC_URL + vo.id + ".png");
		if (a.bwEff) {
			EffectMgr.instance.removeEff(a.bwEff);
			a.bwEff = null;
		}
		if (vo.cfg.tptx > 0) {
			if (!a.bwEff) {
				a.bwEff = EffectMgr.addEff("uieff/" + vo.cfg.tptx, a.bwIcon.displayObject as fairygui.UIContainer, a.bwIcon.width / 2, a.bwIcon.height / 2, 1000, -1, true);
			}
		}
		let starStr: string = "";
		for (let i = 0; i < 10; i++) {
			let num = Math.floor(vo.starLv / 10);
			let num1 = vo.starLv % 10;
			if (i < num1) {
				starStr += "" + (num + 1);
			} else {
				starStr += "" + num;
			}
		}
		a.starLb.text = starStr;
		a.skillDes.visible = false;
		a.skillDes.text = "";
		a.lbTip.text = "可提升异宝属性丹吞噬上限：" + HtmlUtil.fontNoSize(vo.drugMax * (vo.starLv > 0 ? vo.starLv : 1) + "", Color.getColorStr(5));
		a.powerLb.text = (vo.starLv > 0 ? cf[vo.cfg.starid * 1000 + vo.starLv].power : 0) + "";
		let attstr0: string = "";
		let attstr1: string = "";
		a.attGroup.visible = false;
		a.showAtt.visible = true;
		a.maxGroup.visible = false;
		a.upStarGroup.visible = true;
		if (vo.starLv == 0) {
			attstr1 = ConfigHelp.attrString(JSON.parse(cf[vo.cfg.starid * 1000 + 1].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
			a.showAtt.text = attstr1;
			a.updateCostShow();
			a.starPowerLb.text = cf[vo.cfg.starid * 1000 + 1].power + "";
		} else if (vo.starLv < vo.starMax) {
			attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.cfg.starid * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(1));
			attstr1 = ConfigHelp.attrString(JSON.parse(cf[cf[vo.cfg.starid * 1000 + vo.starLv].next].attr), "+", Color.getColorStr(2), Color.getColorStr(2));
			a.updateCostShow();
			a.curAtt.text = attstr0;
			a.nextAtt.text = attstr1;
			a.attGroup.visible = true;
			a.showAtt.visible = false;
			a.starPowerLb.text = (cf[cf[vo.cfg.starid * 1000 + vo.starLv].next].power - cf[vo.cfg.starid * 1000 + vo.starLv].power) + "";
		} else {
			attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.cfg.starid * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
			a.upStarBt.checkNotice = false;
			a.showAtt.text = attstr0;
			a.maxGroup.visible = true;
			a.upStarGroup.visible = false;
		}
		a.drugCount.text = Model_YiBao.drugCount + "/" + Model_YiBao.drugMax;
		let count = Model_Bag.getItemCount(Model_YiBao.drugId);
		if (count > 0 && Model_YiBao.drugCount < Model_YiBao.drugMax) {
			a.drugBt.checkNotice = true;
		} else {
			a.drugBt.checkNotice = false;
		}
		a.showBt.visible = vo.starLv > 0;
		if (vo.starLv > 0) {
			a.upStarBt.text = "升星";
		} else {
			a.upStarBt.text = "激活";
		}
		a.updateJuexing();
	}

	private updateJuexing() {
		let self = this;
		self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.YIBAO);
		self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 3);
	}

	private costItem: VoItem
	public updateCostShow(): void {
		let a = this;
		let vo = a.curVo;
		this.costItem = VoItem.create(vo.costArr[0][1]);
		let count = Model_Bag.getItemCount(this.costItem.id);
		if (count >= vo.costArr[0][2]) {
			a.upStarBt.checkNotice = true;
			a.costLb.text = "消耗：" + HtmlUtil.fontNoSize(this.costItem.name, Color.getColorStr(this.costItem.quality)) + "x" + vo.costArr[0][2] +
				HtmlUtil.fontNoSize("(" + count + "/" + vo.costArr[0][2] + ")", Color.getColorStr(2));
		} else {
			a.upStarBt.checkNotice = false;
			a.costLb.text = "消耗：" + HtmlUtil.fontNoSize(this.costItem.name, Color.getColorStr(this.costItem.quality)) + "x" + vo.costArr[0][2] +
				HtmlUtil.fontNoSize("(" + count + "/" + vo.costArr[0][2] + ")", Color.getColorStr(6));
		}
	}

	public disposePanel(): void {
		let a = this;
		if (a.curGrid) a.curGrid.choose = false;
		a.curGrid = null;
		a.curVo = null;
		Model_GlobalMsg.selectID = 0;
		a.list.numItems = 0;
		IconUtil.setImg(a.bwIcon, null);
		if (a.bwEff) {
			EffectMgr.instance.removeEff(a.bwEff);
			a.bwEff = null;
		}
	}
}