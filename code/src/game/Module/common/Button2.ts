class Button2 extends fairygui.GButton {

	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://jvxpx9emc14z16";

	public static createInstance(): Button2 {
		return <Button2><any>(fairygui.UIPackage.createObject("common", "Button2"));
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

	public scalRed(){
		this.noticeImg.x = -10;//按钮scaleX = -1 时需要把红点倒转下
	}

	public setNoticeXY(_x,_y){
		this.noticeImg.setXY(_x,_y);
	}
}