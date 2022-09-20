class Button4 extends fairygui.GButton {

	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://jvxpx9emiqo83ch";

	public static createInstance(): Button4 {
		return <Button4><any>(fairygui.UIPackage.createObject("common", "Button4"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
		// this.getTextField().stroke = 0.8;
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