class ViewHomeGod extends UIModalPanel {

	public frame: fairygui.GLabel;
	public lbName: fairygui.GLabel;
	public n2: fairygui.GLabel;
	public imgTree: fairygui.GLoader;
	public n6: fairygui.GLabel;
	public n10: fairygui.GLabel;
	public btnLog: fairygui.GButton;
	public lbLevel: fairygui.GLabel;
	public imgFull: fairygui.GImage;
	public lbFullAtt: fairygui.GRichTextField;
	public lbfull: fairygui.GRichTextField;
	public groupFull: fairygui.GGroup;
	public lbNow: fairygui.GRichTextField;
	public lbNextAtt: fairygui.GRichTextField;
	public lbNowAtt: fairygui.GRichTextField;
	public lbNext: fairygui.GRichTextField;
	public lbxixi: fairygui.GRichTextField;
	public lbItem: fairygui.GRichTextField;
	public n13: ViewResource;
	public btnLevelup: fairygui.GButton;
	public n18: fairygui.GImage;
	public n19: fairygui.GImage;
	public groupAtt: fairygui.GGroup;
	public btnLeft: fairygui.GButton;
	public btnRight: fairygui.GButton;

	public static URL: string = "ui://y0plc878ye03b";

	public static createInstance(): ViewHomeGod {
		return <ViewHomeGod><any>(fairygui.UIPackage.createObject("home", "ViewHomeGod"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		const self = this;
		self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewHomeGod").asCom;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}
	isEnoungh = true;
	UpHD = () => {
		if (!this.isEnoungh) {
			ViewCommonWarn.text("材料不足");
			return;
		}
		GGlobal.homemodel.CG_House_upDecorateLv_11109(HomeModel.GOD_HOUSE);
	}
	update = () => {
		const self = this;
		const model = GGlobal.homemodel;
		let id = model.getBuildCfgIDByType(HomeModel.GOD_HOUSE);
		let level = 0;
		let lib = Config.fdzssj_019;
		let cfg = lib[id];

		let godLib = Config.fdjk_019[id];
		let godNextLib = Config.fdjk_019[id + 1];
		self._cfgid = self.nowCFGID = id;
		self.lbfull.text = self.lbNow.text = "最大收益时间：" + (godLib.cishu / 3600) + "小时收益"
		if (godNextLib) {
			self.lbNext.text = "最大收益时间：" + (godNextLib.cishu / 3600) + "小时收益"
		}
		self.lbxixi.text = "";

		let nameStr = HtmlUtil.makeRowText(cfg.zsmz + "");
		self.lbName.text = nameStr;
		self.lbLevel.text = HomeModel.getFurnitureLevel(id) + "级";
		self.n2.text = cfg.zhanli + "";
		self.lbFullAtt.text = self.lbNowAtt.text = ConfigHelp.makeAttrTextArr(cfg.shuxing);

		IconUtil.setImg(self.imgTree, Enum_Path.HOME_URL + cfg.moxing + ".png");
		let nextCFG = lib[id + 1];
		self.n13.visible = Boolean(nextCFG);
		self.isEnoungh = true;
		if (nextCFG) {
			let items = JSON.parse(cfg.xiaohao);
			self.lbNextAtt.text = ConfigHelp.makeAttrTextArr(nextCFG.shuxing);
			let itemCount = Model_Bag.getItemCount(items[0][1]);
			self.n13.setLb(itemCount, items[0][2]);
			self.n13.setItemId(items[0][1]);
			self.isEnoungh = itemCount >= items[0][2];
			self.lbItem.text = ConfigHelp.getItemColorName(items[0][1]);
			self.groupAtt.visible = true;
			self.groupFull.visible = false;
		} else {
			self.groupAtt.visible = false;
			self.groupFull.visible = true;
		}

		self.showCFG(0);
		self.btnLevelup.visible = model.isSelfHome;
		self.lbItem.visible = model.isSelfHome;
		self.n13.visible = model.isSelfHome;
	}

	openLog = () => {
		GGlobal.layerMgr.open(UIConst.HOME_LOG_UI, 1);
	}

	leftHD = () => {
		this.showCFG(-1);
	}

	rightHD = () => {
		this.showCFG(1);
	}

	_cfgid = 0;
	nowCFGID = 0;
	showCFG = (v) => {
		let self = this;
		if (self.nowCFGID) {
			let lib = Config.fdzssj_019[self.nowCFGID];
			let nowModel = lib.moxing;
			let showDJ = lib.mxdj;
			let dj =  Config.fdzssj_019[self._cfgid].mxdj;
			if (v != 0) {
				let testid = self.nowCFGID + v;
				for (var i = 0; i < 100; i++) {
					if (Config.fdjk_019[testid] && Config.fdzssj_019[testid]) {
						if (nowModel != Config.fdzssj_019[testid].moxing) {
							self.nowCFGID = testid;
							let godNextLib = Config.fdzssj_019[testid];
							IconUtil.setImg(self.imgTree, Enum_Path.HOME_URL + godNextLib.moxing + ".png");
							showDJ = godNextLib.mxdj;
							if (dj < showDJ) {
								self.lbxixi.text = godNextLib.zsdj + "级后可使用";
							}else {
								self.lbxixi.text = "";
								self.btnLevelup.enabled = dj == showDJ;
							}
							break;
						} else {
							testid = testid + v;
						}
					} else {
						break;
					}
				}
			}
			self.btnLeft.visible = showDJ != 1;
			self.btnRight.visible = HomeModel.getModelID(self.nowCFGID);
		}
	}


	/**
	 * 传入1是注册事件 0为移除
	 */
	public eventFunction(type) {
		const self = this;
		self.btnLog.visible = Model_player.isMineID(GGlobal.homemodel.home_masterID);
		EventUtil.register(type, self.btnLevelup, EventUtil.TOUCH, self.UpHD, self);
		EventUtil.register(type, self.btnLog, EventUtil.TOUCH, self.openLog, self);
		EventUtil.register(type, self.btnLeft, EventUtil.TOUCH, self.leftHD, self);
		EventUtil.register(type, self.btnRight, EventUtil.TOUCH, self.rightHD, self);
	}

	onShown() {
		const self = this;
		self.btnLevelup.enabled = true;
		self.update();
		const control = GGlobal.control;
		control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
		control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		GGlobal.modelPlayer.listen(Model_player.YUANBAO_UPDATE, self.update, self);
	}

	onHide() {
		const self = this;
		GGlobal.layerMgr.close(UIConst.HOME_GOD_UI);
		const control = GGlobal.control;
		control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		control.remove(UIConst.HOME_LEVELUP_UI, self.update, self);
		control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
		GGlobal.modelPlayer.remove(Model_player.YUANBAO_UPDATE, self.update, self);
	}
}