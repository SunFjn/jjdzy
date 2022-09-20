class VWuJiangSkillS extends fairygui.GComponent {

	public imgBg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public labName: fairygui.GTextField;
	public labName1: fairygui.GTextField;

	public static URL: string = "ui://jvxpx9eml0xet";

	public static createInstance(): VWuJiangSkillS {
		return <VWuJiangSkillS><any>(fairygui.UIPackage.createObject("common", "VWuJiangSkillS"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
	}

	private _vo: number;
	private _index: number;
	private _level;
	private _params;
	public setVo(value: number, index: number, level: number = 0, params?: any) {
		this._vo = value;
		this._index = index;
		this._params = params;
		this._level = level;
		var skill = Config.skill_210[value]
		if (skill) {
			this.labName.text = skill.n
			this.labName1.text = skill.n
			ImageLoader.instance.loader(Enum_Path.SKILL_URL + skill.icon + ".png", this.imgIcon);
			this.imgIcon.visible = true;
			this.addClickListener(this.onClick, this);
		} else {
			this.labName.text = "";
			this.labName1.text = "";
			this.imgIcon.visible = false;
			this.removeClickListener(this.onClick, this);
		}

	}

	private onClick(): void {
		if (this._vo) {
			if (this._index == 4) {
				GGlobal.layerMgr.open(UIConst.TIANFU_SKILL_SHOW, { skillid: this._vo, level: this._level, id: this._params.id });
				return;
			}
			// GGlobal.layerMgr.open(UIConst.TIP_WUJIANG_SKILLS, this._vo)

			var level = 0;
			let starLv = 0;
			var skillList = Model_player.voMine.skillList;
			var cfgids: Array<number> = JSON.parse(Config.hero_211[Model_player.voMine.job].attack);
			if (skillList[cfgids.length + this._index]) {
				level = skillList[cfgids.length + this._index].level;
			}
			var job = Config.skill_210[this._vo].job;
			if (Config.hero_211[job].godhero == 1) {
				if (!ModelGodWuJiang.getWuJiangIsActivation(job)) {
					level = 1;
				}
				starLv = ModelGodWuJiang.wuJiangStar(job);
			} else {
				if (!Model_WuJiang.wuJiangStar[job]) {//没激活
					level = 1;
				}
				starLv = Model_WuJiang.wuJiangStar[job];
			}
			let damage:number = 0;
			let shenjiangzhiliSkillLv:number = Model_WuJiang.shenjiangzhiliSkillLv[job]? Model_WuJiang.shenjiangzhiliSkillLv[job] : 0;
			let godskillCfg:Iherogodskill_211 = Config.herogodskill_211[job * 100 + shenjiangzhiliSkillLv];
			if(godskillCfg)
			{
				let arr = JSON.parse(godskillCfg.attpg);
				let len:number = arr.length;
				for(let i:number = 0;i < len;i ++)
				{
					if(arr[i][0] == this._vo)
					{
						damage = arr[i][1];
						break;
					}
				}
			}
			GGlobal.layerMgr.open(UIConst.TIP_WUJIANG_SKILLSHOW, { value: this._vo, index: this._index, lv: level, job: job, starLv: starLv, type: 1, damage:damage});
		}
	}

	public dispose(): void {
		this.removeClickListener(this.onClick, this);
	}
}