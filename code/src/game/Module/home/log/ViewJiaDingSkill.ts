/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewJiaDingSkill extends UIModalPanel {

	public n0: fairygui.GImage;
	public n1: fairygui.GRichTextField;
	public closeButton: fairygui.GButton;
	public n6: fairygui.GImage;
	public lbName: fairygui.GRichTextField;
	public n8: fairygui.GImage;
	public n9: fairygui.GImage;
	public lbInfo: fairygui.GRichTextField;

	public static URL: string = "ui://y0plc878g2m4g";

	public static createInstance(): ViewJiaDingSkill {
		return <ViewJiaDingSkill><any>(fairygui.UIPackage.createObject("home", "ViewJiaDingSkill"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		const self = this;
		self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewJiaDingSkill").asCom;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	public eventFunction(type) {
		const self = this;
	}

	private awatar: UIRole;
	onShown() {
		const s = this;
		let data = s._args;
		let jdID = GGlobal.modelHouseKeeper.jdID;
		let lib = Config.jdjins_021[GGlobal.modelHouseKeeper.jdID];
		if (!s.awatar) {
			s.awatar = UIRole.create();
			s.awatar.uiparent = s.displayListContainer;
		}
		s.awatar.setPos(155, 295);
		s.awatar.setScaleXY(1.5, 1.5);
		s.awatar.setWeapon(0);
		s.awatar.setBody(lib.moxing);
		s.awatar.onAdd();
		s.lbInfo.text = "<font color='#FFC344'>" + data[0] + "</font><font color='#fe0000'>(-" + data[1] + ")</font>";
		s.lbName.text = lib.mingzi;
	}

	onHide() {
		const self = this;
		GGlobal.layerMgr.close(UIConst.HOME_JIADING_UI);
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
	}
}