class VDengFengBet extends fairygui.GButton {

	public head: ViewHead;
	public check: fairygui.GButton;
	public lbName: fairygui.GRichTextField;
	public lbPower: fairygui.GRichTextField;

	public static URL: string = "ui://3o8q23uua0u327";

	public static createInstance(): VDengFengBet {
		return <VDengFengBet><any>(fairygui.UIPackage.createObject("syzlb", "VDengFengBet"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
		s.check.touchable = false;
	}

	private _vo
	public set vo(v: Vo_DengFengZJ) {
		let s = this;
		s._vo = v;
		let m = GGlobal.modelDengFengZJ
		if (v) {
			s.head.setdata(v.head, -1, "", -1, false, v.frame);
			s.check.selected = m.finalBetId == v.plyId;
		} else {
			s.head.setdata();
			s.check.visible = false;
		}
		s.lbName.text = v ? v.name : ""
		s.lbPower.text = v ? "战力：" + v.power : ""
	}

	public get vo() {
		return this._vo
	}
}