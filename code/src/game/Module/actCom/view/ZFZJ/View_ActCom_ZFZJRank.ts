class View_ActCom_ZFZJRank extends UIModalPanel {

	public frame: fairygui.GLabel;
	public myRank: fairygui.GRichTextField;
	public myNum: fairygui.GRichTextField;
	public list: fairygui.GList;

	public static URL: string = "ui://4h4iwgjrr3jel";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ActCom_ZFZJ", "View_ActCom_ZFZJRank").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();
		super.childrenCreated();
	}

	private renderHandler(index: number, item: ActCom_ZFZJ_RankItem) {
		let self = this;
		let model = GGlobal.modelzfzj;
		for (let i = 0; i < self.showData.length; i++) {
			let cfg = self.showData[i];
			let rankArr = JSON.parse(cfg.rank);
			if (rankArr[0][0] <= index + 1 && index + 1 <= rankArr[0][1]) {
				if (model.wineRankData[index + 1]) {
					item.setVo(index + 1, model.wineRankData[index + 1], cfg);
				} else {
					item.setVo(index + 1, null, cfg);
				}
				break;
			}
		}
	}

	private updateShow() {
		let self = this;
		let model = GGlobal.modelzfzj;
		let len = JSON.parse(self.showData[self.showData.length - 1].rank)[0][1];
		self.list.numItems = len;
		self.myRank.text = "我的排名：" + model.myRank;
		self.myNum.text = "我的敬酒：" + model.myWine;
	}

	private showData: Ihfkhzfzjrank_286[] = [];
	protected onShown(): void {
		let self = this;
		if (self.showData.length <= 0) {
			for (let key in Config.hfkhzfzjrank_286) {
				self.showData.push(Config.hfkhzfzjrank_286[key]);
			}
			self.showData.sort(function (a, b) {
				return a.id - b.id;
			});
		}
		self.registerEvent(true);
		GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_openRank_9663();
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		self.registerEvent(false);
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.control.register(pFlag, UIConst.HFKH_ZFZJ_RANK, self.updateShow, self);
	}
}