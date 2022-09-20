class HeFu_CZFL_Item extends fairygui.GComponent {
	public lab: fairygui.GRichTextField;
	public btnGet: Button1;
	public imgGet: fairygui.GImage;
	public list: fairygui.GList;
	private _listData: Array<IGridImpl>;
	private _status: number;
	private _cfg: Ihfkhczfljl_286;
	public btnRec: Button0;

	public static URL: string = "ui://07jsdu7hqftx3";

	public static createInstance(): HeFu_CZFL_Item {
		return <HeFu_CZFL_Item><any>(fairygui.UIPackage.createObject("hefuActCZFL", "HeFu_CZFL_Item"));
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
		this.btnGet.addClickListener(this.onClickGet, this);
		this.btnRec.addClickListener(this.onClickRec, this);
	}

	public setVo(obj) {
		this._cfg = Config.hfkhczfljl_286[obj.id];
		var colorStr = obj.num >= this._cfg.cs ? Color.GREENSTR : Color.REDSTR;
		this.lab.text = this._cfg.name + "<font color='" + colorStr + "'>（" + obj.num + "/" + this._cfg.cs + "）</font>";
		this._status = obj ? obj.status : 0;
		if (this._status == 0) {//前往充值
			this.btnGet.touchable = this.btnGet.visible = false;
			this.btnRec.touchable = this.btnRec.visible = true;
			this.btnGet.grayed = true;
			this.imgGet.visible = false
		} else if (this._status == 1) {//领取
			this.btnGet.checkNotice = this.btnGet.touchable = this.btnGet.visible = true;
			this.btnRec.touchable = this.btnRec.visible = false;
			this.btnGet.grayed = false;
			this.imgGet.visible = false
		} else if (this._status == 2) {//已领取
			this.btnGet.touchable = this.btnGet.visible = false;
			this.btnRec.touchable = this.btnRec.visible = false;
			this.imgGet.visible = true
		} else {
			this.btnGet.touchable = this.btnGet.visible = false;
			this.btnRec.touchable = this.btnRec.visible = false;
			this.imgGet.visible = false
		}
		this._listData = null;
		//奖励显示
		this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(this._cfg.reward));
		this.list.numItems = this._listData ? this._listData.length : 0
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: ViewGrid = obj as ViewGrid;
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = this._listData[index];
	}

	private onClickGet(): void {
		if (this._status == 0) {
			ViewCommonWarn.text("领取条件不足");
			return;
		}
		GGlobal.model_actCom.CG_CZFL_GETREWARD(this._cfg.id);
	}

	private onClickRec(e: egret.TouchEvent): void {
		GGlobal.layerMgr.open(this._cfg.open);
		e.stopImmediatePropagation();
		e.stopPropagation();
	}

	public clean() {
		super.clean();
		this.list.numItems = 0;
	}
}