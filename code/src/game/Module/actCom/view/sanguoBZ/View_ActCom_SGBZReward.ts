class View_ActCom_SGBZReward extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;

	public static URL: string = "ui://y9683xrpj158d";
	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ActComSGBZ", "View_ActCom_SGBZReward").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		super.childrenCreated();
	}

	private renderHandler(index: number, grid: SGBZRewardGrid) {
		let self = this;
		let rewardArr: IGridImpl[] = self._args;
		grid.setVo(self.rewardArr[index]);
		if (index < rewardArr.length) {
			grid.isShowImg(false);
		} else {
			grid.isShowImg(true);
		}
	}

	private rewardArr: IGridImpl[] = [];
	protected onShown(): void {
		let self = this;
		let model = GGlobal.modelsgbz;
		let arr = [];
		self.rewardArr = [];
		for (let key in model.rewardData) {
			arr.push(model.rewardData[key]);
		}
		self.rewardArr = self._args.concat(arr);
		self.list.numItems = self.rewardArr.length;
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
	}
}