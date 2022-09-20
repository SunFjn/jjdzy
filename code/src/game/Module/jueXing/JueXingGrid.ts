class JueXingGrid extends fairygui.GComponent {

	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public starLb: fairygui.GRichTextField;
	public starGroup: fairygui.GGroup;
	public nameLb: fairygui.GRichTextField;
	public selectImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://tbqdf7fdb8g16";

	public static createInstance(): JueXingGrid {
		return <JueXingGrid><any>(fairygui.UIPackage.createObject("jueXing", "JueXingGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.bg = <fairygui.GLoader><any>(this.getChild("bg"));
		this.imgIcon = <fairygui.GLoader><any>(this.getChild("imgIcon"));
		this.starLb = <fairygui.GRichTextField><any>(this.getChild("starLb"));
		this.starGroup = <fairygui.GGroup><any>(this.getChild("starGroup"));
		this.nameLb = <fairygui.GRichTextField><any>(this.getChild("nameLb"));
		this.selectImg = <fairygui.GImage><any>(this.getChild("selectImg"));
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
	}

	public vo: Vo_JueXing;
	public setVo(vo: Vo_JueXing) {
		let self = this;
		self.vo = vo;
		IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png");
		if (vo.type == 1 ||vo.type == 8) {
			IconUtil.setImg(self.imgIcon,Enum_Path.HEAD_URL + vo.icon + ".png");
		} else {
			IconUtil.setImg(self.imgIcon, Enum_Path.ICON70_URL + vo.icon + ".png");
		}
		self.imgIcon.visible = true;
		if (vo.starLv > 0) {
			self.starGroup.visible = true;
			self.starLb.text = vo.starLv + "";
		} else {
			self.starGroup.visible = false;
		}
		self.nameLb.text = vo.name;
		self.nameLb.color = Color.getColorInt(vo.quality);
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
	}
}