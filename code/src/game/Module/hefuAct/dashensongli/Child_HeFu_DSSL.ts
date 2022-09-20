/**
 * 合服活动-大神送礼
 */
class Child_HeFu_DSSL extends fairygui.GComponent implements IPanel {
	public bgImg: fairygui.GLoader;
	public rechargeTxt: fairygui.GRichTextField;
	public list: fairygui.GList;
	private _listData;

	public static pkg = "hefuAct";

	public static URL: string = "ui://07jsdu7hhilo6";

	public static createInstance(): Child_HeFu_DSSL {
		return <Child_HeFu_DSSL><any>(fairygui.UIPackage.createObject("hefuAct", "Child_HeFu_DSSL"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(HeFu_DSSL_Item.URL, HeFu_DSSL_Item);
		f(HeFu_DSSL_Item1.URL, HeFu_DSSL_Item1);
	}

	initView(pParent: fairygui.GObject) {
		let self = this;
		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;
	}

	openPanel(pData?: Vo_Activity) {
		this.y = 264;
		this.show();
		GGlobal.modelActivity.CG_OPENACT(UIConst.HFKH_DSSL);
	}

	closePanel(pData?: any) {
		this.disposePanel();
		this.list.numItems = 0;
	}

	dispose() {
		this.disposePanel();
		super.dispose()
	}

	/**注销事件 */
	private disposePanel() {
		let self = this;
		IconUtil.setImg(self.bgImg, null);
		GGlobal.control.remove(UIConst.HFKH_DSSL, self.updateView, self);
	}

	private show(): void {
		let self = this;
		IconUtil.setImg(self.bgImg, Enum_Path.PIC_URL + "dashensongli.jpg");
		GGlobal.control.listen(UIConst.HFKH_DSSL, self.updateView, self);
	}

	/**
	 * 更新页面数据
	 */
	private updateView(): void {
		let self = this;
		self.rechargeTxt.text = "活动期间已充值：" + GGlobal.model_actCom.dsslRecharge + "元";
		this._listData = GGlobal.model_actCom.numArr;
		this.list.numItems = this._listData ? this._listData.length : 0;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: HeFu_DSSL_Item = obj as HeFu_DSSL_Item;
		item.setType(this._listData[index]);
	}
}