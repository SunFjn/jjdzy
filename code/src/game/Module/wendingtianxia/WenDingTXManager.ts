class WenDingTXManager {
	public constructor() {
	}

	private static _instanc: WenDingTXManager;
	public static getInstance(): WenDingTXManager {
		if (!this._instanc) this._instanc = new WenDingTXManager();
		return this._instanc;
	}

	private _init;
	public init() {
		if (this._init) return;
		this._init = true;
		let spie = fairygui.UIObjectFactory.setPackageItemExtension;
		spie(WenDingTXStatePlug.URL, WenDingTXStatePlug);
		spie(WenDingTXNamePlug.URL, WenDingTXNamePlug);
		spie(ViewWenDingTXTopUI.URL, ViewWenDingTXTopUI);
		spie(ViewWenDingTXBottomUI.URL, ViewWenDingTXBottomUI);
		spie(ItemWDTXZhanDi.URL, ItemWDTXZhanDi);
		spie(ItemWDTXRank.URL, ItemWDTXRank);
		spie(ItemLayerRank.URL, ItemLayerRank);
		spie(ItemWDTXScore.URL, ItemWDTXScore);
		spie(ChildWDTXScoreRank.URL, ChildWDTXScoreRank);
		spie(ChildWDTXRank.URL, ChildWDTXRank);
		spie(ChildLianZhanPanel.URL, ChildLianZhanPanel);
		spie(ChildLayerRank.URL, ChildLayerRank);
		spie(WDTXMapNamePanel.URL, WDTXMapNamePanel);
	}

	private lastLayer = -1;
	private showMap() {
		if (this.lastLayer == GGlobal.modelWenDingTX.layer) return;
		this.lastLayer = GGlobal.modelWenDingTX.layer;
		if (!this.mapName) this.mapName = WDTXMapNamePanel.createInstance();
		this.mapName.show1();
	}

	public mapName: WDTXMapNamePanel;
	private _isFirstEnter = true;
	public async enter() {
		let sf = this;
		sf.init();
		GGlobal.modelWenDingTX.ACtiving = true;
		await RES.getResAsync("wendingTX");
		await RES.getResAsync("wendingTX_atlas0");
		await sf.loadCompleteEnter();
	}

	private loadCompleteEnter() {
		if (!GGlobal.modelWenDingTX.ACtiving) {
			DEBUGWARING.log("问鼎天下已结束！！！");
			return;
		}
		GGlobal.createPack("wendingTX");
		let sf = this;
		GGlobal.modelWenDingTX.enter();
		ViewWenDingTXTopUI.createInstance().toShow();
		ViewWenDingTXBottomUI.createInstance().toShow();
		GGlobal.control.listen(Enum_MsgType.ARPG_SCENE_READY, this.showRevive, this);
		GGlobal.control.listen(Enum_MsgType.EXIT_SERVERBATTLE, WenDingTXManager.exiteBattle, sf);
		GGlobal.control.listen(Enum_MsgType.WDTX_PVE_END, sf.showReslt, sf);
		GGlobal.control.listen(Enum_MsgType.WDTX_LAYER_UPDATE, sf.changeSceneHD, sf);
		GGlobal.socketMgr.registerReconnectHD("WenDingTXManager01", Handler.create(this, this.onSocketClose));
		if (this._isFirstEnter && GGlobal.modelWenDingTX.layer != 0) {//首次进入需要先进入活动
			sf.changeSceneHD();
			this._isFirstEnter = false;
		}
	}

	public exite() {
		let sf = this;
		if (GGlobal.sceneType == SceneCtrl.WDTX_PVE) {
			(GGlobal.mapscene.sceneCtrl as WenDingTXPVECtrl).onExit();
		}
		ModelArpgMap.getInstance().isServerControlMap = true;
		GGlobal.modelWenDingTX.exite();
		GGlobal.modelWenDingTX.ACtiving = false;
		ViewWenDingTXTopUI.createInstance().toHide();
		ViewWenDingTXBottomUI.createInstance().toHide();
		ViewWenDingTXTopUI.createInstance().visible = true;
		ViewWenDingTXBottomUI.createInstance().visible = true;
		GGlobal.socketMgr.removeReconnectHD("WenDingTXManager01");
		GGlobal.control.remove(Enum_MsgType.WDTX_PVE_END, sf.showReslt, sf);
		GGlobal.control.remove(Enum_MsgType.ARPG_SCENE_READY, this.showRevive, this);
		GGlobal.control.remove(Enum_MsgType.EXIT_SERVERBATTLE, WenDingTXManager.exiteBattle, sf);
		GGlobal.control.remove(Enum_MsgType.WDTX_LAYER_UPDATE, sf.changeSceneHD, sf);

		ARPGMapManager.exite();

		Model_WorldNet.exiteCross();
		this._isFirstEnter = true;
		this.lastLayer = -1;
		console.log("问鼎天下 离开场景断开中央服");
	}

	private onSocketClose() {
		this.exite();
		Model_WorldNet.exiteCross();
		console.log("问鼎掉线 断开中央服");
	}

	public static leavelBattleScene() {
		WenDingTXManager.exiteBattle();
	}

	private showReslt(arg) {
		this._arg = arg;
		Timer.instance.callLater(this.delayShowResultPanel, 200, this);
	}

	private _arg;
	private delayShowResultPanel() {
		let arg = this._arg;
		if (arg.ret == 1) {
			ViewCommonWin.show(arg.awards, 5000, this, "确定", WenDingTXManager.exiteBattle, null, true);
		} else {
			ViewCommonFail.show(5000, this, "退出", WenDingTXManager.exiteBattle, null, null, true);
		}
	}

	//重新进入 arpg地图 需要对界面进行重新布局
	private changeSceneHD() {
		this._isFirstEnter = false;
		let m = GGlobal.modelWenDingTX;
		let cfg = Config.wdtx_260[m.layer];
		let mid = cfg.map;
		if (mid == ModelArpgMap.getInstance().sceneMap) return;
		ARPGMapManager.enter(mid, UIConst.WENDINGTX, false);
		this.showMap();
		this.showRevive();
	}

	public showRevive() {
		if (GGlobal.modelWenDingTX.deadTime > Model_GlobalMsg.getServerTime()) {
			GGlobal.layerMgr.open(UIConst.REVIVE_PANEL, UIConst.WENDINGTX);
		}
	}

	public static enterBattle() {
		ViewMainTopUI1.instance.visible = true;
		ViewMainTopUI.instance.visible = false;
		ViewWenDingTXTopUI.createInstance().visible = false;
		ViewWenDingTXBottomUI.createInstance().visible = false;
	}

	public static exiteBattle() {
		if (!GGlobal.modelWenDingTX.ACtiving) {
			DEBUGWARING.log("问鼎天下已结束！！！");
			GGlobal.layerMgr.open(UIConst.WENDINGTX_RET);
			return;
		}
		ViewMainTopUI.instance.visible = true;
		ViewMainTopUI1.instance.visible = false;
		GGlobal.modelWenDingTX.reApplyEnter4225();
		WenDingTXManager.getInstance().loadCompleteEnter();
		ViewWenDingTXTopUI.createInstance().visible = true;
		ViewWenDingTXBottomUI.createInstance().visible = true;
	}

	public static enterPve(id) {
		if (GGlobal.mapscene.sceneCtrl instanceof ARPGCtrl) {
			GGlobal.modelWenDingTX.fight4227(id);
		}
	}
}