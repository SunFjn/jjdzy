class ViewFurnitureLevelUp extends UIModalPanel {

	public frame: fairygui.GLabel;
	public n1: fairygui.GLabel;
	public lbName: fairygui.GLabel;
	public img: fairygui.GLoader;
	public n4: fairygui.GLabel;
	public lbLevel: fairygui.GLabel;
	public lbNow: fairygui.GRichTextField;
	public lbNext: fairygui.GRichTextField;
	public n7: ViewResource;
	public btnLevelup: fairygui.GButton;
	public lbItem: fairygui.GRichTextField;
	public lbCondition: fairygui.GRichTextField;
	public n14: fairygui.GImage;
	public groupAtt: fairygui.GGroup;
	public imgYMJ: fairygui.GImage;
	public lbFull: fairygui.GRichTextField;
	public groupFull: fairygui.GGroup;
	public btnLeft: fairygui.GButton;
	public btnRight: fairygui.GButton;
	public lbxixi: fairygui.GRichTextField;

	public static URL: string = "ui://y0plc878ye034";
	public static createInstance(): ViewFurnitureLevelUp {

		return <ViewFurnitureLevelUp><any>(fairygui.UIPackage.createObject("home", "ViewFurnitureLevelUp"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		const self = this;
		self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewFurnitureLevelUp").asCom;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	update = () => {
		const self = this;
		const model = GGlobal.homemodel;
		let id = self.cfg_id;
		id = model.getBuildCfgIDByType(self.cfgType);
		let level = 0;
		let lib = Config.fdzssj_019;
		let cfg = lib[id];

		self._cfgid = self.nowCFGID = id;

		let nameStr = HtmlUtil.makeRowText(cfg.zsmz);
		self.lbName.text = nameStr;
		self.lbLevel.text = HomeModel.getFurnitureLevel(id) + "级";
		self.n1.text = cfg.zhanli + "";
		self.lbFull.text = self.lbNow.text = ConfigHelp.makeAttrTextArr(cfg.shuxing);

		self.lbxixi.text = "";

		IconUtil.setImg(self.img, Enum_Path.HOME_URL + cfg.moxing + ".png");
		let nextCFG = lib[id + 1];
		self.lbCondition.visible = !Boolean(nextCFG);
		if (nextCFG) {
			let items = JSON.parse(cfg.xiaohao);
			self.lbNext.text = ConfigHelp.makeAttrTextArr(nextCFG.shuxing);
			self.n7.setLb(Model_Bag.getItemCount(items[0][1]), items[0][2]);
			self.lbItem.text = ConfigHelp.getItemColorName(items[0][1]);
			self.n7.setItemId(items[0][1]);
			self.groupAtt.visible = true;
			self.groupFull.visible = false;
		} else {//已经满级
			self.groupAtt.visible = false;
			self.groupFull.visible = true;
		}
		let homeLib = Config.fdsj_019[model.home_level];
		let max = homeLib.zhuangshi;
		if (max >= level) {
			self.lbCondition.text = "府邸" + (model.home_level + 1) + "级可继续升级";
		}

		self.showCFG(0);
		self.btnLevelup.visible = model.isSelfHome;
		self.lbItem.visible = model.isSelfHome;
		self.n7.visible = model.isSelfHome;
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
			let lastType = lib.zslx;
			if (v != 0) {
				let testid = self.nowCFGID + v;
				for (var i = 0; i < 100; i++) {
					if (Config.fdzssj_019[testid] && lastType == Config.fdzssj_019[testid].zslx) {
						if (nowModel != Config.fdzssj_019[testid].moxing) {
							self.nowCFGID = testid;
							let godNextLib = Config.fdzssj_019[testid];
							IconUtil.setImg(self.img, Enum_Path.HOME_URL + godNextLib.moxing + ".png");
							showDJ = godNextLib.mxdj;
							self.lbName.text = HtmlUtil.makeRowText(godNextLib.zsmz);
							if (dj < showDJ) {
								self.lbxixi.text = godNextLib.zsdj + "级后可使用";
							} else {
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

	levelupHD = () => {
		GGlobal.homemodel.CG_House_upDecorateLv_11109(this.cfgType);
	}

	public eventFunction(type) {
		const self = this;
		const event = EventUtil.register;
		event(type, self.btnLevelup, EventUtil.TOUCH, self.levelupHD, self);
		event(type, self.btnLeft, EventUtil.TOUCH, self.leftHD, self);
		event(type, self.btnRight, EventUtil.TOUCH, self.rightHD, self);
	}

	//装饰表的ID
	cfg_id = 0;
	//装饰分类表的类型
	cfgType = 0;
	onShown() {
		const self = this;
		self.cfg_id = Number(self._args);
		self.cfgType = HomeModel.getBuildType(self.cfg_id);
		self.cfg_id = HomeModel.getFurnitureLevelByNpcId(self.cfg_id);
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
		IconUtil.setImg(self.img, null);
		self.n7.setItemId(0);
		GGlobal.layerMgr.close(UIConst.HOME_JIAJU_UI);
		const control = GGlobal.control;
		control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
		control.remove(UIConst.HOME_LEVELUP_UI, self.update, self);
		control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
		GGlobal.modelPlayer.remove(Model_player.YUANBAO_UPDATE, self.update, self);
	}
}