class ViewTianGongLu extends UIModalPanel {

	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public tab0: fairygui.GButton;
	public tab1: fairygui.GButton;
	public lbName: fairygui.GLabel;
	public n6: fairygui.GLabel;
	public imgTree: fairygui.GLoader;
	public n10: fairygui.GLabel;
	public n14: fairygui.GLabel;
	public lbLevel: fairygui.GLabel;
	public lbFull: fairygui.GRichTextField;
	public lbFullAtt: fairygui.GRichTextField;
	public n57: fairygui.GImage;
	public groupFull: fairygui.GGroup;
	public lbNow: fairygui.GRichTextField;
	public lbNext: fairygui.GRichTextField;
	public lbNowAtt: fairygui.GRichTextField;
	public lbNextAtt: fairygui.GRichTextField;
	public lbItem: fairygui.GRichTextField;
	public lbxixi: fairygui.GRichTextField;
	public n17: ViewResource;
	public btnLevelup: fairygui.GButton;
	public n53: fairygui.GImage;
	public n54: fairygui.GImage;
	public groupAtt: fairygui.GGroup;
	public page0: fairygui.GGroup;
	public n47: fairygui.GLoader;
	public n23: fairygui.GRichTextField;
	public lbCurrentPool: fairygui.GRichTextField;
	public n26: TianGongLuItem;
	public n27: TianGongLuItem;
	public n28: TianGongLuItem;
	public n29: TianGongLuItem;
	public n30: TianGongLuItem;
	public n31: TianGongLuItem;
	public n32: TianGongLuItem;
	public n42: TianGongLuItem;
	public n35: fairygui.GButton;
	public bg: fairygui.GImage;
	public lbScore: fairygui.GRichTextField;
	public n38: fairygui.GRichTextField;
	public btnGO: fairygui.GButton;
	public lbCount: fairygui.GRichTextField;
	public n46: fairygui.GImage;
	public n25: fairygui.GRichTextField;
	public n48: fairygui.GImage;
	public n49: fairygui.GRichTextField;
	public btnLog: fairygui.GButton;
	public n50: fairygui.GImage;
	public page1: fairygui.GGroup;
	public btnLeft: fairygui.GButton;
	public btnRight: fairygui.GButton;

	public static URL: string = "ui://y0plc878ye036";

	public static createInstance(): ViewTianGongLu {
		return <ViewTianGongLu><any>(fairygui.UIPackage.createObject("home", "ViewTianGongLu"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	private __awardsViewGrid: TianGongLuItem[] = [];
	protected childrenCreated(): void {
		const self = this;
		self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewTianGongLu").asCom;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
		self.n25.text = HtmlUtil.createLink("奖励预览", true);
		self.__awardsViewGrid = [self.n26, self.n27, self.n28, self.n29, self.n30, self.n31, self.n32, self.n42];
	}

	isEnough = true;
	UpHD = () => {
		if (!this.isEnough) {
			ViewCommonWarn.text("材料不足");
			return;
		}
		GGlobal.homemodel.CG_House_upDecorateLv_11109(HomeModel.TIANGONGLU);
	}

	page0Update = () => {
		const self = this;
		const model = GGlobal.homemodel;
		let id = model.getBuildCfgIDByType(HomeModel.TIANGONGLU);
		let level = 0;
		let lib = Config.fdzssj_019;
		let cfg = lib[id];

		self._cfgid = self.nowCFGID = id;

		let godLib = Config.fdtgl_019[id];
		let godNextLib = Config.fdtgl_019[id + 1];
		self.lbFull.text = self.lbNow.text = "巧夺天工次数：" + godLib.cishu + "次"
		if (godNextLib) {
			self.lbNext.text = "巧夺天工次数：" + godNextLib.cishu + "次"
		}

		let nameStr = HtmlUtil.makeRowText(cfg.zsmz);
		self.lbName.text = nameStr;
		self.lbLevel.text = HomeModel.getFurnitureLevel(id) + "级";
		self.n6.text = cfg.zhanli + "";
		self.lbFullAtt.text = self.lbNowAtt.text = ConfigHelp.makeAttrTextArr(cfg.shuxing);

		IconUtil.setImg(self.imgTree, Enum_Path.HOME_URL + cfg.moxing + ".png");
		let nextCFG = lib[id + 1];
		self.lbNext.visible = Boolean(nextCFG);
		self.lbNextAtt.visible = Boolean(nextCFG);
		self.isEnough = true;
		if (nextCFG) {
			let items = JSON.parse(cfg.xiaohao);
			self.lbNextAtt.text = ConfigHelp.makeAttrTextArr(nextCFG.shuxing);
			let itemCOunt = Model_Bag.getItemCount(items[0][1]);
			self.n17.setLb(itemCOunt, items[0][2]);
			self.n17.setItemId(items[0][1]);
			self.lbItem.text = ConfigHelp.getItemColorName(items[0][1]);
			self.isEnough = itemCOunt >= items[0][2];
			self.groupAtt.visible = true;
			self.groupFull.visible = false;
		} else {
			self.groupAtt.visible = false;
			self.groupFull.visible = true;
		}
		self.btnLevelup.visible = model.isSelfHome;
		self.showCFG(0);
		self.lbxixi.text = "";
	}


	private _awards = [];
	page1Update = () => {
		const self = this;
		const model = GGlobal.homemodel;
		let id = Number(self._args);
		let cfg = Config.fddc_019[model.home_type];
		let score = cfg.tglxh;
		self.lbCurrentPool.text = "当前奖池：" + cfg.jcmz;
		self.lbCount.text = '今日剩余抽取次数：' + model.lucky_count;
		self.lbCount.color = model.lucky_count != 0 ? Color.GREENINT : Color.REDINT;
		self.lbScore.text = ConfigHelp.numToStr(model.score) + "/" + ConfigHelp.numToStr(score);
		self.lbScore.color = model.score >= score ? Color.GREENINT : Color.REDINT;

		self._awards = ConfigHelp.makeItemListArr(cfg.qdzs);
		for (let i = 0; i < 8; i++) {
			self.__awardsViewGrid[i].grid.vo = self._awards[i];
			self.__awardsViewGrid[i].grid.tipEnabled = true;
			self.__awardsViewGrid[i].grid.showEff(true);
		}
		IconUtil.setImg(self.n47, Enum_Path.BACK_URL + "tgl.jpg");
	}

	openBag = () => {
		const self = this;
		GGlobal.layerMgr.open(UIConst.HOME_TIANGONG_bag_UI);
	}

	openPreView = () => {
		GGlobal.layerMgr.open(UIConst.HOME_PRE);
	}

	update = () => {
		const self = this;
		if (self.c1.selectedIndex == 0) {
			self.page0Update();
			self.frame.text = "天工炉升级";
		} else {
			self.page1Update();
			self.frame.text = "天工造物";
		}
	}

	luckyHD = () => {
		if(TimeUitl.cool("CG_House_drawAward_11115",1000)){
			GGlobal.homemodel.CG_House_drawAward_11115();
		}
	}


	private awards = [];
	turnBack = (items) => {
		const self = this;
		const model = GGlobal.homemodel;
		let id = Number(self._args);
		let cfg = Config.fddc_019[model.home_type];
		let score = cfg.tglxh;
		self.lbCount.text = '今日剩余抽取次数：' + model.lucky_count;
		self.lbScore.text = ConfigHelp.numToStr(model.score) + "/" + ConfigHelp.numToStr(score);
		let pos = (Math.random()*6)>>0;
		this.awards=ConfigHelp.makeItemListArr([items]);
		// for (let i = 0; i < 8; i++) {
		// 	let vo = self.__awardsViewGrid[i].grid.vo;
		// 	if (vo.id == items[1]) {
		// 		pos = i;
		// 		this.awards = [vo];
		// 		break;
		// 	}
		// }
		egret.Tween.get(this).to({ xx: pos + 8 }, 1200).call(self.overTurn, self);
	}

	_xx = 0;
	set xx(v) {
		let self = this;
		v = v >> 0;
		v = v % 8;
		for (let i = 0; i < 8; i++) {
			self.__awardsViewGrid[i].showBg(i == v);
		}
		this._xx = v;
	}

	get xx() {
		return this._xx;
	}

	overTurn() {
		let self = this;
		for (let i = 0; i < 8; i++) {
			self.__awardsViewGrid[i].showBg(false);
		}
		this._xx = 0;

		View_Reward_Show4.show(UIConst.HOME, "再來一次", Handler.create(self, () => {
			GGlobal.homemodel.CG_House_drawAward_11115();
		}), this.awards, () => {
			let t_color = Color.GREENSTR;
			if (GGlobal.homemodel.lucky_count <= 0)
				t_color = Color.REDSTR;
			let t_countStr = HtmlUtil.font(GGlobal.homemodel.lucky_count + "", t_color);
			return `抽奖剩余次数：${t_countStr}`;
		}, self);
	}

	openLog = () => {
		GGlobal.layerMgr.open(UIConst.HOME_LOG_UI, 2);
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
			let dj = Config.fdzssj_019[self._cfgid].mxdj;;
			if (v != 0) {
				let testid = self.nowCFGID + v;
				for (var i = 0; i < 100; i++) {
					if (Config.fdtgl_019[testid] && Config.fdzssj_019[testid]) {
						if (nowModel != Config.fdzssj_019[testid].moxing) {
							self.nowCFGID = testid;
							let godNextLib = Config.fdzssj_019[testid];
							IconUtil.setImg(self.imgTree, Enum_Path.HOME_URL + godNextLib.moxing + ".png");
							showDJ = godNextLib.mxdj;
							if (dj < showDJ) self.lbxixi.text = godNextLib.zsdj + "级后可使用";
							else self.lbxixi.text = "";
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
		EventUtil.register(type, self.btnLevelup, EventUtil.TOUCH, self.UpHD, self);
		EventUtil.register(type, self.n35, EventUtil.TOUCH, self.openBag, self);
		EventUtil.register(type, self.btnGO, EventUtil.TOUCH, self.luckyHD, self);
		EventUtil.register(type, self.n25, EventUtil.LINK, self.openPreView, self);
		EventUtil.register(type, self.c1, fairygui.StateChangeEvent.CHANGED, self.update, self);
		EventUtil.register(type, self.btnLog, EventUtil.TOUCH, self.openLog, self);
		EventUtil.register(type, self.btnLeft, EventUtil.TOUCH, self.leftHD, self);
		EventUtil.register(type, self.btnRight, EventUtil.TOUCH, self.rightHD, self);
	}

	onShown() {
		const self = this;
		if (GGlobal.homemodel.isSelfHome) {
			self.c1.setSelectedIndex(0);
			self.tab0.visible = true;
		} else {
			self.c1.setSelectedIndex(1);
			self.tab0.visible = false;
		}
		self.update();
		self.btnLog.visible = Model_player.isMineID(GGlobal.homemodel.home_masterID);
		const control = GGlobal.control;
		control.listen(HomeModel.HOME_UI_DATA_RE, self.update, self);
		control.listen(HomeModel.CHOUJIANG_RE, self.turnBack, self);
		control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
		control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		GGlobal.modelPlayer.listen(Model_player.YUANBAO_UPDATE, self.update, self);
	}

	onHide() {
		const self = this;

		const control = GGlobal.control;
		control.remove(HomeModel.CHOUJIANG_RE, self.turnBack, self);
		control.remove(HomeModel.HOME_UI_DATA_RE, self.update, self);
		control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		control.remove(UIConst.HOME_LEVELUP_UI, self.update, self);
		control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
		GGlobal.modelPlayer.remove(Model_player.YUANBAO_UPDATE, self.update, self);

		for (let i = 0; i < 8; i++) {
			self.__awardsViewGrid[i].grid.vo = null;
		}
		egret.Tween.removeTweens(this);
		GGlobal.layerMgr.close(UIConst.HOME_TIANGONG_UI);
		IconUtil.setImg(self.n47, null);
	}
}