class WishTreeTargetItem extends fairygui.GComponent{
	public labPoint: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnRec: Button0;
	public imgGet: fairygui.GImage;
	public n4: fairygui.GRichTextField;

	public static URL:string = "ui://zyevj37nlonve";

	public static createInstance():WishTreeTargetItem {
		return <WishTreeTargetItem><any>(fairygui.UIPackage.createObject("ActCom_WishTree","WishTreeTargetItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();

		this.btnRec.addClickListener(this.onRec, this);
	}

	private _vo: WishTreeVO;
	private _dataArr: Array<any>;
	private _systemId:number;
	public setVo(v: WishTreeVO, index, systemId:number) {
		this._vo = v;
		let rankCfg = Config.xysslb_328[v.id];
		this._systemId = systemId;

		if (v) {
			this.labPoint.text = "许愿次数：" + (rankCfg as Ixysslb_328).time;
			this._dataArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rankCfg.reward));
		} else {
			this.labPoint.text = "";
			this._dataArr = []
		}
		this.n4.visible = false;
		if (v.status == 0) {
			this.btnRec.visible = false;
			this.imgGet.visible = false;
			this.btnRec.checkNotice = false;
			this.n4.visible = true;
		} else if (v.status == 1) {
			this.btnRec.visible = true;
			this.imgGet.visible = false;
			this.btnRec.checkNotice = true;
		} else {
			this.btnRec.visible = false;
			this.imgGet.visible = true;
		}
		this.list.numItems = this._dataArr.length;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true;
		v.isShowEff = true;
		v.vo = this._dataArr[index];
	}

	public clean(): void {
		super.clean()
		this.list.numItems = 0;
	}

	private onRec() {
		if (this._vo.status == 0) {
			ViewCommonWarn.text("许愿次数不足")
			return;
		}
		GGlobal.modelWishTree.CG_GET_TARGETAWARD(this._vo.id, this._systemId);
	}
}