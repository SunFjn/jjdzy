class TipQianNengDan extends UIModalPanel {

	// public bg: fairygui.GLoader;
	// public imgIcon: fairygui.GLoader;
	public grid: ViewGrid
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
		let m = GGlobal.model_QianNeng
		self.btnOneKey.addClickListener(self.onClickEat, self);
		self.btnEat.addClickListener(self.onClickEat, self);
		m.listen(Model_QianNeng.OPENUI, self.show, self);
		this._sz = this._args[0];
		this._vo = this._args[1];
		this.show();
	}

	protected onHide(): void {
		let self = this;
		let m = GGlobal.model_QianNeng
		self.btnOneKey.removeClickListener(self.onClickEat, self);
		self.btnEat.removeClickListener(self.onClickEat, self);
		m.remove(Model_QianNeng.OPENUI, self.show, self);
		self.grid.clean();
	}


	private _vo: VoItem;
	private _sz: Vo_ShaoZhu;
	private _dan: { ty: number, cfg: Idrug_200, ct: number };
	private _maxCount: number;
	private show(): void {
		let s = this;
		let model = GGlobal.modelShaoZhu
		let m = GGlobal.model_QianNeng
		let qn = m.qianNObj[s._sz.shaozhuID]
		var vo: VoItem = s._vo;
		s.grid.tipEnabled = false;
		s.grid.isShowEff = true;
		s.grid.vo = vo
		// ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", this.bg);
		// ImageLoader.instance.loader(Enum_Path.ICON70_URL + vo.icon + ".png", this.imgIcon);
		this.labName.text = vo.name;
		this.labName.color = Color.getColorInt(vo.quality)
		this._maxCount = 0;
		if (vo.id == Model_QianNeng.EAT_DAN0) {
			this._maxCount = qn.cfg.max1
		} else {
			this._maxCount = qn.cfg.max2
		}

		for (let i = 0; i < qn.danArr.length; i++) {
			let dan = qn.danArr[i]
			if (dan.cfg.id == s._vo.id) {
				s._dan = dan
				break;
			}
		}

		this.labHas.text = "已吞噬：" + s._dan.ct + "/" + this._maxCount;
		vo.count = Model_Bag.getItemCount(vo.id);
		this.labCount.text = "拥有数量：" + vo.count;
		//属性
		var arr = JSON.parse(s._dan.cfg.attr)
		for (let i: number = 0; i < arr.length; i++) {
			arr[i][1] = Number(arr[i][1]) * s._dan.ct;
		}
		this.labAttr.text = ConfigHelp.attrString(arr, "+")
		this.lab.text = "提升潜能可增加吞噬上限"

		this.btnEat.checkNotice = vo.count > 0 && s._dan.ct < this._maxCount;
		this.btnOneKey.checkNotice = vo.count > 0 && s._dan.ct < this._maxCount;
	}

	private onClickEat(e: egret.TouchEvent): void {
		var type = 0;
		let s = this;
		if (e.currentTarget == s.btnOneKey) {
			type = 1;
		}
		if (s._vo.count <= 0) {
			View_CaiLiao_GetPanel.show(s._vo);
			return;
		}
		if (s._dan.ct >= this._maxCount) {
			ViewCommonWarn.text("提升潜能可增加吞噬上限")
			return;
		}
		let ct = type == 1 ? s._vo.count : 1;
		GGlobal.model_QianNeng.CG_EAT_5137(s._sz.shaozhuID, s._dan.ty, ct);
	}
}