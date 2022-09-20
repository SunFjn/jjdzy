class QuanMinBossSceneCtrl extends BossCtrl {
	public constructor() {
		super();
	}

	public state = -1;

	public onEnter(scene: MapScene) {
		super.onEnter(scene);
		let c = GGlobal.control;
		let s = this;
		scene.ctx.clearHurt = true;
		scene.ctx.isClearShow = true;
		this.hasExiteState = false;

		//首次取UI的气血数据，停留太久不保证正确
		let id = GGlobal.modelBoss.curEnterId;
		let mapid = Config.all_221[id].map;
		s.setMapHead(mapid);
		if (GGlobal.modelBoss.qmMap[id]) {
			let vo: Vo_QuanMinBoss = GGlobal.modelBoss.qmMap[id];
			GGlobal.modelBoss.bossHp = vo.curHp;
			GGlobal.modelBoss.bossMaxHp = (Number(vo.maxHp) * vo.curHp / 100) >> 0;
		}

		s.setSt(0);
		QMBossInfo.show();

		c.listen(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, s.updateData, s);
		GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		c.listen(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
		c.listen(Enum_MsgType.MSG_PLAYER_BEKILLED, s.generalKilled, s);
		c.listen(Enum_MsgType.MSG_QMBOSS_DEAD, s.delayShowAward, s);
	}

	public onExit(scene: MapScene) {
		let s = this;
		let c = GGlobal.control;
		s.serverResult = 0;
		c.remove(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, s.updateData, s);
		GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		c.remove(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
		c.remove(Enum_MsgType.MSG_PLAYER_BEKILLED, s.generalKilled, s);
		c.remove(Enum_MsgType.MSG_QMBOSS_DEAD, s.delayShowAward, s);
		QMBossInfo.hide();

		super.onExit(scene);
		s.setSt(-1);
		GGlobal.modelBoss.curEnterId = 0;
		this.others = [];
		s.enemyBoss = null;
	}

	private serverResult = 0;
	private delayShowAward() {
		this.serverResult = 1;//标记已经获取到后端数据 并且把退出按钮屏蔽
		MainUIController.showBottomExite(false);
	}

	protected onClickEixt() {
		ViewAlert.show("退出副本将视为挑战失败，\n是否退出?", Handler.create(this, this.directExite));
	}

	protected directExite() {
		GGlobal.layerMgr.close2(UIConst.QMBOSSRANK);
		GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
		GGlobal.modelBoss.CG_EXITE_1359();
		Model_Boss.exitBoss(1);
	}

	protected initState: number = 0;
	protected updateData(): void {
		let s = this;
		let m = GGlobal.modelBoss;
		if (!(s.initState & 1)) {//是否初始化
			s.initState |= 1;
			let id = GGlobal.modelBoss.curEnterId;
			let list = JSON.parse(Config.all_221[id].boss);
			View_BossSceneHead.show(list[0][1], false, m.bossMaxHp)
		}
		GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, m.bossHp);
		if (m.bossHp <= 0) {//BOSS被击杀
			s.setSt(2);
		} else if (m.myHp <= 0) {//自己被击杀
			s.dieTime = egret.getTimer();
			s.setSt(1);
		}
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
				GGlobal.layerMgr.open(UIConst.BATTLEWIN);
				GGlobal.layerMgr.close2(UIConst.QMBOSSRANK);
			} else if (now - this.dieTime >= 10000) {//5秒后自动退出
				Model_Boss.exitBoss();
			}
		} else if (this.state == 1) {
			let now = egret.getTimer();
			if (now - this.dieTime >= 1000 && !this.hasExiteState) {//5秒后自动退出
				this.hasExiteState = true;
				ViewBattleFault.show(3000, this, "离开", this.directExite, this.directExite);
			}
		}
	}

	protected dieTime: number;
	public setSt(st) {
		let s = this;
		if (st == 0) {
			s.createEnemys();
		} else if (st == 1) {//自己死亡，直接退出
			s.dieTime = egret.getTimer();
			let voplayer = Model_player.voMine;
			voplayer.sceneChar.deadThrow(5, 5);
			// ViewBattleFault.show(3000, s, "离开", s.directExite, s.directExite);
		} else if (st == 2) {//BOSS死亡
			s.dieTime = egret.getTimer();
			s.enemyBoss.curhp = 0;
			s.enemyBoss.deadThrow(5, 5);
		}
		s.state = st;
	}

	public createEnemys() {
		let s = this;
		let id = GGlobal.modelBoss.curEnterId;
		let list = JSON.parse(Config.all_221[id].boss);

		s.enemyBoss = s.createEmeny(list[0][1]);
		let ai = new CommonAICtrl();
		ai.role = s.enemyBoss;
		s.enemyBoss.addPlug(ai);
		let bati = BaTiState.create();//获得霸体
		bati.maxTime = 9999999999;//长期霸体
		bati.role = s.enemyBoss;
		s.enemyBoss.addPlug(bati);

		s.enemyBoss.force = 2;
		s.setBossPos(s.enemyBoss);
		s.scene.addUnit(s.enemyBoss);

		View_BossSceneHead.show(list[0][1], true);
	}

	public createMyChars() {
		super.createMyChars();
		let vomine = Model_player.voMine;
		let role: SceneCharRole = vomine.sceneChar;
		role.setName("<font color='#FFFF00'>" + vomine.name + "</font>", true);
	}

	public aiUpdate(ctx) {
		let vomine = Model_player.voMine;
		GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, this.searchEnemy, this, SkillUtil.userInputSkill);
		for (let i = 0; i < this.others.length; i++) {
			if(this.others[i]){
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