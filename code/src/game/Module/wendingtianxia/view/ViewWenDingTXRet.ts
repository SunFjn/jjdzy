/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewWenDingTXRet extends UIModalPanel {

	public n5: fairygui.GImage;
	public n14: fairygui.GImage;
	public n6: fairygui.GImage;
	public n2: fairygui.GButton;
	public closeButton: fairygui.GButton;
	public n13: fairygui.GLoader;
	public n8: fairygui.GLoader;
	public n7: fairygui.GLoader;
	public n9: fairygui.GImage;
	public n10: fairygui.GRichTextField;
	public groupHead: fairygui.GGroup;
	public n16: fairygui.GImage;

	public static URL: string = "ui://gxs8kn67fl2hb";

	public static createInstance(): ViewWenDingTXRet {
		return <ViewWenDingTXRet><any>(fairygui.UIPackage.createObject("wendingTX", "ViewWenDingTXRet"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("wendingTX");
		let s = this;
		s.view = fairygui.UIPackage.createObject("wendingTX", "ViewWenDingTXRet").asCom;
		s.contentPane = s.view;

		s.n5 = <fairygui.GImage><any>(s.view.getChild("n5"));
		s.n14 = <fairygui.GImage><any>(s.view.getChild("n14"));
		s.n6 = <fairygui.GImage><any>(s.view.getChild("n6"));
		s.n2 = <fairygui.GButton><any>(s.view.getChild("n2"));
		s.closeButton = <fairygui.GButton><any>(s.view.getChild("closeButton"));
		s.n13 = <fairygui.GLoader><any>(s.view.getChild("n13"));
		s.n8 = <fairygui.GLoader><any>(s.view.getChild("n8"));
		s.n7 = <fairygui.GLoader><any>(s.view.getChild("n7"));
		s.n9 = <fairygui.GImage><any>(s.view.getChild("n9"));
		s.n10 = <fairygui.GRichTextField><any>(s.view.getChild("n10"));
		s.groupHead = <fairygui.GGroup><any>(s.view.getChild("groupHead"));
		s.n16 = <fairygui.GImage><any>(s.view.getChild("n16"));
		super.childrenCreated();
	}

	private closeHD() {
		GGlobal.layerMgr.close2(UIConst.WENDINGTX_RET);
	}

	private _tabArr = [];
	protected onShown(): void {
		let sf = this;
		let m = GGlobal.modelWenDingTX;
		if (m.mvpHead_id != 0) {
			sf.n16.visible = false;
			sf.n10.text  = m.mvp_name;
			sf.n10.visible = true;
			sf.n9.visible = true;
			sf.groupHead.visible = true;
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHeadGrid_id + ""), sf.n7);
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHead_id + ""), sf.n8);
		} else {
			sf.groupHead.visible = false;
			sf.n10.text  = "";
			sf.n16.visible = true;
			sf.n10.visible = false;
			sf.n9.visible = false;
		}

		let title = Config.chenghao_702[55].picture;
		ImageLoader.instance.loader(Enum_Path.TITLE_URL + title + ".png",sf.n13);
		this.n2.addClickListener(this.closeHD, this);
		this.closeButton.addClickListener(this.closeHD, this);
	}

	protected onHide(): void {
		let s = this;
		GGlobal.layerMgr.close(UIConst.WENDINGTX_RET);
		this.n2.removeClickListener(this.closeHD, this);
		this.closeButton.removeClickListener(this.closeHD, this);
	}
}