class ARPGSceneController {
	public constructor() {
	}

	//注册管理器实现退出和进入逻辑
	static managerDictionary: { id: BaseARPGManager } | any = {};
	static registerManager = () => {
		let self = ARPGSceneController;
		self.managerDictionary[EnumMapType.LIANGCAO] = LiangCaoManager.getInstance();
		self.managerDictionary[EnumMapType.HOME] = HomeManager.getInstance();
	}

	static getSceneType() {
		var map: Imap_200 = Config.map_200[ModelArpgMap.getInstance().sceneMap];
		let mapType = map.severtype;
		return mapType;
	}

	//是否退出活动`后面的活动走系统自带的退出协议 不需要前端主动退出地图
	static isExiteAct = () => {
		ModelArpgMap.getInstance().isAutoExite = true;
	}

	/**
	 * 进入ARPG控制器  后端拉入场景 前端加载地图配置完成后调用
	 * 从横版地图切换到可自由走动地图会调用一次
	*/
	static enter = () => {
		let model = ModelArpgMap.getInstance();
		let mapid = model.sceneMap;
		model.isCross = true;

		let dic = ARPGSceneController.managerDictionary;
		let sceneType = ModelArpgMap.getInstance().sceneType;
		if (dic[sceneType]) {
			GGlobal.mapscene.enterScene(SceneCtrl.ARPG);
			model.isCross = true;
			dic[sceneType].enter();
		}
	}

	/**
	 * 每次切换场景控制器会调用
	 * 一般在ARPG场景 只在进入战斗场景和回到关卡才会切换控制器
	 * */
	static exite = () => {
		let dic = ARPGSceneController.managerDictionary;
		let sceneType = ModelArpgMap.getInstance().sceneType;
		if (dic[sceneType]) {
			dic[sceneType].exite();
		}
	}
}