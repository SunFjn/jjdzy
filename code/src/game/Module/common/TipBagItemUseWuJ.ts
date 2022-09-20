class TipBagItemUseWuJ extends UIModalPanel {

	public c1: fairygui.Controller;
	public btnUse: Button0;
	public groupUse: fairygui.GGroup;
	public childTip: ChildTipBagItem;
	public childWuJ: ChildTipBagWuJ;

	public static URL: string = "ui://jvxpx9emq2i93g0";

	public static createInstance(): TipBagItemUseWuJ {
		return <TipBagItemUseWuJ><any>(fairygui.UIPackage.createObject("common", "TipBagItemUseWuJ"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("common", "TipBagItemUseWuJ").asCom;
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
		self.childWuJ.clean();
		GGlobal.layerMgr.close(UIConst.TIP_BAG_ITEM_USE_WUJ);
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
		self.childWuJ.vo = self.currentVo;
		self.c1.selectedIndex = resource == ViewGrid.BAG ? 0 : 1;
	}

	private resize(): void {
		let self = this;
		self.setXY((fairygui.GRoot.inst.width - self.frame.width) / 2, (fairygui.GRoot.inst.height - self.frame.height) / 2)
	}

	private onSendUseHandler(event: egret.TouchEvent): void {
		let self = this;
		if (self.currentVo.tz == UIConst.SHAOZHU_FASHION) {
			Model_GlobalMsg.selectID = Config.sonshow_267[self.currentVo.tzPas].son
			GGlobal.layerMgr.open(UIConst.SHAOZHU);
		}
		else if (self.currentVo.tz == UIConst.SHAOZHU) {
			Model_GlobalMsg.selectID = self.currentVo.tzPas
			GGlobal.layerMgr.open(self.currentVo.tz);
		}
		else if (self.currentVo.tz == UIConst.WU_JIANG) {
			Model_WuJiang.selectJob = self.currentVo.tzPas
			GGlobal.layerMgr.open(self.currentVo.tz);
		} else {
			GGlobal.layerMgr.open(self.currentVo.tz, Math.floor(self.currentVo.tzPas / 1000));
		}

		self.doHideAnimation();
	}
	private currentVo: VoItem;
	private count: number = 0;

}