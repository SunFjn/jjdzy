class Child_ActComDouble extends fairygui.GComponent implements IPanel {

	public imgBg: fairygui.GLoader;
	public list: fairygui.GList;
	public n9: fairygui.GImage;
	public labTime: fairygui.GRichTextField;
	public lab1: fairygui.GRichTextField;
	public n8: fairygui.GImage;
	public lab2: fairygui.GRichTextField;
	public lab3: fairygui.GRichTextField;

	public static URL: string = "ui://746rywv8e3qh0";

	public static pkg = "actComDouble";

	public static createInstance(): Child_ActComDouble {
		return <Child_ActComDouble><any>(fairygui.UIPackage.createObject("actComDouble", "Child_ActComDouble"));
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
		f(ItemActComDouble.URL, ItemActComDouble);
	}

	initView(pParent: fairygui.GObject) {
		let s = this;
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
	}
	openPanel(pData?: any) {
		let self = this;
		self.y = 264;
		self.list.numItems = 4
		self._act = pData;
		Timer.instance.listen(self.onUpdate, self);
		//红点
		let r = GGlobal.reddot
		r.setCondition(UIConst.ACTCOM_DOUBLE, 0, false);
		r.notify(UIConst.ACTCOM);
		IconUtil.setImg(self.imgBg, Enum_Path.ACTCOM_URL + "doubleBg.jpg");
	}
	closePanel(pData?: any) {
		let self = this;
		self.list.numItems = 0
		Timer.instance.remove(self.onUpdate, self);
		IconUtil.setImg(self.imgBg, null);
	}
	dispose() {
		super.dispose()
		this.closePanel()
	}

	private itemRender(idx, obj) {
		let item: ItemActComDouble = obj as ItemActComDouble;
		item.vo = idx;
	}

	private _act
	private onUpdate() {
		let self = this;
		const end = self._act ? self._act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			self.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			self.labTime.text = "00:00:00";
		}
	}
}