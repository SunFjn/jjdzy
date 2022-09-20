class View_HuoDong_Panel extends UIPanelBase {

	public list: fairygui.GList;
	public btnLeft: Button2;
	public btnRight: Button2;
	public viewHd: Child_HuoDong;

	public static URL: string = "ui://vrw7je9rlj8v0";

	private iconArr: Ijchd_723[];
	private actArr: Vo_Activity[];;
	private curTab: number;
	private tabView: IChildHuoDong;

	private idView: any = {};

	public constructor() {
		super();
		this.setSkin("huoDong", "huoDong_atlas0", "View_HuoDong_Panel");
	}
	protected setExtends() {
		let fac = fairygui.UIObjectFactory;
		fac.setPackageItemExtension(ChildDL.URL, ChildDL);
		fac.setPackageItemExtension(ChaoJiTip.URL, ChaoJiTip);
		fac.setPackageItemExtension(ChildCZDJ.URL, ChildCZDJ);
		fac.setPackageItemExtension(Child_HuoDong.URL, Child_HuoDong);
		fac.setPackageItemExtension(VHuoDongItem.URL, VHuoDongItem);
		fac.setPackageItemExtension(ItemCJDJ.URL, ItemCJDJ);
		fac.setPackageItemExtension(Child_LXLC.URL, Child_LXLC);
		fac.setPackageItemExtension(VLXLCItem.URL, VLXLCItem);
	}

	protected initView(): void {
		super.initView();
		let a = this;
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandle;
		a.viewHd.visible = false;
		this.btnRight.scalRed();
		a.idView = {};
		a.idView[UIConst.HUODONG_DAILY_GIFT814] = Child_HuoDong814
		a.idView[UIConst.HUODONG_DAILY_ONE814] = Child_HuoDong814
		a.idView[UIConst.HUODONG_ADD_RECHARGE814] = Child_HuoDong814
		a.idView[UIConst.HUODONG_DAILY_ADDUP814] = Child_HuoDong814
		a.idView[UIConst.HUODONG_DIANJIAN814] = ChildCZD814
		a.idView[UIConst.HUODONG_SEVEN814] = Child_LXLC814

	}

	protected onShown(): void {
		let a = this;
		a.updateShow();
		a.btnLeft.addClickListener(this.pageHandler, this);
		a.btnRight.addClickListener(this.pageHandler, this);
		a.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
		a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
		GGlobal.reddot.listen(ReddotEvent.CHECK_HUODONG, a.setNotice, a);
		this._curpage = 0;
		a.setNotice()
	}

	protected onHide(): void {
		let a = this;
		if (a.tabView) {
			a.tabView.disposePanel();
		}
		GGlobal.layerMgr.close(UIConst.HUODONG);
		a.btnLeft.removeClickListener(this.pageHandler, this);
		a.btnRight.removeClickListener(this.pageHandler, this);
		a.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
		a.list.removeEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
		GGlobal.reddot.remove(ReddotEvent.CHECK_HUODONG, a.setNotice, a);
	}

	public updateShow(): void {
		let a = this;
		a.iconArr = [];
		this.actArr = GGlobal.modelActivity.getGroup(4501);//Model_Activity.activityObj[4501]
		let arr1 = ModelEightLock.getActivity(UIConst.HUODONG);
		this.actArr = this.actArr ? this.actArr.concat(arr1) : arr1;

		Model_HuoDong.iconArr.forEach(element => {
			let id = element.id;
			if (element.id == UIConst.HUODONG_ADD_RECHARGE && Model_GlobalMsg.kaifuDay <= 7) {
				id = UIConst.HUODONG_ADD_RECHARGESYS;
			} else if (element.id == UIConst.HUODONG_DIANJIANG && Model_GlobalMsg.kaifuDay <= 7) {
				id = UIConst.HUODONG_DIANJIANG_SYS;
			}
			if (this.isOpen(id) && ModuleManager.isOpen(id)) {
				a.iconArr.push(element);
			}
		});


		// if (a.iconArr.length == 0) return;
		a.list.numItems = a.iconArr.length;
		if (a.iconArr.length > 0) {
			let scto = 0
			if (a._args && Number(a._args) > 0) {
				if (Number(a._args) == UIConst.HUODONG_ADD_RECHARGESYS) a._args = UIConst.HUODONG_ADD_RECHARGE;
				for (let i = 0; i < a.iconArr.length; i++) {
					if (a.iconArr[i].id == Number(a._args)) {
						scto = i;
						break;
					}
				}
			}
			a.list.scrollToView(scto)
			a.list.selectedIndex = scto
			a.updateChildShow(a.iconArr[scto].id);
		}
	}

	public isOpen(id): boolean {
		if (id == UIConst.HUODONG_SEVEN_KAIFU || id == UIConst.HUODONG_DAI_GIFT_KF ||
			id == UIConst.HUODONG_DAI_ONE_KF || id == UIConst.HUODONG_DAI_ADD_KF ||
			id == UIConst.HUODONG_ADD_RECHARGE || id == UIConst.HUODONG_DIANJIANG_SYS ||
			id == 4515) {
			if (Model_GlobalMsg.kaifuDay <= 7) {
				return true;
			} else {
				if (id == UIConst.HUODONG_ADD_RECHARGE) {
					const act = GGlobal.modelActivity.get(UIConst.HUODONG, id);
					if (act) {
						const servTime = (Model_GlobalMsg.getServerTime() / 1000) >> 0;
						return (act.end - servTime > 0) && (servTime - act.start > 0);
					}
				}
			}
		}
		else if (this.actArr && this.actArr.length > 0) {
			for (let i = 0; i < this.actArr.length; i++) {
				let act = this.actArr[i]
				if (act.id == id) {
					let time = (Model_GlobalMsg.getServerTime() / 1000) >> 0;
					if ((act.end - time > 0) && (time - act.start > 0)) return true;
				}
			}
		}
		return false
	}

	private renderHandle(index: number, obj: ComActivityTab): void {
		let a = this;
		let id = a.iconArr[index].id
		obj.data = id;
		obj.setActivityIcon(Config.jchd_723[id].icon);
	}

	private listHandle(evt: fairygui.ItemEvent) {
		let a = this;
		let tab = evt.itemObject as fairygui.GButton;
		a.updateChildShow(tab.data);
	}

	private updateChildShow(id: number) {
		this.curTab = id;
		let a = this;
		if (a.tabView) {
			a.tabView.disposePanel();
		}
		let fac = fairygui.UIObjectFactory;
		if (id == UIConst.HUODONG_DIANJIANG) {
			a.tabView = ChildCZDJ.instance;
		} else if (id == UIConst.HUODONG_SEVEN_KAIFU || id == UIConst.HUODONG_SEVEN_ACT) {
			a.tabView = Child_LXLC.instance;
		}
		else if (a.idView[id] != null) {
			fac.setPackageItemExtension(Child_HuoDong814.URL, Child_HuoDong814);
			fac.setPackageItemExtension(VHuoDongI814.URL, VHuoDongI814);
			a.tabView = a.idView[id].instance;
		}
		else {
			fac.setPackageItemExtension(Child_HuoDong.URL, Child_HuoDong);
			fac.setPackageItemExtension(VHuoDongItem.URL, VHuoDongItem);
			a.tabView = this.viewHd;
		}
		a.tabView.show(a, id);
	}

	private setNotice(): void {
		this.btnRight.checkNotice = false;
		this.btnLeft.checkNotice = false;
		for (let i = 0; i < this.iconArr.length; i++) {
			let id = this.iconArr[i].id
			let btn: fairygui.GComponent = this.list.getChildAt(i) as fairygui.GComponent
			if (id == UIConst.HUODONG_DIANJIANG && Model_GlobalMsg.kaifuDay <= 7) {
				id = UIConst.HUODONG_DIANJIANG_SYS;
			}
			if (id == UIConst.HUODONG_ADD_RECHARGE && Model_GlobalMsg.kaifuDay <= 7) {
				id = UIConst.HUODONG_ADD_RECHARGESYS;
			}
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

interface IChildHuoDong {
	disposePanel;
	show;
}