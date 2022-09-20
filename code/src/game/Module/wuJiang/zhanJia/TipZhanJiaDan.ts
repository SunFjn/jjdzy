class TipZhanJiaDan extends UIModalPanel {
	public grid: ViewGrid
	public frame: fairygui.GComponent;
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
		GGlobal.control.listen(Enum_MsgType.ZHANJIA_OPENUI_UPDATE, self.update, self);
	}

	protected onHide(): void {
		let self = this;
		self.btnOneKey.removeClickListener(self.onClickEat, self);
		self.btnEat.removeClickListener(self.onClickEat, self);
		GGlobal.control.remove(Enum_MsgType.ZHANJIA_OPENUI_UPDATE, self.update, self);
		GGlobal.layerMgr.close(UIConst.TIP_ZHANJIA_DAN);
		self.grid.clean();
	}

	public onOpen(arg) {
		super.onOpen(arg)
		this.show(arg)
	}

	private update(): void {
		this.show(this._vo);
	}

	private _vo: VoItem;
	private _drug_type;
	private _eatCount: number
	private _maxCount: number
	private show(obj: any): void {
		var vo: VoItem = obj;
		this._vo = vo;
		this.grid.tipEnabled = false;
		this.grid.isShowEff = true;
		this.grid.vo = vo
		// ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", this.bg);
		// ImageLoader.instance.loader(Enum_Path.ICON70_URL + vo.icon + ".png", this.imgIcon);
		this.labName.text = vo.name;
		this.labName.color = Color.getColorInt(vo.quality)
		this._maxCount = 0
		if (vo.id == Model_ZhanJia.DAN_SHUXING) {
			this._drug_type = Model_ZhanJia.DRUG_SHUXING;
			this._eatCount = Model_ZhanJia.danShuxing
		} else {
			// this._drug_type = Model_ZhanJia.DRUG_ZIZHI;
			// this._eatCount = Model_ZhanJia.danZizhi
		}
		var drug = Config.drug_200[this._drug_type];
		for (let keys in Model_ZhanJia.zhanjiaStar) {
			var star = Model_ZhanJia.zhanjiaStar[keys];
			var zhanjia = Config.clothes_212[keys]
			if (vo.id == Model_ZhanJia.DAN_SHUXING) {
				this._maxCount += zhanjia.max1 * star
			} else {
				this._maxCount += zhanjia.max2 * star
			}
		}

		this.labHas.text = "已吞噬：" + this._eatCount + "/" + this._maxCount;
		vo.count = Model_Bag.getItemCount(vo.id);
		this.labCount.text = "拥有数量：" + vo.count;

		var arr = ConfigHelp.SplitStr(drug.attr)
		for (let i: number = 0; i < arr.length; i++) {
			let attrType: number = Number(arr[i][0]);
			let attrValue: number = Number(arr[i][1]);
			arr[i][1] = attrValue * this._eatCount;
		}
		this.labAttr.text = ConfigHelp.attrString(arr, "+")
		this.lab.text = "战甲激活（升星）可增加吞噬上限"
		this.btnEat.checkNotice = vo.count > 0 && this._eatCount < this._maxCount;
		this.btnOneKey.checkNotice = vo.count > 0 && this._eatCount < this._maxCount;
	}

	private onClickEat(e: egret.TouchEvent): void {
		var type = 0;
		if (e.currentTarget.id == this.btnOneKey.id) {
			type = 1;
		}
		if (this._vo.count <= 0) {
			View_CaiLiao_GetPanel.show(this._vo);
			return;
		}
		if (this._eatCount >= this._maxCount) {
			ViewCommonWarn.text("吞噬已满")
			return;
		}
		GGlobal.modelZhanJia.CGUseDan(this._drug_type, type)
	}
}



