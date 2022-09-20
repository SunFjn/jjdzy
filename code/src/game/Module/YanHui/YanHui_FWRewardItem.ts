class YanHui_FWRewardItem extends fairygui.GComponent {

	public curGroup: fairygui.GGroup;
	public numLb: fairygui.GRichTextField;
	public rewardLb: fairygui.GRichTextField;
	public grid: ViewGrid;

	public static URL: string = "ui://4x7dk3lhgz25p";

	public static createInstance(): YanHui_FWRewardItem {
		return <YanHui_FWRewardItem><any>(fairygui.UIPackage.createObject("YanHui", "YanHui_FWRewardItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public vo: Ipartyfw_298;
	public setVo(vo: Ipartyfw_298, isSel: boolean) {
		let self = this;
		let model = GGlobal.modelYanHui;
		self.vo = vo;
		self.numLb.text = "氛围值达到" + HtmlUtil.fontNoSize(vo.fw + "", Color.getColorStr(model.fwNum >= vo.fw ? 2 : 6)) + "可升级奖励";
		let rewardVo = ConfigHelp.makeItemListArr(JSON.parse(vo.reward))[0];
		self.grid.isShowEff = self.grid.tipEnabled = true;
		self.grid.vo = rewardVo;
		self.rewardLb.text = vo.tips;
		self.curGroup.visible = isSel;
	}

	public clean() {
		let self = this;
		self.grid.clean();
	}
}