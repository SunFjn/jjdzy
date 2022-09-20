class ServerDataBattleCtrl extends SceneCtrl {
	private static _instance: ServerDataBattleCtrl;
	public static get instance(): ServerDataBattleCtrl {
		if (!ServerDataBattleCtrl._instance) ServerDataBattleCtrl._instance = new ServerDataBattleCtrl();
		return ServerDataBattleCtrl._instance;
	}

	public leftPlayerArr: Vo_Player[];
	public rightPlayerArr: Vo_Player[];
	public onEnter(scene: MapScene): void {
		let self = this;
		self.leftPlayerArr = [];
		self.rightPlayerArr = [];
		self.st = -1;
		self.scene = scene;
		GGlobal.control.notify(Enum_MsgType.ENTER_SERVERBATTLE);
		scene.setLeftAndRight();
		self.createMyChars();
		MainUIController.showBottomExite(true, Handler.create(self, self.onClickEixt), self);
		GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.failHandler, self);
	}

	private failHandler(): void {
		if (Model_battle.systemID == UIConst.LIANGCAO) {
			return;
		}
		GGlobal.modelScene.returnMainScene();
	}

	public onExit(scene: MapScene): void {
		let self = this;
		self.scene.setLeftAndRight();
		Model_battle.battleId = 0;
		scene.removeAll();
		Model_battle.buffDic = {};
		self.leftPlayerArr = [];
		self.rightPlayerArr = [];
		GGlobal.control.notify(Enum_MsgType.EXIT_SERVERBATTLE);
		MainUIController.showBottomExite(false);
		GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.failHandler, self);
	}

	protected onClickEixt(): void {
		let self = this;
		let tips = "退出将视为挑战失败，是否确认？\n(挑战次数不返还)";
		if (GGlobal.modelFengHuoLY.inActivity || GGlobal.modelWenDingTX.ACtiving) {
			tips = "退出将视为挑战失败，是否确认？";
		}
		ViewAlert.show(tips, Handler.create(self, self.okHandler));
	}

	private okHandler(): void {
		if (Model_battle.systemID != UIConst.LIANGCAO) {
			GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		}
		//发送失败协议
		GGlobal.modelbattle.CG_EXIT_BATTLE();
	}

	protected oldTime = 0;
	protected st: number = -1;
	public update(ctx): void {
		let self = this;
		var now = egret.getTimer();
		if (self.st == -1) {
			self.setState(0);
		} else if (self.st == 0) {
			var myhp = self.scene.getForceCount(1);
			var playerhp = self.scene.getForceCount(2);
			if (playerhp <= 0) {
				self.setState(1);
			} else if (myhp <= 0) {
				self.setState(2);
			} else {//没结果 战斗超过30秒判定输

			}
			self.aiUpdate(ctx);
		} else {

		}
		self.scene.watchMainRole();
	}

	public setState(st: number): void {
		let self = this;
		if (st == 0) {
			self.createOther();
			self.updateBuff(Model_battle.buffDic);
		} else if (st == 1) {
		} else if (st == 2) {

		}
		self.oldTime = egret.getTimer();
		self.st = st;
	}

	public updateBuff(roleData: { [id: number]: { buffID: number, state: number }[] }) {
		let self = this;
		for (let key in roleData) {
			let role: SceneCharRole = GGlobal.mapscene.getUnit(key);
			if (role) {
				for (let i = 0; i < roleData[key].length; i++) {
					if (roleData[key][i].state == 1) {
						role.addServerBuff(roleData[key][i].buffID);
					} else {
						role.clearServerBuff(roleData[key][i].buffID);
					}
				}
			}
		}
	}

	public createMyChars() {
		let self = this;
		let arr = Model_battle.leftPlayerArr
		for (let i = 0; i < arr.length; i++) {
			var vomine: Vo_Player = arr[i];
			vomine.updateChars();
			let role: SceneCharRole = vomine.sceneChar;
			if (!self.scene.getUnit(role.id)) {
				role.curhp = vomine.currentHp;
				self.setRolePos(role);
				role.invalid |= 1023;
				role.force = 1;
				role.setDir(1);
				role.clearHurt = 1;
				self.scene.addUnit(role);
				self.addHpAndName(role, true);
			}
		}
		self.leftPlayerArr = arr;
	}

	protected createOther(): void {
		let self = this;
		let arr = Model_battle.rightPlayerArr;
		for (let i = 0; i < arr.length; i++) {
			var vomine: Vo_Player = arr[i];
			vomine.updateChars();
			let role: SceneCharRole = vomine.sceneChar;
			if (!self.scene.getUnit(role.id)) {
				role.curhp = vomine.currentHp;
				self.setBossPos(role)
				role.invalid |= 1023;
				role.force = 2;
				role.setDir(-1);
				role.clearHurt = 1;
				self.scene.addUnit(role);
				self.addHpAndName(role, false);
			}
		}
		self.rightPlayerArr = arr;
	}

	public aiUpdate(ctx) {
		let s = this;
		for (let i = 0; i < s.leftPlayerArr.length; i++) {
			if (s.leftPlayerArr[i]) GuanQiaAI.thinkAttack(s.leftPlayerArr[i].sceneChar, ctx);
		}
		for (let i = 0; i < s.rightPlayerArr.length; i++) {
			if (s.rightPlayerArr[i]) GuanQiaAI.thinkAttack(s.rightPlayerArr[i].sceneChar, ctx);
		}
	}

	public setRolePos(role: SceneCharRole) {
		let self = this;
		var x = self.scene.map.focusx;
		if (!x) {
			x = 418;
		}
		role.x = 100;
		role.y = 720;
	}

	public setBossPos(role: SceneCharRole) {
		let self = this;
		let cx = self.scene.map.focusx;
		role.x = cx + 350;
		role.y = 720;
	}
}