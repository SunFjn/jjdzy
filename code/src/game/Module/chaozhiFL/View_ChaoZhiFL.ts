class ViewChaoZhiFL extends UIPanelBase {
	public frame: frame4;
	public lst: fairygui.GList;
	public n14: Button2; n15: Button2;
	public constructor() {
		super();
		this.setSkin("chaozhifanli", "chaozhifanli_atlas0", "ViewChaoZhiFL");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(CailLiaoIt.URL, CailLiaoIt);
		f(ChildCaiLiaoFL.URL, ChildCaiLiaoFL);
		f(ChildYuanBaoFL.URL, ChildYuanBaoFL);
		f(Child_ChaoZhiZP.URL, Child_ChaoZhiZP);
		f(ComActivityTab.URL, ComActivityTab);
		f(Child_DisShop.URL, Child_DisShop);
		f(DisShopItem.URL, DisShopItem);
		f(Child_ShengJieShop.URL, Child_ShengJieShop);
		f(ShengJieItem.URL, ShengJieItem);
		f(ChildWarToDead.URL, ChildWarToDead);
		f(ItemWarToDead.URL, ItemWarToDead);
		f(ChildGroupBuy.URL, ChildGroupBuy);
		f(VGroupBuyItem.URL, VGroupBuyItem);
		f(ChildLXXF.URL, ChildLXXF);
		f(ItemLXXF.URL, ItemLXXF);
		f(ChildLXX814.URL, ChildLXX814);
		f(ItemLXX814.URL, ItemLXX814);
	}
	private datas: Vo_Activity[];
	private selView: ICZFLView;
	private selTab: ComActivityTab;
	private selData: Vo_Activity;
	protected initView(): void {
		super.initView();
		super.resetPosition();
		const self = this;
		self.frame.icon = "ui://qzsojhcrn2xug";
		self.lst.itemRenderer = self.onItemRender;
		self.lst.callbackThisObj = self;
		self.lst.addEventListener(fairygui.ItemEvent.CLICK, self.onSel, self);
		self.n14.displayObject.touchEnabled = self.n15.displayObject.touchEnabled = true;
		self.n15.scalRed();
		CommonManager.listPageChange("View_ChaoZhiFL", self.lst, self.n14, self.n15, 4, Handler.create(this, this.setPageNotice));
	}

	private scrollComp(): void {
		let curpage: number = this.lst.getFirstChildInView();
		this.setPageNotice(curpage);
	}

	private setPageNotice(_curpage): void {
		const sf = this;
		sf.n15.checkNotice = false;
		sf.n14.checkNotice = false;
		for (let i = 0; i < this.datas.length; i++) {
			let id = this.datas[i].id
			let red = GGlobal.reddot.checkCondition(id, 0);
			if (red && i > _curpage + 3) {
				sf.n15.checkNotice = true;
			}
			if (red && i < _curpage) {
				sf.n14.checkNotice = true;
			}
		}
	}

	private onItemRender(index: number, renderer: ComActivityTab) {
		const self = this;
		const data = self.datas[index];
		renderer.data = data;
		let icon = Config.xitong_001[data.id].icon;
		if (data.id == UIConst.DISCOUNT_SHOP || data.id == UIConst.DISCOUNT_SHOP1) {
			icon = "4605_1";
		}
		renderer.setActivityIcon(icon);
		renderer.checkNotice = GGlobal.reddot.checkCondition(data.id);
	}
	private displayList() {
		const self = this;
		let temp = GGlobal.modelActivity.getGroup(UIConst.CHAOZHIFL);//GGlobal.modelCZFL.iconArr;
		let arr1 = ModelEightLock.getActivity(UIConst.CHAOZHIFL);
		temp = temp ? temp.concat(arr1) : arr1;

		self.datas = temp.filter(function (vale, index, source) {
			if (vale.id == UIConst.DISCOUNT_SHOP && ModelEightLock.originalDatas[UIConst.DISCOUNT_SHOP1]) {
				return false;
			}
			return ModuleManager.isOpen(vale.id);
		});
		self.lst.numItems = self.datas.length;
		let curpage: number = self.lst.getFirstChildInView();
		self.setPageNotice(curpage);
	}
	private onSel(evt: fairygui.ItemEvent) {
		const self = this;
		const selRenderer = evt.itemObject as ComActivityTab;
		const data = selRenderer.data;
		self.setSel(data);
	}
	private setSel(data: Vo_Activity) {
		const self = this;
		if (self.selData && self.selData.id == data.id) {
			return;
		}
		self.unSel();
		const renderer = this.getRenderer(self.selData = data);
		if (!renderer) {
			return;
		}
		(self.selTab = renderer).selected = true;
		const index = self.datas.indexOf(data);
		if (index >= 0) {
			self.lst.selectedIndex = index;
			self.lst.scrollToView(index);
		} else {
			self.lst.selectedIndex = 0;
		}
		self.showDetail();
	}
	private unSel() {
		const self = this;
		if (self.selTab) {
			self.selTab.selected = false;
			self.selTab = null;
			self.selData = null;
		}
		if (self.selView) {
			self.selView.close();
			self.removeChild(<any>self.selView);
			self.selView = null;
		}
	}
	private getRenderer(data: Vo_Activity) {
		const lst = this.lst;
		for (let i = 0, len = lst.numItems; i < len; i++) {
			const renderer = lst._children[i] as ComActivityTab;
			if (renderer && renderer.data == data) {
				return renderer;
			}
		}
		return null;
	}
	private showDetail() {
		let fac = fairygui.UIObjectFactory;
		const self = this;
		const selTab = self.selTab;
		switch (selTab.data.id) {
			case UIConst.CAILIAOFANLI:
			case UIConst.CAILIAOFL_KF:
				self.selView = ChildCaiLiaoFL.createInstance();
				break;
			case UIConst.YUANBAOFANLI:
			case UIConst.YUANBAOFL_KF:
			case UIConst.YUANBAOFANLI1:
				self.selView = ChildYuanBaoFL.createInstance();
				break;
			case UIConst.CHAOZHI_ZHUANPAN:
				self.selView = Child_ChaoZhiZP.createInstance(); self.selView.x = 0; self.selView.y = 280;
				break;
			case UIConst.DISCOUNT_SHOP:
			case UIConst.DISCOUNT_SHOP1:
				self.selView = Child_DisShop.createInstance(); self.selView.x = 0; self.selView.y = 280;
				break;
			case UIConst.WARTODEAD_7IN:
			case UIConst.WARTODEAD_7OUT:
			case UIConst.WARTODEAD1:
				self.selView = ChildWarToDead.getInst();
				self.selView.x = 0;
				self.selView.y = 260;
				break;
			case UIConst.LXXF1:
			case UIConst.LXXF2:
				self.selView = ChildLXXF.getInst();
				self.selView.x = 0;
				self.selView.y = 283;
				break;
			case UIConst.GROUP_BUY:
				fac.setPackageItemExtension(ChildGroupBuy.URL, ChildGroupBuy);
				fac.setPackageItemExtension(VGroupBuyItem.URL, VGroupBuyItem);
				self.selView = ChildGroupBuy.getInst();
				break;
			case UIConst.GROUP_B814:
				fac.setPackageItemExtension(ChildGroupB814.URL, ChildGroupB814);
				fac.setPackageItemExtension(VGroupBuyI814.URL, VGroupBuyI814);
				self.selView = ChildGroupB814.getInst();
				break;
			case UIConst.SHENGJIE_SHOP:
				self.selView = Child_ShengJieShop.createInstance(); self.selView.x = 0; self.selView.y = 280;
				break;
			case UIConst.LXXF3:
				self.selView = ChildLXX814.getInst();
				self.selView.x = 0;
				self.selView.y = 283;
				break;
		}
		if (self.selView) {
			self.addChild(<any>self.selView);
			self.selView.open();
		}
	}
	private addListens() {
		const self = this;
		let r = GGlobal.reddot;
		self.lst.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
		GGlobal.control.listen(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.displayList, self);
		GGlobal.control.listen(Enum_MsgType.KAIFUDAY_UPDATE, self.displayList, self);
		GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, self.displayList, self);
		// GGlobal.modelLXXF.listen(ModelLXXF.msg_datas, self.lxxf, self);
		r.listen(UIConst.CHAOZHIFL, self.displayList, self);
	}
	private removeListens() {
		const self = this;
		let r = GGlobal.reddot;
		self.lst.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
		GGlobal.control.remove(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.displayList, self);
		GGlobal.control.remove(Enum_MsgType.KAIFUDAY_UPDATE, self.displayList, self);
		GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, self.displayList, self);
		// GGlobal.modelLXXF.remove(ModelLXXF.msg_datas, self.lxxf, self);
		r.remove(UIConst.CHAOZHIFL, self.displayList, self);
	}
	protected onShown() {
		super.onShown();
		const self = this;
		self.displayList();
		self.addListens();
		// self.applyLxxf();
		if (self._args) {
			var data = self.getDataByArg(self._args);
			self.setSel(data || self.datas[0]);
		} else {
			self.setSel(self.datas[0]);
		}
	}
	private getDataByArg(args: number) {
		const {datas} = this;
		for (let i = 0, len = datas.length; i < datas.length; i++) {
			const data = datas[i];
			if (data.id == args) {
				return data;
			}
		}
		return null;
	}
	protected onHide() {
		super.onHide();
		const self = this;
		self.removeListens();
		self.unSel();
		self.lst.scrollToView(0);
		self.lst.numItems = 0;
		GGlobal.layerMgr.close(UIConst.CHAOZHIFL);
	}
}
interface ICZFLView {
	open();
	close();
	x; y;
}