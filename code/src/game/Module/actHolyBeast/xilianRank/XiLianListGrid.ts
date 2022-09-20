/** 
 * 洗练大奖item
*/
class XiLianListGrid extends fairygui.GComponent{
	public grid: ViewGrid;
	public rewardBt0: fairygui.GButton;
	public rewardImg0: fairygui.GImage;
	public rewardGroup0: fairygui.GGroup;
	public static URL: string = "ui://d5y9ngt6cl031m";

	public static createInstance(): XiLianListGrid {
		return <XiLianListGrid><any>(fairygui.UIPackage.createObject("actHolyBeast", "XiLianListGrid"));
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
		if (!self.eff) self.eff = EffectMgr.addEff("uieff/" + 10022, self.rewardBt0.displayListContainer, self.rewardBt0.width / 2, self.rewardBt0.height / 2, 800, -1);
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