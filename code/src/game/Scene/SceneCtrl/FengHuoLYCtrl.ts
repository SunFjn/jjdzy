class FengHuoLYCtrl implements ISceneCtrl {

	public damageFix = 0;

	public leftPlayer: Vo_Player;
	public rightPlayer: Vo_Player;
	public battleRet = 0;//0失败，1胜利
	public battleID = 0;//战斗ID 请求结果
	public cityid = 0;//城池ID 奖励信息
	public scene: MapScene;

	public result: any;

	public totalFrames = 0;

	public randomseed = 0;

	public mapId = 0;

	public winID: number = 0;
	public fightType: number = 0;/** 2烽火狼烟*/
	public data;
	public inLeft;


	public msDmg_left = 1;
	public msDmg_right = 1;
	public rightEndHp = 0;
	public leftEndHp = 0;
	public lefthp = 0;
	public righthp = 0;
	public leftrole;
	public rightrole;

public dmgTime = 0;
		public battleEnd = false;
	public counter = 0;
	public constructor() {
	}

	private static _instance: FengHuoLYCtrl;
	public static getInstance(): FengHuoLYCtrl {
		if (!FengHuoLYCtrl._instance) FengHuoLYCtrl._instance = new FengHuoLYCtrl();
		return FengHuoLYCtrl._instance;
	}

	public enterTime = 0;
	public onEnter(scene: MapScene) {
		scene.fc = 0;
		let sf = this;
		sf.result = null;
		sf.dmgTime = sf.enterTime = egret.getTimer();
		this.counter = 0;

		var self = this;
		self.scene = scene;
		self.leftPlayer.updateChars();
		self.rightPlayer.updateChars();

		if (self.mapId > 0) {
			scene.initWithID(self.mapId);
		}

		self.leftPlayer.updateChars();
		var leftrole: SceneCharRole = this.leftrole = self.leftPlayer.sceneChar;
		leftrole.y = 640;
		leftrole.x = 220;
		leftrole.force = 1;
		leftrole.autoSkill = false;
		leftrole.setDir(1);
		leftrole.immuneDmg = 1;
		leftrole.setPlayerName(self.leftPlayer.name);
		leftrole.curhp = self.lefthp;
		self.scene.addUnit(leftrole);
		this.addHpAndName(leftrole, false);

		self.rightPlayer.updateChars();
		var rightrole: SceneCharRole = this.rightrole = self.rightPlayer.sceneChar;
		rightrole.y = 640;
		rightrole.x = 480;
		rightrole.force = 2;
		rightrole.immuneDmg = 1;
		rightrole.autoSkill = false;
		rightrole.setDir(-1);
		rightrole.curhp = self.righthp;
		rightrole.setPlayerName(self.rightPlayer.name);
		self.scene.addUnit(rightrole);
		this.addHpAndName(rightrole, false);
		scene.setLeftAndRight();

		let isWin = sf.battleRet == 1;
		if (sf.inLeft) {
			leftrole.scaleAttribute(isWin);
			rightrole.scaleAttribute(!isWin);
		} else {
			leftrole.scaleAttribute(!isWin);
			rightrole.scaleAttribute(isWin);
		}
		scene.random.seed = self.randomseed;
		//show exite button
	}

	public onExit() {
		this.mapId = 0;
		this.battleEnd = false;
		this.rightPlayer = null;
		this.leftPlayer = null;
		this.scene.scenetype = 0;
		this.scene.removeAll();
		GGlobal.modelFengHuoLY.CG_BATTLEEND_3567(this.battleID);
	}

	public addHpAndName(role: SceneCharRole, isSelf: boolean) {
		var namebar = RoleHpAndNamePlug.create(isSelf);
		namebar.role = role;
		role.addPlug(namebar);
	}


	public update(ctx) {
		var self = this;
		let now = egret.getTimer();
		if (now - self.enterTime < 1000) {
			return;
		}

		self.scene.fc++;
		var leftNum = GGlobal.mapscene.getForceCount(1);
		var rightNum = GGlobal.mapscene.getForceCount(2);
		self.totalFrames++;
		if ( this.battleEnd) {
			self.exitT();
			return;
		}
		this.scene.watchMainRole();
		var guanQiaAI = GuanQiaAI;
		var leftrole: SceneCharRole = self.leftPlayer.sceneChar;
		if(leftrole.curhp>0)guanQiaAI.thinkAttack(leftrole, ctx);
		var rightrole: SceneCharRole = self.rightPlayer.sceneChar;
		if(rightrole.curhp>0)guanQiaAI.thinkAttack(rightrole, ctx);
		if(now-2000<this.dmgTime)return;
		if (this.counter + 1200 < now) {
			this.counter = now;
			this.battleEnd = leftrole.curhp <= this.leftEndHp || rightrole.curhp <= this.rightEndHp;
			leftrole.curhp = leftrole.curhp -this.msDmg_right;
			rightrole.curhp = rightrole.curhp -this.msDmg_left;
			if(leftrole.curhp <= 0){
				leftrole.deadThrow(5,15);
			}
			if(rightrole.curhp <= 0){
				rightrole.deadThrow(5,15);
			}
			
		}
		if(leftrole.curhp <= 0 ||rightrole.curhp <= 0){
				leftrole.curhp = this.leftEndHp;
				rightrole.curhp = this.rightEndHp;	
			}
	}

	public exitT() {
		let s = this;
		if (this.battleRet == 1) {
			let obj: any = {};
			obj.id = this.cityid;
			obj.type = this.inLeft?1:0; 
			GGlobal.layerMgr.open(UIConst.FHLY_BATTLE, obj);
		} else {
			ViewCommonWarn.text("积分+" + ConfigHelp.getSystemNum(3902));
			ViewBattleFault.show(5000, s, "退出", s.onFaultUIExitT, s.onFaultUIExitT, s.onFaultUIExitT);
		}
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
	}

	protected onFaultUIExitT(self: FengHuoLYCtrl, ui: ViewBattleFault) {
		GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		FengHuoLYCtr.exiteBattle();
		GGlobal.layerMgr.open(UIConst.REVIVE_PANEL, UIConst.FHLY);
	}

	//胜者和掉帧玩家有可能直接被下一轮直接攻击
	public enterNextBattle() {
		GGlobal.layerMgr.close2(UIConst.FHLY_BATTLE);
		GGlobal.layerMgr.close(UIConst.BATTLEFAULT);
	}
}