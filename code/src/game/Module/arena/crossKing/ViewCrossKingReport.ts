class ViewCrossKingReport extends UIModalPanel {

	public c1: fairygui.Controller;
	public lbTitle: fairygui.GTextField;
	public list: fairygui.GList;

	public static URL: string = "ui://yqpfulefj9wf7";

	public static createInstance(): ViewCrossKingReport {
		return <ViewCrossKingReport><any>(fairygui.UIPackage.createObject("Arena", "ViewCrossKingReport"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Arena");
		this.view = fairygui.UIPackage.createObject("Arena", "ViewCrossKingReport").asCom;
		this.contentPane = this.view;

		this.c1 = this.getController("c1");
		this.lbTitle = <fairygui.GTextField><any>(this.view.getChild("lbTitle"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		super.childrenCreated();

		this.list.itemRenderer = this.renderListItem;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
	}
	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}
	protected onShown(): void {
		this.addListen();
		this.update();
		GGlobal.modelCrossKing.CG_OPEN_HIS();
	}

	protected onHide(): void {
		this.removeListen();
	}

	private addListen(): void {
		GGlobal.control.listen(Enum_MsgType.CROSSKING_REPORT_ARR, this.update, this)
	}

	private removeListen(): void {
		GGlobal.control.remove(Enum_MsgType.CROSSKING_REPORT_ARR, this.update, this)
		GGlobal.layerMgr.close(UIConst.CROSS_KING_REPORT);
		this.list.numItems = 0;
	}

	private update(): void {
		this.list.numItems = Model_CrossKing.reportArr.length
	}

	private renderListItem(index: number, obj: fairygui.GObject): void {
		var item: VCrossKingReport = obj as VCrossKingReport;
		item.vo = Model_CrossKing.reportArr[index];
	}
}