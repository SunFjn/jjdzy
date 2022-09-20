class View_ShenJian_Panel extends UIPanelBase {

	public c1: fairygui.Controller;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public p0: Child_ShenJian;
	public p1: Child_ShenJian_Jie;
	public p2: Child_ShenJian_JiBan;
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
		fairygui.UIObjectFactory.setPackageItemExtension(ViewBWGrid.URL, ViewShenJianGrid);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu.URL, Child_ShenJian);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu_Jie.URL, Child_ShenJian_Jie);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu_JiBan.URL, Child_ShenJian_JiBan);
	}

	protected initView(): void {
		super.initView();
		let a = this;
		GGlobal.modelsj.CG_OPEN_SHENJIAN();
		GGlobal.modelBySys.CGGetinfobysys(Model_BySys.SHEN_JIAN)
		GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_SHENJIAN);
	}

	private check_juexing() {
		let s = this;
		s.checkBingFa();
		s.checkZhanJia();
		s.checkBaoWu();
		s.checkTianShu();
		s.checkRed();
		s.checkYiBao();
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

	private checkBingFa() {
		var ret = false;
		for (let i = 0; i < 4; i++) {
			ret = GGlobal.reddot.checkCondition(UIConst.BINGFA, i)
			if (ret) break;
		}
		if (!ret) ret = GGlobal.reddot.checkCondition(UIConst.JUEXING, 5)
		this.btnBF.checkNotice = ret;
	}

	private checkYiBao() {
		let r = GGlobal.reddot
		this.btnYB.checkNotice = r.checkCondition(UIConst.YIBAO) || r.checkCondition(UIConst.YIBAO, 1) || r.checkCondition(UIConst.YIBAO, 2) || r.checkCondition(UIConst.JUEXING, 3);
	}

	public openJiangHunHandle(): void {
		//宝物
		GGlobal.layerMgr.open(UIConst.BAOWU, this.c1.selectedIndex);
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

	private openYiBao(): void {
		GGlobal.layerMgr.open(UIConst.YIBAO, this.c1.selectedIndex);
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
		s.iconSelImg.setXY(s.btnSJ.x - 11, s.btnSJ.y - 5);
		s.btnBF.addClickListener(s.openBingFaHandler, s);
		s.btnYB.addClickListener(s.openYiBao, s);
		s.btnSZ.addClickListener(s.openSZHandler, s);
		s.btnTJ.addClickListener(s.openTuJian, s);
		s.btnJH.addClickListener(s.openJiangHunHandle, s);
		s.selectPage();
		s.check_juexing();
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selectPage, s);
		f.listen(ReddotEvent.CHECK_SHENJIAN, s.checkRed, s);
		f.listen(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
		f.listen(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
		f.listen(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
		f.listen(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
		f.listen(ReddotEvent.CHECK_YIBAO, s.checkYiBao, s);
		f.listen(UIConst.JUEXING, s.check_juexing, s);
	}

	protected onHide(): void {
		let s = this;
		var f = GGlobal.reddot;
		if (s._p) {
			s._p.onClose();
		}
		s._p = null;
		s.btnYB.removeClickListener(s.openYiBao, s);
		s.btnBF.removeClickListener(s.openBingFaHandler, s);
		s.btnTJ.removeClickListener(s.openTuJian, s);
		s.btnJH.removeClickListener(s.openJiangHunHandle, s);
		s.btnSZ.removeClickListener(s.openSZHandler, s);
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.selectPage, s);
		f.remove(ReddotEvent.CHECK_SHENJIAN, s.checkRed, s);
		f.remove(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
		f.remove(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
		f.remove(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
		f.remove(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
		f.remove(ReddotEvent.CHECK_YIBAO, s.checkYiBao, s);
		f.remove(UIConst.JUEXING, s.check_juexing, s);
		GGlobal.layerMgr.close(UIConst.SHEN_JIAN);
	}

	private _p: any;
	public selectPage() {
		if (this._p) {
			this._p.onClose();
		}
		if (this.c1.selectedIndex == 0) {
			this.p0.onOpen();
			this._p = this.p0
		} else if (this.c1.selectedIndex == 1) {
			this.p1.onOpen();
			this._p = this.p1
		} else {
			this.p2.onOpen();
			this._p = this.p2
		}
	}

	private checkRed() {
		var f = GGlobal.reddot;
		this.tab0.checkNotice = f.checkCondition(UIConst.SHEN_JIAN, 0) || f.checkCondition(UIConst.JUEXING, 2);
		//升阶
		this.tab1.checkNotice = f.checkCondition(UIConst.SHEN_JIAN, 1);
		this.tab2.checkNotice = f.checkCondition(UIConst.SHEN_JIAN, 2);
		this.btnSJ.checkNotice = f.checkCondition(UIConst.JUEXING, 2) || f.checkCondition(UIConst.SHEN_JIAN, 0) || f.checkCondition(UIConst.SHEN_JIAN, 1) || f.checkCondition(UIConst.SHEN_JIAN, 2);
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

	public check_shenjian_select(value) {
		let isGuide = this.checkJihuo(value);
		if (isGuide) return true;
		if (this.c1.selectedIndex == 0) {
			return this.p0.check_select_grid(value);
		} else {
			return false;
		}
	}

	public checkJihuo(value) {
		for (let i = 0; i < Model_ShenJian.shenjianArr.length; i++) {
			let vo: Vo_ShenJian = Model_ShenJian.shenjianArr[i];
			if (vo.starLv > 0 && vo.quality >= value) {
				return true;
			}
		}
		return false;
	}

	public guide_shenjian_select(step) {
		this.p0.guide_shenjian_select(step);
	}

	public check_shenjian_upstar(value) {
		let isGuide = this.checkJihuo(value);
		return isGuide;
	}

	public guide_shenjian_upstar(step) {
		this.p0.guide_shenjian_upstar(step);
	}

	public guideClosePanel(step) {
		let btn = this.closeButton.asButton;
		GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
		GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
	}
}