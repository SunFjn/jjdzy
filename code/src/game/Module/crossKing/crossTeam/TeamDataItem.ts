class TeamDataItem extends fairygui.GComponent {

	public head: ViewHead;
	public numLb: fairygui.GRichTextField;
	public joinBt: fairygui.GButton;

	public static URL: string = "ui://yqpfulefoiih2z";

	public static createInstance(): TeamDataItem {
		return <TeamDataItem><any>(fairygui.UIPackage.createObject("crossKing", "TeamDataItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.head = <ViewHead><any>(s.getChild("head"));
		s.numLb = <fairygui.GRichTextField><any>(s.getChild("numLb"));
		s.joinBt = <fairygui.GButton><any>(s.getChild("joinBt"));
		s.joinBt.addClickListener(s.joinHandle, s);
	}

	private joinHandle(event: egret.TouchEvent) {
		GGlobal.modelCrossTeam.CG_TEAM_JOINTEAM(this.teamID, Model_CrossTeam.fubenID);
	}

	private teamID: number;
	/**U:队长名S:头像IDS:头像框IDB:总人数 */
	public setVo(nameStr: string, teamID: number, headId: number, frameId: number, roleNum: number) {
		let s = this;
		s.teamID = teamID;
		s.head.setdata(headId, 0, nameStr, 0, false, frameId);
		s.numLb.text = "人数：" + HtmlUtil.fontNoSize(roleNum + "/3", Color.getColorStr(2));
	}
}