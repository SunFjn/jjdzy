class WindowFrame1 extends fairygui.GLabel {

	public backImg: fairygui.GLoader;
	public bgImg: fairygui.GLoader;
	public closeButton: fairygui.GButton;

	public static URL: string = "ui://jvxpx9emv3t93c3";

	public static createInstance(): WindowFrame1 {
		return <WindowFrame1><any>(fairygui.UIPackage.createObject("common", "WindowFrame1"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.backImg = <fairygui.GLoader><any>(this.getChild("backImg"));
		this.bgImg = <fairygui.GLoader><any>(this.getChild("bgImg"));
		this.closeButton = <fairygui.GButton><any>(this.getChild("closeButton"));
		IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "bg.jpg");
		IconUtil.setImg(this.bgImg, Enum_Path.BACK_URL + "frameBg3.jpg");
		// this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		// this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		this.displayObject.cacheAsBitmap = true;
	}

	// private onAdd() {
	// 	IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "bg.jpg");
	// 	IconUtil.setImg(this.bgImg, Enum_Path.BACK_URL + "frameBg3.jpg");
	// }
	// private onRemove() {
	// 	IconUtil.setImg(this.backImg, null);
	// 	IconUtil.setImg(this.bgImg, null);
	// }
}