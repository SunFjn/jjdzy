/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class CGYLItem extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public n1: ViewGrid;
	public n2: fairygui.GRichTextField;
	public btnGo: fairygui.GButton;
	public btnGet: Button1;
	public n5: fairygui.GTextField;
	public n6: fairygui.GImage;

	public static URL: string = "ui://nf66suj6lkx84";

	public static createInstance(): CGYLItem {
		return <CGYLItem><any>(fairygui.UIPackage.createObject("chuangguanYL", "CGYLItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChild("n0"));
		this.n1 = <ViewGrid><any>(this.getChild("n1"));
		this.n2 = <fairygui.GRichTextField><any>(this.getChild("n2"));
		this.btnGo = <fairygui.GButton><any>(this.getChild("btnGo"));
		this.btnGet = <Button1><any>(this.getChild("btnGet"));
		this.n5 = <fairygui.GTextField><any>(this.getChild("n5"));
		this.n6 = <fairygui.GImage><any>(this.getChild("n6"));
		this.btnGet.checkNotice = true;
	}

	private openLink() {
		GGlobal.layerMgr.close(UIConst.CHUANGGUANYOULI);
		GGlobal.layerMgr.open(this.sid);
	}

	private getHD() {
		GGlobal.modelChuangGuanYL.CG_LQ_4153(this.tid);
	}

	public clean() {
		let sf = this;
		this.n1.vo = null;
		sf.btnGo.removeClickListener(sf.openLink, sf);
		sf.btnGet.removeClickListener(sf.getHD, sf);
	}

	sid = 0;
	tid = 0;
	public setdta(dta) {
		if (!dta) return;
		let id = dta[0];
		let sf = this;
		let st = dta[1];
		let progres = dta[2];
		let m = GGlobal.modelChuangGuanYL;

		sf.tid = id;
		let cfg = Config.cgylrw_262[id];
		sf.sid = cfg.open;
		sf.n2.text = cfg.name;
		let max = cfg.cs;
		if (cfg.type == 2) max = ConfigHelp.getYiWanText(max);
		sf.n5.text = ConfigHelp.getYiWanText(progres) + "/" + ConfigHelp.getYiWanText(max);
		sf.n1.tipEnabled = true;
		sf.n1.isShowEff = true;
		let vo = ConfigHelp.makeItem(JSON.parse(cfg.reward)[0]);
		sf.n1.vo = vo;
		sf.btnGo.visible = st == 0;
		sf.btnGet.visible = st == 1;
		sf.n6.visible = st == 2;
		sf.n5.visible = st == 0;

		sf.btnGo.addClickListener(sf.openLink, sf);
		sf.btnGet.addClickListener(sf.getHD, sf);
	}
}