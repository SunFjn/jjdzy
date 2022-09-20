class ChildRankItem extends fairygui.GComponent {

	public labLevel: fairygui.GRichTextField;
	public ButtonVIP: fairygui.GButton;
	public lbVip: fairygui.GTextField;

	public static URL: string = "ui://y2wvab26kjeze";

	public static createInstance(): ChildRankItem {
		return <ChildRankItem><any>(fairygui.UIPackage.createObject("rank", "ChildRankItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let self = this;
		CommonManager.parseChildren(self, self);
		self.labLevel.addEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
	}


	public setTxt(txt, obj) {
		this.labLevel.text = txt;
		this._obj = obj
	}
	private _obj;
	private resize(): void {
		this.x = this._obj.x + this._obj.width / 2 - this.width / 2;
	}
}
