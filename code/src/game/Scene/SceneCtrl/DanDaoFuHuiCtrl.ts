class DanDaoFuHuiCtrl extends SceneCtrl {
	private static _instance: DanDaoFuHuiCtrl;
	public static get instance(): DanDaoFuHuiCtrl {
		if (!DanDaoFuHuiCtrl._instance) DanDaoFuHuiCtrl._instance = new DanDaoFuHuiCtrl();
		return DanDaoFuHuiCtrl._instance;
	}

	public leftPlayer: Vo_Player;
	public rightPlayer: Vo_Player;
	public onEnter(scene: MapScene): void {
		this.leftPlayer = null;
		this.rightPlayer = null;
		this.st = -1;
		this.scene = scene;
		scene.setLeftAndRight();
		scene.initWithID(340002);
		this.createMyChars();
		GGlobal.layerMgr.close2(UIConst.ARENA);
		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
		GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.failHandler, this);
	}

	private failHandler(): void {
		GGlobal.modelScene.returnMainScene();
	}

	public onExit(scene: MapScene): void {
		this.scene.setLeftAndRight();
		GGlobal.modelPlayer.removePlayer(Model_DDFH.battleId);
		Model_DDFH.battleId = 0;
		scene.removeAll();
		MainUIController.showBottomExite(false);
		if (GGlobal.layerMgr.lastPanelId <= 0) {
			if (Model_DDFH.autoMath) Model_DDFH.autoTime = 4;
			GGlobal.layerMgr.open(UIConst.ARENA, 1);
		} else {
			Model_DDFH.autoMath = false;
		}
		GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.failHandler, this);
		this.leftPlayer = null;
		this.rightPlayer = null;
	}

	protected onClickEixt(): void {
		ViewAlert.show("退出将视为挑战失败，是否确认？\n(挑战次数不返还)", Handler.create(this, this.okHandler));
	}

	private okHandler(): void {
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		//发送失败协议
		GGlobal.modelddfh.CG_DANDAOFH_BATTLERESULT(2);
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
			} else {//没结果 战斗超过30秒判定输
				if (now - this.oldTime >= this.pvpTime) {
					this.killRole(this.leftPlayer.sceneChar, this.rightPlayer.sceneChar);
				}
			}
			this.aiUpdate(ctx);
		} else {

		}
		this.scene.watchMainRole();
	}

	public setState(st: number): void {
		if (st == 0) {
			let vo = GGlobal.modelPlayer.playerDetailDic[Model_DDFH.battleId];
			if (!vo) {
				return;
			}
			this.addOther(vo);
			this.createOther(this.rightPlayer);
		} else if (st == 1) {
			GGlobal.modelddfh.CG_DANDAOFH_BATTLERESULT(1);
		} else if (st == 2) {
			GGlobal.modelddfh.CG_DANDAOFH_BATTLERESULT(0);
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
		this.scaleAttribute(role, Model_DDFH.battleRet, true);
	}

	protected addOther(vo: Vo_Player): void {
		this.rightPlayer = vo;
	}

	protected createOther(vo: Vo_Player): void {
		vo.updateChars();
		var role: SceneCharRole = vo.sceneChar;
		if (!this.scene.getUnit(role.id)) {
			this.setBossPos(role)
			role.invalid |= 1023;
			role.force = 2;
			role.setDir(-1);
			this.scene.addUnit(role);
			this.addHpAndName(role, false);
		}
		this.scaleAttribute(role, Model_DDFH.battleRet, false);
	}

	public aiUpdate(ctx) {
		if (this.leftPlayer && this.leftPlayer.sceneChar) GuanQiaAI.thinkAttack(this.leftPlayer.sceneChar, ctx);
		if (this.rightPlayer && this.rightPlayer.sceneChar) {
			GuanQiaAI.thinkAttack(this.rightPlayer.sceneChar, ctx);
		}
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