class Child_ActCode extends fairygui.GComponent {

	public inputName: fairygui.GTextInput;
	public btnSure: fairygui.GButton;
	public n6: fairygui.GLoader;

	public static URL: string = "ui://ye1luhg3owbuf";

	public static createInstance(): Child_ActCode {
		return <Child_ActCode><any>(fairygui.UIPackage.createObject("Welfare", "Child_ActCode"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.btnSure.addClickListener(self.onSure, self);
	}

	public show(): void {
		this.inputName.text = ""
		IconUtil.setImg(this.n6, Enum_Path.BACK_URL+"act_code.png");
	}
	public disposePanel(): void {
		this.inputName.text = ""
		IconUtil.setImg(this.n6, null);
	}


	private onSure(): void {
		if (this.inputName.text == "") {
			return;
		}
		GGlobal.modelwelfare.CG_ACTIVATION_GET(this.inputName.text)
	}

	public clean() {

	}
}