class ItemSYZLBTeam extends fairygui.GComponent {

	public head: ViewHead;
	public levelLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public leaderImg: fairygui.GImage;
	public closeBt: fairygui.GButton;

	public static URL: string = "ui://3o8q23uuhfuw7";

	public static createInstance(): ItemSYZLBTeam {
		return <ItemSYZLBTeam><any>(fairygui.UIPackage.createObject("syzlb", "ItemSYZLBTeam"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
		this.closeBt.addClickListener(this.onClose, this);
	}

	private _vo: Vo_Syzlb;
	public setVo(v: Vo_Syzlb, isLeader) {
		this._vo = v;
		this.head.setdata(v.head, 0, v.name, 0, false, v.frame);
		this.levelLb.text = "Lv." + v.lv;
		this.powerLb.text = "战力:" + ConfigHelp.numToStr(v.power)
		this.leaderImg.visible = (v.type == 1);
		this.closeBt.visible = isLeader;
	}

	private onClose() {
		if (this._vo.pId == Model_player.voMine.id) {
			GGlobal.model_Syzlb.CG_LEAVE_TEAM()
		} else {
			GGlobal.model_Syzlb.CG_KICK_OUT(this._vo.pId)
		}
	}

}