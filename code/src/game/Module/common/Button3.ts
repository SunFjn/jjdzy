class Button3 extends fairygui.GButton {

	public imgNotice: fairygui.GImage;

	public static URL: string = "ui://jvxpx9emkvh16z";

	public static createInstance(): Button3 {
		return <Button3><any>(fairygui.UIPackage.createObject("common", "Button3"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.imgNotice = <fairygui.GImage><any>(this.getChild("imgNotice"));
	}

	private _checkNotice: boolean = false;
	public set checkNotice(value: boolean) {
		this._checkNotice = value;
		this.imgNotice.visible = value;
	}

	public get checkNotice(): boolean {
		return this._checkNotice;
	}
}