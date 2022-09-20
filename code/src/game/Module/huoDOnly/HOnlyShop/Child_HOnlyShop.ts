class Child_HOnlyShop extends fairygui.GComponent {

	public list: fairygui.GList;
	public imgHeadbg: fairygui.GLoader;
	public labTime: fairygui.GRichTextField;
	public labTips: fairygui.GRichTextField;

	public static URL: string = "ui://mk3gp0vrujy07";

	public static createInstance(): Child_HOnlyShop {
		return <Child_HOnlyShop><any>(fairygui.UIPackage.createObject("huoDOnly", "Child_HOnlyShop"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);

		this.list.itemRenderer = this.renderHandle
		this.list.callbackThisObj = this;
		this.list.setVirtual();
	}

	private static _instance: Child_HOnlyShop
	public static get instance(): Child_HOnlyShop {
		if (Child_HOnlyShop._instance == null) {
			Child_HOnlyShop._instance = <Child_HOnlyShop><any>(fairygui.UIPackage.createObject("huoDOnly", "Child_HOnlyShop"));
		}
		return Child_HOnlyShop._instance
	}

	disposePanel() {
		let s = this;
		if (s.parent) {
			s.parent.removeChild(s);
		}
		GGlobal.control.remove(Enum_MsgType.HUOD_ONLY_Shop_UI, s.update, s);
		Timer.instance.remove(s.updateX, s);
		s.list.numItems = 0;
		IconUtil.setImg(this.imgHeadbg, null);
	}

	private _act: Vo_Activity;
	public show(p: fairygui.GComponent, act: Vo_Activity): void {
		let s = this;
		this._act = act;
		p.addChild(s);
		s.setXY(0, 275);
		GGlobal.control.listen(Enum_MsgType.HUOD_ONLY_Shop_UI, s.update, s);
		Timer.instance.listen(s.updateX, s, 1000);
		// ImageLoader.instance.loader(Enum_Path.PIC_URL + "zs" + Config.zshd_315[s._act.index].icon + ".jpg", this.imgHeadbg);
		IconUtil.setImg(this.imgHeadbg, Enum_Path.PIC_URL + "zs" + Config.zshd_315[this._act.index].bg + ".jpg");
		s.update();
		GGlobal.modelHuoDOnly.CG_OPEN_UI(act.id);
		s.labTips.text = Config.zshdb_315[act.id].nr
	}
	private _listData
	private update() {
		this._listData = Model_HuoDOnly.getshopArr(this._act.id)
		if (!this._listData) {
			this._listData = []
		}
		this._listData.sort(function (a: Vo_Shop, b: Vo_Shop) { return a.pos - b.pos })
		this.list.numItems = this._listData.length
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: HOnlyShopItem = obj as HOnlyShopItem;
		item.setVo(this._listData[index], this._act);
	}

	private updateX() {
		if (this._act) {
			var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
			if (d < 0) {
				this.labTime.text = "剩余时间：已结束"
			} else {
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d)
			}
		}
		else {
			this.labTime.text = "剩余时间："
		}
	}
}