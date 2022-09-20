class ItemLCQSTeamJoin extends fairygui.GComponent {

	public head: ViewHead;
	public numLb: fairygui.GRichTextField;
	public joinBt: fairygui.GButton;

	public static URL: string = "ui://7a366usasr401k";

	public static createInstance(): ItemLCQSTeamJoin {
		return <ItemLCQSTeamJoin><any>(fairygui.UIPackage.createObject("zjyw", "ItemLCQSTeamJoin"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
		this.joinBt.addClickListener(this.onJoin, this);
	}

	private _vo;
	public set vo(v: { guan: number, name: string, teamId: number, headId: number, frameId: number, total: number }) {
		this._vo = v;
		this.head.setdata(v.headId, 0, v.name, 0, false, v.frameId);
		this.numLb.text = "人数：" + v.total + "/3"
	}

	private onJoin() {
		GGlobal.model_LiuChuQS.CG_JOIN_TEAM_8213(this._vo.teamId, this._vo.guan)
	}
}