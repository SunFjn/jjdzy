class MainTownSceneCtrl extends SceneCtrl {

	public npcCFG = {};

	public heroPlugs: any[] = [];

	public scene: MapScene;

	public cfginfo: any;

	public exptime = 0;

	public constructor() {
		super();
	}

	public hero: SceneCharRole;
	public onEnter() {
		var mapid = 310001;
		// GGlobal.modelScene.lastMainSceneID = GGlobal.mapscene.scenetype;
		// GGlobal.modelScene.csPlayerList();

		// this.cfginfo = CFG_MapDetail.LIB[mapid].info;

		this.scene = GGlobal.mapscene;
		var voMine = Model_player.voMine;
		if (!voMine.sceneChar) {//重连时要创建角色
			voMine.updateChars();
		} else {
			voMine.fixRoles();
		}
		var hero: SceneCharRole = this.hero = voMine.sceneChar;

		hero.x = MathUtil.rndNum(100, 1440 - 100);
		hero.y = MathUtil.rndNum(450, 600);
		hero.setBody(voMine.getBody());


		this.scene.addUnit(hero);

		var sceneRoleCtrl = new HomeSceneHeroAI();
		sceneRoleCtrl.role = hero;
		hero.addPlug(sceneRoleCtrl);

		var map = this.scene.map;
		map.va = { numRow: 1, numCol: 1 };
		map.blockSizeW = 1600;
		map.blockSizeH = 1136;
		this.setMapHead(mapid);
		map.initCustom(GGlobal.stage.stageWidth, 1136, 1600, 1136);
		map.updateViewLimit();

		var layerMgr = GGlobal.layerMgr;


		this.exptime = egret.getTimer();

		this.updateHeroName();
		this.scene.watchMainRole(35);

	}

	protected updateHeroName() {

	}


	public onExit() {
		this.scene.removeAll();
		this.scene.initMapCustom();

		var layerMgr = GGlobal.layerMgr;

		this.hero = null;
		if (DEBUG) {
			// GGlobal.layerMgr.register(-112, ArenaEntry);
			// GGlobal.layerMgr.open(-112);
		}
	}

	public update(ctx) {
		this.scene.watchMainRole();
		this.checkRemain -= ctx.dt;
		if (this.checkRemain < 0) {
			this.checkRemain = 200;
			// this.checkCreateNPC(this.cfginfo.npcs);
		}

		var now = egret.getTimer();
		if (now - this.exptime >= 7000) {//定时请求关卡奖励

		}
	}
	protected checkRemain = 0;

	protected onPList(list: any[]) {
	}
}