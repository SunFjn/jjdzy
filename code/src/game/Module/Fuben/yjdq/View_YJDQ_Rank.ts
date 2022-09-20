class View_YJDQ_Rank extends UIModalPanel {

	public frame: fairygui.GComponent;
	public list: fairygui.GList;

	public static URL: string = "ui://pkuzcu87ejh47";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("FuBen", "View_YJDQ_Rank").asCom;
		this.contentPane = this.view;
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list.callbackThisObj = this.view;
		this.list.itemRenderer = this.renderHandle;
		super.childrenCreated();
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		let item: YJDQ_RankItem = obj as YJDQ_RankItem;
		item.show(Model_YJDQ.rankData[index]);
	}

	public updateShow(): void {
		this.list.numItems = Model_YJDQ.rankData.length;
	}

	protected onShown(): void {
		this.updateShow();
		GGlobal.modelyjdq.CG_YJDQ_OPENRANK();
		GGlobal.control.listen(Enum_MsgType.YJDQ_RANK_UPDATE, this.updateShow, this);
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.FUBEN_YJDQ_RANK);
		GGlobal.control.remove(Enum_MsgType.YJDQ_RANK_UPDATE, this.updateShow, this);
		this.list.numItems = 0;
	}
}