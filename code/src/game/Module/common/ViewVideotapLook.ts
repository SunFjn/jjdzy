class ViewVideotapLook extends UIModalPanel {

	public lb: fairygui.GTextField;

	public static URL: string = "ui://jvxpx9emqc9h3id";

	public static createInstance(): ViewCrossWarsLook {
		return <ViewCrossWarsLook><any>(fairygui.UIPackage.createObject("common", "ViewVideotapLook"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}


	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("common", "ViewVideotapLook").asCom;
		self.contentPane = this.view;
		self.isShowMask = false;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}
	public resetPosition(): void {
		let self = this;
		self.setXY((fairygui.GRoot.inst.width - self.width) >> 1, (fairygui.GRoot.inst.height - self.height) >> 2);
	}

	protected onShown(): void {
		super.onShown()
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.COMMON_VIDEOTAP);
	}
}