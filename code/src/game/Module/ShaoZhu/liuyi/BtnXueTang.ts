class BtnXueTang extends fairygui.GButton {

	public imgBg: fairygui.GLoader;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://p83wyb2bkc1n2b";

	public static createInstance(): BtnXueTang {
		return <BtnXueTang><any>(fairygui.UIPackage.createObject("ShaoZhu", "BtnXueTang"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}


	public set vo(v: Vo_LiuYi) {
		let s = this;
		IconUtil.setImg(s.imgBg, Enum_Path.SHAOZHU_URL + "pic" + v.xtId + ".png");
		s.imgBg.grayed = false;
	}

	public set cfg(v: Isonsixschool_267) {
		let s = this;
		IconUtil.setImg(s.imgBg, Enum_Path.SHAOZHU_URL + "pic" + v.id + ".png");
		s.imgBg.grayed = true;
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