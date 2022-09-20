class FengHuoLYCtr {
	public constructor() {
	}

	private static instance: FengHuoLYCtr;
	public static getInstance(): FengHuoLYCtr {
		if (!this.instance) {
			this.instance = new FengHuoLYCtr()
		}
		return this.instance;
	}

	public top: FengHuoLYTop;
	public bottom: FengHuoLYUI;
	public enter() {
		let sf = this;
		MainUIController.setSkillEnable(false);
		GGlobal.mainUICtr.setState(MainUIController.FHLY);
		sf.top = FengHuoLYTop.createInstance();
		sf.bottom = FengHuoLYUI.createInstance();
		sf.top.enter();
		sf.bottom.enter();
		GGlobal.modelFengHuoLY.inActivity = true;
		GGlobal.socketMgr.registerReconnectHD("FengHuoLYCtr", Handler.create(this, this.onSocketClose));
		GGlobal.control.listen(Enum_MsgType.ADD_ACTIVITYICON, sf.activityEnd, sf);
		GGlobal.control.listen(Enum_MsgType.ENTER_SERVERBATTLE, FengHuoLYCtr.enterBattle, sf);
		GGlobal.control.listen(Enum_MsgType.EXIT_SERVERBATTLE, FengHuoLYCtr.exiteBattle, sf);
	}


	public exite() {
		let sf = this;
		if (sf.top) sf.top.exite();
		if (sf.bottom) sf.bottom.exite();
		MainUIController.setSkillEnable(true);
		Model_WorldNet.exiteCross();
		console.log("烽火 离开断开中央服");
		GGlobal.modelFengHuoLY.destory();
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		GGlobal.mainUICtr.setState(MainUIController.GUANQIA);
		GGlobal.modelFengHuoLY.inActivity = false;
		GGlobal.socketMgr.removeReconnectHD("FengHuoLYCtr");
		GGlobal.control.remove(Enum_MsgType.ADD_ACTIVITYICON, sf.activityEnd, sf);
		GGlobal.control.remove(Enum_MsgType.ENTER_SERVERBATTLE, FengHuoLYCtr.enterBattle, sf);
		GGlobal.control.remove(Enum_MsgType.EXIT_SERVERBATTLE, FengHuoLYCtr.exiteBattle, sf);
	}

	private onSocketClose(){
		GGlobal.modelFengHuoLY.exite();
	}

	public activityEnd(arr) {
		let id = arr[0];
		let st = arr[1];
		if (id != UIConst.FHLY || st == 2) {
			return;
		}

		console.log(" fenghuolangyan map  end");
		if (GGlobal.sceneType == SceneCtrl.FHLY) {
			(GGlobal.mapscene.sceneCtrl as FengHuoLYCtrl).exitT();
		}
		GGlobal.modelFengHuoLY.exite();
		GGlobal.mainUICtr.setState(MainUIController.GUANQIA);
		GGlobal.layerMgr.open(UIConst.FHLY_END);
	}

	public static enterBattle() {
		GGlobal.layerMgr.closeAllPanelExcept([FengHuoLangYanScene]);
		let view = GGlobal.layerMgr.getView(UIConst.FHLY);
		// MainUIController.setSkillEnable(false);
		if (view) {
			view.visible = false;
			view.modalLayer.visible = false;
		}
		let sf = FengHuoLYCtr.getInstance();
		if (sf.top) {
			sf.top.visible = false;
		}
		if (sf.bottom) {
			sf.bottom.visible = false;
		}
	}

	public static exiteBattle() {
		console.log("fhly exiteBattle");
		let view = GGlobal.layerMgr.getView(UIConst.FHLY);
		if (view) {
			view.modalLayer.visible = true;
			view.visible = true;
		}
		let sf = FengHuoLYCtr.getInstance();
		if (sf.top) {
			sf.top.visible = true;
		}
		if (sf.bottom) {
			sf.bottom.visible = true;
		}
		if (GGlobal.modelFengHuoLY.inActivity) {
			// MainUIController.setSkillEnable(false);
			GGlobal.mainUICtr.setState(MainUIController.FHLY);
		} else {
			// MainUIController.setSkillEnable(true);
			GGlobal.mainUICtr.setState(MainUIController.GUANQIA);
		}
	}

	public maxW = 2300;
	public maxH = 2000;
	public mapMove(xx, yy) {
		let sgw = fairygui.GRoot.inst.width;
		let sgh = fairygui.GRoot.inst.height;
	}
}