class View_YanHui_ApplyListPanel extends UIModalPanel {

	public list: fairygui.GList;
	public rejectBt: fairygui.GButton;
	public agreeBt: fairygui.GButton;
	public boxBt: fairygui.GButton;

	public static URL: string = "ui://4x7dk3lhowxnx";

	public static createInstance(): View_YanHui_ApplyListPanel {
		return <View_YanHui_ApplyListPanel><any>(fairygui.UIPackage.createObject("YanHui", "View_YanHui_ApplyListPanel"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		let self = this;
		self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_ApplyListPanel").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();

	}

	private renderHandler(index: number, item: YanHui_ApplyListItem) {
		item.setVo(GGlobal.modelYanHui.applyList[index]);
	}

	private updateShow() {
		let self = this;
		let model = GGlobal.modelYanHui;
		self.boxBt.selected = model.applySt == 0;
		self.list.numItems = model.applyList.length;
	}

	protected onShown(): void {
		let self = this;
		self.register(true);
		self.updateShow();
	}

	protected onHide(): void {
		let self = this;
		self.register(false);
		self.list.numItems = 0;
	}

	public register(pFlag: boolean) {
		let self = this;
		EventUtil.register(pFlag, self.rejectBt, egret.TouchEvent.TOUCH_TAP, self.OnHandler, self);
		EventUtil.register(pFlag, self.agreeBt, egret.TouchEvent.TOUCH_TAP, self.OnHandler, self);
		EventUtil.register(pFlag, self.boxBt, egret.TouchEvent.TOUCH_TAP, self.OnHandler, self);
		GGlobal.control.register(pFlag, UIConst.YANHUI_APPLY, self.updateShow, self);
	}

	private OnHandler(evt: egret.TouchEvent) {
		let self = this;
		let model = GGlobal.modelYanHui;
		let bt = evt.target as fairygui.GButton;
		switch (bt.hashCode) {
			case self.rejectBt.hashCode:
				if (self.list.numItems > 0) {
					model.CG11483(-1, 0);
				}
				break;
			case self.agreeBt.hashCode:
				if (self.list.numItems > 0) {
					model.CG11483(2, 0);
				}
				break;
			case self.boxBt.hashCode:
				if (self.boxBt.selected) {
					model.CG11481(0)
				} else {
					model.CG11481(1)
				}
				break;
		}
	}
}