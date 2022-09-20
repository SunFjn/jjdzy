class ChildGodWuJiangXiuLian extends fairygui.GComponent implements IPanel {

	public n44: fairygui.GLoader;
	public n1: fairygui.GImage;
	public icon0: fairygui.GImage;
	public icon1: fairygui.GImage;
	public icon2: fairygui.GImage;
	public icon3: fairygui.GImage;
	public icon4: fairygui.GImage;
	public icon5: fairygui.GImage;
	public icon6: fairygui.GImage;
	public n59: fairygui.GImage;
	public list: fairygui.GList;
	public n5: fairygui.GImage;
	public n6: fairygui.GRichTextField;
	public boxMax: fairygui.GGroup;
	public labPower: fairygui.GLabel;
	public labAttrMax: fairygui.GRichTextField;
	public imgArrow: fairygui.GImage;
	public n15: fairygui.GLabel;
	public labCost: fairygui.GTextField;
	public btnUp: Button1;
	public n27: fairygui.GImage;
	public starPowerLb: fairygui.GTextField;
	public n29: fairygui.GGroup;
	public n34: fairygui.GImage;
	public imgItem: fairygui.GLoader;
	public btnBreach: Button1;
	public lbCount: fairygui.GRichTextField;
	public starGroup: fairygui.GGroup;
	public lbNowScore: fairygui.GRichTextField;
	public lbNextScore: fairygui.GRichTextField;
	public n47: fairygui.GImage;
	public n48: fairygui.GImage;
	public lbLevel: fairygui.GRichTextField;
	public labAttrCur: fairygui.GRichTextField;
	public labAttrNext: fairygui.GRichTextField;
	public n49: fairygui.GLoader;
	public n60: fairygui.GImage;

	public static URL: string = "ui://zyx92gzwnlyo4l";
	public static createInstance(): ChildGodWuJiangXiuLian {
		return <ChildGodWuJiangXiuLian><any>(fairygui.UIPackage.createObject("wuJiang", "ChildGodWuJiangXiuLian"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHander;
		self.list.setVirtual();
		self._icons = [self.icon0, self.icon1, self.icon2, self.icon3, self.icon4, self.icon5, self.icon6];
	}

	private renderHander(index: number, obj: fairygui.GObject): void {
		var gird: VWuJiangGrid = obj as VWuJiangGrid;
		gird.vo = this._listData[index];
	}

	private _listData;
	private _curVO: Ihero_211;
	private _icons: fairygui.GImage[] = [];
	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	//神将 一重=普通武将升星1星
	update = () => {
		let self = this;
		self.setListData();
		let m = GGlobal.modelGodWuJiang;
		let job = self._curVO.type;
		let currentData = ModelGodWuJiang.getGodDataByID(job);
		let skills = JSON.parse(self._curVO.skills);
		let currentLevel = currentData.xiulianLv;//当前修炼等级
		currentLevel = currentLevel == 0 ? 8000 : currentLevel;
		let godwujiangCFG: Igodheroxl_289 = Config.godheroxl_289[currentLevel];
		let chong = 0;
		let jie = 0;
		let realLevel = 0;
		if (currentData) {
			realLevel = currentLevel % 1000;
			jie = realLevel % 10;
			chong = (realLevel - jie) / 10;
		}

		self.lbLevel.text = BroadCastManager.reTxt("{0}重{1}阶", chong, jie);

		for (let i = 0; i < 7; i++) {
			let icon = self._icons[i];
			icon.grayed = i >= jie;
		}

		let star = chong + 1;
		let nextStar = star;
		let score: number = 0;
		let score1: number = 0;
		var skillsArr = skills;
		let skillList = Model_player.voMine.skillList;
		let cfgids: Array<number> = JSON.parse(Config.hero_211[job].attack);
		nextStar = 8000 + (chong + 1) * 10;
		if (Config.godheroxl_289[nextStar]) {
			nextStar = chong + 2;
		} else {
			nextStar = chong + 1;
		}
		for (let i = 0; i < skillsArr.length; i++) {
			let skillVo: Vo_Skill;
			let skillVo1: Vo_Skill;
			if (skillList[cfgids.length + i]) {
				let level = skillList[cfgids.length + i].level;
				skillVo = Vo_Skill.create(skillsArr[0][0], level, star);
				if (star < nextStar) {
					skillVo1 = Vo_Skill.create(skillsArr[0][0], level, star + 1);
				}
			} else {
				skillVo = Vo_Skill.create(skillsArr[0][0], 1, star)
				if (star < nextStar) {
					skillVo1 = Vo_Skill.create(skillsArr[0][0], 1, star + 1);
				}
			}
			score += skillVo.powerAtt_lv;
			if (star < nextStar) {
				score1 += skillVo1.powerAtt_lv;
			}
		}

		self.lbNowScore.text = "当前评分\n" + HtmlUtil.fontNoSize("" + Math.ceil(score / 100000 * 600), Color.getColorStr(2));
		if (score1 != 0)
			self.lbNextScore.text = "下级评分\n" + HtmlUtil.fontNoSize("" + Math.ceil(score1 / 100000 * 600), Color.getColorStr(2));
		else
			self.lbNextScore.text = "";
		let nextLevel = Config.godheroxl_289[currentData.xiulianLv].next;
		let cfg = Config.herostar_211;
		if (nextLevel != 0) {
			let attrArr = JSON.parse(cfg[currentLevel].attr)
			self.labAttrCur.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
			self.imgArrow.visible = true;
			self.starGroup.visible = true;
			self.boxMax.visible = false;
			self.n29.visible = true;

			attrArr = JSON.parse(cfg[nextLevel].attr)
			self.labAttrNext.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
			self.starPowerLb.text = (cfg[nextLevel].power - cfg[currentLevel].power) + "";

			self.labAttrMax.text = "";
		} else {//满星
			self.boxMax.visible = true;
			self.imgArrow.visible = false;
			self.starGroup.visible = false;
			self.n29.visible = false;
			self.lbNextScore.text = "";
			self.labAttrCur.text = "";
			self.labAttrNext.text = "";
			let attrArr = JSON.parse(cfg[currentLevel].attr);
			self.labAttrMax.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
		}

		let wujiangCFG = Config.herostar_211[currentData.xiulianLv];
		self.labPower.text = "" + wujiangCFG.power;

		//消耗
		self.showbagItem();
	}

	setListData = () => {
		let self = this;
		self._listData = ModelGodWuJiang.wuJiangArr;
		self.list.numItems = self._listData.length;
		if (!self._curVO) {
			self.list.selectedIndex = 0;
			self._curVO = self._listData[0];
		}
	}

	_enough = false;
	showbagItem = () => {
		let self = this;
		let m = GGlobal.modelGodWuJiang;
		if (!self._curVO) {
			return;
		}
		let currentData = ModelGodWuJiang.getGodDataByID(self._curVO.type);
		let currentLevel = currentData.xiulianLv;//当前修炼等级
		let godwujiangCFG: Igodheroxl_289 = Config.godheroxl_289[currentLevel];

		let item;
		let needCount;
		if (godwujiangCFG.conmuse == "0") {//正在突破
			self.btnBreach.visible = true;
			self.btnUp.visible = false;
			item = JSON.parse(self._curVO.activation);
			needCount = godwujiangCFG.tp;
		} else {
			self.btnUp.visible = true;
			self.btnBreach.visible = false;
			item = JSON.parse(godwujiangCFG.conmuse);
			needCount = item[0][2];
		}

		let itemid = item[0][1];
		let itemcfg = Config.daoju_204[itemid];
		self.labCost.text = ConfigHelp.getItemColorName(itemid);
		let hasCount = Model_Bag.getItemCount(itemid);
		IconUtil.setImg(self.imgItem, Enum_Path.ICON70_URL + itemcfg.icon + ".png");
		let color = hasCount >= needCount ? Color.GREENSTR : Color.REDSTR;
		self._enough = hasCount >= needCount;
		self.btnBreach.checkNotice = self._enough;
		self.btnUp.checkNotice = self._enough;
		self.lbCount.text = "<font color='" + color + "'>" + hasCount + "/" + needCount + "</font>";
	}

	itemClick = (e) => {
		let self = this;
		var clickItem = e.itemObject as VWuJiangGrid
		self._curVO = clickItem.vo;
		self.update();
	}

	levelupHD = () => {
		let self = this;
		let m = GGlobal.modelGodWuJiang;
		if (!self._enough) {
			ViewCommonWarn.text("材料不足");
			return;
		}
		if (!ModelGodWuJiang.getWuJiangIsActivation(self._curVO.type)) {
			ViewCommonWarn.text("激活神将才可升星");
			return;
		}
		if (this._curVO) {
			GGlobal.modelGodWuJiang.CG_WuJiang_upShenJiangLv_681(this._curVO.type);
		}
	}

	event_fun = (v) => {
		let self = this;
		let efun = EventUtil.register;
		efun(v, self.list, fairygui.ItemEvent.CLICK, self.itemClick, self);
		efun(v, self.btnUp, egret.TouchEvent.TOUCH_TAP, self.levelupHD, self);
		efun(v, self.btnBreach, egret.TouchEvent.TOUCH_TAP, self.levelupHD, self);
	}

	openPanel = (pData?: any) => {
		let self = this;
		self.update();
		self.event_fun(1);
		GGlobal.control.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, self.showbagItem, self);
		GGlobal.control.listen(UIConst.WU_JIANG, self.update, self);
		IconUtil.setImg(self.n49, Enum_Path.BACK_URL + "godweaponline.png");
		IconUtil.setImg(self.n44, Enum_Path.BACK_URL + "godwujiang.jpg");
	}

	closePanel = (pData?: any) => {
		let self = this;
		self.event_fun(0);
		IconUtil.setImg(self.n44, null);
		IconUtil.setImg(self.n49, null);
		GGlobal.control.remove(UIConst.WU_JIANG, self.update, self);
		GGlobal.control.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, self.showbagItem, self);
		self.list.numItems = 0;
	}

	dispose() {
		super.dispose();
	}
}