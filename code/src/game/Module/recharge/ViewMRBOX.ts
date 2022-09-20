/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewMRBOX extends UIModalPanel {

	public frame: fairygui.GComponent;
	public lbPro: fairygui.GRichTextField;
	public btn: fairygui.GButton;
	public lbTip: fairygui.GRichTextField;
	public img: fairygui.GImage;
	public n9: fairygui.GList;

	public static URL: string = "ui://zzz8io3ro5124";

	public static createInstance(): ViewMRBOX {
		return <ViewMRBOX><any>(fairygui.UIPackage.createObject("shouchong", "ViewMRBOX"));
	}

	public constructor() {
		super();
		this.loadRes("shouchong", "shouchong_atlas0");
		fairygui.UIObjectFactory.setPackageItemExtension(MRBox.URL, MRBox);
	}

	protected childrenCreated(): void {
		GGlobal.createPack("shouchong");
		let s = this;
		s.view = fairygui.UIPackage.createObject("shouchong", "ViewMRBOX").asCom;
		s.contentPane = s.view;

		s.frame = <fairygui.GComponent><any>(s.view.getChild("frame"));
		s.lbPro = <fairygui.GRichTextField><any>(s.view.getChild("lbPro"));
		s.btn = <fairygui.GButton><any>(s.view.getChild("btn"));
		s.lbTip = <fairygui.GRichTextField><any>(s.view.getChild("lbTip"));
		s.img = <fairygui.GImage><any>(s.view.getChild("img"));
		s.n9 = <fairygui.GList><any>(s.view.getChild("n9"));
		s.n9.callbackThisObj = s;
		s.n9.itemRenderer = s.awardsRender;
		super.childrenCreated();
		s.resetPosition();
	}

	private awards = [];
	private awardsRender(idx, obj) {
		let item: ViewGridRender = obj as ViewGridRender;
		item.vo = this.awards[idx];
		item.tipEnabled = true;
		item.grid.showEff(true);
	}

	private onClick() {
		GGlobal.modelRecharge.CG_MRSC_1933(this.ids);
	}

	private grids: any[] = [];
	public update() {
		var m = GGlobal.modelRecharge;
		let st = m.mrscBox[this.ids - 1][0];
		let lib = Config.mrbx_715[this.ids];
		let d = lib.NEED;

		this.awards = ConfigHelp.makeItemListArr(JSON.parse(lib.AWARD));
		this.n9.numItems = this.awards.length;

		this.lbPro.text = "累充达到" + d + "天可领取(" + m.day + "/" + d + ")";
		this.lbPro.visible = st == 0;
		this.lbTip.visible = st == 0;
		this.btn.visible = st == 1;
		this.img.visible = st == 2;
	}

	private ids: number = 0;
	protected onShown() {
		this.ids = this._args;
		this.update();
		this.btn.addClickListener(this.onClick, this);
		GGlobal.control.listen(Enum_MsgType.MEIRISHOUCHONGUP, this.update, this);
	}

	protected onHide() {
		this.n9.numItems = 0;
		this.btn.removeClickListener(this.onClick, this);
		GGlobal.layerMgr.close(UIConst.MRSCBOX);
		GGlobal.control.remove(Enum_MsgType.MEIRISHOUCHONGUP, this.update, this);
	}
}