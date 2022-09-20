class CrossWarsCtrl extends SceneCtrl {
	public constructor() {
		super();
	}

	private static _instance: CrossWarsCtrl;
	public static get instance(): CrossWarsCtrl {
		if (!CrossWarsCtrl._instance) CrossWarsCtrl._instance = new CrossWarsCtrl();
		return CrossWarsCtrl._instance;
	}

	public leftPlayer: SceneCharRole;
	public rightPlayer: SceneCharRole;
	public onEnter(scene: MapScene): void {
		this.st = -1;
		this.scene = scene;
		this.scene.setLeftAndRight();
		scene.initWithID(340007);
		scene.random.seed = 0;
		let t = Model_CrossWars.battleTurn
		GGlobal.layerMgr.close2(UIConst.CROSS_WARS);
		Model_CrossWars.battleTurn = t;
		GGlobal.layerMgr.open(UIConst.CROSS_WARS_LOOK);
		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
		GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.overHandler, this);
	}

	public onExit(scene: MapScene): void {
		this.scene.setLeftAndRight();
		Model_CrossWars.battleOpp1 = null
		Model_CrossWars.battleOpp2 = null
		this.leftPlayer = null;
		this.rightPlayer = null;
		scene.removeAll();
		MainUIController.showBottomExite(false);
		GGlobal.layerMgr.close2(UIConst.CROSS_WARS_LOOK);
		GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.overHandler, this);
	}

	protected onClickEixt(): void {
		ViewAlert.show("退出观看，是否确认？", Handler.create(this, this.overHandler));
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
				if (Model_CrossWars.battleRes > 0) {
					this.setState(Model_CrossWars.battleRes);
				} else {
					this.setState(this.checkResult());
				}
			}
			if (now - this.oldTime >= this.pvpTime) {
				this.killRole(this.leftPlayer, this.rightPlayer);
			}
			this.aiUpdate(ctx);
		} else {

		}
		this.scene.watchMainRole();
	}

	public setState(st: number): void {
		if (st == 0) {
			// this.create1(Model_CrossWars.battleOpp1);
			// this.create2(Model_CrossWars.battleOpp2);

			let vo1:Vo_Player = GGlobal.modelPlayer.playerDetailDic[Model_CrossWars.battleOpp1.id];
			let vo2:Vo_Player = GGlobal.modelPlayer.playerDetailDic[Model_CrossWars.battleOpp2.id];
			this.create1(vo1);
			this.create2(vo2);
		} else if (st == 1) {//失败
			setTimeout(function () {
				ViewCommonWin2.show(Model_CrossWars.battleRes2, 5000);
			}, 1000);
		} else if (st == 2) {//胜利
			setTimeout(function () {
				ViewCommonWin2.show(Model_CrossWars.battleRes1, 5000);
			}, 1000);
		}
		this.oldTime = egret.getTimer();
		this.st = st;
	}

	private overHandler(): void {
		GGlobal.modelScene.returnMainScene();
		if (GGlobal.layerMgr.lastPanelId <= 0) GGlobal.layerMgr.open(UIConst.CROSS_WARS)
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

	public create1(vo: Vo_Player) {
		vo.updateChars();
		var role: SceneCharRole = vo.sceneChar;
		if (!this.scene.getUnit(role.id)) {
			this.setRolePos(role);
			role.invalid |= 1023;
			role.force = 1;
			role.setDir(1);
			this.scene.addUnit(role);
			this.addHpAndName(role, false);
		}
		this.leftPlayer = role;
		role.scaleAttribute(Model_CrossWars.battleRes == 2);
	}

	protected create2(vo: Vo_Player): void {
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
		this.rightPlayer = role;
		role.scaleAttribute(Model_CrossWars.battleRes == 1);
	}

	public aiUpdate(ctx) {
		GuanQiaAI.thinkAttack(this.leftPlayer, ctx);
		GuanQiaAI.thinkAttack(this.rightPlayer, ctx);
	}
}