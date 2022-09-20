/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


class FengHuoLYBottom extends fairygui.GComponent {

	public btnOut: fairygui.GButton;
	public btnFollow: fairygui.GButton;
	public n3: fairygui.GTextField;

	public static URL: string = "ui://edvdots4srrs2";

	private static inst: FengHuoLYBottom;
	public static createInstance(): FengHuoLYBottom {
		if (!this.inst)
			this.inst = <FengHuoLYBottom><any>(fairygui.UIPackage.createObject("FengHuoLY", "FengHuoLYBottom"));
		return this.inst;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.btnOut = <fairygui.GButton><any>(this.getChild("btnOut"));
		this.btnFollow = <fairygui.GButton><any>(this.getChild("btnFollow"));
		this.n3 = <fairygui.GTextField><any>(this.getChild("n3"));
	}
}