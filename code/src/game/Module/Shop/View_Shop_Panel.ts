class View_Shop_Panel extends UIPanelBase {
	public list: fairygui.GList;
	public bg1: fairygui.GImage;
	public bg0: fairygui.GImage;
	public money1: fairygui.GLoader;
	public money0: fairygui.GLoader;
	public money2: fairygui.GLoader;
	public headIcon: fairygui.GLoader;
	public refreshBt: fairygui.GButton;
	public moneyLb2: fairygui.GRichTextField;
	public refreshGroup: fairygui.GGroup;
	public moneyLb1: fairygui.GRichTextField;
	public moneyLb0: fairygui.GRichTextField;
	public linkLb: fairygui.GRichTextField;
	public tabList: fairygui.GList;

	public static URL: string = "ui://1f2dgazvspa9c";
	public constructor() {
		super();
		this.setSkin("Shop", "Shop_atlas0", "View_Shop_Panel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(ShopItem.URL, ShopItem);
	}

	protected initView(): void {
		super.initView();
		let a = this;
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandle;
		a.list.foldInvisibleItems = true;
		a.list.setVirtual();
		for (let key in Config.stroe_218) {
			a.tabArr.push(Config.stroe_218[key]);
		}
		a.tabArr.sort(function (aa, bb): number {
			return aa.px - bb.px;
		})
		a.tabList.callbackThisObj = a;
		a.tabList.itemRenderer = a.tabRenderHandler;
		a.tabList.foldInvisibleItems = true;
		a.tabList.numItems = a.tabArr.length;
		a.tabList.addEventListener(fairygui.ItemEvent.CLICK, a.tabListHandler, a);
		a.refreshBt.addClickListener(a.refreshHandle, a);
		a.linkLb.addClickListener(a.linkHandler, a);
	}

	private curTab: TabButton3;
	private tabListHandler(event: fairygui.ItemEvent): void {
		let self = this;
		let tab = event.itemObject as TabButton3;
		if (self.curTab && self.curTab.data == tab.data) return;
		if (self.curTab) self.curTab.selected = false;
		self.curTab = tab;
		self.changeHandler();
	}

	private tabArr: Istroe_218[] = [];
	private tabRenderHandler(index: number, tab: TabButton3) {
		let self = this;
		let cfg = self.tabArr[index];
		tab.visible = cfg.xs == 1 && ModuleManager.isOpen(cfg.tj);
		tab.data = cfg.px;
		if (tab.visible) {
			tab.setIcon(Enum_Path.SHOP_URL + "tab" + cfg.pic + ".png");
		}
	}

	private linkHandler(event: egret.TouchEvent) {
		event.stopImmediatePropagation();
		let self = this;
		let cfg = self.tabArr[self.curTab.data - 1];
		if (cfg.open == UIConst.COUNTRY) {
			if (Model_player.voMine.country > 0) {
				GGlobal.layerMgr.open(UIConst.COUNTRY);
			} else {
				ViewCommonWarn.text("加入国家后才可获得声望");
			}
		} else if (cfg.open == UIConst.CROSS_SHILIAN) {
			let ms = Model_GlobalMsg.getServerTime();
			let nowDate = new Date(ms);
			let h = nowDate.getHours();
			let nowMin = nowDate.getMinutes();
			let nowSec = nowDate.getSeconds();
			if (h <= 0 && nowMin * 60 + nowSec <= 300) {
				ViewCommonWarn.text("跨服试炼重置中");
				return;
			}
			GGlobal.layerMgr.open(cfg.open);
		} else {
			GGlobal.layerMgr.open(cfg.open);
		}
	}

	private changeHandler(): void {
		this.updateShow();
		this.list.scrollToView(0, false, true);
	}

	private refreshHandle(): void {
		let self = this;
		let cfg = self.tabArr[self.curTab.data - 1];
		let costArr: Array<any> = JSON.parse(cfg.consume);
		if (costArr[0][0] == Enum_Attr.TONGBI && Model_player.voMine.tongbi >= costArr[0][2]) {
			GGlobal.modelshop.CG_SHOP_REFRESH(cfg.store);
		} else {
			ViewCommonWarn.text("铜币不足!");
		}
	}

	public renderHandle(index: number, obj: fairygui.GObject): void {
		let item: ShopItem = obj as ShopItem;
		let vo = this.shopArr[index];
		item.setVo(vo);
	}

	private shopArr = [];
	public updateShow(): void {
		let self = this;
		if (!self.curTab) {
			self.curTab = self.tabList._children[0] as TabButton3;
			self.curTab.selected = true;
		}
		let cfg = self.tabArr[self.curTab.data - 1];
		self.shopArr = [];
		let arr: Array<Vo_Shop> = Model_Shop.shopArr[cfg.id - 1];
		if (!arr) arr = [];
		IconUtil.setImg(self.headIcon, Enum_Path.SHOP_URL + cfg.pic + ".jpg");
		if (cfg.id == 3 && Model_player.voMine.viplv < 10) {
			for (let i = 0; i < arr.length; i++) {
				let vo = arr[i];
				if (vo.condition.length <= 0 || (vo.condition.length > 0 && vo.condition[0][1] <= 15)) {
					self.shopArr.push(vo);
				}
			}
		} else {
			self.shopArr = arr;
		}
		if (cfg.id == 5) {
			GGlobal.reddot.setCondition(UIConst.SHOP, 0, false);
		}
		self.list.numItems = self.shopArr.length;
		let voMine = Model_player.voMine;
		if (cfg.consume != "0") {
			self.refreshGroup.visible = true;
			let costArr: Array<any> = JSON.parse(cfg.consume);
			self.moneyLb2.text = costArr[0][2] + "";
		} else {
			self.refreshGroup.visible = false;
		}
		self.bg0.visible = self.bg1.visible = self.money0.visible = self.money1.visible = self.moneyLb0.visible = self.moneyLb1.visible = false;
		let moneyArr = JSON.parse(cfg.hb);
		for (let i = 0; i < moneyArr.length; i++) {
			if (moneyArr[i][0] == Enum_Attr.ITEM) {
				let itemVo = VoItem.create(moneyArr[i][1]);
				self["bg" + i].visible = self["moneyLb" + i].visible = self["money" + i].visible = true;
				IconUtil.setImg(self["money" + i] as fairygui.GLoader, Enum_Path.ICON70_URL + itemVo.icon + ".png");
				self["moneyLb" + i].text = ConfigHelp.numToStr(Model_Bag.getItemCount(moneyArr[i][1]));
			} else {
				let moneyVo = Vo_Currency.create(moneyArr[i][0]);
				IconUtil.setImg(self["money" + i] as fairygui.GLoader, Enum_Path.ICON70_URL + moneyVo.icon + ".png");
				let moneyNum = 0;
				switch (moneyArr[i][0]) {
					case Enum_Attr.yuanBao:
						moneyNum = voMine.yuanbao;
						break;
					case Enum_Attr.TONGBI:
						moneyNum = voMine.tongbi;
						break;
					case Enum_Attr.PRESTIGE:
						moneyNum = voMine.prestige;
						break;
					case Enum_Attr.BOSSJF:
						moneyNum = voMine.bossZCScore;
						break;
				}
				self["moneyLb" + i].text = ConfigHelp.numToStr(moneyNum);
				self["bg" + i].visible = self["moneyLb" + i].visible = self["money" + i].visible = true;
			}
		}
		if (cfg.open > 0) {
			self.linkLb.visible = true;
			self.linkLb.text = HtmlUtil.createLink(cfg.way, true, cfg.open + "");
		} else {
			self.linkLb.visible = false;
		}
		self.checkTab();
	}

	public checkTab() {
		let self = this;
		for (let i = 0; i < self.tabList._children.length; i++) {
			if (self.tabList._children[i].data == Config.stroe_218[5].px) {
				(self.tabList._children[i] as TabButton).checkNotice = GGlobal.reddot.checkCondition(UIConst.SHOP, 0);
				break;
			}
		}
	}

	protected onShown(): void {
		let self = this;
		if (Model_Shop.shopArr.length <= 0) {
			GGlobal.modelshop.CG_OPEN_SHOP(0);
		}

		self.curTab = self.tabList._children[0] as TabButton3;
		if (self._args) {
			for (let i = 0; i < self.tabArr.length; i++) {
				let cfg = self.tabArr[i];
				if (cfg.xs == 1 && ModuleManager.isOpen(cfg.tj) && cfg.px == self._args) {
					self.curTab = self.tabList._children[i] as TabButton3;
					self.tabList.scrollToView(i, false, true);
					break;
				}
			}
		}
		self.curTab.selected = true;
		self.updateShow();
		GGlobal.reddot.listen(ReddotEvent.CHECK_SHOP, self.updateShow, self);
	}

	protected onHide(): void {
		let self = this;
		GGlobal.layerMgr.close(UIConst.SHOP);
		GGlobal.reddot.remove(ReddotEvent.CHECK_SHOP, self.updateShow, self);
		IconUtil.setImg(self.headIcon, null);
		self.list.numItems = 0;
		if (self.curTab) self.curTab.selected = false;
		self.curTab = null;
	}
}