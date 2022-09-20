class HomeManager extends BaseARPGManager {
	/**家园场景管理器*/
	public constructor() {
		super();
	}

	static instance: HomeManager;
	static getInstance() {
		return HomeManager.instance || (HomeManager.instance = new HomeManager());
	}

	binder() {
		GGlobal.createPack("home");
		let fc = this.setPackageItemExtension;
		fc(HomeUI);
		fc(PoolPreItem);
		fc(TianGongItem);
		fc(HomeUI);
		fc(TianGongItem);
		fc(TianGongLuItem);
		fc(ItemHomeRank);
		fc(ItemLog);
		fc(ChildMoneyTreeProgress);
		fc(ChildHomeEventTip);
		fc(ChildFurnitureName);
		fc(VHomeBtnMaid);
		fc(VHomeBtnMaidWel);
		fc(TianGLPlug);
	}

	//院子和庭院做区分
	async enter() {
		super.enter();
		await RES.getResAsync("home");
		await RES.getResAsync("home_atlas0");
		this.binder();
		GGlobal.mainUICtr.setState(MainUIController.HOME);
		HomeUI.show();
		const self = this;
		self.updateScene();
		let reddot = GGlobal.reddot;
		GGlobal.control.listen(HomeModel.HOME_SCENE_UPDATE, self.updateScene, self);
		GGlobal.control.listen(Enum_MsgType.ARPG_SCENE_ADD_NPC, self.updateScene, self);
		reddot.listen(UIConst.HOME_JIADING, self.updateJiaDing, self);
		Timer.listen(self.timeUpdate, self, 4000);
	}

	exite() {
		super.exite();
		HomeUI.hide();
		const self = this;
		let reddot = GGlobal.reddot;
		GGlobal.control.remove(HomeModel.HOME_SCENE_UPDATE, self.updateScene, self);
		GGlobal.control.remove(Enum_MsgType.ARPG_SCENE_ADD_NPC, self.updateScene, self);
		reddot.listen(UIConst.HOME_JIADING, self.updateJiaDing, self);
		Timer.remove(self.timeUpdate, self);
		GGlobal.layerMgr.close2(UIConst.MAP);
	}

	timeUpdate(){
		if(HomeModel.isTimeIn()){
			GGlobal.homemodel.CG_House_outHouse_11103();
			ViewCommonWarn.text("府邸数据重置中,0:06开启");
		}
	}

	updateJiaDing() {
		const model = GGlobal.homemodel;
		if(!model.isSelfHome){
			return;
		}
		let list = GameUnitManager.list;
		for (let i = 0; i < list.length; i++) {
			let role = list[i];
			if (role) {
				if (role instanceof ARPGNpc) {
					//金库事件货币收取事件 别人家的需要读取常数表计算
					let cfgID = (role as ARPGNpc).cfgID;
					let per = ConfigHelp.getSystemNum(7114);
					let npcLib = Config.NPC_200[cfgID];
					if (npcLib.type == Enum_NpcType.JIADING) {
						if (GGlobal.modelHouseKeeper.jdID) {
							role.removePlugBytype(ChildHomeEventTip);
							let v = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING);
							if (v) {
								let plug: ChildHomeEventTip = ChildHomeEventTip.create(role);
								role.addSinglePlug(plug, ChildHomeEventTip);
								plug.setJiaDingState();
							}
						}
						break;
					}
				}
			}
		}
	}

	updateScene() {
		if (!HomeModel.inHome) {
			return;
		}
		const self = this;
		const model = GGlobal.homemodel;
		let list = GameUnitManager.list;
		for (let i = 0; i < list.length; i++) {
			let role = list[i];
			if (role) {
				if (role instanceof ARPGNpc) {
					let cfgID = (role as ARPGNpc).cfgID;
					if (cfgID == HomeModel.NPC_JINKU) {
						let plug: ChildMoneyTreeProgress = ChildMoneyTreeProgress.create(role);
						role.addSinglePlug(plug, ChildMoneyTreeProgress);
					}

					role.removePlugBytype(TianGLPlug);
					if (cfgID == HomeModel.NPC_TGL && !model.isSelfHome) {
						let plug: TianGLPlug = TianGLPlug.create(role);
						role.addSinglePlug(plug, TianGLPlug);
					}
					
					let buildId = HomeModel.getFurnitureLevelByNpcId(cfgID);
					let lib: Ifdzssj_019;
					if (buildId) {
						lib = Config.fdzssj_019[buildId];
					}
					//其他随机事件
					role.removePlugBytype(ChildHomeEventTip);
					if (GGlobal.homemodel.getRoleEventState(cfgID) && ((model.isSelfHome &&model.remaindEventAward)||(!model.isSelfHome &&model.helpTime))) {
						let plug: ChildHomeEventTip = ChildHomeEventTip.create(role);
						role.addSinglePlug(plug, ChildHomeEventTip);
						if (buildId) {
							plug.setPos(lib.sjwz);
						}
					}

					role.removePlugBytype(ChildFurnitureName);

					let npcLib = Config.NPC_200[cfgID];
					if (npcLib.type == Enum_NpcType.JIADING) {
						if (GGlobal.modelHouseKeeper.jdID) {
							let lib = Config.jdjins_021[GGlobal.modelHouseKeeper.jdID];
							(role as ARPGNpc).setBody(lib.moxing);
							(role as ARPGNpc).setName(lib.mingzi);

							role.removePlugBytype(ChildHomeEventTip);
							let v = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING);
							if (v && model.isSelfHome) {
								let plug: ChildHomeEventTip = ChildHomeEventTip.create(role);
								role.addSinglePlug(plug, ChildHomeEventTip);
								plug.setJiaDingState();
							}
						}
					} else if (buildId) {
						// (role as ARPGNpc).setName(lib.zsmz);
						(role as ARPGNpc).setBody(lib.moxing);
						//名字特殊处理
						let plug: ChildFurnitureName = ChildFurnitureName.create(role);
						plug.setPos(lib.mzwz);
						plug.setImage(lib.zslx);
						role.addSinglePlug(plug, ChildFurnitureName);
						let arr = ["", "cjzb", "zjzb", "gjzb", "hhzb"];
						if (lib[arr[model.home_type]] != "0") {
							let posArr = JSON.parse(lib[arr[model.home_type]])
							role.setXY(posArr[0][0], posArr[0][1]);
						}
					}
				}
			}
		}
	}

	static leavelHome() {
		GGlobal.layerMgr.closeAllPanel();
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
	}

	//府邸特殊家具交互
	static interaction(npc: ARPGNpc) {
		let id = npc.cfgID;
		let self = GGlobal.homemodel;
		if (TimeUitl.cool("homemodel", 1000)) {
			const layerMgr = GGlobal.layerMgr;
			if (self.isHomeMonster(id)) {
				id = 1;//强盗默认为这个玩意
			}
			switch (id) {
				case 1:
					self.CG_House_fight_11127(npc.id);
					break;
				default://随机事件需要判断点击区域
					let posx = ModelArpgMap.touchPoint.x;//stageXY
					let posy = ModelArpgMap.touchPoint.y;
					let npoint = npc.getGlobalXY();
					let nx = npoint.x;
					let ny = npoint.y;
					let eventid = self.getEventByNpcID(npc.cfgID);
					if (npc.cfgID == HomeModel.NPC_JINKU) {//征收金库
						var clz: ChildMoneyTreeProgress = npc.getPlugBytype(ChildMoneyTreeProgress);
						if (clz.displayObject.hitTestPoint(posx, posy)) {
							if (GGlobal.homemodel.isCanCollect) {
								self.CG_House_harvestMoney_11113();
							} else {
								ViewCommonWarn.text("暂无府邸币可收集");
							}
							return;
						}
					}
					if (
						((self.isSelfHome&&self.remaindEventAward > 0) ||(!self.isSelfHome&&self.helpTime > 0) )
					&& eventid) {//随机事件
						layerMgr.open(UIConst.HOME_EVENT_UI, eventid);
					} else {
						switch (npc.cfgID) {
							case HomeModel.JIADING:
								if (self.isSelfHome) {
									layerMgr.open(UIConst.HOME_JIADING);
								}
								break;
							case HomeModel.NPC_TGL:
								layerMgr.open(UIConst.HOME_TIANGONG_UI);
								break;
							case HomeModel.NPC_MONEYTREE:
								layerMgr.open(UIConst.HOME_MONEYTREE_UI);
								break;
							case HomeModel.NPC_JINKU:
								layerMgr.open(UIConst.HOME_GOD_UI);
								break;
							default:
								layerMgr.open(UIConst.HOME_JIAJU_UI, id);
								break;
						}
					}
					break;
			}
		}
	}
}