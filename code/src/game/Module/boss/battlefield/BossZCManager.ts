class BossZCManager {
	public constructor() {
	}

	public static inAcitvity = 0;
	public static timer: BossZCTimer;
	public static enter(mid = 0) {
		ARPGMapManager.enter(0, UIConst.BOSS_BATTLEFIELD_CROSS, false);
		if (!this.timer) {
			this.timer = BossZCTimer.createInstance();
		}
		this.timer.show1();
		GGlobal.socketMgr.registerReconnectHD("BossZCManager", Handler.create(this, this.onSocketClose));
		GGlobal.modelWorldNet.listen(Model_WorldNet.WORLD_SOCKET_CLOSE, this.worldNetCross, this);
		GGlobal.control.listen(Enum_MsgType.BOSSZC_READYTIME, BossZCManager.setTimer, BossZCManager);
		this.inAcitvity = 1;
	}

	public static exite() {
		let s = this;
		if (!this.inAcitvity) {
			return;
		}
		this.inAcitvity = 0;
		if (this.timer) this.timer.hide1();
		this.timer = null;
		ModelArpgMap.getInstance().isAutoExite = true;
		GGlobal.modelBossZc.CGExite();
		GGlobal.socketMgr.removeReconnectHD("BossZCManager");
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		if (GGlobal.modelBossZc.sceneType == 1) {
			GGlobal.layerMgr.open(UIConst.BOSS_BATTLEFIELD_LOCAL);
		} else {
			GGlobal.layerMgr.open(UIConst.BOSS_BATTLEFIELD_CROSS);
		}
		GGlobal.control.remove(Enum_MsgType.BOSSZC_READYTIME, BossZCManager.setTimer, BossZCManager);
		GGlobal.modelWorldNet.remove(Model_WorldNet.WORLD_SOCKET_CLOSE, this.worldNetCross, this);
	}

	private static worldNetCross() {
		let m = GGlobal.modelBossZc;
		if (m.sceneType == Model_BossZC.CROSS) {
			ViewCommonWarn.text("检测网络异常，已从跨服玩法中退出");
			GGlobal.modelBossZc.CGExite();
			BossZCManager.exite();
		}
	}

	private static onSocketClose() {
		this.exite();
	}

	public static setTimer() {
		let st = GGlobal.modelBossZc.sceneState;
		if (st == 3) {
			if (this.timer) this.timer.hide1();
			this.timer = null;
		} else if (st == 1 || st == 2) {
			if (!this.timer) {
				this.timer = BossZCTimer.createInstance();
			}
			this.timer.show1();
		}
	}

	public static enterBattle() {
		if (this.timer) this.timer.hide1();
	}


	public static battleEnd(result, arr = []) {
		if (result == 1) {
			BossZCManager.enter();
			ViewCommonWin.show(arr, 5000, this, "确定", null, null, true);
		} else {
			BossZCManager.exite();
			ViewCommonFail.show(5000, this, "退出", BossZCManager.exite, null, null, true);
		}
	}
}