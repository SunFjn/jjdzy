class VCountryBtn extends fairygui.GButton {

	public img: fairygui.GLoader;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://uwzc58njiala1t";

	public static createInstance(): VCountryBtn {
		return <VCountryBtn><any>(fairygui.UIPackage.createObject("country", "VCountryBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.img = <fairygui.GLoader><any>(this.getChild("img"));
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
		this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}
	private onRemove() {
		IconUtil.setImg(this.img, null);
	}

	public setIcon(v) {
		// ImageLoader.instance.loader(Enum_Path.BACK_URL + "county" + v + ".jpg", this.img);
		IconUtil.setImg(this.img, Enum_Path.BACK_URL + "county" + v + ".jpg");
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