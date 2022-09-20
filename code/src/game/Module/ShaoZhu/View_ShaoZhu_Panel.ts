class View_ShaoZhu_Panel extends UIPanelBase {

	public c1: fairygui.Controller;
	public c2: fairygui.Controller;
	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public starItem: Child_ShaoZhu_UpStar;
	public qinMiItem: Child_ShaoZhu_QinMi;
	public skillItem: Child_ShaoZhu_Skill;
	public qiYuanItem: Child_ShaoZhu_QiYuan;
	public liuYiItem: Child_LiuYi;
	private tabArr: TabButton[] = [];
	private btn0: Button2;
	private btn1: Button2;

	public static URL: string = "ui://p83wyb2bh7p80";

	public static createInstance(): View_ShaoZhu_Panel {
		return <View_ShaoZhu_Panel><any>(fairygui.UIPackage.createObject("ShaoZhu", "View_ShaoZhu_Panel"));
	}

	public constructor() {
		super();
		this.setSkin("ShaoZhu", "ShaoZhu_atlas0", "View_ShaoZhu_Panel");
	}

	protected setExtends() {
		View_ShaoZhu_Panel.setExtends();
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension
		f(Child_ShaoZhu_UpStar.URL, Child_ShaoZhu_UpStar);
		f(Child_ShaoZhu_QinMi.URL, Child_ShaoZhu_QinMi);
		f(Child_ShaoZhu_Skill.URL, Child_ShaoZhu_Skill);
		f(ShaoZhuGrid.URL, ShaoZhuGrid);
		f(ShaoZhuSkillGrid.URL, ShaoZhuSkillGrid);
		f(ItemShaoZhuFashion.URL, ItemShaoZhuFashion);
		f(Child_ShaoZhu_QiYuan.URL, Child_ShaoZhu_QiYuan);
		f(VSZQiYuanPoint.URL, VSZQiYuanPoint);
		f(ShaoZhuSkillItem.URL, ShaoZhuSkillItem);
		//少主六艺
		f(Child_LiuYi.URL, Child_LiuYi);
		f(BtnLiuYi.URL, BtnLiuYi);
		f(BtnXueTang.URL, BtnXueTang);
		f(ItemLiuYiKaoShi.URL, ItemLiuYiKaoShi);
		//少主潜能
		f(BtnQianNeng.URL, BtnQianNeng);
	}

	protected initView() {
		let self = this;
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self["tab0"].data = 0;
		self["tab1"].data = 1;
		self["tab2"].data = 2;
		self["tab3"].data = 3;
		self.starItem.type = 0;
		self.qinMiItem.type = 1;
		self.skillItem.type = 2;
		self.qiYuanItem.type = 3;
		self.liuYiItem.type = 4;
		self.tabArr = [self["tab0"], self["tab1"], self["tab2"], self["tab3"]];
		GGlobal.modelShaoZhu.CG_GET_STAR_STATE();
		if (!Model_ShaoZhu.hasData) {
			GGlobal.modelShaoZhu.CG_OPEN_SHAOZHU_5101();
		}
		if (!Model_QianNeng.hasData) {//红点数据
			GGlobal.model_QianNeng.CG_OPENUI_5133();
		}
	}

	private curTab: TabButton;
	private tabHandler(evt: egret.TouchEvent) {
		let self = this;
		let tab = evt.target as TabButton;
		let panelIdArr = [UIConst.SHAOZHU, UIConst.SHAOZHU_QINMI, UIConst.SHAOZHU_SKILL, UIConst.SHAOZHU_QIYUAN];
		if (!ModuleManager.isOpen(panelIdArr[tab.data], true)) return;
		if (self.curTab && self.curTab.data == tab.data) return;
		if (self.curTab) self.curTab.selected = false;
		tab.selected = true;
		self.curTab = tab;
		self.c1.selectedIndex = self.curTab.data;
	}

	private curItem: ShaoZhuGrid;
	private listHandler(evt: fairygui.ItemEvent) {
		let self = this;
		let item = evt.itemObject as ShaoZhuGrid;
		if (self.curItem && self.curItem.hashCode == item.hashCode) return;
		if (self.curItem) self.curItem.choose(false);
		item.choose(true);
		self.curItem = item;

		if (self.c2.selectedIndex == 0) {
			self.curChild.close();
			self.updateChild();
		} else {
			self.liuYiItem.upVo(self.curItem.vo)
			// self.selectTab();
		}
	}

	private renderHandler(index: number, obj: ShaoZhuGrid) {
		let self = this;
		let model = GGlobal.modelShaoZhu;
		let red = GGlobal.reddot;
		obj.data = index;
		obj.setVo(model.shaoZhuArr[index]);

		switch (self.c2.selectedIndex) {
			case 0:
				switch (self.c1.selectedIndex) {
					case 0:
						obj.noticeImg.visible = model.checkOneStarNotice(model.shaoZhuArr[index])
							|| GGlobal.reddot.checkCondition(UIConst.SHAOZHU, 123 + index + 1)
							|| GGlobal.reddot.checkCondition(UIConst.SHAOZHU_QIANNENG, index + 1);
						break;
					case 1:
						obj.noticeImg.visible = model.checkOneQinMiNotice(model.shaoZhuArr[index])
						break;
					case 2:
						obj.noticeImg.visible = model.checkOneSkillNotice(model.shaoZhuArr[index])
						break;
				}
				break;
			case 1:
				obj.noticeImg.visible = red.checkCondition(UIConst.SHAOZHU_LIUYI, index + 1)
		}

		if (Model_GlobalMsg.selectID > 0 && Model_GlobalMsg.selectID == model.shaoZhuArr[index].shaozhuID) {
			if (self.curItem) self.curItem.choose(false);
			obj.choose(true);
			self.curItem = obj;
			Model_GlobalMsg.selectID = 0;
		} else if (!self.curItem && ((index == 0 && Model_player.voMine.shaozhuID <= 0) || model.shaoZhuArr[index].shaozhuID == Model_player.voMine.shaozhuID)) {
			obj.choose(true);
			self.curItem = obj;
		}
	}

	private curChild: ChildShaoZhu;

	private selectTab() {
		let self = this;
		if (self.c2.selectedIndex < 0)
			return;

		if (self.c2.selectedIndex == 1) {
			if (!ModuleManager.isOpen(UIConst.SHAOZHU_LIUYI, true)) {
				self.c2.selectedIndex = 0;
				return;
			}
		}
		if (self.curChild) self.curChild.close();
		if (self.c2.selectedIndex == 1) {
			self.curChild = self.liuYiItem;
			self.curChild.open(self.curItem.vo)
		} else {
			self.updateChild()
		}
		self.list.numItems = GGlobal.modelShaoZhu.shaoZhuArr.length;
	}

	private updateChild() {
		let self = this;
		if (self.c2.selectedIndex == 1) {
			if (self.curChild && 4 != self.curChild.type) {
				self.curChild.close();
				self.curChild.open(self.curItem.vo)
			}
			return;
		}
		if (self.curChild && self.c1.selectedIndex != self.curChild.type) self.curChild.close();
		switch (self.c1.selectedIndex) {
			case 0:
				self.curChild = self.starItem;
				break;
			case 1:
				self.curChild = self.qinMiItem;
				break;
			case 2:
				self.curChild = self.skillItem;
				break;
			case 3:
				self.curChild = self.qiYuanItem;
				break;
		}
		self.curChild.open(self.curItem.vo)
	}

	private updateShow() {
		let self = this;
		if (GGlobal.modelShaoZhu.shaoZhuArr.length <= 0) {
			GGlobal.modelShaoZhu.initShaoZhu();
		}
		let redAll = false
		for (let i = 0; i < self.tabArr.length; i++) {
			if (i == 3) {
				self.tabArr[i].checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_QIYUAN, 0);
			} else {
				self.tabArr[i].checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU, i);;
				if (i == 0 && !self.tabArr[i].checkNotice) {
					self.tabArr[i].checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU, 123 + 1) ||
						GGlobal.reddot.checkCondition(UIConst.SHAOZHU, 123 + 2) ||
						GGlobal.reddot.checkCondition(UIConst.SHAOZHU, 123 + 3);//领取奖励的红点
				}

			}
			if (self.tabArr[i].checkNotice) {
				redAll = true;
			}
		}
		self.btn0.checkNotice = redAll
		self.btn1.checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_LIUYI, 0)
		self.list.numItems = GGlobal.modelShaoZhu.shaoZhuArr.length;
		self.updateChild();
	}

	protected onShown(): void {
		let self = this;
		if (self._args) {
			if (self._args >= 4) {
				self.c1.selectedIndex = 0;
				self.c2.selectedIndex = 1;
			} else {
				self.c1.selectedIndex = self._args;
			}
		} else {
			self.c1.selectedIndex = 0;
			self.c2.selectedIndex = 0;
		}
		if (self.curTab) self.curTab.selected = false;
		self.tabArr[self.c1.selectedIndex].selected = true;
		self.curTab = self.tabArr[self.c1.selectedIndex];
		self.addListen();
		self.updateShow();
	}

	private addListen() {
		let self = this;
		self.list.addEventListener(fairygui.ItemEvent.CLICK, self.listHandler, self);
		self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
		self.c2.addEventListener(fairygui.StateChangeEvent.CHANGED, self.selectTab, self);
		for (let i = 0; i < self.tabArr.length; i++) {
			self.tabArr[i].addClickListener(self.tabHandler, self);
		}
		GGlobal.reddot.listen(UIConst.SHAOZHU, self.updateShow, self);
		GGlobal.reddot.listen(UIConst.SHAOZHU_LIUYI, self.updateShow, self);
		GGlobal.reddot.listen(UIConst.SHAOZHU_QIANNENG, self.updateShow, self);
	}

	private removeListen() {
		let self = this;
		self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.listHandler, self);
		self.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
		self.c2.removeEventListener(fairygui.StateChangeEvent.CHANGED, self.selectTab, self);
		for (let i = 0; i < self.tabArr.length; i++) {
			self.tabArr[i].removeClickListener(self.tabHandler, self);
		}
		GGlobal.reddot.remove(UIConst.SHAOZHU, self.updateShow, self);
		GGlobal.reddot.remove(UIConst.SHAOZHU_LIUYI, self.updateShow, self);
		GGlobal.reddot.remove(UIConst.SHAOZHU_QIANNENG, self.updateShow, self);
	}

	protected onHide(): void {
		let self = this;
		if (self.curChild) self.curChild.close();
		self.curChild = null;
		if (self.curItem) self.curItem.choose(false);
		self.curItem = null;
		self.removeListen();
		GGlobal.layerMgr.close(UIConst.SHAOZHU);
		self.list.numItems = 0;
	}
}
interface ChildShaoZhu {
	type: number;
	open(vo: Vo_ShaoZhu);
	close();
}