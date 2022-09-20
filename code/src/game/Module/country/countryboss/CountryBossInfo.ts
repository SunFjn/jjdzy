class CountryBossInfo extends fairygui.GComponent {

	public lbMyhurt: fairygui.GRichTextField;
	public btn: fairygui.GButton;

	public static URL: string = "ui://uwzc58njofde2k";

	public static createInstance(): CountryBossInfo {
		return <CountryBossInfo><any>(fairygui.UIPackage.createObject("country", "CountryBossInfo"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbMyhurt = <fairygui.GRichTextField><any>(this.getChild("lbMyhurt"));
		this.btn = <fairygui.GButton><any>(this.getChild("btn"));
	}

	private click() {
		GGlobal.layerMgr.open(UIConst.COUNTRYBOSS_RANK1);
	}

	public listen() {
		let s = this;
		s.btn.addClickListener(s.click, s);
		GGlobal.modelCtryBoss.listen(ModelCtryBoss.msg_batInfo, s.setdata, s);
		s.resetPosition();
	}

	public removeList() {
		let s = this;
		s.btn.removeClickListener(s.click, s);
		GGlobal.modelCtryBoss.remove(ModelCtryBoss.msg_batInfo, s.setdata, s);
	}

	private static instance: CountryBossInfo;
	public static show() {
		let s = this;
		if (!s.instance) s.instance = s.createInstance();
		s.instance.listen();
		GGlobal.layerMgr.UI_floorUI_1.addChild(s.instance);
	}

	public static hide() {
		let s = this;
		s.instance.removeList();
		s.instance.clearDatta();
		if (s.instance.parent) GGlobal.layerMgr.UI_floorUI_1.removeChild(s.instance);
	}

	public setdata() {
		let s = this;
		var d = GGlobal.modelCtryBoss.battleInfo.others;
		if (d.length) {
			s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(GGlobal.modelCtryBoss.battleInfo.myDamage) + "               " + d[0].name + "：" + ConfigHelp.getYiWanText(d[0].demage);
		} else {
			s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(GGlobal.modelCtryBoss.battleInfo.myDamage);
		}
	}

	private clearDatta() {
		let s = this;
		s.lbMyhurt.text = "";
	}

	public resetPosition(): void {
		let s = this;
		s.setXY((fairygui.GRoot.inst.width - s.width) >> 1, 380);
	}
}