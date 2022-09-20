class ViewHome extends UIModalPanel {

	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public lbName: fairygui.GRichTextField;
	public lbCondition: fairygui.GRichTextField;
	public n3: fairygui.GLabel;
	public n4: fairygui.GLabel;
	public n5: fairygui.GLabel;
	public lbActivation: fairygui.GRichTextField;
	public lbNow: fairygui.GRichTextField;
	public lbFullAttribute: fairygui.GRichTextField;
	public lbNext: fairygui.GRichTextField;
	public lbLevel: fairygui.GLabel;
	public imgFull: fairygui.GImage;
	public n37: fairygui.GImage;
	public imgHouse: fairygui.GLoader;
	public n13: fairygui.GImage;
	public n14: fairygui.GRichTextField;
	public groupTip: fairygui.GGroup;
	public lbItem: fairygui.GRichTextField;
	public btnLevel: Button1;
	public n36: ViewResource;
	public groupLevel: fairygui.GGroup;
	public tab0: TabButton;
	public tab1: TabButton;
	public lbNowName: fairygui.GRichTextField;
	public lbNextName: fairygui.GRichTextField;
	public imgNowHouse: fairygui.GLoader;
	public imgNextHouse: fairygui.GLoader;
	public lbNowAwards: fairygui.GRichTextField;
	public lbNextAwards: fairygui.GRichTextField;
	public btnStar: Button1;
	public n29: fairygui.GLabel;
	public lbStarCondition: fairygui.GRichTextField;
	public n47: fairygui.GGroup;
	public n48: fairygui.GImage;
	public n34: ViewResource;
	public groupStar: fairygui.GGroup;
	public groupInfo: fairygui.GGroup;
	public groupNowHome: fairygui.GGroup;
	public groupNextHome: fairygui.GGroup;

	public static URL: string = "ui://y0plc878ye033";

	public static createInstance(): ViewHome {
		return <ViewHome><any>(fairygui.UIPackage.createObject("home", "ViewHome"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		const self = this;
		self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewHome").asCom;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	levelUpHD = () => {
		let model = GGlobal.homemodel;
		let conditionLV = Config.fdsj_019[model.home_level].dc;
		// if(conditionLV>model.home_type){
		// 	let cfg = Config.fddc_019[conditionLV];
		// 	ViewCommonWarn.text("请先将府邸提升至"+cfg.name);
		// }else{
		GGlobal.homemodel.CG_House_upHouseLv_11105();
		// }
	}

	levelStarHD = () => {
		GGlobal.homemodel.CG_House_upHouseDc_11107();
	}

	openPage1 = () => {
		this.tab1.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
	}

	page0Update = () => {
		const self = this;
		const model = GGlobal.homemodel;
		let fdMoney = Model_player.voMine.homeMoney;
		let level = model.home_level;
		let star = model.home_type;
		level = level ? level : 1;
		star = star ? star : 1;
		let lib = Config.fddc_019[star];
		let levelLib = Config.fdsj_019[level];
		self.lbName.text = HtmlUtil.makeRowText(lib.name);
		self.lbLevel.text = level + "级";
		IconUtil.setImg(self.imgHouse, Enum_Path.HOME_URL + lib.yuanhua + ".png");

		let color = Color.REDINT;
		self.lbCondition.text = "";
		let levelCondition = Config.fdsj_019[level].fanrongdu;
		if (levelCondition) {
			if (levelCondition <= model.home_exp) {
				color = Color.GREENINT;
			}
			self.lbCondition.text = BroadCastManager.reTxt("繁荣度达到{0}可继续升级", levelCondition);
		}
		self.lbCondition.color = color;

		let nextTipLv = lib.dengji;
		self.groupTip.visible = nextTipLv > 0 && level >= nextTipLv;

		let nextLevelLib = levelLib;
		let isfull = model.isTopLevel;
		if (!isfull) {
			nextLevelLib = Config.fdsj_019[level + 1];
		}

		//能力展示
		let homeAbility = BroadCastManager.reTxt("府邸装饰可提升到{0}级\n侍女可提升到{1}级\n家丁可提升到{2}阶{3}级\n府邸建筑可提升到{4}级", nextLevelLib.zhuangshi, nextLevelLib.shinv,
			Math.floor(nextLevelLib.jiading / 10), nextLevelLib.jiading % 10, nextLevelLib.gj);
		self.lbActivation.text = homeAbility;

		//属性显示
		self.groupInfo.visible = !isfull;
		self.lbFullAttribute.visible = isfull;
		self.imgFull.visible = isfull;
		let nowAttribute = ConfigHelp.makeAttrTextArr(levelLib.shuxing);
		self.lbFullAttribute.text = self.lbNow.text = nowAttribute;
		if (!isfull) {
			let nextAttribute = ConfigHelp.makeAttrTextArr(nextLevelLib.shuxing);
			self.lbNext.text = nextAttribute;
			let items = JSON.parse(levelLib.xiaohao);
			let itemID = items[0][1];
			let itemCount = Model_Bag.getItemCount(itemID);
			self.n36.setItemId(itemID);
			self.n36.setLb(itemCount, items[0][2]);
		}
		//战力显示
		self.n3.text = levelLib.zhanli + "";
	}

	page1Update = () => {
		const self = this;
		const model = GGlobal.homemodel;
		let fdMoney = Model_player.voMine.homeMoney;
		let star = model.home_type;
		let level = model.home_level;
		star = star ? star : 1;
		let lib = Config.fddc_019[star];
		let nextLib = Config.fddc_019[star + 1];
		let isfull = model.isTopStar;
		self.imgNextHouse.visible = self.lbNextName.visible = self.lbNextAwards.visible = !isfull;
		self.lbNowName.text = lib.name;

		self.lbStarCondition.color = level >= lib.dengji ? Color.GREENINT : Color.REDINT;
		self.lbStarCondition.text = "";

		let nowAward = JSON.parse(lib.zengjia);
		self.lbNowAwards.text = lib.wenzi;
		IconUtil.setImg(self.imgNowHouse, Enum_Path.HOME_URL + lib.yuanhua + ".png");
		if (!isfull) {
			IconUtil.setImg(self.imgNextHouse, Enum_Path.HOME_URL + nextLib.yuanhua + ".png");
			self.lbNextName.text = nextLib.name;
			self.lbNextAwards.text = nextLib.wenzi;
			let levelUpCost = JSON.parse(lib.xiaohao);
			self.n34.setImgUrl1(Enum_Path.ICON70_URL + levelUpCost[0][0] + ".png");
			// self.n34.setLb(Model_player.voMine.yuanbao, levelUpCost[0][2]);
			self.n34.color = Model_player.voMine.yuanbao >= levelUpCost[0][2] ? Color.GREENINT : Color.REDINT;
			self.n34.setCount(levelUpCost[0][2]);
		}

		self.groupNextHome.visible = !isfull;
		self.groupNowHome.x = isfull?171:32;
		self.lbStarCondition.visible = !isfull;
	}

	update() {
		const self = this;
		if (self.c1.selectedIndex == 0) {
			self.frame.text = "府邸升级";
			self.page0Update();
		} else {
			self.frame.text = "府邸档次";
			self.page1Update();
		}
		const model = GGlobal.homemodel;
		self.btnLevel.visible = model.isSelfHome;
		self.btnStar.visible = model.isSelfHome;
		self.tab0.checkNotice = self.btnLevel.checkNotice = GGlobal.homemodel.checkHomeLevel();
		self.tab1.checkNotice = self.btnStar.checkNotice = GGlobal.homemodel.checkHomeType();
	}

	public eventFunction(type) {
		const self = this;
		const event = EventUtil.register;
		event(type, self.btnLevel, EventUtil.TOUCH, self.levelUpHD, self);
		event(type, self.btnStar, EventUtil.TOUCH, self.levelStarHD, self);
		event(type, self.n13, EventUtil.TOUCH, self.openPage1, self);
		event(type, self.c1, fairygui.StateChangeEvent.CHANGED, self.update, self);
	}

	onShown() {
		const self = this;
		const control = GGlobal.control;
		self.update();
		control.listen(UIConst.HOME_LEVELUP_UI, self.update, self);
		control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
		control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		GGlobal.modelPlayer.listen(Model_player.YUANBAO_UPDATE, self.update, self);
	}

	onHide() {
		const self = this;
		self.n36.setItemId(0);
		IconUtil.setImg(self.imgHouse, null);
		IconUtil.setImg(self.imgNextHouse, null);
		IconUtil.setImg(self.imgNowHouse, null);
		const control = GGlobal.control;
		control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		control.remove(UIConst.HOME_LEVELUP_UI, self.update, self);
		control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
		GGlobal.modelPlayer.remove(Model_player.YUANBAO_UPDATE, self.update, self);
		GGlobal.layerMgr.close(UIConst.HOME_LEVELUP_UI);
	}
}