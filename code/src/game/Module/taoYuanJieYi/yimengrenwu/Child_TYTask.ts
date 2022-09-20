/**
 * 义盟任务子界面
 */
class Child_TYTask extends fairygui.GComponent implements IPanel{
	public list: fairygui.GList;
	private _listData:Array<Ityjyrw_251>;

	public static URL: string = "ui://m2fm2aiyvfmx14";

	public static createInstance(): Child_TYTask {
		return <Child_TYTask><any>(fairygui.UIPackage.createObject("taoYuanJieYi", "Child_TYTask"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
		
		let self = this;
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	openPanel(pData?: any) {
		GGlobal.control.listen(UIConst.TYJY_YMRW, this.updateList, this);
		this.show();
	}

	closePanel() {
		this.onHide();
	}

	private show() {
		let self = this;
		this._listData = [];
		for(let key in Config.tyjyrw_251)
		{
			let cfg:Ityjyrw_251 = Config.tyjyrw_251[key];
			this._listData.push(cfg);
		}
		self.updateList();
	}

	protected onHide() {
		let self = this;
		self.list.numItems = 0;
		GGlobal.control.remove(UIConst.TYJY_YMRW, this.updateList, this);
	}

	/**
	 * 更新列表数据
	 */
	private updateList():void
	{
		let self = this;
		self.list.numItems = this._listData ? this._listData.length : 0;
	}

	private itemRender(idx, obj) {
		let item: TYJY_TaskItem = obj as TYJY_TaskItem;
		item.setdata(this._listData[idx]);
	}
}