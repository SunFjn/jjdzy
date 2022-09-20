class View_YuanXiao_battleReport extends UIModalPanel {
	public frame: fairygui.GLabel;
	public list: fairygui.GList;

	public static URL: string = "ui://ajaichn8qc9hr";

	public static createInstance(): View_ZSSF_battleReport {
		return <View_ZSSF_battleReport><any>(fairygui.UIPackage.createObject("ActCom_YuanXiao", "View_YuanXiao_battleReport"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ActCom_YuanXiao", "View_YuanXiao_battleReport").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		super.childrenCreated();
	}

	private renderHandler(index: number, item: YuanXiaoBattleReportItem) {
		item.onShown(GGlobal.modelyuanxiao.battleReportArr[index]);
	}

	private updateShow() {
		let self = this;
		self.list.numItems = GGlobal.modelyuanxiao.battleReportArr.length;
	}

	protected onShown(): void {
		let self = this;
		GGlobal.control.listen(UIConst.ACTCOM_YUANXIAO_REPORT, self.updateShow, self);
		GGlobal.modelzssf.CG_GuardArea_openReportUI_10915();
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		GGlobal.control.remove(UIConst.ACTCOM_YUANXIAO_REPORT, self.updateShow, self);
	}
}