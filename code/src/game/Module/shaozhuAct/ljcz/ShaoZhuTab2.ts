class ShaoZhuTab2 extends fairygui.GButton {

	public button: fairygui.Controller;
	public n0: fairygui.GImage;
	public n1: fairygui.GImage;
	public n2: fairygui.GImage;
	public n3: fairygui.GImage;
	public n6: fairygui.GImage;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://w5ll6n5jm02f1t";

	public static createInstance(): ShaoZhuTab2 {
		return <ShaoZhuTab2><any>(fairygui.UIPackage.createObject("shaozhuAct", "ShaoZhuTab2"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getController("button");
		this.n0 = <fairygui.GImage><any>(this.getChild("n0"));
		this.n1 = <fairygui.GImage><any>(this.getChild("n1"));
		this.n2 = <fairygui.GImage><any>(this.getChild("n2"));
		this.n3 = <fairygui.GImage><any>(this.getChild("n3"));
		this.n6 = <fairygui.GImage><any>(this.getChild("n6"));
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
	}

	public showYlq(v){
		this.n6.visible = v;
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