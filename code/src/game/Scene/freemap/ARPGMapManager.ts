/***此类仅管理问鼎和BOSS战场*/class ARPGMapManager {
	public constructor() {
	}

	/**当前玩法ID */
	public static currentSystem = 0;
	/**
	 * mapid 首次需要进入的地图ID
	 * fromSysID 用系统ID对主UI进行布局
	 * isAutoExite 是否需要手动退出场景（场景控制器只有一个：比如A进入1副本地图并进入了战斗地图2，必须在1地图仍旧看到A，这时候就不能退出场景控制器）设置成false,需要手动移除arpgctr.forceExite
	 * isCross 地图是否走的跨服协议
	*/
	public static enter(mapid, fromSysID: number = 0, isAutoExite: boolean = true, isCross: boolean = true, moveAble = true) {
		ModelArpgMap.getInstance().isCross = isCross;
		ModelArpgMap.getInstance().sceneMap = mapid;
		ModelArpgMap.getInstance().isAutoExite = isAutoExite;
		ModelArpgMap.moveEnable = moveAble;
		if (GGlobal.sceneType != SceneCtrl.ARPG) {//已经处于地图 直接走换地图
			GGlobal.mapscene.enterScene(SceneCtrl.ARPG);
		} else {
			this.changeScene(mapid);
		}
		this.setMainUI(fromSysID);
		this.currentSystem = fromSysID;
	}

	public static exite() {
		this.currentSystem = 0;
		ModelArpgMap.getInstance().isAutoExite = true;
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
	}

	//根据系统ID重新布局界面
	public static setMainUI(fromID) {
		if (!fromID) return;
		switch (fromID) {
			case UIConst.SYZLB:
				GGlobal.mainUICtr.setState(MainUIController.ARPGMAP);
				break;
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
			case UIConst.YANHUI:
				GGlobal.mainUICtr.setState(MainUIController.YANHUI);
				break;
		}
	}

	public static changeScene(mapid) {
		if (mapid) ModelArpgMap.getInstance().CG_ENTER_SCENE(mapid);
	}

}