/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class KaiFuIt extends fairygui.GComponent {

	public lbCondition: fairygui.GRichTextField;
	public btn: Button1;
	public btnGo: Button0;
	public ylq: fairygui.GImage;

	public static URL: string = "ui://yk4rwc6rd7mw1";

	public constructor() {
		super();
	}

	private itemCom: fairygui.GComponent;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbCondition = <fairygui.GRichTextField><any>(this.getChild("lbCondition"));
		this.btn = <Button1><any>(this.getChild("btn"));
		this.btnGo = <Button0><any>(this.getChild("btnGo"));
		this.ylq = <fairygui.GImage><any>(this.getChild("ylq"));
		this.btn.addClickListener(this.clickHD, this);
		this.btnGo.addClickListener(this.openSys, this);

		this.itemCom = new fairygui.GComponent();
		this.addChild(this.itemCom);
		this.itemCom.setScale(0.8, 0.8);
	}

	private openSys() {
		GGlobal.layerMgr.open(this.sysID);
	}

	private clickHD() {
		if (this.state != 1) {
			ViewCommonWarn.text("领取条件不足");
		} else {
			GGlobal.model_KaiFKH.CG_LQ(this.idx);
		}
	}

	public clean() {
		ConfigHelp.cleanGridview(this.grids);
	}

	private idx;
	private state;
	private sysID = 0;
	private grids = [];
	public setdata(vo: Vo_KaiFuKH) {
		let st = vo.st;
		let s = this;
		let id = s.idx = vo.id;
		let lib = Config.party_240[id];
		ConfigHelp.cleanGridview(s.grids);
		let award = JSON.parse(lib.reward);
		s.grids = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(award), this.itemCom, 33, 65, true, false, 5, 120);
		let tar = lib.yq;
		if (vo.pro >= tar)
			s.lbCondition.text = lib.tips + "<font color='#15f234'>（" + vo.pro + "/" + tar + "）</font>";
		else
			s.lbCondition.text = lib.tips + "<font color='#ed1414'>（" + vo.pro + "/" + tar + "）</font>";
		s.ylq.visible = st == 2;
		s.btn.checkNotice = st == 1;
		s.state = st;
		let sysid = lib.sys;
		if (sysid != 0) {
			s.sysID = sysid;
			s.btn.visible = st == 1;
			s.btnGo.visible = st == 0;
			s.btn.text = st == 0 ? "前往" : "领取";
		} else {
			s.btn.visible = st != 2;
			s.btnGo.visible = false;
			s.btn.text = "领取";
		}
	}
}