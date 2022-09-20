class Child_QMKH extends fairygui.GComponent {

	public list: fairygui.GList;
	public timeLb: fairygui.GRichTextField;
	public titleBg: fairygui.GLoader;
	public static URL: string = "ui://vrex0iz4tznx4";

	public static createInstance(): Child_QMKH {
		return <Child_QMKH><any>(fairygui.UIPackage.createObject("QMKH", "Child_QMKH"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		a.list = <fairygui.GList><any>(a.getChild("list"));
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandler;
		a.list.setVirtual();
		a.timeLb = <fairygui.GRichTextField><any>(a.getChild("timeLb"));
		a.titleBg = <fairygui.GLoader><any>(a.getChild("titleBg"));
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let item = obj as QMKHItem;
		item.show(this.arr[index], this.panelId);
	}

	public panelId = 0;
	private arr = [];
	private times = 0;
	private updateShow() {
		let a = this;
		switch (a.panelId) {
			case UIConst.QUANMIN_KUANGHUAN_BOSS:
				a.arr = GGlobal.modelqmkh.bossArr;
				break;
			case UIConst.QUANMIN_KUANGHUAN_XIAOXIONG:
				a.arr = GGlobal.modelqmkh.xiaoxiongArr;
				break;
			case UIConst.QUANMIN_KUANGHUAN_LVBU:
				a.arr = GGlobal.modelqmkh.lvbuArr;
				break;
			case UIConst.QUANMIN_KUANGHUAN_FUHUI:
				a.arr = GGlobal.modelqmkh.fuhuiArr;
				break;
		}
		a.list.numItems = a.arr.length;
		IconUtil.setImg(a.titleBg, Enum_Path.BACK_URL + a.panelId + ".jpg");
		// let vo = Model_Activity.getActivty1(UIConst.QUANMIN_KUANGHUAN, a.panelId);
		let vo = GGlobal.modelActivity.get(UIConst.QUANMIN_KUANGHUAN, a.panelId);
		a.times = vo.end - Math.ceil(Model_GlobalMsg.getServerTime() / 1000);
		Timer.instance.listen(a.timeHandle, a, 1000);
	}

	private timeHandle() {
		this.times--;
		this.timeLb.text = "活动剩余时间：" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(this.times), Color.getColorStr(2));
	}

	public open() {
		let a = this;
		GGlobal.modelqmkh.CG_QUANMINKUANGHUAN_OPENUI(a.panelId);
		GGlobal.control.listen(Enum_MsgType.QUANMIN_KUANGHUAN, a.updateShow, a);
	}

	public close() {
		let a = this;
		Timer.instance.remove(this.timeHandle, this);
		for (let i = 0; i < this.list._children.length; i++) {
			let item = this.list._children[i] as QMKHItem;
			item.clean();
		}
		GGlobal.control.remove(Enum_MsgType.QUANMIN_KUANGHUAN, a.updateShow, a);
		IconUtil.setImg(a.titleBg, null);
		a.list.numItems = 0;
	}
}