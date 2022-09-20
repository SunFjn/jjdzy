class WarToDeadSceneCtrl extends SceneCtrl {
	private static _inst: WarToDeadSceneCtrl;
	public static getInst() {
		return this._inst || (this._inst = new WarToDeadSceneCtrl());
	}
	public pointer: number = 0;

	public steps = [
		{ "t": "start" },
		{ "t": "createMonsters" },
		{ "t": "monsterLessThan" },//挑战结果
		{ "t": "sendMsg" },//发送掉落物品
		{ "t": "pickItems" },//拾捡物品
		{ "t": "exit" }//退出副本
	];
	protected waitTime: number;
	private curWave = 1;
	onEnter(scene: MapScene) {
		let self = this;
		self.scene = scene;
		scene.ignoreBreak = false;
		MainUIController.showBottomExite(true, Handler.create(self, this.onClickEixt), self);
		self.createMyChars();
		self.curWave = 1;
		SceneDropCtrl.instance.onEnter(scene);
		SceneDropCtrl.instance.listen(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
		this.addDrop();
		this.pointer = -1;
		this.nextPoint();
	}

	public enterStep(step) {
		let self = this;
		var role = this.scene.getLifeHero();
		switch (step.t) {
			case "start":
				break;
			case "createMonsters":
				self.createEnemys();
				this.waitTime = egret.getTimer();
				break;
			case "sendMsg":
				var ret = this.checkResult();
				if (ret == 2) {
					self.applayAwards();
				} else {//挑战失败退出副本
					setTimeout(function () {//1秒后弹提示
						ViewCommonFail.show(10000, self, "离开", self.okHandler, null)
					}, 1000);
				}
				break;
			case "pickItems":
				break;
			case "exit":
				self.okHandler()
				break;
		}
	}

	protected startDrop(): void {
		let self = this;
		var sceneDropCrrl = SceneDropCtrl.instance;
		sceneDropCrrl.addRole(self.boss);
		sceneDropCrrl.onEnter(self.scene);
		sceneDropCrrl.dropGoods({ id: self.boss.enemyid, drop: self.getDropArr() });
	}

	public checkStepFinish(step) {
		let self = this;
		var ret = true;
		switch (step.t) {
			case "createMonsters":
				break;
			case "monsterLessThan":
				var hp = self.scene.getForceHp(2);
				if (self.boss) {
					if (self.curHp != hp) {
						GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, hp);
						self.curHp = hp;
					}
					ret = self.checkResult() > 0;
				} else {
					if (hp <= 0) {
						self.curWave++;
						self.createEnemys();
					}
					ret = false;
				}
				break;
			case "pickItems":
				if (self.dropTime) {
					ret = false;
				}
				self.dropTime -= 1;
				break;
		}
		return ret;
	}

	public exitStep(step) {
		if (step.t == "monsterLessThan") {
		}
	}

	public update(ctx) {
		var curStep = this.steps[this.pointer];
		if (this.checkStepFinish(curStep)) {
			this.exitStep(curStep);
			this.nextPoint();
		}
		this.aiUpdate(ctx);
		this.scene.watchMainRole();
	}

	public nextPoint() {
		this.pointer++;
		var curStep = this.steps[this.pointer];
		this.enterStep(curStep);
	}

	/**拾捡的时间 40s归零自动退出副本 */
	protected dropTime: number = 1200

	public createMyChars() {
		var vomine = Model_player.voMine;
		vomine.updateChars();
		var role: SceneCharRole = vomine.sceneChar;
		if (!this.scene.getUnit(role.id)) {
			this.setRolePos(role);
			role.invalid |= 1023;
			role.force = 1;
			this.scene.addUnit(role);
			this.addHpAndName(role, true);
		}
		this.scaleAttribute(role, this.getBattleRes(), true);
	}

	onExit(scene: MapScene) {
		let self = this;
		View_BossSceneHead.hide();
		self.scene.ctx = {};
		self.scene.removeAll();
		MainUIController.showBottomExite(false);
		self.dropTime = 1200;
		SceneDropCtrl.instance.onEixt();
		SceneDropCtrl.instance.remove(SceneDropCtrl.MSG_DROP_END, self.onDropEnd, self);
		self.removeDrop();
		self.boss = null;
	}

	protected onClickEixt() {
		ViewAlert.show("退出将视为挑战失败，\n是否确认？", Handler.create(this, this.okHandler));
	}

	protected okHandler(): void {
		GGlobal.modelScene.returnMainScene();
		this.trytoOpenPnl();
	}

	protected onDrop(arg): void {
		this.onDropEnd(arg.drop);
	}

	public aiUpdate(ctx) {
		var vomine = Model_player.voMine;
		if (vomine.sceneChar) {
			GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
		}
	}
	protected boss: SceneCharRole;
	protected curHp: number;

	public createEnemys() {
		let self = this;
		let index = 0;
		let cfg = self.getCurBoss();
		self.setMapHead(cfg.ditu);
		let monestArr = JSON.parse(cfg.xiaoguai);
		for (let i = 0; i < monestArr.length; i++) {
			if (monestArr[i][0] == self.curWave) {
				for (let j = 0; j < monestArr[i][2]; j++) {
					let monset = self.createEmeny(monestArr[i][1]);
					let ai = new CommonAICtrl();
					ai.role = monset;
					monset.addPlug(ai);
					monset.force = 2;
					self.setMonsterPos(monset)
					self.addHpAndName(monset, false);
					self.scene.addUnit(monset);
				}
				index++;
			}
		}
		if (index <= 0) {
			var bossId = cfg.boss;
			View_BossSceneHead.show(bossId, false, 0, 0, 280, "");
			let enemy = self.createEmeny(bossId);
			let ai = new CommonAICtrl();
			ai.role = enemy;
			enemy.addPlug(ai);
			enemy.force = 2;
			self.setBossPos(enemy)
			self.addHpAndName(enemy, false);
			self.scene.addUnit(enemy);
			//监听掉落
			SceneDropCtrl.instance.addRole(enemy);
			self.curHp = enemy.maxhp;
			self.boss = enemy;
		}
	}

	/**0未出结果 1失败 2胜利 */
	public checkResult(): number {
		let self = this;
		var myhp = self.scene.getForceHp(1);
		var playerhp = self.scene.getForceHp(2);
		var now = egret.getTimer()
		if (now - self.waitTime >= self.pveTime - self.surTime) {
			ViewBattlePrompt.show(Math.floor((self.pveTime + self.waitTime - now) / 1000));
		}
		if (playerhp <= 0 || myhp <= 0 || now - self.waitTime >= self.pveTime) {
			if (self.getBattleRes() == 1) {
				return 1;//服务端失败
			} else {
				if (playerhp <= 0) {
					return 2;
				} else {
					return 1;
				}
			}
		}
		return 0;
	}

	protected continueHandler(): void {
		if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
			GGlobal.modelWarToDead.CG4751();
		} else {
			GGlobal.modelWarToDead.challenge();
		}
	}
	protected getBattleRes() {
		return GGlobal.modelWarToDead.batState;
	}

	protected getDropArr() {
		return GGlobal.modelWarToDead.awards;
	}
	protected getCurBoss() {
		var id = GGlobal.modelWarToDead.batLayer;
		if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
			var cfgId = (GGlobal.modelWarToDead.qiShu - 1) * 1000 + id;
			return <any>Config.xzdd3_252[cfgId];
		} else {
			var bool = TimeUitl.isIn7Days();
			if (bool) {
				return <any>Config.xzdd1_252[id];
			} else {
				return <any>Config.xzdd2_252[id];
			}
		}
	}
	protected applayAwards() {
		if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
			GGlobal.modelWarToDead.CG4753();
		} else {
			GGlobal.modelWarToDead.applyAwards();
		}
	}
	protected trytoOpenPnl() {
		if (GGlobal.layerMgr.lastPanelId <= 0) {
			if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
				GGlobal.layerMgr.open(UIConst.CHAOZHIFL, UIConst.WARTODEAD1);
			} else {
				const bool = TimeUitl.isIn7Days();
				if (bool) {
					GGlobal.layerMgr.open(UIConst.CHAOZHIFL, UIConst.WARTODEAD_7IN);
				} else {
					GGlobal.layerMgr.open(UIConst.CHAOZHIFL, UIConst.WARTODEAD_7OUT);
				}
			}
		}
	}
	protected addDrop() {
		GGlobal.modelWarToDead.listen(ModelWarToDead.msg_jlDrop, this.startDrop, this);
	}
	protected removeDrop() {
		GGlobal.modelWarToDead.remove(ModelWarToDead.msg_jlDrop, this.startDrop, this);
	}
	protected onDropEnd(info): void {
		ViewCommonWin.show(ConfigHelp.makeItemListArr(this.getDropArr()), 5000, this, "退出", this.okHandler);
	}
}