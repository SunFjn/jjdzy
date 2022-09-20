class ViewActHolyBeastPanel extends UIPanelBase {

	public list: fairygui.GList;
	public btnLeft: Button2;
	public btnRight: Button2;

	public static URL: string = "ui://d5y9ngt6ccyk4";

	private actArr: Vo_Activity[];
	private curTab: number;
	private tabView: IChildHuoDong;

	private idView: any;

	public static createInstance(): ViewActHolyBeastPanel {
		return <ViewActHolyBeastPanel><any>(fairygui.UIPackage.createObject("actHolyBeast", "ViewActHolyBeastPanel"));
	}

	public constructor() {
		super();
		this.setSkin("actHolyBeast", "actHolyBeast_atlas0", "ViewActHolyBeastPanel");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(Child_ActHolyBXiLian.URL, Child_ActHolyBXiLian);
		f(Child_ActHolyBMuBiao.URL, Child_ActHolyBMuBiao);
		f(Child_ActHolyBHuoYue.URL, Child_ActHolyBHuoYue);
		f(Child_ActHolyBZhuanP.URL, Child_ActHolyBZhuanP);
		f(Child_XiLianRank.URL, Child_XiLianRank);
		f(VActHolyBeastItem.URL, VActHolyBeastItem);
		f(ItemXiLianRank.URL, ItemXiLianRank);
		f(ItemXiLianRank1.URL, ItemXiLianRank1);
		f(ItemXiLianRank2.URL, ItemXiLianRank2);
		f(XiLianListGrid.URL, XiLianListGrid);

		f(ChildSGZL.URL, ChildSGZL);
		f(SGZLBtn.URL, SGZLBtn);
		f(SGZLTaskItem.URL, SGZLTaskItem);
		f(SGZLShopItem.URL, SGZLShopItem);
		f(SGZLRewardItem.URL, SGZLRewardItem);
	}

	protected initView(): void {
		super.initView();
		let a = this;
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandle;
		this.btnRight.scalRed();
		a.idView = {};
		a.idView[UIConst.ACTHB_XILIANRANK] = Child_XiLianRank;
		a.idView[UIConst.ACTHB_ZHUANPAN] = Child_ActHolyBZhuanP;
		a.idView[UIConst.ACTHB_MUBIAO] = Child_ActHolyBMuBiao;
		a.idView[UIConst.ACTHB_HUOYUE] = Child_ActHolyBHuoYue;
		a.idView[UIConst.ACTHB_XILIAN] = Child_ActHolyBXiLian;
		a.idView[UIConst.ACTHB_SGZL] = ChildSGZL;
	}

	/** 回收方法 */
	public dispose() {
		for (let k in this.idView) {
			let t_cls = this.idView[k];
			if (t_cls && "_instance" in t_cls) {
				let t_view = t_cls._instance;
				if (t_view) {
					t_view.dispose();
					t_cls._instance = null;
					// console.log("================= 触发回收");
				}
			}
		}
		super.dispose();
	}

	protected onShown(): void {
		let a = this;
		a.updateShow();
		a.btnLeft.addClickListener(this.pageHandler, this);
		a.btnRight.addClickListener(this.pageHandler, this);
		a.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
		a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
		GGlobal.modelEightLock.CG4571(UIConst.ACTHB_XILIANRANK);
		GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_XILIAN_RANK, a.updateShow, a);
		let r = GGlobal.reddot;
		r.listen(UIConst.ACTHB_ZHUANPAN, a.setNotice, a);
		r.listen(UIConst.ACTHB_XILIAN, a.setNotice, a);
		r.listen(UIConst.ACTHB_MUBIAO, a.setNotice, a);
		r.listen(UIConst.ACTHB_HUOYUE, a.setNotice, a);
		r.listen(UIConst.ACTHB_SGZL, a.setNotice, a);
		this._curpage = 0;
		a.setNotice()
	}

	protected onHide(): void {
		let a = this;
		if (a.tabView) {
			a.tabView.disposePanel();
		}
		GGlobal.layerMgr.close(UIConst.ACT_HOLY_BEAST);
		a.btnLeft.removeClickListener(this.pageHandler, this);
		a.btnRight.removeClickListener(this.pageHandler, this);
		a.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
		a.list.removeEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
		GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_XILIAN_RANK, a.updateShow, a);
		let r = GGlobal.reddot
		r.remove(UIConst.ACTHB_ZHUANPAN, a.setNotice, a);
		r.remove(UIConst.ACTHB_XILIAN, a.setNotice, a);
		r.remove(UIConst.ACTHB_MUBIAO, a.setNotice, a);
		r.remove(UIConst.ACTHB_HUOYUE, a.setNotice, a);
		r.remove(UIConst.ACTHB_SGZL, a.setNotice, a);
	}

	public updateShow(): void {
		let a = this;
		let arr = ModelEightLock.getActivity(UIConst.ACT_HOLY_BEAST);
		//图标关闭
		if (Model_ActHolyBeast.endTime <= 0) {
			let curVO: Vo_Activity;
			for (let i: number = 0; i < arr.length; i++) {
				let vo: Vo_Activity = arr[i];
				if (vo.id == UIConst.ACTHB_XILIANRANK) {
					curVO = vo;
					break;
				}
			}
			if (curVO) {
				let index: number = arr.indexOf(curVO);
				if (index != -1) {
					arr.splice(index, 1);
				}
			}
		}
		a.actArr = []
		arr.forEach(element => {
			if (ModuleManager.isOpen(element.id)) {
				a.actArr.push(element);
			}
		});
		a.actArr.sort(function (a, b) { return a.id - b.id });

		//图标开启，洗练排行图标要放第一位
		if (Model_ActHolyBeast.endTime > 0) {
			let curVO: Vo_Activity;
			for (let i: number = 0; i < a.actArr.length; i++) {
				let vo: Vo_Activity = a.actArr[i];
				if (vo.id == UIConst.ACTHB_XILIANRANK) {
					curVO = vo;
					break;
				}
			}
			if (curVO) {
				let index: number = a.actArr.indexOf(curVO);
				if (index != -1) {
					a.actArr.splice(index, 1);
					a.actArr.unshift(curVO);
				}
			}
		}

		a.list.numItems = a.actArr.length;
		if (a.actArr.length > 0) {
			let scto = 0
			a.list.scrollToView(scto)
			a.list.selectedIndex = scto
			a.updateChildShow(a.actArr[scto].id);
		}
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		let a = this;
		let tab: fairygui.GButton = obj as fairygui.GButton;
		let id = a.actArr[index].id
		ImageLoader.instance.loader(Enum_Path.MAINUI_URL + Config.xitong_001[id].icon + ".png", tab.getChild("icon") as fairygui.GLoader);
		tab.data = id;
	}

	private listHandle(evt: fairygui.ItemEvent) {
		let a = this;
		let tab = evt.itemObject as fairygui.GButton;
		a.updateChildShow(tab.data);
		if (tab.data == UIConst.ACTHB_XILIANRANK) {
			GGlobal.modelEightLock.CG4571(UIConst.ACTHB_XILIANRANK);
		}
	}

	private updateChildShow(id: number) {
		this.curTab = id;
		let a = this;
		if (a.tabView) {
			a.tabView.disposePanel();
		}
		if (a.idView[id]) {
			a.tabView = a.idView[id].instance;
			a.tabView.show(a, id);
		}
	}

	private setNotice(): void {
		this.btnRight.checkNotice = false;
		this.btnLeft.checkNotice = false;
		for (let i = 0; i < this.actArr.length; i++) {
			let id = this.actArr[i].id
			let btn: fairygui.GComponent = this.list.getChildAt(i) as fairygui.GComponent
			let red = GGlobal.reddot.checkCondition(id, 0);
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

interface IActHolyBeast {
	disposePanel;
	show;
}