class ShaoZhuSkillItem extends fairygui.GComponent {

	public iconImg: fairygui.GLoader;
	public powerLb: fairygui.GLabel;
	public nameLb: fairygui.GRichTextField;
	public attLb: fairygui.GRichTextField;

	public static URL: string = "ui://p83wyb2blsg11g";

	public static createInstance(): ShaoZhuSkillItem {
		return <ShaoZhuSkillItem><any>(fairygui.UIPackage.createObject("ShaoZhu", "ShaoZhuSkillItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	public updateShow(cfg: Isonskill_267) {
		let self = this;
		IconUtil.setImg(self.iconImg, Enum_Path.SKILL_URL + cfg.icon + ".png");
		self.powerLb.text = cfg.power + "";
		self.nameLb.text = cfg.name;
		self.nameLb.color = Color.getColorInt(cfg.pz);
		self.attLb.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+", Color.getColorStr(2), Color.getColorStr(1));
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self.iconImg, null)
	}
}