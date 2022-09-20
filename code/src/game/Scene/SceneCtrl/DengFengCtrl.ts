class DengFengCtrl extends SceneCtrl {
	public constructor() {
		super();
	}

	private static _instance: DengFengCtrl;
	public static get instance(): DengFengCtrl {
		if (!DengFengCtrl._instance) DengFengCtrl._instance = new DengFengCtrl();
		return DengFengCtrl._instance;
	}

	public leftPlayer: Vo_Player;
	public rightPlayer: Vo_Player;
	private enemy: SceneCharRole;
	public onEnter(scene: MapScene): void {
		this.st = -1;
		this.scene = scene;
		this.scene.setLeftAndRight();
		let m = GGlobal.modelDengFengZJ
		if (m.batType == 0) {
			scene.initWithID(406001);
		} else {
			scene.initWithID(406002);
		}
		this.createMyChars();
		GGlobal.layerMgr.close2(UIConst.SYZLB);
		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
	}

	public onExit(scene: MapScene): void {
		this.scene.setLeftAndRight();
		let m = GGlobal.modelDengFengZJ
		GGlobal.modelPlayer.removePlayer(m.batPlyId);
		this.rightPlayer = null;
		this.leftPlayer = null;
		scene.removeAll();
		MainUIController.showBottomExite(false);

		if (GGlobal.layerMgr.lastPanelId <= 0) {
			if (m.batType == 0) {
				GGlobal.layerMgr.open(UIConst.DENG_FENG_SEA);
			} else {
				GGlobal.layerMgr.open(UIConst.DENG_FENG_FINAL);
			}
		}
	}

	protected onClickEixt(): void {
		ViewAlert.show("退出将视为挑战失败，是否确认？\n(挑战次数不返还)", Handler.create(this, this.okHandler));
	}

	private okHandler(): void {
		//发送失败协议
		let m = GGlobal.modelDengFengZJ
		m.CG_BATTLE_RES(2);
		GGlobal.modelScene.returnMainScene()
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
			if (myhp <= 0) {
				self.setState(1);
			} else if (playerhp <= 0) {
				self.setState(2);
			}
			if (now - self.oldTime >= self.pvpTime) {
				if (self.rightPlayer) {
					self.killRole(self.leftPlayer.sceneChar, self.rightPlayer.sceneChar);
				} else {
					self.killRole(self.leftPlayer.sceneChar, self.enemy);
				}
			}
			let cfg = Config.buff_011[100003];
			if (cfg && self.leftPlayer && self.rightPlayer && self.leftPlayer.sceneChar && self.rightPlayer.sceneChar) {
				let times = JSON.parse(cfg.xiaoguo)[0][1] + JSON.parse(cfg.cz)[0][1];
				let times1 = JSON.parse(cfg.cz)[0][1];
				if (self.leftPlayer.sceneChar.isSilent && now - self.oldTime >= self.rightPlayer.star * times1 + times) {
					self.leftPlayer.sceneChar.isSilent = false;
					if (self.leftPlayer.sceneChar.isHero()) {
						ViewMainUIBottomUI1.instance.setSkillCM(false);
					}
				}
				if (self.rightPlayer.sceneChar.isSilent && now - self.oldTime >= self.leftPlayer.star * times1 + times) {
					self.rightPlayer.sceneChar.isSilent = false;
				}
			}
			self.aiUpdate(ctx);
		} else {

		}
		this.scene.watchMainRole();
	}

	public setState(st: number): void {
		let m = GGlobal.modelDengFengZJ
		if (st == 0) {
			let vo = GGlobal.modelPlayer.playerDetailDic[m.batPlyId];
			this.addOther(vo);
			this.createOther(this.rightPlayer);
		} else if (st == 1) {//失败
			m.CG_BATTLE_RES(0);
		} else if (st == 2) {//胜利
			let self = this
			setTimeout(function () {
				m.CG_BATTLE_RES(1);
			}, 1000);
		}
		this.oldTime = egret.getTimer();
		this.st = st;
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

	// public createEnemys(id) {
	// 	var enemy = this.createEmeny(id);
	// 	var ai = new CommonAICtrl();
	// 	ai.role = enemy;
	// 	enemy.addPlug(ai);
	// 	enemy.force = 2;
	// 	this.setBossPos(enemy)
	// 	this.addHpAndName(enemy, false);
	// 	this.scene.addUnit(enemy);
	// 	return enemy;
	// }

	public createMyChars() {
		var vomine = Model_player.voMine;
		this.leftPlayer = vomine;
		vomine.updateChars();
		vomine.star = Model_WuJiang.getWuJiangStarByJob(vomine.job);
		var role: SceneCharRole = vomine.sceneChar;
		if (!this.scene.getUnit(role.id)) {
			this.setRolePos(role);
			role.invalid |= 1023;
			role.force = 1;
			role.setDir(1);
			this.scene.addUnit(role);
			this.addHpAndName(role, true);
		}
	}

	protected addOther(vo: Vo_Player): void {
		this.rightPlayer = vo;
	}

	protected createOther(vo: Vo_Player): void {
		let self = this;
		vo.updateChars();
		var role: SceneCharRole = vo.sceneChar;
		if (!self.scene.getUnit(role.id)) {
			if (!self.rightPlayer.star) self.rightPlayer.star = 1;
			self.setBossPos(role);
			role.rage = Config.changshu_101[3].num / 100;
			role.invalid |= 1023;
			role.force = 2;
			role.setDir(-1);
			role.autoSkill = true;
			self.scene.addUnit(role);
			self.addHpAndName(role, false);
		}
		if (role.job == 53) {
			self.leftPlayer.sceneChar.isSilent = true;
			if (self.leftPlayer.sceneChar.isHero()) {
				ViewMainUIBottomUI1.instance.setSkillCM(true);
			}
		}
		if (self.leftPlayer.job == 53) {
			role.isSilent = true;
		}
	}

	public aiUpdate(ctx) {
		let self = this;
		if (self.leftPlayer && self.leftPlayer.sceneChar) GuanQiaAI.thinkAttack(self.leftPlayer.sceneChar, ctx);
		if (self.rightPlayer && self.rightPlayer.sceneChar) {
			GuanQiaAI.thinkAttack(self.rightPlayer.sceneChar, ctx);
		}
	}

	public addHpAndName(role: SceneCharRole, isSelf: boolean) {
		var namebar = RoleHpAndNamePlug.create(isSelf);
		namebar.role = role;
		role.addPlug(namebar);
	}
}