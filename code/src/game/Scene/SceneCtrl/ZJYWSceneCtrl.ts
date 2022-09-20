class ZJYWSceneCtrl implements ISceneCtrl {

	public damageFix = 0;

	public leftPlayer: Vo_Player;
	public rightPlayer: Vo_Player;

	public scene: MapScene;

	public result: any;

	public totalFrames = 0;

	public randomseed = 0;

	public mapId = 0;

	public winID: number = 0;
	public fightType: number = 0;/**1三国无双*/

	public constructor() {
	}

	private static _inst: ZJYWSceneCtrl;
	public static getInst() {
		return this._inst || (this._inst = new ZJYWSceneCtrl());
	}

	public onEnter(scene: MapScene) {
		scene.fc = 0;
		console.warn("-----------pvpstart-----------");
		// SceneObject.COUNTER = -1000000;
		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt));

		var self = this;
		self.scene = scene;
		self.mapId = Config.zjywwj_005[ModelZJYW.curBoss].map;
		if (self.mapId > 0) {
			scene.initWithID(self.mapId);
		}
		self.leftPlayer = Model_player.voMine;
		self.leftPlayer.updateChars();
		var leftrole: SceneCharRole = self.leftPlayer.sceneChar;
		leftrole.y = 640;
		leftrole.x = 220;
		leftrole.force = 1;
		leftrole.setDir(1);
		leftrole.setPlayerName(self.leftPlayer.name);
		self.scene.addUnit(leftrole);
		this.addHpAndName(leftrole, false);
		const vos = GGlobal.modelPlayer.playerDetailDic;
		let vo: Vo_Player = vos[ModelZJYW.enemyid];
		self.updateRight(vo);
		scene.setLeftAndRight();
		const heroID = ModelZJYW.getInfoByPos(ModelZJYW.curBoss).id;
		ViewHeroHead.show(heroID, false, vo.hp);
		scene.random.seed = self.randomseed;
		GGlobal.layerMgr.close2(UIConst.CHILDZJYW);
		const jinJS = GGlobal.mainUICtr.getIcon(UIConst.JINSHENG);
		const dairyAct = GGlobal.mainUICtr.getIcon(UIConst.DAILYTASK);
		if (jinJS) {
			jinJS.visible = false;
		}
		if (dairyAct) {
			dairyAct.visible = false;
		}
	}
	public updateRight(vo: Vo_Player) {
		if (!vo) {
			return;
		}
		this.rightPlayer = vo;
		this.rightPlayer.updateChars();
		let char = this.rightPlayer.sceneChar;
		this.scene.addUnit(char);
		char.y = 640;
		char.x = 480;
		char.force = 2;
		char.setDir(-1);
		char.setPlayerName(this.rightPlayer.name);
		this.addHpAndName(char, false);
		this.leftPlayer.sceneChar.scaleAttribute(this.leftPlayer.sceneChar.str > this.rightPlayer.sceneChar.str);
		this.rightPlayer.sceneChar.scaleAttribute(this.leftPlayer.sceneChar.str < this.rightPlayer.sceneChar.str);
	}
	private onClickEixt() {
		ViewAlert.show("退出将视为挑战失败，是否确认？\n(不消耗挑战次数和演武令)", Handler.create(this, this.truelyExit));
	}
	public onExit() {
		this.updateValid |= 1;
		this.mapId = 0;
		// SceneObject.COUNTER = 0;
		MainUIController.showBottomExite(false);
		this.scene.removeAll();
		GGlobal.layerMgr.open(UIConst.CHILDZJYW);
		delete GGlobal.modelPlayer.playerDetailDic[this.rightPlayer.id];
		ViewHeroHead.hide();
		const jinJS = GGlobal.mainUICtr.getIcon(UIConst.JINSHENG);
		const dairyAct = GGlobal.mainUICtr.getIcon(UIConst.DAILYTASK);
		if (jinJS) {
			jinJS.visible = true;
		}
		if (dairyAct) {
			dairyAct.visible = true;
		}
		this.leftPlayer = null;
		this.rightPlayer = null;
	}
	public truelyExit() {
		GGlobal.modelScene.returnMainScene();
	}

	public addHpAndName(role: SceneCharRole, isSelf: boolean) {
		var namebar = RoleHpAndNamePlug.create(isSelf);
		namebar.role = role;
		role.addPlug(namebar);
	}

	public pausetime = 0;
	private updateValid: number = 1;
	public update(ctx) {
		var self = this;
		if (!self.rightPlayer || !self.updateValid) {
			return;
		}
		self.scene.fc++;
		var leftNum = GGlobal.mapscene.getForceCount(1);
		var rightNum = GGlobal.mapscene.getForceCount(2);
		self.totalFrames++;
		if (leftNum == 0 || rightNum == 0) {
			if (leftNum > 0) {
				self.winID = self.leftPlayer.sceneChar.id;
				self.result = { winner: "left" };
			}
			if (rightNum > 0) {
				self.winID = self.rightPlayer.sceneChar.id;
				self.result = { winner: "right" };
			}
		}

		if (self.result) {
			self.result.fs = self.totalFrames;
			self.result.randomseed = self.randomseed;

			//self.scene.removeAll();
			self.autoExit();
			self.updateValid &= 0;
			self.result = null;
			return;
		}
		this.scene.watchMainRole();
		var guanQiaAI = GuanQiaAI;
		var leftrole: SceneCharRole = self.leftPlayer.sceneChar;
		guanQiaAI.thinkAttack(leftrole, ctx);
		var rightrole: SceneCharRole = self.rightPlayer.sceneChar;
		guanQiaAI.thinkAttack(rightrole, ctx);
		ViewHeroHead.update(rightrole.curhp);
	}
	private autoExit() {
		GGlobal.modelZJYW.CG4717(ModelZJYW.curBoss, this.result ? (this.result.winner == "left" ? 1 : 0) : 0);
	}
}