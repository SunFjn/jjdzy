class ItemSYZLBJoin extends fairygui.GComponent {

	public head: ViewHead;
	public numLb: fairygui.GRichTextField;
	public joinBt: fairygui.GButton;

	public static URL: string = "ui://3o8q23uuhfuw8";

	public static createInstance(): ItemSYZLBJoin {
		return <ItemSYZLBJoin><any>(fairygui.UIPackage.createObject("syzlb", "ItemSYZLBJoin"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
		this.joinBt.addClickListener(this.onJoin, this);
	}

	private _vo: Vo_Syzlb;
	public set vo(v: Vo_Syzlb) {
		this._vo = v;
		this.head.setdata(v.head, 0, v.name, 0, false, v.frame);
		this.numLb.text = "人数：" + v.ct + "/3"
	}

	private onJoin() {
		GGlobal.model_Syzlb.CG_JOIN_BY_TEAMID(this._vo.teamId)
	}
}