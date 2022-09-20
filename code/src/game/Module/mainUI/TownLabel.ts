class TownLabel extends fairygui.GButton {

	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://p8pwr887idjlw";

	public static createInstance(): TownLabel {
		return <TownLabel><any>(fairygui.UIPackage.createObject("MainTown", "TownLabel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
		this.checkNotice(false);
	}

	public checkNotice(value: boolean) {
		this.noticeImg.visible = value;
	}
}