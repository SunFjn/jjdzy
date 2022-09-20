class GuanQiaBossCtrl extends SceneCtrl {
	public constructor() {
		super();
	}

	public scene: MapScene;
	/**创建BOSS 0*/
	static CREATE = 0;
	/**同步数据至服务器 1*/
	static SYSNCHRON = 1;
	/**BOSS已经被击杀 2*/
	static KILL = 2;
	/**战斗结束 -1*/
	static BATTLE_END = -1;
	/**拾取奖励 3*/
	static DROPGOODS = 3;
	/**战斗失败 100*/
	static LOSE = 100;
	public bossstate = -1;

	public state = 0;

	public result = 0;

	public bossid;
	public jingjiaMonster: SceneCharRole;
	public boss: SceneCharRole;
	private isLeft:boolean = false;//是否中途退出
	private static _ins: GuanQiaBossCtrl;
	public static getIns() {
		if (!GuanQiaBossCtrl._ins) {
			GuanQiaBossCtrl._ins = new GuanQiaBossCtrl();
		}
		return GuanQiaBossCtrl._ins;
	}

	public returnGuanqia() {
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
	}

	onEnter(scene: MapScene) {
		let s = this;
		s.isLeft = false;
		s.scene = scene;
		scene.ignoreBreak = false;

		let modelguanqia = GGlobal.modelGuanQia;
		let lib = Config.xiaoguai_205;
		let mapid = Config.BOSS_205[modelguanqia.curGuanQiaLv].m;
		s.scene.initWithID(mapid);
		s.createMyChars();

		s.scene.setLeftAndRight();

		s.setBossSt(GuanQiaBossCtrl.CREATE);
		if (Model_LunHui.realLv >= Config.xtcs_004[4426].num) {
			MainUIController.showBottomExite(true, Handler.create(s, s.exitT));
		}
		GGlobal.control.listen(Enum_MsgType.MSG_BOSS_RET, s.bossRet, s);
		GGlobal.control.listen(Enum_MsgType.MSG_JUQING_STATUS, s.juQingStatus, s);
		GGlobal.modelGuanQia.setBossTime(this.pveTime);//十分钟战斗时间

		let layerMgr = GGlobal.layerMgr;
		let uiconst = UIConst;
		layerMgr.close2(uiconst.GUANQIABOSSUI);

		let vomine = Model_player.voMine;
		if (GGlobal.modelGuanQia.curGuanQiaLv <= Config.xtcs_004[4421].num && vomine.sceneChar) {
			if (vomine.sceneChar.rage < Config.xtcs_004[2808].num) {
				vomine.sceneChar.rage = Config.xtcs_004[2808].num;
				GGlobal.control.notify(Enum_MsgType.ROLE_RAGE_UPDATE);
			}
		}
		let cfg = Config.BOSS_205[GGlobal.modelGuanQia.curGuanQiaLv];
		if (cfg) s.scene.initWithID(cfg.m);
		ViewJuQingPanel.status = 0
	}

	onExit(scene: MapScene) {
		let s = this;
		MainUIController.showBottomExite(false, Handler.create(s, s.exitT));
		GGlobal.control.remove(Enum_MsgType.MSG_BOSS_RET, s.bossRet, s);
		GGlobal.control.remove(Enum_MsgType.MSG_JUQING_STATUS, s.juQingStatus, s);

		let layerMgr = GGlobal.layerMgr;
		let uiconst = UIConst;
		layerMgr.close2(uiconst.BATTLEWIN);
		View_BossSceneHead.hide();

		s.setBossSt(GuanQiaBossCtrl.BATTLE_END);
		s.scene.removeAll();
		s.boss = null;
		s.jingjiaMonster = null;
		s.bossstate = 0;

		let sceneDropCrrl = SceneDropCtrl.instance;
		sceneDropCrrl.onEixt();
	}

	public createMyChars() {
		let s = this;
		let vomine = Model_player.voMine;
		vomine.updateChars();
		let role: SceneCharRole = vomine.sceneChar;
		role.scene = s.scene;
		if (s.scene.getUnit(role.id)) {
			s.scene.watchMainRole(35);
			return;
		}
		let m = GGlobal.modelGuanQia;
		role.curhp = role.maxhp;
		s.setRolePos(role);
		role.invalid |= 1023;
		role.force = 1;
		s.scene.addUnit(role);
		s.scene.watchMainRole(35);
		s.addHpAndName(role, true);
	}

	public aiUpdate(ctx) {
		let vomine = Model_player.voMine;
		GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
	}

	public bossAiUpdate(ctx) {
		let enemys: SceneCharRole[] = this.scene.filterRole(MapScene.ISLIFEENEMY, 1);
		for (let len = enemys.length, i = 0; i < len; i++) {
			let enemy = enemys[i];
			GuanQiaAI.thinkAttack(enemy, ctx);
		}
	}

	protected exitT() {
		if (ViewJuQingPanel.status > 1) { ViewCommonWarn.text("剧情中，请稍后操作"); return; }
		let s = this;
		s.isLeft = true;
		GGlobal.modelGuanQia.setAuto(false);
		s.returnGuanqia();
	}

	protected bossRet(ret = 2) {
		let s = this;
		if (ret == 2) {
			if (!GGlobal.modelGuanQia.bossAwardSrc || GGlobal.modelGuanQia.bossAwardSrc.length == 0) {
				GGlobal.layerMgr.open(UIConst.BATTLEWIN);
			} else {
				s.setBossSt(3);
			}
		} else {
			ViewBattleFault.show(5000, s, "退出", s.onFaultUIExitT);
		}
	}

	private storyUpdate() {
		let s = this;
		View_BossSceneHead.createInstance().visible = false;
		let complete = GuanQiaAI.keepPos(Model_player.voMine);
		if (complete && ViewJuQingPanel.status == 0) {
			if (GGlobal.modelGuanQia.curGuanQiaLv > ViewJuQingPanel.maxGua) {
				ViewJuQingPanel.status = 1;
			} else {
				// GGlobal.mapscene.map.watchFocus(0, 0);
				let juQArr = ViewJuQingPanel.getJuQCfg(1, GGlobal.modelGuanQia.curGuanQiaLv);
				if (juQArr[0].npc == 0) {
					ViewJuQingPanel.status = 3;
				} else {
					ViewJuQingPanel.status = 4;
				}
				setTimeout(function () {
					GGlobal.layerMgr.open(UIConst.XIN_SHOU_JU_QING, [1, GGlobal.modelGuanQia.curGuanQiaLv]);
				}, 600);
			}
		}
		if (s.juQingStatus(false)) {
			return true;
		}
		if (complete && ViewJuQingPanel.status == 1) {
			s.setBossSt(GuanQiaBossCtrl.SYSNCHRON);
			View_BossSceneHead.createInstance().visible = true;
			GGlobal.layerMgr.open(UIConst.BOSSANI);
		}
		return false;
	}

	public update(ctx) {
		let s = this;
		if (s.bossstate == GuanQiaBossCtrl.CREATE) {//保持阵型
			if (s.storyUpdate()) return;
		} else if (s.bossstate == GuanQiaBossCtrl.SYSNCHRON) {
			let m = GGlobal.modelGuanQia;
			s.aiUpdate(ctx);
			s.bossAiUpdate(ctx);
			let myhp = s.scene.getForceCount(1);
			let bosshp = s.scene.getForceCount(2);
			if (bosshp <= 0) {//success
				s.result = 1;
				s.setBossSt(GuanQiaBossCtrl.KILL);
			} else if (myhp <= 0) {//fault
				s.result = -1;
				s.setBossSt(GuanQiaBossCtrl.LOSE);
			} else {
				let remain = m.bossTime - ctx.dt;
				m.setBossTime(remain);
				if (remain <= 0) {
					remain = 0;
					s.setBossSt(GuanQiaBossCtrl.LOSE);
				}
			}
		} else if (s.bossstate == GuanQiaBossCtrl.KILL) {//胜利定时同步服务器
			s.intevalSynWin();
		}

		let boss: SceneCharRole = s.scene.getUnit(s.bossid);
		if (boss) {
			GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, boss.curhp);
		} else {
			GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, 0);
		}

		s.scene.watchMainRole(35);
	}

	private juQingStatus(kill = true): boolean {
		let s = this;
		if (ViewJuQingPanel.status == 3) {
			var mainRole: SceneCharRole = s.scene.getLifeHero();
			if (mainRole) s.scene.map.watchFocusTween(mainRole.x + 35, mainRole.y, kill);
			return true;
		} else if (ViewJuQingPanel.status == 4) {
			let watchB: SceneCharRole = s.scene.getUnit(s.bossid);
			if (watchB) s.scene.map.watchFocusTween(watchB.x + 35, watchB.y, kill);
			return true;
		}
		return false;
	}

	public setBossSt(st) {
		let s = this;
		let m = GGlobal.modelGuanQia;
		switch (s.bossstate) {
			case GuanQiaBossCtrl.CREATE:
				break;
			case GuanQiaBossCtrl.SYSNCHRON:
				let rwds = GGlobal.modelBoss.bossAward;
				break;
			case GuanQiaBossCtrl.BATTLE_END:
				break;
			case GuanQiaBossCtrl.DROPGOODS:
				SceneDropCtrl.instance.remove(SceneDropCtrl.MSG_DROP_END, s.onDroped, s);
				break;
			case GuanQiaBossCtrl.KILL:
				break;
			case GuanQiaBossCtrl.LOSE:
				m.CS_BOSSREST_1105(2);//强制失败，同步服务端
				m.setAuto(false);
				break;
		}

		switch (st) {
			case GuanQiaBossCtrl.CREATE:
				if (GGlobal.modelGuanQia.curGuanQiaLv <= ViewJuQingPanel.maxGua) {//剧情系统  把坐标放到0点防止后面黑屏
					GGlobal.mapscene.map.watchFocus(0, 0);
					var mainRole: SceneCharRole = s.scene.getLifeHero();
					mainRole.x = GGlobal.mapscene.map.focusLimitLeft;
				}
				s.createMyChars();
				s.createEnemys();
				break;
			case GuanQiaBossCtrl.SYSNCHRON:
				let rwds = GGlobal.modelBoss.bossAward;
				break;
			case GuanQiaBossCtrl.BATTLE_END:
				// s.returnGuanqia();
				if(s.result == 1 && !s.isLeft)
				{
					ViewGuanQiaTips.show();
				}
				return;
			case GuanQiaBossCtrl.DROPGOODS:
				let sceneDropCrrl = SceneDropCtrl.instance;
				sceneDropCrrl.addRole(s.boss);
				sceneDropCrrl.onEnter(s.scene);
				sceneDropCrrl.dropGoods({ id: s.boss.enemyid, drop: GGlobal.modelGuanQia.bossAwardSrc });
				sceneDropCrrl.listen(SceneDropCtrl.MSG_DROP_END, s.onDroped, s);
				break;
			case GuanQiaBossCtrl.KILL:
				s.dt = 0;
				s.synWin();
				break;
			case GuanQiaBossCtrl.LOSE:
				GGlobal.mapscene.removeAll();
				ViewBattleFault.show(5000, s, "退出", s.onFaultUIExitT);
				break;
		}
		s.bossstate = st;
	}

	protected onDroped() {
		GGlobal.layerMgr.open(UIConst.BATTLEWIN);
	}

	protected onFaultUIExitT(self: GuanQiaBossCtrl, ui: ViewBattleFault) {
		GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
	}

	protected dt;
	protected intevalSynWin() {
		let s = this;
		s.dt += GGlobal.mapscene.dt;
		if (s.dt >= 8000) {
			s.dt = 0;
			s.synWin();
		}
	}

	protected synWin() {
		GGlobal.modelGuanQia.CS_BOSSREST_1105(1);
	}

	public createEnemys() {
		let s = this;
		let m = GGlobal.modelGuanQia;
		let bossList = ConfigHelp.splitIntArr(Config.BOSS_205[m.curGuanQiaLv].BL);
		let list = bossList[0];
		let cx = s.scene.map.focusx;
		let enemy;
		let id = list[1];
		let count = list[2];
		for (let ii = 0; ii < count; ii++) {
			enemy = s.createEmeny(id);
			s.setBossPos(enemy, 500);
			enemy.force = 2;
			s.scene.addUnit(enemy);
		}
		s.bossid = enemy.id;
		s.boss = enemy;
		enemy.enemyid = enemy.id;
		View_BossSceneHead.show(id, false, 0);

		//创建金甲
		let bool = m.hasSurprise;
		if (bool) {
			let jjid = Config.xtcs_004[3921].num;
			enemy = s.createEmeny(jjid);
			s.setBossPos(enemy, 540);
			enemy.y = 650;
			enemy.curhp = enemy.maxhp = ModelGuanQia.MAX_HP;
			enemy.force = 2;
			s.scene.addUnit(enemy);
			s.jingjiaMonster = enemy;
			let hpplug = GuanQiaMonHpPlug.create();
			hpplug.role = enemy;
			enemy.addPlug(hpplug);
			enemy.dropDta = [[1, 401033, 1]];//GGlobal.modelGuanQia.goldBossAward;
		}
	}
}