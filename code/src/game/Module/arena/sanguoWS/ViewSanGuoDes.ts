/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewSanGuoDes extends UIModalPanel {

	public frame: fairygui.GComponent;

	public static URL: string = "ui://me1skowl608at";

	public static createInstance(): ViewSanGuoDes {
		return <ViewSanGuoDes><any>(fairygui.UIPackage.createObject("Arena", "ViewSanGuoDes"));
	}

	public constructor() {
		super();
		this.loadRes();
		this.isShowOpenAnimation = false;
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Arena");
		let a = this;
		a.view = fairygui.UIPackage.createObject("Arena", "ViewSanGuoDes").asCom;
		let b = a.contentPane = a.view;

		this.frame = <fairygui.GComponent><any>(b.getChild("frame"));
		super.childrenCreated();
	}

	protected onHide(){
		GGlobal.layerMgr.close(UIConst.SGWS_DESC);
	}
}