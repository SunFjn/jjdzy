class PersonalBossCtr extends BossCtrl {
	public constructor() {
		super();
	}

	public pointer: number = 0;

	public steps = [
		{ "t": "start" },
		{ "t": "createMonsters" },
		{ "t": "monsterLessThan" },//挑战结果
		{ "t": "wait" },
		{ "t": "sendMsg" },//发送掉落物品
		{ "t": "pickItems" },//拾捡物品
		{ "t": "exit" }//退出副本
	];

	protected waitTime: number;
	public enterStep(step) {
		var t = egret.getTimer();
		if (t > this.totalTime) step.t = "sendMsg";//超时结算
		var role = this.scene.getLifeHero();
		switch (step.t) {
			case "start":
				break;
			case "createMonsters":
				var id = GGlobal.modelBoss.personalBoss;
				var cfg = Config.solo_220[id];
				var monster = cfg.boss;
				this.enemyBoss = this.createEnemys(monster);
				break;
			case "wait":
				this.waitTime = egret.getTimer();
				break;
			case "sendMsg":
				var ret = this.checkResult();
				var id = GGlobal.modelBoss.personalBoss;
				GGlobal.modelBoss.CG_FIGHT_1255(ret, id);
				if (ret == 2) {//挑战失败退出副本
					ViewBattleFault.show(3000, this, "离开", this.directExite, this.directExite);
				} else {
				}
				break;
			case "pickItems":
				break;
			case "exit":
				Model_Boss.exitBoss(0);
				break;
		}
	}

	public checkStepFinish(step) {
		var ret = true;
		switch (step.t) {
			case "createMonsters":
				break;
			case "monsterLessThan":
				let retType = this.checkResult();
				ret = retType > 0;
				if (retType == 1) GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, 0);
				else if (this.enemyBoss) GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, this.enemyBoss.curhp);
				break;
			case "wait":
				var now = egret.getTimer();
				if (now - this.waitTime < 1000) {
					ret = false;
				}
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
			// ViewCommonWarn.text("wave finish");
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
		if (this.pointer >= this.steps.length) this.pointer = this.steps.length - 1;
		var curStep = this.steps[this.pointer];
		this.enterStep(curStep);
	}

	/**拾捡的时间 归零自动退出副本 */
	protected totalTime: number = 0;
	protected dropTime: number = 600;
	onEnter(scene: MapScene) {
		super.onEnter(scene);
		this.scene = scene;
		this.totalTime = egret.getTimer() + this.pveTime;

		var id = GGlobal.modelBoss.personalBoss;
		var cfg = Config.solo_220[id];
		this.setMapHead(cfg.map);
		var boss = JSON.parse(cfg.boss);
		View_BossSceneHead.show(boss[0][1], false);
		GGlobal.layerMgr.close2(UIConst.BOSS);
		SceneDropCtrl.instance.onEnter(scene);
		SceneDropCtrl.instance.listen(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
		GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, this.onClickEixt, this);
		this.pointer = -1;
		this.nextPoint();
	}

	onExit(scene: MapScene) {
		super.onExit(scene);
		this.dropTime = 600;
		SceneDropCtrl.instance.onEixt();
		SceneDropCtrl.instance.remove(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
		GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, this.onClickEixt, this);
		GGlobal.modelBoss.personalBoss = 0;
		if (GGlobal.layerMgr.lastPanelId <= 0) GGlobal.layerMgr.open(UIConst.BOSS);
		this.enemyBoss = null;
	}

	protected onClickEixt() {
		ViewAlert.show("退出副本将视为挑战失败，\n是否退出?", Handler.create(this, this.directExite));
	}

	protected directExite() {
		GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
		GGlobal.modelBoss.CG_FIGHT_1255(0, GGlobal.modelBoss.personalBoss);
		Model_Boss.exitBoss(0);
	}

	protected onDrop(arg): void {
		this.onDropEnd(arg.drop);
	}

	protected onDropEnd(info:any[]): void {
		let arr = ConfigHelp.makeItemListArr(info);
		for (let i = 0; i < info.length; i++) {
            arr[i].extra = info[i][3];
        }
		GGlobal.modelBoss.bossAward = arr
		GGlobal.layerMgr.open(UIConst.BATTLEWIN);
	}

	public aiUpdate(ctx) {
		var vomine = Model_player.voMine;
		GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
	}

	protected curHp: number;

	public createEnemys(info) {
		var id = JSON.parse(info)[0][1];
		var cfgInfo = Config.NPC_200[id];
		this.curHp = cfgInfo.hp;

		var enemy = this.createEmeny(id);
		enemy.enemyid = id;
		var ai = new CommonAICtrl();
		ai.role = enemy;
		enemy.addPlug(ai);
		enemy.force = 2;
		this.setBossPos(enemy)
		this.addHpAndName(enemy, false);
		this.scene.addUnit(enemy);
		//监听掉落
		SceneDropCtrl.instance.addRole(enemy);
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
		var role: SceneCharRole = p.sceneChar;
		return role.curhp;
	}


	/**0未出结果 1角色获胜 2怪物获胜 */
	public checkResult(): number {
		var hasLeft = this.scene.getForceCount(1);
		var hasRight = this.scene.getForceCount(2);
		if (hasLeft && !hasRight) {
			return 1;
		} else if (hasRight && !hasLeft) {
			return 2;
		}
		return 0;
	}
}