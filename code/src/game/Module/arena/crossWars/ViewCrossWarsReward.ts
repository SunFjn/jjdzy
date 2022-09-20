class ViewCrossWarsReward extends UIModalPanel {

	public lbTitle: fairygui.GTextField;
	public lbRank: fairygui.GTextField;
	public lbReward: fairygui.GTextField;
	public list: fairygui.GList;
	public lbTips: fairygui.GTextField;

	public static URL: string = "ui://yqpfulef6wztk";

	public static createInstance(): ViewCrossWarsReward {
		return <ViewCrossWarsReward><any>(fairygui.UIPackage.createObject("Arena", "ViewCrossWarsReward"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Arena");
		let self = this;
		self.view = fairygui.UIPackage.createObject("Arena", "ViewCrossWarsReward").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();

		self.list.itemRenderer = self.renderListItem;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
	}
	public resetPosition(): void {
		let self = this;
		self.setXY((fairygui.GRoot.inst.width - self.width) >> 1, (fairygui.GRoot.inst.height - self.height) >> 1);
	}
	protected onShown(): void {
		let self = this;
		self.addListen();
		self.update();
	}

	protected onHide(): void {
		this.removeListen();
		this.list.numItems = 0;
	}

	private addListen(): void {
		let self = this;
		GGlobal.control.listen(Enum_MsgType.CROSSKING_RANK_ARR, self.update, self)
	}

	private removeListen(): void {
		let self = this;
		GGlobal.control.remove(Enum_MsgType.CROSSKING_RANK_ARR, self.update, self)
		GGlobal.layerMgr.close(UIConst.CROSS_WARS_REWARD);
	}

	private _listData;
	private update(): void {
		let self = this;
		if (Model_CrossKing.zsLevel > 0) {
			self._listData = Model_CrossWars.getRewardArr(Model_CrossKing.zsLevel)
		} else {
			self._listData = Model_CrossWars.getRewardArr(1)
		}
		self.list.numItems = self._listData.length;
	}

	private renderListItem(index: number, obj: fairygui.GObject): void {
		let self = this;
		var item: VCrossWarsReward = obj as VCrossWarsReward;
		item.vo = self._listData[index];
	}
}