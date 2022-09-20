class Child_DisShop extends fairygui.GComponent implements ICZFLView {

	public list: fairygui.GList;
	public static URL: string = "ui://qzsojhcrt68wf";

	public static createInstance(): Child_DisShop {
		return <Child_DisShop><any>(fairygui.UIPackage.createObject("chaozhifanli", "Child_DisShop"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandle;
		this.list.setVirtual();
	}

	private renderHandle(index: number, obj: fairygui.GObject) {
		let item = obj as DisShopItem;
		item.setVo(GGlobal.modelCZFL.shopArr[index]);
	}

	public show() {
		this.list.numItems = GGlobal.modelCZFL.shopArr.length;
	}

	public open() {
		GGlobal.control.listen(Enum_MsgType.DISCOUNT_SHOP, this.show, this);
		if (GGlobal.modelCZFL.shopArr.length <= 0) {
			if (ModelEightLock.originalDatas[UIConst.DISCOUNT_SHOP1]) {
				GGlobal.modelEightLock.CG4571(UIConst.DISCOUNT_SHOP1);
			} else {
				GGlobal.modelCZFL.CG_OPEN_DISCOUNTSHOP();
			}
		} else {
			this.show();
		}
	}

	public close() {
		this.list.numItems = 0;
		GGlobal.control.remove(Enum_MsgType.DISCOUNT_SHOP, this.show, this);
	}
}