class ViewBaZhenTuShow extends UIModalPanel {

	public grid: VBaZTGrid;
	public labT: fairygui.GLabel;
	public lb1: fairygui.GTextField;
	public lbAttr: fairygui.GTextField;
	public lbLv: fairygui.GTextField;
	public lbName: fairygui.GTextField;
	public lb2: fairygui.GTextField;
	public lbPower: fairygui.GTextField;

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(VBaZTGrid.URL, VBaZTGrid);
		this.loadRes("baZhenTu", "baZhenTu_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("baZhenTu");
		this.view = fairygui.UIPackage.createObject("baZhenTu", "ViewBaZhenTuShow").asCom;
		this.contentPane = this.view;

		this.grid = <VBaZTGrid><any>(this.view.getChild("grid"));
		this.labT = <fairygui.GLabel><any>(this.view.getChild("labT"));
		this.lb1 = <fairygui.GTextField><any>(this.view.getChild("lb1"));
		this.lbAttr = <fairygui.GTextField><any>(this.view.getChild("lbAttr"));
		this.lbLv = <fairygui.GTextField><any>(this.view.getChild("lbLv"));
		this.lbName = <fairygui.GTextField><any>(this.view.getChild("lbName"));
		this.lb2 = <fairygui.GTextField><any>(this.view.getChild("lb2"));
		this.lbPower = <fairygui.GTextField><any>(this.view.getChild("lbPower"));

		this.isShowOpenAnimation = false;
		super.childrenCreated();
	}

	public onOpen(arg) {
		super.onOpen(arg);
	}

	protected onShown() {
		let c: Vo_Chat = this._args;
		this.lbName.text = c.name;
		let arr = c.content.split("_");
		let id = parseInt(arr[0]);
		let level = parseInt(arr[1]);
		let starLv = parseInt(arr[2]);

		let v = new VoBaZhenTu();
		v.id = id;
		v.level = level;
		v.starLv = starLv;
		v.initLib();;
		this.grid.isShowEff = true;
		this.grid.vo = v;
		this.lbLv.text = v.level + "";
		this.lbPower.text = v.power + "";
		this.lbAttr.text = ConfigHelp.attrStringQian(v.attr, "+", null, "#15f234");
	}

	protected onHide(): void {
		this.grid.showEff(false);
		GGlobal.layerMgr.close(UIConst.BAZHENTU_SHOW);
	}
}