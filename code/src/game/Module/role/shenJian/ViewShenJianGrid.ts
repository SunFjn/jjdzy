class ViewShenJianGrid extends fairygui.GComponent {

	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public selectImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public wearImg: fairygui.GImage;
	public maskBg: fairygui.GImage;
	public starLb: fairygui.GRichTextField;
	public starGroup: fairygui.GGroup;
	public sourceGroup: fairygui.GGroup;
	public sourceLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;

	public static URL: string = "ui://3tzqotadn4tus";
	public static createInstance(): ViewShenJianGrid {
		return <ViewShenJianGrid><any>(fairygui.UIPackage.createObject("role", "ViewBWGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		var s = this;
		CommonManager.parseChildren(s, s);
	}

	private _vo: Vo_ShenJian;
	public set vo(vo: Vo_ShenJian) {
		let self = this;
		self._vo = vo;
		if (vo) {
			IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png");
			IconUtil.setImg(self.imgIcon, Enum_Path.ICON70_URL + vo.icon + ".png");
			self.imgIcon.visible = true;
			if (vo.starLv > 0) {
				self.starGroup.visible = true;
				self.sourceGroup.visible = false;
				self.starLb.text = vo.starLv + "";
			} else {
				self.starGroup.visible = false;
				self.sourceGroup.visible = false;
			}
			if (vo.id == Model_ShenJian.shenJianId) {
				self.weal = true;
			} else {
				self.weal = false;
			}
			if (vo.starLv <= 0) {
				self.sourceLb.text = vo.way;
				self.maskBg.visible = true;
			} else {
				self.maskBg.visible = false;
			}
			self.nameLb.text = vo.name;
			self.nameLb.color = Color.getColorInt(vo.quality);
		} else {
			self.imgIcon.visible = false;
			self.nameLb.text = "";
			self.starGroup.visible = false;
			self.sourceLb.visible = false;
			self.weal = false;
			IconUtil.setImg(self.bg, null);
			IconUtil.setImg(self.imgIcon, null);
		}
	}

	public setSuitVo(v) {
		this.vo = v;
		this.choose = false;
		this.checkNotice = false;
	}

	public get vo(): Vo_ShenJian {
		return this._vo;
	}

	private _choose: boolean = false;
	public set choose(value: boolean) {
		this.selectImg.visible = value;
		this._choose = value;
	}

	public get choose(): boolean {
		return this._choose;
	}

	public set weal(value: boolean) {
		this.wearImg.visible = value;
	}

	private _check: boolean = false;
	public set checkNotice(value: boolean) {
		this.noticeImg.visible = value;
		this._check = value;
	}

	public get checkNotice(): boolean {
		return this._check;
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self.bg, null);
		IconUtil.setImg(self.imgIcon, null);
		self.choose = false;
		self.checkNotice = false;
	}
}