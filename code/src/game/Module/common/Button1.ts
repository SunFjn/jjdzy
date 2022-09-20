class Button1 extends fairygui.GButton {

	public noticeImg: fairygui.GImage;
	public static URL: string = "ui://jvxpx9emy1z8l";

	public static createInstance(): Button1 {
		return <Button1><any>(fairygui.UIPackage.createObject("common", "Button1"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
		this.noticeImg.visible = false;
	}

	private _checkNotice: boolean = false;
	public set checkNotice(value: boolean) {
		if(this._checkNotice != value){
			this._checkNotice = value;
			this.noticeImg.visible = value;
		}
	}

	public get checkNotice(): boolean {
		return this._checkNotice;
	}
}