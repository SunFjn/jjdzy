class ActCom_CZPHItem extends fairygui.GComponent {

	public backImg: fairygui.GLoader;
	public rankLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	public list: fairygui.GList;
	public static URL: string = "ui://q5asybs1k1rz6";

	public static createInstance(): ActCom_CZPHItem {
		return <ActCom_CZPHItem><any>(fairygui.UIPackage.createObject("ActComCZPH", "ActCom_CZPHItem"));
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
		grid.isShowEff = true;
		grid.tipEnabled = true;
		grid.vo = this.rewardArr[index];
	}

	private rewardArr: IGridImpl[];
	public setVo(cfg: Iczph_755) {
		let self = this;
		let rankArr = JSON.parse(cfg.rank);
		self.nameLb.visible = false;
		if (rankArr[0][0] != rankArr[0][1]) {
			self.rankLb.text = ConfigHelp.reTxt("第{0}-{1}名", rankArr[0][0], rankArr[0][1]);
		} else {
			if (rankArr[0][0] == 2) {
				self.nameLb.visible = true;
				self.nameLb.text = GGlobal.modelczph.rankArr[1][1] + "";
			}
			self.rankLb.text = ConfigHelp.reTxt("第{0}名", rankArr[0][0]);
		}
		self.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.tips));
		self.list.numItems = self.rewardArr.length;
		IconUtil.setImg(self.backImg, Enum_Path.ACTCOM_URL + "720901.png");
	}

	public clean() {
		let self = this;
		self.list.numItems = 0;
		IconUtil.setImg(self.backImg, null);
	}
}