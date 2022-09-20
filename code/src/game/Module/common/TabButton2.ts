class TabButton2 extends fairygui.GButton {

	public noticeImg: fairygui.GImage;
	public n1: fairygui.GImage;
	public n0: fairygui.GImage;

	public static URL:string = "ui://jvxpx9em6hpm3ft";

	public static createInstance():TabButton2 {
		return <TabButton2><any>(fairygui.UIPackage.createObject("common","TabButton2"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
	}

	private _checkNotice: boolean = false;
	public set checkNotice(value: boolean) {
		this._checkNotice = value;
		this.noticeImg.visible = value;
	}

	public get checkNotice(): boolean {
		return this._checkNotice;
	}
}