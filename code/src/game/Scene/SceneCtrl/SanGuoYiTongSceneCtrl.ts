class SanGuoYiTongSceneCtrl extends SceneCtrl {
	public constructor() {
		super();
	}

	private static _instance: SanGuoYiTongSceneCtrl;
	public static get instance(): SanGuoYiTongSceneCtrl {
		if (!SanGuoYiTongSceneCtrl._instance) SanGuoYiTongSceneCtrl._instance = new SanGuoYiTongSceneCtrl();
		return SanGuoYiTongSceneCtrl._instance;
	}

	public leftPlayer: Vo_Player;
	public onEnter(scene: MapScene): void {
		this.leftPlayer = null;
		this.st = -1;
		this.scene = scene;
		this.scene.setLeftAndRight();
		scene.initWithID(382001);
		this.createMyChars();
		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
	}

	public onExit(scene: MapScene = null): void {
		this.scene.setLeftAndRight();
		GGlobal.modelPlayer.removePlayer(Model_SGZS.battleId);
		Model_SGZS.battleId = 0;
		scene.removeAll();
		MainUIController.showBottomExite(false);
		this.leftPlayer = null;
	}

	protected onClickEixt(): void {
		ViewAlert.show("退出将视为挑战失败，是否确认？\n(挑战次数不返还)", Handler.create(this, this.okHandler));
	}

	private okHandler(): void {
		//发送失败协议
		GGlobal.modelSanGuoYT.CG_YITONG_BATTLE_RESULT_5813(GGlobal.modelSanGuoYT.serverMonsterID, 2);
	}

	protected oldTime = 0;
	protected st: number = -1;
	public update(ctx): void {
		var now = egret.getTimer();
		if (this.st == -1) {
			this.setState(0);
		} else if (this.st == 0) {
			var myhp = this.scene.getForceCount(1);
			var playerhp = this.scene.getForceCount(2);
			if (playerhp <= 0) {
				this.setState(1);
			} else if (myhp <= 0) {
				this.setState(2);
			} else {//
				if (now - this.oldTime >= this.pvpTime) {
					this.killRole(this.leftPlayer.sceneChar, this.enemy);
				}
			}
			this.aiUpdate(ctx);
		} else {

		}
		this.scene.watchMainRole();
	}

	public setState(st: number): void {
		let model = GGlobal.modelSanGuoYT;
		if (st == 0) {
			this.createEnemys();
		} else if (st == 1) {
			model.CG_YITONG_BATTLE_RESULT_5813(model.serverMonsterID, 1);
		} else if (st == 2) {
			model.CG_YITONG_BATTLE_RESULT_5813(model.serverMonsterID, 0);
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
			role.x = 200;
			role.y = 700;
			role.invalid |= 1023;
			role.force = 1;
			role.setDir(1);
			this.scene.addUnit(role);
			this.addHpAndName(role, true);
		}
	}

	private enemy: SceneCharRole;
	public createEnemys() {
		let self = this;
		self.enemy = this.createEmeny(GGlobal.modelSanGuoYT.monsterID);
		let ai = new CommonAICtrl();
		ai.role = this.enemy;
		self.enemy.addPlug(ai);
		self.enemy.force = 2;
		self.setBossPos(this.enemy);
		self.addHpAndName(this.enemy, false);
		self.scene.addUnit(this.enemy);
	}

	public aiUpdate(ctx) {
		let self = this;
		if (self.leftPlayer && self.leftPlayer.sceneChar) {
			GuanQiaAI.thinkAttack(this.leftPlayer.sceneChar, ctx);
		}
	}

	public addHpAndName(role: SceneCharRole, isSelf: boolean) {
		var namebar = RoleHpAndNamePlug.create(isSelf);
		namebar.role = role;
		role.addPlug(namebar);
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
}