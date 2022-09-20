class ClientBattleSceneCtrl extends SceneCtrl {

	public constructor() {
		super();
	}

	private static _instance: ClientBattleSceneCtrl;
	public static get instance(): ClientBattleSceneCtrl {
		if (!ClientBattleSceneCtrl._instance) ClientBattleSceneCtrl._instance = new ClientBattleSceneCtrl();
		return ClientBattleSceneCtrl._instance;
	}

	/**挑战步骤*/
	public steps = [
		{ "t": "start" },//开始
		{ "t": "createEnemys" },//创建敌人
		{ "t": "monsterLessThan" },//挑战结果
		{ "t": "sendMsg" },//发送掉落物品
		{ "t": "pickItems" },//拾捡物品
	];
	private battleVo: Vo_battle;
	private leftPlayerArr: SceneCharRole[];
	private rightPlayerArr: SceneCharRole[];
	public pointer: number = 0;
	protected waitTime: number;
	public enterStep(step) {
		let self = this;
		switch (step.t) {
			case "start":
				self.leftPlayerArr = [];
				self.rightPlayerArr = [];
				self.createMyChars();
				self.setMapHead(self.battleVo.mapID);
				break;
			case "createEnemys":
				self.createEnemys()
				self.waitTime = egret.getTimer();
				break;
			case "sendMsg":
				var ret = self.checkResult();
				Model_battle.battleVo = null;
				if (ret == 2) {
					self.applayAwards();
				} else {//挑战失败退出副本
					self.showFail();
				}
				break;
			case "pickItems":
				break;
		}
	}

	/**胜利申请奖励 */
	private applayAwards() {
		let self = this;
		switch (self.battleVo.sysID) {
			case UIConst.CROSS_SHILIAN:
				GGlobal.modelkfsl.CG_CrossTrial_fightEnd_10475(1);
				break;
			case UIConst.ZSSF:
				GGlobal.modelzssf.CG_ZSSF_BATTLE_RESULT(1);
				break;
			case UIConst.YANHUI:
				GGlobal.modelYanHui.CG_Yanhui_battlerest_11471(1, self.battleVo.bossId);
				break;
			case UIConst.GCBZ:
				if (self.battleVo.bossId > 0) {
					if (GGlobal.modelgcbz.battleResult == 0) {
						GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.failHandler, self);
						ViewCommonFail.show();
					} else {
						GGlobal.modelgcbz.CG_AttackCity_battleNPCResult_12063();
					}
				} else {
					GGlobal.modelgcbz.CG_AttackCity_battleResult_12059(1);
				}
				break;
		}
	}

	public showFail() {
		let self = this;
		switch (self.battleVo.sysID) {
			case UIConst.CROSS_SHILIAN:
				GGlobal.modelkfsl.CG_CrossTrial_fightEnd_10475(0);
				break;
			case UIConst.ZSSF:
				GGlobal.modelzssf.CG_ZSSF_BATTLE_RESULT(0);
				break;
			case UIConst.YANHUI:
				GGlobal.modelYanHui.CG_Yanhui_battlerest_11471(0, self.battleVo.bossId);
				break;
			case UIConst.GCBZ:
				if (self.battleVo.bossId > 0) {
					GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.failHandler, self);
					ViewCommonFail.show();
				} else {
					GGlobal.modelgcbz.CG_AttackCity_battleResult_12059(0);
				}
				break;
		}
	}

	private failHandler() {
		let self = this;
		GGlobal.modelScene.returnMainScene()
		GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.failHandler, self);;
	}

	public checkStepFinish(step) {
		let self = this;
		var ret = true;
		switch (step.t) {
			case "createEnemys":
				break;
			case "monsterLessThan":
				if (self.boss) {
					GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, self.boss.curhp);
				}
				ret = self.checkResult() > 0;
				break;
			case "pickItems":
				break;
			case "sendMsg":
				ret = false;
				break;
		}
		return ret;
	}

	public exitStep(step) {
		if (step.t == "monsterLessThan") {
		}
	}

	public update(ctx) {
		let self = this;
		var curStep = self.steps[self.pointer];
		if (self.checkStepFinish(curStep)) {
			self.exitStep(curStep);
			self.nextPoint();
		}
		self.aiUpdate(ctx);
		self.scene.watchMainRole();
	}

	public nextPoint() {
		let self = this;
		self.pointer++;
		var curStep = self.steps[self.pointer];
		self.enterStep(curStep);
	}

	onEnter(scene: MapScene) {
		let self = this;
		self.battleVo = Model_battle.battleVo;
		if (!self.battleVo) return;
		if (self.battleVo.backID > 0) GGlobal.layerMgr.setPanelVisible(self.battleVo.backID, false);
		GGlobal.layerMgr.closeAllPanel(true);
		self.scene = scene;
		MainUIController.showBottomExite(true, Handler.create(self, self.onClickEixt), self);
		self.pointer = -1;
		self.nextPoint();
	}

	public createMyChars() {
		let self = this;
		let arr = self.battleVo.leftArr;
		for (let i = 0; i < arr.length; i++) {
			var vomine: Vo_Player = arr[i];
			vomine.updateChars();
			let role: SceneCharRole = vomine.sceneChar;
			if (!self.scene.getUnit(role.id)) {
				self.setRolePos(role);
				role.invalid |= 1023;
				role.force = 1;
				role.setDir(1);
				self.scene.addUnit(role);
				self.addHpAndName(role, true);
				if (vomine.id != Model_player.voMine.id) {
					role.autoSkill = true;
				}
				self.leftPlayerArr.push(role);
			}
			if (vomine.id == Model_player.voMine.id) {//跨服试炼加buff
				for (let key in self.battleVo.buffData) {
					if (Enum_Attr.roleAttPer[key]) {
						role[Enum_Attr.roleAttPer[key]] += role[Enum_Attr.roleAttPer[key]] * self.battleVo.buffData[key];
					} else {
						role[Enum_Attr.roleAttributes[key]] += self.battleVo.buffData[key];
					}
				}
			}
		}
	}

	onExit(scene: MapScene) {
		let self = this;
		self.scene.ctx = {};
		self.scene.removeAll();
		MainUIController.showBottomExite(false);
		View_BossSceneHead.hide();
		self.trytoOpenPnl();
		self.leftPlayerArr = [];
		self.rightPlayerArr = [];
		self.battleVo = null;
		self.boss = null;
	}

	protected onClickEixt() {
		ViewAlert.show("退出将视为挑战失败，\n是否确认？", Handler.create(this, this.okHandler));
	}

	protected okHandler(): void {
		let self = this;
		switch (self.battleVo.sysID) {
			case UIConst.CROSS_SHILIAN:
				GGlobal.modelkfsl.CG_CrossTrial_fightEnd_10475(0);
				break;
			case UIConst.ZSSF:
				GGlobal.modelzssf.CG_ZSSF_BATTLE_RESULT(2);
				break;
			case UIConst.YANHUI:
				YanHuiManager.getInstance().exiteBattle();
				break;
			case UIConst.GCBZ:
				if (self.battleVo.bossId > 0) {
					self.failHandler();
				} else {
					GGlobal.modelgcbz.CG_AttackCity_battleResult_12059(2);
				}
				break;
		}
	}

	public aiUpdate(ctx) {
		let s = this;
		for (let i = 0; i < s.leftPlayerArr.length; i++) {
			if (s.leftPlayerArr[i]) GuanQiaAI.thinkAttack(s.leftPlayerArr[i], ctx);
		}
		for (let i = 0; i < s.rightPlayerArr.length; i++) {
			if (s.rightPlayerArr[i]) GuanQiaAI.thinkAttack(s.rightPlayerArr[i], ctx);
		}
		if (s.boss) {
			GuanQiaAI.thinkAttack(s.boss, ctx);
		}
	}

	private boss: SceneCharRole;
	public createEnemys() {
		let self = this;
		if (self.battleVo.bossId > 0) {
			let enemy = super.createEmeny(self.battleVo.bossId);
			self.setBossPos(enemy);
			self.scene.addUnit(enemy);
			self.boss = enemy;
			View_BossSceneHead.show(self.battleVo.bossId, false, enemy.maxhp);
		} else {
			let arr = self.battleVo.rightArr;
			if (arr && arr.length > 0) {
				for (let i = 0; i < arr.length; i++) {
					var vomine: Vo_Player = arr[i];
					vomine.updateChars();
					let role: SceneCharRole = vomine.sceneChar;
					if (!self.scene.getUnit(role.id)) {
						self.setBossPos(role)
						role.invalid |= 1023;
						role.force = 2;
						role.setDir(-1);
						role.autoSkill = true;
						self.scene.addUnit(role);
						self.addHpAndName(role, false);
						self.rightPlayerArr.push(role)
					}
				}
			}
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
			if (playerhp <= 0) {
				return 2;
			} else {
				return 1;
			}
		}
		return 0;
	}

	protected getBattleRes() {
		return this.battleVo.battleRes;
	}

	protected trytoOpenPnl() {
		let self = this;
		if (self.battleVo.backID > 0) GGlobal.layerMgr.setPanelVisible(self.battleVo.backID, true);
	}
}