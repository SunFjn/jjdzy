class ViewTrueNameReward extends UIModalPanel {

	public btnSure: fairygui.GButton;
	public lb: fairygui.GRichTextField;
	public list: fairygui.GList;

	public static URL: string = "ui://girq9ndumu0i5";

	public static createInstance(): ViewTrueNameReward {
		return <ViewTrueNameReward><any>(fairygui.UIPackage.createObject("trueName", "ViewTrueNameReward"));
	}

	public constructor() {
		super();
		this.loadRes("trueName", "trueName_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("trueName");
		this.view = fairygui.UIPackage.createObject("trueName", "ViewTrueNameReward").asCom;
		this.contentPane = this.view;

		this.btnSure = <fairygui.GButton><any>(this.view.getChild("btnSure"));
		this.lb = <fairygui.GRichTextField><any>(this.view.getChild("lb"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list.itemRenderer = this.renderItem;
		this.list.callbackThisObj = this;
		super.childrenCreated();
	}

	private _listData: IGridImpl[];
	protected onShown(): void {
		let s = this;
		s.btnSure.addClickListener(s.onSure, s);
		s._listData = ConfigHelp.makeItemListArr(JSON.parse(ConfigHelp.getSystemDesc(5901)))
		s.list.numItems = s._listData.length;
	}

	protected onHide(): void {
		let s = this;
		GGlobal.layerMgr.close(UIConst.TRUE_NAME_REWARD);
		s.btnSure.removeClickListener(s.onSure, s);
		GGlobal.modelTrueName.CGGET_REWARD();
		s.list.numItems = 0;
	}

	private onSure() {
		this.closeEventHandler(null)
	}

	private renderItem(index: number, obj: fairygui.GObject): void {
		var item: ViewGrid = obj as ViewGrid;
		item.vo = this._listData[index];
	}
}
