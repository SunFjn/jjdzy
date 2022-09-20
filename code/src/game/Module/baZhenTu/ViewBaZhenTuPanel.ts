class ViewBaZhenTuPanel extends UIPanelBase {

	public c1: fairygui.Controller;
	public c2: fairygui.Controller;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public tab3: TabButton;
	public p3: ChildBaZhenTuZP;
	public p2: ChildBaZhenTuFenJ;
	public p1: ChildBaZhenTu;
	public p4: ChildBaZhenTuGod;
	public viewZY: ChildZhenYan;
	public btn0: Button2;
	public btn1: Button2;
	public btn3: Button2;

	public static URL: string = "ui://xrzn9ppaf8nk0";

	public static createInstance(): ViewBaZhenTuPanel {
		return <ViewBaZhenTuPanel><any>(fairygui.UIPackage.createObject("baZhenTu", "ViewBaZhenTuPanel"));
	}

	public constructor() {
		super();
		this.setSkin("baZhenTu", "baZhenTu_atlas0", "ViewBaZhenTuPanel");
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension
		f(ChildBaZhenTu.URL, ChildBaZhenTu);
		f(ChildBaZhenTuFenJ.URL, ChildBaZhenTuFenJ);
		f(ChildBaZhenTuZP.URL, ChildBaZhenTuZP);
		f(VBaZTGrid.URL, VBaZTGrid);
		f(VBaZTGridFenJ.URL, VBaZTGridFenJ);
		f(VBaZTItem.URL, VBaZTItem);
		f(VBaZTBag.URL, VBaZTBag);
		f(VBaZTChip.URL, VBaZTChip);
		f(ChildZhenYan.URL, ChildZhenYan);
		f(VZhenYanBtn.URL, VZhenYanBtn);
		f(VZhenYanBtnBig.URL, VZhenYanBtnBig);
		f(VZhenYanLv.URL, VZhenYanLv);
		f(ChildBaZhenTuGod.URL, ChildBaZhenTuGod);
		f(VBaZTGridGod.URL, VBaZTGridGod);
	}

	protected initView(): void {
		super.initView();
		GGlobal.modelBaZhenTu.CGOPENUI4401();
	}

	protected onShown(): void {
		let t = this;
		t.addListen();
		t.c2.selectedIndex = -1;
		t.c1.selectedIndex = -1;
		if (t._args && t._args instanceof Array) {
			t.c2.selectedIndex = ~~(t._args[0]);
			t.c1.selectedIndex = ~~(t._args[1]);
		} else {
			t.c1.selectedIndex = 0;
			t.c2.selectedIndex = 0;
		}
		t.checkNot();
		GGlobal.modelBaZhenTu.CGDaShi_UI4417();
	}

	protected onHide(): void {
		this.removeListen();
		GGlobal.layerMgr.close(UIConst.BAZHENTU)
	}

	private addListen(): void {
		this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		this.c2.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectTab, this);
		GGlobal.reddot.listen(ReddotEvent.CHECK_BAZHENTU, this.checkNot, this);
		GGlobal.reddot.listen(UIConst.ZHENYAN, this.checkNot, this);
	}


	private removeListen(): void {
		this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		this.c2.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectTab, this);
		GGlobal.reddot.remove(ReddotEvent.CHECK_BAZHENTU, this.checkNot, this);
		GGlobal.reddot.remove(UIConst.ZHENYAN, this.checkNot, this);
		if (this._p) {
			this._p.close();
		}
	}

	public setSelectIndex(index) {
		this.c1.selectedIndex = index;
		this.selectPage();
	}

	private selectTab() {
		if (this.c2.selectedIndex < 0)
			return;
		if (this.c2.selectedIndex == 0) {
			this.selectPage()
		} else {
			//未开启
			if (!ModuleManager.isOpen(UIConst.ZHENYAN, true)) {
				this.c2.selectedIndex = 0
				return;
			}
			if (this._p) {
				this._p.close();
			}
			this._p = this.viewZY
			this._p.open()
		}
	}
	private uiArr = [UIConst.BAZHENTU, UIConst.BAZHENTU_FENJIE, UIConst.BAZHENTU_JIANDING, UIConst.BAZHENTU_GOD]
	private _p;
	private _preIndex = 0;
	public selectPage() {
		let s = this;
		let idx = s.c1.selectedIndex;
		if (idx < 0)
			return;
		if (s.c2.selectedIndex != 0)
			return;
		if (!ModuleManager.isOpen(s.uiArr[idx], true)) {
			s.c1.selectedIndex = s._preIndex
			return;
		}
		s._preIndex = s.c1.selectedIndex
		if (s._p) {
			s._p.close();
		}
		if (idx == 0) {
			s._p = s.p1
		} else if (idx == 1) {
			s._p = s.p2
		} else if (idx == 2) {
			s._p = s.p3
		} else if (idx == 3) {
			s._p = s.p4
		}
		s._p.open();
	}

	private checkNot() {
		let r = GGlobal.reddot
		let s = this;
		s.tab0.checkNotice = r.checkCondition(UIConst.BAZHENTU, 0);
		s.tab1.checkNotice = r.checkCondition(UIConst.BAZHENTU, 1);
		s.tab2.checkNotice = r.checkCondition(UIConst.BAZHENTU, 2);
		s.tab3.checkNotice = r.checkCondition(UIConst.BAZHENTU, 3);
		s.btn0.checkNotice = r.checkCondition(UIConst.BAZHENTU, 0) || r.checkCondition(UIConst.BAZHENTU, 1) || r.checkCondition(UIConst.BAZHENTU, 2) || r.checkCondition(UIConst.BAZHENTU, 3);
		s.btn1.checkNotice = r.checkCondition(UIConst.ZHENYAN, 0);
	}
}