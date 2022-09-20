class VZhenYanBtnBig extends fairygui.GButton {

	public lb: fairygui.GRichTextField;
	public star: fairygui.GImage;
	public starBg: fairygui.GImage;
	public imgBg: fairygui.GLoader;
	public img: fairygui.GLoader;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://xrzn9ppacaql23";

	public static createInstance(): VZhenYanBtnBig {
		return <VZhenYanBtnBig><any>(fairygui.UIPackage.createObject("baZhenTu", "VZhenYanBtnBig"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
	}

	private _data
	public set data(v: number) {
		let s = this;
		s._data = v;
		
		IconUtil.setImg(s.img, Enum_Path.ZHENYAN_URL + "zhyXin.png");
		IconUtil.setImg(s.imgBg, Enum_Path.ZHENYAN_URL + "zhyXinBg.png");
		s.img.grayed = (v % 1000 == 0)
		let m = GGlobal.modelZhenYan;
		s.checkNotice = m.isRedXin();

		if(v % 1000 == 0){
			s.lb.text =""
			s.star.visible = false;
			s.starBg.visible = false;
		}else{
			s.lb.text = v % 1000 + ""
			s.star.visible = true;
			s.starBg.visible = true;
		}
	}

	public get data() {
		return this._data
	}

	public clean() {
		let s = this;
		IconUtil.setImg(s.img, null);
		IconUtil.setImg(s.imgBg, null);
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