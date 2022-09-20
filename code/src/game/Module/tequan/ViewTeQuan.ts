/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewTeQuan extends UIPanelBase {

	public frame: fairygui.GComponent;
	public n17: fairygui.GImage;
	public n31: fairygui.GList;
	public n32: fairygui.GImage;
	public n34: fairygui.GImage;
	public n35: fairygui.GImage;
	public n37: fairygui.GImage;
	public n38: fairygui.GRichTextField;
	public n39: fairygui.GRichTextField;
	public n40: fairygui.GRichTextField;
	public n41: fairygui.GImage;
	public btnHeadAward: Button1;
	public imgYlq: fairygui.GImage;
	public groupHead: fairygui.GGroup;
	public n45: fairygui.GImage;
	public n46: fairygui.GImage;

	public static URL: string = "ui://k82cjspug8eo3";

	public constructor() {
		super();
		this.setSkin("tequan", "tequan_atlas0", "ViewTeQuan");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ChildCard.URL, ChildCard);
		f(TqIt.URL, TqIt);
		f(Child_WeekVip.URL, Child_WeekVip);
	}

	protected initView() {
		let sf = this;
		sf.n31.callbackThisObj = this;
		sf.n31.itemRenderer = sf.renderHandle;
		sf.n31.numItems = GGlobal.modelvip._icons.length;
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		let a = this;
		let tab: fairygui.GButton = obj as fairygui.GButton;
		let id = GGlobal.modelvip._icons[index]
		ImageLoader.instance.loader(Enum_Path.MAINUI_URL + id + ".png", tab.getChild("icon") as fairygui.GLoader);
		tab.data = id;
	}

	private getHeadHD() {
		GGlobal.modelvip.CG_LTQ_2175();
	}

	private listHandle(evt: fairygui.ItemEvent) {
		let a = this;
		let tab = evt.itemObject as fairygui.GButton;
		a.updateChildShow(tab.data);
	}

	private tabView;
	private curTab;
	private updateChildShow(id) {
		let a = this;
		this.curTab = id;
		if (a.tabView) {
			a.tabView.close();
			a.removeChild(a.tabView);
		}
		switch (id) {
			case 500401:
			case 500402:
			case 500403:
				a.tabView = ChildCard.createInstance();
				a.tabView.idx = GGlobal.modelvip._icons.indexOf(id);
				break;
			case UIConst.WEEK_VIP:
				a.tabView = Child_WeekVip.createInstance();
				break;
		}
		a.tabView.setXY(1, 299)
		a.addChild(a.tabView);
		a.tabView.open();
	}

	private _curpage = 0;
	private setNotice(): void {
		this.n35.visible = false;
		this.n37.visible = false;
		let arr = GGlobal.modelvip._icons;
		for (let i = 0; i < arr.length; i++) {
			let id = arr[i];
			let btn: fairygui.GComponent = this.n31.getChildAt(i) as fairygui.GComponent
			let red = GGlobal.reddot.checkCondition(id, 0);
			if (btn) btn.getChild("noticeImg").visible = red;
			if (red && i > this._curpage + 3) {
				this.n35.visible = true;
			}
			if (red && i < this._curpage) {
				this.n37.visible = true;
			}
		}
		this.n31.numItems = GGlobal.modelvip._icons.length;
	}

	private pageHandler(event: egret.TouchEvent): void {
		let btn: fairygui.GButton = event.target as fairygui.GButton;
		let curpage: number = this.n31.getFirstChildInView();
		switch (btn.id) {
			case this.n37.id:
				if (curpage > 0) {
					curpage = curpage - 3;
					if (curpage < 0) curpage = 0;
				}
				break;
			case this.n35.id:
				if (curpage < this.n31.numItems - 1) {
					curpage = curpage + 3;
					if (curpage >= this.n31.numItems - 1) curpage = this.n31.numItems - 1;
				}
				break;
		}
		this._curpage = curpage;
		if (this.n31.numItems > 0)
			this.n31.scrollToView(curpage, true, true);
		this.setNotice();
	}

	private scrollComp(): void {
		let curpage: number = this.n31.getFirstChildInView();
		this._curpage = curpage;
		this.setNotice();
	}

	setExtraAward() {
		let model = GGlobal.modelvip;
		let sf = this;
		sf.btnHeadAward.enabled = model.headState == 1;
		sf.btnHeadAward.visible = model.headState != 2;
		sf.btnHeadAward.checkNotice = model.headState == 1;
		sf.imgYlq.visible = model.headState == 2;
	}

	protected onShown() {
		let s = this;
		GGlobal.control.listen(Enum_MsgType.TQ_LQ, s.setNotice, s);
		GGlobal.control.listen(Enum_MsgType.TQ_INFO, s.setNotice, s);

		GGlobal.control.listen(Enum_MsgType.WELFARE_WEEKVIP_LQ, s.setNotice, s);
		s.n31.addEventListener(fairygui.ItemEvent.CLICK, s.listHandle, s);
		s.btnHeadAward.addClickListener(s.getHeadHD, s);
		GGlobal.control.listen(Enum_MsgType.TQ_LQ, s.setExtraAward, s);

		GGlobal.modelvip.CG_TQ_2171();
		s.n31.selectedIndex = 0;
		s.updateChildShow(GGlobal.modelvip._icons[0]);
		s.setExtraAward();
		this.setNotice();
	}

	protected onHide() {
		let s = this;
		s.n31.removeEventListener(fairygui.ItemEvent.CLICK, s.listHandle, s);
		s.btnHeadAward.removeClickListener(s.getHeadHD, s);

		GGlobal.control.remove(Enum_MsgType.TQ_LQ, s.setNotice, s);
		GGlobal.control.remove(Enum_MsgType.TQ_INFO, s.setNotice, s);
		GGlobal.control.remove(Enum_MsgType.WELFARE_WEEKVIP_LQ, s.setNotice, s);
		GGlobal.control.remove(Enum_MsgType.TQ_LQ, s.setExtraAward, s);
		GGlobal.layerMgr.close(UIConst.TEQUAN);
		if (s.tabView) {
			s.tabView.close();
			s.removeChild(s.tabView);
		}
	}
}