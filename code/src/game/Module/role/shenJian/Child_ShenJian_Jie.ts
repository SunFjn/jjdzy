class Child_ShenJian_Jie extends fairygui.GComponent {

	public imgDi: fairygui.GImage;
	public img: fairygui.GLoader;
	public list: fairygui.GList;
	public labNeedName: fairygui.GRichTextField;
	public boxNeed: ViewResource;
	public labPower: fairygui.GLabel;
	public btnOnekey: Button1;
	public btnUp: Button1;
	public expBar: fairygui.GProgressBar;
	public labAttrCur: fairygui.GRichTextField;
	public labAttrNext: fairygui.GRichTextField;
	public labAttrMax: fairygui.GRichTextField;
	public imgArrow: fairygui.GImage;
	public labUp: fairygui.GLabel;
	public equip0: ViewGridRender;
	public equip1: ViewGridRender;
	public equip2: ViewGridRender;
	public equip3: ViewGridRender;
	public btnEquip: Button1;
	public t0: fairygui.Transition;

	public static URL: string = "ui://3tzqotadjx2x35";
	private _needItem;
	private _equipArr: Array<ViewGridRender>;
	private _skillArr;

	public static createInstance(): Child_ShenJian_Jie {
		return <Child_ShenJian_Jie><any>(fairygui.UIPackage.createObject("role", "Child_BaoWu_Jie"));
	}

	public constructor() {
		super();
	}
	private zhiShengDan: VZhiShengDan;
	public iconJie: IconJie;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;

		self._equipArr = [self.equip0, self.equip1, self.equip2, self.equip3];
		self._needItem = VoItem.create(Model_ShenJian.DAN_LEVELUP);
		self.labNeedName.text = self._needItem.name;
		self.boxNeed.setImgUrl(self._needItem.icon);
	}

	eventFunction = (t) => {
		let self = this;
		let event = EventUtil.register;
		event(t, self.btnUp, EventUtil.TOUCH, self.onClickUp, self);
		event(t, self.btnOnekey, EventUtil.TOUCH, self.onClickUp, self);
		event(t, self.btnEquip, EventUtil.TOUCH, self.onEquip, self);
		event(t, self.list, fairygui.ItemEvent.CLICK, self.itemHandler, self);
		for (let i = 0; i < 4; i++) {
			event(t, self._equipArr[i], EventUtil.TOUCH, self.onEquipTips, self);
		}
	}

	public onOpen(): void {
		const sf = this;
		const control = GGlobal.control;
		sf.eventFunction(1);
		control.listen(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sf.upSys, sf);
		control.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, sf.update, sf);
		sf.update();
	}

	public onClose(): void {
		const sf = this;
		const control = GGlobal.control;
		sf.eventFunction(0);
		control.remove(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sf.upSys, sf);
		control.remove(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, sf.update, sf);
		sf.list.numItems = 0;
		IconUtil.setImg(sf.img, null);
		if (sf.bwEff) {
			EffectMgr.instance.removeEff(sf.bwEff);
			sf.bwEff = null;
		}
	}

	private upSys(sys) {
		const sf = this;
		if (sys == Model_BySys.SHEN_JIAN) {
			sf.update();
		}
	}

	private bwEff: Part;
	private _clotheslv: any
	private _clothesNext: any
	public update(): void {
		const sf = this;
		sf._clotheslv = null
		sf._clothesNext = null
		let jieShu = Model_BySys.sysJie(Model_BySys.SHEN_JIAN);
		let exp = Model_BySys.sysExp(Model_BySys.SHEN_JIAN);
		if (jieShu > 0) {
			sf._clotheslv = Config.swordlv_216[jieShu]
			if (sf._clotheslv.exp > 0) {
				sf.expBar.value = exp * 100 / sf._clotheslv.exp;
				sf.expBar._titleObject.text = exp + "/" + sf._clotheslv.exp;
			} else {
				sf.expBar.value = 100;
				sf.expBar._titleObject.text = "MAX";
			}
			sf._clothesNext = Config.swordlv_216[jieShu + 1]
		} else {
			sf.expBar.value = 0
			sf.expBar._titleObject.text = ""
		}
		sf.iconJie.setVal(jieShu);
		sf.boxNeed.setCount(Model_Bag.getItemCount(Model_ShenJian.DAN_LEVELUP) + "");
		sf.btnOnekey.checkNotice = Model_ShenJian.checkOneKeyUp()

		let skillArr = Model_BySys.sysSkillArr(Model_BySys.SHEN_JIAN);
		sf._skillArr = [];
		for (let i = 0; i < skillArr.length; i++) {
			sf._skillArr.push([Model_BySys.SHEN_JIAN, skillArr[i]]);
		}
		sf.list.numItems = sf._skillArr.length
		var showVo = Model_ShenJian.shenjianArr[0];
		var power = 0;
		for (let i = 0; i < Model_ShenJian.shenjianArr.length; i++) {
			let v = Model_ShenJian.shenjianArr[i]
			if (v.starLv == 0) continue;
			if (v.id == Model_ShenJian.shenJianId) {
				showVo = v;
				break;
			}
			let vPower = v.power
			if (vPower > power) {
				power = vPower
				showVo = v;
			}
		}
		IconUtil.setImg(sf.img, Enum_Path.PIC_URL + showVo.id + ".png");
		if (sf.bwEff) {
			EffectMgr.instance.removeEff(sf.bwEff);
			sf.bwEff = null;
		}
		if (showVo.cfg.tptx > 0) {
			if (!sf.bwEff) {
				sf.bwEff = EffectMgr.addEff("uieff/" + showVo.cfg.tptx, sf.img.displayObject as fairygui.UIContainer, sf.img.width / 2, sf.img.height / 2, 1000, -1, true);
			}
		}

		sf.labPower.text = "" + sf.upPower();
		const cnt = Model_Bag.getItemCount(415005);
		if (sf._clotheslv == null) {//0级
			sf.labAttrCur.text = "";
			sf.labAttrNext.text = "";
			sf.labAttrMax.text = "";
			sf.imgArrow.visible = false;
			sf.zhiShengDan.data = { type: 5, count: cnt, lvl: 0, isFull: false };
		} else if (sf._clothesNext == null) {//满级
			sf.labAttrCur.text = "";
			sf.labAttrNext.text = "";
			sf.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clotheslv.attr), "+", null, "#15f234");
			sf.imgArrow.visible = false;
			sf.zhiShengDan.data = { type: 5, count: cnt, lvl: sf._clotheslv.id, isFull: true };
		} else {
			sf.imgArrow.visible = true;
			sf.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clotheslv.attr), "+");
			sf.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clothesNext.attr), "+", null, "#15f234");
			sf.labAttrMax.text = "";
			sf.zhiShengDan.data = { type: 5, count: cnt, lvl: sf._clotheslv.id, isFull: false };
		}
		// 60 - 63
		let equiDa = Model_player.voMine.equipData
		for (let i = 0; i < 4; i++) {
			sf._equipArr[i].vo = equiDa[i + 60];
			sf._equipArr[i].showNotice = Model_BySys.canWear(i + 60, Model_BySys.SHEN_JIAN);
			if (equiDa[i + 60] == null) {
				sf._equipArr[i].setGrayBg(i + 60);
			}
		}
		sf.btnEquip.visible = Model_ShenJian.shenJianWearArr().length > 0;
		sf.btnEquip.checkNotice = true;
	}

	private upPower(): number {
		const sf = this;
		var power = 0
		//升阶战力
		let jieShu = Model_BySys.sysJie(Model_BySys.SHEN_JIAN);
		var clotheslv = Config.swordlv_216[jieShu]
		power += clotheslv ? clotheslv.power : 0;
		//技能战力
		power += sf.getPowerSkill();
		//装备战力
		let equiDa = Model_player.voMine.equipData
		for (let i = 0; i < 4; i++) {
			let eq: VoEquip = equiDa[i + 60];
			if (eq) {
				power += eq.basePower;
			}
		}
		return power
	}

	//技能战力
	public getPowerSkill(): number {
		var power = 0;
		let skillArr = Model_BySys.sysSkillArr(Model_BySys.SHEN_JIAN);
		if (skillArr) {
			for (let i = 0; i < skillArr.length; i++) {
				let skillId: number = skillArr[i];
				let skill = Config.swordlvskill_216[skillId];
				power += skill ? skill.power : 0
			}
		}
		return power;
	}

	private onClickUp(event: egret.TouchEvent): void {
		const sf = this;
		var target: fairygui.GButton = event.currentTarget as fairygui.GButton
		var type = 1;
		if (target.id == sf.btnUp.id) {
			type = 0;
		}
		var count = Model_Bag.getItemCount(Model_ShenJian.DAN_LEVELUP)
		if (count <= 0) {
			View_CaiLiao_GetPanel.show(sf._needItem);
			return;
		}
		if (sf._clotheslv == null) {
			return;
		}
		if (sf._clotheslv.exp == 0) {
			ViewCommonWarn.text("已满阶")
			return;
		}
		VZhiShengDan.invalNum = 1;
		GGlobal.modelBySys.CGUpjiebysys(Model_BySys.SHEN_JIAN, type)
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		const sf = this;
		var item: VSysSkillItem = obj as VSysSkillItem;
		item.vo = sf._skillArr[index];
	}

	private itemHandler(event: fairygui.ItemEvent): void {
		let grid: VSysSkillItem = event.itemObject as VSysSkillItem;
		GGlobal.layerMgr.open(UIConst.BY_SYS_TIP_SKILL, grid.vo);
	}

	private onEquip(): void {
		let sendArr = Model_ShenJian.shenJianWearArr();
		let a = []
		for (let i = 0; i < sendArr.length; i++) {
			a.push(sendArr[i].sid)
		}
		if (a.length > 0) {
			GGlobal.modelEquip.CGWearbypart(3, a);
		} else {
			ViewCommonWarn.text("无可穿戴的装备");
		}
	}

	private onEquipTips(e: egret.Event) {
		var v: ViewGridRender = e.currentTarget as ViewGridRender
		if (!v.vo) {
			let nitem = VoItem.create(410035);
			View_CaiLiao_GetPanel.show(nitem);
		}
	}
}