class ZFZJCtr extends SceneCtrl {
	public constructor() {
		super();
	}

	protected static _instance: ZFZJCtr;
	public static get instance() {
		if (!ZFZJCtr._instance) {
			ZFZJCtr._instance = new ZFZJCtr();
		}
		return ZFZJCtr._instance;
	}

	bossDmgPer = 0;//BOSS秒伤
	public state = -1;
	public onEnter(scene: MapScene) {
		let s = this;
		scene.ctx.clearHurt = true;
		scene.ctx.isClearShow = true;
		scene.ignoreBreak = false;
		s.scene = scene;
		s.registerEvent(true);
		GGlobal.layerMgr.close2(GGlobal.modelzfzj.activityVo.groupId);
		MainUIController.showBottomExite(true, Handler.create(s, s.onClickEixt));
		s.createMyChars();
		s.setSt(0);
		ZFZJSceneInfo.instance.onopen();
		ChildComAutoRevive.createInstance().show1();
	}

	protected generalStateChange(data) {
		let st = data.st;
		let list = data.list;
		if (st == 0) {
			this.generalRelife(list);
		} else {
			this.generalKilled(list);
		}
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

	protected enemyBoss: SceneCharRole;
	public createChars(voplayer: Vo_Player, pos) {
		voplayer.updateChars();
		let s = this;
		let i = 0;
		let role: SceneCharRole = voplayer.sceneChar;
		if (s.scene.getUnit(role.id) == undefined) {
			s.setRolePos(role);
			role.invalid |= 255;
			role.force = pos;
			role.setName(voplayer.name);
			s.scene.addUnit(role);
		} else {
			s.setRolePos(role);
		}
	}

	/**其他玩家信息 */
	public others: Vo_Player[] = [];
	public createOtherPlayer(vo: Vo_Player): void {
		let s = this;
		ArrayUitl.cleannull(s.others);
		if (s.others.length >= 5) {
			s.removeOther(s.others[0].id);
		}
		if (s.others.indexOf(vo) == -1) {
			s.others.push(vo);
		}
		if (Model_player.isMineID(vo.id)) {
			return;
		}
		s.createChars(vo, 1);
	}

	/**删除某个玩家 */
	public removeOther(id: number): void {
		let s = this;
		let len = s.others.length;
		for (let i = 0; i < len; i++) {
			if (s.others[i] && s.others[i].id == id) {
				let vo = s.others[i];
				if (vo.sceneChar && vo.sceneChar.view && vo.sceneChar.view.parent) {//当前角色还存在于此场景
					s.scene.removeUnit(vo.sceneChar);
				}
				if (Model_player.voMine.id == vo.id) {
					Model_player.voMine.sceneChar = null;
				}
				s.others[i] = null;
				break;
			}
		}
		ArrayUitl.cleannull(s.others);
	}

	protected updateHp(arg) {
		let vomine = Model_player.voMine;
		if (vomine.sceneChar) {
			if (arg.hp > 0) this.deadInvide = 0;
			vomine.sceneChar.curhp = arg.hp;
		}
	}

	public onExit(scene: MapScene) {
		let self = this;
		View_BossSceneHead.hide();
		let vomine = Model_player.voMine;
		let role: SceneCharRole = vomine.sceneChar;
		if (role) {
			role.curhp = role.maxhp;
			role.immuneDmg = 0;
		}
		self.scene.ctx = {};
		self.scene.removeAll();
		self.others = [];
		MainUIController.showBottomExite(false);
		self.deadInvide = 0;
		self.registerEvent(false);
		GGlobal.modelPlayer.playerDetailDic = {};
		self.enemyBoss = null;
		self.roleState(0);
		self.setSt(-1);
		ZFZJSceneInfo.instance.onclose();
		self.others = [];
		ChildComAutoRevive.createInstance().hide1();
		GGlobal.layerMgr.open(GGlobal.modelzfzj.activityVo.groupId, GGlobal.modelzfzj.activityVo.id);
	}

	private registerEvent(pFlag: boolean): void {
		let s = this;
		let c = GGlobal.control;
		c.register(pFlag, Enum_MsgType.MSG_MINEHPCHANGE, s.updateHp, s);
		c.register(pFlag, Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
		c.register(pFlag, Enum_MsgType.MSG_PLAYER_RELIFE, s.generalRelife, s);
		c.register(pFlag, Enum_MsgType.CC_SCENE_PLAYER_STATE, s.generalStateChange, s);
		c.register(pFlag, Enum_MsgType.ZFZJ_ROLE_LIFE, s.roleState, s);
		c.register(pFlag, Enum_MsgType.ZFZJ_BOSS_DEAD, s.stateChange, s);
		c.register(pFlag, Enum_MsgType.ZFZJ_UPDATEHURT, s.updateData, s);
		GGlobal.modelGlobalMsg.register(pFlag, Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
	}

	private stateChange() {
		let s = this;
		if (GGlobal.modelzfzj.curHp <= 0) {//胜利
			s.showWin();
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
		let m = GGlobal.modelzfzj;
		layerMgr.close2(UIConst.REVIVE_PANEL);
		let awards = Config.hfkhzfzj_286[m.bossLv].reward1;
		awards = ConfigHelp.makeItemListArr(JSON.parse(awards));
		ViewFightWin.showTip = true;
		layerMgr.open(uiconst.BATTLEWIN, awards);
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
			GGlobal.layerMgr.open(UIConst.REVIVE_PANEL, UIConst.HFKH_ZFZJ);
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

	protected onClickEixt() {
		let s = this;
		ViewAlert.show("是否退出?\n(退出后<font color='#ffc334'>30秒</font>不可再次进入)", Handler.create(s, s.directExite));
	}

	protected directExite() {
		GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
		GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_quit_9647();
		GGlobal.modelScene.returnMainScene();
	}

	protected tellDead() {
		GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_cgherodie_9653();
	}

	protected dieTime: number;
	public setSt(st) {
		let s = this;
		if (st == 0) {
			s.createEnemys();
			let mapid = 389001;
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
		let m = GGlobal.modelzfzj;
		let cfg = Config.hfkhzfzj_286[m.bossLv];
		let id = cfg.boss;
		s.enemyBoss = s.createEmeny(id);
		let ai = new BossAI();
		ai.role = s.enemyBoss;
		s.enemyBoss.addPlug(ai);
		let bati = BaTiState.create();//获得霸体
		bati.role = s.enemyBoss;
		s.enemyBoss.addPlug(bati);
		bati.maxTime = 9999999999;//长期霸体
		s.enemyBoss.att = Model_player.voMine.hp * cfg.ap / 100 + Model_player.voMine.def;
		s.enemyBoss.force = 2;
		s.setBossPos(s.enemyBoss);
		s.scene.addUnit(s.enemyBoss);

		s.bossDmgPer = cfg.ap;
		View_BossSceneHead.show(id, false, GGlobal.modelzfzj.maxHp);
		GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, GGlobal.modelzfzj.curHp);
	}

	protected initState: number = 0;
	protected updateData(): void {
		let s = this;
		let m = GGlobal.modelzfzj;
		if (!(s.initState & 1)) {//是否初始化
			s.initState |= 1;
			let cfg = Config.hfkhzfzj_286[m.bossLv];
			View_BossSceneHead.show(cfg.boss, false, m.maxHp)
		}
		GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, m.curHp);
		if (m.curHp <= 0) {//BOSS被击杀
			s.setSt(2);
		}
	}

	public createMyChars() {
		let vomine = Model_player.voMine;
		vomine.updateChars();
		let role: SceneCharRole = vomine.sceneChar;
		this.setRolePos(role);
		role.invalid |= 1023;
		role.force = 1;
		role.immuneDmg = 1;
		if (this.scene.getUnit(role.id) == undefined) {
			this.scene.addUnit(role);
			this.addHpAndName(role, true);
		}
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