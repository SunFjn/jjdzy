class CrossKingCtrl extends SceneCtrl {
	public constructor() {
		super();
	}

	private static _instance: CrossKingCtrl;
	public static get instance(): CrossKingCtrl {
		if (!CrossKingCtrl._instance) CrossKingCtrl._instance = new CrossKingCtrl();
		return CrossKingCtrl._instance;
	}

	private leftPlayer: SceneCharRole;
	private rightPlayer: SceneCharRole;
	private enemy: SceneCharRole;
	public onEnter(scene: MapScene): void {
		this.st = -1;
		this.scene = scene;
		scene.setLeftAndRight();
		scene.initWithID(340006);
		this.createMyChars();
		GGlobal.layerMgr.close2(UIConst.CROSS_KING);
		GGlobal.layerMgr.close2(UIConst.CROSS_KING_PROMOTE);
		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
	}

	public onExit(scene: MapScene): void {
		this.scene.setLeftAndRight();
		Model_CrossKing.battleOpp = null
		this.leftPlayer = null;
		this.rightPlayer = null;
		scene.removeAll();
		MainUIController.showBottomExite(false);
	}

	protected onClickEixt(): void {
		ViewAlert.show("退出将视为挑战失败，是否确认？\n(挑战次数不返还)", Handler.create(this, this.okHandler));
	}

	private okHandler(): void {
		this.overHandler()
		//发送失败协议
		GGlobal.modelCrossKing.CG_GET_BATTLE_REWARD(0);
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
				if (Model_CrossKing.battleRes == 1) {
					this.setState(Model_CrossKing.battleRes);
				} else {
					this.setState(this.checkResult());
				}
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
			if (Model_CrossKing.battleIsNpc) {
				this.enemy = this.createEnemys(Model_CrossKing.battleOpp.id);
			} else {
				let vo:Vo_Player = GGlobal.modelPlayer.playerDetailDic[Model_CrossKing.battleOpp.id];
				this.createOther(vo);
				this.addOther(vo.sceneChar);
				// this.createOther(vo);
				// this.addOther(Model_CrossKing.battleOpp.sceneChar);
			}
		} else if (st == 1) {//失败
			var failDrop = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2202)))
			GGlobal.modelCrossKing.CG_GET_BATTLE_REWARD(0);
			let self = this;
			setTimeout(function () {
				ViewCommonFail.show(5000, self, "离开", self.overHandler, null, failDrop);
			}, 1000);
		} else if (st == 2) {//胜利
			var winDrop = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2201)))
			GGlobal.modelCrossKing.CG_GET_BATTLE_REWARD(1);
			let self = this;
			setTimeout(function () {
				ViewCommonWin.show(winDrop, 5000, self, "退出", self.winExit);
			}, 1000);

		}
		this.oldTime = egret.getTimer();
		this.st = st;
	}

	private winExit(): void {
		if (Model_CrossKing.battleType == 2) {
			GGlobal.layerMgr.open(UIConst.CROSS_KING_ProSuc);
		}
		this.overHandler()
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
		if (GGlobal.layerMgr.lastPanelId <= 0) GGlobal.layerMgr.open(UIConst.CROSS_KING);
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
		this.scaleAttribute(role, Model_CrossKing.battleRes, true);
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
			role.autoSkill = true;
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