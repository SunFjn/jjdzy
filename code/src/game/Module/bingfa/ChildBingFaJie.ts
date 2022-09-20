class ChildBingFaJie extends fairygui.GComponent {

	public imgDi: fairygui.GImage;
	public img: fairygui.GLoader;
	public list: fairygui.GList;
	public labNeedName: fairygui.GRichTextField;
	// public labJie:fairygui.GRichTextField;
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

	public static URL: string = "ui://3tzqotadjx2x35";

	private _needItem
	private _equipArr: Array<ViewGridRender>;

	public static createInstance(): ChildBingFaJie {
		return <ChildBingFaJie><any>(fairygui.UIPackage.createObject("role", "Child_BaoWu_Jie"));
	}

	public constructor() {
		super();
	}
	private zhiShengDan: VZhiShengDan;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.imgDi = <fairygui.GImage><any>(this.getChild("imgDi"));
		this.img = <fairygui.GLoader><any>(this.getChild("img"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.labNeedName = <fairygui.GRichTextField><any>(this.getChild("labNeedName"));
		// this.labJie = <fairygui.GRichTextField><any>(this.getChild("labJie"));
		this.boxNeed = <ViewResource><any>(this.getChild("boxNeed"));
		this.labPower = <fairygui.GLabel><any>(this.getChild("labPower"));
		this.btnOnekey = <Button1><any>(this.getChild("btnOnekey"));
		this.btnUp = <Button1><any>(this.getChild("btnUp"));
		this.expBar = <fairygui.GProgressBar><any>(this.getChild("expBar"));
		this.labAttrCur = <fairygui.GRichTextField><any>(this.getChild("labAttrCur"));
		this.labAttrNext = <fairygui.GRichTextField><any>(this.getChild("labAttrNext"));
		this.labAttrMax = <fairygui.GRichTextField><any>(this.getChild("labAttrMax"));
		this.imgArrow = <fairygui.GImage><any>(this.getChild("imgArrow"));
		this.labUp = <fairygui.GLabel><any>(this.getChild("labUp"));
		this.equip0 = <ViewGridRender><any>(this.getChild("equip0"));
		this.equip1 = <ViewGridRender><any>(this.getChild("equip1"));
		this.equip2 = <ViewGridRender><any>(this.getChild("equip2"));
		this.equip3 = <ViewGridRender><any>(this.getChild("equip3"));
		this.btnEquip = <Button1><any>(this.getChild("btnEquip"));
		this.zhiShengDan = <any>(this.getChild("zhiShengDan"));
		this.iconJie = <any>(this.getChild("iconJie"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this._equipArr = [this.equip0, this.equip1, this.equip2, this.equip3];
		this._needItem = VoItem.create(Model_BingFa.DAN_LEVELUP);
		this.labNeedName.text = this._needItem.name;
		this.boxNeed.setImgUrl(this._needItem.icon);
	}

	public open() {
		this.addEvent();
		this.update();
	}

	public hide() {
		this.removeEvent();
	}

	public addEvent(): void {
		this.list.addEventListener(fairygui.ItemEvent.CLICK, this.itemHandler, this);
		this.btnUp.addClickListener(this.onClickUp, this);
		this.btnOnekey.addClickListener(this.onClickUp, this);
		this.btnEquip.addClickListener(this.onEquip, this);
		GGlobal.control.listen(Enum_MsgType.BY_SYS_UP_JIE_SKILL, this.upSys, this);
		// GGlobal.control.listen(Enum_MsgType.BY_SYS_UP_SKILL, this.upSysSkill, this);
		GGlobal.control.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, this.update, this);
		for (let i = 0; i < 4; i++) {
			this._equipArr[i].addClickListener(this.onEquipTips, this);
		}
	}

	// private upSysSkill(v):void{
	// 	let sys = v[0];
	// 	if(sys == Model_BySys.BING_FA){
	// 		this.update();
	// 	}
	// }

	private upSys(sys) {
		if (sys == Model_BySys.BING_FA) {
			this.update();
		}
	}

	public removeEvent(): void {
		let self = this;
		self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, this);
		self.btnUp.removeClickListener(self.onClickUp, this);
		self.btnOnekey.removeClickListener(self.onClickUp, this);
		self.btnEquip.removeClickListener(self.onEquip, this);
		GGlobal.control.remove(Enum_MsgType.BY_SYS_UP_JIE_SKILL, self.upSys, this);
		// GGlobal.control.remove(Enum_MsgType.BY_SYS_UP_SKILL, self.upSysSkill, this);
		GGlobal.control.remove(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, self.update, this);
		for (let i = 0; i < 4; i++) {
			self._equipArr[i].removeClickListener(self.onEquipTips, this);
		}
		self.list.numItems = 0;
		if (self.bwEff) {
			EffectMgr.instance.removeEff(self.bwEff);
			self.bwEff = null;
		}
	}

	private bwEff: Part;
	private _clotheslv: any
	private _clothesNext: any
	public iconJie: IconJie;
	public update(): void {
		let self = this;
		self._clotheslv = null
		self._clothesNext = null
		let jieShu = Model_BySys.sysJie(Model_BySys.BING_FA);
		let exp = Model_BySys.sysExp(Model_BySys.BING_FA);
		if (jieShu > 0) {
			self._clotheslv = Config.booklv_213[jieShu]
			if (self._clotheslv.exp > 0) {
				// self.labJie.text = self._clotheslv.jie;
				self.expBar.value = exp * 100 / self._clotheslv.exp;
				self.expBar._titleObject.text = exp + "/" + self._clotheslv.exp;
			} else {
				// self.labJie.text = self._clotheslv.jie;
				self.expBar.value = 100;
				self.expBar._titleObject.text = "MAX";
			}
			self._clothesNext = Config.booklv_213[jieShu + 1]
		} else {
			// self.labJie.text = ""
			self.expBar.value = 0
			self.expBar._titleObject.text = ""
		}
		self.iconJie.setVal(jieShu);
		self.boxNeed.setCount(Model_Bag.getItemCount(Model_BingFa.DAN_LEVELUP) + "");
		self.btnOnekey.checkNotice = Model_BingFa.checkOneKeyUp()
		let skillArr = Model_BySys.sysSkillArr(Model_BySys.BING_FA);
		self._skillArr = [];
		for (let i = 0; i < skillArr.length; i++) {
			self._skillArr.push([Model_BySys.BING_FA, skillArr[i]]);
		}
		self.list.numItems = self._skillArr.length;
		GGlobal.modelBingFa.initData();
		var showVo = GGlobal.modelBingFa.data[0];
		var power = 0;
		for (let i = 0; i < GGlobal.modelBingFa.data.length; i++) {
			let v = GGlobal.modelBingFa.data[i]
			if (v.star == 0) continue;
			let vPower = v.power
			if (vPower > power) {
				power = vPower
				showVo = v;
			}
		}
		if (showVo) {
			IconUtil.setImg(self.img, Enum_Path.PIC_URL + showVo.pic + ".png");
			if (self.bwEff) {
				EffectMgr.instance.removeEff(self.bwEff);
				self.bwEff = null;
			}
			if (showVo.lib.tptx > 0) {
				if (!self.bwEff) {
					self.bwEff = EffectMgr.addEff("uieff/" + showVo.lib.tptx, self.img.displayObject as fairygui.UIContainer, self.img.width / 2, self.img.height / 2, 1000, -1, true);
				}
			}
			self.img.visible = true;
		} else {
			self.img.visible = false;
		}

		//升阶战力
		// var clotheslv = Config.booklv_213[jieShu]
		// self.labPower.text = "" + (clotheslv ? clotheslv.power : 0);
		self.labPower.text = "" + self.upPower();
		const cnt = Model_Bag.getItemCount(415006);
		if (self._clotheslv == null) {//0级
			self.labAttrCur.text = "";
			self.labAttrNext.text = "";
			self.labAttrMax.text = "";
			self.imgArrow.visible = false;
			self.zhiShengDan.data = { type: 6, count: cnt, lvl: 0, isFull: false };
		} else if (self._clothesNext == null) {//满级
			self.labAttrCur.text = "";
			self.labAttrNext.text = "";
			self.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._clotheslv.attr), "+", null, "#15f234");
			self.imgArrow.visible = false;
			self.zhiShengDan.data = { type: 6, count: cnt, lvl: self._clotheslv.id, isFull: true };
		} else {
			self.imgArrow.visible = true;
			self.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._clotheslv.attr), "+");
			self.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._clothesNext.attr), "+", null, "#15f234");
			self.labAttrMax.text = "";
			self.zhiShengDan.data = { type: 6, count: cnt, lvl: self._clotheslv.id, isFull: false };
		}
		// 80 - 83
		let equiDa = Model_player.voMine.equipData
		for (let i = 0; i < 4; i++) {
			self._equipArr[i].vo = equiDa[i + 80];
			self._equipArr[i].showNotice = Model_BySys.canWear(i + 80, Model_BySys.BING_FA);
			if (equiDa[i + 80] == null) {
				self._equipArr[i].setGrayBg(i + 80);
			}
		}
		self.btnEquip.visible = Model_BingFa.bingFaWearArr().length > 0;
		self.btnEquip.checkNotice = true;
	}

	private upPower(): number {
		var power = 0
		//升阶战力
		let jieShu = Model_BySys.sysJie(Model_BySys.BING_FA);
		var clotheslv = Config.booklv_213[jieShu]
		power += clotheslv ? clotheslv.power : 0;
		//技能战力
		power += this.getPowerSkill();
		//装备战力
		let equiDa = Model_player.voMine.equipData
		for (let i = 0; i < 4; i++) {
			let eq: VoEquip = equiDa[i + 80];
			if (eq) {
				power += eq.basePower;
			}
		}
		return power
	}

	//技能战力
	public getPowerSkill(): number {
		var power = 0;
		let skillArr = Model_BySys.sysSkillArr(Model_BySys.BING_FA);
		if (skillArr) {
			for (let i = 0; i < skillArr.length; i++) {
				let skillId: number = skillArr[i];
				let skill = Config.booklvskill_213[skillId];
				power += skill ? skill.power : 0
			}
		}
		return power;
	}

	private onClickUp(event: egret.TouchEvent): void {
		var target: fairygui.GButton = event.currentTarget as fairygui.GButton
		var type = 1;
		if (target.id == this.btnUp.id) {
			type = 0;
		}
		var count = Model_Bag.getItemCount(Model_BingFa.DAN_LEVELUP)
		if (count <= 0) {
			View_CaiLiao_GetPanel.show(this._needItem);
			return;
		}
		if (this._clotheslv == null) {
			return;
		}
		if (this._clotheslv.exp == 0) {
			ViewCommonWarn.text("已满阶")
			return;
		}
		VZhiShengDan.invalNum = 1;
		GGlobal.modelBySys.CGUpjiebysys(Model_BySys.BING_FA, type)
	}

	private _skillArr;
	private renderHandle(index: number, obj: fairygui.GObject): void {
		var item: VSysSkillItem = obj as VSysSkillItem;
		item.vo = this._skillArr[index];
	}

	private itemHandler(event: fairygui.ItemEvent): void {
		let grid: VSysSkillItem = event.itemObject as VSysSkillItem;
		GGlobal.layerMgr.open(UIConst.BY_SYS_TIP_SKILL, grid.vo);
	}

	private onEquip(): void {
		let s = this;
		let sendArr = Model_BingFa.bingFaWearArr();
		let a = []
		for (let i = 0; i < sendArr.length; i++) {
			a.push(sendArr[i].sid)
		}
		if (a.length > 0) {
			GGlobal.modelEquip.CGWearbypart(5, a);
		} else {
			ViewCommonWarn.text("无可穿戴的装备");
		}
	}

	private onEquipTips(e: egret.Event) {
		var v: ViewGridRender = e.currentTarget as ViewGridRender
		if (!v.vo) {
			let nitem = VoItem.create(410037);
			View_CaiLiao_GetPanel.show(nitem);
		}
	}
}