class Child_KingShip_RewardItem extends fairygui.GComponent {

	public backImg: fairygui.GLoader;
	public titleIcon: fairygui.GLoader;
	public grid0: ViewGrid;
	public grid1: ViewGrid;
	public grid2: ViewGrid;
	public gridArr: ViewGrid[];
	public imgSel: fairygui.GImage;

	public static URL: string = "ui://uwzc58njjd2n2t";

	public static createInstance(): Child_KingShip_RewardItem {
		return <Child_KingShip_RewardItem><any>(fairygui.UIPackage.createObject("country", "Child_KingShip_RewardItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.gridArr = [self.grid0, self.grid1, self.grid2];
	}

	private vo: Ixwwzdjl_311;
	public setData(value) {
		let self = this;
		let id = Model_player.voMine.country * 1000 + value;
		let cfg = Config.xwwzdjl_311[id];
		self.vo = cfg;
		let titleArr = JSON.parse(Config.xtcs_004[1067].other);
		if (titleArr[Model_player.voMine.country - 1].length >= value) {
			var cfgCH = Config.chenghao_702[titleArr[Model_player.voMine.country - 1][value - 1]]
			ImageLoader.instance.loader(Enum_Path.TITLE_URL + cfgCH.picture + ".png", self.titleIcon);
		} else {
			self.titleIcon.url = value == 5 ? "ui://uwzc58njapr12w" : "ui://uwzc58njqnae1e";
		}
	}

	public updateShow(value) {
		let self = this;
		let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(self.vo.reward));
		for (let i = 0; i < self.gridArr.length; i++) {
			if (i < rewardArr.length) {
				self.gridArr[i].vo = rewardArr[i];
				self.gridArr[i].tipEnabled = self.gridArr[i].visible = true;
				self.gridArr[i].showEff(true)
			} else {
				self.gridArr[i].visible = false;
			}
		}
		// self.backImg.url = value ? "ui://uwzc58njmr752v" : "ui://jvxpx9emoo0o3ct";
		self.imgSel.visible = value;
	}

	public clean() {
		ConfigHelp.cleanGridEff(this.gridArr);
	}
}