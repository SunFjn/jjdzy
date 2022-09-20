/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class FengHuoLstIt extends fairygui.GComponent {

	public n0: fairygui.GRichTextField;

	public static URL: string = "ui://edvdots4m2dlw1t";

	public static createInstance(): FengHuoLstIt {
		return <FengHuoLstIt><any>(fairygui.UIPackage.createObject("FengHuoLY", "FengHuoLstIt"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GRichTextField><any>(this.getChild("n0"));
	}

	public setdate(name,camp){
		this.n0.text = name[1];
		this.n0.color = ModelFengHuoLY.PLAYERNAMECOLOR[camp];
	}
}