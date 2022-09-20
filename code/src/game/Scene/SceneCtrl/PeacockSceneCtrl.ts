class PeacockSceneCtrl extends SceneCtrl {

	public constructor() {
		super();
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
	public enterStep(step) {
		var role = this.scene.getLifeHero();
		switch (step.t) {
			case "start":
				break;
			case "createMonsters":
				var cfg = this.getCurBoss();
				var monster = Number(JSON.parse(cfg.boss)[0][0]);
				this.boss = this.createEnemys(monster);
				this.waitTime = egret.getTimer();
				break;
			case "sendMsg":
				var ret = this.checkResult();
				if (ret == 2) {
					this.applayAwards();
				} else {//挑战失败退出副本
					var self = this
					setTimeout(function () {//1秒后弹提示
						ViewCommonFail.show(10000, self, "离开", self.okHandler, null)
					}, 1000);
				}
				break;
			case "pickItems":
				break;
			case "exit":
				this.okHandler()
				break;
		}
	}

	protected startDrop(): void {
		var sceneDropCrrl = SceneDropCtrl.instance;
		sceneDropCrrl.addRole(this.boss);
		sceneDropCrrl.onEnter(this.scene);
		sceneDropCrrl.dropGoods({ id: this.boss.enemyid, drop: this.getDropArr() });
	}

	public checkStepFinish(step) {
		var ret = true;
		switch (step.t) {
			case "createMonsters":
				break;
			case "monsterLessThan":
				var hp = this.getEmenyHp();
				if (this.curHp != hp) {
					GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, hp);
					this.curHp = hp;
				}
				ret = this.checkResult() > 0;
				break;
			case "pickItems":
				if (this.dropTime) {
					ret = false;
				}
				this.dropTime -= 1;
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
	protected dropTime: number = 1200;
	onEnter(scene: MapScene) {
		this.scene = scene;
		scene.ignoreBreak = false;
		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
		this.createMyChars();

		this.setMapHead(350001);
		var cfg = this.getCurBoss();
		var bossId = Number(JSON.parse(cfg.boss)[0][0]);
		let bigTower = Model_Peacock.getBatBigRewad();
		if (bigTower) {//大奖
			let rewardVo: IGridImpl = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(bigTower.reward))[0];
			View_BossSceneHead.show(bossId, false, 0, 0, 280, "", rewardVo, bigTower.id + "层大奖");
		} else {
			View_BossSceneHead.show(bossId, false, 0, 0, 280, "");
		}

		SceneDropCtrl.instance.onEnter(scene);
		SceneDropCtrl.instance.listen(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
		this.addDrop();
		this.pointer = -1;
		this.nextPoint();
	}

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
		View_BossSceneHead.hide();
		this.scene.ctx = {};
		this.scene.removeAll();
		MainUIController.showBottomExite(false);
		this.dropTime = 1200;
		SceneDropCtrl.instance.onEixt();
		SceneDropCtrl.instance.remove(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
		this.removeDrop();
		this.boss = null;
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

	protected onDropEnd(info): void {
		if (this.getNextBoss() == null || Model_Peacock.battleLayer <= 5) {
			ViewCommonWin.show(ConfigHelp.makeItemListArr(this.getDropArr()), 5000, this, "退出", this.okHandler);
		} else {
			ViewCommonWin1.show(ConfigHelp.makeItemListArr(this.getDropArr()), 5000, this.continueHandler, null, this, this.okHandler);
		}
	}

	public aiUpdate(ctx) {
		var vomine = Model_player.voMine;
		if(vomine.sceneChar){
			GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
		}
	}
	protected boss: SceneCharRole;
	protected curHp: number;

	public createEnemys(id) {
		var enemy = this.createEmeny(id);
		var ai = new CommonAICtrl();
		ai.role = enemy;
		enemy.addPlug(ai);
		enemy.force = 2;
		this.setBossPos(enemy)
		this.addHpAndName(enemy, false);
		this.scene.addUnit(enemy);
		//监听掉落
		SceneDropCtrl.instance.addRole(enemy);
		this.curHp = enemy.maxhp
		return enemy;
	}

	public getForceCount(force: number): number {
		var ret = 0;
		var role = this.scene.getLifeHero();
		if (!role) {
			return;
		}
		var list = role.scene.list;
		for (var i = list.length - 1; i >= 0; i--) {
			var u: SceneCharRole = list[i] as SceneCharRole;
			if (u && u.force == force) {
				ret++;
			}
		}
		return ret;
	}

	public getTotalHp(p: Vo_Player): number {
		var ret = 0;
		var role: SceneCharRole = p.sceneChar;
		ret += role.curhp;
		return ret;
	}

	/**怪物的总气血 */
	public getEmenyHp(): number {
		var ret = 0;
		var role = this.scene.getLifeHero();
		if (!role) {
			return;
		}
		var list = role.scene.list;
		for (var i = list.length - 1; i >= 0; i--) {
			var u: SceneCharRole = list[i] as SceneCharRole;
			if (u && u.force == 2) {
				ret += u.curhp;
			}
		}
		return ret;
	}
	/**0未出结果 1失败 2胜利 */
	public checkResult(): number {
		var myhp = this.scene.getForceHp(1);
		var playerhp = this.scene.getForceHp(2);
		var now = egret.getTimer()
		if (now - this.waitTime >= this.pveTime - this.surTime) {
			ViewBattlePrompt.show(Math.floor((this.pveTime + this.waitTime - now) / 1000));
		}
		if (playerhp <= 0 || myhp <= 0 || now - this.waitTime >= this.pveTime) {
			if (this.getBattleRes() == 1) {
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
		GGlobal.modelPeacock.CG_UPTOWER();
	}
	protected getBattleRes() {
		return Model_Peacock.battleRes;
	}
	protected getNextBoss() {
		var id = Model_Peacock.battleLayer;
		return Config.tower_219[id + 1];
	}
	protected getDropArr() {
		return Model_Peacock.dropArr;
	}
	protected getCurBoss() {
		var id = Model_Peacock.battleLayer;
		return Config.tower_219[id];
	}
	protected applayAwards() {
		GGlobal.modelPeacock.CG_BEATBOSSWIN();
	}
	protected trytoOpenPnl() {
		if (GGlobal.layerMgr.lastPanelId <= 0) GGlobal.layerMgr.open(UIConst.FUBEN)
	}
	protected removeDrop() {
		GGlobal.control.remove(Enum_MsgType.PEACOCK_BATTLE_DROP, this.startDrop, this);
	}
	protected addDrop() {
		GGlobal.control.listen(Enum_MsgType.PEACOCK_BATTLE_DROP, this.startDrop, this);
	}
}
