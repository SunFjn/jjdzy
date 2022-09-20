class Child_QDShop extends fairygui.GComponent implements IPanel {

	public list: fairygui.GList;

	public static pkg = "sanGuoQingDian";
	public static URL: string = "ui://kdt501v2qrkf1s";
	public static createInstance(): Child_QDShop {
		return <Child_QDShop><any>(fairygui.UIPackage.createObject("sanGuoQingDian", "Child_QDShop"));
	}

	public static setExtends() {
	}
	protected _viewParent: fairygui.GObject;
	public initView(pParent: fairygui.GObject) {
		let self = this;
		self._viewParent = pParent;
		self.addRelation(self._viewParent, fairygui.RelationType.Size);
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandle;
		self.list.setVirtual();
	}

	private renderHandle(index: number, item: QDShopItem) {
		item.setVo(ModelSGQD.shopArr[index]);
	}

	public show() {
		this.list.numItems = ModelSGQD.shopArr.length;
	}

	private vo: Vo_Activity;
	public openPanel(pData?: Vo_Activity) {
		let self = this;
		self.vo = pData;
		GGlobal.control.listen(UIConst.SGQD_SHOP, self.show, self);
		if (ModelSGQD.shopArr.length <= 0) {
			GGlobal.modelActivity.CG_OPENACT(UIConst.SGQD_SHOP);
		} else {
			self.show();
		}
	}

	public closePanel() {
		let self = this;
		self.list.numItems = 0;
		GGlobal.control.remove(UIConst.SGQD_SHOP, self.show, self);
	}
}