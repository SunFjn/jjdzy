class TipBagItem extends UIModalPanel {

	public childTip: ChildTipBagItem;

	public static URL: string = "ui://jvxpx9em7g6v23";

	public static createInstance(): TipBagItem {
		return <TipBagItem><any>(fairygui.UIPackage.createObject("common", "TipBagItem"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}
	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "TipBagItem").asCom;
		this.contentPane = this.view;

		this.childTip = <ChildTipBagItem><any>(this.view.getChild("childTip"));
		super.childrenCreated();
	}

	protected onShown() {
		GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
		this.childTip.lbDes.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		this.childTip.lbSource.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
	}

	protected onHide(): void {
		GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
		this.childTip.lbDes.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		this.childTip.lbSource.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		GGlobal.layerMgr.close(UIConst.TIP_BAG_ITEM);
	}

	public onOpen(arg){
		super.onOpen(arg)
		this.show(arg)
		this.resize();
	}

	public show(obj: any): void {
		this.childTip.vo = obj;
	}

	private resize(): void {
		this.setXY((fairygui.GRoot.inst.width - this.frame.width) / 2, (fairygui.GRoot.inst.height - this.frame.height) / 2)
	}
}