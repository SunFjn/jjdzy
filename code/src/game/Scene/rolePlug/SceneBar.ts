/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class SceneBar extends fairygui.GProgressBar {

	public n0: fairygui.GImage;
	public bar: fairygui.GImage;

	public static URL: string = "ui://jvxpx9emlve29r";

	public static createInstance(): SceneBar {
		return <SceneBar><any>(fairygui.UIPackage.createObject("common", "SceneBar"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChild("n0"));
		this.bar = <fairygui.GImage><any>(this.getChild("bar"));
	}
}