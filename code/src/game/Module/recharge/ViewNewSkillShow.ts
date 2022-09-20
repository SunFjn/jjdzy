class ViewNewSkillShow extends UIModalPanel {

	public txtInfo: fairygui.GRichTextField;
	public btnHand: fairygui.GButton;
	public txtInfo_2: fairygui.GRichTextField;
	public txtInfo_3: fairygui.GRichTextField;

	public static URL: string = "ui://zzz8io3rbvbpl";

	public static createInstance(): ViewNewSkillShow {
		return <ViewNewSkillShow><any>(fairygui.UIPackage.createObject("shouchong", "ViewNewSkillShow"));
	}

	public constructor() {
		super();
		this.loadRes("shouchong", "shouchong_atlas0");
	}


	protected childrenCreated() {
		GGlobal.createPack("shouchong");
		let s = this;
		s.contentPane = fairygui.UIPackage.createObject("shouchong", "ViewNewSkillShow").asCom;
		s.view = s.contentPane;
		this.closeButton = s.btnHand = <Button2><any>(s.view.getChild("btnHand"));
		this.closeButton.visible = false;
		super.childrenCreated();
	}


	private onCloseHD() {
		GGlobal.layerMgr.close2(UIConst.SHENJIAN_GETTER);
	}

	private eff: Part;
	protected onShown() {
		this.eff = EffectMgr.addEff("uieff/10000", this.displayListContainer, 220, 300, 800, -1, true);
		this.btnHand.addClickListener(this.onCloseHD, this);
	}
	protected onHide() {
		this.btnHand.removeClickListener(this.onCloseHD, this);
		GGlobal.layerMgr.close(UIConst.SHENJIAN_GETTER);
		if (this.eff) {
			EffectMgr.instance.removeEff(this.eff);
			this.eff = null;
		}
	}
}