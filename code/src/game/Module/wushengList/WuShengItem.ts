class WuShengItem extends fairygui.GComponent {

	public nameLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public gridArr: WuShengListGrid[] = [];
	public rankLb: fairygui.GRichTextField;
	public lookBt: fairygui.GButton;
	public rankGroup: fairygui.GGroup;

	public static URL: string = "ui://a8l39nm98hxb9";

	public static createInstance(): WuShengItem {
		return <WuShengItem><any>(fairygui.UIPackage.createObject("wushengList", "WuShengItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.gridArr = [self["grid0"], self["grid1"], self["grid2"], self["grid3"]];
		self.lookBt.addClickListener(self.onLook, self);
	}

	private onLook() {
		GGlobal.layerMgr.open(UIConst.WUSHENGLIST_RANK, this.tabID);
	}

	private tabID = 0;
	//玩家idU:玩家姓名L:玩家战力B:排名
	public show(arr, index, rank) {
		let self = this;
		let cfg = Config.ws_238[index];
		self.tabID = index;
		if (rank <= 3) {
			self.nameLb.visible = self.powerLb.visible = true;
			self.rankLb.visible = false;
			let conditionLbArr = JSON.parse(cfg.tips);
			let conditionArr = JSON.parse(cfg.yq);
			if (arr) {
				self.nameLb.text = arr[1] + "";
				self.powerLb.text = cfg.name + ":" + arr[2];
			} else {
				self.nameLb.text = "虚位以待";
				self.powerLb.text = "大奖条件:" + HtmlUtil.fontNoSize(conditionLbArr[0][0], Color.getColorStr(2));
			}
			self.nameLb.color = Color.getColorInt(6 - rank);
			let rewardArr = JSON.parse(cfg["reward" + rank]);
			for (let i = 0; i < self.gridArr.length; i++) {
				let grid = self.gridArr[i]
				if (i < rewardArr.length) {
					grid.setVo(rewardArr[rewardArr.length - i - 1], arr && arr[2] >= conditionArr[0][1]);
					grid.visible = true;
				} else {
					grid.clean();
					grid.visible = false;
				}
			}

		} else {
			self.nameLb.visible = self.powerLb.visible = false;
			self.rankGroup.visible = true;
			self.lookBt.visible = rank != 6;
			self.rankLb.text = rank == 6 ? "11-100名" : "4-10名";
			let rewardArr = JSON.parse(cfg["reward" + rank]);
			for (let i = 0; i < self.gridArr.length; i++) {
				let grid = self.gridArr[i]
				if (i < rewardArr.length) {
					grid.setVo(rewardArr[i]);
					grid.visible = true;
				} else {
					grid.clean();
					grid.visible = false;
				}
			}
		}
	}

	public clean() {
		super.clean();
		let s = this;
		for (let i = 0; i < s.gridArr.length; i++) {
			s.gridArr[i].clean();
		}
	}
}