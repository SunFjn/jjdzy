class SanGuoZhanShenCtrl extends SceneCtrl {
	public constructor() {
		super();
	}

	private static _instance: SanGuoZhanShenCtrl;
	public static get instance(): SanGuoZhanShenCtrl {
		if (!SanGuoZhanShenCtrl._instance) SanGuoZhanShenCtrl._instance = new SanGuoZhanShenCtrl();
		return SanGuoZhanShenCtrl._instance;
	}

	public leftPlayer: Vo_Player;
	public rightPlayer: Vo_Player;
	public onEnter(scene: MapScene): void {
		this.leftPlayer = null;
		this.rightPlayer = null;
		this.st = -1;
		this.scene = scene;
		this.scene.setLeftAndRight();
		scene.initWithID(340001);
		this.createMyChars();
		GGlobal.layerMgr.close2(UIConst.ARENA);
		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
	}

	public onExit(scene: MapScene): void {
		this.scene.setLeftAndRight();
		GGlobal.modelPlayer.removePlayer(Model_SGZS.battleId);
		Model_SGZS.battleId = 0;
		scene.removeAll();
		MainUIController.showBottomExite(false);
		if (GGlobal.layerMgr.lastPanelId <= 0) GGlobal.layerMgr.open(UIConst.ARENA);
		this.leftPlayer = null;
		this.rightPlayer = null;
	}

	protected onClickEixt(): void {
		ViewAlert.show("退出将视为挑战失败，是否确认？\n(挑战次数不返还)", Handler.create(this, this.okHandler));
	}

	private okHandler(): void {
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		//发送失败协议
		GGlobal.modelsgzs.CG_BATTLE_RESULT_SANGUO_ZHANSHEN(2);
	}

	protected oldTime = 0;
	protected st: number = -1;
	public update(ctx): void {
		let self = this;
		var now = egret.getTimer();
		if (self.st == -1) {
			self.setState(0);
		} else if (self.st == 0) {
			var myhp = self.scene.getForceHp(1);
			var playerhp = self.scene.getForceHp(2);
			if (playerhp <= 0) {
				self.setState(1);
			} else if (myhp <= 0) {
				self.setState(2);
			} else {//
				if (now - self.oldTime >= self.pvpTime) {
					if (self.rightPlayer) {
						self.killRole(self.leftPlayer.sceneChar, self.rightPlayer.sceneChar);
					} else {
						self.killRole(self.leftPlayer.sceneChar, self.enemy);
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
			if (Model_SGZS.robotId > 0) {
				this.createEnemys();
			} else {
				var vo = GGlobal.modelPlayer.playerDetailDic[Model_SGZS.battleId];
				if (!vo) {
					return;
				}
				this.addOther(vo);
				this.createOther(this.rightPlayer);
			}
		} else if (st == 1) {
			GGlobal.modelsgzs.CG_BATTLE_RESULT_SANGUO_ZHANSHEN(1);
		} else if (st == 2) {
			GGlobal.modelsgzs.CG_BATTLE_RESULT_SANGUO_ZHANSHEN(0);
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
		this.scaleAttribute(role, Model_SGZS.battleRet, true);
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
			role.autoSkill = true;
			this.scene.addUnit(role);
			this.addHpAndName(role, false);
		}
		this.scaleAttribute(role, Model_SGZS.battleRet, false);
	}

	private enemy: SceneCharRole;
	public createEnemys() {
		let cfg = Config.warbot_222[Model_SGZS.robotId];
		let monster = JSON.parse(cfg.monster);
		this.enemy = this.createEmeny(monster[0][0]);
		let ai = new CommonAICtrl();
		ai.role = this.enemy;
		this.enemy.addPlug(ai);
		this.enemy.force = 2;
		this.setBossPos(this.enemy);
		this.addHpAndName(this.enemy, false);
		this.scene.addUnit(this.enemy);
		this.scaleAttribute(this.enemy, Model_SGZS.battleRet, false);
	}

	public aiUpdate(ctx) {
		let self = this;
		if (self.leftPlayer && self.leftPlayer.sceneChar) {
			GuanQiaAI.thinkAttack(this.leftPlayer.sceneChar, ctx);
		}
		if (self.rightPlayer && self.rightPlayer.sceneChar) {
			GuanQiaAI.thinkAttack(this.rightPlayer.sceneChar, ctx);
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