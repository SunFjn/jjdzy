class ChildBagEquip extends fairygui.GComponent implements IPanel {

	//>>>>start
	public dataList: fairygui.GList;
	public lbGridNum: fairygui.GRichTextField;
	public btnAdd: Button2;
	public btnRL: Button0;
	//>>>>end

	public static URL: string = "ui://v4sxjak5etor4";

	public static createInstance(): ChildBagEquip {
		return <ChildBagEquip><any>(fairygui.UIPackage.createObject("bag", "ChildBagEquip"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
		this.dataList.itemRenderer = this.renderHandle;
		this.dataList.callbackThisObj = this;
		this.dataList.setVirtual();
		this.btnRL.addClickListener(this.openRL, this);
		this.btnAdd.addClickListener(this.addClick, this);
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.update();
	}
	closePanel(pData?: any) {
		this.removeListen();
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		var item: ViewGridRender = obj as ViewGridRender;
		item.grid.gridSource = 2;
		item.vo = this._sortList[index];
	}

	private openRL(event: TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.RONGLIAN, 0);
	}

	private addClick(event: TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.VIP);
	}

	private _sortList: Array<any>
	public update() {
		this._sortList = this.sort();
		this.dataList.numItems = Model_Bag.getCurBagNum();
		this.updateSize();
		this.btnRL.checkNotice = Model_Bag.checkEquipNotice();
	}

	public updateSize() {
		var bagCount: number = Model_Bag.equipList.length;
		this.lbGridNum.text = "容量：" + bagCount + "/" + Model_Bag.getCurBagNum();
	}

	protected sort(): any {
		var ret = [];
		var list = Model_Bag.equipList;
		list.sort(this.sortFunc);
		for (var i: number = 0; i < list.length; i++) {
			ret.push(list[i]);
		}
		return ret;
	}

	public sortFunc(a: IGridImpl, b: IGridImpl): number {
		if (a.quality != b.quality) {
			return b.quality - a.quality;
		} else {
			return a.paixu - b.paixu;
		}
	}

	public removeListen(): void {
		this.dataList.numItems = 0;
	}
}