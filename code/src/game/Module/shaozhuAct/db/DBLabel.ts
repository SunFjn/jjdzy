/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


class DBLabel extends fairygui.GComponent {

	public n0: fairygui.GRichTextField;

	public static URL: string = "ui://w5ll6n5jhsa2e";

	public static createInstance(): DBLabel {
		return <DBLabel><any>(fairygui.UIPackage.createObject("shaozhuAct", "DBLabel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GRichTextField><any>(this.getChild("n0"));
		this.n0.color = 0xffffff;
	}

	public setText(str) {
		this.n0.text = str;
	}

	public reScroll() {
		this.scrollPane.setPercY(0);;
	}
}