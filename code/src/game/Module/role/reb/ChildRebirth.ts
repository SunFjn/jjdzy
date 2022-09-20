class ChildRebirth extends fairygui.GComponent implements IPanel {
	//>>>>start
	public btnReBirth: Button0;
	public roleImg: fairygui.GLoader;
	public labNext: fairygui.GRichTextField;
	public grid0: ViewGridRender;
	public grid1: ViewGridRender;
	public grid2: ViewGridRender;
	public labCondition0: fairygui.GRichTextField;
	public labCondition1: fairygui.GRichTextField;
	public labCondition2: fairygui.GRichTextField;
	public viewPower: fairygui.GLabel;
	public imgCondition0: fairygui.GImage;
	public imgCondition1: fairygui.GImage;
	public imgCondition2: fairygui.GImage;
	public expCondition0: fairygui.GProgressBar;
	public expCondition1: fairygui.GProgressBar;
	public expCondition2: fairygui.GProgressBar;
	public labStatus: fairygui.GRichTextField;
	public title: fairygui.GRichTextField;
	public labReward: fairygui.GGroup;
	public btnDaShi: Button2;
	public labDaShi: fairygui.GRichTextField;
	public gridNext: ViewGrid;
	public btnLook: fairygui.GRichTextField;
	public btnOneKey: Button1;
	public boxMax: fairygui.GImage;
	public labEquip0: fairygui.GRichTextField;
	public equip0: ViewGrid;
	public labEquLv0: fairygui.GRichTextField;
	public labEquip3: fairygui.GRichTextField;
	public equip3: ViewGrid;
	public labEquLv3: fairygui.GRichTextField;
	public labEquip2: fairygui.GRichTextField;
	public equip2: ViewGrid;
	public labEquLv2: fairygui.GRichTextField;
	public labEquip1: fairygui.GRichTextField;
	public equip1: ViewGrid;
	public labEquLv1: fairygui.GRichTextField;
	public labNextPower: fairygui.GTextField;
	//>>>>end

	public static URL: string = "ui://3tzqotadtw1l8";

	private equipArr: Array<ViewGrid>;
	private labEquipArr: Array<fairygui.GRichTextField>;
	private labEquLvArr: Array<fairygui.GRichTextField>;
	private gridArr: Array<ViewGridRender>;
	private labConditionArr: Array<fairygui.GTextField>;
	private expConditionArr: Array<fairygui.GProgressBar>;
	private imgConditionArr: Array<fairygui.GImage>;

	public static createInstance(): ChildRebirth {
		return <ChildRebirth><any>(fairygui.UIPackage.createObject("role", "ChildRebirth"));
	}
	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.onOpen();
	}

	closePanel(pData?: any) {
		this.onClose();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		s.gridArr = [s.grid0, s.grid1, s.grid2]
		s.equipArr = [s.equip0, s.equip1, s.equip2, s.equip3]
		s.labEquLvArr = [];
		for (let i = 0; i < 4; i++) {
			s.labEquLvArr.push(<fairygui.GRichTextField><any>(s.getChild("labEquLv" + i)))
		}

		s.labEquipArr = [s.labEquip0, s.labEquip1, s.labEquip2, s.labEquip3]
		s.labConditionArr = [s.labCondition0, s.labCondition1, s.labCondition2]
		s.expConditionArr = [s.expCondition0, s.expCondition1, s.expCondition2]
		s.imgConditionArr = [s.imgCondition0, s.imgCondition1, s.imgCondition2]
		for (let i = 0; i < 4; i++) {
			s.equipArr[i].tipEnabled = false;
		}
	}

	private _first: boolean = false;
	public onOpen(): void {
		if (!this._first) {
			this._first = true;
			GGlobal.modelEquip.lHDaShiLv();
		}
		this.addListen();
		this.update();
	}

	public onClose(): void {
		this.removeListen();
	}

	private addListen(): void {
		var s = this
		s.btnReBirth.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onClickRebirth, s);
		s.btnOneKey.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onOneKey, s);
		s.btnLook.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onLook, s);
		s.btnDaShi.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onDS, s);
		GGlobal.control.listen(Enum_MsgType.REBIRTH_UPDATE, s.update, s);
		GGlobal.control.listen(Enum_MsgType.PEACOCK_OPENUI, s.update, s);
		GGlobal.control.listen(Enum_MsgType.REBIRTH_EQUIP_UPDATA, s.upEquip, s);
		for (let i = 0; i < 4; i++) {
			s.equipArr[i].tipEnabled = false;
			s.equipArr[i].addClickListener(s.onTips, s);
		}
		IconUtil.setImg(s.roleImg, Enum_Path.IMAGE_MODULES_URL + "role/role.png");
	}

	private removeListen(): void {
		var s = this
		IconUtil.setImg(s.roleImg, null);
		s.btnReBirth.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onClickRebirth, s);
		s.btnOneKey.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onOneKey, s);
		s.btnLook.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onLook, s);
		s.btnDaShi.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onDS, s);
		GGlobal.control.remove(Enum_MsgType.REBIRTH_UPDATE, s.update, s);
		GGlobal.control.remove(Enum_MsgType.PEACOCK_OPENUI, s.update, s);
		GGlobal.control.remove(Enum_MsgType.REBIRTH_EQUIP_UPDATA, s.upEquip, s);
		for (let i = 0; i < 4; i++) {
			s.equipArr[i].tipEnabled = false;
			s.equipArr[i].vo = null;
			s.equipArr[i].removeClickListener(this.onTips, this);
		}
		for (let i = 0; i < 3; i++) {
			this.gridArr[i].vo = null;
		}
		this.gridNext.vo = null;
	}

	private update(): void {
		var zs = Model_player.voMine.zsID;
		var zhuansheng = Config.zhuansheng_705[zs];
		this._jumpTo = 0;
		if (zhuansheng.nextid != 0) {
			var zhuanshengNext = Config.zhuansheng_705[zhuansheng.nextid];
			let awardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(zhuanshengNext.award))
			for (let i = 0; i < 3; i++) {
				if (awardArr[i]) {
					this.gridArr[i].grid.isShowEff = true;
					this.gridArr[i].visible = true;
					this.gridArr[i].touchable = true;
					this.gridArr[i].vo = awardArr[i];
				} else {
					this.gridArr[i].visible = false;
					this.gridArr[i].touchable = false;
					this.gridArr[i].vo = null;
				}
			}
			var conditionArr = ConfigHelp.SplitStr(zhuanshengNext.condition)
			var red = true;
			for (let i = 0; i < 3; i++) {
				let cdType = Number(conditionArr[i][0])
				let cdValue = Number(conditionArr[i][1])
				let val = 0;
				if (cdType == 1) {//人物等级
					this.labConditionArr[i].text = "人物等级达到" + cdValue;
					// val = Model_player.voMine.level
					val = Model_LunHui.realLv;
				} else if (cdType == 2) {//宝石等级
					this.labConditionArr[i].text = "装备宝石等级达到" + cdValue;
					val = Model_DuanZao.totGemLv
				} else if (cdType == 3) {//强化等级
					this.labConditionArr[i].text = "装备强化等级达到" + cdValue;
					val = Model_DuanZao.totStrengLv;
				} else if (cdType == 4) {//升星等级
					this.labConditionArr[i].text = "装备升星等级达到" + cdValue;
					val = Model_DuanZao.getStarLv();
				} else if (cdType == 5) {//技能等级
					this.labConditionArr[i].text = "技能等级达到" + cdValue;
					val = Model_Skill.getSkillLv();
				} else if (cdType == 6) {//官衔等级
					this.labConditionArr[i].text = "将衔等级达到" + (cdValue - 1) + "阶";
					val = GGlobal.modelguanxian.guanzhi;
				} else if (cdType == 7) {//铜雀台
					this.labConditionArr[i].text = "铜雀台层数达到" + cdValue;
					val = Model_Peacock.curLayer;
				}
				if (cdType == 6) {
					this.expConditionArr[i].value = val == 0 ? 0 : (val - 1);
				} else {
					this.expConditionArr[i].value = val;
				}

				if (val < cdValue) {
					red = false;
					this.labConditionArr[i].color = Color.REDINT;
					if (this._jumpTo == 0) {
						this._jumpTo = cdType;
					}
				} else {
					this.labConditionArr[i].color = Color.GREENINT;
				}
				if (cdType == 6) {
					this.expConditionArr[i].max = cdValue - 1;
				} else {
					this.expConditionArr[i].max = cdValue;
				}
				this.expConditionArr[i].visible = true;
				this.imgConditionArr[i].visible = true;
			}
			this.labReward.visible = true;
			// this.imgCdt.visible = true;
			this.btnReBirth.touchable = this.btnReBirth.visible = true;
			this.setNotice(red);
			// this.labArrow.visible = true;
			this.boxMax.visible = false;
			// this.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(zhuansheng.attr), "+");
		} else {//满级
			this.setNotice(false);

			// for (let i = 0; i < 3; i++) {
			// 	this.gridArr[i].visible = false;
			// 	this.gridArr[i].touchable = false;
			// }
			let awardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(zhuansheng.award))
			for (let i = 0; i < 3; i++) {
				if (awardArr[i]) {
					this.gridArr[i].visible = true;
					this.gridArr[i].touchable = true;
					this.gridArr[i].vo = awardArr[i];
				} else {
					this.gridArr[i].visible = false;
					this.gridArr[i].touchable = false;
				}
			}
			this.labReward.visible = true;
			for (let i = 0; i < 3; i++) {
				this.labConditionArr[i].text = "";
				this.expConditionArr[i].visible = false;
				this.imgConditionArr[i].visible = false;
			}

			// this.imgCdt.visible = false;
			this.btnReBirth.touchable = this.btnReBirth.visible = false;
			// this.labArrow.visible = false;
			this.boxMax.visible = true;
			// this.labAttrCur.text = "";
			// this.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(zhuansheng.attr), "+", null, "#15f234");
			// this.labAttrNext.x = 230;
		}
		this.showReward(zhuansheng);
		// this.labStatus.text = "当前阶段：" + "[color=#0bf22c]" + zhuansheng.lv + "[/color]"
		this.labStatus.text = zhuansheng.lv

		this.upEquip();
	}

	private upEquip() {
		let s = this;
		let d = Model_player.voMine.equipData
		let has = Model_Bag.getItemCount(Model_Equip.lhItemId)
		let sendArr = Model_Equip.zSWearArr();
		let basePower = 0;
		let lhPower = 0;
		for (let i = 30; i < 34; i++) {
			s.equipArr[i - 30].vo = d[i]
			if (d[i]) {
				s.labEquipArr[i - 30].text = d[i].name
				s.labEquipArr[i - 30].color = d[i].qColor
				s.equipArr[i - 30].showEff(true);
				basePower += d[i].basePower;
				// s.imgEquipArr[i - 30].visible = false;
			} else {
				s.labEquipArr[i - 30].text = "";
				s.equipArr[i - 30].showEff(false);
				s.equipArr[i - 30].setGrayBg(i);
				// s.imgEquipArr[i - 30].visible = true;
			}

			let lh: VoRebirthLH = Model_Equip.lhArr[i - 30];
			let lv = lh ? lh.lv : 0
			let lhExp = lh ? lh.exp : 0
			if (lh && d[i]) {
				s.labEquLvArr[i - 30].text = "Lv." + lh.lv
			} else {
				s.labEquLvArr[i - 30].text = ""
			}
			let lhCfg = Config.zhuanshenglh_256[lv]
			lhPower += Number(lhCfg.fight);
			if ((has * 10 + lhExp >= lhCfg.exp) && lhCfg.exp != 0 && d[i]) {
				s.equipArr[i - 30].checkNotice = true;
			} else {
				s.equipArr[i - 30].checkNotice = false;
			}
			if (sendArr[i]) {
				s.equipArr[i - 30].checkNotice = true;
			}
		}
		s.labDaShi.text = "Lv." + Model_Equip.lhLevel;

		s.btnOneKey.checkNotice = sendArr.length > 0;
		s.btnDaShi.checkNotice = Model_Equip.zSDaShiRed();

		var zs = Model_player.voMine.zsID;
		var zhuansheng = Config.zhuansheng_705[zs];
		s.viewPower.text = "战斗力：" + (zhuansheng.fight + basePower + lhPower);
	}

	private showReward(zhuansheng): void {
		var zhuanshengNext = null
		if (zhuansheng != null && zhuansheng.nextid != 0) {
			zhuanshengNext = Config.zhuansheng_705[zhuansheng.nextid];
			while (1) {
				if (zhuanshengNext == null) {
					break;
				}
				if (zhuanshengNext.show != "0") {
					break;
				}
				if (zhuanshengNext.nextid == 0) {
					break;
				}
				zhuanshengNext = Config.zhuansheng_705[zhuanshengNext.nextid];
			}
			if (zhuanshengNext.show == "0") {
				zhuanshengNext = null
			}
		}

		//满级了 往前找
		if (zhuanshengNext == null) {
			let id = Math.floor(zhuansheng.id / 10) * 10 + 1
			zhuanshengNext = Config.zhuansheng_705[id];
		}

		if (zhuanshengNext == null) {
			this.labNext.text = "";;
			this.gridNext.visible = false;
			this.gridNext.touchable = false;
			this.gridNext.isShowEff = false;
			this.gridNext.tipEnabled = false;
			this.labNextPower.text = "";
		} else {
			this.labNext.text = zhuanshengNext.lv + "获得";
			let showArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(zhuanshengNext.show));
			this.gridNext.isShowEff = true;
			this.gridNext.vo = showArr[0];
			this.gridNext.visible = true;
			this.gridNext.tipEnabled = true;
			this.labNextPower.text = "" + zhuanshengNext.power;
		}
	}

	private _jumpTo: number;
	private onClickRebirth(): void {
		this.update();
		if (this.btnReBirth.checkNotice) {
			GGlobal.modelPlayer.CGRebornUp()
		} else {
			if (this._jumpTo == 1) {
				View_CaiLiao_GetPanel.show(VoItem.create(6));
			} else {
				GGlobal.layerMgr.open(this.getJumpto(this._jumpTo));
			}
		}
	}

	private getJumpto(to): number {
		switch (to) {
			case 1:
				return UIConst.GUANQIABOSSUI;
			case 2:
				return UIConst.DUANZAO_STONE;
			case 3:
				return UIConst.DUANZAO_STRENG;
			case 4:
				return UIConst.DUANZAO_STAR;
			case 5:
				return UIConst.MAIN_SKILL;
			case 6:
				return UIConst.GUANXIAN;
			case 7:
				return UIConst.PEACOCK;
		}
		return 0;
	}

	private setNotice(boo) {
		this.btnReBirth.checkNotice = boo;
		if (boo) {
			this.btnReBirth.text = "转生";
		} else {
			this.btnReBirth.text = "前往";
		}
		// this.btnReBirth.checkNotice = GGlobal.reddot.checkCondition(UIConst.REBIRTH);

	}
	//一键
	private onOneKey() {
		let s = this;
		let sendArr = Model_Equip.zSWearArr();
		let a = []
		for (let i = 30; i < 34; i++) {
			if (sendArr[i]) {
				a.push(sendArr[i].sid)
			}
		}
		if (a.length > 0) {
			GGlobal.modelEquip.wearReBornEquip(a);
		} else {
			ViewCommonWarn.text("无可穿戴的转生装备");
		}
	}

	private onLook() {
		GGlobal.layerMgr.open(UIConst.TIP_REBIRTH_LOOK)
	}

	private onDS() {
		// ViewCommonWarn.text("敬请期待");
		GGlobal.layerMgr.open(UIConst.VIEW_REBIRTH_DS)
	}
	private onTips(e: egret.Event) {
		// ViewCommonWarn.text("敬请期待");
		var v: ViewGridRender = e.currentTarget as ViewGridRender
		if (v.vo) {
			GGlobal.layerMgr.open(UIConst.TIP_REBIRTH_EQUIP, v.vo)
		} else {
			let nitem = VoItem.create(410032);
			View_CaiLiao_GetPanel.show(nitem);
		}
	}
}