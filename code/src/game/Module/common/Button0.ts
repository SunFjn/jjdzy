class Button0 extends fairygui.GButton {

	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://jvxpx9emy1z8b";

	public static createInstance(): Button0 {
		return <Button0><any>(fairygui.UIPackage.createObject("common", "Button0"));
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