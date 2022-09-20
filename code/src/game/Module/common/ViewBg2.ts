class ViewBg2 extends fairygui.GComponent {

	public iconImg: fairygui.GLoader;

	public static URL: string = "ui://jvxpx9em9c6t73";

	public static createInstance(): ViewBg2 {
		return <ViewBg2><any>(fairygui.UIPackage.createObject("common", "ViewBg2"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.iconImg = <fairygui.GLoader><any>(this.getChild("iconImg"));
		
		this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}
	private onAdd() {
		// ImageLoader.instance.loader(Enum_Path.BACK_URL + "bg2.jpg", this.iconImg);
		IconUtil.setImg(this.iconImg, Enum_Path.BACK_URL + "bg2.jpg");
	}
	private onRemove() {
		IconUtil.setImg(this.iconImg, null);
	}
}