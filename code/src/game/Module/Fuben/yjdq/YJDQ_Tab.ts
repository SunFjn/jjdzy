class YJDQ_Tab extends fairygui.GButton {
	public constructor() {
		super();
	}

	public static URL: string = "ui://pkuzcu87r4og10";

	public static createInstance(): YJDQ_Tab {
		return <YJDQ_Tab><any>(fairygui.UIPackage.createObject("FuBen", "YJDQ_Tab"));
	}

	private noticeImg: fairygui.GImage;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		a.noticeImg = a.getChild("noticeImg").asImage;
	}

	public checkNotice(value: boolean): void {
		this.noticeImg.visible = value;
	}
}