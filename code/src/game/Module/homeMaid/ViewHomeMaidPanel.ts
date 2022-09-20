class ViewHomeMaidPanel extends UIPanelBase {

	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public imgBg: fairygui.GLoader;
	public ng: fairygui.GImage;
	public list: fairygui.GList;
	public labPower: fairygui.GLabel;
	public btnUse: fairygui.GButton;
	public imgUse: fairygui.GImage;
	public imgMaid: fairygui.GLoader;
	public tab0: TabButton;
	public tab1: TabButton;
	public lbRes: fairygui.GRichTextField;
	public vRes: ViewResource;
	public btnOneKey: Button1;
	public btnLv: Button1;
	public expBar: fairygui.GProgressBar;
	public lbLv: fairygui.GRichTextField;
	public showBt: fairygui.GButton;
	public btnSX: fairygui.GButton;
	public lbCostStar: fairygui.GRichTextField;
	public btnStar: Button1;
	public lbTip: fairygui.GRichTextField;
	public labStar: fairygui.GTextField;
	public vName: fairygui.GLabel;
	public btnLeft: Button2;
	public btnRight: Button2;
	public imgMaxLv: fairygui.GImage;
	public imgMaxStar: fairygui.GImage;

	public static URL: string = "ui://qqn3a7vx137v6b";

	private _needItem: VoItem
	private _hasNeed: boolean
	private _selVo: Vo_HomeMaid
	private _lstDat: Vo_HomeMaid[];

	public static createInstance(): ViewHomeMaidPanel {
		return <ViewHomeMaidPanel><any>(fairygui.UIPackage.createObject("homeMaid", "ViewHomeMaidPanel"));
	}

	public constructor() {
		super();
		this.setSkin("homeMaid", "homeMaid_atlas0", "ViewHomeMaidPanel");
	}

	protected setExtends() {
		let fac = fairygui.UIObjectFactory;
		fac.setPackageItemExtension(VMaidGrid.URL, VMaidGrid);
	}
	protected initView(): void {
		super.initView();
		let a = this;
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandle;
	}

	protected onShown(): void {
		let s = this;
		let m = GGlobal.model_HomeMaid
		s.registerEvent(true);
		m.CG_OPENUI_11301();
		s.c1.selectedIndex = 0
		IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "maidBg.jpg");
	}

	protected onHide(): void {
		let self = this;
		self.registerEvent(false);
		self._selVo = null;
		IconUtil.setImg(self.imgBg, null);
		IconUtil.setImg(self.imgMaid, null);
		self.list.numItems = 0;
	}

	/**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag 
     */
	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.reddot.register(pFlag, UIConst.HOME_MAID, self.setNotice, self);
		GGlobal.model_HomeMaid.register(pFlag, Model_HomeMaid.openui, self.upView, self);
		EventUtil.register(pFlag, self.btnLeft, egret.TouchEvent.TOUCH_TAP, self.pageHandler, self);
		EventUtil.register(pFlag, self.btnRight, egret.TouchEvent.TOUCH_TAP, self.pageHandler, self);
		EventUtil.register(pFlag, self.showBt, egret.TouchEvent.TOUCH_TAP, self.btnShow, self);
		EventUtil.register(pFlag, self.btnSX, egret.TouchEvent.TOUCH_TAP, self.onBtnSX, self);
		EventUtil.register(pFlag, self.list, fairygui.ItemEvent.CLICK, self.listHandle, self);
		EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.upView, self);
		EventUtil.register(pFlag, self.btnStar, egret.TouchEvent.TOUCH_TAP, self.onUpStar, self);
		EventUtil.register(pFlag, self.btnLv, egret.TouchEvent.TOUCH_TAP, self.onUpLv, self);
		EventUtil.register(pFlag, self.btnOneKey, egret.TouchEvent.TOUCH_TAP, self.onUpLv, self);
		EventUtil.register(pFlag, self.btnUse, egret.TouchEvent.TOUCH_TAP, self.onUse, self);
		EventUtil.register(pFlag, self.list.scrollPane, fairygui.ScrollPane.SCROLL, self.scrollComp, self);
	}


	private renderHandle(index: number, obj: VMaidGrid): void {
		let a = this;
		obj.setVo(a._lstDat[index], a.c1.selectedIndex);
	}



	private listHandle(event: fairygui.ItemEvent) {
		let item: VMaidGrid = event.itemObject as VMaidGrid;
		let s = this;
		s._selVo = item.vo;
		s.upSelView();
	}

	private upView() {
		let s = this;
		s.upList();
		s.upSelView();
		s.setNotice();
	}

	private sortFuc(): void {
		let arr = GGlobal.model_HomeMaid.datArr;
		this._lstDat = arr.sort(function (a, b) {
			return getWeight(a) > getWeight(b) ? -1 : 1;
		});

		function getWeight(hor: Vo_HomeMaid) {
			let ret = 0;
			let star = hor.star
			let red = GGlobal.reddot.checkCondition(UIConst.HOME_MAID, hor.id * 10 + 0) || GGlobal.reddot.checkCondition(UIConst.HOME_MAID, hor.id * 10 + 1)
			if (hor.id == GGlobal.model_HomeMaid.useId) {//当前职业置顶
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


	private upList() {
		let s = this;
		let m = GGlobal.model_HomeMaid
		s.sortFuc();
		s.list.numItems = s._lstDat.length;
		if (s._selVo) {
			let srollTo = 0
			for (let i = 0; i < s._lstDat.length; i++) {
				if (s._lstDat[i].id == s._selVo.id) {
					srollTo = i;
					break;
				}
			}
			s.list.scrollToView(srollTo);
			s.list.selectedIndex = srollTo;
		} else {
			s.list.scrollToView(0);
			s.list.selectedIndex = 0;
			s._selVo = s._lstDat[0];
		}
	}


	private upSelView() {
		let self = this;
		let m = GGlobal.model_HomeMaid
		let v = self._selVo
		self.vName.text = HtmlUtil.fontNoSize(v.name, Color.getColorStr(v.quality));
		IconUtil.setImg(self.imgMaid, Enum_Path.HOMEMAID_URL + v.cfg.yuanhua + ".png");
		if (self.c1.selectedIndex == 0) {
			self.labStar.visible = true;
			self.showBt.visible = v.isAct
			self.labPower.text = v.cfgStar.power + "";
			self.lbTip.text = "";
			// self.lbTip.text = "侍女提升到" + v.cfg.dongtai + "星解锁动态效果";
			self.labStar.text = ConfigHelp.getStarFontStr(v.star);
			if (v.star == 0) {
				self.btnStar.text = "激活"
			} else {
				self.btnStar.text = "升星"
			}
			if (v.star >= v.cfg.shangxian) {//满星
				self.imgMaxStar.visible = true;
				self.btnStar.visible = false;
				self.lbCostStar.text = ""
			} else {
				self.imgMaxStar.visible = false;
				self.btnStar.visible = true;
				//升星道具
				var consume = JSON.parse(v.cfg.xiaohao)
				self._needItem = VoItem.create(Number(consume[0][1]))
				var hasCount = Model_Bag.getItemCount(Number(consume[0][1]))
				var count = Number(consume[0][2])
				var colorStr;
				if (hasCount >= count) {
					colorStr = '#00FF00';
					self._hasNeed = true;
				} else {
					colorStr = '#FF0000';
					self._hasNeed = false;
				}
				self.lbCostStar.text = "消耗：" + HtmlUtil.fontNoSize(self._needItem.name, Color.getColorStr(self._needItem.quality)) + "x" + count +
					HtmlUtil.fontNoSize("(" + hasCount + "/" + count + ")", colorStr)
				self.btnStar.checkNotice = self._hasNeed
			}
			//使用
			self.imgUse.visible = m.useId == v.id
			self.btnUse.visible = m.useId != v.id && v.isAct;
		} else {
			self.lbLv.text = v.lv + "级"
			self.labPower.text = v.cfgLv.zl + "";
			self.showBt.visible = false

			if (v.cfgLv.xh == "0") {//满级
				self.imgMaxLv.visible = true;
				self.lbRes.text = ""
				self.vRes.visible = false;
				self.expBar._titleObject.text = "MAX";
				self.btnOneKey.visible = self.btnLv.visible = false;
			} else {
				self.imgMaxLv.visible = false;
				self.vRes.visible = true;
				//升级道具
				var consume = JSON.parse(v.cfgLv.xh)
				self._needItem = VoItem.create(Number(consume[0][1]))
				var hasCount = Model_Bag.getItemCount(Number(consume[0][1]))
				var count = Number(consume[0][2])
				var colorStr;
				if (hasCount > 0) {
					colorStr = '#00FF00';
					self._hasNeed = true;
				} else {
					colorStr = '#FF0000';
					self._hasNeed = false;
				}
				self.vRes.visible = true
				self.vRes.setImgUrl(self._needItem.icon);
				// self.vRes.setLb(hasCount, count);
				self.vRes.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(hasCount) + "/" + ConfigHelp.numToStr(count), colorStr));
				self.lbRes.text = HtmlUtil.fontNoSize(self._needItem.name, Color.getColorStr(self._needItem.quality));
				self.lbCostStar.text = ""
				//升级最大值
				let lvHome = GGlobal.homemodel.home_level
				let cfgHome = Config.fdsj_019[lvHome]
				let red = (v.lv < cfgHome.shinv) && self._hasNeed && v.isAct

				self.btnLv.checkNotice = red
				self.btnOneKey.checkNotice = red && hasCount >= count
				self.btnOneKey.visible = self.btnLv.visible = true;

				self.expBar.max = count * 10
				self.expBar.value = v.exp;
			}
			//
			self.imgUse.visible = false
			self.btnUse.visible = false

		}
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
					if (curpage > this.list.numItems - 5) curpage = this.list.numItems - 5;
				}
				break;
		}
		this._curpage = curpage;
		if (this.list.numItems > 0)
			this.list.scrollToView(curpage, true, true);
		this.setNotice();
	}


	private scrollComp(): void {
		let curpage: number = this.list.getFirstChildInView();
		this._curpage = curpage;
		this.setNotice();
	}

	private setNotice() {
		let s = this;
		s.tab0.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_MAID, 1);
		s.tab1.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_MAID, 2);

		this.btnRight.checkNotice = false;
		this.btnLeft.checkNotice = false;
		let arr = s._lstDat;
		if (!arr) return;
		for (let i = 0; i < arr.length; i++) {
			let id = arr[i].id
			let red = GGlobal.reddot.checkCondition(UIConst.HOME_MAID, id * 10 + s.c1.selectedIndex);
			if (!red) continue;
			if (i > this._curpage + 4) {
				this.btnRight.checkNotice = true;
			}
			if (i < this._curpage) {
				this.btnLeft.checkNotice = true;
			}
		}
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
		GGlobal.modelchat.CG_CHAT_SHOW_DATA(17, v.id);
	}

	private onBtnSX() {
		let self = this;
		if (!self._selVo) {
			return;
		}
		GGlobal.layerMgr.open(UIConst.HOME_MAID_ATTR, this._selVo)
	}

	private onUse() {
		let self = this;
		let v = self._selVo
		if (!v) {
			return;
		}
		if (!v.isAct) {
			ViewCommonWarn.text("未激活")
			return;
		}
		GGlobal.model_HomeMaid.CG_USE_11307(v.id);
	}

	private onUpStar() {
		let self = this;
		let v = self._selVo
		if (!v) {
			return;
		}
		if (!self._hasNeed) {
			View_CaiLiao_GetPanel.show(self._needItem);
			return;
		}
		GGlobal.model_HomeMaid.CG_UPSTAR_11303(v.id)
	}

	private onUpLv(e: egret.TouchEvent) {
		let self = this;
		let v = self._selVo
		if (!v) {
			return;
		}
		if (!v.isAct) {
			ViewCommonWarn.text("未激活")
			return;
		}
		if (!self._hasNeed) {
			View_CaiLiao_GetPanel.show(self._needItem);
			return;
		}
		let lvHome = GGlobal.homemodel.home_level
		let cfg = Config.fdsj_019[lvHome]
		if (v.lv >= cfg.shinv) {
			ViewCommonWarn.text("提高府邸等级可继续升级")
			return;
		}
		//府邸等级不满足要求

		if (e.currentTarget.id == self.btnOneKey.id) {
			GGlobal.model_HomeMaid.CG_UPLV_11305(v.id, 2)
		} else {
			GGlobal.model_HomeMaid.CG_UPLV_11305(v.id, 1)
		}
	}
}