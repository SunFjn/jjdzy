class VHomeBtnMaid extends fairygui.GButton {

	public img:fairygui.GLoader;
	public noticeImg:fairygui.GImage;

	public static URL:string = "ui://y0plc878qeas20";

	public static createInstance():VHomeBtnMaid {
		return <VHomeBtnMaid><any>(fairygui.UIPackage.createObject("home","VHomeBtnMaid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.img = <fairygui.GLoader><any>(this.getChild("img"));
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