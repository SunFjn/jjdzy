class PVPFightSceneProgresser implements ISceneCtrl {

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

		private static _inst: PVPFightSceneProgresser;
	public static getInst() {
		return this._inst || (this._inst = new PVPFightSceneProgresser());
	}

	public onEnter(scene: MapScene) {
		scene.fc = 0;
		console.warn("-----------pvpstart-----------");
		// SceneObject.COUNTER = -1000000;
		GGlobal.layerMgr.open(UIConst.CROSS_WARS_LOOK);
		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt));

		var self = this;
		self.scene = scene;
		self.leftPlayer.updateChars();
		self.rightPlayer.updateChars();

		if (self.mapId > 0) {
			scene.initWithID(self.mapId);
		}

		self.leftPlayer.updateChars();
		var leftrole: SceneCharRole = self.leftPlayer.sceneChar;
		leftrole.y = 640;
		leftrole.x = 220;
		leftrole.force = 1;
		leftrole.setDir(1);
		leftrole.setPlayerName(self.leftPlayer.name);
		self.scene.addUnit(leftrole);
		this.addHpAndName(leftrole, false);

		self.rightPlayer.updateChars();
		var rightrole: SceneCharRole = self.rightPlayer.sceneChar;
		rightrole.y = 640;
		rightrole.x = 480;
		rightrole.force = 2;
		rightrole.setDir(-1);
		rightrole.setPlayerName(self.rightPlayer.name);
		self.scene.addUnit(rightrole);
		this.addHpAndName(rightrole, false);
		scene.setLeftAndRight();

		leftrole.scaleAttribute(leftrole.str > rightrole.str);
		rightrole.scaleAttribute(leftrole.str < rightrole.str);
		scene.random.seed = self.randomseed;

		//show exite button
	}


	private onClickEixt() {

		GGlobal.modelScene.returnMainScene();
		GGlobal.layerMgr.open(UIConst.SANGUO_WUSHUANG);
	}

	public onExit() {
		this.mapId = 0;
		// SceneObject.COUNTER = 0;
		GGlobal.layerMgr.close(UIConst.CROSS_WARS_LOOK);
		MainUIController.showBottomExite(false);
		this.scene.removeAll();
		this.rightPlayer = null;
		this.leftPlayer = null;
	}

	public addHpAndName(role: SceneCharRole, isSelf: boolean) {
		var namebar = RoleHpAndNamePlug.create(isSelf);
		namebar.role = role;
		role.addPlug(namebar);
	}

	public pausetime = 0;
	public update(ctx) {
		var self = this;
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
			self.exitT();
			self.result= null;
			return;
		}
		this.scene.watchMainRole();
		var guanQiaAI = GuanQiaAI;
		var leftrole: SceneCharRole = self.leftPlayer.sceneChar;
		guanQiaAI.thinkAttack(leftrole, ctx);
		var rightrole: SceneCharRole = self.rightPlayer.sceneChar;
		guanQiaAI.thinkAttack(rightrole, ctx);
	}

	protected exitT() {
		if (this.fightType == 1) {
			GGlobal.layerMgr.open(UIConst.SGWS_WIN, this.winID);
		}
		this.scene.scenetype = 0;
		GGlobal.modelScene.returnMainScene();
	}
}