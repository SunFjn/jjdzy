class CommonVideotapeCtrl extends SceneCtrl {
	public constructor() {
		super();
	}
	private static _instance: CommonVideotapeCtrl;
	public static get instance(): CommonVideotapeCtrl {
		if (!CommonVideotapeCtrl._instance) CommonVideotapeCtrl._instance = new CommonVideotapeCtrl();
		return CommonVideotapeCtrl._instance;
	}

	winerid;
	headid;
	name;
	power;
	jiangxian;
	leftid;
	rightid;
	systemID = 0;
	panelIdArr = [];
	public damageFix = 0;

	public leftPlayer: Vo_Player;
	public rightPlayer: Vo_Player;

	public scene: MapScene;

	public result = 0;

	public totalFrames = 0;

	public randomseed = 0;
	public mapId = 0;

	public winID: number = 0;
	public onEnter(scene: MapScene) {
		var self = this;
		self.result = 0;
		for (let i = 0; i < self.panelIdArr.length; i++) {
			GGlobal.layerMgr.setPanelVisible(self.panelIdArr[i], false);
		}
		GGlobal.layerMgr.open(UIConst.COMMON_VIDEOTAP);
		MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt));

		self.scene = scene;
		let dic = GGlobal.modelPlayer.playerDetailDic;
		if (self.leftid == Model_player.voMine.id) {
			self.leftPlayer = Model_player.voMine;
		} else {
			self.leftPlayer = dic[self.leftid];
		}
		if (self.leftid == Model_player.voMine.id) {
			self.rightPlayer = Model_player.voMine;
		} else {
			self.rightPlayer = dic[self.rightid];
		}
		if (!self.leftPlayer || !self.rightPlayer) {
			this.exitT();
			ViewCommonWarn.text("录像数据异常");
			return;
		}
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
		//此处保证战力高的一定赢
		leftrole.scaleAttribute(leftrole.str > rightrole.str);
		rightrole.scaleAttribute(leftrole.str < rightrole.str);
		scene.random.seed = self.randomseed;
	}


	private onClickEixt() {
		GGlobal.modelScene.returnMainScene();
	}

	public onExit() {
		let self = this;
		self.mapId = 0;
		for (let i = 0; i < self.panelIdArr.length; i++) {
			GGlobal.layerMgr.setPanelVisible(self.panelIdArr[i], true);
		}
		GGlobal.layerMgr.close2(UIConst.COMMON_VIDEOTAP);
		MainUIController.showBottomExite(false);
		self.scene.removeAll();
		self.rightPlayer = null;
		self.leftPlayer = null;
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
			self.result = 1;
		}

		if (self.result) {
			self.exitT();
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
		let self = this;
		this.scene.scenetype = 0;
		GGlobal.modelScene.returnMainScene();
		//在此处  添加打开结算界面
		let data: any = {};
		data.name = self.name;
		data.power = self.power;
		data.jiangxian = self.jiangxian;
		data.head = self.headid;
		data.systemID = self.systemID;
		GGlobal.layerMgr.open(UIConst.COMMON_HEAD_WIN, data);
	}
}