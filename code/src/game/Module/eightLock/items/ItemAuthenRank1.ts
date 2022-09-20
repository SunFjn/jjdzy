class ItemAuthenRank1 extends fairygui.GComponent{
	public list: fairygui.GList;
	public bpList: fairygui.GList;
	private _awards = [];
	private _bigAwards = [];
	public c1: fairygui.Controller;
	public nameTxt: fairygui.GRichTextField;
	public jdTxt: fairygui.GRichTextField;
	private _index:number = 0;
	public viewHead: ViewHead;
	public secondImg: fairygui.GImage;
	public thirdImg: fairygui.GImage;

	public static URL = "ui://hincjqblk8x01g";

	public static createInstance(): ItemAuthenRank1 {
		return <ItemAuthenRank1><any>(fairygui.UIPackage.createObject("eightLock", "ItemAuthenRank1"));
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
		var bol:boolean = false;
		if(this._rank && this._rank.jdCount >= Config.xtcs_004[6802].num)
		{
			bol = true;
		}
		let item: AuthenListGrid = obj as AuthenListGrid;
		item.setVo(this._bigAwards[idx],bol);
	}

	public setVO(id)
	{
		let self = this;
		self._index = id;
		let cfg = Config.bmjsjdpm_262[id];
		self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.list.numItems = this._awards.length;

		self._bigAwards = JSON.parse(cfg.big);
		self.bpList.numItems = this._bigAwards.length;

		self.secondImg.visible = false;
		self.thirdImg.visible = false;
		if(id == 2)
		{
			self.secondImg.visible = true;
		}else{
			self.thirdImg.visible = true;
		}
	}

	private _rank:AuthenRankVO;
	/**刷新数据 */
	public setData()
	{
		let self = this;
		self._rank = ModelEightLock.rankData[self._index - 1];
		if(!self._rank)
		{
			self.c1.selectedIndex = 0;
		}else{
			self.c1.selectedIndex = 1;
			self.nameTxt.text = self._rank.name;
			self.jdTxt.text = "符文完美鉴定：" + self._rank.jdCount + "次";
			if(ModelEightLock.myRank == self._index)
			{
				self.nameTxt.color = Color.GREENINT;
				self.nameTxt.bold = true;
			}else{
				self.nameTxt.color = Color.WHITEINT;
			}
		}

		let headVO:AuthenHeadVO;
		if(self._index == 2)
		{
			headVO = ModelEightLock.headData[0];
		}else{
			headVO = ModelEightLock.headData[1];
		}
		if(!headVO)
		{
			self.viewHead.setdata(null);
		}else{
			self.viewHead.setdata(headVO.headId, -1, "", headVO.vip, false, null, headVO.country);
		}

		self.bpList.numItems = self._bigAwards.length;
	}

	public clean() {
		super.clean();
		this.list.numItems = 0;
		this.bpList.numItems = 0;
	}
}