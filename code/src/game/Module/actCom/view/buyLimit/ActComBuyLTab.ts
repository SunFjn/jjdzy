class ActComBuyLTab extends fairygui.GButton {

	public button: fairygui.Controller;
	public n0: fairygui.GImage;
	public n1: fairygui.GImage;
	public lb: fairygui.GTextField;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://vagtkxbkqsq27";

	public static createInstance(): ActComBuyLTab {
		return <ActComBuyLTab><any>(fairygui.UIPackage.createObject("actComBuyLimit", "ActComBuyLTab"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getController("button");
		this.n0 = <fairygui.GImage><any>(this.getChild("n0"));
		this.n1 = <fairygui.GImage><any>(this.getChild("n1"));
		this.lb = <fairygui.GTextField><any>(this.getChild("lb"));
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
	}

	private _vo: Ixhdxsqg_403[]
	public setVo(v: Ixhdxsqg_403[], hour, off) {
		this._vo = v;
		if (hour == v[0].opentime - off - 8) {
			this.lb.text = v[0].opentime + ":00\n抢购中"
			this.lb.color = Color.GREENINT
		} else {
			this.lb.text = v[0].opentime + ":00\n未开始"
			this.lb.color = Color.WHITEINT
		}
	}
	public get vo() {
		return this._vo
	}
}
