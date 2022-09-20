/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class SGZLBtn extends fairygui.GButton {

	//>>>>start
	public noticeImg: fairygui.GImage;
	//>>>>end

	public static URL: string = "ui://d5y9ngt6jt4v1o";

	public static createInstance(): SGZLBtn {
		return <SGZLBtn><any>(fairygui.UIPackage.createObject("actHolyBeast", "SGZLBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}
}
