class CountryBossCtrl extends BossCtrl {
	private static _inst: CountryBossCtrl;
	public static getInst() {
		return this._inst || (this._inst = new CountryBossCtrl());
	}
	public state = -1;

	public onEnter(scene: MapScene) {
		super.onEnter(scene);
		let c = GGlobal.control;
		let s = this;
		this.hasExiteState = false;

		//首次取UI的气血数据，停留太久不保证正确
		let id = ModelCtryBoss.curBossID;
		const cfg = Config.gjboss_738[id];
		if (cfg) {
			const npcId = JSON.parse(cfg.boss)[0][1];
			const hp = Config.NPC_200[npcId].hp;
			GGlobal.modelCtryBoss.battleInfo.bossMaxHp = GGlobal.modelCtryBoss.battleInfo.bossHp = hp;//初始化boss初始值
		}

		s.setSt(0);
		CountryBossInfo.show();

		GGlobal.modelCtryBoss.listen(ModelCtryBoss.msg_batInfo, s.updateData, s);
		GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		c.listen(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
		GGlobal.modelCtryBoss.listen(ModelCtryBoss.msg_beenKiller, s.generalKilled, s);
		GGlobal.modelCtryBoss.listen(ModelCtryBoss.msg_bossBeenKill, s.delayShowAward, s);
	}

	public onExit(scene: MapScene) {
		let s = this;
		let c = GGlobal.control;
		s.serverResult = 0;
		c.remove(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, s.updateData, s);
		GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		c.remove(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
		GGlobal.modelCtryBoss.remove(ModelCtryBoss.msg_beenKiller, s.generalKilled, s);
		GGlobal.modelCtryBoss.remove(ModelCtryBoss.msg_bossBeenKill, s.delayShowAward, s);
		CountryBossInfo.hide();
		s.deadInvide = 0;
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
		GGlobal.modelCtryBoss.CG3207();
	}

	protected initState: number = 0;
	protected updateData(): void {
		let s = this;
		let m = GGlobal.modelCtryBoss;
		if (!(s.initState & 1)) {//是否初始化
			s.initState |= 1;
			const cfg = Config.gjboss_738[m.data.curBossId];
			const bossInfo = JSON.parse(cfg.boss);
			const boss = Config.NPC_200[bossInfo[0][1]];
			View_BossSceneHead.show(boss.ID, false, m.battleInfo.bossMaxHp, 0, 280, `${cfg.cengshu}层 ` + boss.name);
		}
		GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, m.battleInfo.bossHp);
		if (m.battleInfo.bossHp <= 0) {//BOSS被击杀
			s.setSt(2);
		} else if (!Model_player.voMine.sceneChar || Model_player.voMine.sceneChar.curhp <= 100) {//自己被击杀
			s.dieTime = egret.getTimer();
			s.setSt(1);
		}
		s.dmgByClient(s.enemyBoss, s.bossDmgPer);
	}

	//是否已经进入失败状态
	private hasExiteState = false;
	public update(ctx) {
		if (this.state == 0) {
			this.aiUpdate(ctx);
			this.scene.watchMainRole();
		} else if (this.state == 2) {
			let now = egret.getTimer();
			if (now - this.dieTime >= 2000 && !GGlobal.layerMgr.isOpenView(UIConst.BATTLEWIN)) {
				if (!this.hasExiteState) {
					this.hasExiteState = true;
					GGlobal.modelCtryBoss.CG3207();
				}
			} else if (now - this.dieTime >= 10000) {//5秒后自动退出
				if (!this.hasExiteState) {
					this.hasExiteState = true;
					GGlobal.modelCtryBoss.CG3207();
				}
			}
		} else if (this.state == 1) {
			let now = egret.getTimer();
			if (now - this.dieTime >= 1000 && !this.hasExiteState) {//5秒后自动退出
				this.hasExiteState = true;
				GGlobal.modelCtryBoss.CG3207();
			}
		}
	}

	protected dieTime: number;
	public setSt(st) {
		let s = this;
		if (st == 0) {
			s.createEnemys();
			const id = GGlobal.modelCtryBoss.data.curBossId;
			const mapId = Config.gjboss_738[id].ditu;
			s.setMapHead(mapId);
		} else if (st == 1) {//自己死亡，直接退出
			s.dieTime = egret.getTimer();
			let voplayer = Model_player.voMine;
			voplayer.sceneChar.deadThrow(5, 5);
		} else if (st == 2) {//BOSS死亡
			s.dieTime = egret.getTimer();
			s.enemyBoss.curhp = 0;
			s.enemyBoss.deadThrow(5, 5);
		}
		s.state = st;
	}

	public createEnemys() {
		let s = this;
		const cfg = Config.gjboss_738[GGlobal.modelCtryBoss.data.curBossId];
		const bossInfo = JSON.parse(cfg.boss);
		const boss = Config.NPC_200[bossInfo[0][1]];
		s.bossDmgPer = cfg.shanghai;

		s.enemyBoss = s.createEmeny(boss.ID);
		let ai = new CommonAICtrl();
		ai.role = s.enemyBoss;
		s.enemyBoss.addPlug(ai);
		let bati = BaTiState.create();//获得霸体
		bati.maxTime = 9999999999;//长期霸体
		bati.role = s.enemyBoss;
		s.enemyBoss.addPlug(bati);

		s.enemyBoss.att = Model_player.voMine.hp * cfg.shanghai / 100 + Model_player.voMine.def;
		s.enemyBoss.force = 2;
		s.setBossPos(s.enemyBoss);
		s.scene.addUnit(s.enemyBoss);

		View_BossSceneHead.show(boss.ID, true, GGlobal.modelCtryBoss.data.bossMaxHp, 0, 280, `${cfg.cengshu}层 ` + boss.name);
	}

	public createMyChars() {
		super.createMyChars();
		let vomine = Model_player.voMine;
		let role: SceneCharRole = vomine.sceneChar;
		role.immuneDmg = 1;
		role.setName("<font color='#FFFF00'>" + vomine.name + "</font>", true);
	}

	public aiUpdate(ctx) {
		let vomine = Model_player.voMine;
		GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, this.searchEnemy, this, SkillUtil.userInputSkill);
		for (let i = 0; i < this.others.length; i++) {
			if (this.others[i] && this.others[i].sceneChar) {
				GuanQiaAI.thinkAttack(this.others[i].sceneChar, ctx, this.searchEnemy);
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