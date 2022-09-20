class WuShengListGrid extends fairygui.GComponent {

	public grid: ViewGrid;
	public rewardBt0: fairygui.GButton;
	public rewardImg0: fairygui.GImage;
	public rewardGroup0: fairygui.GGroup;
	public static URL: string = "ui://a8l39nm9tv5mt";

	public static createInstance(): WuShengListGrid {
		return <WuShengListGrid><any>(fairygui.UIPackage.createObject("wushengList", "WuShengListGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	private eff: Part;
	public setVo(rewardArr, isGrade: boolean = false) {
		let self = this;
		let gridVo = ConfigHelp.makeItem(rewardArr);
		if (rewardArr[3] == 1) {
			self.grid.isShowEff = false;
			self.rewardGroup0.visible = true;
			self.grid.grayed = !isGrade;
			if (!self.eff) self.eff = EffectMgr.addEff("uieff/" + 10022, self.rewardBt0.displayListContainer, self.rewardBt0.width / 2, self.rewardBt0.height / 2, 800, -1);
		} else {
			self.grid.isShowEff = true;
			self.rewardGroup0.visible = false;
			self.grid.grayed = false;
			if (self.eff) {
				EffectMgr.instance.removeEff(self.eff);
				self.eff = null;
			}
		}
		self.grid.vo = gridVo;
		self.grid.tipEnabled = true;
	}

	public clean() {
		let self = this;
		self.grid.showEff(false);
		self.grid.vo = null;
		self.grid.tipEnabled = false;
		if (self.eff) {
			EffectMgr.instance.removeEff(self.eff);
			self.eff = null;
		}
	}
}