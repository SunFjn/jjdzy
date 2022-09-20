class ChildGodWuJiang extends fairygui.GComponent implements IPanel {
	public n1: fairygui.GImage;
	public list: fairygui.GList;
	public img: fairygui.GImage;
	public n6: fairygui.GImage;
	public n7: fairygui.GRichTextField;
	public boxMax: fairygui.GGroup;
	public labPower: fairygui.GLabel;
	public labAttrMax: fairygui.GRichTextField;
	public skill0: VWuJiangSkillS;
	public skill1: VWuJiangSkillS;
	public skill2: VWuJiangSkillS;
	public skill3: VWuJiangSkillS;
	public n16: fairygui.GLabel;
	public scoreLb: fairygui.GRichTextField;
	public labName: fairygui.GLabel;
	public btnBattle: fairygui.GButton;
	public imgBattle: fairygui.GImage;
	public showBt: fairygui.GButton;
	public n39: Button4;
	public boxUp: fairygui.GGroup;
	public labCost: fairygui.GTextField;
	public btnUp: Button4;
	public labTios: fairygui.GTextField;
	public starGroup: fairygui.GGroup;
	public jueXingBt: Button2;

	public static URL: string = "ui://zyx92gzwnlyo4j";

	public static createInstance(): ChildGodWuJiang {
		return <ChildGodWuJiang><any>(fairygui.UIPackage.createObject("wuJiang", "ChildGodWuJiang"));
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
	}

	_listData;
	private awatar: UIRole = null;
	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	private renderHander(index: number, obj: fairygui.GObject): void {
		var gird: VWuJiangGrid = obj as VWuJiangGrid;
		gird.vo = this._listData[index];
	}

	_star_OK = false;
	_item_OK = false;
	activationHD = () => {
		let self = this;
		if (!self._star_OK) {
			ViewCommonWarn.text("红将总星级不足");
			return;
		}
		if (!self._item_OK) {
			ViewCommonWarn.text("道具不足");
			return;
		}
		GGlobal.modelGodWuJiang.CG_WuJiang_shenJiangJiHuo_679(this._curVO.type);
	}

	itemClick = (e) => {
		var clickItem = e.itemObject as VWuJiangGrid
		this._curVO = clickItem.vo;
		this.update();
	}

	onBattle = (e) => {
		let self = this;
		if (self._curVO) {
			var v: any = self._curVO
			if (v.type == Model_player.voMine.job) {
				ViewCommonWarn.text("出战中")
				return;
			}
			if (!ModelGodWuJiang.getWuJiangIsActivation(v.type)) {
				ViewCommonWarn.text("武将未激活")
				return;
			}
			GGlobal.modelWuJiang.CGChangeJob(v.type);

			//根据场景角色状态，修改状态
			let role = Model_player.voMine.sceneChar;
			if (role) {
				let map: ScrollMap = role.scene.map;
				if (map && map.mid == 361001 && role.hurt_state == 3) {
					role.hurt_state = 4;
				}
			}
		}
	}

	openTF = (e) => {
		GGlobal.layerMgr.open(UIConst.GOD_WUJIANG_TF, this._curVO);
	}

	showModelHD = (e) => {
		GGlobal.modelchat.CG_CHAT_SHOW_DATA(8, this._curVO.type);
	}

	update = () => {
		let self = this;
		self.setListData();
		let model = GGlobal.modelGodWuJiang;
		let vo: Ihero_211 = self._curVO;
		let job = vo.type;
		self.labName.text = vo.name;
		self.labName.color = Color.REDINT;

		self.imgBattle.visible = false;
		self.btnBattle.touchable = self.btnBattle.visible = false;
		self.labPower.text = "0";
		if (model.data[job]) {
			if (job == Model_player.voMine.job) {
				self.btnBattle.touchable = self.btnBattle.visible = false;
				self.imgBattle.visible = true;
			} else {
				self.imgBattle.visible = false;
				self.btnBattle.touchable = self.btnBattle.visible = true;
			}
			self.labPower.text = vo.power + "";
		}

		var skillsArr = ConfigHelp.SplitStr(vo.skills);
		var secSkill = skillsArr[1][0];
		self.skill0.setVo(skillsArr[0][0], 0);
		self.skill1.setVo(skillsArr[1][0], 1);
		self.skill2.setVo(skillsArr[2][0], 2);
		self.skill3.setVo(skillsArr[3][0], 3);

		let xiulianLevel = ModelGodWuJiang.getXiuLianLevel(job);
		xiulianLevel = xiulianLevel % 1000;
		let jie = xiulianLevel % 10;
		xiulianLevel = (xiulianLevel - jie) / 10;
		let star = xiulianLevel + 1;
		let skillList = Model_player.voMine.skillList;
		let cfgids: Array<number> = JSON.parse(Config.hero_211[vo.type].attack);
		let score: number = 0;
		for (let i = 0; i < skillsArr.length; i++) {
			let skillVo: Vo_Skill;
			if (skillList[cfgids.length + i]) {
				let level = skillList[cfgids.length + i].level;
				skillVo = Vo_Skill.create(skillsArr[0][0], level, star);
			} else {
				skillVo = Vo_Skill.create(skillsArr[0][0], 1, star)
			}
			score += skillVo.powerAtt_lv;
		}
		self.scoreLb.text = "技能评分：" + HtmlUtil.fontNoSize("" + Math.ceil(score / 100000 * 600), Color.getColorStr(2));

		let attrArr = JSON.parse(vo.attr);
		self.labAttrMax.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");

		if (model.data[vo.type]) {//已激活
			self.starGroup.visible = false;
			self.boxMax.visible = true;
			self.showBt.visible = true;
		} else {
			self.showBt.visible = false;
			self.boxMax.visible = false;
			self.starGroup.visible = true;
			let totalStar = Model_WuJiang.getQuilityTotalStar(7) + Model_WuJiang.getQuilityTotalStar(6);
			let color = totalStar < vo.jh ? Color.REDSTR : Color.GREENSTR;
			self.labTios.text = BroadCastManager.reTxt("激活条件：红将总星级达到(<font color='{0}'>{1}/{2}</font>)星", color, totalStar, vo.jh);
			self._star_OK = totalStar >= vo.jh;
			let itemCFG = JSON.parse(vo.activation);
			let itemId = itemCFG[0][1];
			let itemName = ConfigHelp.getItemColorName(itemId);
			let itemNum = Model_Bag.getItemCount(itemId);
			self._item_OK = itemNum >= itemCFG[0][2];
			color = itemNum >= itemCFG[0][2] ? Color.GREENSTR : Color.REDSTR;
			self.labCost.text = BroadCastManager.reTxt("消耗：{0}*1<font color='{1}'>({2}/{3})</font>", itemName, color, itemNum, itemCFG[0][2]);
			self.btnUp.checkNotice = self._star_OK && self._item_OK;
		}

		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.setPos(self.img.x, self.img.y);
			// self.awatar.setScaleXY(1.5, 1.5);
			self.awatar.uiparent = self.displayListContainer;
			self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
		}

		const godWeapon = Model_ZSGodWeapon.getGodWeaponByJob(vo.type);
		const szInfo = Model_WuJiang.shiZhuanDic[vo.type];
		if (szInfo && szInfo.onSkinId) {
			var mx = Config.sz_739[szInfo.onSkinId].moxing;
			self.awatar.setBody(mx);
			self.awatar.setWeapon(szInfo.onSkinId);
		} else {
			self.awatar.setBody(vo.type);
			self.awatar.setWeapon(vo.type);
		}
		let horseId = Model_player.voMine.horseId
		self.awatar.setHorseId(horseId);
		if (horseId) {
			self.awatar.setScaleXY(1, 1);
		} else {
			self.awatar.setScaleXY(1.5, 1.5);
		}
		self.awatar.setGodWeapon(godWeapon);
		self.awatar.onAdd();
		self.showBt.parent.setChildIndex(self.showBt, self.showBt.parent.numChildren - 1);
	}

	setListData = () => {
		let self = this;
		self._listData = ModelGodWuJiang.wuJiangArr.sort(function (a, b) {
			return self.getweight(a) > self.getweight(b) ? -1 : 1;
		});
		self.list.numItems = self._listData.length;
		if (!self._curVO) {
			self.list.selectedIndex = 0;
			self._curVO = self._listData[0];
		}
	}

	getweight = (a: Ihero_211) => {
		let weight = a.type;
		let model = GGlobal.modelGodWuJiang;
		//可激活＞出战中＞已激活＞不可激活
		if (model.data[a.type]) {
			if (a.type == Model_player.voMine.job) {//出战中+十万
				weight += 100000;
			} else {
				weight += 10000;//已激活+十万
			}
		} else {
			let itemCFG = JSON.parse(a.activation);
			let itemId = itemCFG[0][1];
			let itemNum = Model_Bag.getItemCount(itemId);
			if (itemNum >= itemCFG[0][2]) {
				weight += 1000000;//可激活+百万
			}
		}
		return weight;
	}

	eventFun = (v) => {
		let event = EventUtil.register;
		let self = this;
		event(v, self.list, fairygui.ItemEvent.CLICK, self.itemClick, self);
		event(v, self.btnUp, egret.TouchEvent.TOUCH_TAP, self.activationHD, self);
		event(v, self.showBt, egret.TouchEvent.TOUCH_TAP, self.showModelHD, self);
		event(v, self.btnBattle, egret.TouchEvent.TOUCH_TAP, self.onBattle, self);
		event(v, self.n39, egret.TouchEvent.TOUCH_TAP, self.openTF, self);
		event(v, self.jueXingBt, egret.TouchEvent.TOUCH_TAP, self.OnJueXing, self);
	}

	OnJueXing = () => {
		GGlobal.layerMgr.open(UIConst.JUEXING_WUJIANG, UIConst.GOD_WUJIANG);
	}

	updateNotice = () => {
		this.n39.checkNotice = GGlobal.reddot.checkCondition(UIConst.GOD_WUJIANG, 2)
	}

	_curVO: Ihero_211;
	openPanel = (pData?: any) => {
		let self = this;
		self.eventFun(1);
		self.updateNotice();
		self.updateJuexing();
		let m = GGlobal.modelGodWuJiang;
		m.CG_WuJiang_getShenJiang_677();
		GGlobal.control.listen(UIConst.WU_JIANG, self.update, self);
		GGlobal.reddot.listen(UIConst.GOD_WUJIANG, self.updateNotice, self);
		GGlobal.reddot.listen(UIConst.JUEXING, self.updateNotice, self);
		GGlobal.control.listen(Enum_MsgType.WUJIANG_CHANGE_JOB, self.update, self);

	}

	updateJuexing = () => {
		let self = this;
		self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.GOD_WUJIANG);
		self.jueXingBt.checkNotice =GGlobal.reddot.checkCondition(UIConst.JUEXING, 7);
	}

	closePanel = (pData?: any) => {
		let self = this;
		self.eventFun(0);
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
		self._curVO = null;
		GGlobal.reddot.remove(UIConst.JUEXING, self.updateNotice, self);
		GGlobal.control.remove(UIConst.WU_JIANG, self.update, self);
		GGlobal.reddot.remove(UIConst.GOD_WUJIANG, self.updateNotice, self);
		GGlobal.control.remove(Enum_MsgType.WUJIANG_CHANGE_JOB, self.update, self);
		self.list.numItems = 0;
	}

	dispose() {
		super.dispose();
	}
}