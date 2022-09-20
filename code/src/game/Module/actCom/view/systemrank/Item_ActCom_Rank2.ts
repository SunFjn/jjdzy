class Item_ActCom_Rank2 extends fairygui.GLabel {
	public list: fairygui.GList;
	public checkTxt: fairygui.GRichTextField;
	public bpList: fairygui.GList;

	private _awards = [];
	private _cfg;
	private _bigAwards = [];

	public static URL: string = "ui://qz5r0meldsdy3";
	public static createInstance(): Item_ActCom_Rank2 {
		return <Item_ActCom_Rank2><any>(fairygui.UIPackage.createObject("ActCom_SystemRank", "Item_ActCom_Rank2"));
	}


	public constructor() {
		super();
	}

	public constructFromXML(xml) {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.checkTxt.text = HtmlUtil.createLink("查看排行", true, "");
		self.checkTxt.addEventListener(egret.TextEvent.LINK, self.onHand, self);

		self.list.itemRenderer = self.itemRender;
		self.list.callbackThisObj = self;

		self.bpList.itemRenderer = self.itemRender1;
		self.bpList.callbackThisObj = self;
	}

	private itemRender(idx, grid: ViewGrid) {
		grid.isShowEff = true;
		grid.tipEnabled = true;
		grid.vo = this._awards[idx];
	}

	private itemRender1(idx, grid: ActCom_ListGrid) {
		grid.setVo(this._bigAwards[idx], true);
	}

	private onHand(e: egret.TextEvent) {
		e.stopPropagation();
		e.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.ACTCOM_RANK_RANK, this._cfg);
	}

	public setVO(id,cfg:Iwszwxsxspm_325,cfg1:Ipmhdsbdjcsb_326 = null) {
		let self = this;
		// if (Model_GlobalMsg.sysID == UIConst.ACTCOM_RANK) {
		// 	self._cfg = Config.wszwxsxspm_325[id];
		// }
		self._cfg = cfg;
		self._awards = ConfigHelp.makeItemListArr(JSON.parse(self._cfg.reward));
		self.list.numItems = self._awards.length;
		if (self._cfg.big <= 0) {
			self.bpList.numItems = 0;
		} else {
			self._bigAwards = JSON.parse(self._cfg.reward1);
			self.bpList.numItems = this._bigAwards.length;
		}
	}

	public clean() {
		let self = this;
		self.bpList.numItems = 0;
		self.list.numItems = 0;
	}
}