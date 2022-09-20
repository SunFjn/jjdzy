class MengHuoCtr extends BossCtrl {
	public constructor() {
		super();
	}

	private timeinfo: TimeLimitPanel;
	public state = -1;
	public onEnter(scene: MapScene) {
		super.onEnter(scene);
		let s = this;
		let c = GGlobal.control;
		scene.ctx.clearHurt = true;
		scene.ctx.isClearShow = true;
		GGlobal.modelBoss.initMH();
		s.setSt(0);

		GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		c.listen(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
		c.listen(Enum_MsgType.MH_SCENE_PLAYER_STATE, s.generalStateChange, s);
		c.listen(Enum_MsgType.MH_ROLELIFE, s.roleState, s);
		c.listen(Enum_MsgType.MSG_PLAYER_RELIFE, s.generalRelife, s);
		c.listen(Enum_MsgType.MH_SCENE, s.updateData, s);
		c.listen(Enum_MsgType.MH_STATECHANGE, s.stateChange, s);
		GGlobal.modelWorldNet.listen(Model_WorldNet.WORLD_SOCKET_CLOSE, this.worldNetCross, this);
		MengHuoSceneInfo.instance.onopen();
		ChildComAutoRevive.createInstance().show1();
	}

	public onExit(scene: MapScene) {
		let s = this;
		let c = GGlobal.control;
		GGlobal.modelWorldNet.remove(Model_WorldNet.WORLD_SOCKET_CLOSE, this.worldNetCross, this);
		GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		c.remove(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
		c.remove(Enum_MsgType.MH_SCENE_PLAYER_STATE, s.generalStateChange, s);
		c.remove(Enum_MsgType.MH_ROLELIFE, s.roleState, s);
		c.remove(Enum_MsgType.MH_SCENE, s.updateData, s);
		c.remove(Enum_MsgType.MH_STATECHANGE, s.stateChange, s);
		c.remove(Enum_MsgType.MSG_PLAYER_RELIFE, s.generalRelife, s);
		s.deadInvide = 0;
		s.roleState(0);
		super.onExit(scene);
		s.setSt(-1);
		MengHuoSceneInfo.instance.onclose();
		s.others = [];
		GGlobal.modelBoss.mh_extra_awards = [];
		ChildComAutoRevive.createInstance().hide1();

		Model_WorldNet.exiteCross();
	}

	private worldNetCross() {
		ViewCommonWarn.text("检测网络异常，已从跨服玩法中退出");
		this.directExite();
	}

	private stateChange() {
		let s = this;
		let deadlist = GGlobal.modelBoss.mhBossDeadList;
		if (deadlist.indexOf(GGlobal.modelBoss.curEnterId) >= 0) {//失败
			this.showWin();
		} else {
			ViewBattleFault.show(3000, s, "离开", s.directExite, s.directExite);
		}
	}

	private showWin() {
		let layerMgr = GGlobal.layerMgr;
		let uiconst = UIConst;
		if (layerMgr.isOpenView(uiconst.BATTLEWIN)) {
			return;
		}
		let m = GGlobal.modelBoss;
		layerMgr.close2(UIConst.RELIFEPANEL);
		let awards = Config.seven_223[m.curEnterId].joinreward;
		awards = ConfigHelp.makeItemListArr(JSON.parse(awards));
		m.bossAward = m.mh_extra_awards.concat(awards);
		ViewFightWin.showTip = true;
		layerMgr.open(uiconst.BATTLEWIN);
	}

	public update(ctx) {
		let s = this;
		if (s.state == 0) {
			s.aiUpdate(ctx);
			s.scene.watchMainRole();
		}
		s.dmgByClient(s.enemyBoss, s.bossDmgPer);
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
			role.curhp = role.maxhp;
		}
	}

	protected onClickEixt() {
		let s = this;
		ViewAlert.show("是否退出?\n(退出后<font color='#ffc334'>30秒</font>不可再次进入)", Handler.create(s, s.directExite));
	}

	protected directExite() {
		GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
		GGlobal.modelBoss.CG_MHEXITE_1711();
		Model_Boss.exitBoss(4);
	}

	protected tellDead() {
		GGlobal.modelBoss.CG_MH_TELL_DEAD();
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

	protected dieTime: number;
	public setSt(st) {
		let s = this;
		if (st == 0) {
			// ViewCommonWarn.text("过场动画逻辑再此处添加");
			s.createEnemys();
			let id = GGlobal.modelBoss.mhid;
			let mapid = Config.seven_223[id].map;
			s.setMapHead(mapid);
		} else if (st == 1) {
			//自己死亡，等待复活
		} else if (st == 2) {
			s.dieTime = egret.getTimer();
			if (s.enemyBoss) s.enemyBoss.deadRemove();
			s.enemyBoss = null;
			this.showWin();
		}
		s.state = st;
	}

	public createEnemys() {
		let s = this;
		let m = GGlobal.modelBoss;
		let id = m.mhid;
		s.enemyBoss = s.createEmeny(id);
		let ai = new BossAI();
		ai.role = s.enemyBoss;
		s.enemyBoss.addPlug(ai);
		let bati = BaTiState.create();//获得霸体
		bati.role = s.enemyBoss;
		s.enemyBoss.addPlug(bati);
		bati.maxTime = 9999999999;//长期霸体
		let cfg = Config.seven_223[id];
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
		this.setRolePos(role);
		role.curhp = role.maxhp;
	}

	protected generalKilled(lst: any[]): void {
		for (let i = 0; i < lst.length; i++) {
			let id = lst[i];
			let role = GGlobal.mapscene.getUnit(id)
			if (role) {
				role.takeMaxHurt();
			}
		}
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

}