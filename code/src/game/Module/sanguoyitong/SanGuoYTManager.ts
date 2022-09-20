class SanGuoYTManager {
	public constructor() {
	}

	public static enter(mid = 0) {
		ARPGMapManager.enter(0, UIConst.SANGUO_YITONG, false);
		GGlobal.socketMgr.registerReconnectHD("SanGuoYTManager", Handler.create(this, this.onSocketClose));
		GGlobal.layerMgr.open(UIConst.SANGUO_YITONG_SCENE);
		View_SanGuoYT_ButtomUI.createInstance().toShow();
	}

	public static exite() {
		let s = this;
		if (GGlobal.sceneType == SceneCtrl.WDTX_PVE) {
			(GGlobal.mapscene.sceneCtrl as SanGuoYiTongSceneCtrl).onExit();
		}
		ModelArpgMap.getInstance().isAutoExite = true;
		GGlobal.socketMgr.removeReconnectHD("SanGuoYTManager");
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		GGlobal.layerMgr.close2(UIConst.SANGUO_YITONG_SCENE);
		View_SanGuoYT_ButtomUI.createInstance().toHide();
		ARPGMapManager.exite();
	}

	public static enterBattle() {
		ViewMainTopUI1.instance.visible = true;
		ViewMainTopUI.instance.visible = false;
	}

	public static exiteBattle() {
		if (!GGlobal.modelSanGuoYT.state) {
			DEBUGWARING.log("三国一统已结束！！！");
			// GGlobal.layerMgr.open(UIConst.WENDINGTX_RET);
			return;
		}
		ViewMainTopUI.instance.visible = true;
		ViewMainTopUI1.instance.visible = false;
	}

	private static onSocketClose() {
		this.exite();
	}

	public static battleEnd(result, arr = []) {
		if (result == 1) {
			ViewCommonWin.show(arr, 5000, this, "确定", null, null, true);
		} else {
			ViewCommonFail.show(5000, this, "退出", SanGuoYTManager.exiteBattle, null, null, true);
		}
	}
}