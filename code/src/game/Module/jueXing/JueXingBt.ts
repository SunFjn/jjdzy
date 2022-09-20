class JueXingBt extends fairygui.GButton {
	public noticeImg: fairygui.GImage;
	public static URL: string = "ui://tbqdf7fdzgylb";

	public static createInstance(): JueXingBt {
		return <JueXingBt><any>(fairygui.UIPackage.createObject("jueXing", "JueXingBt"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
	}

	public checkNotice(value) {
		this.noticeImg.visible = value;
	}
}