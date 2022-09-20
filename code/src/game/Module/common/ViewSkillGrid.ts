class ViewSkillGrid extends fairygui.GComponent {

	public imgBg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public labName: fairygui.GRichTextField;

	public static URL: string = "ui://jvxpx9emr3je3gj";

	public static createInstance(): ViewSkillGrid {
		return <ViewSkillGrid><any>(fairygui.UIPackage.createObject("common", "ViewSkillGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	private skillID: number;
	private index: number;
	private level: number;
	private job: number;
	private starLv: number;
	private damage: Number;
	/**
	 * value 技能ID
	 * index 技能类型
	 * job 角色职业
	 * skillLv 技能等级
	 * starLv 技能/人物星级
	 */
	public setVo(value: number, job, skillLv = 1, starLv = 1, index?: number, damage:number = 0) {
		let self = this;
		self.skillID = value;
		self.index = index;
		self.level = skillLv;
		self.starLv = starLv;
		self.job = job;
		self.damage = damage;
		var skill = Config.skill_210[value]
		if (skill) {
			self.labName.text = skill.n;
			IconUtil.setImg(self.imgIcon, Enum_Path.SKILL_URL + skill.icon + ".png");
			self.addClickListener(self.onClick, self);
		} else {
			self.labName.text = "";
			IconUtil.setImg(self.imgIcon, null);
			self.removeClickListener(self.onClick, self);
		}

	}

	private onClick(): void {
		let s = this;
		GGlobal.layerMgr.open(UIConst.TIP_WUJIANG_SKILLSHOW, { value: s.skillID, index: s.index, lv: s.level, job: s.job, starLv: s.starLv, type: 3, damage:s.damage });
	}

	public clean(): void {
		let self = this;
		self.removeClickListener(self.onClick, self);
		IconUtil.setImg(self.imgIcon, null);
	}
}