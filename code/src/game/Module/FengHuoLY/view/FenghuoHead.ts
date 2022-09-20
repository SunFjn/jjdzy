/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class FenghuoHead extends fairygui.GComponent {

	public imgHead: fairygui.GImage;
	public imgHeadGrid: fairygui.GImage;
	public lbName: fairygui.GTextField;

	public static URL: string = "ui://edvdots41266w1p";

	public static createInstance(): FenghuoHead {
		return <FenghuoHead><any>(fairygui.UIPackage.createObject("FengHuoLY", "FenghuoHead"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.imgHead = <fairygui.GImage><any>(this.getChild("imgHead"));
		this.imgHeadGrid = <fairygui.GImage><any>(this.getChild("imgHeadGrid"));
		this.lbName = <fairygui.GTextField><any>(this.getChild("lbName"));
	}
}