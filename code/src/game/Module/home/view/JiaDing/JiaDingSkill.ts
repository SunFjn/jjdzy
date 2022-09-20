class JiaDingSkill extends fairygui.GLabel {

	public static URL: string = "ui://ypo8uejwgz25a";

	public static createInstance(): JiaDingSkill {
		return <JiaDingSkill><any>(fairygui.UIPackage.createObject("JiaDing", "JiaDingSkill"));
	}

	public constructor() {
		super();
	}

	public vo: Ijdskill_021;
	public setVo(vo: Ijdskill_021) {
		let self = this;
		self.vo = vo;
		IconUtil.setImg(self._iconObject.asLoader, Enum_Path.ICON70_URL + vo.skill + ".png");
		self.text = vo.name;
		self.addClickListener(self.openTip, self);
	}

	private openTip() {
		GGlobal.layerMgr.open(UIConst.HOME_JIADING_SKILL, this.vo);
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self._iconObject.asLoader, null);
		self.removeClickListener(self.openTip, self);
	}
}