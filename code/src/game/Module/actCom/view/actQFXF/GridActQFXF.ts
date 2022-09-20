class GridActQFXF extends fairygui.GComponent {

	public grid: ViewGrid;
	public btnGet: Button1;
	public btnGo: fairygui.GButton;
	public imgHas: fairygui.GImage;
	public lb: fairygui.GRichTextField;

	public static URL: string = "ui://p8fr1bvgkzdy7";

	public static createInstance(): GridActQFXF {
		return <GridActQFXF><any>(fairygui.UIPackage.createObject("actQFXF", "GridActQFXF"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.btnGet.addClickListener(s.onGet, s);
		s.btnGo.addClickListener(s.onGo, s);
	}

	private _vo: { id: number, st: number, cfg: Iqfxf_768 }
	public set vo(v: { id: number, st: number, cfg: Iqfxf_768 }) {
		let s = this;
		s._vo = v;
		if (v.cfg.gr == 0) {
			s.lb.text = "免费领取"
		} else {
			s.lb.text = "消费" + ConfigHelp.getYiWanText(v.cfg.gr) + "元宝"
		}
		s.grid.tipEnabled = s.grid.isShowEff = true;
		s.grid.vo = ConfigHelp.makeItem(JSON.parse(v.cfg.jl)[0])

		if (v.st == 1) {
			s.btnGet.visible = true;
			s.btnGet.checkNotice = true;
			s.btnGo.visible = false;
			s.imgHas.visible = false
		} else if (v.st == 2) {
			s.imgHas.visible = true
			s.btnGet.visible = false;
			s.btnGo.visible = false;
		} else {
			s.btnGo.visible = true;
			s.btnGet.visible = false;
			s.imgHas.visible = false;
		}
	}

	private onGet() {
		GGlobal.model_ActQFXF.CG_GET_REWARD(this._vo.id)
	}

	private onGo() {
		GGlobal.layerMgr.open(UIConst.CANGBAOGE)
	}

	public clean() {
		super.clean();
		let s = this;
		s.grid.clean();
	}
}