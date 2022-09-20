/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ServerBtn extends fairygui.GButton {

	public button: fairygui.Controller;
	public hot: fairygui.GLoader;

	public static URL: string = "ui://a056duzjpc65l";

	public static createInstance(): ServerBtn {
		return <ServerBtn><any>(fairygui.UIPackage.createObject("Login", "ServerBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getController("button");
		this.hot = <fairygui.GLoader><any>(this.getChild("hot"));
	}

	//-1预备服 0：维护，1：正常，2：火爆，3：白名单
	public setSt(st,str){
		this.hot.visible = true;
		this.hot.url = ["ui://a056duzjpc659","ui://a056duzjpc658","ui://a056duzjpc657"][st];
		if(st == -1)str += "[预备服]";
		this.text = str;
	}
}