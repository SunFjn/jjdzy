class ViewCrossKingView extends fairygui.GComponent implements IPanel{

	//>>>>start
	public c1: fairygui.Controller;
	public viewWars: ChildCrossWars;
	public viewKing: ChildCrossKing;
	public bt0: Button2;
	public bt1: Button2;
	//>>>>end

	public static URL:string = "ui://me1skowlhfct4g";

	public tabArr: Array<TabButton> = [];

	public static createInstance():ViewCrossKingView {
		return <ViewCrossKingView><any>(fairygui.UIPackage.createObject("Arena","ViewCrossKingView"));
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
		sel = sel == 4 ? 1 : 0;
		s.c1.selectedIndex = sel
		s.tabArr[sel].selected = true;
		s.selectPage();
		s.checkKing();
		s.checkWars();
		s.viewKing.addListen();
		s.viewWars.addListen();
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selectP, s);
		GGlobal.control.listen(Enum_MsgType.CROSSKING_OPEN_UI, s.selectPage, s);
		GGlobal.reddot.listen(ReddotEvent.CHECK_CROSS_KING, s.checkKing, s);
		GGlobal.reddot.listen(ReddotEvent.CHECK_CROSS_WARS, s.checkWars, s);
	}

	public clean(): void {
		let s = this;
		s.viewKing.removeListen();
		s.viewWars.removeListen();
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.selectP, s);
		GGlobal.control.remove(Enum_MsgType.CROSSKING_OPEN_UI, s.selectPage, s);
		GGlobal.reddot.remove(ReddotEvent.CHECK_CROSS_KING, s.checkKing, s);
		GGlobal.reddot.remove(ReddotEvent.CHECK_CROSS_WARS, s.checkWars, s);
		s.tabArr[s.c1.selectedIndex].selected = false;
		this._first0 = true;
		this._first1 = true;
	}

	private selectP(): void {
		Model_CrossWars.battleTurn = 0;
		this.selectPage();
	}
	private _first1: boolean = true;
	private _first0: boolean = true;
	private selectPage(): void {
		if (this.c1.selectedIndex == 0) {
			this.viewKing.update();
			if (this._first0) {
				GGlobal.modelCrossKing.CG_OPENUI();
				this._first0 = false;
			}
		} else if (this.c1.selectedIndex == 1) {
			this.viewWars.update();
			if (this._first1) {
				GGlobal.modelCrossWars.CG_OPEN_WINERS()
				Model_CrossWars.hasData = true;
				this._first1 = false;
			}
		}
	}

	private checkKing() {
		this.bt0.checkNotice = GGlobal.reddot.checkCondition(UIConst.CROSS_KING, 0);
	}

	private checkWars() {
		this.bt1.checkNotice = GGlobal.reddot.checkCondition(UIConst.CROSS_WARS, 0);
	}
}