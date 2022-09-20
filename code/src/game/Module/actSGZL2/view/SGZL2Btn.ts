/**
 * @author: lujiahao 
 * @date: 2019-11-15 10:45:01 
 */
class SGZL2Btn extends fairygui.GButton {

	//>>>>start
	public noticeImg: fairygui.GImage;
	//>>>>end

	public static URL: string = "ui://ggwi8wepqhocd";

	public static createInstance(): SGZL2Btn {
		return <SGZL2Btn><any>(fairygui.UIPackage.createObject("actComSgzl2", "SGZL2Btn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}
}
