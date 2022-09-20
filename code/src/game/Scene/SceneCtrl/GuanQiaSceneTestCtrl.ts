class GuanQiaSceneTestCtrl extends GuanQiaSceneCtrl {
	public constructor() {
		super();
	}

	onEnter(scene:MapScene) {
		super.onEnter(scene);
		this.scene = scene;
		//this.createTestRoles();

		// GGlobal.layerMgr.register(-111,ArenaEntry);
		// GGlobal.layerMgr.open(-111);
	}

	onExit(scene:MapScene) {
		super.onExit(scene);
		GGlobal.layerMgr.close(-111);
	}
	
	public static testbgindex = -1;
	public nextBGIndex() {
		var list:Array<any> = CFG_TestMapID.getLibList();
		var newindex = GuanQiaSceneTestCtrl.testbgindex + 1;
		if(newindex >= list.length) {
			newindex = 0;
		}
		GuanQiaSceneTestCtrl.testbgindex = newindex;
		var obj = list[newindex];
		this.scene.initWithID(obj.id);
		ViewCommonWarn.text("切换到:" + obj.n);
	}

}