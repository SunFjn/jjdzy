class GridTianMing extends fairygui.GButton {

	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public selectImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public lbName: fairygui.GRichTextField;
	public lbLv: fairygui.GRichTextField;

	public static URL: string = "ui://ehelf5bhh2o6p";

	public static createInstance(): GridTianMing {
		return <GridTianMing><any>(fairygui.UIPackage.createObject("lunhui", "GridTianMing"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
	}
	private _vo
	public set vo(v: VoTianMing) {
		let s = this;
		s.vv = v
		s.checkNotice = GGlobal.modellh.checkVo(v);
	}

	public set vo1(v: VoTianMing) {
		let s = this;
		s.vv = v
		s.lbName.text = ""
		s.checkNotice = false;
		s.selectImg.visible = false
	}

	private set vv(v: VoTianMing) {
		let s = this;
		s._vo = v;
		if (v.lvId == 0) {//未激活
			ImageLoader.instance.loader(Enum_Path.TIANMING_URL + v.id + "0" + ".png", s.imgIcon);
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_1.png", s.bg);
			s.lbLv.text = ""
			s.lbName.text = HtmlUtil.fontNoSize(v.cfg.lh + "世轮回开启", Color.REDSTR)
		} else {
			ImageLoader.instance.loader(Enum_Path.TIANMING_URL + v.id + "1" + ".png", s.imgIcon);
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + (v.pinId % 10) + ".png", s.bg);
			s.lbLv.text = "+" + (v.lvId % 100000);
			s.lbName.text = HtmlUtil.fontNoSize(v.cfg.name, Color.getColorStr(v.pinId % 10))
		}
		s.showEff(true)
	}

	public get vo() {
		return this._vo;
	}

	private _checkNotice: boolean = false;
	public set checkNotice(value: boolean) {
		this._checkNotice = value;
		this.noticeImg.visible = value;
	}

	public get checkNotice(): boolean {
		return this._checkNotice;
	}

	private effPart: Part;
	public showEff(v: boolean): void {
		let self = this;
		let quality = self.vo.pinId % 10
		if (v && self.vo && quality >= 5) {
			if (self.effPart) {
				EffectMgr.instance.removeEff(self.effPart);
				self.effPart = null;
			}
			if (self.effPart == null) {
				var idx = 0;
				if (quality >= 8) {
					idx = 10055;
				} else {
					idx = 10001 + (quality - 5);
					idx = idx > 10002 ? 10002 : idx;
				}
				self.effPart = EffectMgr.addEff("uieff/" + idx, self.displayListContainer, self.width / 2, self.height / 2, 800, -1);
			}
		} else {
			if (self.effPart) {
				EffectMgr.instance.removeEff(self.effPart);
				self.effPart = null;
			}
		}
	}

	public clean() {
		super.clean();
		this.showEff(false);
	}
}