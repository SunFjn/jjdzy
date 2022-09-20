class ZSSFBattleReportItem extends fairygui.GComponent {

	public lb: fairygui.GRichTextField;
	public rewardLb: ViewResource2;

	public static URL: string = "ui://3o8q23uucenr1f";

	public static createInstance(): ZSSFBattleReportItem {
		return <ZSSFBattleReportItem><any>(fairygui.UIPackage.createObject("syzlb", "ZSSFBattleReportItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	/**U:玩家名字B:状态:1-战胜,2-战败I:城池id */
	public onShown(reportData: { name: string, state: number, cityID: number }) {
		let self = this;
		let cfg = Config.zssf_294[reportData.cityID];
		if (reportData.state == 2) {
			self.lb.text = HtmlUtil.fontNoSize(reportData.name, Color.getColorStr(2)) + "不自量力来掠夺你镇守的" + cfg.name + ",被你打退了";
			self.rewardLb.visible = false;
		} else {
			let costArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
			self.lb.text = HtmlUtil.fontNoSize(reportData.name, Color.getColorStr(2)) + "掠夺了你镇守的" + cfg.name + "领土,损失了";
			self.rewardLb.visible = true;
			self.rewardLb.setImgUrl(costArr[0].icon);
			self.rewardLb.setCount(costArr[0].count);
		}

	}

	public clean() {

	}
}