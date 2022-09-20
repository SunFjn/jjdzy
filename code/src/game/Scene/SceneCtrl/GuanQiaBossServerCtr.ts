/**关卡BOSS 协助类型的战斗*/class GuanQiaBossServerCtr extends SceneCtrl {
	public constructor() {
		super();
	}
	private static _inst: GuanQiaBossServerCtr;
	public static getInstance() {
		return this._inst || (this._inst = new GuanQiaBossServerCtr());
	}

	private bosshp = 10;
	private bossMaxhp = 10;
	private boss: SceneCharRole;
	private startTime = 0;
	private jinjiaBoss: SceneCharRole;//金甲
	private oldGuanQiaLv:number = 0;
	onEnter(scene: MapScene) {
		let s = this;
		s.scene = scene;
		GGlobal.layerMgr.closeAllPanel();
		GGlobal.mainUICtr.setState(MainUIController.GUANQIABOSS);
		scene.ctx.clearHurt = true;
		scene.ctx.isClearShow = true;
		scene.ignoreBreak = false;
		s.startTime = 0;
		s.oldGuanQiaLv = GGlobal.modelGuanQia.curGuanQiaLv;

		let modelguanqia = GGlobal.modelGuanQiaHelp; 
		let lib = Config.xiaoguai_205;
		let mapid = Config.BOSS_205[modelguanqia.curGuanQiaLv].m;
		s.scene.initWithID(mapid);
		s.createMyChars();
		s.createOtherChar();
		s.createEnemys();

		MainUIController.showBottomExite(true, Handler.create(s, s.exitT));
		GGlobal.control.listen(Enum_MsgType.GUANQIA_HELP_PLAYER_HP, s.playerHpUpdate, s);
		GGlobal.control.listen(Enum_MsgType.GUANQIA_HELP_LEAVE, s.playerLeave, s);
		GGlobal.control.listen(Enum_MsgType.GUANQIA_HELP_BOSS_HP, s.bossHpUpdate, s);
		GGlobal.control.listen(Enum_MsgType.GUANQIA_HELP_DEAD, s.playerDeadHd, s);
	}
	onExit(scene: MapScene) {
		let s = this;
		this.scene.ctx = {};
		MainUIController.showBottomExite(false, Handler.create(s, s.exitT));
		GGlobal.control.remove(Enum_MsgType.GUANQIA_HELP_PLAYER_HP, s.playerHpUpdate, s);
		GGlobal.control.remove(Enum_MsgType.GUANQIA_HELP_LEAVE, s.playerLeave, s);
		GGlobal.control.remove(Enum_MsgType.GUANQIA_HELP_BOSS_HP, s.bossHpUpdate, s);
		GGlobal.control.remove(Enum_MsgType.GUANQIA_HELP_DEAD, s.playerDeadHd, s);
		View_BossSceneHead.hide();
		s.boss = null;
		s.jinjiaBoss = null;
		this.scene.removeAll();
		this.others = [];
		if(s.oldGuanQiaLv != GGlobal.modelGuanQia.curGuanQiaLv)
		{
			ViewGuanQiaTips.show();
		}
	}
	public returnGuanqia() {
		GGlobal.modelGuanQiaHelp.CG_5915_EXITE();
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
	}

	protected exitT() {
		let s = this;
		s.returnGuanqia();
	}


	update(ctx) {
		if (this.boss) {
			this.boss.curhp = this.bosshp;
			this.boss.maxhp = this.bossMaxhp;
			GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, this.bosshp);
			if (this.bosshp == 0) {
				this.boss.deadThrow(5, 5);
				this.boss = null;
			}
			this.aiUpdate(ctx);
		}
		if (this.jinjiaBoss) {
			if (egret.getTimer() - this.startTime > 2000) {
				this.jinjiaBoss.takeMaxHurt();
				this.jinjiaBoss = null;
			}
		}
		if(Model_player.voMine.sceneChar)this.scene.watchMainRole(35);
	}

	private others = [];
	public aiUpdate(ctx) {
		let vomine = Model_player.voMine;
		GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
		if (this.jinjiaBoss) GuanQiaAI.thinkAttack(this.jinjiaBoss, ctx);
		if (this.boss) GuanQiaAI.thinkAttack(this.boss, ctx);
		for (let i = 0; i < this.others.length; i++) {
			if (this.others[i]) {
				GuanQiaAI.thinkAttack(this.others[i], ctx, this.searchEnemy);
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

	public createEnemys() {
		let s = this;
		let m = GGlobal.modelGuanQiaHelp;
		let bossList = ConfigHelp.splitIntArr(Config.BOSS_205[m.curGuanQiaLv].BL);
		let list = bossList[0];
		let cx = s.scene.map.focusx;
		let enemy;
		let id = list[1];
		let count = list[2];
		for (let ii = 0; ii < count; ii++) {
			enemy = s.createEmeny(id);
			s.setBossPos(enemy, -300);
			enemy.force = 2;
			s.scene.addUnit(enemy);
			this.bosshp = enemy.curhp;
			this.bossMaxhp = enemy.maxhp;
		}
		s.boss = enemy;
		enemy.enemyid = enemy.id;
		View_BossSceneHead.show(id, false, 0);

		//创建金甲
		let bool = GGlobal.modelGuanQiaHelp.hasSuprise;
		if (bool) {
			let jjid = Config.xtcs_004[3921].num;
			enemy = s.createEmeny(jjid);
			s.setBossPos(enemy, 540);
			enemy.y = 650;
			enemy.curhp = enemy.maxhp = ModelGuanQia.MAX_HP;
			enemy.force = 2;
			s.scene.addUnit(enemy);
			let hpplug = GuanQiaMonHpPlug.create();
			hpplug.role = enemy;
			enemy.addPlug(hpplug);
			s.jinjiaBoss = enemy;
		}
	}

	public createMyChars() {
		let s = this;
		let vomine = Model_player.voMine;
		vomine.updateChars();
		let role: SceneCharRole = vomine.sceneChar;
		role.scene = s.scene;
		if (s.scene.getUnit(role.id)) {
			s.scene.watchMainRole(35);
			return;
		}
		role.curhp = role.maxhp;
		s.setRolePos(role);
		role.invalid |= 1023;
		role.force = 1;
		s.scene.addUnit(role);
		s.scene.watchMainRole(35);
		s.addHpAndName(role, true);
	}

	private createOtherChar() {
		let s = this;
		let team = GGlobal.modelGuanQiaHelp.teamerid;
		if (team) {
			let vo = GGlobal.modelPlayer.playerDetailDic[team];
			if (vo) {
				vo.updateChars();
				let role: SceneCharRole = vo.sceneChar;
				role.scene = s.scene;
				role.curhp = role.maxhp;
				s.setRolePos(role);
				role.invalid |= 1023;
				role.force = 1;
				s.scene.addUnit(role);
				s.scene.watchMainRole(35);
				s.addHpAndName(role, true);
				s.others.push(role);
			}
		}
	}

	private bossHpUpdate(opt) {
		this.bosshp = opt.hp;
		this.bossMaxhp = opt.maxHp;
	}

	private playerLeave(id) {
		let role = GGlobal.mapscene.getUnit(id) as SceneCharRole;
		if (role) {
			role.takeMaxHurt();
			let idx = this.others.indexOf(role);
			if (idx != -1) {
				this.others.splice(idx, 1);
			}
		}
	}

	private playerDeadHd(id) {
		let role = GGlobal.mapscene.getUnit(id) as SceneCharRole;
		if (role) {
			role.takeMaxHurt();
			let idx = this.others.indexOf(role);
			if (idx != -1) {
				this.others.splice(idx, 1);
			}
		}
	}

	private playerHpUpdate(arr) {
		if (!arr) return;
		let len = arr.length;
		for (let i = 0; i < len; i++) {
			let id = arr[i][0];
			let hp = arr[i][1];
			let role = GGlobal.mapscene.getUnit(id) as SceneCharRole;
			if (role) {
				role.curhp = hp;
			}
		}
	}
}