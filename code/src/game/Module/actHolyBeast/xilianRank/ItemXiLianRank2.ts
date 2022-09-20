class ItemXiLianRank2 extends fairygui.GComponent{
	public checkTxt: fairygui.GRichTextField;
	public list: fairygui.GList;
	private _awards = [];
	public static URL = "ui://d5y9ngt6cl031q";
	private _cfg:Ishxlpm_268;
	public c1: fairygui.Controller;
	public bpList: fairygui.GList;
	private _bigAwards = [];

	public static createInstance(): ItemXiLianRank2 {
		return <ItemXiLianRank2><any>(fairygui.UIPackage.createObject("actHolyBeast", "ItemXiLianRank2"));
	}

	public constructor() {
		super();
	}

	public constructFromXML(xml) {
		super.constructFromXML(xml);
		let self = this;
		self.list = <fairygui.GList><any>(self.getChild("list"));
		self.c1 = self.getController("c1");
		self.checkTxt = <fairygui.GRichTextField><any>(self.getChild("checkTxt"));
		self.bpList = <fairygui.GList><any>(self.getChild("bpList"));

		self.checkTxt.text = HtmlUtil.createLink("查看排行", true, "")
		self.checkTxt.addEventListener(egret.TextEvent.LINK, self.onHand, self);

		self.list.itemRenderer = self.itemRender;
        self.list.callbackThisObj = self;

		self.bpList.itemRenderer = self.itemRender1;
        self.bpList.callbackThisObj = self;
	}

	private itemRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this._awards[idx];
	}

	private itemRender1(idx, obj) {
		let item: XiLianListGrid = obj as XiLianListGrid;
		item.setVo(this._bigAwards[idx],true);
	}

	private onHand(e:egret.TextEvent) {
		e.stopPropagation();
        GGlobal.layerMgr.open(UIConst.ACTHB_XILIANRANK_VIEW,this._cfg);
    }

	public setVO(id)
	{
		let self = this;
		self._cfg = Config.shxlpm_268[id];
		self._awards = ConfigHelp.makeItemListArr(JSON.parse(self._cfg.reward));
		self.list.numItems = self._awards.length;
		if(id == 4)
		{
			self.c1.selectedIndex = 0;
		}else{
			self.c1.selectedIndex = 1;
		}

		if(self._cfg.reward1 <= 0)
		{
			self.bpList.numItems = 0;
		}else{
			self._bigAwards = JSON.parse(self._cfg.reward1);
			self.bpList.numItems = this._bigAwards.length;
		}
	}
}