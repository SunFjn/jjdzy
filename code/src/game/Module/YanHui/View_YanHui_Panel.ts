class View_YanHui_Panel extends UIPanelBase {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public leftBt: fairygui.GButton;
	public pageLb: fairygui.GRichTextField;
	public rightBt: fairygui.GButton;
	public smLb: fairygui.GRichTextField;
	public holdBt: fairygui.GButton;

	public static URL: string = "ui://4x7dk3lhh7qe0";

	public static createInstance(): View_YanHui_Panel {
		return <View_YanHui_Panel><any>(fairygui.UIPackage.createObject("YanHui", "View_YanHui_Panel"));
	}

	public constructor() {
		super();
		this.setSkin("YanHui", "YanHui_atlas0", "View_YanHui_Panel");
	}

	protected setExtends() {
		YanHuiManager.setExtends();
	}
	protected initView() {
		let self = this;
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
	}

	private renderHandler(index: number, item: YanHuiListItem) {
		let self = this;
		let model = GGlobal.modelYanHui;
		item.setVo(model.yanhuiArr[(self.curPage - 1) * self.pageMax + index]);
	}

	private updateShow() {
		let self = this;
		let model = GGlobal.modelYanHui;
		self.totPage = Math.ceil(model.yanhuiArr.length / self.pageMax) + (model.yanhuiArr.length % self.pageMax == 0 ? 1 : 0);
		self.pageLb.text = self.curPage + "/" + self.totPage;
		if (self.curPage != self.totPage) {
			self.list.numItems = self.pageMax;
		} else {
			self.list.numItems = model.yanhuiArr.length % self.pageMax;
		}
	}

	protected onShown(): void {
		let self = this;
		self.register(true);
		GGlobal.modelYanHui.CG_House_openListUI_11451();
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		self.register(false);
	}

	public register(pFlag: boolean) {
		let self = this;
		EventUtil.register(pFlag, self.leftBt, egret.TouchEvent.TOUCH_TAP, self.pageHandler, self);
		EventUtil.register(pFlag, self.rightBt, egret.TouchEvent.TOUCH_TAP, self.pageHandler, self);
		EventUtil.register(pFlag, self.holdBt, egret.TouchEvent.TOUCH_TAP, self.onHold, self);
		EventUtil.register(pFlag, self.smLb, egret.TouchEvent.TOUCH_TAP, self.openWFSM, self);
		GGlobal.reddot.register(pFlag, UIConst.YANHUI, self.updateShow, self);
	}

	private openWFSM(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.YANHUI);
	}

	private onHold() {
		if (GGlobal.modelYanHui.yanHuiID > 0) {
			return ViewCommonWarn.text("同一时间只能参加一场宴会");
		}
		GGlobal.layerMgr.open(UIConst.YANHUI_HOLD);
	}

	private curPage = 1;
	private totPage = 1;
	private pageMax = 6;
	private pageHandler(evt: egret.TouchEvent) {
		let self = this;
		let bt = evt.target as fairygui.GButton;
		switch (bt.id) {
			case self.leftBt.id:
				if (self.curPage <= 1) return;
				self.curPage--;
				break;
			case self.rightBt.id:
				if (self.curPage >= self.totPage) return;
				self.curPage++;
				break;
		}
		self.updateShow();
	}
}