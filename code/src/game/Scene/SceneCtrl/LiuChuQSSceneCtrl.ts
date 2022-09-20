class LiuChuQSSceneCtrl extends BossCtrl {
	public constructor() {
		super();
	}

	private static _inst: LiuChuQSSceneCtrl;
	public static getInst() {
		return this._inst || (this._inst = new LiuChuQSSceneCtrl());
	}

	public state = -1;
	public onEnter(scene: MapScene) {
		ViewCommonWin.hide();
		ViewBattleFault.hide();
		let s = this;
		s.roleList = [];
		s.hasExiteState = false;
		s.scene = scene;

		const id = GGlobal.model_LiuChuQS.batId;
		const cfg = Config.six_279[id];
		//首次取UI的气血数据，停留太久不保证正确
		s.createEnemys(cfg.npc);
		s.setMapHead(cfg.map);
		s.setSt(0);
		Model_LiuChuQS.batIng = true
		GGlobal.layerMgr.close2(UIConst.CHILD_LCQS);
		GGlobal.layerMgr.close2(UIConst.CHILD_LCQS_PANEL);
		GGlobal.layerMgr.close2(UIConst.CHAT);
		GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.msg_datas_hurt, s.updateData, s);
		GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.msg_datas_hp, s.updateData, s);
		GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.msg_datas_dead, s.updateRoleDead, s);
		GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.msg_datas_over, s.batOver, s);
		GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		MainUIController.showBottomExite(true, Handler.create(s, s.onClickEixt));
		s.createMyChars();
	}

	public onExit(scene: MapScene) {
		let s = this;
		let c = GGlobal.control;
		// s.serverResult = 0;
		Model_LiuChuQS.batIng = false
		GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.msg_datas_hurt, s.updateData, s);
		GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.msg_datas_hp, s.updateData, s);
		GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.msg_datas_dead, s.updateRoleDead, s);
		GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.msg_datas_over, s.batOver, s);
		GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		GGlobal.control.remove(Enum_MsgType.MSG_MINEHPCHANGE, this.updateHp, this);
		View_BossSceneHead.hide();
		s.scene.ctx = {};
		MainUIController.showBottomExite(false);
		s.deadInvide |= 1;

		let vomine = Model_player.voMine;
		let role: SceneCharRole = vomine.sceneChar;
		if (role) {
			role.curhp = role.maxhp;
			role.immuneDmg = 0;
		}

		s.scene.removeAll();
		s.setSt(-1);
		if (Model_GlobalMsg.batResult == 1) {//胜利
			// GGlobal.modelSJMJ.CG3785();
			// GGlobal.model_LiuChuQS.CG_LEAVE_BATTLE_8223();
			let m = GGlobal.model_LiuChuQS
			if (m.teamMyArr.length > 0) {
				// Model_LiuChuQS.leaveMsg = false
				m.CG_LEAVE_8211(m.teamMyArr[0].teamId);
			}
			if (GGlobal.layerMgr.backPanelId == UIConst.CHAT) {
				GGlobal.layerMgr.open(UIConst.CHAT);
			} else {
				// ShengJieMJSceneCtrl.sucOpenPan = true;
				let index = Math.floor(GGlobal.model_LiuChuQS.batId / 1000)
				GGlobal.layerMgr.open(UIConst.CHILD_LCQS_PANEL, index);
			}
		} else {
			// ShengJieMJSceneCtrl.isBatEnd = true;
			let index = Math.floor(GGlobal.model_LiuChuQS.batId / 1000)
			GGlobal.layerMgr.open(UIConst.CHILD_LCQS_PANEL, index);
		}
		s.others = [];
		s.enemyBoss = null;
	}
	// public static sucOpenPan: boolean = false;
	// public static isBatEnd: boolean = false;
	// private serverResult = 0;
	private delayShowAward() {
		// this.serverResult = 1;//标记已经获取到后端数据 并且把退出按钮屏蔽
		MainUIController.showBottomExite(false);
	}

	protected onClickEixt() {
		ViewAlert.show("退出副本将视为挑战失败，\n是否退出?", Handler.create(this, this.directExite));
	}

	protected directExite() {
		GGlobal.model_LiuChuQS.CG_LEAVE_BATTLE_8223();
		GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
		GGlobal.modelScene.returnMainScene();
	}

	protected updateRoleDead(roleId: number) {
		let s = this;
		for (let i = 0; i < s.roleList.length; i++) {
			let scenechar = s.roleList[i];
			if (scenechar.id == roleId) {
				scenechar.curhp = 0;
				s.roleList.splice(i, 1);
				if (scenechar && scenechar.view && scenechar.view.parent) {//当前角色还存在于此场景
					scenechar.deadThrow(5, 5);
				}
				break;
			}
		}
		if (Model_player.isMineID(roleId)) {
			Model_player.voMine.sceneChar = null;
		}
	}

	private batOver() {
		// ViewCommonWarn.text("队长已退出")
		
		Model_GlobalMsg.batResult = 2
		ViewBattleFault.show();
		let s = this
		s.setSt(1);
	}

	protected initState: number = 0;
	protected updateData(): void {
		let s = this;
		if (!(s.initState & 1)) {//是否初始化
			s.initState |= 1;
			const id = GGlobal.model_LiuChuQS.batId;
			const cfg = Config.six_279[id];
			View_BossSceneHead.show(cfg.npc, true, Model_LiuChuQS.bossMaxHP);
		}
		GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, Model_LiuChuQS.bossHP);
		if (Model_LiuChuQS.bossHP <= 0) {//BOSS被击杀
			s.setSt(2);
		}

		for (let j = 0; j < s.roleList.length; j++) {
			for (let i = 0; i < Model_LiuChuQS.hpArr.length; i++) {
				let id = s.roleList[j].id;
				if (Model_LiuChuQS.hpArr[i][0] == id) {
					if (s.roleList[j].curhp != Model_LiuChuQS.hpArr[i][1]) {
						s.roleList[j].curhp = Model_LiuChuQS.hpArr[i][1];
						if (Model_LiuChuQS.hpArr[i][1] <= 0) {
							s.roleList[j].deadThrow(5, 5);
							if (Model_player.isMineID(id)) {
								Model_player.voMine.sceneChar = null;
							}
						}
					}
					break;
				}
			}
		}
	}

	//是否已经进入失败状态
	private hasExiteState = false;
	public update(ctx) {
		let s = this;
		if (s.state == 0) {
			s.aiUpdate(ctx);
			if (Model_player.voMine && Model_player.voMine.sceneChar && Model_player.voMine.sceneChar.curhp <= 0) {
				if (s.enemyBoss) {
					s.scene.map.watchFocus(s.enemyBoss.x, s.enemyBoss.y);
				}
			} else {
				s.scene.watchMainRole();
			}
		} else if (s.state == 2) {
		} else if (s.state == 1) {
		}
	}

	protected dieTime: number;
	public setSt(st) {
		let s = this;
		if (st == 0) {
		} else if (st == 1) {//自己死亡，直接退出

		} else if (st == 2) {//BOSS死亡
			s.dieTime = egret.getTimer();
			s.enemyBoss.curhp = 0;
			s.enemyBoss.deadThrow(5, 5);
		}
		s.state = st;
	}

	public createEnemys(bossId) {
		let s = this;
		let boss = Config.NPC_200[bossId];
		if (boss) {
			Model_LiuChuQS.bossHP = boss.hp;
			Model_LiuChuQS.bossMaxHP = boss.hp;
		}
		s.enemyBoss = s.createEmeny(bossId);
		let ai = new CommonAICtrl();
		ai.role = s.enemyBoss;
		s.enemyBoss.addPlug(ai);
		let bati = BaTiState.create();//获得霸体
		bati.maxTime = 9999999999;//长期霸体
		bati.role = s.enemyBoss;
		s.enemyBoss.addPlug(bati);
		s.enemyBoss.clearHurt = 1;
		s.enemyBoss.force = 2;
		s.setBossPos(s.enemyBoss);
		s.scene.addUnit(s.enemyBoss);
		View_BossSceneHead.show(bossId, true);
	}

	private roleList: Array<SceneCharRole> = [];
	public createMyChars() {
		let s = this;
		let vomine = Model_player.voMine;
		vomine.updateChars();
		let role: SceneCharRole = vomine.sceneChar;
		s.setRolePos(role);
		role.invalid |= 1023;
		role.force = 1;
		role.immuneDmg = 1;
		role.clearHurt = 1;
		if (!s.scene.getUnit(role.id)) {
			s.scene.addUnit(role);
			s.addHpAndName(role, true);
		}
		s.roleList.push(role);
		let teamArr = GGlobal.model_LiuChuQS.teamMyArr;

		for (let i = 0; i < teamArr.length; i++) {
			const info = teamArr[i];
			if (info.plyId != Model_player.voMine.id) {
				let role1: SceneCharRole;
				let voplayer: Vo_Player;
				voplayer = GGlobal.modelPlayer.playerDetailDic[info.plyId];
				voplayer.updateChars();
				role1 = voplayer.sceneChar;
				if (!s.scene.getUnit(role1.id)) {
					s.setRolePos(role1);
					role1.y += 30 * (i + 1);//站位不一样
					role1.x -= 30 * (i + 1);//站位不一样
					role1.invalid |= 255;
					role1.force = 1;
					role1.clearHurt = 1;
					s.scene.addUnit(role1);
					s.addHpAndName(role1, true);
				} else {
					s.setRolePos(role1);
				}
				s.roleList.push(role1);
			}
		}
	}

	public aiUpdate(ctx) {
		for (let i = 0; i < this.roleList.length; i++) {
			GuanQiaAI.thinkAttack(this.roleList[i], ctx, this.searchEnemy);
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