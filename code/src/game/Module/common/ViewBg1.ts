/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewBg1 extends fairygui.GComponent {

	public bg1: fairygui.GLoader;

	public static URL: string = "ui://jvxpx9emd2iu9v";

	public static createInstance(): ViewBg1 {
		return <ViewBg1><any>(fairygui.UIPackage.createObject("common", "ViewBg1"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.bg1 = <fairygui.GLoader><any>(this.getChild("bg1"));
		
		this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}
	private onAdd() {
		// ImageLoader.instance.loader(Enum_Path.BACK_URL + "bg1.png", this.bg1);
		IconUtil.setImg(this.bg1, Enum_Path.BACK_URL + "bg1.png");
	}
	private onRemove() {
		IconUtil.setImg(this.bg1, null);
	}
}