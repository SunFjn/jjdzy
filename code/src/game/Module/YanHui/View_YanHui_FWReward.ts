class View_YanHui_FWReward extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;

	public static URL: string = "ui://4x7dk3lhgz25o";

	public static createInstance(): View_YanHui_FWReward {
		return <View_YanHui_FWReward><any>(fairygui.UIPackage.createObject("YanHui", "View_YanHui_FWReward"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_FWReward").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		super.childrenCreated();
	}

	private renderHandler(index: number, item: YanHui_FWRewardItem) {
		let self = this;
		item.setVo(self.listArr[index], self.selectIndex == index);
	}

	private selectIndex = 0;
	private listArr: Ipartyfw_298[];
	protected onShown(): void {
		let self = this;
		self.listArr = self._args;
		self.selectIndex = -1;
		for (let i = self.listArr.length - 1; i >= 0; i--) {
			if (GGlobal.modelYanHui.fwNum >= self.listArr[i].fw) {
				self.selectIndex = i;
				break;
			}
		}
		self.list.numItems = self.listArr.length;
		self.list.scrollToView(self.selectIndex, false, true);
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
	}
}