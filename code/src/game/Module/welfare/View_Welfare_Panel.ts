class View_Welfare_Panel extends UIPanelBase {

	public list: fairygui.GList;
	public static URL: string = "ui://ye1luhg3r6x48";

	public constructor() {
		super();
		this.setSkin("Welfare", "Welfare_atlas0", "View_Welfare_Panel");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(Child_Sign.URL, Child_Sign);
		f(SignGrid.URL, SignGrid);
		f(Child_ActCode.URL, Child_ActCode);
		f(Child_UpdateNotice.URL, Child_UpdateNotice);
		f(NoticeItem.URL, NoticeItem);
		f(RewardBack.URL, RewardBack);
		f(RewardBackItem.URL, RewardBackItem);
		f(NoticeItem1.URL, NoticeItem1);
	}

	protected initView(): void {
		super.initView();
		let a = this;
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandle;
		Model_Welfare.showIconHandle();
	}

	private curTab: ComActivityTab;
	private renderHandle(index: number, tab: ComActivityTab): void {
		let a = this;
		tab.setActivityIcon(a.iconArr[index].id);
		tab.data = a.iconArr[index].id;
		tab.checkNotice = GGlobal.reddot.checkCondition(a.iconArr[index].id)
		if (!a.curTab && index == 0) {
			tab.selected = true;
			a.curTab = tab;
		}
	}

	private listHandle(evt: fairygui.ItemEvent) {
		let a = this;
		let tab = evt.itemObject as ComActivityTab;
		if (a.curTab && tab.data == a.curTab.data) return;
		a.curTab = tab;
		a.updateChildShow();
	}

	private iconArr: any[];
	public updateShow(): void {
		let a = this;
		a.iconArr = [];
		Model_Welfare.iconArr.forEach(element => {
			if (ModuleManager.isOpen(element.id)) {
				a.iconArr.push(element);
			}
		});
		a.list.numItems = a.iconArr.length;
		a.updateChildShow();
	}

	private tabView: any;
	private updateChildShow() {
		let a = this;
		if (a.tabView) {
			a.tabView.clean();
			a.removeChild(a.tabView);
		}
		switch (a.curTab.data) {
			case UIConst.WELFARE_SIGN:
				a.tabView = Child_Sign.createInstance();
				a.tabView.setXY(9, 293);
				break;
			case UIConst.WELFARE_ACTCODE:
				a.tabView = Child_ActCode.createInstance();
				a.tabView.setXY(0, 292);
				break;
			case UIConst.WELFARE_NOTICE:
				a.tabView = Child_UpdateNotice.createInstance();
				a.tabView.setXY(0, 293);
				break;
			case UIConst.REWARD_BACK:
				a.tabView = RewardBack.createInstance();
				a.tabView.setXY(0, 293)
				break;
		}
		a.addChild(a.tabView);
		a.tabView.show();
	}

	private checkTabNotice() {
		let a = this;
		a.iconArr = [];
		Model_Welfare.iconArr.forEach(element => {
			if (ModuleManager.isOpen(element.id)) {
				a.iconArr.push(element);
			}
		});
		a.list.numItems = a.iconArr.length;
	}

	protected onShown(): void {
		let a = this;
		a.updateShow();
		a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
		GGlobal.reddot.listen(UIConst.WELFARE, a.checkTabNotice, a);
		if (this._args) {
			let idx = Number(this._args);
			let tab: any = a.list._children[idx];
			if (a.curTab) a.curTab.selected = false;
			if (tab) {
				tab.selected = true;
				a.curTab = tab;
				a.updateChildShow();
			}
		}
	}

	protected onHide(): void {
		let a = this;
		if (a.tabView) {
			a.tabView.clean();
			a.removeChild(a.tabView);
		}
		GGlobal.layerMgr.close(UIConst.WELFARE);
		a.list.removeEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
		GGlobal.reddot.remove(UIConst.WELFARE, a.checkTabNotice, a);
	}


}