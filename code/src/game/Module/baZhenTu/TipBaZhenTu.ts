class TipBaZhenTu extends UIModalPanel {

	public lbName:fairygui.GRichTextField;
	public lbPower:fairygui.GRichTextField;
	public lbLevel:fairygui.GRichTextField;
	public lbDes:fairygui.GRichTextField;
	public lbDesTit:fairygui.GRichTextField;
	public grid:VBaZTGrid;

	public static URL:string = "ui://xrzn9ppamnlv1c";

	public static createInstance():TipBaZhenTu {
		return <TipBaZhenTu><any>(fairygui.UIPackage.createObject("baZhenTu","TipBaZhenTu"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("baZhenTu", "TipBaZhenTu").asCom;
		this.contentPane = this.view;

		this.lbName = <fairygui.GRichTextField><any>(this.view.getChild("lbName"));
		this.lbPower = <fairygui.GRichTextField><any>(this.view.getChild("lbPower"));
		this.lbLevel = <fairygui.GRichTextField><any>(this.view.getChild("lbLevel"));
		this.lbDes = <fairygui.GRichTextField><any>(this.view.getChild("lbDes"));
		this.lbDesTit = <fairygui.GRichTextField><any>(this.view.getChild("lbDesTit"));
		this.grid = <VBaZTGrid><any>(this.view.getChild("grid"));
		super.childrenCreated();
	}

	protected onShown() {
		GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
	}

	protected onHide(): void {
		this.grid.showEff(false);
		GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
		GGlobal.layerMgr.close(UIConst.TIP_BAZHENTU_ITEM);
	}

	public onOpen(arg){
		super.onOpen(arg)
		this.show(arg)
		this.resize();
	}

	public show(v: VoBaZhenTu): void {
		this.grid.isShowEff = true;
		this.grid.vo = v;
		this.lbName.text = v.colorName;
		// this.lbName.color = Color.QUALITYCOLOR[v.pz];
		this.lbLevel.text = "Lv." + v.level + "/" + v.maxLv;
		this.lbPower.text = "战力：" + v.power;
		if(v.type == 0){
			this.lbDes.text = v.tipDes;
		}else{
			this.lbDes.text = ConfigHelp.attrStringQian(v.attr, "+", null, "#15f234");
		}
	}

	private resize(): void {
		this.setXY((fairygui.GRoot.inst.width - this.frame.width) / 2, (fairygui.GRoot.inst.height - this.frame.height) / 2)
	}
}