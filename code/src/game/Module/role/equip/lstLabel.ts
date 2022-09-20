/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class lstLabel extends fairygui.GComponent {

	public lbContent: fairygui.GRichTextField;

	public static URL: string = "ui://3tzqotadltpm19";

	public static createInstance(): lstLabel {
		return <lstLabel><any>(fairygui.UIPackage.createObject("role", "lstLabel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbContent = <fairygui.GRichTextField><any>(this.getChild("lbContent"));
	}

	public setText(str) {
		this.lbContent.text = str;
	}

	public reScroll() {
		this.scrollPane.setPercY(0);;
	}
}