class JueXingIconBt extends fairygui.GButton {

	public noticeImg: fairygui.GImage;
	public selImg: fairygui.GImage;
	public static URL: string = "ui://tbqdf7fdzgylc";

	public static createInstance(): JueXingIconBt {
		return <JueXingIconBt><any>(fairygui.UIPackage.createObject("jueXing", "JueXingIconBt"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
		this.selImg = <fairygui.GImage><any>(this.getChild("selImg"));
	}

	public checkNotice(value) {
		this.noticeImg.visible = value;
	}

	public choose(value) {
		this.selImg.visible = value;
	}
}