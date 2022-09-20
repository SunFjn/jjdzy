class ChildBagItem extends fairygui.GComponent implements IPanel {

	//>>>>start
	public dataList: fairygui.GList;
	//>>>>end

	public static URL: string = "ui://v4sxjak5etor5";

	public static createInstance(): ChildBagItem {
		return <ChildBagItem><any>(fairygui.UIPackage.createObject("bag", "ChildBagItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.dataList = <fairygui.GList><any>(this.getChild("dataList"));

		this.dataList.callbackThisObj = this;
		this.dataList.itemRenderer = this.renderHandle;
		this.dataList.setVirtual();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.update(pData);
	}

	closePanel(pData?: any) {
		this.removeListen();
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		var item: ViewGridRender = obj as ViewGridRender;
		item.grid.gridSource = 2;
		item.vo = this._sortList[index];
	}

	private _sortList: Array<any>
	//type 0道具  1宝石
	public update(type) {
		this._sortList = this.sort(type);
		this._sortList.length = Math.ceil(this._sortList.length / 5) * 5;
		this.dataList.numItems = Math.max(100, this._sortList.length);
		// this.dataList.scrollToView(0);
	}

	protected sort(type): any {
		var ret = [];
		var list
		if (type == 0) {
			list = Model_Bag.itemList;
		} else {
			list = Model_Bag.gemList;
		}
		list.sort(Model_Bag.sortFunc);

		for (var i: number = 0; i < list.length; i++) {
			var voI: VoItem = list[i];
			this.addSplitItem(ret, voI);
		}
		return ret;
	}

	//数量超过9999的物品分开格子
	protected addSplitItem(list: any, vo: VoItem): void {
		if (vo.count > Model_Bag.CONST_MAX_MUL_USE_NUM) {
			var splitLen: number = Math.floor(vo.count / Model_Bag.CONST_MAX_MUL_USE_NUM);
			var resCount: number = vo.count % Model_Bag.CONST_MAX_MUL_USE_NUM;
			for (var i: number = 0; i < splitLen; i++) {
				var loc_vo: VoItem = VoItem.create(vo.id);
				loc_vo.count = Model_Bag.CONST_MAX_MUL_USE_NUM;
				list.push(loc_vo);
			}
			if (resCount != 0) {
				var loc_vo: VoItem = VoItem.create(vo.id);
				loc_vo.count = resCount;
				list.push(loc_vo);
			}
		} else {
			list.push(vo);
		}
	}

	private removeListen(): void {
		this.dataList.numItems = 0;
	}

}
