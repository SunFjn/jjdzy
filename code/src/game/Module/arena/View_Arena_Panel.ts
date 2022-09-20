class View_Arena_Panel extends UIPanelBase {

	//>>>>start
	public c1: fairygui.Controller;
	public frame: frame3;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public tab3: TabButton;
	//>>>>end

	public static URL: string = "ui://me1skowlqiai0";

	private _tabContronller: TabController;

	public constructor() {
		super();
		this.setSkin("Arena", "Arena_atlas0", "View_Arena_Panel");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ViewDanDaoView.URL, ViewDanDaoView);
		f(SanGuoZSItem.URL, SanGuoZSItem);
		f(SanGuoZSItemPre.URL, SanGuoZSItemPre);
		f(Child_SanGuoZS.URL, Child_SanGuoZS);
		f(Child_DanDaoFH.URL, Child_DanDaoFH);
		f(Child_SanGuoWS.URL, Child_SanGuoWS);
		f(WardItem.URL, WardItem);
		f(SGCard.URL, SGCard);
		f(SGRankIt.URL, SGRankIt);
		f(SanGuoItem.URL, SanGuoItem);
		//乱世枭雄 枭雄争霸
		f(ViewCrossKingView.URL, ViewCrossKingView);
		f(ChildCrossWars.URL, ChildCrossWars);
		f(VCrossWars16.URL, VCrossWars16);
		f(VCrossWars8.URL, VCrossWars8);
		f(VCrossWars4.URL, VCrossWars4);
		f(VCrossWars2.URL, VCrossWars2);
		f(VCrossWarsReward.URL, VCrossWarsReward);
		f(VCrossWarsWin.URL, VCrossWarsWin);
		f(VCrossWarsBet.URL, VCrossWarsBet);
		f(VCrossKingReward.URL, VCrossKingReward);
		f(VCrossKingReport.URL, VCrossKingReport);
		f(ChildCrossKingReward.URL, ChildCrossKingReward);
		f(ChildCrossKingPoint.URL, ChildCrossKingPoint);
		f(VCrossKingPoint.URL, VCrossKingPoint);
		f(VCrossKingRank.URL, VCrossKingRank);
		f(ChildCrossKing.URL, ChildCrossKing);
		f(VCrossKingPly.URL, VCrossKingPly);

		//跨服王者
		f(ChildKfwz.URL, ChildKfwz);
		f(KfwzBoxItem.URL, KfwzBoxItem);
		f(KfwzGradeItem.URL, KfwzGradeItem);
		f(KfwzHead.URL, KfwzHead);
		f(KfwzLogItem.URL, KfwzLogItem);
		f(KfwzRankItem.URL, KfwzRankItem);
		f(KfwzTeamItem.URL, KfwzTeamItem);
		f(KfwzTeamListItem.URL, KfwzTeamListItem);
		f(KfwzHeadBattle.URL, KfwzHeadBattle);
		f(KfwzTeamItemBg.URL, KfwzTeamItemBg);
	}

	protected initView(): void {
		super.initView();

		this._tabContronller = new TabController();
		this._tabContronller.initView(this, this.c1);
		this._tabContronller.setPanelClassMap(
			[
				Child_SanGuoZS,
				ViewDanDaoView,
				ViewCrossKingView,
				ChildKfwz,
			]
		);

		this._tabContronller.tabChange = this.onTabChange;
		this._tabContronller.tabChangeCaller = this;
	}

	private _uidList = [UIConst.SANGUO_ZHANSHEN, UIConst.DANDAO_FUHUI, UIConst.CROSS_KING, UIConst.KFWZ];
	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		let arr = this._uidList;
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}
		pVo.data = this._args;
		return true;
	}

	// private tabHandle(event: egret.TouchEvent): void {
	// 	let index: number = event.target.data;
	// 	if (this.c1.selectedIndex == index) return;
	// 	let arr = [UIConst.SANGUO_ZHANSHEN, UIConst.DANDAO_FUHUI, UIConst.CROSS_KING];
	// 	if (!ModuleManager.isOpen(arr[index], true)) {
	// 		this.tabArr[index].selected = false;
	// 		return;
	// 	}
	// 	this.tabArr[this.c1.selectedIndex].selected = false;
	// 	this.tabArr[index].selected = true;
	// 	this.c1.selectedIndex = index;
	// }

	// private tempPanel;
	// public updateShow(): void {
	// 	let a = this;
	// 	if (a.tempPanel) {
	// 		a.tempPanel.clean();
	// 		a.tempPanel = null;
	// 	}
	// 	switch (a.c1.selectedIndex) {
	// 		case 0:
	// 			a.item0.show();
	// 			a.tempPanel = a.item0;
	// 			break;
	// 		case 1:
	// 			a.item1.show(a._args);
	// 			a.tempPanel = a.item1;
	// 			break;
	// 		case 2:
	// 			a.item2.show(a._args);
	// 			a.tempPanel = a.item2;
	// 			break;
	// 	}
	// }

	protected closeEventHandler(evt: egret.Event): void {
		Model_DDFH.autoMath = false;
		this.hide();
	}

	private checkTab() {
		let red = GGlobal.reddot;
		this._tabContronller.getTabBtnByIndex(0).checkNotice = red.checkCondition(UIConst.SANGUO_ZHANSHEN, 0) || red.checkCondition(UIConst.SANGUO_ZHANSHEN, 1);
		this._tabContronller.getTabBtnByIndex(1).checkNotice = red.checkCondition(UIConst.DANDAO_FUHUI) || red.checkCondition(UIConst.SANGUO_WUSHUANG);
		this._tabContronller.getTabBtnByIndex(2).checkNotice = red.checkCondition(UIConst.CROSS_KING) || red.checkCondition(UIConst.CROSS_WARS);
	}

	protected onShown(): void {
		this._tabContronller.registerEvent(true);

		let a = this;

		let t_selectIndex = 0;
		if (a._args) {
			if (a._args == 1 || a._args == 2) {
				t_selectIndex = 1;
			} else if (a._args == 3 || a._args == 4) {
				t_selectIndex = 2;
			} else if (a._args == 5) {
				t_selectIndex = 3;
			} else {
				t_selectIndex = 0
			}
		}
		this._tabContronller.selectedIndex = -1;
		this._tabContronller.selectedIndex = t_selectIndex;

		this.checkTab();
		let red = GGlobal.reddot;
		red.listen(UIConst.DANDAO_FUHUI, a.checkTab, a);
		red.listen(UIConst.SANGUO_ZHANSHEN, a.checkTab, a);
		red.listen(UIConst.SANGUO_WUSHUANG, a.checkTab, a);
		red.listen(ReddotEvent.CHECK_CROSS_KING, a.checkTab, a);
		red.listen(ReddotEvent.CHECK_CROSS_WARS, a.checkTab, a);
		// a._args = null
		ReddotMgr.ins().register(UIConst.KFWZ + "|" + 0, a.tab3.noticeImg);
	}

	protected onHide(): void {
		this._tabContronller.registerEvent(false);
		this._tabContronller.close();

		let a = this;
		let red = GGlobal.reddot;
		GGlobal.layerMgr.close(UIConst.ARENA);
		red.remove(UIConst.DANDAO_FUHUI, a.checkTab, a);
		red.remove(UIConst.SANGUO_ZHANSHEN, a.checkTab, a);
		red.remove(UIConst.SANGUO_WUSHUANG, a.checkTab, a);
		red.remove(ReddotEvent.CHECK_CROSS_KING, a.checkTab, a);
		red.remove(ReddotEvent.CHECK_CROSS_WARS, a.checkTab, a);
		ReddotMgr.ins().unregister(a.tab3.noticeImg);
	}

	public guide_sgzs(step) {
		let t_panel: Child_SanGuoZS = <any>this._tabContronller.getTabPanelInstByIndex(0);
		if (t_panel)
			t_panel.setGuide(Handler.create(t_panel, t_panel.guide_battle, [step], true));
	}

	public guideClosePanel(step) {
		let btn = this.closeButton.asButton;
		GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
		GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
	}
}