class Item_ActCom_PXSB extends fairygui.GComponent{
	public list: fairygui.GList;
	public btnGet: Button1;
	public btnGo: Button0;
	public lab: fairygui.GRichTextField;
	public imgGet: fairygui.GImage;

	private _cfg:Ipxsb_778;
	private _listData: Array<IGridImpl>;

	public static URL:string = "ui://qb4y6bxephch1";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		s.list.itemRenderer = s.renderHandle;
		s.list.callbackThisObj = s;
	}

	public setData(arr, day:number)
	{
		let self = this;
		let model = GGlobal.model_ActPXSB;
		self._cfg = Config.pxsb_778[arr[0]];
		if(!self._cfg)   return;

		self.btnGo.visible = arr[1] == 0? true:false;
		self.btnGet.visible = self.btnGet.checkNotice = arr[1] == 1? true:false;
		self.imgGet.visible = arr[1] == 2? true:false;

		let color = day >= self._cfg.ts ? Color.GREENSTR : Color.REDSTR;
		self.lab.text = BroadCastManager.reTxt("累计{0}天消费满{1}元宝<font color='{2}'>({3}/{4})</font>", self._cfg.ts, model.getWanText1(self._cfg.xf), color, day, self._cfg.ts);

		self._listData = ConfigHelp.makeItemListArr(self._cfg.jl);
		self.list.numItems = self._listData ? self._listData.length : 0;

		self.btnGo.addClickListener(self.onClickGo, self);
		self.btnGet.addClickListener(self.onClickRec, self);
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: ViewGrid = obj as ViewGrid;
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = this._listData[index];
	}

	public clean() {
		super.clean();
		this.list.numItems = 0;
		this.btnGo.removeClickListener(this.onClickGo, this);
		this.btnGet.removeClickListener(this.onClickRec, this);
	}

	private onClickGo(e: egret.TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.CANGBAOGE);
		e.stopImmediatePropagation();
		e.stopPropagation();
	}

	private onClickRec(): void {
		GGlobal.model_ActPXSB.CG_GET(0, this._cfg.id);
	}
}