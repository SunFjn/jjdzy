/**粮草争夺 攻击怪物*/class LiangCaoPveCtr extends SceneCtrl {
	public constructor() {
		super();
	}

	bossid = 0;
	serverid = 0;
	private _hero: SceneCharRole;
	private _monster: SceneCharRole;
	public result = 0
	private _endTime;
	private timer: BossZCPveTimer;
	public onEnter(scene: MapScene) {
		let s = this;
		s.scene = scene;
		this._endTime = Model_GlobalMsg.getServerTime() + 60000;
		s.scene.initWithID(400001, true);
		s.createMyChars();
		let bossid = s.bossid;
		s.createEmenyByInfo(bossid);

		s.scene.setLeftAndRight();
		BossZCManager.enterBattle();
		GGlobal.control.listen(UIConst.LIANGCAO_BATTLEEND, s.showReslt, s);
		MainUIController.showBottomExite(true, Handler.create(this, this.directExite));
	}

	public onExit() {
		let s = this;
		s.scene.removeAll();
		View_BossSceneHead.hide();
		s._hero = null;
		s._monster = null;
		s.result = 0;
		GGlobal.control.remove(UIConst.LIANGCAO, s.directExite, s);
		MainUIController.showBottomExite(false);
	}

	directExite = () => {
		//killself
		ViewAlert.show("退出副本将视为挑战失败\n是否退出?", Handler.create(this, function () {
			let self = LiangCaoPveCtr.instance;
			if (self._hero) {
				self._hero.takeMaxHurt();
			}
		}), ViewAlert.OKANDCANCEL);
	}

	//此处后端会提前将角色拉如场景 进场景会调用closeall 所以做延时处理。
	arg;
	_flag;
	private showReslt(arg) {
		this.arg = arg;
		egret.callLater(this.delayShowResult, this);
	}

	private delayShowResult() {
		let self = LiangCaoPveCtr.instance;
		let battleResult = self.arg.battleResult;
		let awards = self.arg.awards;
		if (battleResult == 1) {
			ViewCommonWin.show(awards, 5000, self, "确定", null, null, true);
		} else {
			ViewBattleFault.show(5000, self, "退出", function () { }, function () { }, function () { });
		}
		GGlobal.control.remove(UIConst.LIANGCAO_BATTLEEND, self.showReslt, self);
	}

	public update(ctx) {
		var self = this;
		var leftNum = GGlobal.mapscene.getForceCount(1);
		var rightNum = GGlobal.mapscene.getForceCount(2);
		if (leftNum == 0 || rightNum == 0) {
			if (self.result == 0) {
				self.result = 1;
				if (leftNum == 1) {
					GGlobal.modelLiangCao.CG_BattleGoods_getBatMonReward_10107(self.serverid, 1);
				} else {
					GGlobal.modelLiangCao.CG_BattleGoods_getBatMonReward_10107(self.serverid, 0);
				}
			}
			return;
		}

		let now = Model_GlobalMsg.getServerTime();//计时失败
		if (now > self._endTime) {
			GGlobal.modelLiangCao.CG_BattleGoods_getBatMonReward_10107(self.serverid, 0);
			return;
		}

		self.scene.watchMainRole();
		var guanQiaAI = GuanQiaAI;
		var leftrole: SceneCharRole = self._hero;
		guanQiaAI.thinkAttack(leftrole, ctx);
		var rightrole: SceneCharRole = self._monster;
		guanQiaAI.thinkAttack(rightrole, ctx);

		if (rightNum) {
			GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, self._monster.curhp);
		} else {
			GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, 0);
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

		let isBoss = Config.ricenpc_290[id].boss;
		if (isBoss) View_BossSceneHead.show(id, false, 0);
	}


	private static _inst: LiangCaoPveCtr;
	public static get instance() {
		return this._inst || (this._inst = new LiangCaoPveCtr());
	}
}