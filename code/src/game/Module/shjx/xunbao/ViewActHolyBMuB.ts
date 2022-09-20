class ViewActHolyBMuB extends UIModalPanel {

	public list:fairygui.GList;

	public static URL:string = "ui://d5y9ngt6phvv8";

	public static createInstance():ViewActHolyBMuB {
		return <ViewActHolyBMuB><any>(fairygui.UIPackage.createObject("shouhunJX","ViewActHolyBMuB"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("shouhunJX");
		this.view = fairygui.UIPackage.createObject("shouhunJX", "ViewActHolyBMuB").asCom;
		this.contentPane = this.view;

		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();

		super.childrenCreated();
	}

	protected onShown(): void {
		this.addListen();
		this.update();
	}

	protected onHide(): void {
		this.removeListen();
		this.list.numItems = 0;
	}

	private addListen(): void {
		GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_XUNBAO_MUBIAO, this.update, this)
	}

	private removeListen(): void {
		GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_XUNBAO_MUBIAO, this.update, this)
		GGlobal.layerMgr.close(UIConst.ACT_HOLYB_XBMUBIAO);
	}

	private _listData;
	private update() {
		this._listData = Model_HuoDong.getListData(GGlobal.modelSHXunbao.xbMuBiaoArr)
		this.list.numItems = this._listData.length;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: VActHolyBMuB = obj as VActHolyBMuB
		v.setVo(this._listData[index], index);
	}
}