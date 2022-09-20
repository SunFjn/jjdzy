class BtnQianNeng extends fairygui.GButton {

	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://p83wyb2bo89h3z";

	public static createInstance(): BtnQianNeng {
		return <BtnQianNeng><any>(fairygui.UIPackage.createObject("ShaoZhu", "BtnQianNeng"));
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