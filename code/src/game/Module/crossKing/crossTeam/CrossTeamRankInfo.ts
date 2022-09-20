class CrossTeamRankInfo extends fairygui.GComponent {

	public lbMyhurt: fairygui.GRichTextField;
	public btn: fairygui.GButton;

	public static URL: string = "ui://yqpfulefl3q83k";

	public static createInstance(): CrossTeamRankInfo {
		return <CrossTeamRankInfo><any>(fairygui.UIPackage.createObject("crossKing", "CrossTeamRankInfo"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.lbMyhurt = <fairygui.GRichTextField><any>(this.getChild("lbMyhurt"));
		this.btn = <fairygui.GButton><any>(this.getChild("btn"));
	}

	public listen() {
		let s = this;
		GGlobal.control.listen(Enum_MsgType.CROSS_TEAM_RANK_UPDATE, s.setdata, s);
		s.resetPosition();
	}

	public removeList() {
		let s = this;
		GGlobal.control.remove(Enum_MsgType.CROSS_TEAM_RANK_UPDATE, s.setdata, s);
	}

	private static instance: CrossTeamRankInfo;
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
		var d = Model_CrossTeam.rankData;
		if (d.length) {
			s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(Model_CrossTeam.myhurt) + "               " + d[0][0] + "：" + ConfigHelp.getYiWanText(d[0][1]);
		} else {
			s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(Model_CrossTeam.myhurt);
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