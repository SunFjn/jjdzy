class TaoYuanBossCtrl extends BossCtrl {
	private static _inst: TaoYuanBossCtrl;
	public static getInst() {
		return this._inst || (this._inst = new TaoYuanBossCtrl());
	}
	public state = -1;

	public onEnter(scene: MapScene) {
		super.onEnter(scene);
		let c = GGlobal.control;
		let s = this;
		this.hasExiteState = false;

		//首次取UI的气血数据，停留太久不保证正确
		const npcId = Model_TYJY.curBossID;
		const hp = Config.NPC_200[npcId].hp;
		GGlobal.model_TYJY.battleInfo.bossMaxHp = GGlobal.model_TYJY.battleInfo.bossHp = hp;//初始化boss初始值

		s.setSt(0);
		TaoYuanBossInfo.show();

		GGlobal.model_TYJY.listen(Model_TYJY.msg_batInfo, s.updateData, s);
		GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		c.listen(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
		GGlobal.model_TYJY.listen(Model_TYJY.msg_beenKiller, s.generalKilled, s);
		GGlobal.model_TYJY.listen(Model_TYJY.msg_bossBeenKill, s.delayShowAward, s);
		GGlobal.model_TYJY.listen(Model_TYJY.ROLE_LIFE, s.roleState, s);
		GGlobal.model_TYJY.listen(Model_TYJY.MSG_PLAYER_RELIFE, s.generalRelife, s);
		GGlobal.model_TYJY.listen(Model_TYJY.SCENE_PLAYER_STATE, s.generalStateChange, s);
	}

	public onExit(scene: MapScene) {
		let s = this;
		let c = GGlobal.control;
		s.serverResult = 0;
		GGlobal.model_TYJY.remove(Model_TYJY.msg_batInfo, s.updateData, s);
		GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		c.remove(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
		GGlobal.model_TYJY.remove(Model_TYJY.msg_beenKiller, s.generalKilled, s);
		GGlobal.model_TYJY.remove(Model_TYJY.msg_bossBeenKill, s.delayShowAward, s);
		GGlobal.model_TYJY.remove(Model_TYJY.ROLE_LIFE, s.roleState, s);
		GGlobal.model_TYJY.remove(Model_TYJY.MSG_PLAYER_RELIFE, s.generalRelife, s);
		GGlobal.model_TYJY.remove(Model_TYJY.SCENE_PLAYER_STATE, s.generalStateChange, s);
		TaoYuanBossInfo.hide();
		s.deadInvide = 0;
		s.roleState(0);
		super.onExit(scene);
		s.setSt(-1);
		this.others = [];
	}

	private serverResult = 0;
	private delayShowAward() {
		this.serverResult = 1;//标记已经获取到后端数据 并且把退出按钮屏蔽
		MainUIController.showBottomExite(false);
	}

	protected onClickEixt() {
		ViewAlert.show("退出副本将视为挑战失败,挑战次数不返还!\n是否退出?", Handler.create(this, this.directExite));
	}

	protected directExite() {
		GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
		GGlobal.model_TYJY.CG_QUIT_TAOYUANBOSS(0);
	}

	protected tellDead() {
		GGlobal.model_TYJY.CG_QUIT_TAOYUANBOSS(2);
	}

	protected initState: number = 0;
	protected updateData(): void {
		let s = this;
		let m = GGlobal.model_TYJY;
		if (!(s.initState & 1)) {//是否初始化
			s.initState |= 1;
			const boss = Config.NPC_200[Model_TYJY.curBossID];
			View_BossSceneHead.show(boss.ID, false, m.battleInfo.bossMaxHp, 0, 280, boss.name);
		}
		GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, m.battleInfo.bossHp);
		
		if (m.battleInfo.bossHp <= 0) {//BOSS被击杀
			s.setSt(2);
		}
	}

	//是否已经进入失败状态
	private hasExiteState = false;
	public update(ctx) {
		if (this.state == 0) {
			this.aiUpdate(ctx);
			this.scene.watchMainRole();
		} else if (this.state == 2) {
			GGlobal.layerMgr.close2(UIConst.REVIVE_PANEL);
			let now = egret.getTimer();
			if (now - this.dieTime >= 2000 && !GGlobal.layerMgr.isOpenView(UIConst.BATTLEWIN)) {
				if (!this.hasExiteState) {
					this.hasExiteState = true;
					GGlobal.model_TYJY.CG_QUIT_TAOYUANBOSS(0);
				}
			} else if (now - this.dieTime >= 10000) {//5秒后自动退出
				if (!this.hasExiteState) {
					this.hasExiteState = true;
					GGlobal.model_TYJY.CG_QUIT_TAOYUANBOSS(0);
				}
			}
		}
		this.dmgByClient(this.enemyBoss, this.bossDmgPer);
	}

	private roleState(ret) {
		let role = Model_player.voMine.sceneChar;
		if (ret == 1) {
			GGlobal.layerMgr.open(UIConst.REVIVE_PANEL, UIConst.TYJY_YMFB);
			if (role) {
				GGlobal.mapscene.removeUnit(role);
			}
		} else {
			GGlobal.layerMgr.close2(UIConst.REVIVE_PANEL);
			if (!role) {
				this.createMyChars();
			}
			role = Model_player.voMine.sceneChar;
			role.curhp = role.maxhp;
		}
	}

	protected dieTime: number;
	public setSt(st) {
		let s = this;
		if (st == 0) {
			s.createEnemys();
			const id = Model_TYJY.curBossID;
			const mapId = Config.map_200[390001].s;
			s.setMapHead(mapId);
		} else if (st == 1) {
			//自己死亡，等待复活
		} else if (st == 2) {//BOSS死亡
			s.dieTime = egret.getTimer();
			if (s.enemyBoss) s.enemyBoss.deadRemove();
			s.enemyBoss = null;
		}
		s.state = st;
	}

	public createEnemys() {
		let shanghai = Config.tyjyboss_251[Model_TYJY.curBossID].shanghai;
		let s = this;
		let id = Model_TYJY.curBossID;
		s.enemyBoss = s.createEmeny(id);
		let ai = new BossAI();
		ai.role = s.enemyBoss;
		s.enemyBoss.addPlug(ai);
		let bati = BaTiState.create();//获得霸体
		bati.role = s.enemyBoss;
		s.enemyBoss.addPlug(bati);
		bati.maxTime = 9999999999;//长期霸体
		s.enemyBoss.att = Model_player.voMine.hp * shanghai / 100 + Model_player.voMine.def;
		s.enemyBoss.force = 2;
		s.setBossPos(s.enemyBoss);
		s.scene.addUnit(s.enemyBoss);

		s.bossDmgPer = shanghai;
		View_BossSceneHead.show(id, false, GGlobal.model_TYJY.battleInfo.bossMaxHp);
	}

	protected generalRelife(lst: any[]): void {
		for (let i = 0; i < lst.length; i++) {
			let id = lst[i];
			let role = GGlobal.mapscene.getUnit(id)
			if (role) {
				role.curhp = role.maxhp;
			} else if (GGlobal.modelPlayer.playerDetailDic[id]) {
				GGlobal.control.notify(Enum_MsgType.MSG_ADDROLEDETAIL, GGlobal.modelPlayer.playerDetailDic[id]);
			}
		}
		ArrayUitl.cleannull(this.others);
	}

	public createMyChars() {
		super.createMyChars();
		let vomine = Model_player.voMine;
		let role: SceneCharRole = vomine.sceneChar;
		this.setRolePos(role);
		role.curhp = role.maxhp;
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