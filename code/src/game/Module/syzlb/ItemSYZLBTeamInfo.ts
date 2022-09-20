class ItemSYZLBTeamInfo extends fairygui.GComponent {

	public vHead: ViewHead;
	public lb: fairygui.GRichTextField;
	public btn: fairygui.GButton;

	public static URL: string = "ui://3o8q23uuqqnwf";

	public static createInstance(): ItemSYZLBTeamInfo {
		return <ItemSYZLBTeamInfo><any>(fairygui.UIPackage.createObject("syzlb", "ItemSYZLBTeamInfo"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
		s.btn.addClickListener(this.onClick, this)
	}

	private _vo;
	public setVo(v: Vo_Syzlb, isLeader) {
		let s = this;
		s._vo = v;
		this.vHead.setdata(v.head, -1, "", -1, false, v.frame);
		this.lb.text = v.name;
		s.btn.visible = isLeader
	}

	private onClick() {
		GGlobal.model_Syzlb.CG_CGE_LEADER(this._vo.pId);
	}
}