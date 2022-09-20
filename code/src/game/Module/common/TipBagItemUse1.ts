class TipBagItemUse1 extends UIModalPanel {

	public btnUse: Button0;
	public groupUse: fairygui.GGroup;
	public childTip: ChildTipBagItem;

	public static URL: string = "ui://jvxpx9emz05i3f3";

	public static createInstance(): TipBagItemUse1 {
		return <TipBagItemUse1><any>(fairygui.UIPackage.createObject("common", "TipBagItemUse1"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "TipBagItemUse1").asCom;
		this.contentPane = this.view;

		this.btnUse = <Button0><any>(this.view.getChild("btnUse"));
		this.groupUse = <fairygui.GGroup><any>(this.view.getChild("groupUse"));
		this.childTip = <ChildTipBagItem><any>(this.view.getChild("childTip"));
		super.childrenCreated();
	}

	protected onShown() {
		GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
		this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendUseHandler, this);
		this.childTip.lbDes.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		this.childTip.lbSource.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
	}

	protected onHide(): void {
		GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
		this.btnUse.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendUseHandler, this);
		this.childTip.lbDes.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		this.childTip.lbSource.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
		GGlobal.layerMgr.close(UIConst.TIP_BAG_ITEM_USE1);
	}

	public onOpen(arg) {
		super.onOpen(arg)
		this.show(arg)
	}

	private show(obj: any): void {
		this.resize();
		this.currentVo = obj;
		var vo: VoItem = obj;
		this.childTip.vo = vo;
	}

	private resize(): void {
		this.setXY((fairygui.GRoot.inst.width - this.frame.width) / 2, (fairygui.GRoot.inst.height - this.frame.height) / 2)
	}

	private onSendUseHandler(event: egret.TouchEvent): void {
		Model_GlobalMsg.selectID = this.currentVo.tzPas;
		GGlobal.layerMgr.open(this.currentVo.tz);
		this.doHideAnimation();
		TipManager.hide();
	}
	private currentVo: VoItem;
	private count: number = 0;

}