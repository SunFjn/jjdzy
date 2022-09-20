class MineralTeamItem extends fairygui.GComponent {

	public head: ViewHead;
	public closeBt: fairygui.GButton;
	public singImg: fairygui.GImage;
	public numLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;

	public static URL: string = "ui://yqpfulefnyv752";

	public static createInstance(): MineralTeamItem {
		return <MineralTeamItem><any>(fairygui.UIPackage.createObject("crossKing", "MineralTeamItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.closeBt.addClickListener(self.OnClose, self);
	}

	private OnClose() {
		if (this.vo.roleId == Model_player.voMine.id) {
			GGlobal.modelCrossMineral.CG_LEAVE_MINE();
		} else {
			GGlobal.modelCrossMineral.CG_KICK_MINE(this.vo.roleId);
		}
	}

	private vo: Vo_MineRole;
	public setVo(vo: Vo_MineRole, mineId: number, times: number, isShowClose: boolean = true) {
		let self = this;
		self.vo = vo;
		if (vo) {
			self.head.setdata(vo.headID, -1, null, 0, false, vo.frameID, vo.country);
			self.singImg.visible = vo.roleId == mineId;
			self.closeBt.visible = vo.roleId != mineId && (mineId == Model_player.voMine.id
				|| vo.roleId == Model_player.voMine.id) && times == -1 && isShowClose;
			self.numLb.text = "战力：" + ConfigHelp.getYiWanText(vo.power);
			self.nameLb.text = vo.roleName + "";
		} else {

		}
	}
}