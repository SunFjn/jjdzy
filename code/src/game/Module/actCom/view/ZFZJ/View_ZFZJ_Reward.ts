class View_ZFZJ_Reward extends UIModalPanel {
	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public static URL: string = "ui://4h4iwgjrr3jej";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ActCom_ZFZJ", "View_ZFZJ_Reward").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		super.childrenCreated();
	}

	private renderHandler(index: number, item: ActCom_ZFZJ_RewardItem) {
		let self = this;
		item.setVo(self.showData[index]);
	}

	private updateShow() {
		let self = this;
		self.list.numItems = self.showData.length;
	}

	private showData: Ihfkhzfzj_286[] = []
	protected onShown(): void {
		let self = this;
		if (self.showData.length <= 0) {
			for (let key in Config.hfkhzfzj_286) {
				self.showData.push(Config.hfkhzfzj_286[key]);
			}
			self.showData.sort(function (a, b) {
				return a.id - b.id;
			});
		}
		self.registerEvent(true);
		self.updateShow();
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		self.registerEvent(false);
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.control.register(pFlag, UIConst.HFKH_ZFZJ, self.updateShow, self);
	}
}