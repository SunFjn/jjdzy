/**
 * 轮回系统
 */
class View_LunHui_Panel extends UIPanelBase {
	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public v0: Child_LunHui;
	public v1: Child_TianMing;

	public static URL: string = "ui://ehelf5bhn5o70";

	private uiArr: any[];
	// private tabArr: fairygui.GButton[];
	private tabArr: TabButton[];
	private _tabContronller: TabController;
	private _v

	public constructor() {
		super();
		this.setSkin("lunhui", "lunhui_atlas0", "View_LunHui_Panel");
	}

	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(LunHuiGrid.URL, LunHuiGrid);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_LunHui.URL, Child_LunHui);
		fairygui.UIObjectFactory.setPackageItemExtension(GridTianMing.URL, GridTianMing);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_TianMing.URL, Child_TianMing);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_SixWay.URL, Child_SixWay);
		fairygui.UIObjectFactory.setPackageItemExtension(SixWayItem.URL, SixWayItem);
		fairygui.UIObjectFactory.setPackageItemExtension(SixWayYinJiItem.URL, SixWayYinJiItem);
		fairygui.UIObjectFactory.setPackageItemExtension(VSixWayGrid.URL, VSixWayGrid);
		fairygui.UIObjectFactory.setPackageItemExtension(SixWayBagItem.URL, SixWayBagItem);
		fairygui.UIObjectFactory.setPackageItemExtension(VSixWayGridFenJie.URL, VSixWayGridFenJie);
		fairygui.UIObjectFactory.setPackageItemExtension(SixWayCheckItem.URL, SixWayCheckItem);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	protected initView(): void {
		let a = this;
		super.initView();
		// this.tabArr = [this.tab0, this.tab1];
		// this.uiArr = [UIConst.LUNHUI, UIConst.TIANMING];
		a.tabArr = [a["tab0"], a["tab1"], a["tab2"]];
		a._tabContronller = new TabController();
		a._tabContronller.initView(a, a.c1);
		a._tabContronller.setPanelClassMap(
			[
				Child_LunHui,
				Child_TianMing,
				Child_SixWay,
			]
		);
		a._tabContronller.tabChange = a.onTabChange;
		a._tabContronller.tabChangeCaller = a;
	}

	private _uidList = [UIConst.LUNHUI, UIConst.TIANMING, UIConst.SIXWAY];
	private _targetId = 0;
	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		let self = this;
		let arr = self._uidList;
		let t_id = arr[pTabIndex];
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}
		switch (pTabIndex) {
            case 0:
                pVo.data = self._targetId;
                self._targetId = 0;
                break;
        }
		return true;
	}

	/**
	 * 更新按钮红点状态
	 */
	public checkBtnRedDot() {
		let s = this;
		let rdt = GGlobal.reddot
		s.tab0.checkNotice = Model_LunHui.checkLunHuiNotice();
		s.tab1.checkNotice = rdt.checkCondition(UIConst.TIANMING, 0)
		s.tab2.checkNotice = Model_LunHui.checkSWNotice();
	}

	protected onShown(): void {
		let s = this;
		// let index = 0;
		// if (s._args) {
		// 	index = s._args
		// }
		// s.tabArr[index].selected = true;
		// this.tabChange(index);
		// for (let i = 0; i < this.tabArr.length; i++) {
		// 	this.tabArr[i].addClickListener(this.onTab, this);
		// }
		s._tabContronller.registerEvent(true);
		let t_selectIndex = 0;
        if (s._args) {
            let t_arg = ~~s._args;
            if (t_arg < 10) {
                t_selectIndex = t_arg;
            }
            else {
                t_selectIndex = 0;
                s._targetId = t_arg;
            }
        }
		s._tabContronller.selectedIndex = -1;
		s._tabContronller.selectedIndex = t_selectIndex;
		GGlobal.reddot.listen(ReddotEvent.CHECK_LUNHUI, s.checkBtnRedDot, s);
		GGlobal.reddot.listen(UIConst.TIANMING, s.checkBtnRedDot, s);
		GGlobal.modelPlayer.listen(Model_player.MSG_HERO_LEVEL, s.checkBtnRedDot, s);
		this.checkBtnRedDot()
		GGlobal.reddot.listen(UIConst.SIXWAY, s.checkBtnRedDot, s);
	}

	protected onHide(): void {
		let s = this;
		GGlobal.reddot.remove(ReddotEvent.CHECK_LUNHUI, s.checkBtnRedDot, s);
		GGlobal.reddot.remove(UIConst.TIANMING, s.checkBtnRedDot, s);
		GGlobal.modelPlayer.remove(Model_player.MSG_HERO_LEVEL, s.checkBtnRedDot, s);
		GGlobal.reddot.remove(UIConst.SIXWAY, s.checkBtnRedDot, s);
		// if (s._v) {
		// 	s._v.onHide()
		// }
		// if (s.c1.selectedIndex >= 0)
		// 	s.tabArr[s.c1.selectedIndex].selected = false;
		s._tabContronller.registerEvent(false);
		s._tabContronller.close();
	}

	private onTab(e: egret.TouchEvent) {
		let s = this;
		let tag: fairygui.GButton = e.currentTarget as fairygui.GButton
		let index;
		if (tag.id == this.tab0.id) {
			index = 0;
		}
		else if (tag.id == this.tab1.id) {
			index = 1;
		}
		let pre = this.c1.selectedIndex;
		if (index == pre) {
			return;
		}
		if (!ModuleManager.isOpen(this.uiArr[index], true)) {
			tag.selected = false;
			return;
		}
		this.tabArr[pre].selected = false;
		this.tabChange(index);
	}

	private tabChange(c) {
		let s = this;
		s.c1.selectedIndex = c

		if (s._v) {
			s._v.onHide()
		}
		if (s.c1.selectedIndex == 0) {
			s._v = s.v0
		} else {
			s._v = s.v1
		}
		s._v.onShown()
	}

	public dispose() {
        let t = this;
        if (t._tabContronller)
            t._tabContronller.destroy();
        super.dispose();
    }
}