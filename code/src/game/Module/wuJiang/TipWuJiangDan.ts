class TipWuJiangDan extends UIModalPanel {
	public grid: ViewGrid
	// public bg: fairygui.GLoader;
	// public imgIcon: fairygui.GLoader;
	public labName: fairygui.GTextField;
	public labHas: fairygui.GTextField;
	public labCount: fairygui.GTextField;
	public lab: fairygui.GTextField;
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
		GGlobal.control.listen(Enum_MsgType.WUJIANG_USE_DAN, self.update, self);
	}

	protected onHide(): void {
		let self = this;
		self.btnOneKey.removeClickListener(self.onClickEat, self);
		self.btnEat.removeClickListener(self.onClickEat, self);
		GGlobal.control.remove(Enum_MsgType.WUJIANG_USE_DAN, self.update, self);
		GGlobal.layerMgr.close(UIConst.TIP_WUJIANG_DAN);
		self.grid.clean()
	}

	private update(): void {
		this.show(this._vo);
	}

	public onOpen(arg): void {
		super.onOpen(arg)
		this.show(arg)
	}

	private _vo: VoItem;
	private _drug_type: number;
	private _eatCount: number;
	private _maxCount: number;
	private show(obj: any): void {
		var vo: VoItem = obj;
		this.grid.tipEnabled = false;
		this.grid.isShowEff = true;
		this.grid.vo = vo
		// ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", this.bg);
		// ImageLoader.instance.loader(Enum_Path.ICON70_URL + obj.icon + ".png", this.imgIcon);
		this._vo = vo;
		this.labName.text = vo.name;
		this.labName.color = Color.getColorInt(vo.quality)
		this._maxCount = 0;
		if (vo.id == Model_WuJiang.DAN_SHUXING) {
			this._drug_type = Model_WuJiang.DRUG_SHUXING;
			this._eatCount = Model_WuJiang.danShuxing
		} else {
			// this._drug_type = Model_WuJiang.DRUG_ZIZHI;
			// this._eatCount = Model_WuJiang.danZizhi
		}
		var drug = Config.drug_200[this._drug_type];

		for (let keys in Model_WuJiang.wuJiangStar) {
			var star = Model_WuJiang.wuJiangStar[keys];
			var hero = Config.hero_211[keys]
			if (vo.id == Model_WuJiang.DAN_SHUXING) {
				this._maxCount += hero.max1 * star
			} else {
				this._maxCount += hero.max2 * star
			}
		}
		this.labHas.text = "已吞噬：" + this._eatCount + "/" + this._maxCount;
		vo.count = Model_Bag.getItemCount(vo.id);
		this.labCount.text = "拥有数量：" + vo.count;

		var arr = ConfigHelp.SplitStr(drug.attr)
		for (let i: number = 0; i < arr.length; i++) {
			let attrType: number = Number(arr[i][0]);
			let attrValue: number = Number(arr[i][1]);
			attrValue = attrValue * this._eatCount;
			arr[i][1] = attrValue;
		}
		this.labAttr.text = ConfigHelp.attrString(arr, "+")
		this.lab.text = "武将激活（升星）可增加吞噬上限"

		this.btnEat.checkNotice = vo.count > 0 && this._eatCount < this._maxCount;
		this.btnOneKey.checkNotice = vo.count > 0 && this._eatCount < this._maxCount;
	}

	private onClickEat(e: egret.TouchEvent): void {
		var type = 0;
		if (e.currentTarget == this.btnOneKey) {
			type = 1;
		}
		if (this._vo.count <= 0) {
			View_CaiLiao_GetPanel.show(this._vo);
			return;
		}
		if (this._eatCount >= this._maxCount) {
			ViewCommonWarn.text("提升武将星级可增加吞噬上限")
			return;
		}
		GGlobal.modelWuJiang.CGUseDan(this._drug_type == Model_WuJiang.DRUG_SHUXING ? 0 : 1, type)
	}
}