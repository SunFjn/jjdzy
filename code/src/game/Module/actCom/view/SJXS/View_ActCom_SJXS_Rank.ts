class View_ActCom_SJXS_Rank extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public lb1: fairygui.GRichTextField;
	public lbMy: fairygui.GRichTextField;

	public static URL: string = "ui://iwvd88mqr3jec";
	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ActCom_SJXS", "View_ActCom_SJXS_Rank").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();
		super.childrenCreated();
	}

	private renderHandler(index: number, item: VSJXSRank) {
		let self = this;
		for (let i = 0; i < self.showData.length; i++) {
			let cfg = self.showData[i];
			let rankArr = JSON.parse(cfg.rank);
			if (rankArr[0][0] <= index + 1 && index + 1 <= rankArr[0][1]) {
				item.setVo(index + 1, cfg);
				break;
			}
		}
	}

	private showData: Igodrank_288[] = [];
	private updateShow() {
		let self = this;
		let model = GGlobal.modelsjxs;
		let cfg = self.showData[self.showData.length - 1];
		let len = JSON.parse(cfg.rank)[0][1];
		self.list.numItems = len;
		self.lb1.setVar("count", ConfigHelp.getSystemNum(7403) + "").flushVars();
		self.lbMy.text = "我的排名：" + model.myRank + "         抽奖：" + model.drawNum;
	}

	protected onShown(): void {
		let self = this;
		self.showData = self._args;
		self.registerEvent(true);
		GGlobal.modelsjxs.CG_GodGenThisLife_openRankUI_9553();
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		self.registerEvent(false);
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.control.register(pFlag, UIConst.SHENJIANG_XIANSHI_RANK, self.updateShow, self);
	}
}