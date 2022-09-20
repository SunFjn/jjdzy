class View_Horse_Panel extends UIPanelBase {

	//>>>>start
	public c1: fairygui.Controller;
	public frame: frame3;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public list: fairygui.GList;
	public labStar: fairygui.GTextField;
	public img: fairygui.GImage;
	public labPower: fairygui.GLabel;
	public showBt: Button2;
	public btnRight: Button2;
	public btnLeft: Button2;
	public vname: fairygui.GLabel;
	public modelIcon: fairygui.GLoader;
	public v1: Child_Horse_Lv;
	public v0: Child_Horse_Star;
	public v2: Child_Hourse_HH;
	//>>>>end

	public static URL: string = "ui://7shc3kzdmoak0";

	private awatar: Part;
	private _selVo: Vo_Horse;
	// private _needItem: VoItem;
	// private _hasNeed = false;

	public static createInstance(): View_Horse_Panel {
		return <View_Horse_Panel><any>(fairygui.UIPackage.createObject("horse", "View_Horse_Panel"));
	}

	public constructor() {
		super();
		this.setSkin("horse", "horse_atlas0", "View_Horse_Panel");
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(Child_Hourse_HH.URL, Child_Hourse_HH);
		f(ItemHorseHH.URL, ItemHorseHH);
		f(ItemHorseCondition.URL, ItemHorseCondition);
		// f(View_Horse_Panel.URL, View_Horse_Panel);
		f(Child_Horse_Lv.URL, Child_Horse_Lv);
		f(Child_Horse_Star.URL, Child_Horse_Star);
		f(VHorseGrid.URL, VHorseGrid);
	}

	protected initView(): void {
		super.initView();
		let a = this;
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandle;
		a.list.setVirtual();
	}

	protected onShown(): void {
		let s = this;
		let m = GGlobal.model_Horse;
		let t_selectedIndex = ~~s._args;
		s.registerEvent(true);
		m.CG_OPENUI_11021();
		s.c1.selectedIndex = -1;
		s.c1.selectedIndex = t_selectedIndex;
	}

	protected onHide(): void {
		let self = this;
		self.registerEvent(false);
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
		self._selVo = null;
		self.v0.hide();
		self.v1.hide();
		self.v2.closePanel();
		self.list.numItems = 0;
	}

	/**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag 
     */
	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.reddot.register(pFlag, UIConst.HORSE, self.setNotice, self);
		GGlobal.model_Horse.register(pFlag, Model_Horse.openui, self.upView, self);
		EventUtil.register(pFlag, self.btnLeft, egret.TouchEvent.TOUCH_TAP, self.pageHandler, self);
		EventUtil.register(pFlag, self.btnRight, egret.TouchEvent.TOUCH_TAP, self.pageHandler, self);
		EventUtil.register(pFlag, self.showBt, egret.TouchEvent.TOUCH_TAP, self.btnShow, self);
		EventUtil.register(pFlag, self.list, fairygui.ItemEvent.CLICK, self.listHandle, self);
		EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.onSelectChange, self);
		EventUtil.register(pFlag, self.list.scrollPane, fairygui.ScrollPane.SCROLL, self.scrollComp, self);

		if (pFlag) {
			ReddotMgr.ins().register(UIConst.HORSE_HH + "|" + 0, self.tab2.noticeImg);
		}
		else {
			ReddotMgr.ins().unregister(self.tab2.noticeImg);
		}
	}


	private renderHandle(index: number, obj: VHorseGrid): void {
		let a = this;
		obj.setVo(a._lstDat[index], a.c1.selectedIndex);
	}


	private _curpage: number = 0;
	private pageHandler(event: egret.TouchEvent): void {
		let btn: fairygui.GButton = event.target as fairygui.GButton;
		let curpage: number = this.list.getFirstChildInView();
		switch (btn.id) {
			case this.btnLeft.id:
				if (curpage > 0) {
					curpage = curpage - 3;
					if (curpage < 0) curpage = 0;
				}
				break;
			case this.btnRight.id:
				if (curpage < this.list.numItems - 1) {
					curpage = curpage + 3;
					if (curpage >= this.list.numItems - 1) curpage = this.list.numItems - 1;
				}
				break;
		}
		this._curpage = curpage;
		if (this.list.numItems > 0)
			this.list.scrollToView(curpage, true, true);
		this.setNotice();
	}

	private setNotice() {
		let s = this;
		s.tab0.checkNotice = GGlobal.reddot.checkCondition(UIConst.HORSE, 1);
		s.tab1.checkNotice = GGlobal.reddot.checkCondition(UIConst.HORSE, 2);

		this.btnRight.checkNotice = false;
		this.btnLeft.checkNotice = false;
		let horArr = s._lstDat;
		if (!horArr) return;
		for (let i = 0; i < horArr.length; i++) {
			let id = horArr[i].id
			let red = GGlobal.reddot.checkCondition(UIConst.HORSE, id * 10 + s.c1.selectedIndex);
			if (!red) continue;
			if (i > this._curpage + 4) {
				this.btnRight.checkNotice = true;
			}
			if (i < this._curpage) {
				this.btnLeft.checkNotice = true;
			}
		}
	}

	private scrollComp(): void {
		let curpage: number = this.list.getFirstChildInView();
		this._curpage = curpage;
		this.setNotice();
	}


	private listHandle(event: fairygui.ItemEvent) {
		let item: VHorseGrid = event.itemObject as VHorseGrid;
		let s = this;
		s._selVo = item.vo;
		s.upSelView();
	}

	private upView() {
		let s = this;
		let m = GGlobal.model_Horse
		s.upList();
		s.upSelView();
		s.setNotice();
	}

	private _lastIndex = 0;
	private onSelectChange(e: fairygui.StateChangeEvent) {
		let t = this;
		if (!(e.currentTarget instanceof fairygui.Controller))
			return;
		let t_selectedIndex = e.currentTarget.selectedIndex;
		if (t_selectedIndex < 0)
			return;

		if (t_selectedIndex == 2) {
			if (!ModuleManager.isOpen(UIConst.HORSE_HH, true)) {
				t.c1.setSelectedIndex(t._lastIndex);
				return;
			}
		}
		t._lastIndex = t_selectedIndex;
		t.upView();
	}

	private sortHor(): void {
		let arr = GGlobal.model_Horse.getHorseListByType(EnumHorse.TYPE_COMMON);
		this._lstDat = arr.sort(function (a, b) {
			return getWeight(a) > getWeight(b) ? -1 : 1;
		});

		function getWeight(hor: Vo_Horse) {
			let ret = 0;
			let star = hor.star
			let red = GGlobal.reddot.checkCondition(UIConst.HORSE, hor.id * 10 + 0) || GGlobal.reddot.checkCondition(UIConst.HORSE, hor.id * 10 + 1)
			if (hor.id == GGlobal.model_Horse.rideId) {//当前职业置顶
				ret += 100000000000;
			}
			else if (star) {//已激活的放在第二序列
				ret += 5000000000;
				ret += 1000000 * hor.quality;//品质权重大于id权重
				ret += hor.id;
			}
			else if (red) {
				ret += 5000000;
				ret += 100000 * hor.quality;//品质权重大于id权重
				ret += hor.id;
			} else {
				ret += hor.id * -1;//品质权重大于id权重
				ret += hor.quality * -10000;
			}
			return ret;
		}
	}

	private _lstDat: Vo_Horse[];
	private upList() {
		let s = this;
		s.sortHor();
		s.list.numItems = s._lstDat.length

		let srollTo = 0
		if (Model_GlobalMsg.selectID > 0) {
			for (let i = 0; i < s._lstDat.length; i++) {
				let vo = s._lstDat[i]
				if (vo.id == Model_GlobalMsg.selectID) {
					srollTo = i;
					break;
				}
			}
			s._selVo = s._lstDat[srollTo];
			Model_GlobalMsg.selectID = 0;
		}
		else if (s._selVo) {
			for (let i = 0; i < s._lstDat.length; i++) {
				if (s._lstDat[i].id == s._selVo.id) {
					srollTo = i;
					break;
				}
			}
			s.list.scrollToView(srollTo);
			s.list.selectedIndex = srollTo;
		} else {
			s._selVo = s._lstDat[0];
		}
		s.list.scrollToView(srollTo);
		s.list.selectedIndex = srollTo;
	}


	private upSelView() {
		let self = this;
		let m = GGlobal.model_Horse
		let v = self._selVo
		self.vname.text = HtmlUtil.fontNoSize(v.name, Color.getColorStr(v.quality));
		self.labStar.text = ConfigHelp.getStarFontStr(v.star);

		switch (self.c1.selectedIndex) {
			case 0:
				self.v0.show(v)
				self.labStar.visible = true;
				self.showBt.visible = v.isAct;
				self.v2.closePanel();
				break;
			case 1:
				self.v1.show(v)
				self.labStar.visible = false;
				self.showBt.visible = false
				self.v2.closePanel();
				break;
			case 2:
				self.v2.openPanel();
				self.labStar.visible = false;
				self.showBt.visible = false;
				break;
		}

		self.labPower.text = "" + self.getAllPower();
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
		if (!self.awatar) {
			self.awatar = EffectMgr.addEff("body/" + v.cfg.model + "/ride_st/ani", self.modelIcon.displayObject as fairygui.UIContainer,
				self.modelIcon.width / 2, self.modelIcon.height, 1000, -1, true);
		}

	}

	private getAllPower() {
		let s = this;
		if (!s._selVo.cfgLv) {
			return 0;
		}
		//升级
		let lvCfg = s._selVo.cfgLv
		//升星
		let starCfg = s._selVo.cfgStar
		return lvCfg.power + starCfg.zl
	}

	private btnShow() {
		let self = this;
		let v = self._selVo
		if (!v) {
			return;
		}
		if (!v.isAct) {
			ViewCommonWarn.text("未激活")
			return;
		}
		GGlobal.modelchat.CG_CHAT_SHOW_DATA(16, v.id);
	}

}