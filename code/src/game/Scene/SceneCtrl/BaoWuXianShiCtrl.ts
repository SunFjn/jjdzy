class BaoWuXianShiCtrl extends SceneCtrl {

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
				var monster = cfg.boss;
				this.boss = this.createEmenyByInfo(monster);
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
		this.onDropEnd(this.getDropArr());
	}

	public checkStepFinish(step) {
		var ret = true;
		switch (step.t) {
			case "createMonsters":
				break;
			case "monsterLessThan":
				var hp = this.getEmenyHp();
				if (this.curHp != hp) {
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
		this.scene.ctx = {};


		this.dropTime = 1200;
		this.scene.removeAll();
		MainUIController.showBottomExite(false);
		this.removeDrop();
		this.boss = null;
	}

	protected onClickEixt() {
		ViewAlert.show("退出将视为挑战失败，\n是否确认？", Handler.create(this, this.sureClickEixt));
	}

	private sureClickEixt() {
		this.okHandler();
		GGlobal.modelbwXianShi.bwXianShi()
	}

	protected okHandler(): void {
		GGlobal.modelScene.returnMainScene();
	}

	protected onDrop(arg): void {
		this.onDropEnd(arg.drop);
	}

	protected onDropEnd(info): void {
		this.okHandler();
	}

	public aiUpdate(ctx) {
		var vomine = Model_player.voMine;
		if (vomine.sceneChar) GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
	}
	protected boss: SceneCharRole;
	protected curHp: number;
	protected createEmenyByInfo(info) {
		var infoToStr = info + "";
		if (infoToStr.indexOf(",") >= 0) {
			var infoArr = ConfigHelp.SplitStr(info);
			var id = Number(infoArr[0][1]);
		} else {
			id = info;
		}

		var enemy = super.createEmeny(id);
		this.setBossPos(enemy);
		this.curHp = enemy.curhp = enemy.maxhp = 9999999999;
		this.scene.addUnit(enemy);
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
	private _endTime = 5000
	/**0未出结果 1失败 2胜利 */
	public checkResult(): number {
		var playerhp = this.scene.getForceHp(2);
		var now = egret.getTimer()
		if (playerhp <= 0) {
			return 2;
		}

		if (this.boss.curhp > 1 && now - this.waitTime >= this._endTime) {
			this.boss.curhp = 0;
		}
		return 0;
	}
	protected getBattleRes() {
		return 0;
	}
	protected getDropArr() {
		return Model_bwXianShi.dropArr;
	}
	protected getCurBoss() {
		var id = 1;//离水说只有一个
		return Config.bwxs_740[id];
	}
	protected applayAwards() {
		GGlobal.modelbwXianShi.CG_GETAWARDS_4001();
	}
	protected removeDrop() {
		GGlobal.control.remove(Enum_MsgType.BAOWU_XIANSHI_DROP, this.startDrop, this);
	}
	protected addDrop() {
		GGlobal.control.listen(Enum_MsgType.BAOWU_XIANSHI_DROP, this.startDrop, this);
	}
}
