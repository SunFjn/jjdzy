class ViewCrossKingPanel extends UIPanelBase {

	public c1: fairygui.Controller;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public tab3: TabButton;
	public imgDoub0: fairygui.GImage;
	public imgDoub1: fairygui.GImage;

	public static URL: string = "ui://yqpfuleft2ds0";

	private _first: boolean = true;

	public static createInstance(): ViewCrossKingPanel {
		return <ViewCrossKingPanel><any>(fairygui.UIPackage.createObject("crossKing", "ViewCrossKingPanel"));
	}

	public constructor() {
		super();
		this.setSkin("crossKing", "crossKing_atlas0", "ViewCrossKingPanel");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory;
		f.setPackageItemExtension(TeamDataItem.URL, TeamDataItem);
		f.setPackageItemExtension(ChildCrossTeam.URL, ChildCrossTeam);
		f.setPackageItemExtension(TeamFuBenItem.URL, TeamFuBenItem);
		f.setPackageItemExtension(TeamRoleItem.URL, TeamRoleItem);
		f.setPackageItemExtension(CrossTeamRankInfo.URL, CrossTeamRankInfo);
		f.setPackageItemExtension(ChildSJMJ.URL, ChildSJMJ);
		f.setPackageItemExtension(ItemSJMJ.URL, ItemSJMJ);
		f.setPackageItemExtension(ChildCrossMineral.URL, ChildCrossMineral);
		f.setPackageItemExtension(MineralItem.URL, MineralItem);
		f.setPackageItemExtension(LootMineralItem.URL, LootMineralItem);
		f.setPackageItemExtension(MineralTeamItem.URL, MineralTeamItem);
		f.setPackageItemExtension(ChildCrossShiLian.URL, ChildCrossShiLian);
		f.setPackageItemExtension(ShiLianChooseItem.URL, ShiLianChooseItem);
		f.setPackageItemExtension(ShiLianBuffChooseItem.URL, ShiLianBuffChooseItem);
	}

	private _tabContronller: TabController;
	protected initView(): void {
		super.initView();
		let self = this;
		self._tabContronller = new TabController();
		self._tabContronller.initView(self, self.c1);
		self._tabContronller.setPanelClassMap(
			[
				ChildCrossTeam,
				ChildSJMJ,
				ChildCrossMineral,
				ChildCrossShiLian,
			]
		);
		self._tabContronller.tabChange = self.onTabChange;
		self._tabContronller.tabChangeCaller = self;
	}

	private _uidList = [UIConst.CROSS_TEAM, UIConst.SJMJ1, UIConst.CROSS_MINERAL, UIConst.CROSS_SHILIAN];
	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		let arr = this._uidList;
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}
		if (arr[pTabIndex] == UIConst.CROSS_SHILIAN) {
			let ms = Model_GlobalMsg.getServerTime();
			let nowDate = new Date(ms);
			let h = nowDate.getHours();
			let nowMin = nowDate.getMinutes();
			let nowSec = nowDate.getSeconds();
			if (h <= 0 && nowMin * 60 + nowSec <= 300) {
				ViewCommonWarn.text("跨服试炼重置中");
				return false;
			}
			this.tab3.checkNotice = false;
			let date: Date = new Date(Model_GlobalMsg.getServerTime());
			let key = UIConst.CROSS_SHILIAN + "#" + date.getDay() + date.getMonth() + date.getFullYear();
			if (!LocalStorageUtil.getItem(key)) {
				GGlobal.reddot.notify(ReddotEvent.CHECK_CROSS_SJMJ);
				LocalStorageUtil.setItem(key, "1");
				GGlobal.reddot.setCondition(UIConst.CROSS_SHILIAN, 0, false);
			}
		}
		return true;
	}

	protected onShown(): void {
		let self = this;
		self._tabContronller.registerEvent(true);
		let t_selectIndex = 0;
		if (self._args)
			t_selectIndex = self._args;
		self._tabContronller.selectedIndex = -1;
		self._tabContronller.selectedIndex = t_selectIndex;
		self.addListen();
		self.checkSJMJ();
		self.checkMineral();
		let act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
		let boo = (act != null);
		self.imgDoub0.visible = boo
		self.imgDoub1.visible = boo
	}

	protected onHide(): void {
		this.removeListen();
		GGlobal.layerMgr.close(UIConst.CROSS_TEAM);
	}

	private addListen(): void {
		let r = GGlobal.reddot;
		r.listen(ReddotEvent.CHECK_CROSS_SJMJ, this.checkSJMJ, this);
		r.listen(UIConst.CROSS_MINERAL, this.checkMineral, this);
	}

	private removeListen(): void {
		let self = this;
		let r = GGlobal.reddot
		self._tabContronller.registerEvent(false);
		self._tabContronller.close();
		r.remove(ReddotEvent.CHECK_CROSS_SJMJ, self.checkSJMJ, self);
		r.remove(UIConst.CROSS_MINERAL, self.checkMineral, self);
		self._first = true;
	}


	private checkSJMJ() {
		let self = this;
		self.tab1.checkNotice = GGlobal.reddot.checkCondition(UIConst.SJMJ1);
		self.tab3.checkNotice = GGlobal.reddot.checkCondition(UIConst.CROSS_SHILIAN, 0)
	}

	/** 检查矿藏按钮红点 */
	private checkMineral() {
		let r = GGlobal.reddot
		this.tab2.checkNotice = r.checkCondition(UIConst.CROSS_MINERAL, 0) || r.checkCondition(UIConst.CROSS_MINERAL, 1) || r.checkCondition(UIConst.CROSS_MINERAL, 2);
	}
}