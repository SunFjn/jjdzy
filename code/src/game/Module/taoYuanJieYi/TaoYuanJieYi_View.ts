/**
 * 桃园结义主界面
 */
class TaoYuanJieYi_View extends UIPanelBase{
	public c1: fairygui.Controller;

	private tabArr: TabButton[];
	private _tabContronller: TabController;
	protected _viewParent: fairygui.GObject;

	public constructor() {
		super();
		this.setSkin("taoYuanJieYi", "taoYuanJieYi_atlas0", "TaoYuanJieYi_View");
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory;
		f.setPackageItemExtension(TYJY_JoinItem.URL, TYJY_JoinItem);
		f.setPackageItemExtension(TYJY_ApplyItem.URL, TYJY_ApplyItem);
		f.setPackageItemExtension(TYJY_NoJoinItem.URL, TYJY_NoJoinItem);
		f.setPackageItemExtension(TYJY_ChangeItem.URL, TYJY_ChangeItem);
		f.setPackageItemExtension(TYJY_BossItem.URL, TYJY_BossItem);
		f.setPackageItemExtension(TYJY_TaskItem.URL, TYJY_TaskItem);
		f.setPackageItemExtension(TYJY_TaskItem1.URL, TYJY_TaskItem1);
		f.setPackageItemExtension(TYJY_TaskItem2.URL, TYJY_TaskItem2);
	 	f.setPackageItemExtension(Child_TYJY.URL, Child_TYJY);
		f.setPackageItemExtension(Child_TYTask.URL, Child_TYTask);
		f.setPackageItemExtension(Child_TYBoss.URL, Child_TYBoss);
		f.setPackageItemExtension(TaoYuanBossInfo.URL, TaoYuanBossInfo);
	}

	protected initView() {
		let self = this;
		self.tabArr = [self["tab0"], self["tab1"], self["tab2"]];
		self._tabContronller = new TabController();
		self._tabContronller.initView(self, self.c1);
		self._tabContronller.setPanelClassMap(
			[
				Child_TYJY,
				Child_TYTask,
				Child_TYBoss,
			]
		);
		self._tabContronller.tabChange = self.onTabChange;
		self._tabContronller.tabChangeCaller = self;
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	private _uidList = [UIConst.TAOYUANJIEYI, UIConst.TYJY_YMRW, UIConst.TYJY_YMFB];
	private _targetId = 0;
	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		let self = this;
		let arr = this._uidList;
		let t_id = arr[pTabIndex];
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}
		if(Model_player.voMine.tyjyId <= 0 && (pTabIndex == 1 || pTabIndex == 2))
		{
			ViewCommonWarn.text("你还没有加入义盟");
			return;
		}
		switch (pTabIndex) {
            case 0:
                pVo.data = self._targetId;
                self._targetId = 0;
                break;
        }
		return true;
	}

	protected onShown(): void {
		let self = this;
		self._tabContronller.registerEvent(true);
		let t_selectIndex = 0;
        if (self._args) {
            let t_arg = ~~self._args;
            if (t_arg < 10) {
                t_selectIndex = t_arg;
            }
            else {
                t_selectIndex = 0;
                self._targetId = t_arg;
            }
        }
		self._tabContronller.selectedIndex = -1;
		self._tabContronller.selectedIndex = t_selectIndex;
		let r = GGlobal.reddot;
		r.listen(UIConst.TAOYUANJIEYI, self.checkTabNotice, self);
		r.listen(UIConst.TYJY_YMRW, self.checkTabNotice, self);
		r.listen(UIConst.TYJY_YMFB, self.checkTabNotice, self);
		self.checkTabNotice();
	}

	protected onHide(): void {
		let self = this;
		self._tabContronller.registerEvent(false);
		self._tabContronller.close();
		let r = GGlobal.reddot;
		r.remove(UIConst.TAOYUANJIEYI, self.checkTabNotice, self);
		r.remove(UIConst.TYJY_YMRW, self.checkTabNotice, self);
		r.remove(UIConst.TYJY_YMFB, self.checkTabNotice, self);
	}

	public dispose() {
        let t = this;
        if (t._tabContronller)
            t._tabContronller.destroy();
        super.dispose();
    }

	private checkTabNotice() {
		let self = this;
		let red = GGlobal.reddot;
		self.tabArr[0].checkNotice = red.checkCondition(UIConst.TAOYUANJIEYI, 0);
		self.tabArr[1].checkNotice = red.checkCondition(UIConst.TYJY_YMRW, 0);
		self.tabArr[2].checkNotice = red.checkCondition(UIConst.TYJY_YMFB, 0);
	}
}