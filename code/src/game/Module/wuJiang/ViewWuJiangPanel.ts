class ViewWuJiangPanel extends UIPanelBase {

	public c1: fairygui.Controller;
	public c2: fairygui.Controller;
	public c3: fairygui.Controller;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public tab3: TabButton;
	public static URL: string = "ui://zyx92gzwtht40";
	public title: fairygui.GTextField;
	public tab00: TabButton;
	public tab01: TabButton;
	public tab02: TabButton;
	public wuJiangBt: Button2;
	public godWeaponBt: Button2;
	public godWuJiangBt: Button2;
	public sbDiscountImg: fairygui.GImage;
	public sbDiscountImg1: fairygui.GImage;
	public weaponGroup: fairygui.GGroup;
	public groupTabbutton: fairygui.GGroup;
	public static createInstance(): ViewWuJiangPanel {
		return <ViewWuJiangPanel><any>(fairygui.UIPackage.createObject("wuJiang", "ViewWuJiangPanel"));
	}

	public constructor() {
		super();
		this.setSkin("wuJiang", "wuJiang_atlas0", "ViewWuJiangPanel");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory
		f.setPackageItemExtension(ChildWuJiangUpJie.URL, ChildWuJiangUpJie);
		f.setPackageItemExtension(ChildWuJiangUpStar.URL, ChildWuJiangUpStar);
		f.setPackageItemExtension(ChildShiZhuang.URL, ChildShiZhuang);
		f.setPackageItemExtension(ChildWuJiangJYin.URL, ChildWuJiangJYin);
		f.setPackageItemExtension(VWuJiangSkill.URL, VWuJiangSkill);
		f.setPackageItemExtension(VWuJiangGrid.URL, VWuJiangGrid);
		f.setPackageItemExtension(VWuJiangJYin.URL, VWuJiangJYin);
		f.setPackageItemExtension(ChildWuJiangJiBan.URL, ChildWuJiangJiBan);
		f.setPackageItemExtension(Child_ZSGodWeapon_UpStar.URL, Child_ZSGodWeapon_UpStar);
		f.setPackageItemExtension(Child_ZSGodWeapon_CuiLian.URL, Child_ZSGodWeapon_CuiLian);
		f.setPackageItemExtension(VZSGodWeaponGrid.URL, VZSGodWeaponGrid);
		f.setPackageItemExtension(Child_GodWeapon_DuanZao.URL, Child_GodWeapon_DuanZao);
		f.setPackageItemExtension(VGodWeaponPoint.URL, VGodWeaponPoint);

		f.setPackageItemExtension(ChildGodWuJiang.URL, ChildGodWuJiang);
		f.setPackageItemExtension(ChildGodWuJiangXiuLian.URL, ChildGodWuJiangXiuLian);
		f.setPackageItemExtension(ChildGodWuJiangView.URL, ChildGodWuJiangView);
	}

	protected initView(): void {
		super.initView();
	}

	public openPanel(value) {
		let self = this;
		var st = 0;
		self._args = value;
		if (self._args) st = self._args;
		if (st >= 20) {
			self._godsel = st % 10;
		}
		else if (st >= 10) {
			self.c3.selectedIndex = st % 10;
		} else {
			self.c1.selectedIndex = st;
		}
		self.c2.selectedIndex = Math.floor(st / 10);
		self.selectPage();
	}

	private _godsel = 0;//神将的跳转
	protected onShown(): void {
		let self = this;
		var st = 0;
		if (self._args) st = self._args;
		if (st >= 20) {
			self._godsel = st % 10;
		}
		else if (st >= 10) {
			self.c3.selectedIndex = st % 10;
		} else {
			self.c1.selectedIndex = st;
		}
		self.c2.selectedIndex = Math.floor(st / 10);
		self.addListen();
		// self.selectPage();
		self.checkSBDiscount();
	}

	private onWuJiang(evt: egret.TouchEvent) {
		let self = this;
		let bt = evt.target as Button2;
		if (bt.hashCode == self.wuJiangBt.hashCode) {
			if (self.c2.selectedIndex == 0) return;
			self.c2.selectedIndex = 0;
			self.c1.selectedIndex = 0;
			self._godsel = 0
		} else if (bt.hashCode == self.godWuJiangBt.hashCode) {
			if (!ModuleManager.isOpen(UIConst.GOD_WUJIANG, true)) return;
			if (self.c2.selectedIndex == 2) return;
			self.c2.selectedIndex = 2;
		} else {
			if (self.c2.selectedIndex == 1) return;
			if (!ModuleManager.isOpen(UIConst.ZS_GODWEAPON, true)) return;
			self.c2.selectedIndex = 1;
			self.c3.selectedIndex = 0;
			self._godsel = 0
		}
		self.selectPage();
		this.view.setChildIndex(this.wuJiangBt, this.view.numChildren - 1);
		this.view.setChildIndex(this.godWuJiangBt, this.view.numChildren - 1);
		this.view.setChildIndex(this.godWeaponBt, this.view.numChildren - 1);
	}

	protected onHide(): void {
		this.removeListen();
	}


	// private _first: boolean = false;
	private addListen(): void {
		let self = this;
		// if (!self._first) {
		// GGlobal.modelEquip.CGGetEquips(3);
		// if (GGlobal.modelguanxian.guanzhi == 0) {
		// 	GGlobal.modelguanxian.csGuanxian();
		// }
		// 	self._first = true;
		// }
		ViewWuJiangPanel._selPage = 0;
		GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_WUJIANG);
		GGlobal.modelWuJiang.CGGetWuJiang();
		let c = GGlobal.control;
		c.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
		c.listen(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, self.update, self);
		c.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, self.update, self);
		c.listen(Enum_MsgType.WUJIANG_UPJIE_UPDATE, self.update, self);
		c.listen(Enum_MsgType.WUJIANG_UP_SKILL, self.update, self);
		c.listen(Enum_MsgType.WUJIANG_USE_DAN, self.update, self);
		// c.listen(Enum_MsgType.MSG_GXINIT, self.update, self);
		c.listen(Enum_MsgType.WUJIANG_OPENUI_UPDATE, self.selectPage, self);
		GGlobal.reddot.listen(ReddotEvent.CHECK_WU_JIANG, self.upCheck, self);
		GGlobal.reddot.listen(UIConst.GOD_WUJIANG, self.upCheck, self);
		GGlobal.reddot.listen(UIConst.ZS_GODWEAPON, self.upCheck, self);
		self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.selectPage, self);
		self.c3.addEventListener(fairygui.StateChangeEvent.CHANGED, self.selectPage, self);
		self.wuJiangBt.addClickListener(self.onWuJiang, self);
		self.godWeaponBt.addClickListener(self.onWuJiang, self);
		self.godWuJiangBt.addClickListener(self.onWuJiang, self);
		// self.viewJie.addEvent();
		// self.viewStar.addEvent();
		// self.viewJYin.addEvent();
		// self.viewJiB.addEvent();
		c.listen(Enum_MsgType.ACTIVITY_LOGIN_SEND, self.checkSBDiscount, self);
		c.listen(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.checkSBDiscount, self);
	}

	private removeListen(): void {
		let c = GGlobal.control;
		let self = this;
		Model_WuJiang.selectJob = 0;
		GGlobal.layerMgr.close(UIConst.WU_JIANG);
		c.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
		c.remove(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, self.update, self);
		c.remove(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, self.update, self);
		c.remove(Enum_MsgType.WUJIANG_UPJIE_UPDATE, self.update, self);
		c.remove(Enum_MsgType.WUJIANG_UP_SKILL, self.update, self);
		c.remove(Enum_MsgType.WUJIANG_USE_DAN, self.update, self);
		// c.remove(Enum_MsgType.MSG_GXINIT, self.update, self);
		GGlobal.reddot.remove(ReddotEvent.CHECK_WU_JIANG, self.upCheck, self);
		GGlobal.reddot.remove(UIConst.ZS_GODWEAPON, self.upCheck, self);
		GGlobal.reddot.remove(UIConst.GOD_WUJIANG, self.upCheck, self);
		c.remove(Enum_MsgType.WUJIANG_OPENUI_UPDATE, self.selectPage, self);
		self.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, self.selectPage, self);
		self.c3.removeEventListener(fairygui.StateChangeEvent.CHANGED, self.selectPage, self);
		self.wuJiangBt.removeClickListener(self.onWuJiang, self);
		self.godWeaponBt.removeClickListener(self.onWuJiang, self);
		self.godWuJiangBt.removeClickListener(self.onWuJiang, self);
		c.remove(Enum_MsgType.ACTIVITY_LOGIN_SEND, self.checkSBDiscount, self);
		c.remove(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.checkSBDiscount, self);
		// self.viewJie.removeEvent();
		// self.viewStar.removeEvent();
		// self.viewJYin.removeEvent();
		// self.viewJiB.removeEvent();
		if (self.curWuJItem) {
			self.curWuJItem.removeEvent();
			self.curWuJItem.removeFromParent()
		}
		self.curWuJItem = null;
		if (self.curGodItem) {
			self.curGodItem.onClose()
			self.curGodItem.removeFromParent()
		}
		self.curGodItem = null;
		// self.weaponItem.onClose();
		// self.godWeaponItem1.onClose();
		// self.duanZaoItem.onClose();
		Model_GlobalMsg.selectID = 0;
	}

	public dispose() {
		super.dispose();
		for (let i = 0; i < this.wuJItemArr.length; i++) {
			let v = this.wuJItemArr[i];
			if (v) v.dispose();
		}
		this.wuJItemArr = [];//可能调用2次  设置null 前面会报错

		for (let i = 0; i < this.godItemArr.length; i++) {
			let v = this.godItemArr[i];
			if (v) v.dispose();
		}
		this.godItemArr = [];
	}
	//神兵
	private curGodItem: any;
	private godItemArr: any[] = [];
	//武将
	private curWuJItem: any = null;
	private wuJItemArr: any[] = [];
	//神将
	private godWujiangItem;
	public static _selPage: number;
	private selectPage() {
		let self = this;
		if (self.godWujiangItem) {
			self.godWujiangItem.closePanel();
		}

		switch (self.c2.selectedIndex) {
			case 0://普通武将
				self.wujiang_page_change();
				break;
			case 1://神兵
				self.godweapon_page_change();
				break;
			case 2://神将
				self.godwujiang_page_change();
				break;
		}
		self.tab1.parent.setChildIndex(self.tab1, self.tab1.parent.numChildren - 1);
	}

	wujiang_page_change = () => {
		let self = this;
		if (self.curGodItem) {
			self.curGodItem.onClose();
			self.curGodItem.removeFromParent()
		}

		if (self.godWujiangItem) {
			self.godWujiangItem.closePanel();
			self.godWujiangItem.removeFromParent()
		}

		if (self.curWuJItem) {
			self.curWuJItem.removeEvent();
			self.curWuJItem.removeFromParent()
		}
		let selC1 = self.c1.selectedIndex
		if (!self.wuJItemArr[selC1]) {//创建
			if (selC1 == 0) {
				self.wuJItemArr[selC1] = ChildWuJiangUpStar.createInstance();
				self.wuJItemArr[selC1].setXY(0, 148);
			} else if (selC1 == 1) {
				self.wuJItemArr[selC1] = ChildWuJiangUpJie.createInstance();
				self.wuJItemArr[selC1].setXY(15, 146);
			} else if (selC1 == 2) {
				self.wuJItemArr[selC1] = ChildWuJiangJiBan.createInstance();
				self.wuJItemArr[selC1].setXY(15, 146);
			} else if (selC1 == 3) {
				self.wuJItemArr[selC1] = ChildWuJiangJYin.createInstance();
				self.wuJItemArr[selC1].setXY(15, 146);
			}
		}
		self.curWuJItem = self.wuJItemArr[selC1]
		self.curWuJItem.addEvent();
		self.view.addChild(self.curWuJItem)

		if (selC1 == 0) {
			self.curWuJItem.show();
		} else if (selC1 == 3) {
			self.curWuJItem.show();
		}
		self.update();
	}

	godweapon_page_change = () => {
		let self = this;
		Model_ZSGodWeapon.selectJob = 0;
		if (self.curGodItem) {
			Model_ZSGodWeapon.selectJob = self.curGodItem.getSelectJob();
			self.curGodItem.onClose();
			self.curGodItem.removeFromParent()
		}

		if (self.godWujiangItem) {
			self.godWujiangItem.closePanel();
			self.godWujiangItem.removeFromParent()
		}

		if (self.curWuJItem) {
			self.curWuJItem.removeEvent();
			self.curWuJItem.removeFromParent()
		}
		let selC3 = self.c3.selectedIndex
		if (!self.godItemArr[selC3]) {//创建
			if (selC3 == 0) {
				self.godItemArr[selC3] = Child_ZSGodWeapon_UpStar.createInstance();
				self.godItemArr[selC3].setXY(0, 148);
			} else if (selC3 == 1) {
				self.godItemArr[selC3] = Child_ZSGodWeapon_CuiLian.createInstance();
				self.godItemArr[selC3].setXY(0, 148);
			} else if (selC3 == 2) {
				self.godItemArr[selC3] = Child_GodWeapon_DuanZao.createInstance();
				self.godItemArr[selC3].setXY(6, 157);
			}
		}
		self.curGodItem = self.godItemArr[selC3];
		self.curGodItem.onOpen();
		self.view.addChildAt(self.curGodItem, self.view.numChildren - 2);
	}

	godwujiang_page_change = () => {

		let self = this;
		if (self.curGodItem) {
			self.curGodItem.onClose();
			self.curGodItem.removeFromParent()
		}

		if (self.curWuJItem) {
			self.curWuJItem.removeEvent();
			self.curWuJItem.removeFromParent()
		}

		if (self.godWujiangItem) {
			self.godWujiangItem.closePanel();
			self.godWujiangItem.removeFromParent()
		}
		if (!self.godWujiangItem) {
			self.godWujiangItem = ChildGodWuJiangView.createInstance();
		}
		self.godWujiangItem.openPanel(self._godsel);
		self.view.addChild(self.godWujiangItem)
	}

	private update(): void {
		let self = this;
		if (self.c2.selectedIndex != 0) return;
		if (self.curWuJItem) self.curWuJItem.update();
		self.upCheck();
	}

	private upCheck(): void {
		let r = GGlobal.reddot;
		let self = this;
		self.tab0.checkNotice = r.checkCondition(UIConst.WU_JIANG, 0) || r.checkCondition(UIConst.WU_JIANG, 4) || ViewMainBottomUI.checkShenjiangzhiliNotic();
		self.tab1.checkNotice = r.checkCondition(UIConst.WU_JIANG, 1);
		self.tab2.checkNotice = r.checkCondition(UIConst.WU_JIANG, 2);
		self.tab3.checkNotice = r.checkCondition(UIConst.WU_JIANG, 3);
		self.tab00.checkNotice = r.checkCondition(UIConst.ZS_GODWEAPON, 0);
		self.tab01.checkNotice = r.checkCondition(UIConst.ZS_GODWEAPON, 1);
		self.tab02.checkNotice = r.checkCondition(UIConst.ZS_GODWEAPON, 2);
		self.wuJiangBt.checkNotice = r.checkCondition(UIConst.WU_JIANG, 0) || r.checkCondition(UIConst.WU_JIANG, 4) || ViewMainBottomUI.checkShenjiangzhiliNotic() ||
			r.checkCondition(UIConst.WU_JIANG, 1) || r.checkCondition(UIConst.WU_JIANG, 2) || r.checkCondition(UIConst.WU_JIANG, 3);
		self.godWeaponBt.checkNotice = r.checkCondition(UIConst.ZS_GODWEAPON, 0) || r.checkCondition(UIConst.ZS_GODWEAPON, 1) || r.checkCondition(UIConst.ZS_GODWEAPON, 2);
		self.godWuJiangBt.checkNotice = r.checkCondition(UIConst.GOD_WUJIANG, 0) || r.checkCondition(UIConst.GOD_WUJIANG, 1) || r.checkCondition(UIConst.GOD_WUJIANG, 2)||r.checkCondition(UIConst.JUEXING, 7);
	}

	public guideCheckTab(arg) {
		return this.c1.selectedIndex == arg;
	}

	public guideTab(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.tab1, self.tab1.width / 2, self.tab1.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.tab1, self.tab1.width / 2, 0, -90, -106, -100);
	}

	public guidePage(step) {
		if (this.wuJItemArr[1]) this.wuJItemArr[1].guidePage(step);
	}

	public guideClosePanel(step) {
		let btn = this.closeButton.asButton;
		GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
		GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
	}

	public check_wujiang_select() {
		if (this.c1.selectedIndex == 0 && this.wuJItemArr[0]) {
			return this.wuJItemArr[0].check_wujiang_select();
		} else {
			return false;
		}
	}

	public check_wujiang_upstar() {
		if (this.c1.selectedIndex == 0 && this.wuJItemArr[0]) {
			return this.wuJItemArr[0].check_wujiang_upstar();
		} else {
			return false;
		}
	}

	public guide_wujiang_select(step) {
		if (this.wuJItemArr[0]) this.wuJItemArr[0].guide_wujiang_select(step);
	}

	public guide_wujiang_upstar(step) {
		if (this.wuJItemArr[0]) this.wuJItemArr[0].guide_wujiang_upstar(step);
	}

	public guide_wujiang_change(step) {
		if (this.wuJItemArr[0]) this.wuJItemArr[0].guide_wujiang_change(step);
	}

	/**
	 * 检查神兵折扣图标显示
	 */
	private checkSBDiscount() {
		if (GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK)) {
			this.sbDiscountImg.visible = true;
			this.sbDiscountImg1.visible = true;
		} else {
			this.sbDiscountImg.visible = false;
			this.sbDiscountImg1.visible = false;
		}
	}
}