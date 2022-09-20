class View_Reward_Show1 extends UIModalPanel {

	public list: fairygui.GList;
	public surebt: fairygui.GButton;

	public static URL: string = "ui://3me6ra11s37b6";

	public constructor() {
		super();
		this.loadRes("bossTiShi", "bossTiShi_atlas0");
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("bossTiShi");
		self.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show1").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();
		self.isShowOpenAnimation = false;
		super.childrenCreated();
	}

	public onShown() {
		let self = this;
		if(!self._args)return;
		self.rewardArr = self._args;
		self.list.numItems = self.rewardArr.length;
		self.times = 11;
		Timer.instance.listen(self.timeHandler, self, 1000);
		self.surebt.addClickListener(self.OnSure, self);
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		Timer.instance.remove(self.timeHandler, self);
		GGlobal.layerMgr.close(UIConst.REWARD_SHOW1);
	}

	private OnSure() {
		this.doHideAnimation();
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as ViewGridRender;
		grid.vo = this.rewardArr[index];
	}

	private rewardArr = [];
	private times = 10;
	private timeHandler() {
		let self = this;
		self.times--;
		self.surebt.text = "确定(" + self.times + ")";
		if (self.times <= 0) {
			self.doHideAnimation();
		}
	}
}