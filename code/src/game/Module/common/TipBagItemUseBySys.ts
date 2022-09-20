class TipBagItemUseBySys extends UIModalPanel {

	public c1: fairygui.Controller;
	public btnUse: Button0;
	public groupUse: fairygui.GGroup;
	public childTip: ChildTipBagItem;
	public childBySys: ChildTipBagBySys;

	public static URL: string = "ui://jvxpx9emq2i93g2";

	public static createInstance(): TipBagItemUseBySys {
		return <TipBagItemUseBySys><any>(fairygui.UIPackage.createObject("common", "TipBagItemUseBySys"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("common", "TipBagItemUseBySys").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	protected onShown() {
		let self = this;
		GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.closeEventHandler, self);
		self.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onSendUseHandler, self);
		self.childTip.lbDes.addEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
		self.childTip.lbSource.addEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
	}

	protected onHide(): void {
		let self = this;
		GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.closeEventHandler, self);
		self.btnUse.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSendUseHandler, self);
		self.childTip.lbDes.removeEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
		self.childTip.lbSource.removeEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
		self.childBySys.clean();
		GGlobal.layerMgr.close(UIConst.TIP_BAG_ITEM_USE_SYS);
	}

	public onOpen(arg) {
		super.onOpen(arg)
		this.show(arg)
	}

	private show(obj: any): void {
		let self = this;
		self.resize();
		self.currentVo = obj[0];
		let resource = obj[1];
		self.childTip.vo = self.currentVo;
		self.childBySys.vo = self.currentVo;
		self.c1.selectedIndex = resource == ViewGrid.BAG ? 0 : 1;
	}

	private resize(): void {
		let self = this;
		self.setXY((fairygui.GRoot.inst.width - self.frame.width) / 2, (fairygui.GRoot.inst.height - self.frame.height) / 2)
	}

	private onSendUseHandler(event: egret.TouchEvent): void {
		let self = this;
		Model_GlobalMsg.selectID = self.currentVo.tzPas;
		if (self.currentVo.tz == UIConst.QICE_STAR) {
			GGlobal.layerMgr.open(self.currentVo.tz, Model_GlobalMsg.selectID);
			Model_GlobalMsg.selectID = 0;
		}
		else {
			GGlobal.layerMgr.open(self.currentVo.tz);
		}
		self.doHideAnimation();
	}
	private currentVo: VoItem;
	private count: number = 0;

}