class View_YB_Panel extends UIPanelBase {

	public c1: fairygui.Controller;
	public p0: Child_YB;
	public p1: Child_YB_Jie;
	public p2: Child_YB_JiBan;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public btnBF: Button2;
	public btnYB: Button2;
	public btnSZ: Button2;
	public btnTJ: Button2;
	public btnSJ: Button2;
	public btnJH: Button2;
	public iconSelImg: fairygui.GImage;

	public static URL: string = "ui://3tzqotadyoiw1f";

	public constructor() {
		super();
		this.setSkin("role", "role_atlas0", "View_BaoWu_Panel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(ViewBWGrid.URL, ViewYBGrid);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu.URL, Child_YB);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu_Jie.URL, Child_YB_Jie);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu_JiBan.URL, Child_YB_JiBan);
	}
	protected initView(): void {
		super.initView();
		let a = this;
		GGlobal.modelYiBao.CG_OPEN_YIBAO();
		GGlobal.modelBySys.CGGetinfobysys(Model_BySys.YI_BAO)
		GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_YIBAO);
	}

	private check_juexing() {
		let s = this;
		s.checkBingFa();
		s.checkZhanJia();
		s.checkBaoWu();
		s.checkTianShu();
		s.checkRed();
		s.checkShenJian();
	}

	private checkZhanJia(): void {
		let r = GGlobal.reddot;
		this.btnSZ.checkNotice = r.checkCondition(UIConst.ZHAN_JIA) || r.checkCondition(UIConst.JUEXING, 6);
	}

	private checkBaoWu() {
		let r = GGlobal.reddot;
		this.btnJH.checkNotice = r.checkCondition(UIConst.BAOWU) || r.checkCondition(UIConst.BAOWU, 1) || r.checkCondition(UIConst.BAOWU, 2) || r.checkCondition(UIConst.JUEXING, 1);
	}

	private checkShenJian() {
		let r = GGlobal.reddot
		this.btnSJ.checkNotice = r.checkCondition(UIConst.SHEN_JIAN) || r.checkCondition(UIConst.SHEN_JIAN, 1) || r.checkCondition(UIConst.SHEN_JIAN, 2) || r.checkCondition(UIConst.JUEXING, 2);
	}

	private checkTianShu() {
		let s = this;
		s.btnTJ.checkNotice = false;
		let r = GGlobal.reddot
		let ret = false;
		if (ModuleManager.isOpen(UIConst.TIANSHU)) {
			for (let i = 0; i < 6; i++) {
				ret = r.checkCondition(UIConst.TIANSHU, i);
				if (ret) break;
			}
			if (!ret) {
				ret = r.checkCondition(UIConst.JUEXING, 4);
			}
			s.btnTJ.checkNotice = ret;
		}
	}

	private checkBingFa() {
		var ret = false;
		for (let i = 0; i < 4; i++) {
			ret = GGlobal.reddot.checkCondition(UIConst.BINGFA, i)
			if (ret) break;
		}
		if (!ret) ret = GGlobal.reddot.checkCondition(UIConst.JUEXING, 5);
		this.btnBF.checkNotice = ret;
	}

	public openJiangHunHandle(): void {
		//宝物
		GGlobal.layerMgr.open(UIConst.BAOWU, this.c1.selectedIndex);
	}

	public shenjianHandle(): void {
		GGlobal.layerMgr.open(UIConst.SHEN_JIAN, this.c1.selectedIndex);
	}

	private openBingFaHandler(): void {
		GGlobal.layerMgr.open(UIConst.BINGFA, this.c1.selectedIndex);
	}

	private openTuJian(): void {
		//天书
		GGlobal.layerMgr.open(UIConst.TIANSHU, this.c1.selectedIndex);
	}

	private openSZHandler(): void {
		GGlobal.layerMgr.open(UIConst.ZHAN_JIA, this.c1.selectedIndex);
	}

	protected onShown(): void {
		let s = this;
		var f = GGlobal.reddot;
		s.setExtends();
		if (s._args) {
			s.c1.selectedIndex = s._args;
		} else {
			s.c1.selectedIndex = 0;
		}
		s.onXianShi();
		s.iconSelImg.setXY(s.btnYB.x - 11, s.btnYB.y - 5);
		s.btnBF.addClickListener(s.openBingFaHandler, s);
		s.btnSZ.addClickListener(s.openSZHandler, s);
		s.btnTJ.addClickListener(s.openTuJian, s);
		s.btnSJ.addClickListener(s.shenjianHandle, s);
		s.btnJH.addClickListener(s.openJiangHunHandle, s);
		s.selectPage();
		s.check_juexing();
		this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		f.listen(ReddotEvent.CHECK_YIBAO, this.checkRed, this);
		f.listen(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
		f.listen(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
		f.listen(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
		f.listen(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
		f.listen(ReddotEvent.CHECK_SHENJIAN, s.checkShenJian, s);
		f.listen(UIConst.JUEXING, s.check_juexing, s);
	}

	protected onHide(): void {
		let s = this;
		var f = GGlobal.reddot;
		if (s._p) {
			s._p.onClose();
		}
		s._p = null;
		s.btnBF.removeClickListener(s.openBingFaHandler, s);
		s.btnTJ.removeClickListener(s.openTuJian, s);
		s.btnSJ.removeClickListener(s.shenjianHandle, s);
		s.btnJH.removeClickListener(s.openJiangHunHandle, s);
		s.btnSZ.removeClickListener(s.openSZHandler, s);
		f.remove(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
		f.remove(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
		f.remove(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
		f.remove(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
		f.remove(ReddotEvent.CHECK_SHENJIAN, s.checkShenJian, s);
		f.remove(ReddotEvent.CHECK_YIBAO, s.checkRed, s);
		f.remove(UIConst.JUEXING, s.check_juexing, s);
		this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.selectPage, s);
		GGlobal.layerMgr.close(UIConst.YIBAO)
	}

	private _p: any
	public selectPage() {
		let self = this;
		if (self._p) {
			self._p.onClose();
			self._p = null;
		}
		if (self.c1.selectedIndex == 0) {
			self.p0.onOpen();
			self._p = this.p0;
		} else if (self.c1.selectedIndex == 1) {
			self.p1.onOpen();
			self._p = self.p1;
		} else {
			self.p2.onOpen();
			self._p = self.p1;
		}
	}

	private checkRed() {
		var f = GGlobal.reddot;
		this.tab0.checkNotice = f.checkCondition(UIConst.YIBAO, 0) || f.checkCondition(UIConst.JUEXING, 3);
		//升阶
		this.tab1.checkNotice = f.checkCondition(UIConst.YIBAO, 1);
		//升阶
		this.tab2.checkNotice = f.checkCondition(UIConst.YIBAO, 2);
		this.btnYB.checkNotice = f.checkCondition(UIConst.YIBAO, 0) || f.checkCondition(UIConst.YIBAO, 1) || f.checkCondition(UIConst.YIBAO, 2) || f.checkCondition(UIConst.JUEXING, 3);
	}

	private onXianShi() {
		var arr = [];
		let boo
		//宝物
		boo = ModuleManager.isXianShi(UIConst.BAOWU)
		this.btnJH.visible = boo
		if (boo) {
			arr.push(this.btnJH)
		}
		//天书
		boo = ModuleManager.isXianShi(UIConst.TIANSHU)
		this.btnTJ.visible = boo
		if (boo) {
			arr.push(this.btnTJ)
		}
		//神剑
		boo = ModuleManager.isXianShi(UIConst.SHEN_JIAN)
		this.btnSJ.visible = boo
		if (boo) {
			arr.push(this.btnSJ)
		}
		//异宝
		boo = ModuleManager.isXianShi(UIConst.YIBAO)
		this.btnYB.visible = boo;
		if (boo) {
			arr.push(this.btnYB)
		}
		//战甲
		boo = ModuleManager.isXianShi(UIConst.ZHAN_JIA)
		this.btnSZ.visible = boo;
		if (boo) {
			arr.push(this.btnSZ)
		}
		//兵法
		boo = ModuleManager.isXianShi(UIConst.BINGFA)
		this.btnBF.visible = boo;
		if (boo) {
			arr.push(this.btnBF)
		}
		//按钮居中
		let jg = 15;
		let ww = 640;
		let w = 76;
		let len = arr.length
		for (let i = 0; i < len; i++) {
			arr[i].x = (ww - len * w - (len - 1) * jg) / 2 + i * (w + jg);
		}
	}
}