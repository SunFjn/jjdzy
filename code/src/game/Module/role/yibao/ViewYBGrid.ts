class ViewYBGrid extends fairygui.GComponent {

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
		let a = this;
		CommonManager.parseChildren(a, a);
	}

	public isShow: boolean = true;
	private _vo: Vo_YiBao;
	public set vo(vo: Vo_YiBao) {
		let a = this;
		a._vo = vo;
		if (vo) {
			IconUtil.setImg(a.bg, Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png");
			IconUtil.setImg(a.imgIcon, Enum_Path.ICON70_URL + vo.icon + ".png");
			a.imgIcon.visible = true;
			if (vo.starLv > 0) {
				a.starGroup.visible = true;
				a.sourceGroup.visible = false;
				a.starLb.text = vo.starLv + "";
				a.maskBg.visible = false;
			} else {
				a.starGroup.visible = false;
				a.sourceLb.text = vo.way;
				a.sourceGroup.visible = false;
				a.maskBg.visible = true;
			}
			a.nameLb.text = vo.name;
			a.nameLb.color = Color.getColorInt(vo.quality);
		} else {
			a.imgIcon.visible = false;
			a.nameLb.text = "";
			a.starGroup.visible = false;
			a.sourceGroup.visible = false;
			IconUtil.setImg(a.bg, null);
			IconUtil.setImg(a.imgIcon, null);
		}
	}

	public setSuitVo(v) {
		let a = this;
		a.vo = v;
		a.choose = false;
		a.checkNotice = false;
	}

	public get vo(): Vo_YiBao {
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
		self.choose = false;
		self.checkNotice = false;
	}
}