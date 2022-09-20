class Child_GodSkill extends fairygui.GComponent implements IPanel {

	//>>>>start
	public godSkillBack: fairygui.GLoader;
	public iconBt0: Button2;
	public iconBt2: Button2;
	public iconBt1: Button2;
	public nameImg: fairygui.GLoader;
	public skillIcon: fairygui.GLoader;
	public lvLb0: fairygui.GRichTextField;
	public lvLb1: fairygui.GRichTextField;
	public lvLb2: fairygui.GRichTextField;
	public skillName: fairygui.GRichTextField;
	public skillDes: fairygui.GRichTextField;
	public skillCon: fairygui.GRichTextField;
	//>>>>end

	public iconBtArr: Array<Button2> = [];
	public lvLbArr: Array<fairygui.GRichTextField> = [];

	public static URL: string = "ui://c7onhgk8c14zn";

	public static createInstance(): Child_GodSkill {
		return <Child_GodSkill><any>(fairygui.UIPackage.createObject("Skill", "Child_GodSkill"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.open();
	}

	closePanel(pData?: any) {
		this.close();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);

		for (let i = 0; i < 3; i++) {
			let iconBt0: Button2 = <Button2><any>(self.getChild("iconBt" + i));
			iconBt0.data = i;
			let lvLb0: fairygui.GRichTextField = <fairygui.GRichTextField><any>(self.getChild("lvLb" + i));
			self.lvLbArr.push(lvLb0);
			self.iconBtArr.push(iconBt0);
		}
	}

	private iconHandler(event: egret.TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.GODSKILL_ZHENYAN, this.vo.zhenYanArr[event.target.data]);
	}

	public vo: Vo_Skill;
	public updateShow() {
		const self = this;
		let vo;
		let len: number = Model_player.voMine.skillList.length;
		for (let i = 0; i < len; i++) {
			if (Model_player.voMine.skillList[i].type == Model_Skill.TYPE3) {
				vo = Model_player.voMine.skillList[i];
				break;
			}
		}
		self.vo = vo;
		if (vo) {
			self.skillName.text = vo.name;
			self.skillDes.text = SkillUtil.getSkillDes(vo);
			for (let i = 0; i < 3; i++) {
				let skillId: number = vo.zhenYanArr[i];
				self.lvLbArr[i].text = skillId % 1000 + "";
				let cfg = Config.godskill_210[skillId];
				if (cfg.next > 0) {
					let costArr: Array<any> = JSON.parse(cfg.consume);
					let count = Model_Bag.getItemCount(costArr[0][1]);
					self.iconBtArr[i].checkNotice = count >= costArr[0][2]
				} else {
					self.iconBtArr[i].checkNotice = false;
				}
			}
			IconUtil.setImg(self.skillIcon, Enum_Path.SKILL_URL + vo.icon + ".png");
			IconUtil.setImg(self.nameImg, Enum_Path.SKILL_URL + "name_" + vo.icon + ".png");
			self.skillCon.text = "释放需要1000怒气，每次攻击怒气+10";
		}
	}

	public open() {
		const self = this;
		IconUtil.setImg(self.godSkillBack, Enum_Path.SKILL_URL + "bg.jpg");
		self.updateShow();
		GGlobal.reddot.listen(ReddotEvent.CHECK_GOD_SKILL, self.updateShow, self);
		for (let i = 0; i < 3; i++) {
			let iconBt0: Button2 = self.iconBtArr[i];
			iconBt0.addClickListener(self.iconHandler, self);
		}
	}

	public close() {
		const self = this;
		IconUtil.setImg(self.skillIcon, null);
		IconUtil.setImg(self.nameImg, null);
		IconUtil.setImg(self.godSkillBack, null);
		GGlobal.reddot.remove(ReddotEvent.CHECK_GOD_SKILL, self.updateShow, self);
		for (let i = 0; i < 3; i++) {
			let iconBt0: Button2 = self.iconBtArr[i];
			iconBt0.removeClickListener(self.iconHandler, self);
		}
	}
}