class ItemLCQSTeam extends fairygui.GComponent {

	public head: ViewHead;
	public levelLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public leaderImg: fairygui.GImage;
	public closeBt: fairygui.GButton;

	public static URL: string = "ui://7a366usasr401i";

	public static createInstance(): ItemLCQSTeam {
		return <ItemLCQSTeam><any>(fairygui.UIPackage.createObject("zjyw", "ItemLCQSTeam"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
		this.closeBt.addClickListener(this.onClose, this);
	}

	private _vo: Vo_LiuChuQS;
	public setVo(v: Vo_LiuChuQS, isLeader) {
		this._vo = v;
		this.head.setdata(v.head, 0, v.name, 0, false, v.frame);
		this.levelLb.text = "Lv." + v.lv;
		this.powerLb.text = "战力:" + ConfigHelp.numToStr(v.power)
		this.leaderImg.visible = false;
		this.closeBt.visible = isLeader;
	}

	private onClose() {
		if(this._vo.plyId == Model_player.voMine.id){
			GGlobal.model_LiuChuQS.CG_LEAVE_8211(this._vo.teamId)
		}else{
			GGlobal.model_LiuChuQS.CG_REMOVE_MEMBER_8207(this._vo.plyId)
		}
	}

}