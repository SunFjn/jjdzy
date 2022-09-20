class VipDiscountItem extends fairygui.GComponent{
	public c1: fairygui.Controller;
	private buyBtn: Button1;
	public oldPrice: fairygui.GTextField;
	public vipTxt: fairygui.GTextField;
	public rewardList: fairygui.GList;
	public curPrice: fairygui.GRichTextField;
	private extractBtn: fairygui.GButton;
	public n14: fairygui.GGroup;

	private curData:Vo_VipDisData;
	private awards = [];
	private _curCfg:Ixhdvip_402;

	public static URL: string = "ui://mpjztentvt1r12";

	public static createInstance(): VipDiscountItem {
		return <VipDiscountItem><any>(fairygui.UIPackage.createObject("actComVipDis", "VipDiscountItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let self = this;
		CommonManager.parseChildren(self, self);

		self.rewardList.callbackThisObj = self;
        self.rewardList.itemRenderer = self.awardsRender;
	}

	private _mc: Part;
	public setdata(cfg:Ixhdvip_402, isPlayEff:boolean = false) {
		let self = this;
		self._curCfg = cfg;
		self.extractBtn.addClickListener(self.onExtract, self);
		self.buyBtn.addClickListener(self.onBuy, self);

		let costArr = JSON.parse(cfg.oldmoney);
        self.oldPrice.text = "原价" + costArr[0][2] + "元宝";

		self.vipTxt.text = BroadCastManager.reTxt("Vip{0}", cfg.ID);

		self.awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.item));
        self.rewardList.numItems = self.awards.length;

		self.curData = Model_VipDiscount.getVipDisData(cfg.ID);
		if(Model_VipDiscount.curVip < cfg.ID)//vip等级不足
		{
			self.c1.selectedIndex = 3;
		}else if(self.curData)
        {
			self.buyBtn.text = "购买("+ self.curData.buyCount + "/" + cfg.time +")";
			self.curPrice.text = this.curData.curPrice + "";
			if(self.curData.buyCount >= cfg.time)
            {
				self.c1.selectedIndex = 2;
			}else{
				self.c1.selectedIndex = 1;
				self.buyBtn.checkNotice = true;
				if(isPlayEff)
				{
					self.n14.visible = false;
					self.buyBtn.visible = false;
				}else{
					self.n14.visible = true;
					self.buyBtn.visible = true;
				}
			}
		}else{
			self.c1.selectedIndex = 0;
		}
		if(isPlayEff)
		{
			if (!self._mc) {
				self._mc = EffectMgr.addEff("uieff/10091", self.displayListContainer, self.width - 100, self.height / 2, 500, 500, false);
				self._mc.refThis = self;
				self._mc.refKey = "_mc";
			}
			Timer.instance.callLater(self.runAfterMc, 500, self);
		}else {
			if (Timer.instance.has(self.runAfterMc, self))
				Timer.instance.remove(self.runAfterMc, self);
			if (self._mc) {
				EffectMgr.instance.removeEff(self._mc);
			}
		}
	}

	private runAfterMc() {
		let self = this;
		self.n14.visible = true;
		self.buyBtn.visible = true;
	}

	/**
     * 奖励List
     */
    private awardsRender(idx, obj) {
        let item: ViewGrid = obj as ViewGrid;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.showEff(true);
    }

	public clean() {
		let self = this;
		let len:number = self.awards.length;
		for (let i = 0; i < len; i++) {
			self.awards[i].tipEnabled = false;
			self.awards[i].showEff(false);
		}
		self.extractBtn.removeClickListener(self.onExtract, self);
		self.buyBtn.removeClickListener(self.onBuy, self);
	}

	/**
     * 购买
     */
    private onBuy()
    {
		GGlobal.modelVipDiscount.CG_BUY(this._curCfg.ID);
	}

	/**
     * 抽取折扣
     */
    private onExtract()
    {
		GGlobal.modelVipDiscount.CG_EXTRACT_DISCOUNT(this._curCfg.ID);
	}
}