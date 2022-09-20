class View_SanGuoYT_ZLP extends UIModalPanel {

	public grid: fairygui.GComponent;
	public surLb: fairygui.GRichTextField;
	public list: fairygui.GList;

	public static URL: string = "ui://z4ijxlqklcejc";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("sanGuoYiTong", "View_SanGuoYT_ZLP").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		super.childrenCreated();
	}

	private renderHandler(index: number, item) {

	}

	protected onShown(): void {

	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.SANGUO_YITONG_ZLP);
	}
}