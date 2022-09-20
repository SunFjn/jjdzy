/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewShaoZhuAct extends UIPanelBase {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public btnLeft: Button2;
	public btnRight: Button2;
	public n9: ChildShaoZhuTarget;

	public static URL: string = "ui://w5ll6n5j6hpm0";

	public static createInstance(): ViewShaoZhuAct {
		return <ViewShaoZhuAct><any>(fairygui.UIPackage.createObject("shaozhuAct", "ViewShaoZhuAct"));
	}

	public constructor() {
		super();
		this.setSkin("shaozhuAct", "shaozhuAct_atlas0", "ViewShaoZhuAct");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ChildShaoZhuTarget.URL, ChildShaoZhuTarget);
		f(ItemShaoZhuTarget.URL, ItemShaoZhuTarget);
		f(ChildShaoZhuDanBi.URL, ChildShaoZhuDanBi);
		f(ChildShaoZhuLJCZ.URL, ChildShaoZhuLJCZ);
		f(ChildShaoZhuPig.URL, ChildShaoZhuPig);
		f(ItemPig.URL, ItemPig);
		f(HongBaoLabel.URL, HongBaoLabel);
		f(ChildShaoZhuHongBao.URL, ChildShaoZhuHongBao);
		f(HongBaoLabel.URL, HongBaoLabel);
		f(DBLabel.URL, DBLabel);
		f(ItemSaoZhuDB.URL, ItemSaoZhuDB);
		f(ShaoZhuTab2.URL, ShaoZhuTab2);
		f(ChildShaoZhuQYRank.URL, ChildShaoZhuQYRank);
		f(ItemShaoZhuQyRank1.URL, ItemShaoZhuQyRank1);
		f(ItemShaoZhuQyRank2.URL, ItemShaoZhuQyRank2);
		f(QiYuanListGrid.URL, QiYuanListGrid);
	}
	protected childrenCreated(): void {
		let a = this;
		a.idView = {};
		if (ModelEightLock.originalDatas[UIConst.SHAOZHU_QY_RANK]) {
			a.iconArr = [UIConst.SHAOZHU_QY_RANK, UIConst.SHAOZHU_HONGBAO, UIConst.SHAOZHU_PIG, UIConst.SHAOZHU_SINGLE, UIConst.SHAOZHU_RECHARGE, UIConst.SHAOZHU_TARGET];
		} else {
			a.iconArr = [UIConst.SHAOZHU_HONGBAO, UIConst.SHAOZHU_PIG, UIConst.SHAOZHU_SINGLE, UIConst.SHAOZHU_RECHARGE, UIConst.SHAOZHU_TARGET];
		}
		a.idView[UIConst.SHAOZHU_TARGET] = ChildShaoZhuTarget
		a.idView[UIConst.SHAOZHU_RECHARGE] = ChildShaoZhuLJCZ
		a.idView[UIConst.SHAOZHU_SINGLE] = ChildShaoZhuDanBi
		a.idView[UIConst.SHAOZHU_PIG] = ChildShaoZhuPig
		a.idView[UIConst.SHAOZHU_HONGBAO] = ChildShaoZhuHongBao
		a.idView[UIConst.SHAOZHU_QY_RANK] = ChildShaoZhuQYRank
		super.childrenCreated();
	}
	protected initView() {
		let a = this;
		a.list.callbackThisObj = this;
		a.list.itemRenderer = this.renderHandle;
	}

	private idView: any = {};
	private actArr: Vo_Activity[];
	private curTab: number;
	private tabView;
	private iconArr;
	private renderHandle(index: number, obj: fairygui.GObject): void {
		let a = this;
		let tab: fairygui.GButton = obj as fairygui.GButton;
		let id = a.iconArr[index];
		ImageLoader.instance.loader(Enum_Path.MAINUI_URL + id + ".png", tab.getChild("icon") as fairygui.GLoader);
		tab.data = id;
	}

	private listHandle(evt: fairygui.ItemEvent) {
		let a = this;
		let tab = evt.itemObject as fairygui.GButton;
		a.updateChildShow(tab.data);
	}

	private updateChildShow(id: number) {
		let a = this;
		a.curTab = id;
		if (a.tabView) {
			a.tabView.disposePanel();
			a.removeChild(a.tabView);
		}
		a.tabView = a.idView[id].instance;
		a.tabView.show();
		a.tabView.setXY(0, 258);
		a.addChild(a.tabView);
	}

	private setNotice(): void {
		let self = this;
		self.btnRight.checkNotice = false;
		self.btnLeft.checkNotice = false;
		let mainIconNotice = false;
		let r = GGlobal.reddot
		for (let i = 0; i < self.iconArr.length; i++) {
			let btn: fairygui.GComponent = self.list.getChildAt(i) as fairygui.GComponent
			let id = btn.data;
			let red = r.checkCondition(id, 0);
			if (id == UIConst.SHAOZHU_TARGET) {
				red = r.checkCondition(id, 0) || r.checkCondition(id, 1) || r.checkCondition(id, 2) || r.checkCondition(id, 3) || r.checkCondition(id, 4);
			}
			if (btn) btn.getChild("noticeImg").visible = red;
			if (red && i > this._curpage + 3) {
				this.btnRight.checkNotice = true;
			}
			if (red && i < this._curpage) {
				this.btnLeft.checkNotice = true;
			}
			if (red) {
				mainIconNotice = true;
			}
		}

		GGlobal.reddot.setCondition(UIConst.SHAOZHU_ACT, 0, mainIconNotice);
		GGlobal.mainUICtr.setIconNotice(UIConst.SHAOZHU_ACT, mainIconNotice);
	}
	private _curpage: number = 0;
	private pageHandler(event: egret.TouchEvent): void {
		let self = this;
		let btn: fairygui.GButton = event.target as fairygui.GButton;
		let curpage: number = self.list.getFirstChildInView();
		switch (btn.id) {
			case self.btnLeft.id:
				if (curpage > 0) {
					curpage = curpage - 3;
					if (curpage < 0) curpage = 0;
				}
				break;
			case self.btnRight.id:
				if (curpage < self.list.numItems - 1) {
					curpage = curpage + 3;
					if (curpage >= self.list.numItems - 1) curpage = self.list.numItems - 1;
				}
				break;
		}
		if (self.list.numItems > 0)
			self.list.scrollToView(curpage, false, true);
		self._curpage = curpage;
		self.setNotice();
	}

	public updateShow(): void {
		let a = this;
		if (ModelEightLock.originalDatas[UIConst.SHAOZHU_QY_RANK]) {
			a.iconArr = [UIConst.SHAOZHU_QY_RANK, UIConst.SHAOZHU_HONGBAO, UIConst.SHAOZHU_PIG, UIConst.SHAOZHU_SINGLE, UIConst.SHAOZHU_RECHARGE, UIConst.SHAOZHU_TARGET];
		} else {
			a.iconArr = [UIConst.SHAOZHU_HONGBAO, UIConst.SHAOZHU_PIG, UIConst.SHAOZHU_SINGLE, UIConst.SHAOZHU_RECHARGE, UIConst.SHAOZHU_TARGET];
		}
		a.list.numItems = a.iconArr.length;
		if (a.iconArr.length > 0) {
			let scto = 0
			if (a._args && Number(a._args) > 0) {
				scto = a._args;
			}
			a.list.scrollToView(scto)
			a.list.selectedIndex = scto
			a.updateChildShow(a.iconArr[scto]);
		}
	}

	private onTick() {
		if (this.tabView) {
			this.tabView.onUpdate();
		}
	}

	protected onShown(): void {
		let self = this;
		self.updateShow();
		self.btnLeft.addClickListener(self.pageHandler, self);
		self.btnRight.addClickListener(self.pageHandler, self);
		self.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, self.scrollComp, self);
		self.list.addEventListener(fairygui.ItemEvent.CLICK, self.listHandle, self);
		GGlobal.reddot.listen(UIConst.SHAOZHU_ACT, self.setNotice, self);
		self._curpage = 0;
		self.setNotice()
		Timer.instance.listen(self.onTick, self, 1000);
		GGlobal.control.listen(Enum_MsgType.SEND_OPEN_DAYS_SYSTEM, self.updateShow, self);
	}

	protected onHide(): void {
		let self = this;
		if (self.tabView) {
			self.tabView.disposePanel();
			self.tabView.removeFromParent();
		}
		self.tabView = null;
		GGlobal.layerMgr.close(UIConst.SHAOZHU_ACT);
		self.btnLeft.removeClickListener(self.pageHandler, self);
		self.btnRight.removeClickListener(self.pageHandler, self);
		self.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, self.scrollComp, self);
		self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.listHandle, self);
		GGlobal.reddot.remove(UIConst.SHAOZHU_ACT, self.setNotice, self);

		GGlobal.layerMgr.close(UIConst.SHAOZHU_ACT);
		Timer.instance.remove(self.onTick, self);
		GGlobal.control.remove(Enum_MsgType.SEND_OPEN_DAYS_SYSTEM, self.updateShow, self);
	}

	private scrollComp(): void {
		let curpage: number = this.list.getFirstChildInView();
		this._curpage = curpage;
		this.setNotice();
	}


	protected closeEventHandler(evt: egret.Event): void {
		if (this.tabView) {
			if (this.tabView instanceof ChildShaoZhuPig) {
				let bool = (this.tabView as ChildShaoZhuPig).decideToClose();
				if (!bool) return;
			}
		}
		this.hide();
	}
}