/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

class ServerTabbutton extends fairygui.GButton {

	public static URL: string = "ui://a056duzjpc65h";

	public static createInstance(): ServerTabbutton {
		return <ServerTabbutton><any>(fairygui.UIPackage.createObject("Login", "ServerTabbutton"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		 if (this._titleObject)
				(this._titleObject as fairygui.GTextField).stroke = 0.8;
	}
}