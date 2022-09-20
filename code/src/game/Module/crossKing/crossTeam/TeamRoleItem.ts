class TeamRoleItem extends fairygui.GComponent {

	public head: ViewHead;
	public levelLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public leaderImg: fairygui.GImage;
	public closeBt: Button2;

	public static URL: string = "ui://yqpfulefiad82y";

	public static createInstance(): TeamRoleItem {
		return <TeamRoleItem><any>(fairygui.UIPackage.createObject("crossKing", "TeamRoleItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.head = <ViewHead><any>(s.getChild("head"));
		s.levelLb = <fairygui.GRichTextField><any>(s.getChild("levelLb"));
		s.powerLb = <fairygui.GRichTextField><any>(s.getChild("powerLb"));
		s.leaderImg = <fairygui.GImage><any>(s.getChild("leaderImg"));
		s.closeBt = <Button2><any>(s.getChild("closeBt"));
		s.closeBt.addClickListener(s.delHanlder, s)
	}

	private delHanlder() {
		let s = this;
		if (s.memberID == Model_player.voMine.id) {
			GGlobal.modelCrossTeam.CG_TEAM_LEAVETEAM();
			GGlobal.modelCrossTeam.CG_LOOK_TEAM_DATA(Model_CrossTeam.fubenID);
		} else {
			GGlobal.modelCrossTeam.CG_TEAM_DELETE_MEMBER(s.memberID);
		}
	}

	private memberID: number;
	/**U:队员名字L:队员IDI:机器人IDS:头像IDS:头像框IDS:队员等级L:队员战力 */
	public setVo(arr: Array<any>) {
		let s = this;
		let type = arr[0];
		let nameStr = arr[1];
		let headId = arr[4];
		let frameId = arr[5];
		if (arr[3] > 0) {
			s.memberID = arr[3];
			s.head.setdata(RoleUtil.getHeadRole(headId), 0, nameStr, 0, true, RoleUtil.getHeadRole("" + frameId));
		} else {
			s.memberID = arr[2];
			s.head.setdata(headId, 0, nameStr, 0, false, frameId);
		}
		s.levelLb.text = "Lv." + arr[6];
		s.powerLb.text = "战力：" + ConfigHelp.numToStr(arr[7]);
		s.leaderImg.visible = type == 1;
		s.closeBt.visible = Model_CrossTeam.isLeader == 1 || s.memberID == Model_player.voMine.id;
	}
}