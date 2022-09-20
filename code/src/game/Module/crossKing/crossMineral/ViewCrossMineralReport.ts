/**
 * 跨服矿藏-战报界面
 */
class ViewCrossMineralReport extends UIModalPanel {
	public static URL: string = "ui://yqpfulefnyv75b";
	public n2: fairygui.GList;
	public static createInstance(): ViewCrossMineralReport {
		return <ViewCrossMineralReport><any>(fairygui.UIPackage.createObject("crossKing", "ViewCrossMineralReport"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(VCrossMineralReport.URL, VCrossMineralReport);
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("crossKing");
		this.view = fairygui.UIPackage.createObject("crossKing", "ViewCrossMineralReport").asCom
		this.contentPane = this.view;
		this.n2 = <fairygui.GList><any>(this.view.getChild("n2"));
		this.n2.callbackThisObj = this;
		this.n2.itemRenderer = this.itemRender;
		this.n2.setVirtual();
		super.childrenCreated();
	}


	private _listData = [];
	private itemRender(idx, obj) {
		let item: VCrossMineralReport = obj as VCrossMineralReport;
		item.setdata(this._listData[idx], idx);
	}

	protected onShown(): void {
		GGlobal.modelCrossMineral.CG_OPEN_REPORT();
		this.addListen();
	}

	protected onHide(): void {
		this.removeListen();
	}

	private listUpdate(data) {
		this._listData = data;
		this.n2.numItems = data.length;
	}

	private addListen(): void {
		GGlobal.control.listen(UIConst.CROSS_MINERAL_REPORT, this.listUpdate, this);
	}

	private removeListen(): void {
		GGlobal.control.remove(UIConst.CROSS_MINERAL_REPORT, this.listUpdate, this);
		GGlobal.layerMgr.close(UIConst.CROSS_MINERAL_REPORT);
		this.n2.numItems = 0;
	}
}