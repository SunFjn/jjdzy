class ChildWuJiangUpJie extends fairygui.GComponent {

	public img: fairygui.GImage;
	public list: fairygui.GList;
	public labNeedName: fairygui.GTextField;
	// public labJie: fairygui.GTextField;
	public btnUp: fairygui.GButton;
	public btnOnekey: Button1;
	public expBar: fairygui.GProgressBar;
	// public labChange: fairygui.GTextField;
	// public labName: fairygui.GTextField;
	public labPower: fairygui.GTextField;
	public boxNeed: ViewResource;
	public labAttrCur: fairygui.GTextField;
	public labAttrNext: fairygui.GTextField;
	public labAttrMax: fairygui.GTextField;
	public imgArrow: fairygui.GImage;
	public equip0: ViewGridRender;
	public equip1: ViewGridRender;
	public equip2: ViewGridRender;
	public equip3: ViewGridRender;
	public btnEquip: Button1;

	public static URL: string = "ui://zyx92gzwtht41";

	private awatar: UIRole = null;
	private _voItemUp
	private _index: number;
	private _equipArr: Array<ViewGridRender>;
	private _skillArr;
	public iconJie: IconJie;
	public static createInstance(): ChildWuJiangUpJie {
		return <ChildWuJiangUpJie><any>(fairygui.UIPackage.createObject("wuJiang", "ChildWuJiangUpJie"));
	}

	public constructor() {
		super();
	}
	public zhiShengDan: VZhiShengDan;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;

		self._equipArr = [self.equip0, self.equip1, self.equip2, self.equip3];
		self._voItemUp = VoItem.create(Model_WuJiang.DAN_LEVELUP)
		self.boxNeed.setImgUrl(self._voItemUp.icon)
		self._index = self.displayListContainer.getChildIndex(self.img.displayObject);
	}

	public addEvent(): void {
		let self = this;
		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.setPos(self.img.x, self.img.y);
			// self.awatar.setScaleXY(1.5, 1.5);
			let horseId = Model_player.voMine.horseId
			if (horseId) {
				self.awatar.setScaleXY(1, 1);
			} else {
				self.awatar.setScaleXY(1.5, 1.5);
			}
		}
		self.list.addEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, self);
		self.btnUp.addClickListener(self.onClickUp, self);
		self.btnOnekey.addClickListener(self.onClickUp, self);
		self.btnEquip.addClickListener(self.onEquip, self);
		for (let i = 0; i < 4; i++) {
			self._equipArr[i].addClickListener(self.onEquipTips, self);
		}
	}

	public removeEvent(): void {
		let self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
		self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, self);
		self.btnUp.removeClickListener(self.onClickUp, self);
		self.btnOnekey.removeClickListener(self.onClickUp, self);
		self.btnEquip.removeClickListener(self.onEquip, self);
		for (let i = 0; i < 4; i++) {
			self._equipArr[i].removeClickListener(self.onEquipTips, self);
		}
		Timer.instance.remove(self.playSkill, self);
		self.secSkill = 0;
		self.list.numItems = 0;
	}

	private _herolv
	private _heroNext

	public update(): void {
		let self = this;
		self._herolv = null
		self._heroNext = null
		if (Model_WuJiang.jieShu > 0) {
			self._herolv = Config.herolv_211[Model_WuJiang.jieShu]
			// self.labPower.text = "" + self._herolv.power
			self.labPower.text = "" + self.upPower();
			if (self._herolv.exp > 0) {
				self.expBar.value = Model_WuJiang.exp * 100 / self._herolv.exp;
				self.expBar._titleObject.text = Model_WuJiang.exp + "/" + self._herolv.exp;
			} else {
				self.expBar.value = 100;
				self.expBar._titleObject.text = "MAX";
			}
			self._heroNext = Config.herolv_211[Model_WuJiang.jieShu + 1]
		} else {
			self.expBar.value = 0;
			self.expBar._titleObject.text = "";
			self.labPower.text = "" + 0;
		}
		self.iconJie.setVal(Model_WuJiang.jieShu);
		self.boxNeed.setCount(Model_Bag.getItemCount(Model_WuJiang.DAN_LEVELUP) + "");

		self.btnOnekey.checkNotice = Model_WuJiang.checkOneKeyUp()

		let skillArr = Model_WuJiang.skillArr;
		self._skillArr = [];
		for (let i = 0; i < skillArr.length; i++) {
			self._skillArr.push([Model_BySys.WU_JIANG, skillArr[i]]);
		}
		self.list.numItems = self._skillArr.length;
		var vo = Config.hero_211[Model_player.voMine.job]
		var job = 0;
		const szInfo = Model_WuJiang.shiZhuanDic[vo.type];
		const godweapon = Model_ZSGodWeapon.getGodWeaponByJob(vo.type);
		if (szInfo && szInfo.onSkinId) {
			var mx = Config.sz_739[szInfo.onSkinId].moxing;
			self.awatar.setBody(mx);
			self.awatar.setWeapon(szInfo.onSkinId);
			job = szInfo.onSkinId / 1000 >> 0;
		} else {
			self.awatar.setBody(vo.type);
			self.awatar.setWeapon(vo.type);
			job = vo.type;
		}
		self.awatar.setGodWeapon(godweapon);
		let horseId = Model_player.voMine.horseId
		self.awatar.setHorseId(horseId);
		self.awatar.uiparent = self.displayListContainer;
		self.awatar.onAdd();
		// self.displayListContainer.setChildIndex(self.awatar.view, self._index + 1)
		self.addChild(self.btnEquip)
		self.addChild(self.equip0)
		self.addChild(self.equip1)
		self.addChild(self.equip2)
		self.addChild(self.equip3)
		self.addChild(self.labPower)
		const count = Model_Bag.getItemCount(415001);
		if (self._herolv == null) {//0级
			self.labAttrCur.text = "";
			self.labAttrNext.text = "";
			self.labAttrMax.text = "";
			self.zhiShengDan.data = { type: 1, count: count, lvl: 0, isFull: false };
			self.imgArrow.visible = false;
		} else if (self._heroNext == null) {//满级
			self.labAttrCur.text = "";
			self.labAttrNext.text = "";
			self.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._herolv.attr), "+", null, "#15f234");
			self.imgArrow.visible = false;
			self.zhiShengDan.data = { type: 1, count: count, lvl: self._herolv.id, isFull: true };
		} else {
			self.imgArrow.visible = true;
			self.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._herolv.attr), "+");
			self.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._heroNext.attr), "+", null, "#15f234");
			self.labAttrMax.text = "";
			self.zhiShengDan.data = { type: 1, count: count, lvl: self._herolv.id, isFull: false };
		}
		// 40 - 43
		let equiDa = Model_player.voMine.equipData
		for (let i = 0; i < 4; i++) {
			self._equipArr[i].vo = equiDa[i + 40];
			self._equipArr[i].showNotice = Model_BySys.canWear(i + 40, Model_BySys.WU_JIANG);
			if (equiDa[i + 40] == null) {
				self._equipArr[i].setGrayBg(i + 40);
			}
		}
		self.btnEquip.visible = Model_WuJiang.wuJWearArr().length > 0;
		self.btnEquip.checkNotice = true;

		if (horseId == 0) {
			var secSkill = JSON.parse(Config.hero_211[job].skills)[1][0];
			if (self.secSkill != secSkill) {
				self.secSkill = secSkill;
				Timer.instance.remove(self.playSkill, self);
				self.playSkill();
			}
		} else {
			Timer.instance.remove(self.playSkill, self);
		}
	}
	private secSkill;
	private playSkill() {
		let self = this;
		self.awatar.playSkillID(self.secSkill, false);
		Timer.instance.callLater(self.playSkill, 5000, self);
	}
	private upPower(): number {
		var power = 0
		//升阶战力
		var clotheslv = Config.herolv_211[Model_WuJiang.jieShu]
		power += clotheslv ? clotheslv.power : 0;
		//技能战力
		power += this.getPowerSkill();
		//装备战力
		let equiDa = Model_player.voMine.equipData
		for (let i = 0; i < 4; i++) {
			let eq: VoEquip = equiDa[i + 40];
			if (eq) {
				power += eq.basePower;
			}
		}
		return power
	}

	//战甲技能战力
	public getPowerSkill(): number {
		var power = 0;
		if (Model_WuJiang.skillArr) {
			for (let i = 0; i < Model_WuJiang.skillArr.length; i++) {
				let skillId: number = Model_WuJiang.skillArr[i];
				let skill = Config.herolvskill_211[skillId];
				power += skill ? skill.power : 0
			}
		}
		return power;
	}

	private onClickUp(event: egret.TouchEvent): void {
		let self = this;
		var target: fairygui.GButton = event.currentTarget as fairygui.GButton
		var type = 1;
		if (target.id == self.btnUp.id) {
			type = 0;
		}
		var count = Model_Bag.getItemCount(Model_WuJiang.DAN_LEVELUP)
		if (count <= 0) {
			View_CaiLiao_GetPanel.show(self._voItemUp);
			return;
		}
		if (self._herolv == null) {
			return;
		}
		if (self._herolv.exp == 0) {
			ViewCommonWarn.text("已满阶")
			return;
		}
		VZhiShengDan.invalNum = 1;
		GGlobal.modelWuJiang.CGUpWuJie(type);
	}

	private onEquip(): void {
		let s = this;
		let sendArr = Model_WuJiang.wuJWearArr();
		let a = []
		for (let i = 0; i < sendArr.length; i++) {
			a.push(sendArr[i].sid)
		}
		if (a.length > 0) {
			GGlobal.modelEquip.CGWearbypart(1, a);
		} else {
			ViewCommonWarn.text("无可穿戴的装备");
		}
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		var item: VSysSkillItem = obj as VSysSkillItem;
		item.vo = this._skillArr[index];
	}

	private itemHandler(event: fairygui.ItemEvent): void {
		let grid: VSysSkillItem = event.itemObject as VSysSkillItem;
		GGlobal.layerMgr.open(UIConst.BY_SYS_TIP_SKILL, grid.vo);
	}

	public guidePage(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.btnOnekey, self.btnOnekey.width / 2, self.btnOnekey.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.btnOnekey, self.btnOnekey.width / 2, 0, -90, -106, -100);
	}

	private onEquipTips(e: egret.Event) {
		var v: ViewGridRender = e.currentTarget as ViewGridRender
		if (!v.vo) {
			let nitem = VoItem.create(410033);
			View_CaiLiao_GetPanel.show(nitem);
		}
	}
}

