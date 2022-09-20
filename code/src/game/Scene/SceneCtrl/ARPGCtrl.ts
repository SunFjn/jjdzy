class ARPGCtrl extends SceneCtrl {

	public npcCFG = {};

	public heroPlugs: any[] = [];

	public scene: MapScene;

	public cfginfo: any;

	public exptime = 0;

	public constructor() {
		super();
	}

	public binder() {
		fairygui.UIObjectFactory.setPackageItemExtension(ArpgPlayerNamePlug.URL, ArpgPlayerNamePlug);
	}

	private _init = false;

	public hero: ARPGHero;
	public onEnter() {
		let sf = this;
		if (!this._init) {
			this.binder();
		}

		GGlobal.layerMgr.closeAllPanelExcept([ViewCommonWarn,ViewBattleFault,ViewCommonWin]);
		SceneManager.init();
		let m = ModelArpgMap.getInstance();
		m.createMyCharData();
		GGlobal.mapscene.setScrollMapVis(false);
		GameUnitManager.initData();
		this.setMainUILayout();
		if (!m.isServerControlMap && m.sceneMap) {//前端主动请求进入的场景
			ModelArpgMap.getInstance().CG_ENTER_SCENE(m.sceneMap);
		}
		MainUIController.showBottomExite(true, Handler.create(this, this.returnGuanqia));
	}

	public onExit() {
		let sf = this;
		GGlobal.mapscene.setScrollMapVis(true);
		GGlobal.layerMgr.close2(UIConst.ARPG_SCENEVIEW);
		ModelArpgMap.getInstance().exiteARPG();
		GameUnitManager.dispose();
		SceneManager.destory();
		MainUIController.showBottomExite(false);
	}

	private directExite() {
		let maptype = ModelArpgMap.getInstance().sceneType;
		switch (maptype) {
			case EnumMapType.BOSSZC_LOCAL:
			case EnumMapType.BOSSZC_CROSS:
				GGlobal.modelBossZc.CGExite();
				break;
			case EnumMapType.SYZLB:
				GGlobal.model_Syzlb.CG_EXIT_CHA();
				break;
			default:
				GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
				break;
		}
		ModelArpgMap.getInstance().isAutoExite = true;
	}

	public returnGuanqia() {
		let tips = '确认离开？';
		let maptype = ModelArpgMap.getInstance().sceneType;
		switch (maptype) {
			case EnumMapType.WDTX: tips = ""; break;
			case EnumMapType.BOSSZC_LOCAL:
			case EnumMapType.BOSSZC_CROSS:
				if (GGlobal.modelBossZc.sceneState != 1) {
					tips = "入口已关闭，确定退出？";
				} else {
					tips = "退出后进入需<font color='#fe0000'>间隔10秒</font>，确定退出？";
				}
				break;
			case EnumMapType.SYZLB:
				tips = "退出队伍后将离开副本且次数不返还\n确认离开？";
				break;
		}
		ViewAlert.show(tips, Handler.create(this, this.directExite), ViewAlert.OKANDCANCEL);
	}

	public setMainUILayout() {
		let fromID =ModelArpgMap.getInstance().sceneType;
		switch (fromID) {
			case UIConst.WENDINGTX:
				GGlobal.mainUICtr.setState(MainUIController.WENDINGTIANXIA);
				break;
			case UIConst.BOSS_BATTLEFIELD_LOCAL:
			case UIConst.BOSS_BATTLEFIELD_CROSS:
				GGlobal.mainUICtr.setState(MainUIController.BOSS_BATTLEFIELD);
				break;
			case UIConst.SANGUO_YITONG:
				GGlobal.mainUICtr.setState(MainUIController.SANGUO_YITONG);
				break;
			case EnumMapType.LIANGCAO:
				GGlobal.mainUICtr.setState(MainUIController.FHLY);
				break;
			default:
				GGlobal.mainUICtr.setState(fromID);
				break;
		}
	}


	public update(ctx) {
		if (!ModelArpgMap.sceneReady) return;
		ctx.now = egret.getTimer();
		GameUnitManager.run(ctx);
		CameraManager.update(ctx.dt);
	}

	private static _inst: ARPGCtrl;
	public static getInstance() {
		return this._inst || (this._inst = new ARPGCtrl());
	}
}