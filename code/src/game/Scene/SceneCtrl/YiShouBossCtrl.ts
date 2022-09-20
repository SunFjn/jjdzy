class YiShouBossCtrl extends SceneCtrl {

	public damageFix = 0;

	protected mine: SceneCharRole;
	protected enemyBoss: SceneCharRole;
	public result: any;
	public randomseed = 0;
	public mapId = 0;
	/**1自己挂了 等复活 2胜利 3超时死亡 4结算中*/
	state = 0;
	revivewTime = 0;
	timeOut = -1;//发出结算协议后等待时间
	lastTime = 0;
	bossDmgPer = 0;
	fixedInjury = 0;
	deadInvide = 0;
	childYSBossTip: ChildYSBossTip;
	private static _inst: YiShouBossCtrl;
	public static getInst() {
		return this._inst || (this._inst = new YiShouBossCtrl());
	}

	public onEnter(scene: MapScene) {
		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt));
		var self = this;
		self.setState(0);
		self.deadInvide = 0;
		self.timeOut = -1;
		self.revivewTime = ConfigHelp.getSystemNum(7305);
		self.scene = scene;
		self.createMyChars();
		self.createBoss();

		let id = GGlobal.modelYiShouBOSS.currentlayer;
		let cfg = Config.ysboss_759[id];
		scene.initWithID(cfg.dt);

		scene.random.seed = self.randomseed;
		GGlobal.control.listen(Enum_MsgType.YSBOSS_REVIVE, self.relifeHD, self);
		GGlobal.control.listen(Enum_MsgType.YSBOSS_RESULT, self.showReshult, self);

		ChildYSBossTip.createInstance().showOrHide(1);
		ChildYSBossTip.createInstance().update(self.revivewTime);
		YiShowBossScenePanel.createInstance().showOrHide(1);
	}

	public onExit() {
		var self = this;
		ChildYSBossTip.createInstance().showOrHide(0);
		YiShowBossScenePanel.createInstance().showOrHide(0);
		GGlobal.control.remove(Enum_MsgType.YSBOSS_RESULT, self.showReshult, self);
		GGlobal.control.remove(Enum_MsgType.YSBOSS_REVIVE, self.relifeHD, self);
		View_BossSceneHead.hide();
		MainUIController.showBottomExite(false);
		self.scene.removeAll();
		self.enemyBoss = null;
		self.mine = null;
		self.timeOut = -1;
		self.deadInvide = 0;
	}

	setState = (v) => {
		this.state = v;
	}

	public tellDead() {
		let self = this;
		if (self.state > 0) {
			return;
		}
		if (self.revivewTime <= 0) {
			self.startResult();
		} else {
			self.setState(1);
			GGlobal.modelBoss.lifeTime = Model_GlobalMsg.getServerTime() + ConfigHelp.getSystemNum(1012) * 1000;
			GGlobal.layerMgr.open(UIConst.YSBOSSREVIVE);
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
		this.mine = role;
	}

	private createBoss() {
		let s = this;
		let id = GGlobal.modelYiShouBOSS.currentlayer;
		let cfg = Config.ysboss_759[id];
		let list = JSON.parse(cfg.boss);
		s.enemyBoss = s.createEmeny(list[0][1]);

		if (GGlobal.modelYiShouBOSS.FirstKiller) {
			let debuf = ConfigHelp.getSystemNum(7301);
			s.enemyBoss.att = Math.floor(s.enemyBoss.att * (100 - debuf) / 100);
			s.enemyBoss.def = Math.floor(s.enemyBoss.def * (100 - debuf) / 100);
			s.enemyBoss.curhp = s.enemyBoss.maxhp = Math.floor(s.enemyBoss.maxhp * (100 - debuf) / 100);
		}

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

		View_BossSceneHead.show(list[0][1], true, s.enemyBoss.maxhp);
	}

	private onClickEixt() {
		ViewAlert.show("退出战斗BOSS血量将回满，确认退出？", Handler.create(this, this.exite));
	}

	exite = () => {
		this.addTimeOut();
		GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_fightEnd_9435(0);
	}

	public addHpAndName(role: SceneCharRole, isSelf: boolean) {
		var namebar = RoleHpAndNamePlug.create(isSelf);
		namebar.role = role;
		role.addPlug(namebar);
	}

	public update(ctx) {
		var self = this;
		if (self.timeOut != -1 && self.timeOut < Model_GlobalMsg.getServerTime()) {
			DEBUGWARING.log("超时自动离开场景");
			self.startResult();
			return;
		}
		if (self.state != 0) {
			return;
		}
		var leftNum = GGlobal.mapscene.getForceCount(1);
		var rightNum = GGlobal.mapscene.getForceCount(2);
		if (rightNum == 0) {
			self.setState(2);
			GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_fightEnd_9435(1);
		} else if (leftNum == 0) {
			self.tellDead();
		} else {
			self.scene.watchMainRole();
			var guanQiaAI = GuanQiaAI;
			guanQiaAI.thinkAttack(self.mine, ctx);
			guanQiaAI.thinkAttack(self.enemyBoss, ctx);
		}

		let boss: SceneCharRole = self.enemyBoss;
		if (boss) {
			GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, boss.curhp);
		} else {
			GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, 0);
		}
	}

	addTimeOut = () => {
		this.timeOut = Model_GlobalMsg.getServerTime() + 15000;
	}

	//超时结算
	startResult = () => {
		this.addTimeOut();
		GGlobal.layerMgr.close2(UIConst.YSBOSSREVIVE);
		GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_fightEnd_9435(0);
	}

	//开始准备复活，计算超时时间。超时将玩家移动到关卡
	startRevive = () => {
		this.addTimeOut();
		GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_relive_9437();
		GGlobal.layerMgr.close2(UIConst.YSBOSSREVIVE);
	}

	relifeHD = (ret) => {
		let self = this;
		self.timeOut = -1;
		self.deadInvide = 0;
		self.createMyChars();
		self.setState(0);
		self.revivewTime--;
		ChildYSBossTip.createInstance().update(self.revivewTime);
		YiShowBossScenePanel.createInstance().resetTime();
	}

	showReshult = (data) => {
		let s = this;
		s.timeOut = -1;
		s.setState(4);
		if (data.ret) {
			ViewCommonWin.show(data.awards, 5000, s, "退出", s.levelScene);
		} else {
			ViewBattleFault.show(3000, s, "离开", s.levelScene, s.levelScene);
		}
	}

	levelScene = () => {
		GGlobal.modelScene.returnMainScene();
		ViewCommonWin.hide();
		ViewBattleFault.hide();
		GGlobal.layerMgr.close2(UIConst.YSBOSSREVIVE);
		GGlobal.layerMgr.open(UIConst.YSBOSS);
		this.setState(0);
	}
}