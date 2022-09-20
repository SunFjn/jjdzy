class View_HuoDOnly_Panel extends UIPanelBase {

	public list: fairygui.GList;
	public btnLeft: Button2;
	public btnRight: Button2;
	public viewHd: Child_HuoDOnly;
	public checkBox: fairygui.GButton;

	public static URL: string = "ui://mk3gp0vrlbbw0";

	private actArr: Vo_Activity[];;
	private tabView: IChildHuoDong;
	private idView: any;

	public constructor() {
		super();
		this.setSkin("huoDOnly", "huoDOnly_atlas0", "View_HuoDOnly_Panel");
	}
	protected setExtends() {
		let fac = fairygui.UIObjectFactory;
		fac.setPackageItemExtension(Child_HuoDOnly.URL, Child_HuoDOnly);
		fac.setPackageItemExtension(VHuoDOnlyItem.URL, VHuoDOnlyItem);
		fac.setPackageItemExtension(Child_HOnlyShop.URL, Child_HOnlyShop);
		fac.setPackageItemExtension(HOnlyShopItem.URL, HOnlyShopItem);
		fac.setPackageItemExtension(Child_HOnlyDBFanLi.URL, Child_HOnlyDBFanLi);
		fac.setPackageItemExtension(Item_HOnlyDBFanLi.URL, Item_HOnlyDBFanLi);

	}

	protected initView(): void {
		super.initView();
		let a = this;
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandle;
		a.btnRight.scalRed();
		a.viewHd.visible = false;
		a.idView = {};
		a.idView[UIConst.HUOD_ONLY_SHOP] = Child_HOnlyShop
		a.idView[UIConst.HUOD_ONLY_DBFanLi] = Child_HOnlyDBFanLi
	}

	protected onShown(): void {
		let a = this;
		a.updateShow();
		a.btnLeft.addClickListener(this.pageHandler, this);
		a.btnRight.addClickListener(this.pageHandler, this);
		a.checkBox.addClickListener(this.onCheck, this);
		a.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
		a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
		GGlobal.reddot.listen(UIConst.HUOD_ONLY, a.setNotice, a);
		GGlobal.modelHuoDOnly.listen(Model_HuoDOnly.add_del_hd, this.updateShow, this);
		this._curpage = 0;
		a.setNotice()
		a.checkBox.selected = Model_HuoDOnly.getSkipShow()
	}

	private onCheck() {
		Model_HuoDOnly.setSkipShow(this.checkBox.selected)
	}

	protected onHide(): void {
		let a = this;
		if (a.tabView) {
			a.tabView.disposePanel();
		}
		a.btnLeft.removeClickListener(this.pageHandler, this);
		a.btnRight.removeClickListener(this.pageHandler, this);
		a.checkBox.removeClickListener(this.onCheck, this);
		a.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
		a.list.removeEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
		GGlobal.reddot.remove(UIConst.HUOD_ONLY, a.setNotice, a);
		GGlobal.modelHuoDOnly.remove(Model_HuoDOnly.add_del_hd, this.updateShow, this);
	}

	public updateShow(): void {
		let a = this;
		a.actArr = Model_HuoDOnly.getActivity();
		a.actArr.sort(function (a, b) { return a.id - b.id })
		a.list.numItems = a.actArr.length;
		if (a.actArr.length > 0) {
			let scto = 0
			if (a._args && Number(a._args) > 0) {
				for (let i = 0; i < a.actArr.length; i++) {
					if (a.actArr[i].index == Number(a._args)) {
						scto = i;
						break;
					}
				}
			}
			a.list.scrollToView(scto)
			a.list.selectedIndex = scto
			a.updateChildShow(a.actArr[scto]);
		}
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		let a = this;
		let tab: fairygui.GButton = obj as fairygui.GButton;
		let id = a.actArr[index].index
		ImageLoader.instance.loader(Enum_Path.MAINUI_URL + Config.zshd_315[id].icon + ".png", tab.getChild("icon") as fairygui.GLoader);
		tab.data = a.actArr[index];
	}

	private listHandle(evt: fairygui.ItemEvent) {
		let a = this;
		let tab = evt.itemObject as fairygui.GButton;
		a.updateChildShow(tab.data);
	}

	private updateChildShow(act: Vo_Activity) {
		let a = this;
		if (a.tabView) {
			a.tabView.disposePanel();
		}
		let id = act.index
		if (a.idView[id] != null) {
			a.tabView = a.idView[id].instance;
		} else {
			a.tabView = a.viewHd
		}
		a.tabView.show(a, act);
	}

	private setNotice(): void {
		this.btnRight.checkNotice = false;
		this.btnLeft.checkNotice = false;
		for (let i = 0; i < this.actArr.length; i++) {
			let id = this.actArr[i].index
			let index = this.actArr[i].id
			let btn: fairygui.GComponent = this.list.getChildAt(i) as fairygui.GComponent
			let red = GGlobal.reddot.checkCondition(id, index - 1);
			if (btn) btn.getChild("noticeImg").visible = red;
			if (red && i > this._curpage + 3) {
				this.btnRight.checkNotice = true;
			}
			if (red && i < this._curpage) {
				this.btnLeft.checkNotice = true;
			}
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
					if (curpage >= this.list.numItems - 1) curpage = this.list.numItems - 1;
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
}