class ViewCommonPrompt extends fairygui.GComponent {

	public static textItemList(arr: Array<any>): void {
		GGlobal.layerMgr.open(UIConst.COMMON_PROMPT);
		var v = GGlobal.layerMgr.getView(UIConst.COMMON_PROMPT) as ViewCommonPrompt
		v.showItemList(arr);
	}

	private static _instance: ViewCommonPrompt;
	public static get instance(): ViewCommonPrompt {
		if (!ViewCommonPrompt._instance) ViewCommonPrompt._instance = new ViewCommonPrompt();
		return ViewCommonPrompt._instance;
	}


	public itemDatas: any[][] = [];

	/**显示物品 */
	private showItemList(arr: Array<any>): void {

		// var item: PromptItemList = PromptItemList.createInstance();
		// if (item instanceof PromptItemList) {

		// } else {
		// 	return;
		// }

		if (this.itemDatas.length < 3) {
			var start = 0;
			// var start = arr.length - 9 > 0 ? arr.length - 9 : 0;
			var arr3 = [];
			for (let i = start; i < arr.length; i++) {
				if (arr3.length == 0) {
					this.itemDatas.push(arr3);
				}
				arr3.push(arr[i]);
				if (arr3.length >= 3) {
					arr3 = [];
				}
			}
		}
		this.doLoop()
	}

	private _tween: egret.Tween
	private doLoop(): void {
		if (this.itemDatas.length > 0 && this._tween == null) {
			let datas = this.itemDatas.shift()
			if (!datas || datas.length == 0) return;
			var item: any
			if (datas[0] instanceof VoBaZhenTu) {
				item = PromptBaZhenTu.createInstance();
			} else {
				item = PromptItemList.createInstance();
			}
			// var item: PromptItemList = PromptItemList.createInstance();
			// item.showItemList(this.itemDatas.shift());
			item.showItemList(datas);
			item.y = fairygui.GRoot.inst.height - item.height - 10;
			item.x = -item.width;
			var midX = (fairygui.GRoot.inst.width - item.width) / 2;
			var endX = fairygui.GRoot.inst.width + item.width;
			this.addChild(item);
			this._tween = egret.Tween.get(item);
			this._tween.to({ x: midX }, 300, egret.Ease.backInOut).wait(500).to({ x: endX }, 300, egret.Ease.backIn).call(this.showItemListNext, this, [item]);
		}
	}

	private showItemListNext(item): void {
		item.parent.removeChild(item);
		item.disposePanel();
		this._tween = null;
		if (this.itemDatas.length == 0) {
			GGlobal.layerMgr.close(UIConst.COMMON_PROMPT);
		} else {
			this.doLoop()
		}
	}
	public onOpen() {

	}

	public onClose() {
		GGlobal.layerMgr.close(UIConst.COMMON_PROMPT);
	}

	public resetPosition(): void {
		this.setXY(0, 0);
	}


	//=============八阵图

	public static textBaZhenTuList(arr: Array<any>): void {
		GGlobal.layerMgr.open(UIConst.COMMON_PROMPT);
		var v = GGlobal.layerMgr.getView(UIConst.COMMON_PROMPT) as ViewCommonPrompt
		v.showItemList(arr);
	}
}
class PromptItemList extends fairygui.GComponent {

	public static POOL: Array<PromptItemList> = [];

	public back: fairygui.GImage;
	public list: fairygui.GList;

	public static URL: string = "ui://jvxpx9emx2oe6a";

	private _dataList: Array<any>

	public static createInstance(): PromptItemList {
		var POOL = PromptItemList.POOL;
		if (POOL.length) {
			return POOL.pop();
		}
		return <PromptItemList><any>(fairygui.UIPackage.createObject("common", "PromptItemList"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.back = <fairygui.GImage><any>(this.getChild("back"));
		this.list = <fairygui.GList><any>(this.getChild("list"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.touchable = false;
	}

	public showItemList(arr) {
		this._dataList = arr;
		this.list.numItems = this._dataList.length;
		if (this.list.numItems == 1) {
			this.list.x = this.back.x + this.back.width / 2 - 102 / 2;
		} else if (this.list.numItems == 2) {
			this.list.x = this.back.x + this.back.width / 2 - 102 - 34 / 2;
		} else {
			this.list.x = 82;
		}
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		var render: ViewGridRender = obj as ViewGridRender
		render.tipEnabled = false
		render.vo = this._dataList[index];
		render.showNotice = false;
	}

	public disposePanel() {
		this.list.numItems = 0;
		PromptItemList.POOL.push(this);
	}
}
//八阵图 飘神符
class PromptBaZhenTu extends fairygui.GComponent {
	
	public static POOL: Array<PromptBaZhenTu> = [];

	public back: fairygui.GImage;
	public list: fairygui.GList;

	public static URL:string = "ui://jvxpx9emtszw3gq";

	private _dataList: Array<any>

	public static createInstance(): PromptBaZhenTu {
		var POOL = PromptBaZhenTu.POOL;
		if (POOL.length) {
			return POOL.pop();
		}
		return <PromptBaZhenTu><any>(fairygui.UIPackage.createObject("common", "PromptBaZhenTu"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.back = <fairygui.GImage><any>(this.getChild("back"));
		this.list = <fairygui.GList><any>(this.getChild("list"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.touchable = false;
	}

	public showItemList(arr) {
		this._dataList = arr;
		this.list.numItems = this._dataList.length;
		if (this.list.numItems == 1) {
			this.list.x = this.back.x + this.back.width / 2 - 102 / 2;
		} else if (this.list.numItems == 2) {
			this.list.x = this.back.x + this.back.width / 2 - 102 - 34 / 2;
		} else {
			this.list.x = 82;
		}
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		var render: ViewGridBaZT = obj as ViewGridBaZT
		render.isShowEff = true;
		render.vo = this._dataList[index];
	}

	public disposePanel() {
		this.list.numItems = 0;
		PromptBaZhenTu.POOL.push(this);
	}
}
