class NanZhengBeiZhanCtrl extends SceneCtrl {
	public constructor() {
		super();
	}

	private static _instance: NanZhengBeiZhanCtrl;
	public static get instance(): NanZhengBeiZhanCtrl {
		if (!NanZhengBeiZhanCtrl._instance) NanZhengBeiZhanCtrl._instance = new NanZhengBeiZhanCtrl();
		return NanZhengBeiZhanCtrl._instance;
	}

	public leftPlayer: Vo_Player;
	public rightPlayer: Vo_Player;
	public onEnter(scene: MapScene): void {
		this.scene = scene;
		this.st = -1;
		this.scene.setLeftAndRight();
		scene.initWithID(340003);
		this.createMyChars();
		GGlobal.layerMgr.close2(UIConst.NANZHENG_BEIZHAN);
		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
	}

	public onExit(scene: MapScene): void {
		this.scene.setLeftAndRight();
		if (Model_NZBZ.isRobot != 1) {
			GGlobal.modelPlayer.removePlayer(Model_NZBZ.battleID);
		}
		this.leftPlayer = null;
		this.rightPlayer = null;
		Model_NZBZ.battleID = 0;
		scene.removeAll();
		MainUIController.showBottomExite(false);
		GGlobal.layerMgr.open(UIConst.NANZHENG_BEIZHAN);
	}

	protected onClickEixt(): void {
		ViewAlert.show("退出将视为挑战失败，是否确认？\n(挑战次数不返还)", Handler.create(this, this.okHandler));
	}

	private okHandler(): void {
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		//发送失败协议
		GGlobal.modelnzbz.CG_NZBZ_BATTLE_RESULT(2);
	}

	protected oldTime = 0;
	protected st: number = -1;
	public update(ctx): void {
		var now = egret.getTimer();
		if (this.st == -1) {
			this.setState(0);
			// this.watchMainRole();
		} else if (this.st == 0) {
			var myhp = this.scene.getForceCount(1);
			var playerhp = this.scene.getForceCount(2);
			if (playerhp <= 0) {
				this.setState(1);
			} else if (myhp <= 0) {
				this.setState(2);
			} else {//没结果 战斗超过30秒判定输
				if (now - this.oldTime >= this.pvpTime) {
					if (this.rightPlayer) {
						this.killRole(this.leftPlayer.sceneChar, this.rightPlayer.sceneChar);
					} else {
						this.killRole(this.leftPlayer.sceneChar, this.enemy);
					}
				}
			}
			this.aiUpdate(ctx);
		} else {

		}
		this.scene.watchMainRole();
	}

	public setState(st: number): void {
		if (st == 0) {
			if (Model_NZBZ.isRobot == 1) {
				this.createEnemys();
			} else {
				var vo = GGlobal.modelPlayer.playerDetailDic[Model_NZBZ.battleID];
				if (!vo) {
					return;
				}
				this.addOther(vo);
				this.createOther(this.rightPlayer);
			}
		} else if (st == 1) {
			console.log("南征北战挑战胜利");
			GGlobal.modelnzbz.CG_NZBZ_BATTLE_RESULT(1);
		} else if (st == 2) {
			console.log("南征北战挑战失败");
			GGlobal.modelnzbz.CG_NZBZ_BATTLE_RESULT(0);
		}
		this.oldTime = egret.getTimer();
		this.st = st;
	}

	public createMyChars() {
		var vomine = Model_player.voMine;
		this.leftPlayer = vomine;
		vomine.updateChars();

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
		this.scaleAttribute(role, Model_NZBZ.battleRet, true);
	}

	public setRolePos(role: SceneCharRole) {
		var x = this.scene.map.focusx;
		if (!x) {
			x = 418;
		}
		role.x = 100;
		role.y = 720;
	}

	public setBossPos(role: SceneCharRole) {
		let cx = this.scene.map.focusx;
		role.x = cx + 350;
		role.y = 720;
	}

	protected addOther(vo: Vo_Player): void {
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
		this.scaleAttribute(role, Model_NZBZ.battleRet, false);
	}

	private enemy: SceneCharRole;
	public createEnemys() {
		this.enemy = this.createEmeny(Model_NZBZ.battleID);
		var ai = new CommonAICtrl();
		ai.role = this.enemy;
		this.enemy.addPlug(ai);
		this.enemy.force = 2;
		this.setBossPos(this.enemy);
		let enemyArr = Model_NZBZ.enemyArr
		for (let i = 0; i < enemyArr.length; i++) {
			if (enemyArr[i].id == Model_NZBZ.battleID) {
				this.enemy.setPlayerName(enemyArr[i].name);
				break;
			}
		}
		this.addHpAndName(this.enemy, false);
		this.scene.addUnit(this.enemy);
		this.scaleAttribute(this.enemy, Model_NZBZ.battleRet, false);
	}

	public aiUpdate(ctx) {
		let self = this;
		if (self.leftPlayer && self.leftPlayer.sceneChar) {
			GuanQiaAI.thinkAttack(self.leftPlayer.sceneChar, ctx);
		}
		if (self.rightPlayer && self.rightPlayer.sceneChar) {
			GuanQiaAI.thinkAttack(this.rightPlayer.sceneChar, ctx);
		}
	}
}