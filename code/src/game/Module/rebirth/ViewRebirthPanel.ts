class ViewRebirthPanel extends UIPanelBase {
	//>>>>start
	public ctr1: fairygui.Controller;
	public frame: WindowFrame1;
	public btn0: TabButton;
	public btn1: TabButton;
	public btn2: TabButton;
	//>>>>end

	public static URL: string = "ui://dllc71i9vaaj0";

	private _tabContronller: TabController;

	public static createInstance(): ViewRebirthPanel {
		return <ViewRebirthPanel><any>(fairygui.UIPackage.createObject("rebirth", "ViewRebirthPanel"));
	}

	public constructor() {
		super();
		this.setSkin("rebirth", "rebirth_atlas0", "ViewRebirthPanel");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(JXGrid.URL, JXGrid);
		f(ChildGuanXian.URL, ChildGuanXian);
		f(Child_JinSheng.URL, Child_JinSheng);
		f(JinShengItem.URL, JinShengItem);
		f(JinShengGrid.URL, JinShengGrid);
		f(ChildAchievement.URL, ChildAchievement);
		f(AchieveIconBtn.URL, AchieveIconBtn);
		f(AchieveTaskItem.URL, AchieveTaskItem);
		f(AchievementMasterItem.URL, AchievementMasterItem);
		f(AchieveRewardItem.URL, AchieveRewardItem);
	}
	protected initView(): void {
		super.initView();

		this._tabContronller = new TabController();
		this._tabContronller.initView(this, this.ctr1);
		this._tabContronller.setPanelClassMap(
			[
				Child_JinSheng,
				ChildGuanXian,
				ChildAchievement,
			]
		);

		this._tabContronller.tabChange = this.onTabChange;
		this._tabContronller.tabChangeCaller = this;

		this.resetPosition();
	}

	private _uidList = [UIConst.JINSHENG, UIConst.GUANXIAN, UIConst.ACHIEVEMENT];
	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		let arr = this._uidList;
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}
		return true;
	}

	protected onShown(): void {
		this._tabContronller.registerEvent(true);
		let s = this;

		ReddotMgr.ins().register(UIConst.ACHIEVEMENT + "|" + 0, s.btn2.noticeImg);

		let t_selectIndex = 0;
		if (this._args)
			t_selectIndex = this._args;
		this._tabContronller.selectedIndex = -1;
		this._tabContronller.selectedIndex = t_selectIndex;

		GGlobal.reddot.listen(ReddotEvent.CHECK_REBIRTH, s.setNotice, s);
		GGlobal.reddot.listen(ReddotEvent.CHECK_ROLE, s.setNotice, s);
		s.setNotice();
		if (ModuleManager.isOpen(UIConst.PEACOCK) && Model_Peacock.curLayer == 0) {
			GGlobal.modelPeacock.CG_OPENUI();//转生需要孔雀台层数
		}
	}

	protected onHide(): void {
		let s = this;
		s._tabContronller.registerEvent(false);
		s._tabContronller.close();

		ReddotMgr.ins().unregister(s.btn2.noticeImg);
		GGlobal.reddot.remove(ReddotEvent.CHECK_REBIRTH, s.setNotice, s);
		GGlobal.reddot.remove(ReddotEvent.CHECK_ROLE, s.setNotice, s);
		GGlobal.layerMgr.close(UIConst.JINSHENG);
	}

	public onOpen(arg) {
		if (!arg) arg = 0;
		this._args = arg;
		if (this.isInit) {
			if (this.isShowing) {
				this.onShown();
			} else {
				super.show();
			}
		}
		if (this.isFullScreen) GGlobal.setUnitLayerVis(false);
	}

	private setNotice() {
		this._tabContronller.getTabBtnByIndex(0).checkNotice = GGlobal.reddot.checkCondition(UIConst.JINSHENG);
		this._tabContronller.getTabBtnByIndex(1).checkNotice = GGlobal.reddot.checkCondition(UIConst.GUANXIAN);
	}

	public guideFinishCheck(taskId) {
		if (this.ctr1.selectedIndex == 0) {
			let taskcfg = Config.mission_243[taskId];
			let t_panel: Child_JinSheng = <any>this._tabContronller.getTabPanelInstByIndex(0);
			if (t_panel)
				return t_panel.guideFinishCheck(taskcfg.can2);
		}
	}

	public guide_jinSheng_draw(step) {
		let self = this;
		let t_panel: Child_JinSheng = <any>this._tabContronller.getTabPanelInstByIndex(0);
		if (t_panel)
			t_panel.setGuide(Handler.create(t_panel, t_panel.guideTask, [step], true));
	}


	public guide_jinSheng_jihuo(step) {
		if (this.ctr1.selectedIndex == 0) {
			let t_panel: Child_JinSheng = <any>this._tabContronller.getTabPanelInstByIndex(0);
			if (t_panel) {
				GuideStepManager.instance.showGuide(t_panel.jihuoBt, t_panel.jihuoBt.width / 2, t_panel.jihuoBt.height / 2);
				GuideStepManager.instance.showGuide1(step.source.index, t_panel.jihuoBt, t_panel.jihuoBt.width / 2, t_panel.jihuoBt.height, 90, -106, 35);
				if (t_panel.jihuoBt.parent) t_panel.jihuoBt.parent.setChildIndex(t_panel.jihuoBt, t_panel.jihuoBt.parent.numChildren - 1);
			}
		}
	}

	public guideClosePanel(step) {
		let btn = this.closeButton.asButton;
		GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
		GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
	}

	public check_guideTab(arg) {
		return this.ctr1.selectedIndex == arg;
	}

	public guideTab(arg) {
		let tab = this._tabContronller.getTabBtnByIndex(arg);
		GuideStepManager.instance.showGuide(tab, tab.width / 2, tab.height / 2);
	}

	public guide_jianxian(step) {
		let t_panel: ChildGuanXian = <any>this._tabContronller.getTabPanelInstByIndex(1);
		if (t_panel) {
			GuideStepManager.instance.showGuide(t_panel.btnLvUp, t_panel.btnLvUp.width / 2, t_panel.btnLvUp.height / 2);
			GuideStepManager.instance.showGuide1(step.source.index, t_panel.btnLvUp, t_panel.btnLvUp.width / 2, 0, -90, -106, -100);
			if (t_panel.btnLvUp.parent) t_panel.btnLvUp.parent.setChildIndex(t_panel.btnLvUp, t_panel.btnLvUp.parent.numChildren - 1);
		}
	}

	public dispose() {
		if (this._tabContronller)
			this._tabContronller.destroy();
		super.dispose();
	}
}