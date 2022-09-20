/**
 * 主题消费
 */
class Child_ActCom_ZTXF extends fairygui.GComponent implements IPanel {
	public labTime: fairygui.GRichTextField;
	public btnLeft: Button2;
	public btnRight: Button2;
	public tabList: fairygui.GList;
	public tabVos: Iztxfb_329[];
	public tipsTxt: fairygui.GRichTextField;
	public list: fairygui.GList;

	private _vo: Vo_Activity;
	private selectIndex = 0;
	private _listData: Array<Iztxfb_329>;

	public static URL: string = "ui://904git2zglgpa";

	/** 设置包名（静态属性） */
	public static pkg = "ActCom_ZTXF";

	/** 绑定ui的方法（静态方法） */
	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(Tab_ZTXF.URL, Tab_ZTXF);
		f(ActCom_ZTXF_Item.URL, ActCom_ZTXF_Item);
	}

	public static createInstance(): Child_ActCom_ZTXF {
		return <Child_ActCom_ZTXF><any>(fairygui.UIPackage.createObject("ActCom_ZTXF", "Child_ActCom_ZTXF"));
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public constructor() {
		super();
	}

	initView(pParent: fairygui.GObject) {
		let self = this;
		self.tabList.callbackThisObj = self;
		self.tabList.itemRenderer = self.tabHD;
		self.tabList.addEventListener(fairygui.ItemEvent.CLICK, self.listHandle, self);

		self.btnLeft.displayObject.touchEnabled = true;
		self.btnRight.displayObject.touchEnabled = true;
		CommonManager.listPageChange("Child_ActCom_ZTXF", this.tabList, this.btnLeft, this.btnRight, 3, Handler.create(this, this.setPageNotice));

		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
	}

	openPanel(pData?: any) {
		let self = this;
		self._vo = pData;
		GGlobal.model_ZTXF.qs = self._vo.qs;
		self.show();
		self.y = 264;
	}

	closePanel(pData?: any) {
		this.disposePanel();
	}

	dispose() {
		this.disposePanel();
		super.dispose();
	}

	private disposePanel() {
		let self = this;
		Timer.instance.remove(self.onUpdate, self);
		self.tabList.numItems = 0;
		self.tabList.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
		self.list.numItems = 0;
		GGlobal.control.remove(UIConst.ZTXF, self.updateChildShow, self);
	}

	private show() {
		let self = this;
		GGlobal.modelActivity.CG_OPENACT(self._vo.id);
		Timer.instance.listen(self.onUpdate, self);
		self.tabList.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, self.scrollComp, this);
		GGlobal.control.listen(UIConst.ZTXF, self.updateChildShow, self);
	}

	private onUpdate() {
		let self = this;
		const end = self._vo ? self._vo.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			self.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			self.labTime.text = "00:00:00";
		}
	}

	/**
     * 左右按钮红点
     */
	private setPageNotice(_curpage): void {
		const sf = this;
		let model = GGlobal.model_ZTXF;
		sf.btnLeft.checkNotice = false;
		sf.btnRight.checkNotice = false;
		let cfg: Iztxfb_329;
		for (let i = 0; i < sf.tabVos.length; i++) {
			cfg = sf.tabVos[i];
			let red: boolean = model.checkZTXFNoticeByType(sf._vo.qs, cfg.lx);
			if (red && i > _curpage + 2) {
				sf.btnRight.checkNotice = true;
			}
			if (red && i < _curpage) {
				sf.btnLeft.checkNotice = true;
			}
		}
	}

	private tabHD(index: number, obj: fairygui.GComponent) {
		var item: Tab_ZTXF = obj as Tab_ZTXF;
		item.setVo(this.tabVos[index], index);
	}

	/**
	 * list点击事件
	 */
	private listHandle(e: fairygui.ItemEvent) {
		let s = this;
		s.selectIndex = (e.itemObject as Tab_ZTXF).idx;
		s.setTabSelected();
		this.updateList();
	}

	private scrollComp(): void {
		let curpage: number = this.tabList.getFirstChildInView();
		this.setPageNotice(curpage);
	}

	private setTabSelected() {
		let self = this;
		for (let i = 0; i < self.tabList._children.length; i++) {
			let btn: Tab_ZTXF = self.tabList._children[i] as Tab_ZTXF;
			btn.setSelect(self.selectIndex == i);
		}
	}

	private itemRender(idx, obj) {
		let item: ActCom_ZTXF_Item = obj as ActCom_ZTXF_Item;
		item.setdata(this._listData[idx]);
	}

	/**
     * 更新页面数据 
     */
	private updateChildShow() {
		let self = this;
		let model = GGlobal.model_ZTXF;
		let needCharge: number = Config.xtcs_004[7630].num;
		let color = model.rechargeNum >= needCharge ? Color.GREENSTR : Color.REDSTR;
		self.tipsTxt.text = BroadCastManager.reTxt("活动期间累计充值达到<font color='{0}'>{1}</font>元，可且仅可激活一个消费主题<font color='{2}'>({3}/{4})</font>", Color.GREENSTR, needCharge, color, model.rechargeNum, needCharge);

		self.tabVos = model.getTabVOs(self._vo.qs);
		self.tabList.numItems = self.tabVos.length;

		self.selectIndex = model.type <= 0 ? 0 : model.type - 1;
		self.setTabSelected();
		self.tabList.scrollToView(self.selectIndex);
		self.setPageNotice(self.selectIndex);
		self.updateList();
	}

	/**
	 * 更新列表
	 */
	private updateList() {
		let self = this;
		let model = GGlobal.model_ZTXF;
		self._listData = Model_ActCom.getListData(model.getVosByLx(self._vo.qs, self.selectIndex + 1));
		self.list.numItems = self._listData ? self._listData.length : 0;
	}
}