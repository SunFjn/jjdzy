class ItemLeiTaiReport extends fairygui.GComponent {

	public lb: fairygui.GRichTextField;

	public static URL: string = "ui://rhfap29iwf0hb";

	public static createInstance(): ItemLeiTaiReport {
		return <ItemLeiTaiReport><any>(fairygui.UIPackage.createObject("actComLeiTai", "ItemLeiTaiReport"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public set vo(v) {
		this.lb.text = v;
	}
}