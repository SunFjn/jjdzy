class TabButton extends fairygui.GButton {

	public noticeImg: fairygui.GImage;
	public n0: fairygui.GImage;
	public n1: fairygui.GImage;

	public static URL: string = "ui://jvxpx9embwmw3f";

	public static createInstance(): TabButton {
		return <TabButton><any>(fairygui.UIPackage.createObject("common", "TabButton"));
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
	
	public overrideClickFunc: Handler;
	protected __click(evt: egret.TouchEvent) {
		if (!this.overrideClickFunc) {
			super.__click(evt);
		} else {
			this.overrideClickFunc.runWith(evt);
		}
	}
	public onSuperClick(evt: egret.TouchEvent) {
		super.__click(evt);
	}
}