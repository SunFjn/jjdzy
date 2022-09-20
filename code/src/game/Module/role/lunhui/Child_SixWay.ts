/**
 * 六道
 */
class Child_SixWay extends fairygui.GComponent implements IPanel{
	public list: fairygui.GList;
	public powerLb: fairygui.GLabel;
	public linkSixWay: fairygui.GRichTextField;
	public btnBag: Button2;

	public static URL: string = "ui://ehelf5bh11m1wv";

	public constructor() {
		super();
	}

	public static createInstance(): Child_SixWay {
		return <Child_SixWay><any>(fairygui.UIPackage.createObject("lunhui", "Child_SixWay"));
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);

		let self = this;
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;

		self.linkSixWay.text = HtmlUtil.createLink("玩法说明");
		self.linkSixWay.addEventListener(egret.TextEvent.LINK, self.openGaiLV, self);
		GGlobal.modellh.CG_SIXWAY_OPENUI();
	}

	openPanel(pData?: any) {
		this.onShown();
	}

	closePanel(pData?: any) {
		this.onHide();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public onShown(): void {
		let self = this;
		// GGlobal.modellh.CG_SIXWAY_OPENUI();
		GGlobal.control.listen(UIConst.SIXWAY, self.updateView, self);
		self.btnBag.addClickListener(self.onOpenBag, self);
		GGlobal.reddot.listen(UIConst.SIXWAY, self.updateView, self);
		self.updateView();
	}

	public onHide(): void {
		let self = this;
		self.list.numItems = 0;
		GGlobal.control.remove(UIConst.SIXWAY, self.updateView, self);
		self.btnBag.removeClickListener(self.onOpenBag, self);
		GGlobal.reddot.remove(UIConst.SIXWAY, self.updateView, self);
	}


	private itemRender(idx, obj) {
		let item: SixWayItem = obj as SixWayItem;
		item.setdata(GGlobal.modellh.suitArr[idx], idx);
	}

	private openGaiLV(evt: egret.TextEvent) {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SIXWAY);
	}

	/**
     * 更新页面数据
     */
	private updateView() {
		let self = this;
		let model = GGlobal.modellh;
		self.list.numItems = model.suitArr ? model.suitArr.length : 0;
		self.powerLb.text = model.power + "";

		self.btnBag.checkNotice = Model_LunHui.length >= 250;
	}

	/**
	 * 打开分解背包
	 */
	private onOpenBag() {
		// GGlobal.layerMgr.close2(UIConst.SIXWAY);
		// GGlobal.layerMgr.close2(UIConst.LUNHUI);
		// GGlobal.layerMgr.close2(UIConst.TIANMING);
		GGlobal.layerMgr.open(UIConst.SIXWAY_FENJIE, UIConst.SIXWAY);
	}
}