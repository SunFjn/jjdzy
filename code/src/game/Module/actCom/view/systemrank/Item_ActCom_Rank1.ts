class Item_ActCom_Rank1 extends fairygui.GLabel {
	public c1: fairygui.Controller;
	public viewHead: ViewHead;
	public nameTxt: fairygui.GRichTextField;
	public jdTxt: fairygui.GRichTextField;
	public list: fairygui.GList;
	public bpList: fairygui.GList;

	private _idx:number = 0;//位置
	private _index: number = 0;
	private _awards = [];
	private _bigAwards = [];
	private _cfg:Ipmhdsbdjcsb_326;
	public static URL: string = "ui://qz5r0meldsdy2";
	public static createInstance(): Item_ActCom_Rank1 {
		return <Item_ActCom_Rank1><any>(fairygui.UIPackage.createObject("ActCom_SystemRank", "Item_ActCom_Rank1"));
	}

	public constructor() {
		super();
	}

	public constructFromXML(xml) {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

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
		var bol: boolean = false;
		if (this._rank && this._rank.count >= this._cfg.dj) {
			bol = true;
		}
		let item: ActCom_ListGrid = obj as ActCom_ListGrid;
		item.setVo(this._bigAwards[idx], bol);
	}

	public setVO(idx,cfg:Iwszwxsxspm_325,cfg1:Ipmhdsbdjcsb_326) {
		let self = this;
		self._idx = idx;
		// self._index = id;
		// let cfg = Config.wszwxsxspm_325[id];
		self._cfg = cfg1;
		self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.list.numItems = self._awards.length;

		self._bigAwards = JSON.parse(cfg.reward1);
		self.bpList.numItems = self._bigAwards.length;
	}

	private _rank: Vo_SystemRank;
	/**更新数据 */
	public setData() {
		let self = this;
		self._rank = Model_GlobalMsg.rankData[self._idx - 1];
		if (!self._rank) {
			self.c1.selectedIndex = 0;
		} else {
			self.c1.selectedIndex = 1;
			self.nameTxt.text = self._rank.name;
			let showStr = "";
			// if (Model_GlobalMsg.sysID == UIConst.ACTCOM_RANK) {
			// 	showStr = "寻兽";
			// }
			if(self._cfg)
			{
				showStr = self._cfg.name;
			}
			self.jdTxt.text = showStr + "：" + self._rank.count + "次";
			if (Model_GlobalMsg.myRank == self._idx) {
				self.nameTxt.color = Color.GREENINT;
				self.nameTxt.bold = true;
			} else {
				self.nameTxt.color = Color.WHITEINT;
			}
		}

		let headVO: Vo_SystemRank;
		if (self._idx == 2) {
			headVO = Model_GlobalMsg.headData[0];
		} else {
			headVO = Model_GlobalMsg.headData[1];
		}
		if (!headVO) {
			self.viewHead.setdata(null);
		} else {
			self.viewHead.setdata(headVO.headId, -1, "", headVO.vip, false, null, headVO.country);
		}
		self.bpList.numItems = self._bigAwards.length;
	}

	public clean() {
		let self = this;
		self.bpList.numItems = 0;
	}
}