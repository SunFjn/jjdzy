class VSJXSRank extends fairygui.GComponent {

	public imgNo: fairygui.GImage;
	public labName: fairygui.GRichTextField;
	public labRank: fairygui.GRichTextField;
	public labPoint: fairygui.GRichTextField;
	public list: fairygui.GList;

	public static URL: string = "ui://iwvd88mqr3jee";

	public static createInstance(): VSJXSRank {
		return <VSJXSRank><any>(fairygui.UIPackage.createObject("ActCom_SJXS", "VSJXSRank"));
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
		grid.vo = this.showData[index];
	}

	private showData: IGridImpl[];
	public setVo(rank: number, cfg: Igodrank_288) {
		let self = this;
		let model = GGlobal.modelsjxs;
		let rankData = model.rankDic[rank];
		self.labRank.text = rank + "";
		self.showData = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.list.numItems = self.showData.length;
		if (rankData) {
			self.imgNo.visible = false;
			self.labName.text = rankData.name;
			self.labPoint.text = "抽奖：" + rankData.num + "次";
		} else {
			self.labName.text = "";
			self.labPoint.text = "";
			self.imgNo.visible = true;
		}
	}

	public clean() {
		let self = this;
		self.list.numItems = 0;
	}
}