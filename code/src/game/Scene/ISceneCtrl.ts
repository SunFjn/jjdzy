interface ISceneCtrl {
	onEnter(scene: MapScene);
	onExit(scene: MapScene);
	update(ctx);

	/**伤害计算修正标识 
	 * 1：怪物打人至少造成气血 * 0.05 的伤害
	*/
	damageFix: number;
}

class SceneCtrl {
	/**关卡小怪 */public static GUANQIA = 1;
	/**关卡BOSS */public static GUANQIABOSS = 2;
	/**一骑当千 */public static YJDQ = 3;
	/**材料副本 */public static CAILIAO_FUBEN = 4;
	/**主城地图 */public static MAINTOWN = 5;
	/**单人BOSS */public static PBOSS = 6;
	/**铜雀台 */public static PEACOCK = 7;
	/**南征北战 */public static NANZHENG_BEIZHAN = 8;
	/**过关斩将 */public static RUNMAN = 9;
	/**三国战神 */public static SANGUO_ZHANSHEN = 10;
	/**王位之争 */public static KING_SHIP = 11;
	/**单刀赴会 */public static DANDAO_FUHUI = 12;
	/**乱世枭雄 */public static CROSS_KING = 13;
	/**枭雄争霸 */public static CROSS_WARS = 14;
	/**全名BOSS */public static QMBOSS = 21;
	/**吕布 */public static LVBU = 22;
	/**孟获 */public static MENGHUO = 23;
	/**三国无双 */public static SGWS = 24;
	/**血战到底 */public static WARTODEAD = 25;
	/**国家BOSS */public static COUNTRYBOSS = 26;
	/**组队副本 */public static CROSS_TEAM = 27;
	/**宝物现世 */public static BW_XIANSHI = 28;
	/**升阶秘境 */public static CROSS_SJMJ = 29;
	/**烽火狼烟 */public static FHLY = 40;
	/**后端数据战斗 */public static SERVERBATTLE = 41;
	/**自由行走地图*/public static ARPG = 10000;
	/**问鼎天下 PVE战斗*/public static WDTX_PVE = 42;
	/**诸将演武战斗*/public static ZJYWBAT = 43;
	/**BOSS战场 BOSS*/public static BOSSZC = 44;
	/**关卡协助BOSS */public static GUANQIABOSS_HELP = 45;
	/**三国一统*/public static SANGUO_YITONG = 46;
	/**挖矿战斗*/public static WA_KUANG = 47;
	/**全名BOSS 单机*/public static QMBOSS_DJ = 48;
    /**火烧赤壁*/public static HSCB = 49;
    /**少主护送*/public static SHAOZHU_ESCORT = 50;
	/**升阶秘境 */public static LIU_CHU_QS = 51;
	/**曹操来袭 */public static CAOCAOLAIXI = 52;
	/**虎牢关 */public static TIGER_PASS = 53;
	/**群雄逐鹿 */public static QXZL = 54;
	/**异兽BOSS*/public static YISHOUBOSS = 55;
	/**张飞醉酒*/public static HFHD_ZFZJ = 56;
	/**三英战吕布=*/public static SYZLB = 57;
	/**粮草=*/public static LIANGCAO = 58;
	/**前端用战斗 测试中*/public static CLIENT_BATTLE = 59;
	/**桃园结义 */public static TAOYUANJIEYI = 60;
	/**跨服王者*/public static KFWZ = 61;
	/**录像*/public static COMMON_VIDEOTAP = 62;
	/**活动-擂台*/public static ACTCOM_LEITAI = 63;
	/**轮回副本*/public static LHFB = 64;
	/**登峰造极-海选 */public static DENG_FENG = 65;
	/**家园强盗*/public static HOME_QD = 66;
	public static getCtrl(scenetype): ISceneCtrl {
		var sceneCtrl = SceneCtrl;
		GGlobal.sceneType = scenetype;
		if (scenetype == sceneCtrl.GUANQIA) {
			// if (DEBUG) {
			// 	return new GuanQiaSceneTestCtrl();
			// }
			// if (RELEASE) {
			return GuanQiaSceneCtrl.getIns();
			// }
		} else if (scenetype == sceneCtrl.GUANQIABOSS) {
			return GuanQiaBossCtrl.getIns();
		} else if (scenetype == sceneCtrl.MAINTOWN) {
			return new MainTownSceneCtrl();
		} else if (scenetype == sceneCtrl.YJDQ) {
			return YJDQSceneCtrl.instance;
		} else if (scenetype == sceneCtrl.PBOSS) {
			return new PersonalBossCtr();
		} else if (scenetype == sceneCtrl.PEACOCK) {
			return new PeacockSceneCtrl();
		} else if (scenetype == sceneCtrl.CAILIAO_FUBEN) {
			return CaiLiaoFuBenSceneCtrl.instance;
		} else if (scenetype == sceneCtrl.QMBOSS) {
			return new QuanMinBossSceneCtrl();
		} else if (scenetype == sceneCtrl.QMBOSS_DJ) {
			return new QuanMinBossSceneCtrl_dj();
		} else if (scenetype == sceneCtrl.NANZHENG_BEIZHAN) {
			return NanZhengBeiZhanCtrl.instance;
		} else if (scenetype == sceneCtrl.RUNMAN) {
			return new RunManSceneCtrl();
		} else if (scenetype == sceneCtrl.LVBU) {
			return new LvBuSceneCtrl();
		} else if (scenetype == sceneCtrl.SANGUO_ZHANSHEN) {
			return SanGuoZhanShenCtrl.instance;
		} else if (scenetype == sceneCtrl.KING_SHIP) {
			return KingShipCtrl.instance;
		} else if (scenetype == sceneCtrl.CROSS_KING) {
			return CrossKingCtrl.instance;
		} else if (scenetype == sceneCtrl.CROSS_WARS) {
			return CrossWarsCtrl.instance;
		} else if (scenetype == sceneCtrl.QXZL) {
			return QxzlCtrl.instance;
		} else if (scenetype == sceneCtrl.MENGHUO) {
			return new MengHuoCtr();
		} else if (scenetype == sceneCtrl.SGWS) {
			return PVPFightSceneProgresser.getInst();
		} else if (scenetype == sceneCtrl.DANDAO_FUHUI) {
			return DanDaoFuHuiCtrl.instance;
		} else if (scenetype == sceneCtrl.WARTODEAD) {
			return WarToDeadSceneCtrl.getInst();
		} else if (scenetype == sceneCtrl.COUNTRYBOSS) {
			return CountryBossCtrl.getInst();
		} else if (scenetype == sceneCtrl.CROSS_TEAM) {
			return CrossTeamSceneCtrl.getInst();
		} else if (scenetype == sceneCtrl.CROSS_SJMJ) {
			return ShengJieMJSceneCtrl.getInst();
		} else if (scenetype == sceneCtrl.BW_XIANSHI) {
			return new BaoWuXianShiCtrl();
		} else if (scenetype == sceneCtrl.FHLY) {
			return FengHuoLYCtrl.getInstance();
		} else if (scenetype == sceneCtrl.SERVERBATTLE) {
			return ServerDataBattleCtrl.instance;
		} else if (scenetype == sceneCtrl.KFWZ) {
			return KfwzCtrl.instance;
		} else if (scenetype == sceneCtrl.ARPG) {
			return ARPGCtrl.getInstance();
		} else if (scenetype == sceneCtrl.WDTX_PVE) {
			return WenDingTXPVECtrl.getInstance();
		} else if (scenetype == sceneCtrl.ZJYWBAT) {
			return ZJYWSceneCtrl.getInst();
		} else if (scenetype == sceneCtrl.BOSSZC) {
			return BossZCCtrl.getInstance();
		} else if (scenetype == sceneCtrl.GUANQIABOSS_HELP) {
			return GuanQiaBossServerCtr.getInstance();
		} else if (scenetype == sceneCtrl.SANGUO_YITONG) {
			return SanGuoYiTongSceneCtrl.instance;
		} else if (scenetype == sceneCtrl.LHFB) {
			return LhfbCtrl.instance;
		} else if (scenetype == sceneCtrl.WA_KUANG) {
			return WaKuangCtrl.instance;
		} else if (scenetype == sceneCtrl.HSCB) {
			return HscbSceneCtrl.getInstance();
		} else if (scenetype == sceneCtrl.SHAOZHU_ESCORT) {
			return ShaoZhuEscortCtrl.instance;
		} else if (scenetype == sceneCtrl.LIU_CHU_QS) {
			return LiuChuQSSceneCtrl.getInst();
		} else if (scenetype == sceneCtrl.SYZLB) {
			return SyzlbSceneCtrl.getInst();
		} else if (scenetype == sceneCtrl.CAOCAOLAIXI) {
			return CaoCaoCtr.instance;
		} else if (scenetype == sceneCtrl.TIGER_PASS) {
			return TigerPassSceneCtrl.getInst();
		} else if (scenetype == sceneCtrl.YISHOUBOSS) {
			return YiShouBossCtrl.getInst();
		} else if (scenetype == sceneCtrl.HFHD_ZFZJ) {
			return ZFZJCtr.instance;
		} else if (scenetype == sceneCtrl.LIANGCAO) {
			return LiangCaoPveCtr.instance;
		} else if (scenetype == sceneCtrl.CLIENT_BATTLE) {
			return ClientBattleSceneCtrl.instance;
		} else if (scenetype == sceneCtrl.TAOYUANJIEYI) {
			return TaoYuanBossCtrl.getInst();
		} else if (scenetype == sceneCtrl.COMMON_VIDEOTAP) {
			return CommonVideotapeCtrl.instance;
		} else if (scenetype == sceneCtrl.ACTCOM_LEITAI) {
			return ActComLeiTaiSceneCtrl.instance;
		}else if(scenetype == sceneCtrl.DENG_FENG){
			return DengFengCtrl.instance;
		} else if (scenetype == sceneCtrl.HOME_QD) {
			return HomeBattleCtrl.instance;
		}
	}

	public pveTime = 120000;
	public pvpTime = 60000;
	public surTime = 20000;
	public damageFix = 0;
	scene: MapScene;
	public createEmeny(id) {
		var cfgInfo = Config.NPC_200[id];
		var enemy = SceneCharRole.create();
		enemy.id = SceneObject.COUNTER++;
		enemy.enemyid = id;
		enemy.curhp = enemy.maxhp = Number(cfgInfo.hp);
		enemy.faceDir = -1;
		enemy.force = 2;
		enemy.invalid = 1023;
		enemy.forceRightWeight = 1000;
		var skills: Array<any> = JSON.parse(cfgInfo.skill);
		if (skills) {
			for (var i = 0; i < skills.length; i += 1) {
				var pg = Vo_Skill.create(parseInt(skills[i][0]), parseInt(skills[i][1]), parseInt(skills[i][1]), 0, 1);
				enemy.skillList.push(pg);
			}
		}
		AttributeUtil.initEnemyAttr(enemy, cfgInfo);
		return enemy;
	}


	/***
	 * 相对自己的胜负改变属性
	 * 1失败 2胜利
	*/
	public scaleAttribute(role: SceneCharRole, battleRet: number = 1, isSelf: boolean = false) {
		// if (!isSelf) {//小怪相反
		// 	if (battleRet == 1) role.serverCtr = 2;
		// 	else if (battleRet == 2) role.serverCtr = 1;
		// } else {
		// 	role.serverCtr = battleRet;
		// }
		// role.scaleAttribute();
	}

	/**设置地图 id=地图表地图id */
	public setMapHead(id: number): void {
		this.scene.initWithID(id);
	}

	public setRolePos(role: SceneCharRole, offsetX = 0) {
		var x = this.scene.map.focusx;
		if (!x) {
			x = 418;
		}
		role.x = x + offsetX;
		role.y = 612;
	}

	public setBossPos(role: SceneCharRole, offsetX = 0) {
		let cx = this.scene.map.focusx;
		role.x = cx + 400 + offsetX;
		role.y = 600;
	}

	public setMonsterPos(enemy: SceneCharRole) {
		let role = this.scene.getLifeHero();
		enemy.x = MathUtil.rndNum(role.x + 400, role.x + 600);
		enemy.y = MathUtil.rndNum(562, 662);
	}

	public addHpAndName(role: SceneCharRole, isSelf: boolean) {
		var namebar = RoleHpAndNamePlug.create(isSelf);
		namebar.role = role;
		role.addPlug(namebar);
	}

	/**判断强制杀死战力低的人 */
	public killRole(role0: SceneCharRole, role1: SceneCharRole) {
		if (role0.str >= role1.str) {
			role1.takeMaxHurt();
		} else {
			role0.takeMaxHurt();
		}
	}

	protected lastTime = 0;
	protected deadInvide = 0;
	dmgByClient(ebos: SceneCharRole, bossDmgPer: number) {
		let self = this;
		if (GGlobal.pauseBattle) return;
		let role = Model_player.voMine.sceneChar;
		let now = egret.getTimer();
		if (now - self.lastTime < 1000) return;
		self.lastTime = now;
		if (role && role.curhp > 0 && GGlobal.mapscene.getForceCount(2) > 0) {
			if (role.immuneDmg || role.invincible) {
				return;//无敌不计算伤害
			}
			if (ebos && ((ebos.dizzState && ebos.dizzState.isWorking) || ebos.changeModel > 0)) {
				return;//定身 眩晕不计算伤害
			}
			let ret = (role.maxhp * bossDmgPer / 100) >> 0;
			if (role.curShield > 0) {
				role.curShield = role.curShield > ret ? role.curShield - ret : 0;
				ret = role.curShield > ret ? 0 : ret - role.curShield;
			}
			ret = role.curhp - ret;
			ret = ret < 0 ? 0 : ret;
			role.curhp = ret;
			if (ret <= 0 && self.deadInvide == 0) {
				role.deadThrow(5, 15);
				if (role.curhp <= 0) {
					self.deadInvide |= 1;
					self.tellDead();
				} else {
					ret = role.curhp;
				}
			}
			GGlobal.control.notify(Enum_MsgType.MSG_MINEHPCHANGE, { hp: ret });
		}
	}

	protected tellDead() {

	}
}