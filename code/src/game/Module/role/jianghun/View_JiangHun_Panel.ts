class View_JiangHun_Panel extends UIPanelBase {

	public c1: fairygui.Controller;
	public tabArr: Array<TabButton> = [];
	public powerLb: fairygui.GTextField;
	public lineArr: Array<fairygui.GImage> = [];
	public lineArr1: Array<fairygui.GImage> = [];
	public gridArr: Array<JiangHunGrid> = [];
	public suitBt: Button2;
	public moneyLb: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;
	public suitLb: fairygui.GRichTextField;
	public static URL: string = "ui://3tzqotadk8oze";

	public constructor() {
		super();
		this.setSkin("role", "role_atlas0", "View_JiangHun_Panel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(JiangHunGrid.URL, JiangHunGrid);
	}

	protected initView(): void {
		super.initView();
		const self = this;
		for (let i = 0; i < 9; i++) {
			let grid: JiangHunGrid = self[`grid${i}`];
			self.gridArr.push(grid);
			if (i > 0) {
				let line: fairygui.GImage = self["line" + i];
				self.lineArr.push(line);
				let line1: fairygui.GImage = self["line_" + i];
				self.lineArr1.push(line1);
			}
			if (i < 4) {
				let tab: TabButton = self["tab" + i];
				self.tabArr.push(tab);
			}
		}
		GGlobal.modeljh.CG_OPEN_JIANGHUN();
		GGlobal.modelRunMan.CG_OPENUI();
	}

	private gridHandle(event: egret.TouchEvent): void {
		let grid: JiangHunGrid = event.target as JiangHunGrid;
		if (grid.vo.isJiHuo) {
			GGlobal.layerMgr.open(UIConst.JIANGHUN_UP, grid.vo);
		}
	}

	public suitHandle(): void {
		GGlobal.layerMgr.open(UIConst.JIANGHUN_SUIT, this.c1.selectedIndex + 1);
	}

	public updateShow(): void {
		const self = this;
		Model_JiangHun.openIndex = 0;
		Model_JiangHun.level = 0;
		let power: number = 0;
		let arr: Array<Vo_JiangHun> = Model_JiangHun.jianghunArr[self.c1.selectedIndex];
		let cfg = Config.genteam_006[Model_JiangHun.suitIdArr[self.c1.selectedIndex]];
		this.promptLb.visible = false;
		for (let i = 0; i < self.gridArr.length; i++) {
			let vo: Vo_JiangHun = arr[i];
			self.gridArr[i].vo = vo;
			if (vo.isJiHuo == false) {
				if (Model_JiangHun.openIndex == 0) {
					let type: number = vo.activationArr[0][0];
					let pass: number = vo.activationArr[0][1];
					self.promptLb.text = HtmlUtil.fontNoSize(Model_RunMan.getTypeName(type) + "·过关斩将", Color.getColorStr(type + 1)) + "通过" +
						HtmlUtil.fontNoSize(pass + "关", Color.getColorStr(2)) + "可激活" + HtmlUtil.fontNoSize("“" + vo.name + "”", Color.getColorStr(vo.quality));
					self.promptLb.visible = true;
				}
				Model_JiangHun.openIndex++;
			}
			Model_JiangHun.level += vo.level;
			power += vo.power;
			if (i != 0) {
				if (arr[i].isJiHuo) {
					self.lineArr[i - 1].visible = true;
					self.lineArr1[i - 1].visible = false;
				} else {
					self.lineArr[i - 1].visible = false;
					self.lineArr1[i - 1].visible = true;
				}
			}
		}
		if (cfg) {
			self.suitLb.text = cfg.lv + "阶";
			power += cfg.power;
			if (cfg.next > 0 && Model_JiangHun.level >= Config.genteam_006[cfg.next].need) {
				self.suitBt.checkNotice = true;
			} else {
				self.suitBt.checkNotice = false;
			}
		} else {
			self.suitLb.text = "0阶";
			self.suitBt.checkNotice = false;
		}
		self.powerLb.text = power + "";
		self.moneyLb.text = Model_player.voMine.hunhuo + "";
	}

	public checkTabNotice(): void {
		let self = this;
		for (let i = 0; i < self.tabArr.length; i++) {
			if (i == 0) {
				self.tabArr[i].checkNotice = Model_JiangHun.checkTabNotice(0);
			} else {
				self.tabArr[i].checkNotice = GGlobal.reddot.checkCondition(UIConst.JIANGHUN, i);
			}
		}
		self.updateShow();
	}

	eventFunction (type){
		let self = this;
		let event = EventUtil.register;
		for (let i = 0; i < 9; i++) {
			let grid: JiangHunGrid = self.gridArr[i];
			event(type, grid, EventUtil.TOUCH, self.gridHandle, self);
		}
		event(type, self.suitBt, EventUtil.TOUCH, self.suitHandle, self);
		event(type, self.c1, fairygui.StateChangeEvent.CHANGED, self.checkTabNotice, self);
	}

	protected onShown(): void {
		let self = this;
		if (self.c1.selectedIndex == 0) {
			self.checkTabNotice();
		} else {
			self.c1.selectedIndex = 0;
		}
		GGlobal.reddot.listen(ReddotEvent.CHECK_JIANGHUN, self.checkTabNotice, self);
	}

	protected onHide(): void {
		let self = this;
		GGlobal.layerMgr.close(UIConst.JIANGHUN);
		GGlobal.reddot.remove(ReddotEvent.CHECK_JIANGHUN, self.checkTabNotice, self);
	}
}