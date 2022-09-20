class ItemLCQSMap extends fairygui.GComponent {

	public loader: fairygui.GLoader;

	public static URL: string = "ui://7a366usasr401l";

	private item: ItemLCQSMapDetail

	public static createInstance(): ItemLCQSMap {
		return <ItemLCQSMap><any>(fairygui.UIPackage.createObject("zjyw", "ItemLCQSMap"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.loader = <fairygui.GLoader><any>(this.getChild("loader"));
		this.item = <ItemLCQSMapDetail><any>(this.getChild("item"));
	}
	private _guan: Isix_279;
	private _bgUrl;
	public setVo(guan: Isix_279, selId) {
		this._guan = guan
		this.item.vo = guan
		this.addLister();

		if (guan && guan.id == selId) {
			this.item.selected = true;
		} else {
			this.item.selected = false;
		}
		let index = ((guan.id % 1000) - 1) % 3
		this._bgUrl = Enum_Path.GUAN_QIA_URL + "lcqsMap" + index + ".jpg";

		ImageLoader.instance.loader(this._bgUrl, this.loader);
		// IconUtil.setImg(this.loader, this._bgUrl);

		if (index == 0) {
			this.item.y = 38;
		} else if (index == 1) {
			this.item.y = 105;
		} else {
			this.item.y = 70;
		}
	}

	private addLister() {
		GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.guan_sel, this.upSel, this);
		this.item.addClickListener(this.selectPage, this);
	}

	private removeLister() {
		// IconUtil.setImg(this.loader, this._bgUrl);
		this.loader.texture = null
		this.item.clean()
		this.item.removeClickListener(this.selectPage, this);
		GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.guan_sel, this.upSel, this);
	}

	private selectPage(e: egret.TouchEvent) {
		let target: ItemLCQSMapDetail = e.currentTarget as ItemLCQSMapDetail;
		let v = target.vo
		if (GGlobal.model_LiuChuQS.curGuan < v.id) {
			ViewCommonWarn.text("需要通关前一关卡");
			target.selected = false;
			return
		}
		let arr = GGlobal.model_LiuChuQS.teamMyArr
		if (arr.length > 0 && arr[0].guan != v.id) {
			ViewCommonWarn.text("退出组队才能更换关卡");
			target.selected = false;
			return
		}
		GGlobal.model_LiuChuQS.notify(Model_LiuChuQS.guan_sel, v.id);
		GGlobal.model_LiuChuQS.notify(Model_LiuChuQS.guan_sel_msg, v.id);
	}

	private upSel(id) {
		if (this._guan && this._guan.id == id) {
			this.item.selected = true;
		} else {
			this.item.selected = false;
		}
	}

	public clean() {
		super.clean();
		this.removeLister();
	}
}
