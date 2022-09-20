class ViewShaoZhuEscortLook extends UIModalPanel {

	public lb:fairygui.GTextField;

	public static URL:string = "ui://lnw94ki2h1frq";

	public static createInstance():ViewShaoZhuEscortLook {
		return <ViewShaoZhuEscortLook><any>(fairygui.UIPackage.createObject("ShaoZhuEscort","ViewShaoZhuEscortLook"));
	}

	public constructor() {
		super();
		this.loadRes("ShaoZhuEscort","ShaoZhuEscort_atlas0");
	}


	protected childrenCreated(): void {
		GGlobal.createPack("ShaoZhuEscort");
		this.view = fairygui.UIPackage.createObject("ShaoZhuEscort", "ViewShaoZhuEscortLook").asCom;
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
		GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT_LOOK);
	}
}