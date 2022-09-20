class SkillUtil {
	public constructor() {
	}

	private static _data;
	public static getDmgConst() {
		if (!this._data) {
			let cfg = Config.changshu_101;
			this._data = {};
			this._data[1005] = cfg[1005].num / 100000;
			this._data[1305] = cfg[1305].num / 100000;
			this._data[1004] = cfg[1004].num / 100000;
			this._data[1304] = cfg[1304].num / 100000;
			this._data[1003] = cfg[1003].num / 100000;
			this._data[1303] = cfg[1303].num / 100000;
			this._data[1002] = cfg[1002].num / 100000;
			this._data[1302] = cfg[1302].num / 100000;
			this._data[1001] = cfg[1001].num / 100000;
			this._data[1301] = cfg[1301].num / 100000;
			this._data[1205] = cfg[1205].num / 100000;
			this._data[1204] = cfg[1204].num / 100000;
			this._data[1203] = cfg[1203].num / 100000;
			this._data[1202] = cfg[1202].num / 100000;
			this._data[1201] = cfg[1201].num / 100000;
		}
		return this._data;
	}

	public static replaceEff(godWeaponID, bodyID: number, effID: number) {
		let cfg: Imx_751;
		for (let key in Config.mx_751) {
			let cfg1 = Config.mx_751[key];
			if (cfg1.shenti == bodyID && godWeaponID == cfg1.wuqi) {
				cfg = cfg1;
				break;
			}
		}
		if (cfg) {
			let arr = JSON.parse(cfg.texiao);
			for (let i = 0; i < arr.length; i++) {
				if (arr[i][0] == effID) {
					return arr[i][1];
				}
			}
			return effID;
		} else {
			return effID;
		}
	}

	/**初始化技能场景逻辑表 */
	public static getLogicMap(): any {
		var styleMap = SkillUtil.styleMap;
		if (SkillUtil.mapInit) {
			return styleMap;
		}
		styleMap[1] = CommonAttack.create;
		styleMap[2] = CommonAttack2.create;
		styleMap[10] = ComboAttack3.create;
		styleMap[1005] = BaoWuSkillBase.create;

		SkillUtil.mapInit = 1;
		return styleMap;
	}
	protected static styleMap: any = {};
	protected static mapInit = 0;

	/**
	 * voSkill 技能
	 * type 显示类型0全部显示1只显示百分比2只显示固定伤害 3都不显示
	 */
	public static getSkillDes(voSkill: Vo_Skill, type: number = 0): string {
		var des: string = voSkill.cfg.des;
		if (des.indexOf("#ap#") != -1) {
			if (voSkill.cfg.attpg != 0 && type < 2) {
				des = des.replace("#ap#", "<font color='#33dd33'>" + ((voSkill.powerAtt_lv / 1000).toFixed(1)) + "%(+" + (voSkill.cfg.attpg / 1000).toFixed(1) + "%)</font>");
			} else {
				des = des.replace("#ap#", "<font color='#33dd33'>" + ((voSkill.powerAtt_lv / 1000).toFixed(1)) + "%</font>");
			}
		}
		if (des.indexOf("#p#") != -1) {
			if (voSkill.cfg.pg != 0 && type != 1 && type != 3) {
				des = des.replace("#p#", "<font color=#33dd33>" + voSkill.power_lv + "(+" + voSkill.cfg.pg + ")</font>");
			} else {
				des = des.replace("#p#", "<font color=#33dd33>" + voSkill.power_lv + "</font>");
			}
		}
		var index = des.indexOf("#attr#");
		if (des.indexOf("#attr#") != -1) {
			var attrtext = ConfigHelp.makeAttrTextArr(voSkill.addAttr);
			des = des.replace("#attr#", "<font color=#33dd33>" + attrtext + "</font>");
		}
		if (!des) {
			des = "";
		}
		return des;
	}

	public static getSkillAttrText(voSkill: Vo_Skill): string {
		var ret;
		if (voSkill.cfg.bp == 0) {
			ret = "";
		} else {
			var value = voSkill.cfg.bp[0][0] + voSkill
		}
		return ret;
	}

	/**
	 * @type
	 * 1:铜币不足
	 * 2:技能未开启
	 * 3:技能等级达到上限，请提高等级
	 * 4:成功升级技能
	 * 5:技能等级达到上限，请提高转生等级
	*/
	public static WARNTEXT(type) {
		if (type == 1) {
			ViewCommonWarn.text("铜币不足", Color.REDINT);
		} else if (type == 2) {
			ViewCommonWarn.text("技能未开启", Color.REDINT);
		} else if (type == 3) {
			ViewCommonWarn.text("技能等级达到上限，请提高等级", Color.REDINT);
		} else if (type == 4) {
			ViewCommonWarn.text("成功升级技能");
		} else if (type == 5) {
			ViewCommonWarn.text("技能等级达到上限，请提高转生等级", Color.REDINT);
		}
	}

	public static getBestSkill(role: SceneCharRole, testFunc: Function = null): Vo_Skill {
		if (!testFunc) {
			testFunc = SkillUtil.userInputSkill;
		}
		let vomine = Model_player.voMine;
		let skillVo: Vo_Skill = SkillUtil.getWaitSkillVo(role);
		if (skillVo) return skillVo;
		let skillList = [];
		if (role.id == vomine.id) {
			if (role.autoSkill && GGlobal.sceneType != SceneCtrl.SGWS && GGlobal.sceneType != SceneCtrl.CROSS_WARS && (GGlobal.modelGuanQia.inGuanQiaBoss() ||
				GGlobal.mapscene.scenetype != SceneCtrl.GUANQIA)) {
				let skillVo0: Vo_Skill = Model_BaoWu.skillVo(0);
				let skillVo1: Vo_Skill = Model_BaoWu.skillVo(1);
				let tianshuskill = GGlobal.modeltianshu.getTianShuSkill();
				skillList = skillList.concat(role.skillList);
				if (tianshuskill && !role.isSilent) skillList.push(tianshuskill);
				if (skillVo0 && !role.isSilent) skillList.push(skillVo0);
				if (skillVo1 && !role.isSilent) skillList.push(skillVo1);
				let buffID = JSON.parse(Config.skill_210[Model_Skill.bqSkillID].buff)[0][1];
				if (vomine.qcRage >= ~~(Config.changshu_101[75].num / 100) && !vomine.buffCDData[buffID] && buffID > 0 && !vomine.sceneChar.buffData[buffID]) {
					let bqVo = Vo_Skill.create(Model_Skill.bqSkillID, 1, 0);
					skillList.push(bqVo);
				}
			} else {
				skillList = role.skillList;
			}
		} else {
			skillList = skillList.concat(role.skillList);
			if (role.charType == 1 && role.autoSkill && !role.isSilent) {
				if (role.tsID > 0) {
					let skillVo1 = Vo_Skill.create(role.tsID, role.tsStar, role.tsStar);
					skillList.push(skillVo1);
				}
				if (role.bwID1 > 0) {
					let skillVo1 = Vo_Skill.create(role.bwID1, role.bwStar1, role.bwStar1);
					skillList.push(skillVo1);
				}
				if (role.bwID2 > 0) {
					let skillVo1 = Vo_Skill.create(role.bwID2, role.bwStar2, role.bwStar2);
					skillList.push(skillVo1);
				}
			}
		}

		if (skillList.length) {
			var len = skillList.length;
			var skill: Vo_Skill;
			var score = -1;
			for (var i = 0; i < len; i++) {
				var testskill = skillList[i];
				if (testskill.duoduan > 0 && i != role.attackCount && testskill.type == Model_Skill.TYPE1) {
					continue;
				}
				var testscore = testFunc(testskill, role);
				if (testscore > 0 && testscore > score) {
					skill = testskill;
					score = testscore;
				}
			}
			return skill;
		}
		return null;
	}

	public static getWaitSkillVo(role: SceneCharRole): Vo_Skill {
		if (role.waitSkillID > 0) {
			let cfg = Config.skill_210[role.waitSkillID];
			let skillVo: Vo_Skill;
			if (cfg.type == Model_Skill.TYPE4) {
				if (Model_player.voMine.id == role.id) {
					skillVo = Model_BaoWu.skillVo(0);
					if (skillVo && skillVo.id == cfg.id) {
					} else {
						skillVo = Model_BaoWu.skillVo(1);
					}
				} else {
					if (role.waitSkillID == role.bwID1) {
						skillVo = Vo_Skill.create(role.waitSkillID, role.bwStar1, role.bwStar1);
					} else {
						skillVo = Vo_Skill.create(role.waitSkillID, role.bwStar2, role.bwStar2);
					}
				}
			} else if (cfg.type == Model_Skill.TYPE5) {
				if (role.id == Model_player.voMine.id) {
					skillVo = GGlobal.modeltianshu.getTianShuSkill();
				} else {
					skillVo = Vo_Skill.create(role.waitSkillID, role.tsStar, role.tsStar);
				}
			} else if (cfg.type == Model_Skill.TYPE3) {
				for (let i = 0; i < role.skillList.length; i++) {
					if (role.skillList[i].type == Model_Skill.TYPE3) {
						skillVo = role.skillList[i];
						break;
					}
				}
			} else {
				skillVo = Vo_Skill.create(role.waitSkillID, 1, 0);
			}
			if (skillVo) return skillVo;
		} else if (role.waitRushID > 0) {
			let skillVo: Vo_Skill = Vo_Skill.create(role.waitRushID, 1, 1);
			return skillVo;
		} else if (role.waitTSID > 0 && (GGlobal.modelGuanQia.inGuanQiaBoss() || GGlobal.sceneType != SceneCtrl.GUANQIA)) {
			let skillVo: Vo_Skill = Vo_Skill.create(role.waitTSID, 1, 1);
			return skillVo;
		}
	}

	public static userInputSkill(skill: Vo_Skill, role: SceneCharRole): number {

		//章节释放限制wzr
		// if (1 < skill.openguanqia) {
		// 	return -1;
		// }
		let vomine = Model_player.voMine;
		var enemy = role.scene.getUnit(role.careEnemyID);
		if (!enemy) {//NOTARGET
			return -1;
		}
		if (skill.type == Model_Skill.TYPE3 || skill.type == Model_Skill.TYPE4 || skill.type == Model_Skill.TYPE5 || skill.type == Model_Skill.TYPE6
			|| skill.type == Model_Skill.TYPE10) {
			if (skill.id == role.waitRushID) {
				return 99999999;
			} else if (skill.id == role.waitTSID) {
				return 999999999;
			} else if (skill.id == role.waitSkillID) {
				return 999999999;
			} else if (role.autoSkill && GGlobal.sceneType != SceneCtrl.SGWS && GGlobal.sceneType != SceneCtrl.CROSS_WARS && (GGlobal.modelGuanQia.inGuanQiaBoss() ||
				GGlobal.mapscene.scenetype != SceneCtrl.GUANQIA) && skill.type == Model_Skill.TYPE3 && role.rage >= Config.changshu_101[3].num / 100) {
				return 999999999;
			} else if (skill.type == Model_Skill.TYPE5) {
				if (role.isHero() && vomine.skillcdList[0] <= 0) {
					return 999999998;
				} else if (!role.isHero() && role.skillcdList[0] <= 0) {
					return 999999998;
				}
			} else if (skill.type == Model_Skill.TYPE4) {
				if (role.isHero()) {
					let skillVo0: Vo_Skill = Model_BaoWu.skillVo(0);
					let skillVo1: Vo_Skill = Model_BaoWu.skillVo(1);
					if (skillVo0 && skillVo0.id == skill.id && vomine.skillcdList[2] <= 0) {
						return 999999997;
					} else if (skillVo1 && skillVo1.id == skill.id && vomine.skillcdList[1] <= 0) {
						return 999999996;
					}
				} else {
					if (role.bwID1 == skill.id && role.skillcdList[2] <= 0) {
						return 999999997;
					} else if (role.bwID2 == skill.id && role.skillcdList[1] <= 0) {
						return 999999996;
					}
				}
			} else if (skill.type == Model_Skill.TYPE10) {
				return 999999995;
			}
			return -1;
		}
		if (skill.remaincd > 0 || skill.level == 0) {//技能不可释放
			return -1;
		}
		var cfgminfarx = skill.cfg.ai.minf;
		var cfgmaxfarx = skill.cfg.ai.maxf;
		var distx = Math.abs(role.x - enemy.x);
		if (distx > cfgmaxfarx) {
			return 99999999 - cfgminfarx;
		} else if (distx < cfgminfarx) {
			return 99999999 - cfgminfarx;
		}
		return skill.cfg.p;

	}

	//获取buff说明
	static getBuffDescription = (id, level) => {
		let config = Config.buff_011[id];
		let params = JSON.parse(config.param);
		let description = config.miaoshu;
		var len = params.length;
		if (len == 0) return description;
		for (let i = 0; i < len; i += 1) {
			var d: any[] = params[i];
			let value = 0;
			let needAddWithLevel = d.length > 1;//如果是有2个参数 为参数叠加
			for (let j = 0; j < d.length; j++) {
				let key = d[j];
				let temp = 0;
				let needX = 0;
				switch (key) {
					case "gl"://触发概率
						temp = config[key] / 1000;
						break;
					case "cz1"://概率成长*（level-1）
						temp = (config[key] / 1000);
						needX = 1;
						break;
					case "xiaoguo"://属性desc 只取数值
						let type0 = JSON.parse(config[key])[0][0]
						let addValue = JSON.parse(config[key])[0][1];
						if (Config.jssx_002[type0] && Config.jssx_002[type0].type == 2) {
							temp = (addValue / 1000);
						} else {
							temp = addValue;
						}
						break;
					case "cz"://效果成长*（level-1）
						let type1 = JSON.parse(config[key])[0][0]
						let add = JSON.parse(config[key])[0][1];
						if (Config.jssx_002[type1] && Config.jssx_002[type1].type == 2) {
							temp = (add / 1000);
						} else {
							temp = add;
						}
						needX = 1;
						break;
					case "shijian"://持续时间
						temp = config[key];
						break;
					case "sjcz"://时间成长
						temp = config[key];
						needX = 1;
						break;
				}
				if (needAddWithLevel && needX) {
					value += temp * (level - 1)
				} else {
					value += temp;
				}
				value = value <= 0 ? 0 : value;
			}
			description = description.replace(ConfigHelp.getPattern(i), value);
		}
		return description;
	}

}