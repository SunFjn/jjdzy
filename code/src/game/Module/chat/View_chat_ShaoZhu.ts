class View_chat_ShaoZhu extends UIModalPanel {

	public starLb: fairygui.GRichTextField;
	public skillNameLb: fairygui.GRichTextField;
	public levelLb: fairygui.GRichTextField;
	public ownerLb: fairygui.GLabel;
	public qianNengLb: fairygui.GLabel;
	public nameLb: fairygui.GLabel;
	public powerLb: fairygui.GLabel;
	public levelIcon: fairygui.GLoader;
	public backIcon: fairygui.GLoader;
	public skill0: ChatShaoZhuSkillGrid;
	public skill1: ChatShaoZhuSkillGrid;
	public skill2: ChatShaoZhuSkillGrid;
	public skill3: ChatShaoZhuSkillGrid;
	public skill4: ChatShaoZhuSkillGrid;
	public skill: ChatShaoZhuSkillGrid;

	public skillArr: ChatShaoZhuSkillGrid[];

	public static URL: string = "ui://fx4pr5qeewn52j";
	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("chat", "View_chat_ShaoZhu").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.skillArr = [self.skill0, self.skill1, self.skill2, self.skill3, self.skill4]
		super.childrenCreated()
	}

	/**武将：	//拥有者+少主序号+少主时装+亲密度等级+星级+主动技能等级+战力+被动技能0+被动技能1+被动技能2+被动技能3+被动技能4 */
	private updateShow() {
		let self = this;
		let vo: Vo_Chat = this._args;
		let arr = vo.content.split("_");
		self.ownerLb.text = "拥有者：" + HtmlUtil.fontNoSize(vo.name, Color.getColorStr(2));
		let chong = Math.floor(Number(arr[12]) % 100000 / 10)
		self.qianNengLb.text = "潜能：第" + chong + "重";
		let shaozhuID = parseInt(arr[1]);
		let fashion = parseInt(arr[2]);
		let cfg = Config.son_267[shaozhuID];
		let qinmi = parseInt(arr[3]);
		let cfg2 = Config.sonqm_267[qinmi];
		let skillLv = parseInt(arr[5]);
		let skillVo = Vo_Skill.create(JSON.parse(cfg.skill)[0][0], skillLv, parseInt(arr[4]));
		self.starLb.text = arr[4];
		self.powerLb.text = "战力：" + arr[6];//(wjcfg.power + parseInt(arr[2]) * wjcfg.starpower)星级战力计算
		self.nameLb.text = HtmlUtil.fontNoSize("少主·" + cfg.name, Color.getColorStr(cfg.pz));
		IconUtil.setImg(self.levelIcon, "resource/image/son/qm" + Math.floor(cfg2.jie / 100) + ".png");
		self.levelIcon.x = self.nameLb.x + self.nameLb.getTextField().textWidth - 20;
		self.skill.updateShow("", skillVo.icon, false);
		self.skillNameLb.text = skillVo.name;
		self.levelLb.text = "Lv." + skillLv;
		let skillID0 = parseInt(arr[7]);
		let skillID1 = parseInt(arr[8]);
		let skillID2 = parseInt(arr[9]);
		let skillID3 = parseInt(arr[10]);
		let skillID4 = parseInt(arr[11]);
		if (skillID0 > 0) {
			let skillcfg = Config.sonskill_267[skillID0]
			self.skill0.updateShow(HtmlUtil.fontNoSize(skillcfg.name, Color.getColorStr(skillcfg.pz)), skillcfg.icon, false);
		} else {
			if (skillID0 == 0) {
				self.skill0.updateShow("", "", false);
			} else {
				self.skill0.updateShow("", "", true);
			}
		}
		if (skillID1 > 0) {
			let skillcfg = Config.sonskill_267[skillID1]
			self.skill1.updateShow(HtmlUtil.fontNoSize(skillcfg.name, Color.getColorStr(skillcfg.pz)), skillcfg.icon, false);
		} else {
			if (skillID1 == 0) {
				self.skill1.updateShow("", "", false);
			} else {
				self.skill1.updateShow("", "", true);
			}
		}
		if (skillID2 > 0) {
			let skillcfg = Config.sonskill_267[skillID2]
			self.skill2.updateShow(HtmlUtil.fontNoSize(skillcfg.name, Color.getColorStr(skillcfg.pz)), skillcfg.icon, false);
		} else {
			if (skillID2 == 0) {
				self.skill2.updateShow("", "", false);
			} else {
				self.skill2.updateShow("", "", true);
			}
		}
		if (skillID3 > 0) {
			let skillcfg = Config.sonskill_267[skillID3]
			self.skill3.updateShow(HtmlUtil.fontNoSize(skillcfg.name, Color.getColorStr(skillcfg.pz)), skillcfg.icon, false);
		} else {
			if (skillID3 == 0) {
				self.skill3.updateShow("", "", false);
			} else {
				self.skill3.updateShow("", "", true);
			}
		}
		if (skillID4 > 0) {
			let skillcfg = Config.sonskill_267[skillID4]
			self.skill4.updateShow(HtmlUtil.fontNoSize(skillcfg.name, Color.getColorStr(skillcfg.pz)), skillcfg.icon, false);
		} else {
			if (skillID4 == 0) {
				self.skill4.updateShow("", "", false);
			} else {
				self.skill4.updateShow("", "", true);
			}
		}
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
		if (fashion > 0 && Config.sonshow_267[fashion]) {
			if (!self.awatar) {
				self.awatar = EffectMgr.addEff("uieff/" + Config.sonshow_267[fashion].zs, self.displayListContainer, 150, 270, 1000, -1, true);
			}
		} else {
			if (!self.awatar) {
				self.awatar = EffectMgr.addEff("uieff/" + cfg.zs, self.displayListContainer, 150, 270, 1000, -1, true);
			}
		}
	}

	private awatar: Part = null;
	protected onShown(): void {
		let self = this;
		IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "chatBg.png");
		self.updateShow();
	}

	protected onHide(): void {
		let self = this;
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
		IconUtil.setImg(self.backIcon, null);
		IconUtil.setImg(self.levelIcon, null);
		GGlobal.layerMgr.close(UIConst.CHAT_SHAOZHU);
	}
}