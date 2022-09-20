/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewArpgSceneChange extends UIModalPanel {

	public n0: fairygui.GRichTextField;

	public static URL: string = "ui://jvxpx9emafjm0";

	public static createInstance(): ViewArpgSceneChange {
		return <ViewArpgSceneChange><any>(fairygui.UIPackage.createObject("common", "ViewArpgSceneChange"));
	}

	public constructor() {
		super();
		this.loadRes();
	}


	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "ViewArpgSceneChange").asCom;
		this.contentPane = this.view;
		this.n0 = <fairygui.GRichTextField><any>(this.view.getChild("n0"));
		super.childrenCreated();
	}


	protected onShown(){
		let arg = this._args;
		this.n0.text = "正在进入【"+arg+"】";
	}

	protected onHide(){
		GGlobal.layerMgr.close(UIConst.ARPG_SCENEVIEW);
	}
}