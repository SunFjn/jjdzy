class Child_ShenJian extends fairygui.GComponent {

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
	public static createInstance(): Child_ShenJian {
		return <Child_ShenJian><any>(fairygui.UIPackage.createObject("role", "Child_BaoWu"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		var a = this;
		CommonManager.parseChildren(a, a);
		a.promptLb0.text = "神剑效果";
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandle;
		a.list.addEventListener(fairygui.ItemEvent.CLICK, a.itemHandler, a);
		a.drugBt.addClickListener(a.drugHandle, a);
		a.upStarBt.addClickListener(a.upStarHandler, a);
		a.useBt.addClickListener(a.equipHandle, a);
		a.showBt.addClickListener(a.showHandler, a);
		a.jueXingBt.addClickListener(a.OnJueXing, a);
	}

	private OnJueXing() {
		GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.SHEN_JIAN);
	}

	private showHandler() {
		let vo: Vo_ShenJian = this.curGrid.vo;
		if (vo) {
			GGlobal.modelchat.CG_CHAT_SHOW_DATA(5, vo.id);
		}
	}

	private equipHandle(): void {
		let a = this;
		if (Model_ShenJian.shenJianId == a.curGrid.vo.id) {
			GGlobal.modelsj.CG_SHENJIAN_EQUIP(2, a.curGrid.vo.id);
		} else {
			GGlobal.modelsj.CG_SHENJIAN_EQUIP(1, a.curGrid.vo.id);
		}
	}

	private drugHandle(): void {
		GGlobal.layerMgr.open(UIConst.SHEN_JIAN_DRUG)
	}

	private upStarHandler(): void {
		let a = this;
		let vo: Vo_ShenJian = a.curGrid.vo;
		if (a.upStarBt.checkNotice) {
			if (vo.starLv <= 0) {
				GGlobal.modelsj.CG_SHENJIAN_JIHUO(vo.id);
			} else {
				GGlobal.modelsj.CG_SHENJIAN_UPSTAR(vo.id);
			}
		} else {
			if (vo.starLv >= vo.starMax) {
				ViewCommonWarn.text("已满星");
			} else {
				View_CaiLiao_GetPanel.show(this.costItem);
			}
		}
	}

	public renderHandle(index: number, obj: fairygui.GObject): void {
		let a = this;
		let grid: ViewShenJianGrid = obj as ViewShenJianGrid;
		grid.vo = Model_ShenJian.shenjianArr[index];
		if (Model_GlobalMsg.selectID > 0 && Model_GlobalMsg.selectID == grid.vo.id) {
			if (a.curGrid) a.curGrid.choose = false;
			grid.choose = true;
			a.curGrid = grid;
			a.curVo = grid.vo;
		} else if (a.curVo && a.curVo.id == grid.vo.id) {
			grid.choose = true;
			a.curGrid = grid;
			a.curVo = grid.vo;
		}
		Model_ShenJian.drugMax += grid.vo.starLv * grid.vo.drugMax;
		grid.checkNotice = Model_ShenJian.checkUpStarGridNotice(grid.vo);
	}

	private itemHandler(event: fairygui.ItemEvent): void {
		let a = this;
		let grid: ViewShenJianGrid = event.itemObject as ViewShenJianGrid;
		if (a.curGrid && grid.vo.id == a.curGrid.vo.id) return;
		if (a.curGrid) a.curGrid.choose = false;
		grid.choose = true;
		a.curGrid = grid;
		a.curVo = grid.vo;
		Model_GlobalMsg.selectID = 0;
		a.updateShow();
	}

	private curGrid: ViewShenJianGrid;
	private curVo: Vo_ShenJian;
	public onOpen(): void {
		let a = this;
		a.updateList();
		GGlobal.reddot.listen(ReddotEvent.CHECK_SHENJIAN, a.updateList, a);
		GGlobal.reddot.listen(UIConst.JUEXING, a.updateJuexing, a);
	}

	public onClose(): void {
		let a = this;
		a.disposePanel();
		GGlobal.reddot.remove(ReddotEvent.CHECK_SHENJIAN, a.updateList, a);
		GGlobal.reddot.remove(UIConst.JUEXING, a.updateJuexing, a);
	}

	public updateList(): void {
		let a = this;
		Model_ShenJian.drugMax = 0;
		let arr = Model_ShenJian.shenjianArr
		for (let i = 0; i < arr.length; i++) {
			let vo = arr[i];
			if (vo.id == Model_ShenJian.shenJianId) {
				vo.state = 0;
			} else if (vo.starLv <= 0 && Model_ShenJian.checkUpStarGridNotice(vo)) {
				vo.state = 1;
			} else if (vo.starLv > 0) {
				vo.state = 2;
			} else {
				vo.state = 3;
			}
		}
		Model_ShenJian.shenjianArr.sort(Model_ShenJian.sortShenJian);
		if (a.curGrid) a.curGrid.choose = false;
		a.curGrid = null;
		a.list.numItems = arr.length;
		a.updateShow();
	}

	private bwEff: Part;
	public updateShow(): void {
		let self = this;
		let cf = Config.swordstar_216;
		if (!self.curVo) {
			let grid = self.list._children[0] as ViewShenJianGrid
			grid.choose = true;
			self.curGrid = grid;
			self.curVo = grid.vo;
		}
		let vo: Vo_ShenJian = self.curVo;
		self.nameLb.text = vo.name;
		self.nameLb.color = Color.getColorInt(vo.quality);
		IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.id + ".png");
		if (self.bwEff) {
			EffectMgr.instance.removeEff(self.bwEff);
			self.bwEff = null;
		}
		if (vo.cfg.tptx > 0) {
			if (!self.bwEff) {
				self.bwEff = EffectMgr.addEff("uieff/" + vo.cfg.tptx, self.bwIcon.displayObject as fairygui.UIContainer, self.bwIcon.width / 2, self.bwIcon.height / 2, 1000, -1, true);
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
		self.starLb.text = starStr;
		self.lbTip.text = "可提升神剑属性丹吞噬上限：" + HtmlUtil.fontNoSize(vo.drugMax * (vo.starLv > 0 ? vo.starLv : 1) + "", Color.getColorStr(5));
		self.powerLb.text = (vo.starLv > 0 ? cf[vo.cfg.starid * 1000 + vo.starLv].power : 0) + "";
		self.skillDes.text = vo.miaoshu;
		let attstr0: string = "";
		let attstr1: string = "";
		self.attGroup.visible = false;
		self.showAtt.visible = true;
		self.maxGroup.visible = false;
		self.upStarGroup.visible = true;
		if (vo.starLv <= 0) {
			attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.cfg.starid * 1000 + 1].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
			self.updateCostShow();
			self.showAtt.text = attstr0;
			self.starPowerLb.text = cf[vo.cfg.starid * 1000 + 1].power + "";
		} else if (vo.starLv < vo.starMax) {
			attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.cfg.starid * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(1));
			attstr1 = ConfigHelp.attrString(JSON.parse(cf[cf[vo.cfg.starid * 1000 + vo.starLv].next].attr), "+", Color.getColorStr(2), Color.getColorStr(2));
			self.updateCostShow();
			self.curAtt.text = attstr0;
			self.nextAtt.text = attstr1;
			self.attGroup.visible = true;
			self.showAtt.visible = false;
			self.starPowerLb.text = (cf[cf[vo.cfg.starid * 1000 + vo.starLv].next].power - cf[vo.cfg.starid * 1000 + vo.starLv].power) + "";
		} else {
			attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.cfg.starid * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
			self.upStarBt.checkNotice = false;
			self.showAtt.text = attstr0;
			self.maxGroup.visible = true;
			self.upStarGroup.visible = false;
		}
		self.drugCount.text = Model_ShenJian.drugCount + "/" + Model_ShenJian.drugMax;
		let count = Model_Bag.getItemCount(Model_ShenJian.drugId);
		if (count > 0 && Model_ShenJian.drugCount < Model_ShenJian.drugMax) {
			self.drugBt.checkNotice = true;
		} else {
			self.drugBt.checkNotice = false;
		}
		self.showBt.visible = vo.starLv > 0;
		self.useImg.visible = false;
		if (vo.starLv > 0) {
			if (Model_ShenJian.shenJianId == vo.id) {
				self.useBt.icon = "ui://jvxpx9emdna53co";
			} else {
				self.useBt.icon = "ui://jvxpx9emdna53cp";
			}
			self.useBt.visible = true;
			self.upStarBt.text = "升星";
		} else {
			self.upStarBt.text = "激活";
			self.useBt.visible = false;
		}
		self.updateJuexing();
	}

	private updateJuexing() {
		let self = this;
		self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.SHEN_JIAN);
		self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 2);
	}

	private costItem: VoItem
	public updateCostShow(): void {
		let a = this;
		let vo: Vo_ShenJian = a.curGrid.vo;
		this.costItem = VoItem.create(vo.costArr[0][1]);
		a.upStarGroup.visible = true;
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
		let self = this;
		if (self.curGrid) self.curGrid.choose = false;
		self.curGrid = null;
		self.curVo = null;
		Model_GlobalMsg.selectID = 0;
		self.list.numItems = 0;
		IconUtil.setImg(self.bwIcon, null);
		if (self.bwEff) {
			EffectMgr.instance.removeEff(self.bwEff);
			self.bwEff = null;
		}
	}

	public check_select_grid(value) {
		if (!this.curGrid) return false;
		let vo = this.curGrid.vo
		let itemVo: VoItem = VoItem.create(vo.costArr[0][1]);
		let count = Model_Bag.getItemCount(itemVo.id);
		if (count >= vo.costArr[0][2] && vo.starLv <= 0 && vo.quality >= value) {
			return true;
		}
		return false;
	}

	public guide_shenjian_select(step) {
		for (let i = 0; i < this.list._children.length; i++) {
			let grid: ViewShenJianGrid = this.list._children[i] as ViewShenJianGrid;
			let vo = grid.vo;
			let itemVo: VoItem = VoItem.create(vo.costArr[0][1]);
			let count = Model_Bag.getItemCount(itemVo.id);
			if (count >= vo.costArr[0][2] && vo.starLv <= 0 && vo.quality >= step.arg) {
				GuideStepManager.instance.showGuide(grid, grid.width / 2, grid.height / 2);
				GuideStepManager.instance.showGuide1(step.source.index, grid, grid.width, grid.height / 2, 0, 50, -35, true);
				break;
			}
		}
	}

	public guide_shenjian_upstar(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.upStarBt, self.upStarBt.width / 2, self.upStarBt.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.upStarBt, self.upStarBt.width / 2, 0, -90, -106, -100);
	}
}