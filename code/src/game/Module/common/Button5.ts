class Button5 extends fairygui.GButton {

	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://jvxpx9emfy1c3fz";

	public static createInstance(): Button5 {
		return <Button5><any>(fairygui.UIPackage.createObject("common", "Button5"));
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