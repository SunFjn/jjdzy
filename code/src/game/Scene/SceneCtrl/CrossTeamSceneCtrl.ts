class CrossTeamSceneCtrl extends BossCtrl {
	public constructor() {
		super();
	}

	private static _inst: CrossTeamSceneCtrl;
	public static getInst() {
		return this._inst || (this._inst = new CrossTeamSceneCtrl());
	}

	private fightStartTime = 0;
	public teamState = -1;
	public onEnter(scene: MapScene) {
		ViewCommonWin.hide();
		ViewBattleFault.hide();
		let c = GGlobal.control;
		let s = this;
		s.fightStartTime = egret.getTimer();
		s.roleList = [];
		s.hasExiteState = false;
		s.scene = scene;
		//首次取UI的气血数据，停留太久不保证正确
		s.createEnemys();
		let id = Model_CrossTeam.fubenID;
		let mapid = Config.zdfb_255[id].map;
		s.setMapHead(mapid);
		GGlobal.mapscene.map.watchFocus(0, 0);
		s.setSt(0);
		CrossTeamRankInfo.show();
		GGlobal.layerMgr.close2(UIConst.CROSS_TEAM);
		c.listen(Enum_MsgType.CROSS_TEAM_RANK_UPDATE, s.updateData, s);
		c.listen(Enum_MsgType.CROSS_TEAM_PLAYER_DEAD, s.updateRoleDead, s);
		GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		MainUIController.showBottomExite(true, Handler.create(s, s.onClickEixt));
		s.createMyChars();
	}

	public onExit(scene: MapScene) {
		let s = this;
		s.fightStartTime = 0;
		let c = GGlobal.control;
		s.serverResult = 0;
		c.remove(Enum_MsgType.CROSS_TEAM_RANK_UPDATE, s.updateData, s);
		c.remove(Enum_MsgType.CROSS_TEAM_PLAYER_DEAD, s.updateRoleDead, s);
		GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		GGlobal.control.remove(Enum_MsgType.MSG_MINEHPCHANGE, this.updateHp, this);
		View_BossSceneHead.hide();
		s.scene.ctx = {};
		let vomine = Model_player.voMine;
		let role: SceneCharRole = vomine.sceneChar;
		if (role) {
			role.curhp = role.maxhp;
			role.immuneDmg = 0;
		}
		s.scene.removeAll();
		MainUIController.showBottomExite(false);
		s.deadInvide |= 1;

		s.setSt(-1);
		CrossTeamRankInfo.hide();
		GGlobal.layerMgr.open(UIConst.CROSS_TEAM);
		s.others = [];
		s.roleList = [];
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
		GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
		GGlobal.modelScene.returnMainScene();
		GGlobal.modelCrossTeam.CG_TEAM_EXIT_TEAMFUBEN();
		Model_CrossTeam.teamId = 0;
		Model_CrossTeam.myTeamArr.length = 0;
		GGlobal.control.notify(Enum_MsgType.CROSS_TEAM_UPDATE);
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

	protected initState: number = 0;
	protected updateData(): void {
		let s = this;
		let m = GGlobal.modelBoss;
		if (!(s.initState & 1)) {//是否初始化
			s.initState |= 1;
			let id = Model_CrossTeam.fubenID;
			let cfg = Config.zdfb_255[id];
			View_BossSceneHead.show(cfg.boss, true, Model_CrossTeam.bosshpMax)
		}
		GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, Model_CrossTeam.bosshp);
		if (Model_CrossTeam.bosshp <= 0) {//BOSS被击杀
			s.setSt(2);
		}

		for (let j = 0; j < s.roleList.length; j++) {
			for (let i = 0; i < Model_CrossTeam.hpArr.length; i++) {
				if (Model_CrossTeam.hpArr[i][0] == s.roleList[j].id) {
					let id = s.roleList[j].id;
					if (Model_CrossTeam.hpArr[i][0] == id) {
						if (s.roleList[j].curhp != Model_CrossTeam.hpArr[i][1]) {
							s.roleList[j].curhp = Model_CrossTeam.hpArr[i][1];
							if (Model_CrossTeam.hpArr[i][1] <= 0) {
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
	}

	//是否已经进入失败状态
	private hasExiteState = false;
	public update(ctx) {
		let s = this;
		if (egret.getTimer() - s.fightStartTime < 400) {
			return;
		}
		if (s.teamState == 0) {
			s.aiUpdate(ctx);
			if (Model_player.voMine && (Model_player.voMine.sceneChar && Model_player.voMine.sceneChar.curhp <= 0) || !Model_player.voMine.sceneChar) {
				if (s.enemyBoss) {
					s.scene.map.watchFocus(s.enemyBoss.x, s.enemyBoss.y);
				}
			} else {
				s.scene.watchMainRole();
			}
		} else if (s.teamState == 2) {
		} else if (s.teamState == 1) {
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
		s.teamState = st;
	}

	public createEnemys() {
		let s = this;
		let id = Model_CrossTeam.fubenID;
		let cfg = Config.zdfb_255[id];
		let boss = Config.NPC_200[cfg.boss];
		if (boss) {
			Model_CrossTeam.bosshp = boss.hp;
			Model_CrossTeam.bosshpMax = boss.hp;
		}

		s.enemyBoss = s.createEmeny(cfg.boss);
		let ai = new CommonAICtrl();
		ai.role = s.enemyBoss;
		s.enemyBoss.addPlug(ai);
		let bati = BaTiState.create();//获得霸体
		bati.maxTime = 9999999999;//长期霸体
		bati.role = s.enemyBoss;
		s.enemyBoss.addPlug(bati);
		s.enemyBoss.clearHurt = 1;
		s.enemyBoss.force = 2;
		s.setBossPos(s.enemyBoss, );
		s.scene.addUnit(s.enemyBoss);

		View_BossSceneHead.show(cfg.boss, true);
	}

	private roleList: Array<SceneCharRole> = [];
	public createMyChars() {
		let s = this;
		let vomine = Model_player.voMine;
		vomine.updateChars();
		let role: SceneCharRole = vomine.sceneChar;
		s.setRolePos(role, -180);
		role.invalid |= 1023;
		role.force = 1;
		role.immuneDmg = 1;
		role.clearHurt = 1;
		if (!s.scene.getUnit(role.id)) {
			s.scene.addUnit(role);
			s.addHpAndName(role, true);
		}
		s.roleList.push(role);
		let arr = Model_CrossTeam.myTeamArr;

		for (let i = 0; i < arr.length; i++) {
			if (arr[i][2] != Model_player.voMine.id) {
				let role1: SceneCharRole;
				let voplayer: Vo_Player;
				if (arr[i][3] > 0) {//机器人id
					role1 = s.createEmeny(arr[i][3]);
					role1.id = arr[i][3];
					role1.setPlayerName(arr[i][1]);
				} else {
					voplayer = GGlobal.modelPlayer.playerDetailDic[arr[i][2]];
					voplayer.updateChars();
					role1 = voplayer.sceneChar;
				}
				if (!s.scene.getUnit(role1.id)) {
					s.setRolePos(role1);
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