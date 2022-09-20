class ActComLeiTaiSceneCtrl extends SceneCtrl {
	public constructor() {
		super();
	}

	private static _instance: ActComLeiTaiSceneCtrl;
	public static get instance(): ActComLeiTaiSceneCtrl {
		if (!ActComLeiTaiSceneCtrl._instance) ActComLeiTaiSceneCtrl._instance = new ActComLeiTaiSceneCtrl();
		return ActComLeiTaiSceneCtrl._instance;
	}

	private leftPlayer: SceneCharRole;
	private rightPlayer: SceneCharRole;
	private enemy: SceneCharRole;
	public onEnter(scene: MapScene): void {
		this.st = -1;
		this.scene = scene;
		scene.setLeftAndRight();
		scene.initWithID(404001);
		this.createMyChars();
		GGlobal.layerMgr.close2(UIConst.ACTCOM_LEITAI);
		GGlobal.layerMgr.close2(UIConst.ACTCOM_LEITAI_REPORT);
		GGlobal.layerMgr.close2(UIConst.ACTCOM_LEITAI_REWARD);
		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
		GGlobal.model_ActLeiTai.listen(Model_ActLeiTai.FIGHTEND, this.onDrop, this);
	}

	public onExit(scene: MapScene): void {
		this.scene.setLeftAndRight();
		this.leftPlayer = null;
		this.rightPlayer = null;
		scene.removeAll();
		MainUIController.showBottomExite(false);
	}

	protected onClickEixt(): void {
		ViewAlert.show("退出将视为挑战失败，是否确认？", Handler.create(this, this.okHandler));
	}

	private okHandler(): void {
		this.overHandler()
		//发送失败协议
		GGlobal.model_ActLeiTai.CG_FIGHTEND_11603(0);
	}

	protected oldTime = 0;
	protected st: number = -1;
	public update(ctx): void {
		var now = egret.getTimer();
		if (this.st == -1) {
			this.setState(0);
		} else if (this.st == 0) {
			var myhp = this.scene.getForceHp(1);
			var playerhp = this.scene.getForceHp(2);
			if (playerhp <= 0 || myhp <= 0) {
				this.setState(this.checkResult());
			}
			if (now - this.oldTime >= this.pvpTime) {
				if (this.rightPlayer) {
					this.killRole(this.leftPlayer, this.rightPlayer);
				} else {
					this.killRole(this.leftPlayer, this.enemy);
				}
			}
			this.aiUpdate(ctx);
		} else {

		}
		this.scene.watchMainRole();
	}

	public setState(st: number): void {
		if (st == 0) {
			let m = GGlobal.model_ActLeiTai
			let bat = m.batLeiTai
			let npcId = bat.plyArr[0].npcId
			if (npcId > 0) {
				this.enemy = this.createEnemys(npcId);
			} else {
				let vo: Vo_Player = GGlobal.modelPlayer.playerDetailDic[m.batPlyId];
				this.createOther(vo);
				this.addOther(vo.sceneChar);
			}
		} else if (st == 1) {//失败
			GGlobal.model_ActLeiTai.CG_FIGHTEND_11603(0);
		} else if (st == 2) {//胜利
			GGlobal.model_ActLeiTai.CG_FIGHTEND_11603(1);
		}
		this.oldTime = egret.getTimer();
		this.st = st;
	}

	private onDrop() {
		let m = GGlobal.model_ActLeiTai
		let res = m.batRes
		let self = this;
		if (res == 0 || res == 2) {//失败
			setTimeout(function () {
				ViewCommonFail.show(5000, self, "离开", self.overHandler, null, m.batDrop);
			}, 1000);
			if (res == 2) {
				this.st = 3;
				ViewCommonWarn.text("擂台活动已结束")
			}
		} else {
			let self = this;
			setTimeout(function () {
				ViewCommonWin.show(m.batDrop, 5000, self, "退出", self.overHandler);
			}, 1000);
		}
	}

	public createEnemys(id) {
		var enemy = this.createEmeny(id);
		var ai = new CommonAICtrl();
		ai.role = enemy;
		enemy.addPlug(ai);
		enemy.force = 2;
		this.setBossPos(enemy);
		this.addHpAndName(enemy, false);
		this.scene.addUnit(enemy);
		this.scaleAttribute(enemy, Model_CrossKing.battleRes, false);
		return enemy;
	}

	private overHandler(): void {
		GGlobal.modelScene.returnMainScene();
		if (GGlobal.layerMgr.lastPanelId <= 0) GGlobal.layerMgr.open(UIConst.ACTCOM, UIConst.ACTCOM_LEITAI);
	}

	/**  1失败 2胜利*/
	public checkResult(): number {
		var hasLeft = this.scene.getForceHp(1);
		var hasRight = this.scene.getForceHp(2);
		if (hasLeft > hasRight) {
			return 2;
		} else {
			return 1;
		}
	}

	public createMyChars() {
		var vomine = Model_player.voMine;
		vomine.updateChars();
		this.leftPlayer = vomine.sceneChar;


		var i = 0;
		var lifeHero = this.scene.getLifeHero();
		var role: SceneCharRole = vomine.sceneChar;
		if (!lifeHero) {
			this.setRolePos(role);
			role.invalid |= 1023;
			role.force = 1;
			role.setDir(1);
			this.scene.addUnit(role);
			this.addHpAndName(role, true);
		}
	}

	protected addOther(vo: SceneCharRole): void {
		this.rightPlayer = vo;
	}

	protected createOther(vo: Vo_Player): void {
		vo.updateChars();
		var role: SceneCharRole = vo.sceneChar;
		if (!this.scene.getUnit(role.id)) {
			this.setBossPos(role);
			role.invalid |= 1023;
			role.force = 2;
			role.setDir(-1);
			this.scene.addUnit(role);
			this.addHpAndName(role, false);
		}
		this.scaleAttribute(role, Model_CrossKing.battleRes, false);
	}

	public aiUpdate(ctx) {
		let self = this;
		GuanQiaAI.thinkAttack(this.leftPlayer, ctx);
		if (this.rightPlayer) {
			GuanQiaAI.thinkAttack(this.rightPlayer, ctx);
		}
	}

	public addHpAndName(role: SceneCharRole, isSelf: boolean) {
		var namebar = RoleHpAndNamePlug.create(isSelf);
		namebar.role = role;
		role.addPlug(namebar);
	}
}