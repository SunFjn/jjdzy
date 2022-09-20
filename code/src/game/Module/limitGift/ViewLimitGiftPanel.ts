class ViewLimitGiftPanel extends UIModalPanel {

	public c1: fairygui.Controller;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public tab3: TabButton;
	public frame: fairygui.GLabel;
	public btn: fairygui.GButton;
	public btnGet: Button0;
	public imgHas: fairygui.GImage;
	public list: fairygui.GList;
	public btnTab0: TabButton2;
	public btnTab1: TabButton2;
	public lbTime: fairygui.GRichTextField;
	public lbZhe: fairygui.GRichTextField;
	public lbTit: fairygui.GRichTextField;
	public imgBg: fairygui.GLoader

	public static URL: string = "ui://k02wlh83fvsk0";

	private tabArr: TabButton[];
	private btnTabArr: TabButton2[];
	private _lstDt: IGridImpl[]
	private _endTime = 0
	//数据
	private _selDt: { id: number, st: number, cfg: Ixslbb_331 }
	private _selVo: VoLimitGift
	private _awaArr: { id: number, st: number, cfg: Ixslbb_331 }[]
	private _ingArr: VoLimitGift[]

	public static createInstance(): ViewLimitGiftPanel {
		return <ViewLimitGiftPanel><any>(fairygui.UIPackage.createObject("limitGift", "ViewLimitGiftPanel"));
	}

	public constructor() {
		super();
		this.loadRes("limitGift", "limitGift_atlas0");
	}

	protected childrenCreated() {
		GGlobal.createPack("limitGift");
		let s = this;
		s.contentPane = s.view = fairygui.UIPackage.createObject("limitGift", "ViewLimitGiftPanel").asCom;
		CommonManager.parseChildren(s.view, s);

		s.tabArr = [s.tab0, s.tab1, s.tab2, s.tab3];
		s.btnTabArr = [s.btnTab0, s.btnTab1];
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;

		super.childrenCreated();
	}


	protected onShown() {
		super.onShown();
		let m = GGlobal.model_limitGift;
		let s = this;
		m.listen(Model_LimitGift.OPENUI, s.upView, s);
		m.listen(Model_LimitGift.GETAWARD, s.upSelView, s);
		Timer.instance.listen(s.upTimer, s);
		for (let i = 0; i < 4; i++) {
			s.tabArr[i].addClickListener(s.onTab, s);
		}
		s.btn.addClickListener(s.onCharge, s);
		s.btnGet.addClickListener(s.onGet, s);
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.onPage, this);
		s.upView();
		IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "limitGift.jpg");
	}

	protected onHide() {
		super.onHide();
		let s = this;
		let m = GGlobal.model_limitGift;
		m.remove(Model_LimitGift.OPENUI, s.upView, s);
		m.remove(Model_LimitGift.GETAWARD, s.upSelView, s);
		Timer.instance.remove(s.upTimer, s);
		for (let i = 0; i < 4; i++) {
			s.tabArr[i].removeClickListener(s.onTab, s);
		}
		s.btn.removeClickListener(s.onCharge, s);
		s.btnGet.removeClickListener(s.onGet, s);
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.onPage, this);
		IconUtil.setImg(s.imgBg, null);
		s.list.numItems = 0;
	}

	public upView() {
		let m = GGlobal.model_limitGift;
		let s = this;
		let arr = m.giftArr
		let idx = 0;
		let servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		s._ingArr = []
		for (let i = 0; i < arr.length; i++) {
			let v: VoLimitGift = arr[i];
			if (v.endTime - servTime <= 0) {
				continue;
			}
			if (v.type == 1) {
				s.tabArr[i].text = "转生"
			} else if (v.type == 2) {
				s.tabArr[i].text = "切换地图"
			} else if (v.type == 3) {
				s.tabArr[i].text = "红将收集"
			} else if (v.type == 4) {
				s.tabArr[i].text = "一骑当千"
			}
			s.tabArr[i].visible = true;
			s.tabArr[i].data = v.type;
			idx++
			s._ingArr.push(v);
		}
		for (let i = idx; i < 4; i++) {
			s.tabArr[i].visible = false;
		}

		if (s._ingArr.length > 0) {
			if (this._args && this._args > 0) {
				s.onTabView(this._args)
				this._args = null;
			} else {
				s.onTabView(s._ingArr[0].type)
			}
		} else {
			s.closeEventHandler(null);
			// GGlobal.mainUICtr.removeIcon(UIConst.LIMIT_GIFT);
		}
	}

	//转生  切换地图
	private onTab(e: egret.TouchEvent) {
		let btn: TabButton = e.currentTarget as TabButton
		let s = this;
		s.onTabView(btn.data)
	}

	private onTabView(type) {
		let s = this;
		let m = GGlobal.model_limitGift;
		for (let i = 0; i < m.giftArr.length; i++) {
			if (m.giftArr[i].type == type) {
				s._selVo = m.giftArr[i]
				break;
			}
		}
		for (let i = 0; i < s.tabArr.length; i++) {
			let v: TabButton = s.tabArr[i]
			v.selected = (v.data == s._selVo.type)
		}
		s._endTime = s._selVo.endTime
		s.upTimer();
		s._awaArr = [];
		//取最大的2个
		for (let i = 0; i < s._selVo.awaArr.length; i++) {
			let v = s._selVo.awaArr[i];
			if (v.cfg.lx2 == 1 && (s._awaArr[0] == null || v.id > s._awaArr[0].id)) {
				s._awaArr[0] = v;
			} else if (v.cfg.lx2 == 2 && (s._awaArr[1] == null || v.id > s._awaArr[1].id)) {
				s._awaArr[1] = v;
			}
		}
		if (s.c1.selectedIndex == 0) {
			s.onPage()
		} else {
			s.c1.selectedIndex = 0
		}
	}

	//至尊 豪华
	public onPage() {
		let s = this;
		let c = this.c1.selectedIndex
		if (c == 0) {
			s.selView(s._awaArr[0]);
		} else if (c == 1) {
			s.selView(s._awaArr[1]);
		}
	}

	private selView(v) {
		let s = this
		s._selDt = v
		s.upSelView()
	}

	private upSelView() {
		let s = this
		let cfg = s._selDt.cfg;
		s.lbTit.text = cfg.ms
		s.lbZhe.text = (cfg.zk / 100) + ""
		s._lstDt = ConfigHelp.makeItemListArr(JSON.parse(cfg.jl))
		s.list.numItems = s._lstDt.length
		s.btn.text = cfg.rmb + "元";

		if (s._selDt.st == 1) {//可领取
			s.btn.visible = false
			s.btnGet.visible = true
			s.btnGet.checkNotice = true;
			s.imgHas.visible = false
		} else if (s._selDt.st == 2) {//已领取
			s.btn.visible = false
			s.btnGet.visible = false
			s.imgHas.visible = true
		} else {
			s.btn.visible = true
			s.btnGet.visible = false
			s.imgHas.visible = false
		}

		s.upRed()
	}

	private itemRender(index, obj) {
		let s = this;
		let item: ViewGrid = obj as ViewGrid;
		item.tipEnabled = item.isShowEff = true;
		item.vo = s._lstDt[index];
	}

	private upTimer() {
		let s = this;
		const end = s._endTime ? s._endTime : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			s.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			s.lbTime.text = "00:00:00";
			s.upView();
		}
	}

	private onCharge() {
		let s = this;
		if (!s._selDt) {
			return;
		}
		GGlobal.modelchongzhi.CG_CHONGZHI_135(s._selDt.cfg.cz, null, false);
	}

	private onGet() {
		let s = this;
		if (!s._selDt) {
			return;
		}
		if (s._selDt.st != 1) {
			return;
		}
		GGlobal.model_limitGift.CG_GETAWARD_10451(s._selDt.id);
	}

	private upRed() {
		let s = this;
		for (let i = 0; i < s._awaArr.length; i++) {
			let v = s._awaArr[i];
			s.btnTabArr[i].checkNotice = v.st == 1;
		}

		for (let i = 0; i < s._ingArr.length; i++) {
			let v = s._ingArr[i];
			let red = false
			for (let j = 0; j < v.awaArr.length; j++) {
				let v1 = v.awaArr[j];
				if (v1.st == 1) {
					red = true
					break;
				}
			}
			s.tabArr[i].checkNotice = red;
		}
	}
}