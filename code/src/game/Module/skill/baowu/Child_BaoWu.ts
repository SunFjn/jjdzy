class Child_BaoWu extends fairygui.GComponent {

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
	public promptLb0: fairygui.GLabel;
	public jueXingBt: Button2;

	public static URL: string = "ui://3tzqotadqqvu23";

	public static createInstance(): Child_BaoWu {
		return <Child_BaoWu><any>(fairygui.UIPackage.createObject("role", "Child_BaoWu"));
	}

	public constructor() {
		super();
	}
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		CommonManager.parseChildren(a, a);
		a.promptLb0.text = "宝物效果";
		a.list.callbackThisObj = this;
		a.list.itemRenderer = a.renderHandle;
		a.list.addEventListener(fairygui.ItemEvent.CLICK, a.itemHandler, a);
		a.t0 = a.getTransition("t0");
		a.useBt.addClickListener(a.useHandle, a);
		a.drugBt.addClickListener(a.drugHandle, a);
		a.upStarBt.addClickListener(a.upStarHandler, a);
		a.showBt.addClickListener(a.showHandler, a);
		a.jueXingBt.addClickListener(a.OnJueXing, a);
	}

	private OnJueXing() {
		GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.BAOWU);
	}

	private showHandler() {
		if (this.curVo) {
			GGlobal.modelchat.CG_CHAT_SHOW_DATA(2, this.curVo.id);
		}
	}

	private upStarHandler(): void {
		if (this.upStarBt.checkNotice) {
			let vo: Vo_BaoWu = this.curVo;
			if (vo.state == 2) {
				GGlobal.modelbw.CG_BAOWU_JIHUO(vo.id);
			} else {
				GGlobal.modelbw.CG_BAOWU_UPSTAR(vo.id);
			}
		} else {
			if (this.curVo.starLv >= this.curVo.starMax) {
				GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.BAOWU);
			} else {
				View_CaiLiao_GetPanel.show(this.costItem);
			}
		}
	}

	private drugHandle(): void {
		GGlobal.layerMgr.open(UIConst.BAOWU_DRUG)
	}

	private useHandle() {
		if (this.curVo) {
			GGlobal.layerMgr.open(UIConst.BAOWU_EQUIP, this.curVo);
		}
	}

	private itemHandler(event: fairygui.ItemEvent): void {
		let a = this;
		let grid: ViewBWGrid = event.itemObject as ViewBWGrid;
		if (a.curVo && a.curVo.id == grid.vo.id) return;
		if (a.curGrid) a.curGrid.choose = false;
		grid.choose = true;
		a.curVo = grid.vo;
		a.curGrid = grid;
		Model_GlobalMsg.selectID = 0;
		a.updateShow();
	}

	public renderHandle(index: number, obj: fairygui.GObject): void {
		let a = this;
		let grid: ViewBWGrid = obj as ViewBWGrid;
		let vo = Model_BaoWu.baowuArr[index];
		grid.vo = vo;
		if (Model_GlobalMsg.selectID > 0 && vo.id == Model_GlobalMsg.selectID) {
			grid.choose = true;
			a.curVo = vo;
			a.curGrid = grid;
		} else if (!a.curVo && index == 0 && Model_GlobalMsg.selectID <= 0) {
			grid.choose = true;
			a.curVo = vo;
			a.curGrid = grid;
		} else if (a.curVo && a.curVo.id == vo.id) {
			grid.choose = true;
			a.curVo = vo;
			a.curGrid = grid;
		} else {
			grid.choose = false;
		}
		grid.checkNotice = Model_BaoWu.checkUpStarGridNotice(vo);
	}

	private curVo: Vo_BaoWu;
	private curGrid: ViewBWGrid;
	public static nickVo: Vo_BaoWu;
	public updateShow(): void {
		let a = this;
		let cf = Config.baostar_214;
		if (!a.curVo) return;
		let vo: Vo_BaoWu = Child_BaoWu.nickVo = a.curVo;
		a.nameLb.text = vo.name;
		a.nameLb.color = Color.getColorInt(vo.quality);
		IconUtil.setImg(a.bwIcon, Enum_Path.PIC_URL + vo.imageID + ".png");
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
		a.skillDes.text = SkillUtil.getSkillDes(vo.skillVo);
		a.lbTip.text = "可提升宝物属性丹吞噬上限：" + HtmlUtil.fontNoSize(vo.drugMax * (vo.starLv > 0 ? vo.starLv : 1) + "", Color.getColorStr(5));
		let attstr0: string = "";
		let attstr1: string = "";
		this.attGroup.visible = false;
		this.showAtt.visible = true;
		this.maxGroup.visible = false;
		this.upStarGroup.visible = true;
		if (vo.starLv == 0) {
			attstr1 = ConfigHelp.attrString(JSON.parse(cf[vo.quality * 1000 + 1].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
			a.showAtt.text = attstr1;
			a.updateCostShow();
			a.starPowerLb.text = cf[vo.quality * 1000 + 1].power + "";
		} else if (vo.starLv < vo.starMax) {
			attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.quality * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(1));
			attstr1 = ConfigHelp.attrString(JSON.parse(cf[cf[vo.quality * 1000 + vo.starLv].next].attr), "+", Color.getColorStr(2), Color.getColorStr(2));
			a.updateCostShow();
			a.curAtt.text = attstr0;
			a.nextAtt.text = attstr1;
			a.attGroup.visible = true;
			a.showAtt.visible = false;
			a.starPowerLb.text = (cf[cf[vo.quality * 1000 + vo.starLv].next].power - cf[vo.quality * 1000 + vo.starLv].power) + "";
		} else {
			attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.quality * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
			a.upStarBt.checkNotice = false;
			a.showAtt.text = attstr0;
			a.maxGroup.visible = true;
			a.upStarGroup.visible = false;
		}
		a.useImg.visible = false;
		a.useBt.visible = false;
		a.showBt.visible = vo.starLv > 0;
		if (vo.starLv > 0) {
			a.upStarBt.text = "升星";
			if ((Model_BaoWu.equipBWIDArr[0] > 0 && Model_BaoWu.equipBWIDArr[0] == vo.id) || (Model_BaoWu.equipBWIDArr[1] > 0 && Model_BaoWu.equipBWIDArr[1] == vo.id)) {
				a.useImg.visible = true;
			} else {
				a.useBt.visible = true;
				a.useBt.checkNotice = Model_BaoWu.checkChangeBtNotice(0) || Model_BaoWu.checkChangeBtNotice(1);
			}
		} else {
			a.upStarBt.text = "激活";
		}
		a.powerLb.text = (vo.starLv > 0 ? cf[vo.quality * 1000 + vo.starLv].power : 0) + "";
	}

	private costItem: VoItem
	public updateCostShow(): void {
		let vo = this.curVo;
		this.costItem = VoItem.create(vo.costArr[0][1]);
		let count = Model_Bag.getItemCount(this.costItem.id);
		if (count >= vo.costArr[0][2]) {
			this.upStarBt.checkNotice = true;
			this.costLb.text = "消耗：" + HtmlUtil.fontNoSize(this.costItem.name, Color.getColorStr(this.costItem.quality)) + "x" + vo.costArr[0][2] +
				HtmlUtil.fontNoSize("(" + count + "/" + vo.costArr[0][2] + ")", Color.getColorStr(2));
		} else {
			this.upStarBt.checkNotice = false;
			this.costLb.text = "消耗：" + HtmlUtil.fontNoSize(this.costItem.name, Color.getColorStr(this.costItem.quality)) + "x" + vo.costArr[0][2] +
				HtmlUtil.fontNoSize("(" + count + "/" + vo.costArr[0][2] + ")", Color.getColorStr(6));
		}
	}

	public show(): void {
		let a = this;
		for (let i = 0; i < Model_BaoWu.baowuArr.length; i++) {
			let vo = Model_BaoWu.baowuArr[i];
			if (vo.id == Model_BaoWu.equipBWIDArr[0]) {
				vo.state = 0;
			} else if (vo.id == Model_BaoWu.equipBWIDArr[1]) {
				vo.state = 1;
			} else if (vo.starLv <= 0) {
				vo.state = Model_BaoWu.checkUpStarGridNotice(vo) ? 2 : 4;
			} else {
				vo.state = 3;
			}
		}
		Model_BaoWu.baowuArr.sort(Model_BaoWu.sortBaoWu);
		a.list.numItems = Model_BaoWu.baowuArr.length;
		if (Model_GlobalMsg.selectID > 0) {
			for (let i = 0; i < Model_BaoWu.baowuArr.length; i++) {
				if (Model_BaoWu.baowuArr[i].id == Model_GlobalMsg.selectID) {
					a.list.scrollToView(i, false);
					break;
				}
			}
		}
		a.drugCount.text = Model_BaoWu.drugNum + "/" + Model_BaoWu.drugMax;
		let count = Model_Bag.getItemCount(Model_BaoWu.drugId);
		if (count > 0 && Model_BaoWu.drugNum < Model_BaoWu.drugMax) {
			a.drugBt.checkNotice = true;
		} else {
			a.drugBt.checkNotice = false;
		}
		a.updateShow();
		a.updateJuexing();
	}

	private updateJuexing() {
		let self = this;
		self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.BAOWU);
		self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 1);
	}

	public open() {
		let a = this;
		if (!(Model_player.taskId <= Config.xtcs_004[2801].num || Model_player.taskId >= Config.xtcs_004[2806].num)) {
			a.list.setVirtual();
		}
		a.show();
		GGlobal.reddot.listen(ReddotEvent.CHECK_BAOWU, a.show, this);
		GGlobal.reddot.listen(UIConst.JUEXING, a.updateJuexing, this);
	}

	public close() {
		let a = this;
		Model_GlobalMsg.selectID = 0;
		GGlobal.reddot.remove(ReddotEvent.CHECK_BAOWU, a.show, a);
		GGlobal.reddot.remove(UIConst.JUEXING, a.updateJuexing, a);
		a.disposePanel();
	}


	public disposePanel(): void {
		let a = this;
		if (a.curGrid) a.curGrid.choose = false;
		a.curGrid = null;
		a.curVo = null;
		a.list.numItems = 0;
		IconUtil.setImg(a.bwIcon, null);
	}

	public guide_baowu_select(step) {
		for (let i = 0; i < this.list._children.length; i++) {
			let grid: ViewBWGrid = this.list._children[i] as ViewBWGrid;
			let vo = grid.vo;
			if (vo.state == 2) {
				GuideStepManager.instance.showGuide(grid, grid.width / 2, grid.height / 2);
				GuideStepManager.instance.showGuide1(step.source.index, grid, grid.width, grid.height / 2, 0, 50, -35, true);
				break;
			}
		}
	}

	public check_select_grid() {
		if (!this.curVo) return false;
		let vo = this.curVo
		if (vo.state == 2) {
			return true;
		}
		return false;
	}

	public guide_baowu_upstar(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.upStarBt, self.upStarBt.width / 2, self.upStarBt.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.upStarBt, self.upStarBt.width / 2, 0, -90, -106, -100);
	}

	public check_use_grid() {
		if (!this.curVo) return false;
		let vo = this.curVo
		return vo.state == 3;
	}

	public guide_use_grid(step) {
		let grid: ViewBWGrid = this.list._children[step.arg] as ViewBWGrid;
		if (grid) {
			GuideStepManager.instance.showGuide(grid, grid.width / 2, grid.height / 2);
			GuideStepManager.instance.showGuide1(step.source.index, grid, grid.width, grid.height / 2, 0, 50, -35, true);
		}
	}

	public check_baowu_useBt() {
		return this.useBt.visible;
	}

	public guide_baowu_useBt(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.useBt, self.useBt.width / 2, self.useBt.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.useBt, 0, self.useBt.height / 2, 180, -250, -35);
	}
}