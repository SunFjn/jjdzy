/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class TqIt extends fairygui.GComponent {

	public lb: fairygui.GRichTextField;

	public static URL: string = "ui://k82cjspump0412";

	public static createInstance(): TqIt {
		return <TqIt><any>(fairygui.UIPackage.createObject("tequan", "TqIt"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lb = <fairygui.GRichTextField><any>(this.getChild("lb"));
	}

	public setText(val){
		this.lb.text = val;
	}
}