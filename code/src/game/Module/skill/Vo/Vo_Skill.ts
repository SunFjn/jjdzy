class Vo_Skill {
	public constructor() {
	}

	/** create
	 * @id skillid
	 * @level 技能等级
	 * @starLv 技能等级或武将星级宝物星级
	 * per 专属加成
	 */
	public static create(id, level, starLv, per = 0, autoRemove = 0, damage:number = 0): Vo_Skill {
		var ret = Pool.getItemByClass("Vo_Skill", Vo_Skill) as Vo_Skill;
		// ret.autoRemove = autoRemove;
		ret.id = id;
		ret.level = level;
		ret.starLv = starLv;
		ret.cfg = Config.skill_210[id];
		if (ret.cfg.buff != "0") {
			ret.buff = JSON.parse(ret.cfg.buff)[0][1];
		} else {
			ret.buff = 0;
		}
		ret.icon = ret.cfg.icon;
		ret.name = ret.cfg.n;
		ret.type = ret.cfg.type;
		ret.cdms = ret.cfg.cd * 1000;
		ret.duoduan = ret.cfg.duoduan;
		ret.godWeaponPer = per;
		ret.skillPer = damage;
		if (ret.type == Model_Skill.TYPE1) {
			ret.level = 1;
		}
		ret.updatePower();
		return ret;
	}

	public dispose() {
		let ret = this;
		ret.id = 0;
		ret.level = 0;
		ret.starLv = 0;
		ret.cfg = null;
		ret.buff = 0;
		ret.icon = 0;
		ret.name = null;
		ret.type = 0;
		ret.cdms = 0;
		ret.duoduan = 0;
		ret.godWeaponPer = 0;
		Pool.recover("Vo_Skill", this);
	}


	public openGuanQiaHandle() {
		if (this.type == Model_Skill.TYPE2) {
			this.openguanqia = Config.skillstart_210[(this.id % 10) - 4].start;
		}
	}

	/**是否需要回收*/public autoRemove = 0;
	/**配置信息 */public cfg: Iskill_210;
	/**技能ID*/public id = 0;
	/**技能名称*/public name: string;
	/**等级 */public level = 0;
	/**技能类别*/public type = 1;
	/**冷却时间(毫秒)*/public cdms = 0;
	/**冷却剩余时间*/public remaincd = 0;
	/**多段攻击次数*/public duoduan = 0;

	/**图标id 读取cfg.icon*/public icon = null;
	/**固定威力(技能等级) */public power_lv: number = 0;
	/**攻击力十万分比威力(武将星级或宝物星级) */public powerAtt_lv: number = 0;
	/**技能战力 */public skill_power: number = 0;
	/**增加的被动属性*/public addAttr;
	/**开启关卡需求*/public openguanqia: number = 0;
	/**神技阵眼ID保存*/public zhenYanArr: Array<any> = [1000, 2000, 3000];
	/**武将星级或宝物星级*/public starLv: number = 0;
	/**s神兵专属加成*/public godWeaponPer: number = 0;
	/**buffID*/public buff = 0;
	/**技能加成*/public skillPer = 0;

	/**更新威力数值 */
	public updatePower() {
		var self = this;

		var cfg = self.cfg;
		//基础威力 + 等级 * 威力成长
		self.power_lv = cfg.bp + self.level * cfg.pg;
		//基础攻击力百分比 + 武将星级或宝物星级 * 攻击百分比成长
		self.powerAtt_lv = cfg.attp + self.starLv * cfg.attpg + self.godWeaponPer + self.skillPer;
		self.skill_power = cfg.zlp + self.level * cfg.zlg;
		if (self.cfg.attr != 0) {
			if (self.addAttr) {
				self.addAttr.length = 0;
			} else {
				self.addAttr = [];
			}
			for (var i = 0; i < cfg.attr.length; i++) {
				var list = self.addAttr[i];
				if (!list) {
					list = [];
					self.addAttr[i] = list;
				}
				list[0] = cfg.attr[0][0];
				list[1] = cfg.attr[0][1] + cfg.attrg[0][1] * self.level;
			}
		}
	}

	public enterCool() {
		this.remaincd = this.cdms;
	}

	public enterCool0() {
		this.remaincd = this.cfg.cd0 ? this.cfg.cd0 * 1000 : 0;
	}

	public getHtmlDes() {
		return this.cfg.des;
	}

	public static getScore(role: SceneCharRole, skill: Vo_Skill): number {
		if (skill.remaincd > 0) {
			return -1;
		}
		if (skill.type == 1) {
			var skillDistx = 0;
			var skillDisty = 0;
			var nearestEnemy: SceneCharRole = role.scene.getBestRole(MapScene.NEARESTENEMYFUNC, role);

			if (nearestEnemy) {
				var enemyLength = MoveUtil.dist(role.x, role.y, nearestEnemy.x, nearestEnemy.y);
				return 100000000 - enemyLength + skillDistx + skillDisty;
			}
		}
		return -1;
	}
}