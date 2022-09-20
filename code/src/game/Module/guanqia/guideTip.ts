/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class guideTip extends fairygui.GComponent {

	public imgAuto: fairygui.GLoader;
	public g2: fairygui.GGroup;

	public static URL: string = "ui://7gxkx46wfzsd55";

	public static createInstance(): guideTip {
		return <guideTip><any>(fairygui.UIPackage.createObject("MainUI", "guideTip"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.imgAuto = <fairygui.GLoader><any>(this.getChild("imgAuto"));
		this.g2 = <fairygui.GGroup><any>(this.getChild("g2"));
	}
}