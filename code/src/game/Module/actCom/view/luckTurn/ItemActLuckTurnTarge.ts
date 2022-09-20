class ItemActLuckTurnTarge extends fairygui.GComponent {

	public labPoint: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnRec: Button1;
	public imgGet: fairygui.GImage;
	public lbNo: fairygui.GRichTextField;

	public static URL: string = "ui://px5jiht9fvskg";

	public static createInstance(): ItemActLuckTurnTarge {
		return <ItemActLuckTurnTarge><any>(fairygui.UIPackage.createObject("actLuckTurn", "ItemActLuckTurnTarge"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.list.itemRenderer = this.renderHandle;
		s.list.callbackThisObj = this;
		s.list.setVirtual();
		s.btnRec.addClickListener(this.onRec, this);
	}

	private _vo: { id: number, st: number }
	private _dataArr1: Array<any>;
	public setVo(v: { id: number, st: number }) {
		this._vo = v;
		let rankCfg: Islfplsb_330 = Config.slfplsb_330[v.id]

		if (v) {
			this.labPoint.text = "获胜次数：" + rankCfg.cs;
			this._dataArr1 = ConfigHelp.makeItemListArr(JSON.parse(rankCfg.show));
		} else {
			this.labPoint.text = "";
			this._dataArr1 = []
		}
		this.lbNo.visible = false;
		if (v.st == 0) {
			this.btnRec.visible = false;
			this.imgGet.visible = false;
			this.btnRec.checkNotice = false;
			this.lbNo.visible = true;
		} else if (v.st == 1) {
			this.btnRec.visible = true;
			this.imgGet.visible = false;
			this.btnRec.checkNotice = true;
		} else {
			this.btnRec.visible = false;
			this.imgGet.visible = true;
		}
		this.list.numItems = this._dataArr1.length;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = v.isShowEff = true;
		v.vo = this._dataArr1[index];
	}

	public clean(): void {
		super.clean()
		this.list.numItems = 0;
	}

	private onRec() {
		if (this._vo.st == 0) {
			ViewCommonWarn.text("翻牌次数不足") 
			return;
		}
		GGlobal.model_LuckTurn.CG_TARGET_GET_10345(Number(this._vo.id));
	}
}