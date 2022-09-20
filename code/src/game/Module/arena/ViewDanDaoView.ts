class ViewDanDaoView extends fairygui.GComponent implements IPanel {

	//>>>>start
	public c1: fairygui.Controller;
	public bt0: Button2;
	public bt1: Button2;
	public item1: Child_DanDaoFH;
	public item2: Child_SanGuoWS;
	//>>>>end

	public static URL: string = "ui://me1skowlgmu55v";

	public tabArr: Array<TabButton> = [];

	public static createInstance(): ViewDanDaoView {
		return <ViewDanDaoView><any>(fairygui.UIPackage.createObject("Arena", "ViewDanDaoView"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.show(pData);
	}
	
	closePanel(pData?: any) {
		this.clean();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		CommonManager.parseChildren(s, s);

		for (let i = 0; i < 2; i++) {
			var tab: TabButton = s[`bt${i}`];
			tab.data = i;
			tab.selected = false;
			tab.addClickListener(s.tabHandle, s);
			s.tabArr.push(tab);
		}
	}

	private tabHandle(event: egret.TouchEvent): void {
		let a = this;
		let index: number = event.target.data;
		if (a.c1.selectedIndex == index) return;
		let arr = [UIConst.CROSS_KING, UIConst.CROSS_WARS];
		if (!ModuleManager.isOpen(arr[index], true)) {
			a.tabArr[index].selected = false;
			return;
		}
		a.tabArr[a.c1.selectedIndex].selected = false;
		a.tabArr[index].selected = true;
		a.c1.selectedIndex = index;
	}

	public show(sel): void {
		let s = this;
		sel = sel == 2 ? 1 : 0;
		s.c1.selectedIndex = sel
		s.tabArr[sel].selected = true;
		s.selectPage();
		s.checkTab();
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selectPage, s);
		let red = GGlobal.reddot
		red.listen(UIConst.DANDAO_FUHUI, s.checkTab, s);
		red.listen(UIConst.SANGUO_WUSHUANG, s.checkTab, s);
	}

	public clean(): void {
		let s = this;
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.selectPage, s);
		let red = GGlobal.reddot
		red.remove(UIConst.DANDAO_FUHUI, s.checkTab, s);
		red.remove(UIConst.SANGUO_WUSHUANG, s.checkTab, s);
		s.tabArr[s.c1.selectedIndex].selected = false;
		if (s.tempPanel) {
			s.tempPanel.clean();
			s.tempPanel = null;
		}
	}

	private tempPanel;
	private selectPage(): void {
		let a = this;
		if (a.tempPanel) {
			a.tempPanel.clean();
			a.tempPanel = null;
		}
		switch (a.c1.selectedIndex) {
			case 0:
				a.item1.show();
				a.tempPanel = a.item1;
				break;
			case 1:
				a.item2.show();
				a.tempPanel = a.item2;
				break;
		}
	}

	private checkTab() {
		let red = GGlobal.reddot
		this.bt0.checkNotice = red.checkCondition(UIConst.DANDAO_FUHUI)
		this.bt1.checkNotice = red.checkCondition(UIConst.SANGUO_WUSHUANG);
	}
}