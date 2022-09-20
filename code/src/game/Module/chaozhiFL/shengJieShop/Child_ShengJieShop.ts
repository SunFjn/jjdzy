class Child_ShengJieShop extends fairygui.GComponent implements ICZFLView {

	public list: fairygui.GList;
	public timeLb: fairygui.GRichTextField;

	public static URL: string = "ui://qzsojhcrpdbd1h";

	public static createInstance(): Child_ShengJieShop {
		return <Child_ShengJieShop><any>(fairygui.UIPackage.createObject("chaozhifanli", "Child_ShengJieShop"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.list = <fairygui.GList><any>(s.getChild("list"));
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderHandle;
		s.list.setVirtual();
		s.timeLb = <fairygui.GRichTextField><any>(s.getChild("timeLb"));
	}

	private renderHandle(index: number, obj: fairygui.GObject) {
		let item = obj as DisShopItem;
		item.setVo(GGlobal.modelCZFL.shengjieShop[index]);
	}

	public show() {
		let s = this;
		this.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(Math.floor( Model_GlobalMsg.getkaiFuTime() / 1000));
		this.list.numItems = GGlobal.modelCZFL.shengjieShop.length;
		Timer.instance.listen(s.timeHandle, s, 1000);
	}

	private timeHandle() {
		this.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(Math.floor( Model_GlobalMsg.getkaiFuTime() / 1000));
	}

	public open() {
		let s = this;
		GGlobal.control.listen(Enum_MsgType.SHENGJIE_SHOP, s.show, s);
		if (GGlobal.modelCZFL.shengjieShop.length <= 0) {
			GGlobal.modelCZFL.CG_OPEN_SHENGJIESHOP();
		} else {
			s.show();
		}
	}

	public close() {
		let s = this;
		s.list.numItems = 0;
		GGlobal.control.remove(Enum_MsgType.SHENGJIE_SHOP, s.show, s);
		Timer.instance.remove(s.timeHandle, s);
	}
}