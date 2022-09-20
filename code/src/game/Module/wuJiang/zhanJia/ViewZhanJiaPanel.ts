class ViewZhanJiaPanel extends UIPanelBase {

	public c1: fairygui.Controller;
	public p0: ChildZhanJiaUpStar;
	public p1: ChildZhanJiaUpJie;
	public p2: ChildZhanJiaSuit;
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
		fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu_Jie.URL, ChildZhanJiaUpJie);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu.URL, ChildZhanJiaUpStar);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu_JiBan.URL, ChildZhanJiaSuit);
		fairygui.UIObjectFactory.setPackageItemExtension(ViewBWGrid.URL, VZhanJiaGrid);
	}

	protected initView(): void {
		super.initView();
	}
	private check_juexing() {
		let s = this;
		s.checkBingFa();
		s.checkYiBao();
		s.checkBaoWu();
		s.checkTianShu();
		s.upCheck();
		s.checkShenJian();
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

	private openYiBao(): void {
		GGlobal.layerMgr.open(UIConst.YIBAO, this.c1.selectedIndex);
	}

	protected onShown(): void {
		var st = 0;
		let s = this;
		s.setExtends();
		if (s._args) st = s._args;
		s.c1.selectedIndex = st;
		s.addListen();
		s.selectPage();
		s.check_juexing();
	}

	protected onHide(): void {
		this.removeListen();
	}

	private addListen(): void {
		let s = this;
		let f = GGlobal.reddot;
		let c = GGlobal.control;
		GGlobal.modelZhanJia.CGGetZhanJiaUi();
		s.onXianShi();
		s.iconSelImg.setXY(s.btnSZ.x - 11, s.btnSZ.y - 5);
		s.btnBF.addClickListener(s.openBingFaHandler, s);
		s.btnYB.addClickListener(s.openYiBao, s);
		s.btnTJ.addClickListener(s.openTuJian, s);
		s.btnSJ.addClickListener(s.shenjianHandle, s);
		s.btnJH.addClickListener(s.openJiangHunHandle, s);

		f.listen(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
		f.listen(ReddotEvent.CHECK_SHENJIAN, s.checkShenJian, s);
		f.listen(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
		f.listen(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
		f.listen(ReddotEvent.CHECK_YIBAO, s.checkYiBao, s);
		f.listen(ReddotEvent.CHECK_ZHAN_JIA, s.upCheck, s);
		f.listen(UIConst.JUEXING, s.check_juexing, s);

		c.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, s.update, s);
		c.listen(Enum_MsgType.ZHANJIA_OPENUI_UPDATE, s.selectPage, s);
		c.listen(Enum_MsgType.ZHANJIA_UPJIE_UPDATE, s.update, s);
		c.listen(Enum_MsgType.ZHANJIA_UP_SKILL, s.update, s);
		c.listen(Enum_MsgType.ZHANJIA_CHANGE, s.update, s);
		c.listen(Enum_MsgType.ZHANJIA_UP_STAR, s.upCheck, s);
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selectPage, s);
		s.p1.addEvent();
		s.p0.addEvent();
		s.p2.open();
	}

	private removeListen(): void {
		let s = this;
		let f = GGlobal.reddot;
		let c = GGlobal.control;
		s.p0.clean();
		s.btnYB.removeClickListener(s.openYiBao, s);
		s.btnBF.removeClickListener(s.openBingFaHandler, s);
		s.btnTJ.removeClickListener(s.openTuJian, s);
		s.btnSJ.removeClickListener(s.shenjianHandle, s);
		s.btnJH.removeClickListener(s.openJiangHunHandle, s);
		f.remove(ReddotEvent.CHECK_SHENJIAN, s.checkShenJian, s);
		f.remove(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
		f.remove(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
		f.remove(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
		f.remove(ReddotEvent.CHECK_YIBAO, s.checkYiBao, s);
		f.remove(ReddotEvent.CHECK_ZHAN_JIA, this.upCheck, this)
		f.remove(UIConst.JUEXING, s.check_juexing, s)
		GGlobal.layerMgr.close(UIConst.ZHAN_JIA);
		c.remove(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, this.update, this);
		c.remove(Enum_MsgType.ZHANJIA_OPENUI_UPDATE, this.selectPage, this);
		c.remove(Enum_MsgType.ZHANJIA_UPJIE_UPDATE, this.update, this);
		c.remove(Enum_MsgType.ZHANJIA_UP_SKILL, this.update, this);
		c.remove(Enum_MsgType.ZHANJIA_CHANGE, this.update, this);
		c.remove(Enum_MsgType.ZHANJIA_UP_STAR, this.upCheck, this);
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		s.p1.removeEvent();
		s.p0.removeEvent();
		s.p2.close();
	}

	public selectPage() {
		if (this.c1.selectedIndex == 0) {
			this.p0.init();
		}
		this.update();
	}

	public update() {
		if (this.c1.selectedIndex == 0) {
			this.p0.update();
		} else if (this.c1.selectedIndex == 1) {
			this.p1.update();
			this.p0.clean();
		} else {
			this.p2.update();
			this.p0.clean();
		}
		this.upCheck()
	}

	private upCheck(): void {
		this.tab0.checkNotice = Model_ZhanJia.checkUpStar() || GGlobal.reddot.checkCondition(UIConst.JUEXING, 6);
		this.tab1.checkNotice = Model_ZhanJia.checkUpJie();
		this.tab2.checkNotice = Model_ZhanJia.checkSuit();
		this.btnSZ.checkNotice = Model_ZhanJia.checkUpStar() || Model_ZhanJia.checkUpJie() || Model_ZhanJia.checkSuit() || GGlobal.reddot.checkCondition(UIConst.JUEXING, 6);
	}

	public guideCheckTab(arg) {
		return this.c1.selectedIndex == arg;
	}

	public guideTab() {
		GuideStepManager.instance.showGuide(this.tab1, this.tab1.width / 2, this.tab1.height / 2);
	}

	public guide_keyZhanJiaUpLevel(arg) {
		this.p1.guide_keyZhanJiaUpLevel();
	}

	public guideClosePanel() {
		GuideStepManager.instance.showGuide(this.closeButton as fairygui.GButton, this.closeButton.width / 2, this.closeButton.height / 2, null, true);
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