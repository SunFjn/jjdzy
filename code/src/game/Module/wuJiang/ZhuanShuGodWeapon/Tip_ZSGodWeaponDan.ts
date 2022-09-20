class Tip_ZSGodWeaponDan extends UIModalPanel {
	public grid: ViewGrid
	// public bg: fairygui.GLoader;
	// public imgIcon: fairygui.GLoader;
	public labName: fairygui.GTextField;
	public labHas: fairygui.GTextField;
	public labCount: fairygui.GTextField;
	public lab: fairygui.GTextField;
	public lab1: fairygui.GTextField;
	public labAttr: fairygui.GTextField;
	public btnEat: Button0;
	public btnOneKey: Button1;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("common", "TipEatDan").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	protected onShown() {
		let self = this;
		self.btnOneKey.addClickListener(self.onClickEat, self);
		self.btnEat.addClickListener(self.onClickEat, self);
		GGlobal.control.listen(UIConst.ZS_GODWEAPON_DAN, self.update, self);
	}

	protected onHide(): void {
		let self = this;
		self.btnOneKey.removeClickListener(self.onClickEat, self);
		self.btnEat.removeClickListener(self.onClickEat, self);
		GGlobal.control.remove(UIConst.ZS_GODWEAPON_DAN, self.update, self);
		GGlobal.layerMgr.close(UIConst.ZS_GODWEAPON_DAN);
		self.grid.clean();
	}

	private update(vo: Vo_ZSGodWeapon): void {
		this.show({ vo: vo, index: this.index });
	}

	public onOpen(arg): void {
		super.onOpen(arg)
		this.show(arg)
	}

	private _vo: Vo_ZSGodWeapon;
	private _drug_type: number;
	private _eatCount: number;
	private _maxCount: number;
	private itemVo: VoItem;
	private index = 0;
	private show(obj: any): void {
		let self = this;
		let vo: Vo_ZSGodWeapon = obj.vo;
		self.index = obj.index;
		self._vo = vo;
		self.itemVo = VoItem.create(Model_ZSGodWeapon.danIDArr[self.index]);

		self.grid.tipEnabled = false;
		self.grid.isShowEff = true;
		self.grid.vo = self.itemVo
		// ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + self.itemVo.quality + ".png", this.bg);
		// ImageLoader.instance.loader(Enum_Path.ICON70_URL + self.itemVo.icon + ".png", self.imgIcon);
		self.labName.text = self.itemVo.name;
		self.labName.color = Color.getColorInt(self.itemVo.quality)
		self._maxCount = vo.starLv * vo.cfg["max" + (self.index + 1)];
		self._eatCount = vo.tunshiArr[self.index];
		var drug = Config.sbsz_750[self.index + 1];
		self.labHas.text = "已吞噬：" + self._eatCount + "/" + self._maxCount;
		self.itemVo.count = Model_Bag.getItemCount(Model_ZSGodWeapon.danIDArr[self.index]);
		self.labCount.text = "拥有数量：" + self.itemVo.count;

		let attStr = "";
		if (drug.attr1 != "0") {
			var arr = JSON.parse(drug.attr1)
			for (let i: number = 0; i < arr.length; i++) {
				let attrType: number = Number(arr[i][0]);
				let attrValue: number = Number(arr[i][1]);
				attrValue = attrValue * self._eatCount;
				arr[i][1] = attrValue;
			}
			attStr = ConfigHelp.attrString(arr, "+");
		} else {
			attStr = "升星属性+" + drug.attr2 * self._eatCount / 1000 + "%\n" + "淬炼属性+" + drug.attr2 * self._eatCount / 1000 + "%";
		}
		self.labAttr.text = attStr;
		self.lab.text = "神兵激活（升星）可增加吞噬上限";
		self.lab1.text = ConfigHelp.reTxt("已永久增加神兵·{0}属性", HtmlUtil.fontNoSize(vo.cfg.name, Color.getColorStr(vo.quality)));
		self.btnEat.checkNotice = self.itemVo.count > 0 && self._eatCount < self._maxCount;
		self.btnOneKey.checkNotice = self.itemVo.count > 0 && self._eatCount < self._maxCount;
	}

	private onClickEat(e: egret.TouchEvent): void {
		var type = 0;
		let self = this;
		if (e.currentTarget == this.btnOneKey) {
			type = 1;
		}
		if (self.itemVo.count <= 0) {
			View_CaiLiao_GetPanel.show(self.itemVo);
			return;
		}
		if (this._eatCount >= this._maxCount) {
			ViewCommonWarn.text("提升神兵星级可增加吞噬上限")
			return;
		}
		GGlobal.modelGodWeapon.CG_GodWeapon_godForge_7855(self._vo.job, self.index + 1, type);
	}
}