class SJXS_RankItem extends fairygui.GComponent {

	public rankLb: fairygui.GRichTextField;
	public list: fairygui.GList;

	public static URL: string = "ui://iwvd88mqr3je9";

	public static createInstance(): SJXS_RankItem {
		return <SJXS_RankItem><any>(fairygui.UIPackage.createObject("ActCom_SJXS", "SJXS_RankItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
	}

	private renderHandler(index: number, grid: ViewGrid) {
		grid.isShowEff = grid.tipEnabled = true;
		grid.vo = this.rewardList[index];
	}

	private rewardList: IGridImpl[]
	private vo: Igodrank_288;
	public setVo(cfg: Igodrank_288) {
		let self = this;
		self.vo = cfg;
		self.rewardList = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.list.numItems = self.rewardList.length;
		let rankArr = JSON.parse(cfg.rank);
		if (rankArr[0][0] == rankArr[0][1]) {
			self.rankLb.text = rankArr[0][0] + "";
		} else {
			self.rankLb.text = rankArr[0][0] + "-" + rankArr[0][1];
		}
	}

	public clean() {
		let self = this;
		self.list.numItems = 0;
	}
}