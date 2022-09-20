/**
 * 少主护送战报界面
 */
class ShaoZhuEscReportView extends UIModalPanel{
	public list: fairygui.GList;

	public static URL: string = "ui://lnw94ki2lnitm";

	public static createInstance(): ShaoZhuEscReportView {
		return <ShaoZhuEscReportView><any>(fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscReportView"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(EscortRewardItem.URL, EscortRewardItem);
		fairygui.UIObjectFactory.setPackageItemExtension(ShaoZhuEscReportInter.URL, ShaoZhuEscReportInter);
		fairygui.UIObjectFactory.setPackageItemExtension(ShaoZhuEscReportItem.URL, ShaoZhuEscReportItem);
		this.loadRes();
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("ShaoZhuEscort");
		self.view = fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscReportView").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
		self.list.setVirtual();
		super.childrenCreated();
	}

	private _listData = [];
	private itemRender(idx, obj) {
		let item: ShaoZhuEscReportItem = obj as ShaoZhuEscReportItem;
		item.setdata(Model_ShaoZhuEscort.dt[idx], idx);
	}

	protected onShown(): void {
		let self = this;
		self.addListen();
		GGlobal.modelShaoZhuEscort.CG_OPEN_BATTLERECORD_UI();
	}

	protected onHide(): void {
		this.removeListen();
		GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT_REWARD);
		this.list.numItems = 0;
	}

	private addListen(): void {
		let self = this;
		GGlobal.control.listen(UIConst.SHAOZHU_ESCORT_REPORT, self.listUpdate, self);
	}

	private removeListen(): void {
		let self = this;
		GGlobal.control.remove(UIConst.SHAOZHU_ESCORT_REPORT, self.listUpdate, self);
		GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT_REPORT);
	}

	private listUpdate() {
		let self = this;
		self.list.numItems = Model_ShaoZhuEscort.dt.length;
	}

}