class ItemLCQSMapDetail extends fairygui.GButton {

	public list: fairygui.GList;
	public txtName: fairygui.GTextField;
	public lbRew: fairygui.GTextField;
	public imgBg: fairygui.GLoader;
	public imgPass: fairygui.GImage;
	public chooseImg: fairygui.GImage;
	public maskBg: fairygui.GImage;

	public static URL: string = "ui://7a366usasr401m";

	public static createInstance(): ItemLCQSMapDetail {
		return <ItemLCQSMapDetail><any>(fairygui.UIPackage.createObject("zjyw", "ItemLCQSMapDetail"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);

		this.list.itemRenderer = this.rendHander;
		this.list.callbackThisObj = this;
	}

	private _vo
	public set vo(v: Isix_279) {
		this._vo = v;
		if (!v) {
			this.visible = false;
			return
		}
		this.visible = true;
		let index = v.id % 1000
		this.txtName.text = "第" + StrFilter.getChineseNum(index) + "关"

		//已通关
		let isPass = GGlobal.model_LiuChuQS.curGuan > v.id;
		this.imgPass.visible = isPass;
		// if (index > 4) index = 4;
		IconUtil.setImg(this.imgBg, Enum_Path.GUAN_QIA_URL + "guanqia_" + index + ".png");
		// this.maskBg.visible = GGlobal.model_LiuChuQS.curGuan < v.id
		this.imgBg.grayed = GGlobal.model_LiuChuQS.curGuan < v.id
		this.lbRew.text = isPass ? "通关奖励" : "首通奖励";
		this.lbRew.color = isPass ? 0x00ff00 : 0xffc334;
		this._rewArr = isPass ? ConfigHelp.makeItemListArr(JSON.parse(v.show)) : ConfigHelp.makeItemListArr(JSON.parse(v.reward));
		this.list.numItems = this._rewArr.length;
	}

	public get vo() {
		return this._vo;
	}

	public clean() {
		super.clean();
		this.list.numItems = 0;
		IconUtil.setImg(this.imgBg, null);
	}

	private _rewArr: IGridImpl[];
	private rendHander(index, grid: ViewGrid) {
		grid.isShowEff = true;
		grid.tipEnabled = true;
		grid.vo = this._rewArr[index]
	}
}