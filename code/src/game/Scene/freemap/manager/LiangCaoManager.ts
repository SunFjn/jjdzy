class LiangCaoManager extends BaseARPGManager {
	public constructor() {
		super();
	}

	static instance: LiangCaoManager;
	static getInstance() {
		return LiangCaoManager.instance || (LiangCaoManager.instance = new LiangCaoManager());
	}

	static UPDATE_SCENE_DATA = "LiangCaoManagerUPDATE_SCENE";

	binder() {
		GGlobal.createPack("liangcao");
		let fc = fairygui.UIObjectFactory.setPackageItemExtension;
		fc(LiangCaoPersonItem.URL, LiangCaoPersonItem);
		fc(LiangCaoSceneTopPanel.URL, LiangCaoSceneTopPanel);
		fc(LiangCaoSceneBottomPanel.URL, LiangCaoSceneBottomPanel);
		fc(LiangCaoHead.URL, LiangCaoHead);
		fc(LiangCaoScoreBar.URL, LiangCaoScoreBar);
		fc(LiangCaoScoreItem.URL, LiangCaoScoreItem);
		fc(LiangCaoServerItem.URL, LiangCaoServerItem);
	}

	async enter() {
		super.enter();
		await RES.getResAsync("liangcao");
		await RES.getResAsync("liangcao_atlas0");
		this.binder();

		let self = LiangCaoManager;
		let modelMap = ModelArpgMap.getInstance();
		LiangCaoSceneTopPanel.createInstance().cShow();
		LiangCaoSceneBottomPanel.createInstance().cShow();
		ViewMainBottomUI.instance.setExitVis(false);
		modelMap.listen(Enum_MsgType.ARPG_SCENE_ADD_PLAYER, self.updateScenePlayerState, self);
		modelMap.listen(Enum_MsgType.ARPG_SCENE_ADD_NPC, self.updateScenePlayerState, self);
		modelMap.listen(Enum_MsgType.ARPG_SCENE_REMOVE_PLAYER, self.deleteRoleState, self);
		modelMap.listen(Enum_MsgType.ARPG_SCENE_REMOVE_NPC, self.deleteRoleState, self);
		GGlobal.control.listen(LiangCaoManager.UPDATE_SCENE_DATA, self.updateScene, self);
		GGlobal.socketMgr.registerReconnectHD("LiangCaoManager", Handler.create(this, this.onSocketClose));
	}

	exite() {
		super.exite();
		let self = LiangCaoManager;
		let modelMap = ModelArpgMap.getInstance();
		LiangCaoSceneTopPanel.createInstance().cHide();
		LiangCaoSceneBottomPanel.createInstance().cHide();
		GGlobal.socketMgr.removeReconnectHD("LiangCaoManager");
		GGlobal.control.remove(LiangCaoManager.UPDATE_SCENE_DATA, self.updateScene, self);
		modelMap.remove(Enum_MsgType.ARPG_SCENE_ADD_PLAYER, self.updateScenePlayerState, self);
		modelMap.remove(Enum_MsgType.ARPG_SCENE_ADD_NPC, self.updateScenePlayerState, self);
		modelMap.remove(Enum_MsgType.ARPG_SCENE_REMOVE_PLAYER, self.deleteRoleState, self);
		modelMap.remove(Enum_MsgType.ARPG_SCENE_REMOVE_NPC, self.deleteRoleState, self);
		self.playerStateDic = {};
	}

	private onSocketClose() {
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
		console.log("粮草 断开中央服");
	}

	/**后端无法实现状态伴随。前端帮做吧*/
	static playerStateDic = {};
	static updateScenePlayerState() {
		let dic = LiangCaoManager.playerStateDic;
		for (let i in dic) {
			let data = dic[i];
			let state = data.state;
			let cd = data.cd;
			let role = GameUnitManager.findUnitByID(i);
			if (role) {
				//先移除状态显示插件
				role.removePlugBytype(ArpgRoleStatePlug);
				switch (state) {
					case 0:
					break;
					case 1:
						let plug: ArpgRoleStatePlug = ArpgRoleStatePlug.create(role);
						role.addSinglePlug(plug, ArpgRoleStatePlug);
						plug.setState(3);
					break;
					case 2:
					case 3:
					case 4:
						let plug2: ArpgRoleStatePlug = ArpgRoleStatePlug.create(role);
						role.addSinglePlug(plug2, ArpgRoleStatePlug);
						plug2.setState(1);
						break;
					case 5:
						let plug1 = ArpgRoleStatePlug.create(role);
						role.addSinglePlug(plug1, ArpgRoleStatePlug);
						plug1.setState(2);
						let isMine = Model_player.isMineID(i);
						if (isMine) {
							RevivePanel.showView(UIConst.LIANGCAO);
						}
						break;
				}
				delete LiangCaoManager.playerStateDic[i];
			}
		}
	}
	static updateScene(data) {
		if (data > 0) {
			LiangCaoManager.deleteRoleState(data);
		} else {
			LiangCaoManager.updateScenePlayerState();
		}
	}

	static deleteRoleState(id) {
		delete LiangCaoManager.playerStateDic[id];
	}
}