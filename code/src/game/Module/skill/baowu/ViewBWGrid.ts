class ViewBWGrid extends fairygui.GComponent {

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

	public static createInstance(): ViewBWGrid {
		return <ViewBWGrid><any>(fairygui.UIPackage.createObject("role", "ViewBWGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		CommonManager.parseChildren(a, a);
	}

	public isShow: boolean = true;
	private _vo: Vo_BaoWu;
	public set vo(vo: Vo_BaoWu) {
		let a = this;
		a._vo = vo;
		if (vo) {
			IconUtil.setImg(a.bg, Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png");
			IconUtil.setImg(a.imgIcon, Enum_Path.ICON70_URL + vo.icon + ".png");
			a.imgIcon.visible = true;
			if (vo.starLv > 0) {
				a.starGroup.visible = true;
				a.sourceGroup.visible = false;
				a.maskBg.visible = false;
				a.starLb.text = vo.starLv + "";
			} else {
				a.starGroup.visible = false;
				a.maskBg.visible = true;
				a.sourceGroup.visible = false;
			}
			if (a.isShow) {
				if (vo.state == 0 || vo.state == 1) {
					a.weal = true;
				} else {
					a.weal = false;
				}
				if (vo.state == 2 || vo.state == 4) {
					a.sourceLb.text = vo.way;
					a.maskBg.visible = true;
				} else {
					a.sourceLb.text = "";
					a.maskBg.visible = false;
				}
			} else {
				a.weal = false;
				a.maskBg.visible = false;
				a.choose = false;
			}
			a.nameLb.text = vo.name;
			a.nameLb.color = Color.getColorInt(vo.quality);
		} else {
			IconUtil.setImg(a.bg, Enum_Path.ICON70_URL + "BmG_1.png");
			IconUtil.setImg(a.imgIcon, null);
			a.maskBg.visible = false;
			a.nameLb.text = "";
			a.starGroup.visible = false;
			a.sourceGroup.visible = false;
			a.weal = false;
		}
	}

	public setSuitVo(v: Vo_BaoWu) {
		let a = this;
		a.vo = v;
		a.weal = false;
		a.checkNotice = false;
		a.choose = false;
	}

	public get vo(): Vo_BaoWu {
		return this._vo;
	}

	private _choose: boolean = false;
	public set choose(value: boolean) {
		let a = this;
		a.selectImg.visible = value;
		a._choose = value;
	}

	public get choose(): boolean {
		return this._choose;
	}

	public set weal(value: boolean) {
		this.wearImg.visible = value;
	}

	private _check: boolean = false;
	public set checkNotice(value: boolean) {
		let a = this;
		a.noticeImg.visible = value;
		a._check = value;
	}

	public get checkNotice(): boolean {
		return this._check;
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self.bg, null);
		IconUtil.setImg(self.imgIcon, null);
	}
}