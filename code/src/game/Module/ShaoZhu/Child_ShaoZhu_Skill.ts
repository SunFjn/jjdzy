class Child_ShaoZhu_Skill extends fairygui.GComponent implements ChildShaoZhu {

	public powerLb: fairygui.GLabel;
	public nameLb: fairygui.GRichTextField;
	public explainLb: fairygui.GRichTextField;
	public maxLb: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;
	public costLb0: ViewResource;
	public curGrid: ShaoZhuSkillGrid;
	public gridArr: ShaoZhuSkillGrid[] = [];
	public gridArr0: ShaoZhuSkillGrid[] = [];
	public costLb1: ViewResource;
	public costLb2: ViewResource;
	public tiHuanBt: Button1;
	public xiLianBt0: Button0;
	public xiLianBt1: Button0;
	public upBt: Button1;
	public upGroup: fairygui.GGroup;
	public linkLb: fairygui.GRichTextField;
	public type: number = 0;

	public static URL: string = "ui://p83wyb2bng03f";

	public static createInstance(): Child_ShaoZhu_Skill {
		return <Child_ShaoZhu_Skill><any>(fairygui.UIPackage.createObject("ShaoZhu", "Child_ShaoZhu_Skill"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		for (let i = 0; i < 5; i++) {
			let grid = <ShaoZhuSkillGrid><any>(self.getChild("grid" + i));
			grid.data = i;
			let grid1 = <ShaoZhuSkillGrid><any>(self.getChild("grid0" + i));
			grid1.data = i;
			self.gridArr.push(grid);
			self.gridArr0.push(grid1);
			grid.addClickListener(self.OnGridHandler, self);
			grid1.addClickListener(self.OnGridHandler1, self);
		}
		// self.upBt.addClickListener(self.clickHandler, self);
		self.tiHuanBt.addClickListener(self.clickHandler, self);
		self.xiLianBt0.addClickListener(self.clickHandler, self);
		self.xiLianBt1.addClickListener(self.clickHandler, self);
		self.linkLb.text = HtmlUtil.createLink("查看满级技能", true, "")
		self.linkLb.addEventListener(egret.TextEvent.LINK, self.linkHandler, self);
	}

	private linkHandler(event: egret.TextEvent) {
		event.stopPropagation();
		GGlobal.layerMgr.open(UIConst.SHAOZHU_ALLSKILL);
	}

	private clickHandler(event: egret.TouchEvent) {
		let self = this;
		let bt = event.target as fairygui.GButton;
		switch (bt.id) {
			case self.xiLianBt0.id:
				if (self.xiLianBt0.checkNotice) {
					if (!self.xilianPrompt(0)) {
						GGlobal.modelShaoZhu.CG_XILIAN_SKILL_SHAOZHU_5117(self.vo.shaozhuID, self.curSkill.data, 0);
					}
				} else {
					let costArr1 = JSON.parse(Config.xtcs_004[5801].other);
					let itemVo1 = VoItem.create(costArr1[0][1]);
					if (Model_Bag.getItemCount(costArr1[0][1]) >= costArr1[0][2]) {
						GGlobal.modelShaoZhu.CG_XILIAN_SKILL_SHAOZHU_5117(self.vo.shaozhuID, self.curSkill.data, 0);
					} else {
						View_CaiLiao_GetPanel.show(itemVo1);
					}
				}
				break;
			case self.xiLianBt1.id:
				if (self.xiLianBt1.checkNotice) {
					if (!self.xilianPrompt(1)) {
						GGlobal.modelShaoZhu.CG_XILIAN_SKILL_SHAOZHU_5117(self.vo.shaozhuID, self.curSkill.data, 1);
					}
				} else {
					let costArr2 = JSON.parse(Config.xtcs_004[5802].other);
					let itemVo2 = VoItem.create(costArr2[0][1]);
					if (Model_Bag.getItemCount(costArr2[0][1]) >= costArr2[0][2]) {
						GGlobal.modelShaoZhu.CG_XILIAN_SKILL_SHAOZHU_5117(self.vo.shaozhuID, self.curSkill.data, 1);
					} else {
						View_CaiLiao_GetPanel.show(itemVo2);
					}
				}
				break;
			case self.tiHuanBt.id:
				if (!self.curSkill) {
					ViewCommonWarn.text("请选中要被替换的技能");
					return;
				} else if (!self.curSkill1) {
					ViewCommonWarn.text("没有可替换的技能");
					return;
				}
				for (let key in self.vo.skillData) {
					let skillVo = self.vo.skillData[key];
					if (skillVo && skillVo.cfg && parseInt(key) != self.curSkill.data && skillVo.cfg.type == self.curSkill1.cfg.type) {
						return ViewCommonWarn.text("已存在同类型技能");
					}
				}
				ViewAlert.show("洗练出的新技能是否替换当前技能\n" + HtmlUtil.font("(注意：替换后当前技能和其他洗练技能将消失)", Color.getColorStr(6), 22), Handler.create(self,
					function () {
						GGlobal.modelShaoZhu.CG_TIHUAN_SKILL_SHAOZHU_5119(self.vo.shaozhuID, self.curSkill.data, self.curSkill1.data);
						if (self.curSkill1) self.curSkill1.choose(false);
						self.curSkill1 = null;
					}));
				break;
			case self.upBt.id:
				// if (self.upBt.checkNotice) {
				// 	GGlobal.modelShaoZhu.CG_UPSKILL_SHAOZHU_5115(self.vo.shaozhuID);
				// } else {
				// 	let skillcfg = Config.sonskillup_267[self.vo.skillLv];
				// 	if (self.vo.starLv <= 0) {
				// 		ViewCommonWarn.text(ConfigHelp.reTxt("需激活少主·{0}", [self.vo.cfg.name]));
				// 	} else if (self.vo.skillLv >= self.vo.starcfg.max) {
				// 		ViewCommonWarn.text("少主升星可增加技能等级上限");
				// 	} else {
				// 		let arr = ["", "", "lv", "lan", "zi", "cheng", "hong"];
				// 		let skillcfg = Config.sonskillup_267[self.vo.skillLv];
				// 		let costArr = JSON.parse(skillcfg[arr[self.vo.cfg.pz]]);
				// 		let itemVo = VoItem.create(costArr[0][1]);
				// 		View_CaiLiao_GetPanel.show(itemVo);
				// 	}
				// }
				break;
		}
	}

	private xilianPrompt(value) {
		let self = this;
		if (self.curSkill && self.curSkill.cfg) {
			let skillVo0 = self.vo.skillData[self.curSkill.data];
			if (skillVo0) {
				for (let i = 0; i < skillVo0.alternativeSkillArr.length; i++) {
					let skillVo1 = Config.sonskill_267[skillVo0.alternativeSkillArr[i]];
					if (skillVo1.star > self.curSkill.cfg.star) {
						let skillIndex = 0;
						for (let key in self.vo.skillData) {
							if (self.vo.skillData[key].cfg && self.vo.skillData[key].cfg.type == skillVo1.type && skillVo1.star <= self.vo.skillData[key].cfg.star) {
								skillIndex++;
							}
						}
						if (skillIndex <= 0) {
							ViewAlert.show("当前已洗练到" + HtmlUtil.fontNoSize("更高等级技能", Color.getColorStr(5)) + "\n是否继续洗练", Handler.create(self,
								function () {
									GGlobal.modelShaoZhu.CG_XILIAN_SKILL_SHAOZHU_5117(self.vo.shaozhuID, self.curSkill.data, value);
								}));
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	private curSkill1: ShaoZhuSkillGrid;
	private OnGridHandler1(evt: egret.TouchEvent) {
		let self = this;
		let grid: ShaoZhuSkillGrid = evt.target as ShaoZhuSkillGrid;
		if (self.curSkill1 && self.curSkill1.data == grid.data) return;
		if (self.curSkill1) self.curSkill1.choose(false);
		grid.choose(true);
		self.curSkill1 = grid;
	}

	private curSkill: ShaoZhuSkillGrid;
	private OnGridHandler(evt: egret.TouchEvent) {
		let self = this;
		let grid: ShaoZhuSkillGrid = evt.target as ShaoZhuSkillGrid;
		if (self.curSkill && self.curSkill.data == grid.data) return;
		if (self.curSkill) self.curSkill.choose(false);
		grid.choose(true);
		self.curSkill = grid;
		if (self.curSkill1) self.curSkill1.choose(false);
		self.curSkill1 = null;
		self.updateGridArr0();
	}

	public vo: Vo_ShaoZhu;
	public setVo(vo: Vo_ShaoZhu) {
		let self = this;
		self.vo = vo;
		let skillVo = Vo_Skill.create(JSON.parse(vo.cfg.skill)[0][0], vo.starLv, vo.starLv);
		self.nameLb.text = skillVo.name + "";
		self.explainLb.text = SkillUtil.getSkillDes(skillVo);
		self.explainLb.wordWrap = true;
		let power = skillVo.skill_power;
		self.curGrid.updateShow("", skillVo.icon, false);
		let skillLv = vo.skillLv;
		if (skillLv <= 0) skillLv = 1;
		// let cfg = Config.sonskillup_267[skillLv];
		// self.upBt.visible = self.costLb0.visible = self.maxLb.visible = false;
		// let arr = ["", "", "lv", "lan", "zi", "cheng", "hong"];
		// if (cfg.next > 0) {
		// 	let costArr = JSON.parse(cfg[arr[vo.cfg.pz]]);
		// 	let itemVo = VoItem.create(costArr[0][1]);
		// 	self.costLb0.setImgUrl(itemVo.icon);
		// 	self.costLb0.setLb(Model_Bag.getItemCount(itemVo.id), costArr[0][2]);
		// 	self.upBt.visible = self.costLb0.visible = true;
		// 	self.upBt.checkNotice = Model_Bag.getItemCount(itemVo.id) >= costArr[0][2] && vo.starLv >= Config.sonskillup_267[cfg.next].star;
		// } else {
		// 	self.maxLb.visible = true;
		// }

		let skillIndex = 0;
		for (let i = 0; i < self.gridArr.length; i++) {
			if (vo.skillData[i]) {
				skillIndex++;
				if (vo.skillData[i].cfg) {
					self.gridArr[i].cfg = vo.skillData[i].cfg;
					self.gridArr[i].updateShow(HtmlUtil.fontNoSize(vo.skillData[i].cfg.name, Color.getColorStr(vo.skillData[i].cfg.pz)), vo.skillData[i].cfg.icon + "", false);
					power += vo.skillData[i].cfg.power;
				} else {
					self.gridArr[i].updateShow("可洗练", "", false);
				}
				self.gridArr[i].touchable = true;
			} else {
				if (i < vo.qinMiCfg.skill && vo.starLv > 0) {
					skillIndex++;
					self.gridArr[i].updateShow(HtmlUtil.fontNoSize("可洗练", Color.getColorStr(1)), "", false);
					self.gridArr[i].touchable = true;
				} else {
					if (i == 0 && vo.starLv <= 0) {
						self.gridArr[i].updateShow(HtmlUtil.fontNoSize("激活" + vo.cfg.name + "解锁", Color.getColorStr(6)), "", true);
						self.gridArr[i].touchable = false;
					} else {
						let needArr = JSON.parse(Config.xtcs_004[5803].other);
						self.gridArr[i].updateShow(HtmlUtil.fontNoSize("亲密度" + Math.floor(Config.sonqm_267[needArr[i][1]].jie / 100) + "阶", Color.getColorStr(6)), "", true);
						self.gridArr[i].touchable = false;
					}
				}
			}
		}
		self.powerLb.text = "" + power;
		if (!self.curSkill && skillIndex > 0) {
			self.gridArr[0].choose(true)
			self.curSkill = self.gridArr[0];
		}
		self.updateGridArr0();
	}

	private updateGridArr0() {
		let self = this;
		let vo = self.vo;
		let skillIndex0 = 0;
		for (let i = 0; i < self.gridArr0.length; i++) {
			let grid = self.gridArr0[i];
			if (self.curSkill) {
				let skillVo0 = vo.skillData[self.curSkill.data];
				if (skillVo0 && i < skillVo0.alternativeSkillArr.length) {
					let skillVo1 = Config.sonskill_267[skillVo0.alternativeSkillArr[i]];
					skillIndex0++;
					grid.visible = true;
					grid.cfg = skillVo1;
					grid.updateShow(HtmlUtil.fontNoSize(skillVo1.name, Color.getColorStr(skillVo1.pz)), skillVo1.icon + "", false);
				} else {
					if (self.curSkill1 && grid.data == self.curSkill1.data) {
						self.cleancurSkill1();
					}
					grid.visible = false;
				}
			} else {
				if (self.curSkill1 && grid.data == self.curSkill1.data) {
					self.cleancurSkill1();
				}
				grid.visible = false;
			}
		}

		if (!self.curSkill1 && skillIndex0 > 0) {
			self.gridArr0[0].choose(true)
			self.curSkill1 = self.gridArr0[0];
		}
		if (self.curSkill) {
			let costArr1 = JSON.parse(Config.xtcs_004[5801].other);
			let costArr2 = JSON.parse(Config.xtcs_004[5802].other);
			let itemVo1 = VoItem.create(costArr1[0][1]);
			let itemVo2 = VoItem.create(costArr2[0][1]);
			let count1 = Model_Bag.getItemCount(itemVo1.id);
			let count2 = Model_Bag.getItemCount(itemVo2.id);
			self.costLb1.setImgUrl(itemVo1.icon);
			self.costLb1.setLb(count1, costArr1[0][2]);
			self.costLb2.setImgUrl(itemVo2.icon);
			self.costLb2.setLb(count2, costArr2[0][2]);
			self.upGroup.visible = true;
			self.promptLb.visible = false;
			let isMax = false;
			let skillArr: any[] = JSON.parse(Config.xtcs_004[5804].other);
			if (self.curSkill.cfg && skillArr[0].indexOf(self.curSkill.cfg.id) != -1) isMax = true;
			self.xiLianBt0.checkNotice = count1 >= costArr1[0][2] && !isMax;
			self.xiLianBt1.checkNotice = count2 >= costArr2[0][2] && !isMax;
		} else {
			self.upGroup.visible = false;
			self.promptLb.visible = true;
			self.promptLb.text = ConfigHelp.reTxt("需激活少主·{0}", [vo.cfg.name]);
		}
	}

	public open(vo: Vo_ShaoZhu) {
		let self = this;
		self.setVo(vo);
	}

	public close() {
		let self = this;
		if (self.curSkill) self.curSkill.choose(false);
		self.curSkill = null;
		if (self.curSkill1) self.curSkill1.choose(false);
		self.curSkill1 = null;
		for (let i = 0; i < self.gridArr.length; i++) {
			self.gridArr[i].clean();
			self.gridArr0[i].clean();
		}
	}

	private cleancurSkill1() {
		let self = this;
		if (self.curSkill1) self.curSkill1.choose(false);
		self.curSkill1 = null;
	}
}