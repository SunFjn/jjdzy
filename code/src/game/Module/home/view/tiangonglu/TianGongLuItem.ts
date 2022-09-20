/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class TianGongLuItem extends fairygui.GComponent {

	public grid: ViewGrid;
	public bg: fairygui.GImage;

	public static URL: string = "ui://y0plc878hvvjc";

	public static createInstance(): TianGongLuItem {
		return <TianGongLuItem><any>(fairygui.UIPackage.createObject("home", "TianGongLuItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this,this);
	}

	public showBg(v){
		this.bg.visible= v;
	}
}