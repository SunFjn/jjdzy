class TabButton1 extends fairygui.GButton {

	public noticeImg: fairygui.GImage;

	public static URL:string = "ui://jvxpx9emtli03cv";

	public static createInstance():TabButton1 {
		return <TabButton1><any>(fairygui.UIPackage.createObject("common","TabButton1"));
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