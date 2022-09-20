class ViewCaoCaoBox extends UIModalPanel {

	public static URL: string = "ui://n6fub9ddeq415";
	public constructor() {
		super();
		this.loadRes();
	}

	public lbCondition: fairygui.GRichTextField;
	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("CaoCaoLaiXi", "ViewCaoCaoBox").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	protected grids: ViewGridRender[] = [];
	protected showAward(awards) {
		let self = this;
		ConfigHelp.cleanGridview(self.grids);
		self.grids = ConfigHelp.addGridview(awards, self, 132, 140, true, false, 3, 120);
		ConfigHelp.centerGrid(self.grids, 60, 140, 4, 120);
	}

	protected onShown() {
		let self = this;
		var id = self._args.rank;
		self.lbCondition.text = " 排名达到第" + id + "名可领取";
		var vos = ConfigHelp.makeItemListArr(self._args.data);
		self.showAward(vos);
	}

	protected onHide() {
		let self = this;
		ConfigHelp.cleanGridview(self.grids);
		GGlobal.layerMgr.close(UIConst.CAOCAO_LAIXI_BOX);
	}
}