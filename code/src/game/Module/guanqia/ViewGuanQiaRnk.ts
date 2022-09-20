/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewGuanQiaRnk extends UIModalPanel {

	public frame: fairygui.GComponent;
	public list: fairygui.GList;
	public lbMine: fairygui.GRichTextField;
	public lbMineRank: fairygui.GRichTextField;
	public lbMineGuanQ: fairygui.GRichTextField;

	public static URL: string = "ui://r92dp953u94lo";

	public static createInstance(): ViewGuanQiaRnk {
		return <ViewGuanQiaRnk><any>(fairygui.UIPackage.createObject("guanqia", "ViewGuanQiaRnk"));
	}

	public constructor() {
		super();
		this.loadRes("guanqia", "guanqia_atlas0");
		fairygui.UIObjectFactory.setPackageItemExtension(GuanQiaRnk.URL, GuanQiaRnk);
	}

	protected childrenCreated(): void {
		GGlobal.createPack("guanqia");
		this.view = fairygui.UIPackage.createObject("guanqia", "ViewGuanQiaRnk").asCom;
		this.contentPane = this.view;

		this.lbMine = <fairygui.GRichTextField><any>(this.view.getChild("lbMine"));
		this.lbMineRank = <fairygui.GRichTextField><any>(this.view.getChild("lbMineRank"));
		this.lbMineGuanQ = <fairygui.GRichTextField><any>(this.view.getChild("lbMineGuanQ"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandle;
		this.list.setVirtual();

		super.childrenCreated();
		this.resetPosition();
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		var item: GuanQiaRnk = obj as GuanQiaRnk;
		var d = GGlobal.modelGuanQia.rank;
		item.vo = d[index];
	}

	private onCloseHandler() {
		GGlobal.layerMgr.close(UIConst.GUANQIARNK);
	}

	protected onShown() {
		this.update();
		this.request();
		GGlobal.control.listen(Enum_MsgType.MSG_GQ_RNK, this.update, this);
	}

	protected onHide() {
		GGlobal.control.remove(Enum_MsgType.MSG_GQ_RNK, this.update, this);
		GGlobal.layerMgr.close(UIConst.GUANQIARNK);
		this.list.numItems = 0;
	}

	protected _last = -999999;
	protected request() {
		var now = egret.getTimer();
		if (now - this._last >= 30000) {
			GGlobal.modelGuanQia.CS_GETRANK_1107();
			this._last = now;
		}
	}

	protected update() {
		var m = GGlobal.modelGuanQia;
		this.lbMineRank.text = "排名：" + (m.myRank > 0 ? m.myRank : "未上榜");
		this.lbMineGuanQ.text = "当前：" + m.curGuanQiaLv + "关";
		var dt = m.rank;
		this.list.numItems = dt.length;
		this.list.refreshVirtualList();
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}
}