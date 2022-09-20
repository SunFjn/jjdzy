class LvBuSceneCtrl extends BossCtrl {
	public constructor() {
		super();
	}


	private timeinfo: TimeLimitPanel;
	public state = -1;
	public onEnter(scene: MapScene) {
		super.onEnter(scene);
		scene.ctx.clearHurt = true;
		scene.ctx.isClearShow = true;
		let s = this;
		let c = GGlobal.control;

		s.setSt(0);

		GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		c.listen(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
		c.listen(Enum_MsgType.LB_SCENE_PLAYER_STATE, s.generalStateChange, s);
		c.listen(Enum_MsgType.LB_ROLE_LIFE, s.roleState, s);
		c.listen(Enum_MsgType.RANK_UPDATE, s.updateData, s);
		c.listen(Enum_MsgType.LB_BOSS_STATE, s.bossStateChange, s);
		LvBuSceneInfo.instance.onopen();
		ChildComAutoRevive.createInstance().show1();
	}

	public onExit(scene: MapScene) {
		let s = this;
		this.hasCheck = false;
		let c = GGlobal.control;
		GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		c.remove(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
		c.remove(Enum_MsgType.LB_SCENE_PLAYER_STATE, s.generalStateChange, s);
		c.remove(Enum_MsgType.LB_ROLE_LIFE, s.roleState, s);
		c.remove(Enum_MsgType.RANK_UPDATE, s.updateData, s);
		c.remove(Enum_MsgType.LB_BOSS_STATE, s.bossStateChange, s);
		s.deadInvide = 0;
		s.setSt(-1);
		s.roleState(0);
		super.onExit(scene);
		GGlobal.modelBoss.curEnterId = 0;
		GGlobal.modelBoss.myHurt = 0;
		LvBuSceneInfo.instance.onclose();
		ChildComAutoRevive.createInstance().hide1();
		this.others = [];
	}

	private hasCheck = false;
	public update(ctx) {
		let s = this;
		if (s.state == 0) {
			s.aiUpdate(ctx);
			s.scene.watchMainRole();
		}
		s.dmgByClient(s.enemyBoss, s.bossDmgPer);
		let st = GGlobal.modelBoss.lvbuSt;
		if (st == 0 && !s.hasCheck) {//处于未开启状态弹出，后台运行比较容易出现问题
			s.hasCheck = true;
			s.bossStateChange();
		}
	}

	private roleState(ret) {
		let role = Model_player.voMine.sceneChar;
		if (ret == 1) {
			GGlobal.layerMgr.open(UIConst.RELIFEPANEL);
			if (role) {
				GGlobal.mapscene.removeUnit(role);
			}
		} else {
			GGlobal.layerMgr.close2(UIConst.RELIFEPANEL);
			if (!role) {
				this.createMyChars();
			}
			role = Model_player.voMine.sceneChar;
			role.immuneDmg = 0;
			role.curhp = role.maxhp;
			role.hurt_state = 0;
		}
	}

	protected onClickEixt() {
		let s = this;
		ViewAlert.show("是否退出?\n(退出后<font color='#ffc334'>30秒</font>不可再次进入)", Handler.create(s, s.directExite));
	}

	protected directExite() {
		GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
		GGlobal.modelBoss.CG_LBEXITE_1507();
	}

	public bossStateChange() {
		let s = this;
		let m = GGlobal.modelBoss;
		let bst = m.lvbuSt;
		if (bst == 4) {
			let layerMgr = GGlobal.layerMgr;
			let uiconst = UIConst;
			let awards = Config.lvbuboss_224[m.curEnterId].joinreward;
			awards = ConfigHelp.makeItemListArr(JSON.parse(awards));
			GGlobal.modelBoss.bossAward = m.lb_extra_award.concat(awards);
			layerMgr.open(uiconst.BATTLEWIN);
			m.lb_extra_award = [];
		} else if (bst == 0) {
			ViewBattleFault.show(3000, s, "离开", s.directExite, s.directExite);
		} else if (bst == 1 || bst == 2 || bst == 3) {
			s.setSt(0);
		}
	}

	protected initState: number = 0;
	protected updateData(): void {
		let s = this;
		let m = GGlobal.modelBoss;
		if (!(s.initState & 1)) {//是否初始化
			s.initState |= 1;
			let bid = m.curEnterId;
			View_BossSceneHead.show(bid, false, m.bossMaxHp)
		}
		GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, m.bossHp);
		if (m.bossHp <= 0) {//BOSS被击杀
			s.setSt(2);
		}
	}

	protected dailog: number = 0;
	protected dieTime: number;
	public setSt(st) {
		let s = this;
		let id = GGlobal.modelBoss.curEnterId;
		if (st == 0) {
			s.scene.watchMainRole();
			s.createEnemys();
			let id = GGlobal.modelBoss.curEnterId;
			let mapid = 361001;
			s.setMapHead(mapid);
		} else if (st == 1) {
			//自己死亡，等待复活
		} else if (st == 2) {//BOSS死亡,等待还有下一只就继续刷
			s.dieTime = egret.getTimer();
			if (s.enemyBoss) s.enemyBoss.deadRemove();
			if (Config.lvbuboss_224[id] && (egret.getTimer() - s.dailog) > 6000) {
				s.dailog = egret.getTimer();
				let str = Config.lvbuboss_224[id].taici;
				if (str != 0 && !GGlobal.layerMgr.isOpenView(UIConst.LVBUDAILOG)) {
					GGlobal.layerMgr.open(UIConst.LVBUDAILOG);
				}
			}
			s.enemyBoss = null;
		}
		s.state = st;
	}

	public createEnemys() {
		if (GGlobal.mapscene.getForceCount(2) > 0) {
			return;
		}
		let s = this;
		let m = GGlobal.modelBoss;
		let id = m.curEnterId;
		s.enemyBoss = s.createEmeny(id);
		let ai = new BossAI();
		ai.role = s.enemyBoss;
		s.enemyBoss.addPlug(ai);
		let bati = BaTiState.create();//获得霸体
		bati.role = s.enemyBoss;
		s.enemyBoss.addPlug(bati);
		bati.maxTime = 9999999999;//长期霸体
		let cfg = Config.lvbuboss_224[id];
		s.enemyBoss.att = Model_player.voMine.hp * cfg.ap / 100 + Model_player.voMine.def;
		s.enemyBoss.force = 2;
		s.setBossPos(s.enemyBoss);
		s.scene.addUnit(s.enemyBoss);
		s.bossDmgPer = cfg.ap;

		View_BossSceneHead.show(id, false, m.bossMaxHp);
	}

	public createMyChars() {
		super.createMyChars();
		let vomine = Model_player.voMine;
		let role: SceneCharRole = vomine.sceneChar;
		role.curhp = role.maxhp;
		this.setRolePos(role);
		GGlobal.mapscene.watchMainRole();
	}

	public aiUpdate(ctx) {
		let s = this;
		let vomine = Model_player.voMine;
		if (vomine.sceneChar && vomine.sceneChar.curhp > 0) {
			GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, s.searchEnemy, s, SkillUtil.userInputSkill);
		}
		for (let i = 0; i < s.others.length; i++) {
			if (s.others[i] && s.others[i].sceneChar && s.others[i].sceneChar.curhp > 0) {
				GuanQiaAI.thinkAttack(s.others[i].sceneChar, ctx, s.searchEnemy);
			}
		}
	}

	public searchEnemy(term: SceneCharRole, role: SceneCharRole, arg2) {
		if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {//自己和其他玩家不攻击
			return -1;
		}
		if (term.curhp <= 0 || role.curhp <= 0) {
			return -1;
		}
		return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
	}

	protected tellDead() {
		GGlobal.modelBoss.CG_TELL_DEAD_1519();
	}

}