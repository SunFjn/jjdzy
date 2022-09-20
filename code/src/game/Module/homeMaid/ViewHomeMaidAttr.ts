class ViewHomeMaidAttr extends UIModalPanel {

	public frame: fairygui.GLabel;
	public lbTitStar: fairygui.GLabel;
	public lbTitLv: fairygui.GLabel;
	public lbStar: fairygui.GRichTextField;
	public lbLv: fairygui.GRichTextField;

	public static URL: string = "ui://qqn3a7vxfs5a6e";

	public static createInstance(): ViewHomeMaidAttr {
		return <ViewHomeMaidAttr><any>(fairygui.UIPackage.createObject("homeMaid", "ViewHomeMaidAttr"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("homeMaid", "ViewHomeMaidAttr").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
	}

	public onShown(): void {
		this.updateView();
	}

	private updateView(): void {
		let s = this;
		let v: Vo_HomeMaid = s._args;
		s.lbStar.text = ConfigHelp.attrString(JSON.parse(v.cfgStar.attr), "+")
		s.lbLv.text = ConfigHelp.attrString(JSON.parse(v.cfgLv.sx), "+")
	}
}