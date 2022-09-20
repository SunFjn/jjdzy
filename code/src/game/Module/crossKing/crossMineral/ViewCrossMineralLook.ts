class ViewCrossMineralLook extends UIModalPanel {

	public lb:fairygui.GTextField;

	public static URL:string = "ui://yqpfulefupam5l";

	public static createInstance():ViewCrossWarsLook {
		return <ViewCrossWarsLook><any>(fairygui.UIPackage.createObject("crossKing","ViewCrossMineralLook"));
	}

	public constructor() {
		super();
		this.loadRes("crossKing","crossKing_atlas0");
	}


	protected childrenCreated(): void {
		GGlobal.createPack("crossKing");
		this.view = fairygui.UIPackage.createObject("crossKing", "ViewCrossMineralLook").asCom;
		this.contentPane = this.view;
		this.isShowMask = false;
		this.lb = <fairygui.GTextField><any>(this.view.getChild("lb"));
		super.childrenCreated();
	}
	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >>1, (fairygui.GRoot.inst.height - this.height) >> 2);
	}

	protected onShown(): void {
		super.onShown()
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.CROSS_MINE_LOOK);
	}
}