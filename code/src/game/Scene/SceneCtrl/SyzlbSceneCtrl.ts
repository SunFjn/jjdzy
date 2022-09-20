class SyzlbSceneCtrl extends BossCtrl {
	public constructor() {
		super();
	}

	private static _inst: SyzlbSceneCtrl;
	public static getInst() {
		return this._inst || (this._inst = new SyzlbSceneCtrl());
	}

	public state = -1;
	public onEnter(scene: MapScene) {
		ViewCommonWin.hide();
		ViewBattleFault.hide();
		let s = this;
		s.roleList = [];
		s.hasExiteState = false;
		s.scene = scene;
		const id = GGlobal.model_Syzlb.batId;
		const cfg = Config.syzlb_762[id];
		//首次取UI的气血数据，停留太久不保证正确
		s.createEnemys(JSON.parse(cfg.boss)[0][1]);
		// s.setMapHead(cfg.dt);
		s.scene.initWithID(cfg.dt, true);
		s.setSt(0);
		Model_Syzlb.batIng = true
		GGlobal.layerMgr.close2(UIConst.SYZLB);
		GGlobal.layerMgr.close2(UIConst.CHAT);
		GGlobal.layerMgr.close2(UIConst.SYZLB_REW);
		GGlobal.layerMgr.close2(UIConst.SYZLB_INFO);
		GGlobal.model_Syzlb.listen(Model_Syzlb.msg_datas_hurt, s.upBossHp, s);
		GGlobal.model_Syzlb.listen(Model_Syzlb.msg_datas_hp, s.updateData, s);
		GGlobal.model_Syzlb.listen(Model_Syzlb.msg_datas_dead, s.updateRoleDead, s);
		GGlobal.model_Syzlb.listen(Model_Syzlb.msg_relive, s.upreliv, s);
		GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		MainUIController.showBottomExite(true, Handler.create(s, s.onClickEixt));
		s.createMyChars();
	}

	public onExit(scene: MapScene) {
		let s = this;
		let c = GGlobal.control;
		// Model_Syzlb.batIng = false
		GGlobal.model_Syzlb.remove(Model_Syzlb.msg_datas_hurt, s.upBossHp, s);
		GGlobal.model_Syzlb.remove(Model_Syzlb.msg_datas_hp, s.updateData, s);
		GGlobal.model_Syzlb.remove(Model_Syzlb.msg_datas_dead, s.updateRoleDead, s);
		GGlobal.model_Syzlb.remove(Model_Syzlb.msg_relive, s.upreliv, s);
		GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		View_BossSceneHead.hide();
		s.scene.ctx = {};
		MainUIController.showBottomExite(false);
		s.deadInvide |= 1;

		let vomine = Model_player.voMine;
		let role: SceneCharRole = vomine.sceneChar;
		if (role) {
			// role.curhp = role.maxhp;
			role.immuneDmg = 0;
		}

		s.scene.removeAll();
		s.setSt(-1);
		if (GGlobal.model_Syzlb.batResult == 1) {//胜利

		} else {
			let m = GGlobal.model_Syzlb
			if (m.teamMyArr.length > 0) {
				m.CG_EXIT_CHA();
			}
			GGlobal.layerMgr.open(UIConst.SYZLB);
		}
		s.others = [];
		s.enemyBoss = null;
	}
	private delayShowAward() {
		MainUIController.showBottomExite(false);
	}

	protected onClickEixt() {
		ViewAlert.show("退出队伍后将离开副本且次数不返还\n是否退出?", Handler.create(this, this.directExite));
	}

	protected directExite() {
		GGlobal.model_Syzlb.CG_EXIT_CHA();
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

	private upreliv() {
		let s = this;
		//状态
		s.setSt(0);
		//设置满血
		Model_player.voMine.currentHp = Model_player.voMine.hp
		Model_Syzlb.hpCur[Model_player.voMine.id] = Model_player.voMine.hp
		let teamArr = GGlobal.model_Syzlb.teamMyArr;
		for (let i = 0; i < teamArr.length; i++) {
			const info = teamArr[i];
			if (info.pId != Model_player.voMine.id) {
				let voplayer: Vo_Player;
				voplayer = GGlobal.modelPlayer.playerDetailDic[info.pId];
				voplayer.currentHp = voplayer.hp;
				Model_Syzlb.hpCur[info.pId] = voplayer.hp
			}
		}
		//创建
		s.createMyChars();
	}

	// protected initState: number = 0;
	protected updateData(): void {
		let s = this;
		// if (!(s.initState & 1)) {//是否初始化
		// 	s.initState |= 1;
		// 	const id = GGlobal.model_Syzlb.batId;
		// 	const cfg = Config.syzlb_762[id];
		// 	View_BossSceneHead.show(JSON.parse(cfg.boss)[0][1], true);
		// }
		// GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, Model_Syzlb.bossHP);
		// if (Model_Syzlb.bossHP <= 0) {//BOSS被击杀
		// 	s.setSt(2);
		// }

		for (let j = 0; j < s.roleList.length; j++) {
			for (let i = 0; i < Model_Syzlb.hpArr.length; i++) {
				let id = s.roleList[j].id;
				if (Model_Syzlb.hpArr[i][0] == id) {
					if (s.roleList[j].curhp != Model_Syzlb.hpArr[i][1]) {
						s.roleList[j].curhp = Model_Syzlb.hpArr[i][1];
						if (Model_Syzlb.hpArr[i][1] <= 0) {
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
	private upBossHp() {
		let s = this;
		GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, Model_Syzlb.bossHP);
		if (Model_Syzlb.bossHP <= 0) {//BOSS被击杀
			s.setSt(2);
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
			Model_Syzlb.bossHP = boss.hp;
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
		if (vomine.currentHp > 0) {
			vomine.updateChars();
			vomine.sceneChar.curhp = vomine.currentHp
			vomine.sceneChar.maxhp = vomine.hp;
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
		} else {
			vomine.updateChars();
			vomine.sceneChar.curhp = 0;
		}
		//队友
		let teamArr = GGlobal.model_Syzlb.teamMyArr;
		for (let i = 0; i < teamArr.length; i++) {
			const info = teamArr[i];
			if (info.pId != Model_player.voMine.id) {
				let role1: SceneCharRole;
				let voplayer: Vo_Player;
				voplayer = GGlobal.modelPlayer.playerDetailDic[info.pId];
				if (voplayer.currentHp <= 0) continue;
				voplayer.updateChars();
				voplayer.sceneChar.curhp = voplayer.currentHp
				voplayer.sceneChar.maxhp = voplayer.hp;
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
				//移除原来的
				for (let i = 0; i < s.roleList.length; i++) {
					if (s.roleList[i].id == info.pId) {
						s.roleList.splice(i, 1);
						break;
					}
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