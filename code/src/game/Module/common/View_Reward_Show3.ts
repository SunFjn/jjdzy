class View_Reward_Show3 extends UIModalPanel {

	public list: fairygui.GList;
	public btnGet: Button1
	public imgHas: fairygui.GImage

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("common", "View_Reward_Show3").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
		super.childrenCreated();
	}

	private _listData: IGridImpl[];
	private _base = 0;
	private state = 0;
	private onDraw: Handler;
	protected onShown(): void {
		let self = this;
		self._listData = self._args.award || [];
		self._base = self._args.base;
		self.state = self._args.state;
		self.onDraw = self._args.onDraw;
		self.btnGet.addClickListener(self.onGet, this);
		self.update();
	}

	protected onHide(): void {
		let self = this;
		self.btnGet.removeClickListener(self.onGet, self);
		self.list.numItems = 0;
	}

	private update() {
		let self = this;
		self.list.numItems = self._listData.length
		self.upStatus();
	}

	private upStatus() {
		let self = this;
		if (self._base > 0) {
			self.imgHas.visible = false;
			self.btnGet.visible = true;
			self.btnGet.checkNotice = true;
		} else if (self._base <= 0 && self.state == 0) {
			self.imgHas.visible = false;
			self.btnGet.visible = true;
			self.btnGet.checkNotice = false;
		} else if (self._base <= 0 && self.state == -1) {//已领取
			self.imgHas.visible = true;
			self.btnGet.visible = false;
		} else {
			self.imgHas.visible = false;
			self.btnGet.visible = true;
			self.btnGet.checkNotice = false;
		}
	}

	private renderHandle(index: number, grid: ViewGrid): void {
		let self = this;
		grid.tipEnabled = true;
		grid.isShowEff = true;
		grid.vo = self._listData[index];
	}

	private onGet(): void {
		let self = this;
		if (self.btnGet.checkNotice == false) {
			ViewCommonWarn.text("领取条件不足")
			return;
		}
		if (self.onDraw) {
			self.onDraw.run();
		} else {
			self.doHideAnimation();
		}
	}

	public static show(rewardArr: IGridImpl[], drawNum?: number, state?: number, onDraw?: Handler) {
		if (GGlobal.layerMgr.isOpenView(UIConst.REWARD_SHOW3)) {
			let view = GGlobal.layerMgr.getView(UIConst.REWARD_SHOW3) as View_Reward_Show3;
			view._args = { award: rewardArr, base: drawNum, state: state, onDraw: onDraw };
			view.onShown();
		} else {
			GGlobal.layerMgr.open(UIConst.REWARD_SHOW3, { award: rewardArr, base: drawNum, state: state, onDraw: onDraw });
		}
	}
}