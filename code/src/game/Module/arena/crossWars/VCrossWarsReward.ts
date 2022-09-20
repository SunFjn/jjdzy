class VCrossWarsReward extends fairygui.GComponent {

	public lbRank: fairygui.GTextField;
	public list: fairygui.GList;

	public static URL: string = "ui://me1skowlhfct4a";

	public static createInstance(): VCrossWarsReward {
		return <VCrossWarsReward><any>(fairygui.UIPackage.createObject("crossKing", "VCrossWarsReward"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.list.itemRenderer = self.renderListItem;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
	}

	private _vo;
	public set vo(v) {
		let self = this;
		self._vo = v;
		var rank = v.id % 10;
		if (rank == 1) {
			self.lbRank.text = "冠军"
		} else if (rank == 2) {
			self.lbRank.text = "亚军"
		} else if (rank == 3) {
			self.lbRank.text = "4强"
		} else if (rank == 4) {
			self.lbRank.text = "8强"
		} else if (rank == 5) {
			self.lbRank.text = "16强"
		}
		if (v.rewardList == null) {
			v.rewardList = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.reward))
		}
		self.list.numItems = v.rewardList.length;
	}

	private renderListItem(index: number, obj: fairygui.GObject): void {
		let self = this;
		var item: ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = self._vo.rewardList[index];
	}

	public clean(): void {
		super.clean();
		this.list.numItems = 0;
	}

}