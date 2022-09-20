class YuanXiaoBattleReportItem extends fairygui.GComponent {

	public lb: fairygui.GRichTextField;
	public rewardLb: ViewResource2;

	public static URL: string = "ui://ajaichn8qc9hs";

	public static createInstance(): YuanXiaoBattleReportItem {
		return <YuanXiaoBattleReportItem><any>(fairygui.UIPackage.createObject("ActCom_YuanXiao", "YuanXiaoBattleReportItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	/**U:玩家名字B:状态:1-战胜,2-战败I:货币id */
	public onShown(reportData: { name: string, state: number, itemID: number, count: number }) {
		let self = this;
		let vo = Vo_Currency.create(reportData.itemID);
		if (reportData.state == 2) {
			self.lb.text = HtmlUtil.fontNoSize(reportData.name, Color.getColorStr(2)) + "不自量力来掠夺你的" + vo.name + ",被你一顿教育";
			self.rewardLb.visible = false;
		} else {
			self.lb.text = HtmlUtil.fontNoSize(reportData.name, Color.getColorStr(2)) + "掠夺了你的材料,损失了";
			self.rewardLb.visible = true;
			self.rewardLb.setImgUrl(vo.icon);
			self.rewardLb.setCount(reportData.count);
		}
	}

	public clean() {

	}
}