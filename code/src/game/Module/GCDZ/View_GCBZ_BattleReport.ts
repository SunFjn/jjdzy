class View_GCBZ_BattleReport extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;

	public static URL: string = "ui://vgiijkm8r5gep";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("GCBZ", "View_GCBZ_BattleReport").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();
		super.childrenCreated();
	}

	private renderHandler(index: number, item: GCBZ_BattleReportItem) {
		item.setVo(this.battleReportData[index]);
	}

	private battleReportData: { name: string, state: number, cityID: number }[] = [];
	private updateShow() {
		let self = this;
		self.battleReportData = GGlobal.modelgcbz.battleReportData
		self.list.numItems = self.battleReportData.length;
	}

	protected onShown(): void {
		let self = this;
		self.updateShow();
		GGlobal.control.listen(UIConst.GCBZ_BATTLEREPORT, self.updateShow, self);
		GGlobal.modelgcbz.CG_AttackCity_openReportUI_12069();
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		GGlobal.control.remove(UIConst.GCBZ_BATTLEREPORT, self.updateShow, self);
	}
}