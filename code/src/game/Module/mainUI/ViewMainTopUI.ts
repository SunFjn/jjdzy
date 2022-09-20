class ViewMainTopUI extends fairygui.GComponent {

	public lbName: fairygui.GRichTextField;
	public lbYB: fairygui.GRichTextField;
	public lbTongBi: fairygui.GRichTextField;
	public zsLvLb: fairygui.GRichTextField;
	public btnAddYB: fairygui.GButton;
	public btnAddBindYB: fairygui.GButton;
	public btnAddTB: fairygui.GButton;

	public static URL: string = "ui://7gxkx46whju42";

	public static createInstance(): ViewMainTopUI {
		return <ViewMainTopUI><any>(fairygui.UIPackage.createObject("MainUI", "ViewMainTopUI"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.lbName = <fairygui.GRichTextField><any>(s.getChild("lbName"));
		s.lbYB = <fairygui.GRichTextField><any>(s.getChild("lbYB"));
		s.lbTongBi = <fairygui.GRichTextField><any>(s.getChild("lbTongBi"));
		s.zsLvLb = <fairygui.GRichTextField><any>(s.getChild("zsLvLb"));
		s.btnAddYB = <fairygui.GButton><any>(s.getChild("btnAddYB"));
		s.btnAddTB = <fairygui.GButton><any>(s.getChild("btnAddTB"));

		s.lbYB.enabled = true;
		s.lbYB.addClickListener(s.recharge, s);
		s.lbTongBi.addClickListener(s.buyTongbiHandler, s);
		s.btnAddYB.addClickListener(s.recharge, s);
		s.btnAddTB.addClickListener(s.buyTongbiHandler, s);
		s.btnAddYB.visible = !GGlobal.isIOS;
		s.lbYB.enabled = !GGlobal.isIOS;
		s.lbTongBi.enabled = !GGlobal.isIOS;
		s.listen();
		s.resetPosition();
	}

	public static _instance: ViewMainTopUI;
	public static get instance(): ViewMainTopUI {
		if (!ViewMainTopUI._instance) ViewMainTopUI._instance = this.createInstance();
		return ViewMainTopUI._instance;
	}

	private recharge(event: TouchEvent) {
		event.stopImmediatePropagation();
		if (GGlobal.isIOS) {
			ViewAlert.show("由于苹果政策影响，iOS暂未开放充值", Handler.create(this, null), ViewAlert.OK);
		} else {
			ViewChongZhi.tryToOpenCZ();
		}
	}

	private buyTongbiHandler(event: TouchEvent) {
		event.stopImmediatePropagation();
		View_CaiLiao_GetPanel.show(VoItem.create(Enum_Attr.TONGBI));
	}

	private updatePlayerdata() {
		var vomine = Model_player.voMine;
		if (!vomine) return;
		this.lbYB.text = ConfigHelp.numToStr(vomine.yuanbao) + "";
		this.lbTongBi.text = ConfigHelp.numToStr(vomine.tongbi) + "";

		this.lbName.text = vomine.name;
		if (vomine.zsID > 0) {
			this.zsLvLb.text = Config.zhuansheng_705[vomine.zsID].lv;
		} else {
			this.zsLvLb.text = ""
		}
	}

	private updateGuanQia() {
		let s = this;
		s.btnAddYB.visible = !GGlobal.isIOS;
		s.lbYB.enabled = !GGlobal.isIOS;
		s.lbTongBi.enabled = !GGlobal.isIOS;
	}

	public listen() {
		let m = GGlobal.modelPlayer;
		let s = this;
		m.listen(Model_player.MSG_UPDATE, s.updatePlayerdata, s);
		m.listen(Model_player.YUANBAO_UPDATE, s.updatePlayerdata, s);
		m.listen(Model_player.TONGBI_UPDATE, s.updatePlayerdata, s);
		m.listen(Model_player.ZHUANSHENG_UPDATE, s.updatePlayerdata, s);
		GGlobal.control.listen(Enum_MsgType.SETTING_CHANGE_NAME, s.updatePlayerdata, s);
		GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, s.updateGuanQia, s);
		s.updatePlayerdata();
	}

	public remove() {
		//GGlobal.modelPlayer.listen(Model_player.MSG_UPDATE, this.updatePlayerdata, this);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, GGlobal.layerMgr.uiAlign);
	}

	public set visible(val) {
		if(!val && GGlobal.layerMgr.checkHasUIPanelBase()){
			return;
		}
		egret.superSetter(ViewMainTopUI, this, "visible", val);
	}

	public get visible(){
		return egret.superGetter(ViewMainTopUI, this, "visible");
	}
}