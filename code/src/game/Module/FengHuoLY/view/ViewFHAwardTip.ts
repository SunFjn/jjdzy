/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


class ViewFHAwardTip extends fairygui.GComponent {

	public n0: fairygui.GTextField;
	public btn: fairygui.GButton;

	public static URL: string = "ui://edvdots4srrsa";

	public static createInstance(): ViewFHAwardTip {
		return <ViewFHAwardTip><any>(fairygui.UIPackage.createObject("FengHuoLY", "ViewFHAwardTip"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GTextField><any>(this.getChild("n0"));
		this.btn = <fairygui.GButton><any>(this.getChild("btn"));
	}
}