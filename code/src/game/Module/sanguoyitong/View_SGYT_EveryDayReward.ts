class View_SGYT_EveryDayReward extends UIModalPanel {

	public grid0: ViewGrid;
	public grid1: ViewGrid;
	public grid2: ViewGrid;
	public grid00: ViewGrid;
	public grid01: ViewGrid;
	public grid02: ViewGrid;
	public drawBt: fairygui.GButton;
	public drawBt1: fairygui.GButton;
	public gridArr: ViewGrid[];
	public gridArr1: ViewGrid[];
	public static URL: string = "ui://z4ijxlqkiv4og";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("sanGuoYiTong", "View_SGYT_EveryDayReward").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.gridArr = [self.grid0, self.grid1, self.grid2];
		self.gridArr1 = [self.grid00, self.grid01, self.grid02];
		super.childrenCreated();
		self.drawBt.addClickListener(self.drawHandler, self);
		self.drawBt1.addClickListener(self.drawHandler, self);
	}

	private drawHandler() {

	}

	protected onShown(): void {
		let self = this;
		let reward0 = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[6307].other));
		let reward1 = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[6308].other));
		for (let i = 0; i < self.gridArr.length; i++) {
			self.gridArr[i].isShowEff = true;
			self.gridArr[i].tipEnabled = true;
			self.gridArr[i].vo = reward0[i];
			self.gridArr1[i].isShowEff = true;
			self.gridArr1[i].tipEnabled = true;
			self.gridArr1[i].vo = reward1[i];
		}
	}

	protected onHide(): void {
		let self = this;
		GGlobal.layerMgr.close(UIConst.SANGUO_YITONG_ZLP);
		ConfigHelp.cleanGridEff(self.gridArr);
		ConfigHelp.cleanGridEff(self.gridArr1);
	}
}