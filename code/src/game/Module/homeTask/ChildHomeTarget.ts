class ChildHomeTarget extends fairygui.GComponent {

	public tabList: fairygui.GList;
	public list: fairygui.GList;

	public static URL: string = "ui://oy62ymetd8t64";

	private _tabArr: Vo_HomeGoal[][]

	public static createInstance(): ChildHomeTarget {
		return <ChildHomeTarget><any>(fairygui.UIPackage.createObject("homeTask", "ChildHomeTarget"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderLis;
		s.list.setVirtual();

		s.tabList.callbackThisObj = s;
		s.tabList.itemRenderer = s.renderTab;
		s.tabList.setVirtual();
	}

	private _selTab = 0
	public show() {
		let s = this;
		let m = GGlobal.model_HomeTask
		s.registerEvent(true);
		m.CG_OPEN_GOAL_11413();
		// s.upView();
	}

	public hide() {
		let s = this;
		s.registerEvent(false);
		s.list.numItems = 0;
		s.tabList.numItems = 0;
	}

	/**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag 
     */
	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.model_HomeTask.register(pFlag, Model_HomeTask.OPEN_GOAL, self.upView, self);
		GGlobal.model_HomeTask.register(pFlag, Model_HomeTask.UP_GOAL, self.upGold, self);
		EventUtil.register(pFlag, self.tabList, fairygui.ItemEvent.CLICK, self.tabHandle, self);
	}

	private upView() {
		let s = this
		let m = GGlobal.model_HomeTask
		s._tabArr = m.datGoal;
		s.tabList.numItems = s._tabArr.length;
		//选中可升级
		s._selTab = -1
		for (let i = 0; i < s._tabArr.length; i++) {
			let arr = s._tabArr[i];
			for (let j = 0; j < arr.length; j++) {
				if (arr[j].state == 1) {
					s._selTab = i;
					break;
				}
			}
			if (s._selTab != -1) {
				break;
			}
		}
		if (s._selTab == -1) {
			s._selTab = 0;
		}
		s._selArr = s._tabArr[s._selTab]
		s.tabList.scrollToView(s._selTab);
		s.tabList.selectedIndex = s._selTab;

		s.upSelView();
	}

	private upGold(){
		let s = this
		let m = GGlobal.model_HomeTask
		s._tabArr = m.datGoal;
		s.tabList.numItems = s._tabArr.length;
		s.upSelView();
	}

	private renderLis(idx, obj: ItemHomeTarget) {
		obj.vo = this._selArr[idx]
	}


	private renderTab(idx, tab: TabButton3) {
		let self = this;
		let arr = self._tabArr[idx];
		tab.data = arr
		let fenlei = arr[0].lib.fenlei
		tab.icon = CommonManager.getUrl("homeTask", fenlei);
		let red = false;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].state == 1) {
				red = true;
				break;
			}
		}
		tab.checkNotice = red;
	}

	private tabHandle(event: fairygui.ItemEvent) {
		let item: TabButton3 = event.itemObject as TabButton3;
		let s = this;
		s._selArr = item.data;
		s.upSelView();
	}
	private _selArr: Vo_HomeGoal[]
	private upSelView() {
		let m = GGlobal.model_HomeTask
		let s = this;
		s.list.numItems = s._selArr ? s._selArr.length : 0;
		s.list.scrollToView(0)
		s.list.selectedIndex = 0;
	}
}