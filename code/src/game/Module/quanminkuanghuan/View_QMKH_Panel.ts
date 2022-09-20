class View_QMKH_Panel extends UIPanelBase {

	public tabList: fairygui.GList;

	public static URL: string = "ui://vrex0iz4woj20";
	public constructor() {
		super();
		this.setSkin("QMKH", "QMKH_atlas0", "View_QMKH_Panel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(Child_QMKH.URL, Child_QMKH);
		fairygui.UIObjectFactory.setPackageItemExtension(QMKHItem.URL, QMKHItem);
	}
	protected initView(): void {
		super.initView();
		let a = this;
		a.tabList.callbackThisObj = a;
		a.tabList.itemRenderer = a.renderHandle;
		a.tabList.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
	}

	private iconArr = [];
	private curTab: ComActivityTab;
	private renderHandle(index: number, tab: ComActivityTab): void {
		let a = this;
		tab.data = a.iconArr[index].id;
		tab.setActivityIcon(a.iconArr[index].id);
		tab.checkNotice = GGlobal.reddot.checkCondition(parseInt(a.iconArr[index].id));
		if (!a.curTab && index == 0) {
			tab.selected = true;
			a.curTab = tab;
		}
		let red = GGlobal.reddot;
	}

	private listHandle(evt: fairygui.ItemEvent) {
		let a = this;
		let tab = evt.itemObject as ComActivityTab;
		if (this.curTab && tab.data == this.curTab.data) return;
		tab.selected = true;
		a.curTab = tab;
		a.changePageHD();
	}

	private _curView;
	private changePageHD() {
		let s = this;
		if (s._curView) {
			s._curView.close();
			s.removeChild(s._curView);
		}
		let idx = s.curTab.data;
		switch (idx) {
			case UIConst.QUANMIN_KUANGHUAN_BOSS: if (GGlobal.modelqmkh.bossArr.length <= 0) { GGlobal.modelqmkh.getBossArr(); } s._curView = Child_QMKH.createInstance(); break;
			case UIConst.QUANMIN_KUANGHUAN_XIAOXIONG: if (GGlobal.modelqmkh.xiaoxiongArr.length <= 0) { GGlobal.modelqmkh.getXiaoXiongArr(); } s._curView = Child_QMKH.createInstance(); break;
			case UIConst.QUANMIN_KUANGHUAN_LVBU: if (GGlobal.modelqmkh.lvbuArr.length <= 0) { GGlobal.modelqmkh.getlvbuArr(); } s._curView = Child_QMKH.createInstance(); break;
			case UIConst.QUANMIN_KUANGHUAN_FUHUI: if (GGlobal.modelqmkh.fuhuiArr.length <= 0) { GGlobal.modelqmkh.getfuhuiArr(); } s._curView = Child_QMKH.createInstance(); break;
		}
		s._curView.panelId = idx;
		s._curView.x = 0;
		s._curView.y = 276;
		s.addChild(s._curView);
		s._curView.open();
	}

	private listen() {
		let s = this;
		s.tabList.addEventListener(fairygui.ItemEvent.CLICK, s.listHandle, s);
		s.changePageHD();
	}

	private remove() {
		let s = this;
		if (s._curView) {
			s._curView.close();
			s.removeChild(s._curView);
			s._curView = null;
		}
		if (s.curTab) s.curTab.selected = false;
		s.curTab = null;
		s.tabList.removeEventListener(fairygui.ItemEvent.CLICK, s.listHandle, s);
	}


	private createTabs() {
		// this.iconArr = Model_Activity.activityObj[UIConst.QUANMIN_KUANGHUAN];
		this.iconArr = GGlobal.modelActivity.getGroup(UIConst.QUANMIN_KUANGHUAN);
		if (!this.iconArr) return;
		this.tabList.numItems = this.iconArr.length;
	}

	protected onShown(): void {
		let self = this;
		self.createTabs();
		self.listen();
		GGlobal.reddot.listen(UIConst.QUANMIN_KUANGHUAN, self.createTabs, self);
		GGlobal.control.listen(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.createTabs, self);
		GGlobal.control.listen(Enum_MsgType.KAIFUDAY_UPDATE, self.createTabs, self);
		GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, self.createTabs, self);
	}

	protected onHide(): void {
		let self = this;
		self.remove();
		GGlobal.layerMgr.close(UIConst.QUANMIN_KUANGHUAN);
		GGlobal.reddot.remove(UIConst.QUANMIN_KUANGHUAN, self.createTabs, self);
		GGlobal.control.remove(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.createTabs, self);
		GGlobal.control.remove(Enum_MsgType.KAIFUDAY_UPDATE, self.createTabs, self);
		GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, self.createTabs, self);
		self.tabList.numItems = 0;
	}
}