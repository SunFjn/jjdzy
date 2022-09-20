class View_ZSSF_battleReport extends UIModalPanel {
	public frame: fairygui.GLabel;
	public list: fairygui.GList;

	public static URL: string = "ui://3o8q23uucenr1e";

	public static createInstance(): View_ZSSF_battleReport {
		return <View_ZSSF_battleReport><any>(fairygui.UIPackage.createObject("syzlb", "View_ZSSF_battleReport"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("syzlb", "View_ZSSF_battleReport").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		super.childrenCreated();
	}

	private renderHandler(index: number, item: ZSSFBattleReportItem) {
		item.onShown(GGlobal.modelzssf.battleReportArr[index]);
	}

	private updateShow() {
		let self = this;
		self.list.numItems = GGlobal.modelzssf.battleReportArr.length;
	}

	protected onShown(): void {
		let self = this;
		GGlobal.control.listen(UIConst.ZSSF_BATTLEREPORT, self.updateShow, self);
		GGlobal.modelzssf.CG_GuardArea_openReportUI_10915();
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		GGlobal.control.remove(UIConst.ZSSF_BATTLEREPORT, self.updateShow, self);
	}
}