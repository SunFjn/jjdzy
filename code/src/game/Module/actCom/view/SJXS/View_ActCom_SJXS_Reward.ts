class View_ActCom_SJXS_Reward extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;

	public static URL: string = "ui://iwvd88mqr3jea";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ActCom_SJXS", "View_ActCom_SJXS_Reward").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();
		super.childrenCreated();
	}

	private renderHandler(index: number, item: ActCom_SJXS_RewardItem) {
		let self = this;
		item.setVo(self.showData[index].id, self.showData[index].state)
	}

	private showData: { id: number, state: number }[];
	public updateShow() {
		let self = this;
		self.showData = GGlobal.modelsjxs.targertData;
		self.list.numItems = self.showData.length;
	}

	protected onShown(): void {
		let self = this;
		self.registerEvent(true);
		self.updateShow();
	}

	protected onHide(): void {
		let self = this;
		self.registerEvent(false);
		self.list.numItems = 0;
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.control.register(pFlag, UIConst.SHENJIANG_XIANSHI, self.updateShow, self);
	}
}