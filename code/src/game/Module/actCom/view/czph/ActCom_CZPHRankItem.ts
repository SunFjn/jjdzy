class ActCom_CZPHRankItem extends fairygui.GComponent {

	public rankIcon: fairygui.GLoader;
	public rankLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	public moneyLb: fairygui.GRichTextField;
	public nameImg: fairygui.GImage;

	public static URL: string = "ui://q5asybs1k1rz8";

	public static createInstance(): ActCom_CZPHRankItem {
		return <ActCom_CZPHRankItem><any>(fairygui.UIPackage.createObject("ActComCZPH", "ActCom_CZPHRankItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public setData(arr: any[]) {
		let self = this;
		if (arr[0] <= 3) {
			self.rankIcon.visible = true;
			self.rankLb.visible = false;
			self.rankIcon.url = CommonManager.getUrl("common", "rank_" + arr[0]);
		} else {
			self.rankIcon.visible = false;
			self.rankLb.visible = true;
			self.rankLb.text = arr[0] + "";
		}
		if (!arr[1]) {
			self.nameLb.visible = false;
			self.nameImg.visible = true;
		} else {
			self.nameLb.visible = true;
			self.nameImg.visible = false;
			self.nameLb.text = arr[1];
		}
		self.moneyLb.text = arr[2] + "";
	}

	public clean() {

	}
}