class ViewMoneyTree extends UIModalPanel {

	public frame: fairygui.GLabel;
	public lbName: fairygui.GLabel;
	public n2: fairygui.GLabel;
	public n6: fairygui.GLabel;
	public n10: fairygui.GLabel;
	public lbLevel: fairygui.GLabel;
	public imgTree: fairygui.GLoader;
	public btnYao: fairygui.GButton;
	public lbTime: fairygui.GRichTextField;
	public lbFull: fairygui.GRichTextField;
	public lbFullAtt: fairygui.GRichTextField;
	public imgFull: fairygui.GImage;
	public groupFull: fairygui.GGroup;
	public n13: ViewResource;
	public n18: fairygui.GImage;
	public n19: fairygui.GImage;
	public lbNow: fairygui.GRichTextField;
	public lbNext: fairygui.GRichTextField;
	public lbNowAtt: fairygui.GRichTextField;
	public lbNextAtt: fairygui.GRichTextField;
	public lbItem: fairygui.GRichTextField;
	public lbCondition: fairygui.GRichTextField;
	public btnLevelup: fairygui.GButton;
	public groupAtt: fairygui.GGroup;
	public btnLeft: fairygui.GButton;
	public btnRight: fairygui.GButton;

	public static URL: string = "ui://y0plc878ye035";

	public static createInstance(): ViewMoneyTree {
		return <ViewMoneyTree><any>(fairygui.UIPackage.createObject("home", "ViewMoneyTree"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		const self = this;
		self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewMoneyTree").asCom;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	yaoHD = () => {
		GGlobal.homemodel.CG_House_shakeTree_11111();
	}

	isMaxLevel = 0;
	isEnoungh = true;
	UpHD = () => {
		if (!this.isEnoungh) {
			ViewCommonWarn.text("材料不足");
			return;
		}

		GGlobal.homemodel.CG_House_upDecorateLv_11109(HomeModel.MONEY_TREE);
	}

	update = () => {
		const self = this;
		const model = GGlobal.homemodel;
		let id = model.getBuildCfgIDByType(HomeModel.MONEY_TREE);
		let level = 0;
		let lib = Config.fdzssj_019;
		let cfg = lib[id];
		self._cfgid = self.nowCFGID = id;
		let godLib = Config.fdyqs_019[id];
		let godNextLib = Config.fdyqs_019[id + 1];
		self.lbFull.text = self.lbNow.text = "摇钱基数：" + godLib.xiaxian + "-" + godLib.shangxian + "元宝"
		if (godNextLib) {
			self.lbNext.text = "摇钱基数：" + godNextLib.xiaxian + "-" + godNextLib.shangxian + "元宝"
		}

		let nameStr = HtmlUtil.makeRowText(cfg.zsmz);
		self.lbName.text = nameStr;
		self.lbLevel.text = HomeModel.getFurnitureLevel(id) + "级";
		self.n2.text = cfg.zhanli + "";
		self.lbFullAtt.text = self.lbNowAtt.text = ConfigHelp.makeAttrTextArr(cfg.shuxing);

		IconUtil.setImg(self.imgTree, Enum_Path.HOME_URL + cfg.moxing + ".png");
		let nextCFG = lib[id + 1];
		self.n13.visible = Boolean(nextCFG);
		self.lbCondition.visible = !Boolean(nextCFG);
		self.isEnoungh = true;
		if (nextCFG) {
			let items = JSON.parse(cfg.xiaohao);
			self.lbNextAtt.text = ConfigHelp.makeAttrTextArr(nextCFG.shuxing);
			let itemcount = Model_Bag.getItemCount(items[0][1]);
			self.n13.setLb(itemcount, items[0][2]);
			self.n13.setItemId(items[0][1]);
			self.lbItem.text = ConfigHelp.getItemColorName(items[0][1]);
			self.isEnoungh = itemcount >= items[0][2];
			self.groupAtt.visible = true;
			self.groupFull.visible = false;
		} else {
			self.groupAtt.visible = false;
			self.groupFull.visible = true;
		}

		let max = model.buildTopLvel;
		if (max <= level) {
			self.lbCondition.text = "府邸" + (model.home_level + 1) + "级可继续升级";
		}

		self.showCFG(0);

		self.btnLevelup.visible = model.isSelfHome;
		self.btnYao.visible  = model.isSelfHome;
		self.lbItem.visible  = model.isSelfHome;
		self.n13.visible  = model.isSelfHome;
	}

	_cfgid = 0;
	nowCFGID = 0;
	showCFG = (v) => {
		let self = this;
		if (self.nowCFGID) {
			let lib = Config.fdzssj_019[self.nowCFGID];
			let nowModel = lib.moxing;
			let showDJ = lib.mxdj;
			let dj = Config.fdzssj_019[self._cfgid].mxdj;;
			if (v != 0) {
				let testid = self.nowCFGID + v;
				for (var i = 0; i < 100; i++) {
					if (Config.fdyqs_019[testid] && Config.fdzssj_019[testid]) {
						if (nowModel != Config.fdzssj_019[testid].moxing) {
							self.nowCFGID = testid;
							let godNextLib = Config.fdzssj_019[testid];
							IconUtil.setImg(self.imgTree, Enum_Path.HOME_URL + godNextLib.moxing + ".png");
							showDJ = godNextLib.mxdj;
							self.btnLevelup.enabled = dj == showDJ;
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

	timeUpdate() {
		const self = this;
		let serverT = Model_GlobalMsg.getServerTime();
		let last = GGlobal.homemodel.nextHitTreeTime;
		let time = last - serverT;
		let model = GGlobal.homemodel;
		if (Config.fddc_019[model.home_type].yqsbs == 0) {
			self.lbTime.text = "府邸档次为普通民居可摇钱";
			self.lbTime.color = Color.REDINT;
		} else {
			if (time > 0) {
				self.lbTime.text = DateUtil.getHMSBySecond(Math.floor(time / 1000)) + "后可摇钱";
			} else {
				self.lbTime.text = "当前可摇钱";
			}
			self.lbTime.color = Color.GREENINT;
		}
	}


	leftHD = () => {
		this.showCFG(-1);
	}

	rightHD = () => {
		this.showCFG(1);
	}

	/**
	 * 传入1是注册事件 0为移除
	 */
	public eventFunction(type) {
		const self = this;
		EventUtil.register(type, self.btnLevelup, EventUtil.TOUCH, self.UpHD, self);
		EventUtil.register(type, self.btnYao, EventUtil.TOUCH, self.yaoHD, self);
		EventUtil.register(type, self.btnLeft, EventUtil.TOUCH, self.leftHD, self);
		EventUtil.register(type, self.btnRight, EventUtil.TOUCH, self.rightHD, self);
	}

	onShown() {
		const self = this;
		const control = GGlobal.control;
		self.update();
		self.btnLevelup.enabled = true;
		Timer.listen(self.timeUpdate, self, 1000);
		control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
		control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		GGlobal.modelPlayer.listen(Model_player.YUANBAO_UPDATE, self.update, self);
	}

	onHide() {
		const self = this;
		const control = GGlobal.control;
		Timer.remove(self.timeUpdate, self);
		control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		control.remove(UIConst.HOME_LEVELUP_UI, self.update, self);
		control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
		GGlobal.modelPlayer.remove(Model_player.YUANBAO_UPDATE, self.update, self);
		GGlobal.layerMgr.close(UIConst.HOME_MONEYTREE_UI);
	}
}