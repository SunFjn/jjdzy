class ViewCrossWarsLook extends UIModalPanel {

	public lb: fairygui.GTextField;

	public static URL: string = "ui://yqpfulefnw6y2r";

	public static createInstance(): ViewCrossWarsLook {
		return <ViewCrossWarsLook><any>(fairygui.UIPackage.createObject("Arena", "ViewCrossWarsLook"));
	}

	public constructor() {
		super();
		this.loadRes("Arena", "Arena_atlas0");
	}


	protected childrenCreated(): void {
		GGlobal.createPack("Arena");
		let self = this;
		self.view = fairygui.UIPackage.createObject("Arena", "ViewCrossWarsLook").asCom;
		self.contentPane = self.view;
		self.isShowMask = false;
		self.lb = <fairygui.GTextField><any>(self.view.getChild("lb"));
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
		GGlobal.layerMgr.close(UIConst.CROSS_WARS_LOOK);
	}
}