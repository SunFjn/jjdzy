class VZhanJiaGrid extends fairygui.GButton {

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

	public static createInstance(): VZhanJiaGrid {
		return <VZhanJiaGrid><any>(fairygui.UIPackage.createObject("role", "ViewBWGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	private _vo: Iclothes_212;
	public set vo(v: Iclothes_212) {
		let self = this;
		self._vo = v;
		var quality = Model_ZhanJia.getZhanJiaQuality(v)
		var star = Model_ZhanJia.zhanjiaStar[v.id]
		if (star && star > 0) {
			self.starLb.text = star + "";
			self.starGroup.visible = true;
			self.maskBg.visible = false;
			self.sourceGroup.visible = false;
		} else {
			self.sourceLb.text = v.way;
			self.starGroup.visible = false;
			self.maskBg.visible = true;
			self.sourceGroup.visible = false;
		}
		self.nameLb.text = v.name
		self.nameLb.color = Color.getColorInt(quality)
		IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_" + quality + ".png");
		IconUtil.setImg(self.imgIcon, Enum_Path.ICON70_URL + v.icon + ".png");
		self.noticeImg.visible = Model_ZhanJia.checkStarVo(v)
	}

	public setSuitVo(v: any) {
		let self = this;
		self.vo = v;
		self.noticeImg.visible = false;
		self.selectImg.visible = false;
	}

	public get vo() {
		return this._vo;
	}

	public setIdStar(id): void {
		var v = Config.clothes_212[id]
		this.vo = v;
		this.noticeImg.visible = false
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self.bg, null);
		IconUtil.setImg(self.imgIcon, null);
		self.noticeImg.visible = false;
		self.selectImg.visible = false;
	}
}