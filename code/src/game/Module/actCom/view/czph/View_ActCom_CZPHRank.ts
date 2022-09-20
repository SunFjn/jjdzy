class View_ActCom_CZPHRank extends UIModalPanel {

	public list: fairygui.GList;
	public rankLb: fairygui.GRichTextField;
	public moneyLb: fairygui.GRichTextField;

	public static URL: string = "ui://q5asybs1k1rz7";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ActComCZPH", "View_ActCom_CZPHRank").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();
		super.childrenCreated();
	}

	private renderHandler(index: number, item: ActCom_CZPHRankItem) {
		item.setData(GGlobal.modelczph.rankArr[index]);
	}

	public updateShow() {
		let self = this;
		let model = GGlobal.modelczph;
		self.list.numItems = model.rankArr.length;
		if (model.myRank > model.rankArr.length || model.myRank == 0) {
			self.rankLb.setVar("rank", "未上榜").flushVars();
		} else {
			self.rankLb.setVar("rank", model.myRank + "").flushVars();
		}
		self.moneyLb.setVar("money", model.myMoney + "元宝").flushVars();
	}

	protected onShown(): void {
		this.updateShow();
	}

	protected onHide(): void {
		this.list.numItems = 0;
	}
}