class TigerPassSceneCtrl extends BossCtrl {
	public constructor() {
		super();
	}

	bossDmgFix = 0;//BOSS固定伤害
	private static _inst: TigerPassSceneCtrl;
	public static getInst() {
		return this._inst || (this._inst = new TigerPassSceneCtrl());
	}

	public state = -1;
	public onEnter(scene: MapScene) {
		ViewCommonWin.hide();
		ViewBattleFault.hide();
		let s = this;
		s.roleList = [];
		s.hasExiteState = false;
		s.scene = scene;
		scene.ignoreBreak = false;
		const id = GGlobal.modelTigerPass.curId;
		const cfg = Config.hlg_323[id];
		s.pveTime = cfg.time * 1000;
		//首次取UI的气血数据，停留太久不保证正确
		s.createEnemys(cfg.boss);
		s.setMapHead(cfg.dt);
		s.setSt(0);
		GGlobal.layerMgr.close2(UIConst.CHILD_TIGER_PASS);
		GGlobal.modelTigerPass.listen(Model_TigerPass.msg_datas_hurt, s.updateData, s);
		GGlobal.modelTigerPass.listen(Model_TigerPass.msg_bat_res, s.batRes, s);
		GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		GGlobal.control.listen(Enum_MsgType.MSG_MINEHPCHANGE, s.updateHp, s);
		MainUIController.showBottomExite(true, Handler.create(s, s.onClickEixt));
		s.createMyChars();
		ViewTigPasSceneInfo.instance.onOpen();
	}

	public onExit(scene: MapScene) {
		let s = this;
		let c = GGlobal.control;
		GGlobal.modelTigerPass.remove(Model_TigerPass.msg_datas_hurt, s.updateData, s);
		GGlobal.modelTigerPass.remove(Model_TigerPass.msg_bat_res, s.batRes, s);
		GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
		GGlobal.control.remove(Enum_MsgType.MSG_MINEHPCHANGE, this.updateHp, this);
		View_BossSceneHead.hide();
		s.scene.ctx = {};
		MainUIController.showBottomExite(false);
		s.deadInvide = 0;
		
		let vomine = Model_player.voMine;
		let role: SceneCharRole = vomine.sceneChar;
		if (role) {
			role.curhp = role.maxhp;
			role.immuneDmg = 0;
		}
		s.scene.removeAll();
		s.setSt(-1);
		GGlobal.layerMgr.open(UIConst.CHILD_TIGER_PASS);
		s.others = [];
		GGlobal.modelPlayer.playerDetailDic = {};
		s.enemyBoss = null;
		ViewTigPasSceneInfo.instance.onClose();
	}

	protected onClickEixt() {
		ViewAlert.show("退出副本将视为挑战失败，\n是否退出?", Handler.create(this, this.clickExit));
	}

	private clickExit() {
		GGlobal.modelTigerPass.CGDie8907();
	}

	protected directExite() {
		GGlobal.modelScene.returnMainScene();
	}

	protected initState: number = 0;
	protected updateData(): void {
		let s = this;
		let m = GGlobal.modelTigerPass
		if (!(s.initState & 1)) {//是否初始化
			s.initState |= 1;
			const id = m.curId;
			const cfg = Config.hlg_323[id];
			View_BossSceneHead.show(cfg.boss, true, m.bossMaxHp);
		}
		GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, m.bossCurHp);
		if (m.bossCurHp <= 0) {//BOSS被击杀
			s.setSt(2);
		}
	}

	private batRes() {
		let m = GGlobal.modelTigerPass
		let s = this;
		if (m.batRes == 0) {//胜利
			setTimeout(function () {
				ViewCommonWin.show(m.batDrop);
			}, 1000)
		} else {
			ViewCommonFail.show(5000, s, "离开", s.directExite, null, m.batDrop);
		}
	}

	private oldTime
	//是否已经进入失败状态
	private hasExiteState = false;
	public update(ctx) {
		let s = this;
		var now = egret.getTimer();
		if (s.state == 0) {
			var myhp = this.scene.getForceHp(1);
			if (myhp <= 0) {
				this.setSt(1);
			}
			if (now - this.oldTime >= this.pveTime) {
				this.setSt(1);
			}
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

		s.dmgByClient();
	}

	dmgByClient() {
		//玩家伤害
		// super.dmgByClient();
		let self = this;
		if (GGlobal.pauseBattle) return;
		let role = Model_player.voMine.sceneChar;
		let ebos = self.enemyBoss;
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
			let ret = ((role.maxhp * self.bossDmgPer / 100) >> 0) + self.bossDmgFix;
			if (role.curShield > 0) {
				role.curShield = role.curShield > ret ? role.curShield - ret : 0;
				ret = role.curShield > ret ? 0 : ret - role.curShield;
			}
			ret = role.curhp - ret;
			ret = ret < 0 ? 0 : ret;
			role.curhp = ret;
			if (ret <= 0 && self.deadInvide == 0) {
				// this.tellDead();
				self._ply1.deadThrow(5, 5);
				if (role.curhp <= 0) {
					self.deadInvide |= 1;
					let index = self.roleList.indexOf(self._ply1)
					self.roleList.splice(index, 1);
					self._ply1 = null
					Model_player.voMine.sceneChar = null;
				} else {
					ret = role.curhp;
				}
			}
			GGlobal.control.notify(Enum_MsgType.MSG_MINEHPCHANGE, { hp: ret });
		}


		//队友伤害
		if (self._ply2) {
			role = self._ply2
			ebos = self.enemyBoss;
			now = egret.getTimer();
			if (now - self.lastTime1 < 1000) return;
			self.lastTime1 = now;
			if (role && role.curhp > 0 && GGlobal.mapscene.getForceCount(2) > 0) {
				if (role.immuneDmg || role.invincible) {
					return;//无敌不计算伤害
				}
				if (ebos && ((ebos.dizzState && ebos.dizzState.isWorking) || ebos.changeModel > 0)) {
					return;//定身 眩晕不计算伤害
				}
				let ret = ((role.maxhp * self.bossDmgPer / 100) >> 0) + self.bossDmgFix;
				if (role.curShield > 0) {
					role.curShield = role.curShield > ret ? role.curShield - ret : 0;
					ret = role.curShield > ret ? 0 : ret - role.curShield;
				}
				ret = role.curhp - ret;
				ret = ret < 0 ? 0 : ret;
				role.curhp = ret;
				if (ret <= 0 && self.deadInvide1 == 0) {
					self.deadInvide1 |= 1;
					role.deadThrow(5, 5)

					let index = self.roleList.indexOf(self._ply2)
					self.roleList.splice(index, 1);
					self._ply2 = null
				}
				if (ret > 0) self.deadInvide1 = 0;
			}
		}
	}
	deadInvide1 = 0
	lastTime1 = 0

	// protected tellDead() {
	// 	this._ply1.deadThrow(5, 5);
	// }


	public setSt(st) {
		let s = this;
		if (st == 0) {
		} else if (st == 1) {//自己死亡，直接退出
			s.clickExit();
		} else if (st == 2) {//BOSS死亡
			s.enemyBoss.curhp = 0;
			s.enemyBoss.deadThrow(5, 5);
		}
		s.state = st;
		s.oldTime = egret.getTimer();
	}

	public createEnemys(bossId) {
		let s = this;
		let m = GGlobal.modelTigerPass
		let boss = Config.NPC_200[bossId];
		s.enemyBoss = s.createEmeny(bossId);
		//血量
		s.enemyBoss.curhp = m.bossCurHp
		s.enemyBoss.maxhp = m.bossMaxHp

		let ai = new CommonAICtrl();
		ai.role = s.enemyBoss;
		s.enemyBoss.addPlug(ai);
		let bati = BaTiState.create();//获得霸体
		bati.maxTime = 9999999999;//长期霸体
		bati.role = s.enemyBoss;
		s.enemyBoss.addPlug(bati);
		s.enemyBoss.clearHurt = 1;
		s.enemyBoss.force = 2;
		//伤害
		let id = m.curId;
		let cfg = Config.hlg_323[id];
		s.enemyBoss.att = Model_player.voMine.hp * cfg.sh1 / 100 + Model_player.voMine.def;
		s.enemyBoss.force = 2;
		s.bossDmgPer = cfg.sh1;
		s.bossDmgFix = cfg.sh2;

		s.setBossPos(s.enemyBoss);
		s.scene.addUnit(s.enemyBoss);
		View_BossSceneHead.show(bossId, true, m.bossMaxHp, 0, 280, "第" + id + "关    " + boss.name);
	}

	private _ply1: SceneCharRole;
	private _ply2: SceneCharRole;
	private roleList: Array<SceneCharRole> = [];
	public createMyChars() {
		let s = this;
		s._ply1 = null
		s._ply2 = null
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
		s._ply1 = role
		let plyId = GGlobal.modelTigerPass.employId;

		if (plyId != 0) {
			let role1: SceneCharRole;
			let voplayer: Vo_Player = GGlobal.modelPlayer.playerDetailDic[plyId];
			voplayer.updateChars();
			role1 = voplayer.sceneChar;
			if (!s.scene.getUnit(role1.id)) {
				s.setRolePos(role1);
				role1.y += 30;//站位不一样
				role1.x -= 30;//站位不一样
				role1.invalid |= 255;
				role1.force = 1;
				role1.clearHurt = 1;
				s.scene.addUnit(role1);
				s.addHpAndName(role1, true);
			} else {
				s.setRolePos(role1);
			}
			s.roleList.push(role1);
			s._ply2 = role1
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