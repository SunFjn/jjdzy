class ItemShaoZhuQyRank2 extends fairygui.GComponent{
	public checkTxt: fairygui.GRichTextField;
	public list: fairygui.GList;
	private _awards = [];
	public static URL = "ui://w5ll6n5jfoqs1z";
	private _cfg:Iszqypm_272;
	public c1: fairygui.Controller;
	public bpList: fairygui.GList;
	private _bigAwards = [];

	public static createInstance(): ItemAuthenRank2 {
		return <ItemAuthenRank2><any>(fairygui.UIPackage.createObject("shaozhuAct", "ItemShaoZhuQyRank2"));
	}

	public constructor() {
		super();
	}

	public constructFromXML(xml) {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);

		this.checkTxt.text = HtmlUtil.createLink("查看排行", true, "");
		this.checkTxt.addEventListener(egret.TextEvent.LINK, this.onHand, this);

		this.list.itemRenderer = this.itemRender;
        this.list.callbackThisObj = this;

		this.bpList.itemRenderer = this.itemRender1;
        this.bpList.callbackThisObj = this;
	}

	private itemRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this._awards[idx];
	}

	private itemRender1(idx, obj) {
		let item: QiYuanListGrid = obj as QiYuanListGrid;
		item.setVo(this._bigAwards[idx],true);
	}

	private onHand(e:egret.TextEvent) {
		e.stopPropagation();
        GGlobal.layerMgr.open(UIConst.SHAOZHU_QY_RANK_VIEW,this._cfg);
    }

	public setVO(id)
	{
		let self = this;
		self._cfg = Config.szqypm_272[id];
		self._awards = ConfigHelp.makeItemListArr(JSON.parse(self._cfg.reward));
		self.list.numItems = self._awards.length;
		if(id == 4)
		{
			self.c1.selectedIndex = 0;
		}else{
			self.c1.selectedIndex = 1;
		}

		if(self._cfg.big <= 0)
		{
			self.bpList.numItems = 0;
		}else{
			self._bigAwards = JSON.parse(self._cfg.big);
			self.bpList.numItems = this._bigAwards.length;
		}
	}
}