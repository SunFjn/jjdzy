/**问鼎天下 攻击怪物*/class BossZCCtrl extends SceneCtrl {
	public constructor() {
		super();
	}

	private _hero: SceneCharRole;
	private _monster: SceneCharRole;
	public result = 0
	private _endTime;
	private timer: BossZCPveTimer;
	public onEnter(scene: MapScene) {
		let s = this;
		s.scene = scene;
		this._endTime = Model_GlobalMsg.getServerTime() + 60000;
		let layer = GGlobal.modelBossZc.sceneId;
		let cfg = Config.bosszc_010[layer];
		s.scene.initWithID(380020, true);
		s.createMyChars();
		s.createEmenyByInfo(cfg.id);
		s.scene.setLeftAndRight();
		BossZCManager.enterBattle();
		// if (!this.timer) {
		// 	this.timer = BossZCPveTimer.createInstance();
		// }
		// this.timer.show1();
		GGlobal.control.listen(Enum_MsgType.BOSSZC_PVE_RET, s.showReslt, s);
	}

	public onExit() {
		let s = this;
		s.scene.removeAll();
		this._hero = null;
		this._monster = null;
		s.result = 0;
		// if (this.timer) this.timer.show1();
		GGlobal.control.remove(Enum_MsgType.BOSSZC_PVE_RET, s.showReslt, s);
	}

	private showReslt(arg) {
		BossZCManager.exite();
		let result = arg[0];
		if (result == 0) {
			let awards = arg[1] ? arg[1] : [];
			ViewCommonWin.show(awards, 5000, this, "确定", BossZCManager.exite, null, true);
		} else {
			ViewCommonFail.show(5000, this, "退出", BossZCManager.exite, null, null, true);
		}
	}

	public update(ctx) {
		var self = this;
		var leftNum = GGlobal.mapscene.getForceCount(1);
		var rightNum = GGlobal.mapscene.getForceCount(2);
		if (leftNum == 0 || rightNum == 0) {
			if (self.result == 0) {
				self.result = 1;
				if (leftNum == 1) {
					GGlobal.modelBossZc.CGfightRet4461(1);
				} else {
					GGlobal.modelBossZc.CGfightRet4461(0);
					this.showReslt([1]);
				}
			}
			return;
		}

		let now = Model_GlobalMsg.getServerTime();//计时失败
		if (now > this._endTime) {
			this.showReslt([1]);
			GGlobal.modelBossZc.CGfightRet4461(0);
			return;
		}

		this.scene.watchMainRole();
		var guanQiaAI = GuanQiaAI;
		var leftrole: SceneCharRole = self._hero;
		guanQiaAI.thinkAttack(leftrole, ctx);
		var rightrole: SceneCharRole = self._monster;
		guanQiaAI.thinkAttack(rightrole, ctx);
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
		s.setRolePos(role);
		role.invalid |= 1023;
		role.force = 1;
		s.scene.addUnit(role);
		s.scene.watchMainRole(35);
		s.addHpAndName(role, true);
		s._hero = role;
	}

	protected createEmenyByInfo(id) {
		let s = this;
		let mapscene = s.scene;

		let enemy = super.createEmeny(id);
		s.setMonsterPos(enemy);

		let hpplug = RoleHpAndNamePlug.create();
		hpplug.role = enemy;
		enemy.addPlug(hpplug);

		mapscene.addUnit(enemy);
		s._monster = enemy;
	}


	private static _inst: BossZCCtrl;
	public static getInstance() {
		return this._inst || (this._inst = new BossZCCtrl());
	}
}