class SGYT_CountryRankRewardItem extends fairygui.GComponent {

	public rankLb: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;
	public numLb: fairygui.GRichTextField;
	public countryImg: fairygui.GLoader;
	public grid0: ViewGrid;
	public grid1: ViewGrid;
	public grid2: ViewGrid;
	public grid3: ViewGrid;
	public dataGroup: fairygui.GGroup;
	private gridArr: ViewGrid[];

	public static URL: string = "ui://z4ijxlqkiv4ok";

	public static createInstance(): SGYT_CountryRankRewardItem {
		return <SGYT_CountryRankRewardItem><any>(fairygui.UIPackage.createObject("sanGuoYiTong", "SGYT_CountryRankRewardItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.gridArr = [self.grid0, self.grid1, self.grid2, self.grid3];
	}

	public setVo(cfg: Isgytgjpm_310) {
		let self = this;
		self.rankLb.setVar("rank", cfg.rank + "").flushVars();
		let arr = JSON.parse(cfg.reward1).concat(JSON.parse(cfg.reward2)).concat(JSON.parse(cfg.reward3));
		let rewardArr = ConfigHelp.makeItemListArr(arr);
		for (let i = 0; i < self.gridArr.length; i++) {
			self.gridArr[i].vo = rewardArr[i];
		}
		self.dataGroup.visible = true;
		self.promptLb.visible = false;
	}
}