class View_DDFH_Explain extends UIModalPanel {

	public frame: fairygui.GComponent;
	public noteLb: fairygui.GRichTextField;

	public static URL: string = "ui://me1skowljs6li";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("Arena", "View_DDFH_Explain").asCom;
		a.contentPane = a.view;
		let explainLb = a.view.getChild("explainLb").asRichTextField;
		explainLb.text = Config.wfsm_200[1603].tips;
		super.childrenCreated();
	}

	protected onShown(): void {

	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.DANDAO_FUHUI_EXPLAIN);
	}
}