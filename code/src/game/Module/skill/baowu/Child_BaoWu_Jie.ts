class Child_BaoWu_Jie extends fairygui.GComponent {

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

	private _needItem
	private _equipArr: Array<ViewGridRender>;
	private _skillArr;

	public static createInstance(): Child_BaoWu_Jie {
		return <Child_BaoWu_Jie><any>(fairygui.UIPackage.createObject("role", "Child_BaoWu_Jie"));
	}

	public constructor() {
		super();
	}
	private zhiShengDan: VZhiShengDan;
	public iconJie: IconJie;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);

		self.t0 = self.getTransition("t0");

		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;

		self._equipArr = [self.equip0, self.equip1, self.equip2, self.equip3];
		self._needItem = VoItem.create(Model_BaoWu.DAN_LEVELUP);
		self.labNeedName.text = self._needItem.name;
		self.boxNeed.setImgUrl(self._needItem.icon);
	}

	public open(): void {
		const sf = this;
		sf.eventFunction(1);
		const control = GGlobal.control;
		control.listen(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sf.upSys, sf);
		control.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, sf.update, sf);
		control.listen(Enum_MsgType.BAOWU_DATA_UPDATE, sf.update, sf);
		sf.update();
	}

	public close(): void {
		const sf = this;
		const control = GGlobal.control;
		sf.eventFunction(0);
		control.remove(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sf.upSys, sf);
		control.remove(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, sf.update, sf);
		control.remove(Enum_MsgType.BAOWU_DATA_UPDATE, sf.update, sf);
		IconUtil.setImg(sf.img, null);
		sf.list.numItems = 0;
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

	private upSys(sys) {
		const sf = this;
		if (sys == Model_BySys.BAO_WU) {
			sf.update();
		}
	}

	private _clotheslv: any
	private _clothesNext: any
	public update(): void {
		const sf = this;
		sf._clotheslv = null
		sf._clothesNext = null
		let jieShu = Model_BaoWu.level;
		let exp = Model_BaoWu.exp;
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
		sf.boxNeed.setCount(Model_Bag.getItemCount(Model_BaoWu.DAN_LEVELUP) + "");
		sf.btnOnekey.checkNotice = Model_BaoWu.checkOneKeyUp()

		let skillArr = Model_BySys.sysSkillArr(Model_BySys.BAO_WU);
		sf._skillArr = [];
		for (let i = 0; i < skillArr.length; i++) {
			sf._skillArr.push([Model_BySys.BAO_WU, skillArr[i]]);
		}
		sf.list.numItems = sf._skillArr.length;
		var showVo = Model_BaoWu.baowuArr[0];
		var power = 0;
		for (let i = 0; i < Model_BaoWu.baowuArr.length; i++) {
			let v = Model_BaoWu.baowuArr[i]
			if (v.starLv == 0) continue;
			if (v.state == 0) {
				showVo = v;
				break;
			}
			let vPower = v.power
			if (vPower > power) {
				power = vPower
				showVo = v;
			}
		}
		IconUtil.setImg(sf.img, Enum_Path.PIC_URL + showVo.imageID + ".png");

		//升阶战力
		var clotheslv = Config.swordlv_216[jieShu]
		sf.labPower.text = "" + sf.upPower();
		const cnt = Model_Bag.getItemCount(415003);
		if (sf._clotheslv == null) {//0级
			sf.labAttrCur.text = "";
			sf.labAttrNext.text = "";
			sf.labAttrMax.text = "";
			sf.imgArrow.visible = false;
			sf.zhiShengDan.data = { type: 3, count: cnt, lvl: 0, isFull: false };
		} else if (sf._clothesNext == null) {//满级
			sf.labAttrCur.text = "";
			sf.labAttrNext.text = "";
			sf.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clotheslv.attr), "+", null, "#15f234");
			sf.imgArrow.visible = false;
			sf.zhiShengDan.data = { type: 3, count: cnt, lvl: sf._clotheslv.id, isFull: true };
		} else {
			sf.imgArrow.visible = true;
			sf.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clotheslv.attr), "+");
			sf.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clothesNext.attr), "+", null, "#15f234");
			sf.labAttrMax.text = "";
			sf.zhiShengDan.data = { type: 3, count: cnt, lvl: sf._clotheslv.id, isFull: false };
		}
		// 90 - 93
		let equiDa = Model_player.voMine.equipData
		for (let i = 0; i < 4; i++) {
			sf._equipArr[i].vo = equiDa[i + 90];
			sf._equipArr[i].showNotice = Model_BySys.canWear(i + 90, Model_BySys.BAO_WU);
			if (equiDa[i + 90] == null) {
				sf._equipArr[i].setGrayBg(i + 90);
			}
		}
		sf.btnEquip.visible = Model_BaoWu.baoWuWearArr().length > 0;
		sf.btnEquip.checkNotice = true;
	}

	private upPower(): number {
		const sf = this;
		var power = 0
		//升阶战力
		let jieShu = Model_BaoWu.level;
		var clotheslv = Config.swordlv_216[jieShu]
		power += clotheslv ? clotheslv.power : 0;
		//技能战力
		power += sf.getPowerSkill();
		//装备战力
		let equiDa = Model_player.voMine.equipData
		for (let i = 0; i < 4; i++) {
			let eq: VoEquip = equiDa[i + 90];
			if (eq) {
				power += eq.basePower;
			}
		}
		return power
	}

	//技能战力
	public getPowerSkill(): number {
		var power = 0;
		let skillArr = Model_BySys.sysSkillArr(Model_BySys.BAO_WU);
		if (skillArr) {
			for (let i = 0; i < skillArr.length; i++) {
				let skillId: number = skillArr[i];
				let skill = Config.baolvskill_214[skillId];
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
		var count = Model_Bag.getItemCount(Model_BaoWu.DAN_LEVELUP)
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
		if (type == 0) {
			GGlobal.modelbw.CG_BAOWU_UPGRADE()
		} else {
			GGlobal.modelbw.CG_BAOWU_KEYUPGRADE()
		}
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
		let s = this;
		let sendArr = Model_BaoWu.baoWuWearArr();
		let a = []
		for (let i = 0; i < sendArr.length; i++) {
			a.push(sendArr[i].sid)
		}
		if (a.length > 0) {
			GGlobal.modelEquip.CGWearbypart(6, a);
		} else {
			ViewCommonWarn.text("无可穿戴的装备");
		}
	}

	private onEquipTips(e: egret.Event) {
		var v: ViewGridRender = e.currentTarget as ViewGridRender
		if (!v.vo) {
			let nitem = VoItem.create(410038);
			View_CaiLiao_GetPanel.show(nitem);
		}
	}

	public guide_baowu_upLv(step) {
		const self = this;
		GuideStepManager.instance.showGuide(self.btnOnekey, self.btnOnekey.width / 2, self.btnOnekey.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.btnOnekey, self.btnOnekey.width / 2, 0, -90, -106, -100);
		if (self.btnOnekey.parent) self.btnOnekey.parent.setChildIndex(self.btnOnekey, self.btnOnekey.parent.numChildren - 1);
	}
}