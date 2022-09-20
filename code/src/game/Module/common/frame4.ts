class frame4 extends fairygui.GLabel {

	public backImg: fairygui.GLoader;
	public closeButton: fairygui.GButton;

	public static URL: string = "ui://jvxpx9emfsg93cj";

	public static createInstance(): frame4 {
		return <frame4><any>(fairygui.UIPackage.createObject("common", "frame4"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.backImg = <fairygui.GLoader><any>(this.getChild("backImg"));
		this.closeButton = <fairygui.GButton><any>(this.getChild("closeButton"));
		IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "bg.jpg");
		// this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		// this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.displayObject.cacheAsBitmap = true;
	}

	// private onAdd() {
	// 	IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "bg.jpg");
	// }
	
	// private onRemove() {
	// 	IconUtil.setImg(this.backImg, null);
	// }
}