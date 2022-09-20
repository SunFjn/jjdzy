/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class SceneDropView extends fairygui.GComponent {

	public n0: fairygui.GLoader;
	public n1: fairygui.GRichTextField;
	public n2: fairygui.GLoader;

	public static URL: string = "ui://jvxpx9emqxkh3fn";

	public static createInstance(): SceneDropView {
		return <SceneDropView><any>(fairygui.UIPackage.createObject("common", "SceneDropView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GLoader><any>(this.getChild("n0"));
		this.n1 = <fairygui.GRichTextField><any>(this.getChild("n1"));
		this.n2 = <fairygui.GLoader><any>(this.getChild("n2"));
	}
}