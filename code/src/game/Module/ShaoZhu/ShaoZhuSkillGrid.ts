class ShaoZhuSkillGrid extends fairygui.GLabel {

	public iconImg: fairygui.GLoader;
	public lockImg: fairygui.GImage;
	public selImg: fairygui.GImage;
	public lookBt: Button2;

	public static URL: string = "ui://p83wyb2bng03d";

	public static createInstance(): ShaoZhuSkillGrid {
		return <ShaoZhuSkillGrid><any>(fairygui.UIPackage.createObject("ShaoZhu", "ShaoZhuSkillGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.selImg.visible = false;
		self.lookBt.addClickListener(self.OnLook, self);
	}

	private OnLook() {
		GGlobal.layerMgr.open(UIConst.SHAOZHU_ONESKILL, this.cfg);
	}

	public cfg: Isonskill_267;
	public updateShow(nameStr: string, iconStr: string, isLock: boolean = false) {
		let self = this;
		if (isLock) {
			IconUtil.setImg(self.iconImg, null);
		} else {
			if (iconStr) {
				IconUtil.setImg(self.iconImg, Enum_Path.SKILL_URL + iconStr + ".png");
			} else {
				IconUtil.setImg(self.iconImg, null);
			}
		}
		self.setLock(isLock);
		if (nameStr) {
			self.title = nameStr;
		} else {
			self.title = "";
		}
		self.lookBt.visible = self.cfg ? true : false;
	}

	public choose(value: boolean) {
		this.selImg.visible = value;
	}

	public setLock(value) {
		this.lockImg.visible = value;
	}

	public clean() {
		let self = this;
		self.cfg = null;
		IconUtil.setImg(self.iconImg, null);
		self.selImg.visible = false;
	}
}