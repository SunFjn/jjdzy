class Vo_Player {
	/**将衔*/
	public jiangXian = 0;
	/**称号*/
	public title = 0;
	/** vip等级 */
	public viplv = 0;
	/** 玩家唯一ID */
	public id: number;
	/** 职业*/
	public job: number;
	/** 国家 1魏国2蜀国3吴国*/
	public country: number;
	/** 晋升官衔*/
	public jinsheng: number;
	/** 皮肤*/
	public body: number;
	/** 玩家名字 */
	public name: string="";
	/** 英雄名字 */
	public heroName: string;
	/** 主角色等级 */
	public level: number;
	/** 玩家元宝 */
	public yuanbao: number;
	/** 铜币 */
	public tongbi: number;
	/** 星魂 */
	public xinghun: number;
	/** 魂火 */
	public hunhuo: number;
	/**  声望*/
	public prestige: number = 0;
	/**功勋  */
	public gongxun: number = 0;
	/**家园币  */
	public homeMoney: number = 0;
	/**符文经验  */
	public fuwen: number = 0;
	/** 总战力 */
	public str: number;
	/**当前经验 */
	public exp: number = 0;
	/**角色属性 */
	public attributeData: any = {};
	/** 用来保存玩家所操作的场景单位 */
	public sceneChar: SceneCharRole;
	/** 转生ID*/
	public zsID = 0;
	/** 武器*/
	public weapon: number = 0;
	/** 神兵*/
	public godWeapon: number = 0;
	/**兽魂 */
	public _shouHun: number = 0;
	/**经验加成*/
	public expAdd: number = 0;
	/**战场积分*/
	public bossZCScore = 0;
	/**六道印记  */
	public yinji: number = 0;

	/**当前气血  暂时只做保存 自己去赋值**/
	public currentHp: number;
	/** 最大血量*/
	public hp: number;
	/** 攻击力*/
	public att: number;
	/** 防御*/
	public def: number;
	/** 暴击*/
	public crit: number;
	/** 抗暴*/
	public resCrit: number;
	/**命中 */
	public hit: number
	/**闪避 */
	public dodge: number
	/** 真实伤害*/
	public realDmg: number;
	/** 暴击率*/
	public critRate: number;
	/** 抗暴率*/
	public resCritRate: number;
	/**命中率 */
	public hitRate: number
	/**闪避 率*/
	public dodgeRate: number
	/** 暴击伤害加成*/
	public critDmgAdd: number;
	/** 暴击伤害减免*/
	public critDmgReduce: number;
	/** 伤害加成*/
	public dmgAdd: number;
	/** 伤害减免*/
	public dmgReduce: number;
	/** 火焰伤害*/
	public flameDmg: number;
	/** 冰冻伤害*/
	public frozenDmg: number;
	/** 毒液伤害*/
	public venomDmg: number;
	/** 电击伤害*/
	public electricDmg: number;
	/** 爆炸伤害*/
	public blastDmg: number;
	/** 火焰抗性*/
	public flameRes: number;
	/** 冰冻抗性*/
	public frozenRes: number;
	/** 剧毒抗性*/
	public venomRes: number;
	/** 电击抗性*/
	public electricRes: number;
	/** 爆炸抗性*/
	public blastRes: number;


	/** 僵直抵抗强度 */
	public pd: number = 0;
	/** 麻痹率 */
	public dizz: number = 0;
	/** 麻痹时间 */
	public dizzTime: number = 0;
	/** 抵抗麻痹率*/
	public antiDizz: number = 0;
	/** 移动速度*/
	public ms: number;
	public skillList: Vo_Skill[] = [];
	/**玩家装备数据 voEquip */
	public equipData: any = {};
	/**宝物天书技能cd 0天书技能CD 1宝物2技能CD 2宝物1技能CD*/
	public skillcdList: Array<any> = [0, 0, 0];
	/**冲刺技能ID */
	public chongId: number;
	/**神剑 */
	public shenJianID: number;
	/**是否自动释放技能 */
	public autoSkill: boolean = false;
	/**武将时装 */
	public _shiZhuang: number;
	/**宝物1 */
	public bwID1: number;
	/**宝物1星级 */
	public bwStar1: number;
	/**宝物2 */
	public bwID2: number;
	/**宝物2星级 */
	public bwStar2: number;
	/**天书1 */
	public tsID: number;
	/**天书星级 */
	public tsStar: number;

	public rage: number = 0;

	/**武将星级*/
	public star: number;
	// PVP伤害
	public pvpAddHurt: number;
	//PVP伤害减免
	public pvpMinuteHurt: number;
	// PVE伤害加成
	public pveAddHurt: number;
	//五行伤害加成
	public wxAddHurt: number;
	// 五行抗性加成
	public wxMinuteHurt: number;
	// 生命护盾
	public hpShield: number;
	// 血气爆炸
	public hpBlast: number;
	//PVE伤害减免
	public pveMinuteHurt: number;
	// 少主id
	public shaozhuID: number = 0;
	// 少主星级
	public shaozhuStar: number = 1;
	// 少主时装
	public shaozhuFashion: number = 1;
	// 少主技能等级
	public shaozhuSkillLv: number = 1;
	// 轮回id
	public reincarnationLevel: number = 0;
	/**每次攻击回复怒气 */
	public rageReply = 0;
	/**减少宝物天书CD */
	public bwAndTSCD = 0;
	/**宝物治疗效果加成 */
	public bwCurePre = 0;
	/**减少被控时长 */
	public dizzCD = 0;
	/**1.增加自己的技能伤害百分比（不包括普攻） */
	public skillDmgPer = 0;
	/**增加少主技能伤害百分比 */
	public szSkillDmgPer = 0;
	/**降低敌方治疗效果 */
	public enemyCureD = 0;
	/**降低敌方对自己造成的技能伤害 */
	public enemySkillD = 0;
	/**额外连击伤害 */
	public lianjiDmg = 0;
	// 历史最高等级
	public maxLv: number = 0;
	// 角色buffCD
	public buffCDData: { [buffID: number]: number } = {};
	// 奇策曝气值
	public qcRage = 0;
	// 奇策时间
	public qcTime = 0;
	// 桃园结义id
	public tyjyId: number = 0;
	//坐骑id
	public horseId: number = 0;
	//移动总速度
	public speed: number = 0;
	public constructor() {
	}

	public parseDetail(bytes: BaseBytes) {
		var self = this;
		ModelGuanQia.autoWave = Config.xtcs_004[4422].num;
		self.id = bytes.readLong();
		self.name = bytes.readUTF();
		self.level = bytes.readShort();
		self.exp = bytes.readLong();
		self.job = bytes.readInt();
		self.country = bytes.readByte();
		// self.setBody(self.job);
		// self.weapon = self.job;
		self.yuanbao = bytes.readLong();
		self.tongbi = bytes.readLong();
		self.xinghun = bytes.readLong();//星魂
		self.hunhuo = bytes.readLong();//魂火
		self.viplv = bytes.readInt();//vip等级
		self.gongxun = bytes.readInt();//功勋
		self.prestige = bytes.readLong();//声望
		self.str = bytes.readLong();
		self.zsID = bytes.readShort();
		GGlobal.modelGuanQia.curGuanQiaLv = bytes.readInt();//当前关卡
		self.setTitle(bytes.readInt());//I:称号id
		self.setShenJian(bytes.readInt());//I:神剑id
		self.expAdd = bytes.readInt();//经验加成
		self.jinsheng = bytes.readInt();//I:晋升等级
		self.setGodWeapon(bytes.readInt());//I神兵
		self.setShiZhuang(self.job);
		self.fuwen = bytes.readLong();//符文经验
		self.bossZCScore = bytes.readLong();//战场boss积分
		self.shouHun = bytes.bytesAvailable ? bytes.readInt() : 0;//兽魂
		var herocfg = Config.hero_211[self.job];
		self.heroName = herocfg.name;
		self.setAutoSkill(Model_player.autoSkill);
		self.shaozhuID = bytes.readByte();//少主id
		self.shaozhuFashion = bytes.readInt();//少主时装
		self.shaozhuStar = bytes.readInt();//少主星级
		self.shaozhuSkillLv = bytes.readInt();//少主主动技能等级
		self.reincarnationLevel = bytes.readInt();//轮回id
		self.maxLv = bytes.readInt();//历史最高等级
		self.tyjyId = bytes.readLong();//桃园结义id
		self.horseId = bytes.readInt();//坐骑id
		self.speed = bytes.readInt();//总速度
	}

	public parseRole(bytes: BaseBytes) {
		let a = this;
		for (var i = 0, len = bytes.readShort(); i < len; i++) {
			a.parse(bytes);
		}
		a.str = bytes.readLong();
		GGlobal.control.notify(Enum_MsgType.SKILL_UPDATE);
	}

	/**玩家战斗属性 [L:唯一id，第一个跟hid一样B:类型：战士法师道士[I:属性keyI:属性值]属性数据[S:技能等级]技能数据[I:阵眼id]阵眼数据]属性数组，按照UI面板顺序发送L:总战力 */
	public parse(bytes: BaseBytes) {
		let a = this;
		a.id = bytes.readLong();
		a.job = bytes.readInt();
		a.setShiZhuang(a.job);
		a.readBattleProperty(bytes);
		//--attrs
		a.skillList.length = 0;
		a.parseSkill(bytes);
		let len = bytes.readShort();
		for (let i = 0; i < a.skillList.length; i++) {
			let vo: Vo_Skill = a.skillList[i];
			if (vo.cfg.type == Model_Skill.TYPE3) {
				for (let j = 0; j < len; j++) {
					let zhenYanID: number = bytes.readInt();
					vo.zhenYanArr[Math.floor(zhenYanID / 1000) - 1] = zhenYanID;
				}
				break;
			}
		}
		var herocfg = Config.hero_211[a.job];
		a.heroName = herocfg.name;
		// a.body = a.job;
		a.setBody(a.job);
	}

	/**
	 * 读取战斗属性
	 * I:生命I:攻击I:防御I:暴击I:抗暴I:命中I:闪避I:伤害I:暴击率I:抗暴率
	 * I:命中率I:闪避率I:暴伤加成I:暴伤减免I:伤害加成I:伤害减免I:火焰伤害I:冰冻伤害I:毒液伤害I:电击伤害I:爆炸伤害I:火焰抗性I:冰冻抗性I:毒液抗性I:电击抗性
	 * I:爆炸**抗 性
	*/
	public readBattleProperty(bytes: BaseBytes) {
		let len = bytes.readShort();
		let key: string;
		let keyNum: number;
		let valNum: number;
		let obj = Enum_Attr.roleAttributes;
		for (var i = 0; i < len; i++) {
			keyNum = bytes.readInt();
			valNum = bytes.readLong();
			key = obj[keyNum + ""];
			this[key] = Vo_attr.getRealNum(keyNum, valNum);
		}
	}

	/**
	 * GC 战斗玩家的属性数据 L:玩家idU:玩家名称I:将衔I:国家I:称号[L:唯一id，第一个跟hid一样B:人物武将类型[I:属性keyI:属性值]
	 * 战斗属性[B:技能位置0-7I:技能idS:技能等级]技能数据I:时装资源ID]属性L:总战力
	*/
	public parseOtherRole(bytes: BaseBytes) {
		var a = this;
		bytes.readShort();
		bytes.readLong();
		a.job = bytes.readInt();
		a.setShiZhuang(a.job);
		a.setGodWeapon(bytes.readInt());
		a.readBattleProperty(bytes);
		a.skillList.length = 0;
		a.parseOtherSkill(bytes);
		var herocfg = Config.hero_211[a.job];
		a.chongId = herocfg.chong;
		a.heroName = herocfg.name;
		// a.body = a.job;
		a.setBody(a.job);
		var sz = bytes.readInt();
		a.str = bytes.readLong();
	}

	//[I:0（宝物1id）1（宝物1星级）2（宝物2）3（宝物2星级）4（天书id）5（天书星级）6（武将星级）]其他参数数组
	public parseOtherRole2(bytes: BaseBytes) {
		var a = this;
		bytes.readShort();
		bytes.readLong();
		a.job = bytes.readInt();
		a.setShiZhuang(a.job);

		a.readBattleProperty(bytes);
		a.skillList.length = 0;
		a.parseOtherSkill(bytes);
		var herocfg = Config.hero_211[a.job];
		a.chongId = herocfg.chong;
		a.heroName = herocfg.name;
		a.str = bytes.readLong();
	}

	public parseOtherSkill(bytes: BaseBytes) {
		let a = this;
		let fscfg = Config.sz_739[a.job];
		let realJob = 0;
		let jobid;
		if (fscfg) {
			realJob = fscfg.moxing;
			jobid = (a.job / 1000) >> 0;
		} else {
			jobid = realJob = a.job;
		}
		let cfg = Config.hero_211[jobid];
		a.chongId = cfg.chong;
		let attackSkillArr: Array<any> = JSON.parse(cfg.attack)
		var cfgids: Array<number> = attackSkillArr.concat(JSON.parse(cfg.skills));
		for (let i = 0; i < cfgids.length; i++) {
			let id = cfgids[i][0];
			let vo: Vo_Skill = Vo_Skill.create(id, 0, 0);
			a.skillList[i] = vo;
		}
		for (let i = 0, len = bytes.readShort(); i < len; i++) {//3个技能1个神技
			let index = bytes.readByte();
			let id = bytes.readInt();
			let level = bytes.readShort();//技能等级
			let skillPer = bytes.readInt();//I:技能伤害加成
			for (let j = 0; j < a.skillList.length; j++) {
				let vo: Vo_Skill = a.skillList[j];
				if (vo.id == id) {
					vo.level = level;
					vo.starLv = a.star;
					vo.skillPer = skillPer;
					vo.updatePower();
					break;
				}
			}
		}
	}

	/** 修复所有角色气血和内力*/
	public fixRoles() {
		var vo = this;
		var role: SceneCharRole = vo.sceneChar;
		if (role) {
			role.curhp = role.maxhp = vo.hp;
		}
	}

	public updateChars() {
		let a = this;
		if (!a.sceneChar) {
			a.sceneChar = SceneCharRole.create();
		}
		a.sceneChar.id = a.id;
		var scenechar = a.sceneChar;
		scenechar.charType = 1;
		scenechar.curhp = scenechar.maxhp = a.hp;
		for (let key in Enum_Attr.roleAttributes) {
			if (parseInt(key) != 102) {
				if (!a[Enum_Attr.roleAttributes[key]]) a[Enum_Attr.roleAttributes[key]] = 0;
				scenechar[Enum_Attr.roleAttributes[key]] = a[Enum_Attr.roleAttributes[key]];
			}
		}

		scenechar.job = a.job;
		scenechar.autoSkill = a.autoSkill && GGlobal.modelGuanQia.curGuanQiaLv >= GGlobal.autoSkill;
		scenechar.setBody(a.getBody());
		scenechar.str = a.str;
		scenechar.str_per = a.str;
		scenechar.dead = null;
		scenechar.guanzhi = a.jiangXian;
		scenechar.title = a.title;
		scenechar.setWeapon(a.weapon);
		scenechar.setGodWeapon(a.godWeapon);
		scenechar.setCountry(a.country);
		scenechar.setPlayerName(a.name);
		scenechar.setTitle(a.title);
		scenechar.setShenJian(a.shenJianID);
		scenechar.setShouHun(a._shouHun);
		scenechar.skillcdList = a.skillcdList;
		scenechar.curShield = scenechar.maxShield = Math.ceil(a.hp * a.hpShield);
		if (a.chongId > 0) {
			scenechar.waitRushID = a.chongId;
		}
		if (a.hpBlast > 0) {
			scenechar.waitTSID = 120006;
		}
		scenechar.lianjiNum = 0;
		if (a.id == Model_player.voMine.id) {
			GGlobal.layerMgr.close2(UIConst.LIANJI);
		}
		scenechar.bwID1 = a.bwID1;
		scenechar.bwStar1 = a.bwStar1;
		scenechar.bwID2 = a.bwID2;
		scenechar.bwStar2 = a.bwStar2;
		scenechar.tsID = a.tsID;
		scenechar.tsStar = a.tsStar;
		AttributeUtil.updateNamey(scenechar);
		for (var ii = 0, len = a.skillList.length; ii < len; ii++) {
			scenechar.skillList[ii] = a.skillList[ii];
		}
		a.setShaoZhuID(a.shaozhuID);
	}

	public parseSkill(bytes: BaseBytes) {
		let a = this;
		let cfg = Config.hero_211[a.job];
		a.chongId = cfg.chong;
		let attackSkillArr: Array<any> = JSON.parse(cfg.attack)
		var cfgids: Array<number> = attackSkillArr.concat(JSON.parse(cfg.skills));
		for (let i = 0; i < cfgids.length; i++) {
			var id = cfgids[i][0];
			let vo: Vo_Skill = Vo_Skill.create(id, 0, 0);
			vo.openGuanQiaHandle();
			a.skillList[i] = vo;
		}
		for (let i = 0, len = bytes.readShort(); i < len; i++) {//3个技能1个神技
			let pos = bytes.readByte();
			var level = bytes.readShort();//技能等级
			let vo: Vo_Skill = a.skillList[pos + attackSkillArr.length - 1];
			vo.starLv = a.star;
			vo.level = level;
			vo.updatePower();
		}
	}
	public set shouHun(value: number) {
		this._shouHun = value;
		if (this.sceneChar) {
			this.sceneChar.setShouHun(value);
		}
	}
	public get shouHun() {
		return this._shouHun;
	}
	public getBody(): number {
		return this.body;
	}

	public setBody(v) {
		if (this._shiZhuang && Config.sz_739[this._shiZhuang] && Config.sz_739[this._shiZhuang].moxing != v) {
			this.body = Config.sz_739[this._shiZhuang].moxing;
		} else {
			this.body = Config.sz_739[v] ? Config.sz_739[v].moxing : v;
		}
	}

	public setShiZhuang(val: number) {
		const self = this;
		self._shiZhuang = val;
		let isHero = Model_player.isMineID(self.id);
		if (Config.sz_739[val]) {
			self.job = val / 1000 >> 0;
			self.setBody(val);
			self.weapon = val;
		} else {
			if (isHero) {
				const szInfo = Model_WuJiang.shiZhuanDic[self.job];
				if (szInfo && szInfo.onSkinId) {
					self.setBody(szInfo.onSkinId);
					self.weapon = szInfo.onSkinId;
				} else {
					self.setBody(self.job);
					self.weapon = self.job;
				}
			} else {
				self.setBody(self.job);
				self.weapon = self.job;
			}
		}
		if (self == Model_player.voMine) {
			const character = Model_player.voMine && Model_player.voMine.sceneChar;
			if (character) {
				character.setBody(self.getBody());
				character.setWeapon(self.weapon);
			}
		}
	}

	public setTitle(val) {
		let s = this;
		s.title = val;
		if (s.sceneChar) {
			s.sceneChar.setTitle(val);
		}
	}

	public setJiangXian(val) {
		let s = this;
		s.jiangXian = val;
		if (s.sceneChar) {
			s.sceneChar.setJiangXian(val);
		}
	}

	public setCountry(val) {
		let s = this;
		s.country = val;
		if (s.sceneChar) {
			s.sceneChar.setCountry(val);
		}
	}

	public setShenJian(value) {
		let s = this;
		s.shenJianID = value;
		if (s.sceneChar) {
			s.sceneChar.setShenJian(value);
		}
	}

	public setGodWeapon(value) {
		let s = this;
		s.godWeapon = value;
		if (s.sceneChar) {
			s.sceneChar.setGodWeapon(value);
		}
	}

	public setHorseId(value) {
		let s = this;
		s.horseId = value;
		if (s.sceneChar) {
			s.sceneChar.setHorseId(value);
		}
	}

	public setAutoSkill(value) {
		let s = this;
		s.autoSkill = value;
		Model_player.autoSkill = value;
		if (s.sceneChar && GGlobal.modelGuanQia.curGuanQiaLv >= GGlobal.autoSkill) {
			s.sceneChar.autoSkill = value;
		}
	}

	public updateSkill(): void {
		let a = this;
		let arr = [];
		let cfg = Config.hero_211[a.job];
		let attackSkillArr: Array<any> = JSON.parse(cfg.attack)
		var cfgids: Array<number> = attackSkillArr.concat(JSON.parse(cfg.skills));
		for (var i = cfgids.length - 1; i >= 0; i--) {//5个技能
			var id = cfgids[i][0];
			let damage: number = 0;
			let shenjiangzhiliSkillLv: number = Model_WuJiang.shenjiangzhiliSkillLv[a.job] ? Model_WuJiang.shenjiangzhiliSkillLv[a.job] : 0;
			let godskillCfg: Iherogodskill_211 = Config.herogodskill_211[a.job * 100 + shenjiangzhiliSkillLv];
			if (godskillCfg) {
				let attArr = JSON.parse(godskillCfg.attpg);
				let len: number = attArr.length;
				for (let j: number = 0; j < len; j++) {
					if (attArr[j][0] == id) {
						damage = attArr[j][1];
						break;
					}
				}
			}
			let vo: Vo_Skill = Vo_Skill.create(id, 0, 0, 0, 0, damage);
			vo.openGuanQiaHandle();
			if (vo.type == Model_Skill.TYPE1) {
				vo.level = 1;
			} else if (vo.type == Model_Skill.TYPE3) {
				vo.level = 1;//技能等级
				vo.godWeaponPer = Model_ZSGodWeapon.getPerByJob(a.job);
				vo.zhenYanArr = a.skillList[i].zhenYanArr;
			} else {
				for (let j = 0; j < a.skillList.length; j++) {
					if (id % 10 == a.skillList[j].id % 10) {
						vo.level = a.skillList[j].level;
						break;
					}
				}
			}
			if (cfg.godhero == 1) {
				vo.starLv = ModelGodWuJiang.wuJiangStar(a.job);
			} else {
				vo.starLv = Model_WuJiang.wuJiangStar[a.job];
			}
			vo.updatePower();
			arr.unshift(vo);
		}
		a.skillList = arr;
		a.chongId = cfg.chong;
		if (a.sceneChar) {
			a.sceneChar.attackCount = 0;
			a.sceneChar.skillList = arr;
			AttributeUtil.updateNamey(a.sceneChar);
		}
	}
	public parseObject(object) {
		if (DEBUG) {
			var self = this;
			self.id = object.id;
			self.str = object.str;
			self.name = object.name;

			self.id = object.id;
			self.job = object.job;
			self.hp = object.hp;
			self.att = object.att;
			self.def = object.def;
			self.crit = object.cirt;
			self.resCrit = object.resCrit;
			self.hit = object.hit;
			self.dodge = object.dodge;

			self.realDmg = object.realDmg;
			self.critRate = object.critRate;
			self.resCritRate = object.resCritRate;
			self.hitRate = object.hitRate;
			self.dodgeRate = object.dodgeRate;
			self.critDmgAdd = object.critDmgAdd;
			self.critDmgReduce = object.critDmgReduce;
			self.dmgAdd = object.dmgAdd;
			self.dmgReduce = object.dmgReduce;

			var cfgHero = Config.hero_211;
			var herocfg = cfgHero[self.job];
			self.name = herocfg.name;

			if (object.body) {
				self.setBody(object.body);
				// self.body = object.body;
			} else {
				// self.body = self.job;
				self.setBody(self.job);
			}
			self.parseSkillByObj(object.skillList);
		}
	}

	public parseSkillByObj(object) {
	}

	//清理当前准备释放的技能列表
	public clearSkilllist() {
		if (this.sceneChar) {
			this.sceneChar.endSkill();
		}
	}
	public clone() {
		const self = this;
		let ret: any = {};
		for (let key in self) {
			let value = self[key];
			ret[key] = value;
		}
		return ret;
	}

	public setShaoZhuID(shaozhuID) {
		let self = this;
		self.shaozhuID = shaozhuID;
		if (self.sceneChar) {
			self.sceneChar.shaozhuSkillLv = self.shaozhuSkillLv;
			self.sceneChar.shaozhuFashion = self.shaozhuFashion;
			self.sceneChar.shaozhuStar = self.shaozhuStar;
			self.sceneChar.setShaoZhuID(shaozhuID);
		}
	}
}