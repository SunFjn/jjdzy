class ViewSYZLB extends UIPanelBase {

	//>>>>start
	public c1: fairygui.Controller;
	public frame: frame3;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public tab3: TabButton;
	//>>>>end

	public static URL: string = "ui://3o8q23uuhiz70";

	public static createInstance(): ViewSYZLB {
		return <ViewSYZLB><any>(fairygui.UIPackage.createObject("syzlb", "ViewSYZLB"));
	}

	public constructor() {
		super();
		this.setSkin("syzlb", "syzlb_atlas0", "ViewSYZLB");
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ItemSYZLBTeam.URL, ItemSYZLBTeam);
		f(ItemSYZLBJoin.URL, ItemSYZLBJoin);
		f(Child_SYZLB.URL, Child_SYZLB);
		f(ItemSYZLBTeamInfo.URL, ItemSYZLBTeamInfo);
		f(Child_ZSSF.URL, Child_ZSSF);
		f(ZSSFCityItem.URL, ZSSFCityItem);
		f(ZSSFGeneralGoItem.URL, ZSSFGeneralGoItem);
		f(ZSSFBattleReportItem.URL, ZSSFBattleReportItem);
		f(ZSSF_ShopItem.URL, ZSSF_ShopItem);

		f(LhfbTeamItem.URL, LhfbTeamItem);
		f(ChildLhfb.URL, ChildLhfb);
		f(LhfbCopyItem.URL, LhfbCopyItem);
		f(LhfbStarCom.URL, LhfbStarCom);
		f(ViewDengFeng.URL, ViewDengFeng);
		f(Child_DFZJ_Final.URL, Child_DFZJ_Final);
		f(Child_DFZJ_SeaSel.URL, Child_DFZJ_SeaSel);
		f(VDengFengBet.URL, VDengFengBet);
		f(VDengFengPly.URL, VDengFengPly);
		f(VDengFengPoint.URL, VDengFengPoint);
		f(VDengFengRank.URL, VDengFengRank);
	}

	private _tabContronller: TabController;
	protected initView(): void {
		let self = this;
		super.initView();
		self._tabContronller = new TabController();
		self._tabContronller.initView(self, self.c1);
		self._tabContronller.setPanelClassMap(
			[
				Child_ZSSF,
				Child_SYZLB,
				ChildLhfb,
				ViewDengFeng,
			]
		);

		self._tabContronller.tabChange = self.onTabChange;
		self._tabContronller.tabChangeCaller = self;
	}

	private _uidList = [UIConst.ZSSF, UIConst.SYZLB, UIConst.LHFB, UIConst.DENG_FENG_SEA];
	private onTabChange(pTabIndex: number, pVo: TabBtnVo) {
		let self = this;
		let arr = self._uidList;
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}
		return true;
	}

	public updateNotice() {
		let self = this;
		self.tab0.checkNotice = GGlobal.reddot.checkCondition(UIConst.ZSSF, 0) || GGlobal.reddot.checkCondition(UIConst.ZSSF, 1);
		self.tab3.checkNotice = GGlobal.reddot.checkCondition(UIConst.DENG_FENG_SEA, 0) || GGlobal.reddot.checkCondition(UIConst.DENG_FENG_FINAL, 0);
	}

	public onShown() {
		let self = this;
		self._tabContronller.registerEvent(true);
		let t_selectIndex = 0;
		if (self._args)
			t_selectIndex = self._args;
		self._tabContronller.selectedIndex = -1;
		self._tabContronller.selectedIndex = t_selectIndex;
		self.updateNotice();
		GGlobal.reddot.listen(UIConst.ZSSF, self.updateNotice, self);
		GGlobal.reddot.listen(UIConst.DENG_FENG_SEA, self.updateNotice, self);
		GGlobal.reddot.listen(UIConst.DENG_FENG_FINAL, self.updateNotice, self);
		ReddotMgr.ins().register(UIConst.LHFB + "|" + 0, self.tab2.noticeImg);
	}

	public onHide() {
		let self = this;
		self._tabContronller.registerEvent(false);
		self._tabContronller.close();
		GGlobal.reddot.remove(UIConst.ZSSF, self.updateNotice, self);
		GGlobal.reddot.remove(UIConst.DENG_FENG_SEA, self.updateNotice, self);
		GGlobal.reddot.remove(UIConst.DENG_FENG_FINAL, self.updateNotice, self);
		ReddotMgr.ins().unregister(self.tab2.noticeImg);
	}
}