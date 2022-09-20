
class ItemActComDbZpLabel extends fairygui.GComponent {

	public lb:fairygui.GRichTextField;

	public static URL:string = "ui://eh3eod8qve5s2";

	public static createInstance():ItemActComDbZpLabel {
		return <ItemActComDbZpLabel><any>(fairygui.UIPackage.createObject("actComDBZP","ItemActComDbZpLabel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lb = <fairygui.GRichTextField><any>(this.getChild("lb"));
		this.lb.color = 0xffffff;
	}

	public setText(str) {
		this.lb.text = str;
	}

	public reScroll() {
		this.scrollPane.setPercY(0);;
	}
}