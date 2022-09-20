class ChildWuJiangUpStar extends fairygui.GComponent {

	public list: fairygui.GList;
	public labAttrCur: fairygui.GTextField;
	public labAttrNext: fairygui.GTextField;
	public labAttrMax: fairygui.GTextField;
	public labCost: fairygui.GTextField;
	public labStar: fairygui.GTextField;
	public img: fairygui.GLoader;
	public btnUp: Button0;
	public labName: fairygui.GTextField;
	public labPower: fairygui.GTextField;
	public imgArrow: fairygui.GImage;
	public boxMax: fairygui.GGroup;
	public btnBattle: fairygui.GButton;
	public imgBattle: fairygui.GImage;
	public grid0: Button2;
	public labGrid0: fairygui.GTextField;
	public skill0: VWuJiangSkillS;
	public skill1: VWuJiangSkillS;
	public skill2: VWuJiangSkillS;
	public skill3: VWuJiangSkillS;
	public showBt: fairygui.GButton;
	public scoreLb: fairygui.GRichTextField;
	public btnSZ: Button2;
	public boxUp: fairygui.GGroup;
	public starPowerLb: fairygui.GTextField;
	public starGroup: fairygui.GGroup;

	public WuJiang: Button2;
	public jueXingBt: Button2;
	public wujiangDesc: fairygui.GTextField;

	public static URL: string = "ui://zyx92gzwtht42";

	private awatar: UIRole = null;
	private _showArr: Array<Ihero_211>;
	private _clickVo: any;
	private _index: number;
	private listW = 0;

	public static createInstance(): ChildWuJiangUpStar {
		return <ChildWuJiangUpStar><any>(fairygui.UIPackage.createObject("wuJiang", "ChildWuJiangUpStar"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHander;
		self.list.setVirtual();
		self._index = self.displayListContainer.getChildIndex(self.img.displayObject);
		self.showBt.addClickListener(self.showGeneralHandler, self);
		self.btnSZ.addClickListener(self.onOpenSZ, self);
		self.WuJiang.addClickListener(self.onClickWuJiang, self);
		self.jueXingBt.addClickListener(self.OnJueXing, self);
		self.listW = self.list.width;
	}

	private onClickList() {

	}

	private OnJueXing() {
		GGlobal.layerMgr.open(UIConst.JUEXING_WUJIANG, UIConst.WU_JIANG);
	}

	private onClickWuJiang() {
		// GGlobal.layerMgr.open(UIConst.WUJIANGZHILI, {
		// 	name: this._clickVo.name,
		// 	type: this._clickVo.type,
		// 	star: Model_WuJiang.wuJiangStar[this._clickVo.type]
		// });
		Model_WuJiang.wujiangzhiliName = this._clickVo.name;
		Model_WuJiang.wujiangzhiliType = this._clickVo.type;
		Model_WuJiang.wujiangzhiliStar = Model_WuJiang.wuJiangStar[this._clickVo.type];
		GGlobal.layerMgr.open(UIConst.WUJIANGZHILI);
	}

	private showGeneralHandler() {
		GGlobal.modelchat.CG_CHAT_SHOW_DATA(8, this._clickVo.type);
	}

	private onOpenSZ() {
		GGlobal.layerMgr.open(UIConst.WU_JIANG_SZ, this._clickVo.type)
	}

	public addEvent(): void {
		let self = this;
		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.setPos(self.img.x, self.img.y);
			// self.awatar.setScaleXY(1.5, 1.5);
			self.awatar.uiparent = self.displayListContainer;
			self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;

			let horseId = Model_player.voMine.horseId
			if (horseId) {
				self.awatar.setScaleXY(1, 1);
			} else {
				self.awatar.setScaleXY(1.5, 1.5);
			}
		}
		ViewWuJiangPanel._selPage = 0;
		self.list.addEventListener(fairygui.ItemEvent.CLICK, self.itemClick, self);
		self.btnUp.addClickListener(self.onClickUp, self);
		self.btnBattle.addClickListener(self.onBattle, self);
		self.grid0.addClickListener(self.onClickGrid0, self);
		GGlobal.control.listen(Enum_MsgType.WUJIANG_CHANGE_JOB, self.changeJob, self);
		GGlobal.control.listen(Enum_MsgType.WUJIANG_UP_STAR, self.upStar, self);
		GGlobal.reddot.listen(ReddotEvent.CHECK_WU_JIANG, self.checkRed, self);
		GGlobal.reddot.listen(UIConst.JUEXING, self.updateJuexing, self);
		GGlobal.control.listen(Enum_MsgType.WUJIANG_SHENGJIANGZHILIUPDATE, this.setShengjiangzhiliLevel, this);
	}

	public removeEvent(): void {
		let self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
		self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.itemClick, self);
		self.btnUp.removeClickListener(self.onClickUp, self);
		self.btnBattle.removeClickListener(self.onBattle, self);
		self.grid0.removeClickListener(self.onClickGrid0, self);
		GGlobal.control.remove(Enum_MsgType.WUJIANG_CHANGE_JOB, self.changeJob, self);
		GGlobal.control.remove(Enum_MsgType.WUJIANG_UP_STAR, self.upStar, self);
		GGlobal.reddot.remove(ReddotEvent.CHECK_WU_JIANG, self.checkRed, self);
		GGlobal.reddot.remove(UIConst.JUEXING, self.updateJuexing, self);
		GGlobal.control.remove(Enum_MsgType.WUJIANG_SHENGJIANGZHILIUPDATE, this.setShengjiangzhiliLevel);
		self.list.numItems = 0;
		Timer.instance.remove(self.playSkill, self);
		self.secSkill = 0;
		self.clearGuide();
	}

	private sortWuJiang(): void {
		let arr = Model_WuJiang.PuTongWujiang.concat();
		this._showArr = arr.sort(function (a, b) {
			return getWeight(a) > getWeight(b) ? -1 : 1;
		});

		function getWeight(hero: Ihero_211) {
			let ret = 0;
			let star = Model_WuJiang.wuJiangStar[hero.type]
			let can = Model_WuJiang.checkStarVo(hero);
			if (hero.type == Model_player.voMine.job) {//当前职业置顶
				ret += 100000000000;
			}
			else if (star) {//已激活的放在第二序列
				ret += 5000000000;
				ret += 1000000 * hero.pinzhi;//品质权重大于id权重
				ret += hero.type;
			}
			else if (can) {
				ret += 5000000;
				ret += 100000 * hero.pinzhi;//品质权重大于id权重
			} else {
				ret += hero.type * -1;//品质权重大于id权重
				ret += hero.pinzhi * -10000;
			}
			return ret;
		}
	}

	public show(): void {
		let self = this;
		self.sortWuJiang();
		let index = 0;
		if (Model_WuJiang.selectJob > 0) {
			for (let i = 0; i < self._showArr.length; i++) {
				let v = self._showArr[i];
				if (v.type == Model_WuJiang.selectJob) {
					index = i;
					break;
				}
			}
		} else {
			for (let i = 0; i < self._showArr.length; i++) {
				let v = self._showArr[i]
				let star = Model_WuJiang.wuJiangStar[v.type]
				let can = Model_WuJiang.checkStarVo(v);
				if (!star && can) {
					index = i
					self._clickVo = v;
					break;
				}
			}
		}
		self.list.numItems = self._showArr.length;
		self.list.selectedIndex = index;
		let temp = index;
		if (temp >= 0 && temp <= 2) {
			temp = 0;
		} else if (temp > 2) {
			temp -= 2;
		}
		self.list.scrollToView(temp);
		self.selectdUpdate(self._showArr[index]);
	}

	private upStar(): void {
		let self = this;
		self.sortWuJiang();
		let index = 0;
		for (let i = 0; i < self._showArr.length; i++) {
			if (self._showArr[i].type == self._clickVo.type) {
				index = i
				break;
			}
		}
		self.list.selectedIndex = index;
		let temp = index;
		if (temp >= 0 && temp <= 2) {
			temp = 0;
		} else if (temp > 2) {
			temp -= 2;
		}
		self.list.scrollToView(temp, true);
		self.update()
		self.setShengjiangzhiliLevel();
	}

	private changeJob(): void {
		let self = this;
		self.sortWuJiang();
		self._clickVo = null;
		self.update()
	}

	public update(): void {
		let self = this;
		self.list.numItems = self._showArr.length;
		if (self._clickVo) {
			self.selectdUpdate(self._clickVo);
		} else {
			self.list.selectedIndex = 0;
			self.list.scrollToView(0);
			self.selectdUpdate(self._showArr[0]);
		}
		self.upDan()
		self.checkRed();
	}

	private _voItem0: VoItem = null;
	// private _voItem1: VoItem = null;
	private upDan(): void {
		let self = this;
		var maxCount0 = 0;
		var maxCount1 = 0;
		for (let keys in Model_WuJiang.wuJiangStar) {
			var star = Model_WuJiang.wuJiangStar[keys];
			var hero = Config.hero_211[keys]
			maxCount0 += hero.max1 * star;
			maxCount1 += hero.max2 * star;
		}
		if (self._voItem0 == null) {
			self._voItem0 = VoItem.create(Model_WuJiang.DAN_SHUXING);
		}
		self._voItem0.count = Model_Bag.getItemCount(Model_WuJiang.DAN_SHUXING);
		self.labGrid0.text = Model_WuJiang.danShuxing + "/" + maxCount0;
		self.grid0.checkNotice = self._voItem0.count > 0 && Model_WuJiang.danShuxing < maxCount0;
	}

	private renderHander(index: number, obj: fairygui.GObject): void {
		var gird: VWuJiangGrid = obj as VWuJiangGrid;
		gird.vo = this._showArr[index];
	}

	private itemClick(e: fairygui.ItemEvent): void {
		var clickItem = e.itemObject as VWuJiangGrid
		this.selectdUpdate(clickItem.vo);
		Model_WuJiang.selectJob = 0;
	}
	private secSkill: number = 0;
	private selectdUpdate(vo: Ihero_211): void {
		let self = this;
		let cf = Config.herostar_211;
		self._clickVo = vo
		self.labName.text = vo.name;
		self.labName.color = Color.getColorInt(Model_WuJiang.getHeroQuality(vo))
		this.setShenjiangzhili(vo.god == 1);
		const godWeapon = Model_ZSGodWeapon.getGodWeaponByJob(vo.type);
		const szInfo = Model_WuJiang.shiZhuanDic[vo.type];
		if (szInfo && szInfo.onSkinId) {
			var mx = Config.sz_739[szInfo.onSkinId].moxing;
			self.awatar.setBody(mx);
			self.awatar.setWeapon(szInfo.onSkinId);
		} else {
			self.awatar.setBody(vo.type);
			self.awatar.setWeapon(vo.type);
		}
		self.awatar.setGodWeapon(godWeapon);
		let horseId = Model_player.voMine.horseId
		self.awatar.setHorseId(horseId);
		self.awatar.onAdd();

		var star = Model_WuJiang.wuJiangStar[vo.type];
		if (!star) {
			star = 0
		}
		var attrArr;
		var nextAttArr;
		self.btnUp.touchable = self.btnUp.visible = true;
		self.boxMax.visible = false;
		if (star == 0) {//0级
			attrArr = JSON.parse(cf[vo.pinzhi * 1000 + 1].attr)
			self.labAttrCur.text = "";
			self.labAttrNext.text = "";
			self.labAttrMax.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
			self.btnUp.text = "激活"
			self.imgArrow.visible = false;
			self.starPowerLb.text = cf[vo.pinzhi * 1000 + 1].power + "";
		} else if (star >= vo.star) {//满级
			attrArr = JSON.parse(cf[vo.pinzhi * 1000 + star].attr)
			self.labAttrCur.text = "";
			self.labAttrNext.text = "";
			self.labAttrMax.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
			self.imgArrow.visible = false;
			self.btnUp.touchable = self.btnUp.visible = false;
			self.boxMax.visible = true;
		} else {
			self.imgArrow.visible = true;
			self.btnUp.text = "升星"
			attrArr = JSON.parse(cf[vo.pinzhi * 1000 + star].attr);
			nextAttArr = JSON.parse(cf[cf[vo.pinzhi * 1000 + star].next].attr);
			self.labAttrCur.text = ConfigHelp.attrString(attrArr, "+");
			self.labAttrNext.text = ConfigHelp.attrString(nextAttArr, "+", null, "#15f234");
			self.labAttrMax.text = "";
			self.starPowerLb.text = (cf[cf[vo.pinzhi * 1000 + star].next].power - cf[vo.pinzhi * 1000 + star].power) + "";
		}
		self.showBt.visible = star > 0;
		self.labStar.text = ConfigHelp.getStarFontStr(star);
		if (star >= vo.star) {
			self.starGroup.visible = false;
			self.labCost.text = "";
		} else {
			//升星道具
			self.starGroup.visible = true;
			var consume = ConfigHelp.SplitStr(vo.activation)
			self._needItem = VoItem.create(Number(consume[0][1]))
			var hasCount = Model_Bag.getItemCount(Number(consume[0][1]))
			var count = Number(consume[0][2])
			var colorStr;
			if (hasCount >= count) {
				colorStr = '#00FF00';
				self._hasNeed = true;
			} else {
				colorStr = '#FF0000';
				self._hasNeed = false;
			}
			self.labCost.text = "消耗：[color=" + Color.getColorStr(self._needItem.quality) + "]" + self._needItem.name + "[/color]x" + count +
				"[color=" + colorStr + "](" + hasCount + "/" + count + ")[/color]"
		}

		var power = 0;
		if (star) {
			power += vo.power
			power += vo.starpower * (star - 1);
		}
		self.labPower.text = "" + (star > 0 ? cf[vo.pinzhi * 1000 + star].power : 0)

		if (vo.type == Model_player.voMine.job) {
			self.btnBattle.touchable = self.btnBattle.visible = false;
			self.imgBattle.visible = true;
		} else if (star > 0) {
			self.imgBattle.visible = false;
			self.btnBattle.touchable = self.btnBattle.visible = true;
		} else {
			self.imgBattle.visible = false;
			self.btnBattle.touchable = self.btnBattle.visible = false;
		}
		self.btnUp.checkNotice = Model_WuJiang.checkStarVo(vo);

		self.labName.text = vo.name
		self.labName.color = Color.getColorInt(Model_WuJiang.getHeroQuality(vo))
		var skillsArr = ConfigHelp.SplitStr(vo.skills);
		var secSkill = skillsArr[1][0];
		self.skill0.setVo(skillsArr[0][0], 0);
		self.skill1.setVo(skillsArr[1][0], 1);
		self.skill2.setVo(skillsArr[2][0], 2);
		self.skill3.setVo(skillsArr[3][0], 3);
		let skillList = Model_player.voMine.skillList;
		let cfgids: Array<number> = JSON.parse(Config.hero_211[vo.type].attack);
		let score: number = 0;
		let score1: number = 0;
		for (let i = 0; i < skillsArr.length; i++) {
			let skillVo: Vo_Skill;
			let skillVo1: Vo_Skill;
			if (skillList[cfgids.length + i]) {
				let level = skillList[cfgids.length + i].level;
				skillVo = Vo_Skill.create(skillsArr[0][0], level, star);
				if (star < vo.star) {
					skillVo1 = Vo_Skill.create(skillsArr[0][0], level, star + 1);
				}
			} else {
				skillVo = Vo_Skill.create(skillsArr[0][0], 1, star)
				if (star < vo.star) {
					skillVo1 = Vo_Skill.create(skillsArr[0][0], 1, star + 1);
				}
			}
			score += skillVo.powerAtt_lv;
			if (star < vo.star) {
				score1 += skillVo1.powerAtt_lv;
			}
		}
		let wujiangzhiliId: number = vo.type * 100 + Model_WuJiang.shenjiangzhiliSkillLv[vo.type];
		let heroSkillCfg: Iherogodskill_211 = Config.herogodskill_211[wujiangzhiliId];
		let wujiangzhiliScore: number = heroSkillCfg ? heroSkillCfg.zlg : 0;
		if (star >= vo.star) {
			self.scoreLb.text = "技能伤害评分：" + HtmlUtil.fontNoSize("" + Math.ceil(score / 100000 * 600 + wujiangzhiliScore), Color.getColorStr(2)) + "    下一星级：技能伤害评分：" +
				HtmlUtil.fontNoSize("已满星", Color.getColorStr(2));
		} else if (star == 0) {
			self.scoreLb.text = "技能伤害评分：" + HtmlUtil.fontNoSize("" + Math.ceil(score1 / 100000 * 600 + wujiangzhiliScore), Color.getColorStr(2))
		} else {
			self.scoreLb.text = "技能伤害评分：" + HtmlUtil.fontNoSize("" + Math.ceil(score / 100000 * 600 + wujiangzhiliScore), Color.getColorStr(2)) + "    下一星级：技能伤害评分：" +
				HtmlUtil.fontNoSize("" + Math.ceil(score1 / 100000 * 600 + wujiangzhiliScore), Color.getColorStr(2));
		}
		if(horseId == 0){
			if (self.secSkill != secSkill) {
				self.secSkill = secSkill;
				Timer.instance.remove(self.playSkill, self);
				self.playSkill();
			}
		}else{
			Timer.instance.remove(self.playSkill, self);
		}
		
		self.updateJuexing();
	}

	private updateJuexing() {
		let self = this;
		self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.WU_JIANG);
		self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 0);
	}

	private playSkill() {
		let self = this;
		self.awatar.playSkillID(self.secSkill, false);
		Timer.instance.callLater(self.playSkill, 5000, self);
	}

	private _hasNeed: boolean = false;
	private _needItem: VoItem;
	private onClickUp(): void {
		let self = this;
		if (!self._hasNeed) {
			View_CaiLiao_GetPanel.show(self._needItem);
			return;
		}
		if (self._clickVo) {
			var star = Model_WuJiang.wuJiangStar[self._clickVo.type];
			if (star) {
				GGlobal.modelWuJiang.CGUpWJStar(self._clickVo.type);
			} else {
				GGlobal.modelWuJiang.CGJihuowj(self._clickVo.type);
			}
		}
	}

	/**切换武将 */
	private onBattle(): void {
		let self = this;
		if (self._clickVo) {
			var v: any = self._clickVo
			if (v.type == Model_player.voMine.job) {
				ViewCommonWarn.text("出战中")
				return;
			}
			var star = Model_WuJiang.wuJiangStar[v.type]
			if (star) {
				GGlobal.modelWuJiang.CGChangeJob(v.type);

				//根据场景角色状态，修改状态
				let role = Model_player.voMine.sceneChar;
				if (role) {
					let map: ScrollMap = role.scene.map;
					if (map && map.mid == 361001 && role.hurt_state == 3) {
						role.hurt_state = 4;
					}
				}
			} else {
				ViewCommonWarn.text("武将未激活")
			}
		}
	}

	private checkRed() {
		let r = GGlobal.reddot;
		this.btnSZ.checkNotice = r.checkCondition(UIConst.WU_JIANG, 4)
	}

	private onClickGrid0(): void {
		GGlobal.layerMgr.open(UIConst.TIP_WUJIANG_DAN, this._voItem0);
	}

	private setShenjiangzhili(isVisible: boolean) {
		this.WuJiang.visible = isVisible;
		this.wujiangDesc.visible = isVisible;
		this.setShengjiangzhiliLevel();
	}

	private setShengjiangzhiliLevel() {
		this.wujiangDesc.text = (Model_WuJiang.wujiangGodPower[this._clickVo.type] || 0) + "阶";
		let temp = GGlobal.reddot.checkCondition(UIConst.WUJIANGZHILI, this._clickVo.type);
		let temp1 = GGlobal.reddot.checkCondition(UIConst.WUJIANGZHILI_SKILL, this._clickVo.type);
		this.WuJiang.noticeImg.visible = temp || temp1 ? true : false;
		GGlobal.reddot.notify(ReddotEvent.CHECK_WU_JIANG);
		let self = this;
		self.list.numItems = self._showArr.length;
	}

	public check_wujiang_select() {
		let self = this;
		if (self._clickVo) {
			var v: any = self._clickVo;
			if (v.type == Model_player.voMine.job) return false;
			var star = Model_WuJiang.wuJiangStar[v.type]
			if (star || Model_WuJiang.checkStarVo(self._clickVo)) return true;
		}
		return false;
	}

	public check_wujiang_upstar() {
		let self = this;
		if (self._clickVo) {
			var star = Model_WuJiang.wuJiangStar[self._clickVo.type]
			if (star) return true;
		}
		return false;
	}

	private ScrollLIst() {
		let self = this;
		if (self.step) self.guide_wujiang_select(self.step);
	}

	private step: any;
	public guide_wujiang_select(step) {
		let self = this;
		if (!self.step) {
			self.step = step;
			self.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL_END, self.ScrollLIst, self);
		}
		let index = 0;
		for (let i = 0; i < this.list._children.length; i++) {
			let grid: VWuJiangGrid = self.list._children[i] as VWuJiangGrid;
			if ((Model_WuJiang.wuJiangStar[grid.vo.type] || grid.noticeImg.visible) && grid.vo.type != Model_player.voMine.job) {
				GuideStepManager.instance.showGuide(grid, grid.width / 2, grid.height / 2);
				GuideStepManager.instance.showGuide1(step.source.index, grid, grid.width, grid.height / 2, 0, 50, -35);
				self.list.width = 400;
				if (self.list.parent) self.list.parent.setChildIndex(self.list, 999);
				index++;
				break;
			}
		}

		if (index == 0) {
			GuideStepManager.instance.hideArrow();
		}
	}

	public guide_wujiang_upstar(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.btnUp, self.btnUp.width / 2, self.btnUp.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.btnUp, self.btnUp.width / 2, 0, -90, -106, -100);
		if (self.btnUp.parent) self.btnUp.parent.setChildIndex(self.btnUp, self.btnUp.parent.numChildren - 1);
		if (self.list.scrollPane.hasEventListener(fairygui.ScrollPane.SCROLL_END)) {
			self.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL_END, self.ScrollLIst, self);
		}
	}

	public guide_wujiang_change(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.btnBattle, self.btnBattle.width / 2, self.btnBattle.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.btnBattle, 0, self.btnBattle.height / 2, 180, -250, -35);
		if (self.btnBattle.parent) self.btnBattle.parent.setChildIndex(self.btnBattle, 999);
		self.clearGuide();
	}

	public clearGuide() {
		let self = this;
		if (self.list.scrollPane.hasEventListener(fairygui.ScrollPane.SCROLL_END)) {
			self.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL_END, self.ScrollLIst, self);
		}
		if (self.list.width != self.listW) {
			self.list.width = self.listW;
		}
		self.step = null;
	}
} 