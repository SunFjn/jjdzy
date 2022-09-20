class ChildRolePanel extends fairygui.GComponent implements IPanel {

	//>>>>start
	public bgImg: fairygui.GLoader;
	public imgRole: fairygui.GLoader;
	public grid0: ViewGridRender;
	public grid1: ViewGridRender;
	public grid2: ViewGridRender;
	public grid3: ViewGridRender;
	public grid4: ViewGridRender;
	public grid9: ViewGridRender;
	public grid6: ViewGridRender;
	public grid5: ViewGridRender;
	public grid7: ViewGridRender;
	public grid8: ViewGridRender;
	public btnOneKey: Button1;
	public lbPower: fairygui.GLabel;
	public btnSX: Button2;
	public btnTJ: Button2;
	public btnJH: Button2;
	public btnBF: Button2;
	public btnYB: Button2;
	public btnSJ: Button2;
	public btnSZ: Button2;
	public btnLH: Button2;
	//>>>>end

	public static URL: string = "ui://3tzqotadua8b2";
	public static createInstance(): ChildRolePanel {
		return <ChildRolePanel><any>(fairygui.UIPackage.createObject("role", "ChildRolePanel"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(ViewBagOpenGrid.URL, ViewBagOpenGrid);
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.onOpen();
	}

	closePanel(pData?: any) {
		this.onClose();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		for (var i: number = 0; i < 10; i++) {
			s.equipGridArr[i] = s["grid" + i];
			s.equipGridArr[i].grid.gridSource = ViewGrid.ROLE;
		}
	}

	//索引为装备的部件位置
	private equipGridArr: any[] = [];
	private oneKeyWear(event: fairygui.ItemEvent) {
		let bo: boolean = false;
		let arr = [];
		for (let i = 0; i < this.equipGridArr.length; i++) {
			let evo = this.equipGridArr[i];
			if (evo.showNotice) {
				bo = true;
				arr.push(evo.data.sid);
			}
		}
		if (bo) {
			let vo: Vo_Player = Model_player.voMine;
			GGlobal.modelEquip.CGPutOnEquip(arr);
		} else {
			ViewCommonWarn.text("没有装备可换")
		}
		// GuideManager.checkTaskGuide(GuideManager.TYPE_EQUIPGUIDE, 2);
	}

	public openJiangHunHandle(): void {
		// GGlobal.layerMgr.open(UIConst.JIANGHUN);
		//宝物
		GGlobal.layerMgr.open(UIConst.BAOWU);
	}

	public shenjianHandle(): void {
		GGlobal.layerMgr.open(UIConst.SHEN_JIAN);
	}

	public openXTHandler(): void {
		GGlobal.layerMgr.open(UIConst.XING_TU);
	}

	/**打开轮回系统*/
	public openLHHandler(): void {
		GGlobal.layerMgr.open(UIConst.LUNHUI);
	}

	private openBingFaHandler(): void {
		GGlobal.layerMgr.open(UIConst.BINGFA);
	}

	private openTuJian(): void {
		// GGlobal.layerMgr.open(UIConst.TUJIAN);
		//天书
		GGlobal.layerMgr.open(UIConst.TIANSHU);
	}

	private openSZHandler(): void {
		GGlobal.layerMgr.open(UIConst.ZHAN_JIA);
		// ViewCommonWarn.text("功能暂未开放");
	}

	private openYiBao(): void {
		GGlobal.layerMgr.open(UIConst.YIBAO);
	}

	private openShuXing(): void {
		GGlobal.layerMgr.open(UIConst.ROLESHUXING);
	}

	public onOpen() {
		var s = this;
		var f = GGlobal.reddot;
		s.onXianShi();
		s.updateEquip();
		let job = Model_player.voMine.job;
		// ImageLoader.instance.loader(Enum_Path.JUESE_URL + job + ".png", s.imgRole);
		IconUtil.setImg(s.imgRole, Enum_Path.JUESE_URL + job + ".png");

		s.btnSX.addClickListener(s.openShuXing, s);
		s.btnOneKey.addClickListener(s.oneKeyWear, s);
		s.btnBF.addClickListener(s.openBingFaHandler, s);
		s.btnYB.addClickListener(s.openYiBao, s);
		s.btnSZ.addClickListener(s.openSZHandler, s);
		s.btnTJ.addClickListener(s.openTuJian, s);
		s.btnSJ.addClickListener(s.shenjianHandle, s);
		s.btnJH.addClickListener(s.openJiangHunHandle, s);
		s.btnLH.addClickListener(s.openLHHandler, s);
		// s.btnLH.visible = false;
		s.checkBingFa();
		s.checkRolelNotice();
		s.checkZhanJia()
		s.checkBaoWu()
		s.checkTianShu()
		f.listen(ReddotEvent.CHECK_ROLE, s.checkRolelNotice, s);
		f.listen(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
		f.listen(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
		f.listen(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
		f.listen(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
		f.listen(UIConst.JUEXING, s.check_juexing, s);
		GGlobal.control.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, s.updateEquip, s);
		IconUtil.setImg(s.bgImg, Enum_Path.BACK_URL + "frameBg3.jpg");
	}

	private check_juexing() {
		let s = this;
		s.checkBingFa();
		s.checkRolelNotice();
		s.checkZhanJia()
		s.checkBaoWu()
		s.checkTianShu()
	}

	public onClose() {
		IconUtil.setImg(this.bgImg, null);
		var s = this;
		var f = GGlobal.reddot;
		s.removeEffe();

		s.btnSX.removeClickListener(s.openShuXing, s);
		s.btnYB.removeClickListener(s.openYiBao, s);
		s.btnBF.removeClickListener(s.openBingFaHandler, s);
		s.btnTJ.removeClickListener(s.openTuJian, s);
		s.btnSJ.removeClickListener(s.shenjianHandle, s);
		s.btnJH.removeClickListener(s.openJiangHunHandle, s);
		s.btnSZ.removeClickListener(s.openSZHandler, s);
		s.btnOneKey.removeClickListener(s.oneKeyWear, s);
		s.btnLH.removeClickListener(s.openLHHandler, s);
		f.remove(ReddotEvent.CHECK_ROLE, s.checkRolelNotice, s);
		f.remove(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
		f.remove(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
		f.remove(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
		f.remove(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
		f.remove(UIConst.JUEXING, s.check_juexing, s);
		GGlobal.control.remove(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, s.updateEquip, s);
		IconUtil.setImg(s.imgRole, null);
	}

	public checkRolelNotice() {
		let ret = false;
		let s = this;
		let r = GGlobal.reddot
		s.btnOneKey.checkNotice = r.checkCondition(UIConst.ROLE, 1);
		s.updateNotice();
		s.btnSJ.checkNotice = r.checkCondition(UIConst.SHEN_JIAN) || r.checkCondition(UIConst.SHEN_JIAN, 1) || r.checkCondition(UIConst.SHEN_JIAN, 2) || r.checkCondition(UIConst.JUEXING, 2);
		s.btnYB.checkNotice = r.checkCondition(UIConst.YIBAO) || r.checkCondition(UIConst.YIBAO, 1) || r.checkCondition(UIConst.YIBAO, 2) || r.checkCondition(UIConst.JUEXING, 3);
		s.btnLH.checkNotice = r.checkCondition(UIConst.LUNHUI) || r.checkCondition(UIConst.TIANMING) || Model_LunHui.checkSWNotice();
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

	protected updatePower() {
		var vo: Vo_Player = Model_player.voMine;
		if (vo) this.lbPower.text = vo.str.toString();
	}

	/**检测可以更新的装备 */
	protected updateNotice(): void {
		var self = this;
		var vo: Vo_Player = Model_player.voMine;
		var grid: ViewGridRender;
		var bo: boolean;
		for (var i: number = 0; i < self.equipGridArr.length; i++) {
			grid = self.equipGridArr[i];
			let vo = Model_Equip.checkNoticeReplace(i);
			let ret = false;
			if (vo) {
				ret = true;
			}
			grid.showNotice = ret;
			grid.data = vo;
		}
	}

	protected updateEquip(): void {
		this.updateGrid();
		this.updatePower();
		this.updateNotice();
	}

	protected updateGrid(): void {
		var self = this;
		var vo: Vo_Player = Model_player.voMine;
		var grid: ViewGridRender;
		for (var i: number = 0; i < self.equipGridArr.length; i++) {
			grid = self.equipGridArr[i];
			var gindex: number = i;
			if (vo.equipData[gindex]) {
				grid.vo = vo.equipData[gindex];
				grid.grid.showEff(true);
				grid.grid.tipEnabled = true;
			} else {
				grid.grid.showEff(false);
				grid.vo = null;
				grid.grid.tipEnabled = false;
			}
		}
	}

	protected removeEffe(): void {
		var self = this;
		var vo: Vo_Player = Model_player.voMine;
		var grid: ViewGridRender;
		for (var i: number = 0; i < self.equipGridArr.length; i++) {
			grid = self.equipGridArr[i];
			grid.grid.showEff(false);
		}
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