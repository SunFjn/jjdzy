class ViewCommonTips extends UIModalPanel {

	public list: fairygui.GList;
	public n2: fairygui.GLabel;

	public static URL: string = "ui://jvxpx9emah3c3ap";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "View_WFSM_Panel").asCom;
		this.contentPane = this.view;

		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list.itemRenderer = this.renderHander;
		this.list.callbackThisObj = this;
		super.childrenCreated();
	}

	public onOpen(arg) {
		super.onOpen(arg)
		this.show(arg)
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.TIP_STRING);
		this.list.numItems = 0;
	}

	private _vo: any;
	public show(obj: any): void {
		var data: Object = {};
		data["id"] = 1;
		data["tips"] = obj;
		this._vo = data;
		this.list.numItems = 1;
		this.list.scrollToView(0);
	}

	private renderHander(index: number, obj: fairygui.GObject): void {
		var item: View_WFSM = obj as View_WFSM
		item.vo = this._vo.tips;
	}

}