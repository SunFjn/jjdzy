class BtnLiuYi extends fairygui.GButton {

	public imgBg: fairygui.GLoader;
	public img: fairygui.GLoader;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://p83wyb2bad1l1y";

	public static createInstance(): BtnLiuYi {
		return <BtnLiuYi><any>(fairygui.UIPackage.createObject("ShaoZhu", "BtnLiuYi"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	private _vo: Vo_LiuYi_LY
	public set vo(v: Vo_LiuYi_LY) {
		this._vo = v;
		if (v) {
			IconUtil.setImg(this.img, Enum_Path.SHAOZHU_URL + v.lyId + "s.png");
			IconUtil.setImg(this.imgBg, Enum_Path.SHAOZHU_URL + v.lyId + ".png");
		}
	}

	public get vo() {
		return this._vo
	}

	private _lyId;
	public set lyId(v) {
		this._lyId = v;
		IconUtil.setImg(this.img, Enum_Path.SHAOZHU_URL + v + "s.png");
		IconUtil.setImg(this.imgBg, Enum_Path.SHAOZHU_URL + v + ".png");
	}

	public get lyId() {
		return this._lyId
	}

	private _open: boolean
	public set open(v) {
		let s = this;
		s._open = v;
		this.imgBg.grayed = !v;
		this.img.grayed = !v;
	}

	public get open() {
		return this._open;
	}

	public clean() {
		super.clean();
		IconUtil.setImg(this.img, null);
		IconUtil.setImg(this.imgBg, null);
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