class TabButton4 extends TabButton {

	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://jvxpx9emiv1o3in";
	public static createInstance(): TabButton3 {
		return <TabButton3><any>(fairygui.UIPackage.createObject("common", "TabButton4"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		self.noticeImg = <fairygui.GImage><any>(self.getChild("noticeImg"));
		self.noticeImg.visible = false;
	}

	public setIcon(iconUrl) {
		let self = this;
		IconUtil.setImg(self._iconObject.asLoader, iconUrl);
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self._iconObject.asLoader, null);
	}
}