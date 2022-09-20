/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

class ChaoJiTip extends fairygui.GComponent {

	public tip: fairygui.GGroup;
	public t0: fairygui.Transition;

	public static URL: string = "ui://vrw7je9rwuzz10";

	public static createInstance(): ChaoJiTip {
		return <ChaoJiTip><any>(fairygui.UIPackage.createObject("huoDong", "ChaoJiTip"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.tip = <fairygui.GGroup><any>(this.getChild("tip"));
		this.t0 = this.getTransition("t0");
	}
}