class QuanMinBossSceneCtrl_dj extends SceneCtrl {
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
				var id = GGlobal.modelBoss.curEnterId;
				var cfg = Config.all_221[id];
				var monster = JSON.parse(cfg.boss)[0][1];
				this.createEmenyByInfo(monster);
				break;
			case "monsterLessThan":
				this.waitTime = egret.getTimer();
				break;
			case "sendMsg":
				var ret = this.checkResult();
				if (ret == 2) {
					this._timeOut = setTimeout(function () {//1秒后弹提示
						GGlobal.modelBoss.CG_GET_DANJI_RES_1367(GGlobal.modelBoss.curEnterId)
					}, 500);
				} else {//挑战失败退出副本
					var self = this
					this._timeOut = setTimeout(function () {//1秒后弹提示
						ViewCommonFail.show(10000, self, "离开", self.exitHandler, null)
					}, 500);
				}
				break;
			case "pickItems":
				break;
			case "exit":
				this.exitHandler();
				break;
		}
	}
	private _timeOut
	private startDrop(): void {
		GGlobal.layerMgr.open(UIConst.BATTLEWIN)
	}

	public checkStepFinish(step) {
		var ret = true;
		switch (step.t) {
			case "createMonsters":
				break;
			case "monsterLessThan":
				var hp = this.getEmenyHp();
				if (this._maxHp == 0) {
					this._maxHp = hp;
				}
				if (this.curHp != hp) {
					GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, hp);
					GGlobal.modelBoss.myHurt = this._maxHp - hp
					GGlobal.control.notify(Enum_MsgType.MSG_QMBOSS_DANJI_BOSSXUE);
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


	public update(ctx) {
		var curStep = this.steps[this.pointer];
		if (this.checkStepFinish(curStep)) {
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

	/**拾捡的时间 归零自动退出副本 */
	protected dropTime: number = 1200;
	private _maxHp = 0;
	onEnter(scene: MapScene) {
		this.scene = scene;
		scene.ignoreBreak = false;
		this.createMyChars();

		var id = GGlobal.modelBoss.curEnterId;
		var cfg = Config.all_221[id];
		let boss = JSON.parse(cfg.boss)[0][1]
		this.setMapHead(cfg.map);
		var bossName = Config.NPC_200[boss].name
		View_BossSceneHead.show(boss, true);
		this._maxHp = 0;
		QMBossInfo.show();

		GGlobal.layerMgr.close2(UIConst.QMBOSS)

		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt));
		// SceneDropCtrl.instance.onEnter(scene);
		// SceneDropCtrl.instance.listen(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
		GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_DANJI_RES, this.startDrop, this);
		this.pointer = -1;
		this.nextPoint();
	}

	private other: SceneCharRole[] = []
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

		this.other = []
		var id = GGlobal.modelBoss.curEnterId;
		var cfg = Config.all_221[id];
		var robotArr: number[] = JSON.parse(cfg.robot)[0];
		for (let i = 0; i < robotArr.length; i++) {
			let robot = robotArr[i]
			var mapscene = this.scene;
			var npc = this.createEmeny(robot)
			npc.force = 1;
			npc.faceDir = 1;
			this.setRolePos(npc);
			npc.y = npc.y + 10 * (i + 1)
			npc.name = RandomName.getName();
			this.addHpAndName(npc, false);
			this.other.push(npc)
			//监听掉落
			var ai = new CommonAICtrl();
			ai.role = npc;
			npc.addPlug(ai);
			mapscene.addUnit(npc);
		}
	}

	onExit(scene: MapScene) {
		View_BossSceneHead.hide();
		this.scene.ctx = {};
		this.scene.removeAll();
		this.boss = null;
		this.dropTime = 1200;
		MainUIController.showBottomExite(false);
		// SceneDropCtrl.instance.onEixt();
		// SceneDropCtrl.instance.remove(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
		GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_DANJI_RES, this.startDrop, this);
		QMBossInfo.hide();
	}

	protected onClickEixt(): void {
		ViewAlert.show("退出副本将视为挑战失败，\n是否退出?", Handler.create(this, this.directExite));
	}

	protected directExite() {
		GGlobal.layerMgr.close2(UIConst.QMBOSSRANK);
		GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
		GGlobal.modelBoss.curEnterId = 0;
		this.exitHandler();
		clearTimeout(this._timeOut);
	}

	private exitHandler(): void {
		Model_Boss.exitBoss(1);
	}

	// protected onDrop(arg): void {
	// 	this.onDropEnd(arg.drop);
	// }

	// protected onDropEnd(info): void {
	// 	GGlobal.layerMgr.open(UIConst.BATTLEWIN)
	// }

	public aiUpdate(ctx) {
		var vomine = Model_player.voMine;
		GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
	}

	private boss: SceneCharRole;
	protected curHp: number;
	protected createEmenyByInfo(id) {
		var mapscene = this.scene;
		var enemy = this.createEmeny(id)
		this.setBossPos(enemy);
		this.boss = enemy;
		//监听掉落
		// SceneDropCtrl.instance.addRole(enemy);
		var ai = new CommonAICtrl();
		ai.role = enemy;
		enemy.addPlug(ai);
		mapscene.addUnit(enemy);
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

	/**0未出结果 1失败 2获胜 */
	public checkResult(): number {
		var myhp = this.scene.getForceHp(1);
		var playerhp = this.scene.getForceHp(2);
		var now = egret.getTimer()
		if (now - this.waitTime >= this.pveTime - this.surTime) {
			ViewBattlePrompt.show(Math.floor((this.pveTime + this.waitTime - now) / 1000));
		}
		if (playerhp <= 0 || myhp <= 0 || now - this.waitTime >= this.pveTime) {
			if (playerhp <= 0) {
				return 2;
			} else {
				return 1;
			}
		}
		return 0;
	}
}