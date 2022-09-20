class frame3 extends fairygui.GLabel {

	//>>>>start
	public backImg: fairygui.GLoader;
	public bgImg: fairygui.GLoader;
	public closeButton: fairygui.GButton;
	public titleGroup: fairygui.GGroup;
	//>>>>end
	public static URL: string = "ui://jvxpx9emz1jw6v";

	public static createInstance(): frame3 {
		return <frame3><any>(fairygui.UIPackage.createObject("common", "frame3"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "bg.jpg");
		IconUtil.setImg(self.bgImg, Enum_Path.BACK_URL + "frameBg3.jpg");

		self.displayObject.cacheAsBitmap = true;
	}
	public setTitle(value: string) {
		this._iconObject.asLoader.url = value;
	}

	public setTitleVis(value: boolean) {
		this.titleGroup.visible = value;
	}
}