class VZhenYanBtn extends fairygui.GButton {

	public img: fairygui.GLoader;
	public lb: fairygui.GRichTextField;
	public star: fairygui.GImage;
	public starBg: fairygui.GImage;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://xrzn9ppacaql22";

	public static createInstance(): VZhenYanBtn {
		return <VZhenYanBtn><any>(fairygui.UIPackage.createObject("baZhenTu", "VZhenYanBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
	}

	private _data


	public set data(v: VoZhenYan) {
		let s = this;
		s._data = v;
		IconUtil.setImg(s.img, Enum_Path.ZHENYAN_URL + v.cfg.tb + ".png");
		
		s.img.grayed = v.lv == 0
		let m = GGlobal.modelZhenYan;
		s.checkNotice = m.isRedYan(v);

		if(v.star == 0){
			s.lb.text =""
			s.star.visible = false;
			s.starBg.visible = false;
		}else{
			s.lb.text = v.star + ""
			s.star.visible = true;
			s.starBg.visible = true;
		}
	}

	public get data() {
		return this._data
	}

	public clean() {
		super.clean();
		let s = this;
		IconUtil.setImg(s.img, null);
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