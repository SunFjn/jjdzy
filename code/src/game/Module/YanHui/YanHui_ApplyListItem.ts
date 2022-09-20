class YanHui_ApplyListItem extends fairygui.GComponent {

	public contentLb: fairygui.GRichTextField;
	public bt0: fairygui.GButton;
	public bt1: fairygui.GButton;

	public static URL: string = "ui://4x7dk3lhowxnz";

	public static createInstance(): YanHui_ApplyListItem {
		return <YanHui_ApplyListItem><any>(fairygui.UIPackage.createObject("YanHui", "YanHui_ApplyListItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	private vo: { rid: number, name: string };
	public setVo(vo: { rid: number, name: string }) {
		let self = this;
		self.vo = vo;
		self.contentLb.text = HtmlUtil.fontNoSize(vo.name, Color.GREENSTR) + "前来赴宴";
		self.bt0.addClickListener(self.OnBt0, self);
		self.bt1.addClickListener(self.OnBt1, self);
	}

	private OnBt1() {
		let model = GGlobal.modelYanHui;
		model.CG11483( 1, this.vo.rid);
	}

	private OnBt0() {
		let model = GGlobal.modelYanHui;
		model.CG11483( 0, this.vo.rid);
	}

	public clean() {
		let self = this;
		self.bt0.removeClickListener(self.OnBt0, self);
		self.bt1.removeClickListener(self.OnBt1, self);
	}
}