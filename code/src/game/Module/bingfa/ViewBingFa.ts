class ViewBingFa extends UIPanelBase {

	public c1: fairygui.Controller;
	public p0: ChildBingFa;
	public p1: ChildBingFaJie;
	public p2: ChildSuit;
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
	public static URL: string = "ui://3tzqotadjx2x34";
	public constructor() {
		super();
		this.setSkin("role", "role_atlas0", "View_BaoWu_Panel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu_JiBan.URL, ChildSuit);
		fairygui.UIObjectFactory.setPackageItemExtension(ViewBWGrid.URL, BingfaItem);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu.URL, ChildBingFa);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu_Jie.URL, ChildBingFaJie);
	}
	protected initView(): void {
		super.initView();
	}

	private check_juexing() {
		let s = this;
		s.checkBingFa();
		s.checkZhanJia();
		s.checkBaoWu();
		s.checkTianShu();
		s.checkYiBao();
		s.checkShenJian();
	}

	private checkShenJian() {
		let r = GGlobal.reddot
		this.btnSJ.checkNotice = r.checkCondition(UIConst.SHEN_JIAN) || r.checkCondition(UIConst.SHEN_JIAN, 1) || r.checkCondition(UIConst.SHEN_JIAN, 2) || r.checkCondition(UIConst.JUEXING, 2);
	}

	private checkZhanJia(): void {
		let r = GGlobal.reddot;
		this.btnSZ.checkNotice = r.checkCondition(UIConst.ZHAN_JIA) || r.checkCondition(UIConst.JUEXING, 6);
	}

	private checkBaoWu() {
		let r = GGlobal.reddot;
		this.btnJH.checkNotice = r.checkCondition(UIConst.BAOWU) || r.checkCondition(UIConst.BAOWU, 1) || r.checkCondition(UIConst.BAOWU, 2) || r.checkCondition(UIConst.JUEXING, 1);
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

	private checkYiBao() {
		let r = GGlobal.reddot
		this.btnYB.checkNotice = r.checkCondition(UIConst.YIBAO) || r.checkCondition(UIConst.YIBAO, 1) || r.checkCondition(UIConst.YIBAO, 2) || r.checkCondition(UIConst.JUEXING, 3);
	}
	public openJiangHunHandle(): void {
		//宝物
		GGlobal.layerMgr.open(UIConst.BAOWU, this.c1.selectedIndex);
	}

	public shenjianHandle(): void {
		GGlobal.layerMgr.open(UIConst.SHEN_JIAN, this.c1.selectedIndex);
	}

	private openTuJian(): void {
		//天书
		GGlobal.layerMgr.open(UIConst.TIANSHU, this.c1.selectedIndex);
	}

	private openSZHandler(): void {
		GGlobal.layerMgr.open(UIConst.ZHAN_JIA, this.c1.selectedIndex);
	}

	private openYiBao(): void {
		GGlobal.layerMgr.open(UIConst.YIBAO, this.c1.selectedIndex);
	}


	private cur;
	private onPageChange() {
		let s = this;
		if (s.cur) s.cur.hide();
		if (s.c1.selectedIndex == 0) {
			s.p0.open();
			s.cur = s.p0;
		} else if (s.c1.selectedIndex == 1) {
			s.frame.getChild("icon").asLoader.icon = "ui://n52wd4d0sjvaj";
			s.cur = s.p1;
			s.p1.open();
		} else if (s.c1.selectedIndex == 2) {
			s.frame.getChild("icon").asLoader.icon = "ui://n52wd4d0sjvaj";
			s.cur = s.p2;
			s.p2.open();
		}
	}

	private checkBingFa() {
		var r = false;
		var f = GGlobal.reddot;
		r = f.checkCondition(UIConst.BINGFA, 0) || f.checkCondition(UIConst.BINGFA, 1) || f.checkCondition(UIConst.JUEXING, 5);
		this.tab0.checkNotice = r;
		r = f.checkCondition(UIConst.BINGFA, 2);
		this.tab2.checkNotice = r;
		//升阶
		this.tab1.checkNotice = f.checkCondition(UIConst.BINGFA, 3);
		this.btnBF.checkNotice = f.checkCondition(UIConst.BINGFA, 0) || f.checkCondition(UIConst.BINGFA, 1) || f.checkCondition(UIConst.BINGFA, 2) ||
			f.checkCondition(UIConst.BINGFA, 3) || f.checkCondition(UIConst.JUEXING, 5);
	}

	protected onShown() {
		GGlobal.modelBingFa.initData();
		GGlobal.modelBySys.CGGetinfobysys(Model_BySys.BING_FA)
		var s = this;
		var f = GGlobal.reddot;
		s.setExtends();
		if (s._args) s.c1.selectedIndex = s._args;
		else s.c1.selectedIndex = 0;

		var red = GGlobal.reddot;
		s.onXianShi();
		s.iconSelImg.setXY(s.btnBF.x - 11, s.btnBF.y - 5);
		s.btnYB.addClickListener(s.openYiBao, s);
		s.btnSZ.addClickListener(s.openSZHandler, s);
		s.btnTJ.addClickListener(s.openTuJian, s);
		s.btnSJ.addClickListener(s.shenjianHandle, s);
		s.btnJH.addClickListener(s.openJiangHunHandle, s);
		s.checkBaoWu();
		s.checkTianShu();
		s.checkYiBao();
		s.checkZhanJia();
		s.checkShenJian();

		s.onPageChange();
		s.checkBingFa();
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.onPageChange, s);
		f.listen(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
		f.listen(ReddotEvent.CHECK_SHENJIAN, s.checkShenJian, s);
		f.listen(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
		f.listen(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
		f.listen(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
		f.listen(ReddotEvent.CHECK_YIBAO, s.checkYiBao, s);
	}

	protected onHide() {
		let s = this;
		var f = GGlobal.reddot;
		if (s.cur) s.cur.hide();
		s.cur = null;
		s.btnYB.removeClickListener(s.openYiBao, s);
		s.btnTJ.removeClickListener(s.openTuJian, s);
		s.btnSJ.removeClickListener(s.shenjianHandle, s);
		s.btnJH.removeClickListener(s.openJiangHunHandle, s);
		s.btnSZ.removeClickListener(s.openSZHandler, s);
		f.remove(ReddotEvent.CHECK_SHENJIAN, s.checkShenJian, s);
		f.remove(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
		f.remove(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
		f.remove(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
		f.remove(ReddotEvent.CHECK_YIBAO, s.checkYiBao, s);
		f.remove(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
		GGlobal.layerMgr.close(UIConst.BINGFA);
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.onPageChange, this);
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