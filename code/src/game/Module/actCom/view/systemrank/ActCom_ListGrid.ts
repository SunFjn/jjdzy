class ActCom_ListGrid extends fairygui.GComponent {
	public grid: ViewGrid;
	public rewardBt0: fairygui.GButton;
	public rewardImg0: fairygui.GImage;
	public rewardGroup0: fairygui.GGroup;

	public static URL: string = "ui://qz5r0meldsdy1";
	public static createInstance(): ActCom_ListGrid {
		return <ActCom_ListGrid><any>(fairygui.UIPackage.createObject("ActCom_SystemRank", "ActCom_ListGrid"));
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
		self.rewardGroup0.visible = true;
		let gridVo = ConfigHelp.makeItem(rewardArr);
		self.grid.isShowEff = false;
		self.grid.grayed = !isGrade;
		if (!self.eff) self.eff = EffectMgr.addEff("uieff/10022", self.rewardBt0.displayListContainer, self.rewardBt0.width / 2, self.rewardBt0.height / 2, 800, -1);
		self.grid.vo = gridVo;
		self.grid.tipEnabled = true;
	}

	public clean() {
		let self = this;
		self.grid.clean();
		if (self.eff) {
			EffectMgr.instance.removeEff(self.eff);
			self.eff = null;
		}
	}
}