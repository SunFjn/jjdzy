class SceneManager {
	public constructor() {
	}

	public static nowScene: ArpgMap;
	public static showScene(): void {
		SceneManager.cleanScene();

		SceneManager.nowScene.show();
	}

	/**
	 * 清理上个场景
	*/
	public static cleanScene(): void {
		if (SceneManager.nowScene) {
			SceneManager.nowScene.disposeByChangeScene();
		}
	}

	public static sortChild() {
		this.nowScene && this.nowScene.sortChild();
	}

	public static init() {
		SceneManager.nowScene = ArpgMap.getInstance();
		ArpgMap.getInstance().addLayer();
	}

	/***
	 * 销毁ARPG地图
	*/
	public static destory() {
		let sc = SceneManager.nowScene;
		if (sc) {
			sc.destory();
		}
		SceneManager.nowScene = null;
	}

	public static checkTransPoint(hero: ARPGHero): void {
		var global_x: number = hero.x;
		var global_y: number = hero.y;

		var obj_jump: Door = AStar.checkJumpArea(global_x, global_y) as Door;

		if (obj_jump == null) {
			if (hero.isOnJumpPoint)
				hero.isOnJumpPoint = false;
			return;
		}
		let m = ModelArpgMap.getInstance();
		var distmapid: number = obj_jump.mapid;
		let cfg = m.mapCfg();
		var distmapinfo: any = cfg[distmapid];
		if (distmapinfo == null) {
			return;
		}

		if (obj_jump != null && ModelArpgMap.sceneReady) {
			if (hero.isOnJumpPoint)
				return;
			if (obj_jump.objType == UnitType.PORTAL) {
				m.targetSceneId = obj_jump.mapid;
				hero.move_state = Enum_MoveState.STAND;

				m.CG_ENTER_SCENE(obj_jump.mapid);
				hero.isOnJumpPoint = true;
			}
		}
	}



}