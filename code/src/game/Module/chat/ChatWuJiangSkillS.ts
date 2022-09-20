class ChatWuJiangSkillS extends fairygui.GComponent {

	public imgBg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public labName: fairygui.GTextField;

	public static URL: string = "ui://fx4pr5qewjpa2c";

	public static createInstance(): ChatWuJiangSkillS {
		return <ChatWuJiangSkillS><any>(fairygui.UIPackage.createObject("chat", "ChatWuJiangSkillS"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.imgBg = <fairygui.GLoader><any>(s.getChild("imgBg"));
		s.imgIcon = <fairygui.GLoader><any>(s.getChild("imgIcon"));
		s.labName = <fairygui.GTextField><any>(s.getChild("labName"));
	}

	private skillID: number;
	private _index: number;
	private level: number;
	private job: number;
	private starLv: number;
	private params;
	private damage: number;
	public setVo(value: number, index: number, skillLv, job, starLv, params?:any, damage:number = 0) {
		let s = this;
		s.skillID = value;
		s._index = index;
		s.level = skillLv;
		s.starLv = starLv;
		s.params = params;
		s.job = job;
		s.damage = damage;
		var skill = Config.skill_210[value]
		if (skill) {
			if (index==4){
				s.labName.text = skill.n+" Lv."+skillLv;
			} else {
				s.labName.text = skill.n
			}
			ImageLoader.instance.loader(Enum_Path.SKILL_URL + skill.icon + ".png", s.imgIcon);
			s.imgIcon.visible = true;
			s.addClickListener(s.onClick, this);
		} else {
			s.labName.text = "";
			s.imgIcon.visible = false;
			s.removeClickListener(s.onClick, this);
		}
	}

	private onClick(): void {
		let s = this;
		if (s._index == 4) {//天赋技能不能展示
			GGlobal.layerMgr.open(UIConst.TIANFU_SKILL_SHOW, { level: s.level,skillid:s.skillID, id: s.params.id });
		} else {
			GGlobal.layerMgr.open(UIConst.TIP_WUJIANG_SKILLSHOW, { value: s.skillID, index: s._index, lv: s.level, job: s.job, starLv: s.starLv, type: 3, damage:s.damage });
		}
	}
}