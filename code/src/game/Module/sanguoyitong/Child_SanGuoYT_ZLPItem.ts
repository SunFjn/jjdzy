class Child_SanGuoYT_ZLPItem extends fairygui.GComponent {

	public nameLb: fairygui.GRichTextField;
	public jifenLb: fairygui.GRichTextField;
	public btn: fairygui.GButton;

	public static URL: string = "ui://z4ijxlqkiv4oe";

	public static createInstance(): Child_SanGuoYT_ZLPItem {
		return <Child_SanGuoYT_ZLPItem><any>(fairygui.UIPackage.createObject("sanGuoYiTong", "Child_SanGuoYT_ZLPItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.btn.addClickListener(self.OnBtn, self);
	}

	public setVo() {
		let self = this;
		// self.nameLb.text = 
	}

	private OnBtn() {

	}
}