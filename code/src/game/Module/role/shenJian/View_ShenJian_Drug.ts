class View_ShenJian_Drug extends UIModalPanel {
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

	private tunshiHandle(event: egret.TouchEvent): void {
		switch (event.target.id) {
			case this.btnEat.id:
				if (this.btnEat.checkNotice) {
					GGlobal.modelsj.CG_SHENJIAN_TUNSHI(0);
					return;
				}
				break;
			case this.btnOneKey.id:
				if (this.btnOneKey.checkNotice) {
					GGlobal.modelsj.CG_SHENJIAN_TUNSHI(1);
					return;
				}
				break;
		}
		if (Model_ShenJian.drugCount >= Model_ShenJian.drugMax) {
			ViewCommonWarn.text("吞噬已满");
		} else {
			View_CaiLiao_GetPanel.show(this.itemVo);
		}
	}

	private itemVo: VoItem;
	public updateShow(): void {
		let cfg = Config.drug_200[Model_ShenJian.drugIndex];
		let itemID = Model_ShenJian.drugId;
		this.itemVo = VoItem.create(itemID);
		this.grid.tipEnabled = false;
		this.grid.isShowEff = true;
		this.grid.vo = this.itemVo
		// ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + this.itemVo.quality + ".png", this.bg);
		// ImageLoader.instance.loader(Enum_Path.ICON70_URL + this.itemVo.icon + ".png", this.imgIcon);
		let num = Model_Bag.getItemCount(itemID);
		let attArr: Array<any> = JSON.parse(cfg.attr);
		let attstr = "";
		for (let i = 0; i < attArr.length; i++) {
			if (i == 0) {
				attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1] * Model_ShenJian.drugCount);
			} else {
				attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1] * Model_ShenJian.drugCount);
			}
		}
		this.lab.text = "神剑激活（升星）可增加吞噬上限"
		this.labAttr.text = attstr;
		this.labName.text = this.itemVo.name;
		this.labName.color = Color.getColorInt(this.itemVo.quality)
		this.labHas.text = "已吞噬：" + Model_ShenJian.drugCount + "/" + Model_ShenJian.drugMax;
		this.labCount.text = "拥有数量：" + num;
		if (Model_ShenJian.drugCount >= Model_ShenJian.drugMax) {
			this.btnOneKey.checkNotice = this.btnEat.checkNotice = false;
		} else {
			this.btnOneKey.checkNotice = this.btnEat.checkNotice = num > 0;
		}
	}

	protected onShown(): void {
		this.btnOneKey.addClickListener(this.tunshiHandle, this);
		this.btnEat.addClickListener(this.tunshiHandle, this);
		GGlobal.reddot.listen(ReddotEvent.CHECK_SHENJIAN, this.updateShow, this);
		this.updateShow();
	}

	protected onHide(): void {
		this.btnOneKey.removeClickListener(this.tunshiHandle, this);
		this.btnEat.removeClickListener(this.tunshiHandle, this);
		GGlobal.reddot.remove(ReddotEvent.CHECK_SHENJIAN, this.updateShow, this);
		GGlobal.layerMgr.close(UIConst.SHEN_JIAN_DRUG);
		this.grid.clean();
	}
}