class Child_ActCom_Rank extends fairygui.GComponent implements IPanel {

	public c1: fairygui.Controller;
	public bg: fairygui.GLoader;
	public timeTxt: fairygui.GTextField;
	public myRankTxt: fairygui.GRichTextField;
	public myAuthenTxt: fairygui.GRichTextField;
	public sbTxt: fairygui.GRichTextField;
	public bpTxt: fairygui.GRichTextField;
	public list: fairygui.GList;
	public bpList: fairygui.GList;
	public authenTxt: fairygui.GTextField;
	public nameTxt: fairygui.GTextField;
	public container: EmptyComp;
	public item2: Item_ActCom_Rank1;
	public item3: Item_ActCom_Rank1;
	public item4: Item_ActCom_Rank2;
	public item5: Item_ActCom_Rank2;
	public btnGo: Button0;

	private _cfg:Iwszwxsxspm_325;
	private _cfg1:Ipmhdsbdjcsb_326;
	private _arr:Iwszwxsxspm_325[] = [];

	public static pkg = "ActCom_SystemRank";
	public static URL: string = "ui://qz5r0meldsdy0";
	public static createInstance(): Child_ActCom_Rank {
		return <Child_ActCom_Rank><any>(fairygui.UIPackage.createObject("ActCom_SystemRank", "Child_ActCom_Rank"));
	}

	public constructor() {
		super();
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(Item_ActCom_Rank.URL, Item_ActCom_Rank);
		f(Item_ActCom_Rank1.URL, Item_ActCom_Rank1);
		f(Item_ActCom_Rank2.URL, Item_ActCom_Rank2);
		f(ActCom_ListGrid.URL, ActCom_ListGrid);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.list.itemRenderer = self.itemRender;
		self.list.callbackThisObj = self;

		self.bpList.itemRenderer = self.itemRender1;
		self.bpList.callbackThisObj = self;
	}

	public initView(pParent: fairygui.GObject) {

	}

	/**上榜条件 */
	private rankCount = 0;
	/**大奖条件 */
	private bigCount = 0;
	private showStr = "";
	private vo: Vo_Activity;
	public openPanel(pData?: Vo_Activity): void {
		let self = this;
		self.vo = pData;
		self._arr = [];
		let cfg:Ixitong_001 = Config.xitong_001[pData.id];
		if (cfg.or == 0) {
			
			// self.rankCount = Config.xtcs_004[7150].num;
			// self.bigCount = Config.xtcs_004[7151].num;
			// self.showStr = "寻兽";
			// cfg = Config.wszwxsxspm_325[(self.vo.qs - 1) * 5 + 1];

			GGlobal.reddot.listen(UIConst.XIANSHAN_XUNSHOU, self.checkNotice, self);			
			GGlobal.modelEightLock.CG4571(pData.id);
		}else{
			GGlobal.modelActivity.CG_OPENACT(pData.id);
		}
		self._cfg1 = Config.pmhdsbdjcsb_326[pData.id];
		self.rankCount = self._cfg1.sb;
		self.bigCount = self._cfg1.dj;
		self.showStr = self._cfg1.name;
		self._arr = GGlobal.model_actCom.getRankCfgs(pData.qs,pData.id);
		self._cfg = self._arr[0];
		IconUtil.setImg(self.bg, "resource/image/pic/bg7.jpg");
		self._awards = ConfigHelp.makeItemListArr(JSON.parse(self._cfg.reward));
		self.list.numItems = self._awards.length;
		self._bigAwards = JSON.parse(self._cfg.reward1);
		self.bpList.numItems = self._bigAwards.length;
		// GGlobal.modelEightLock.CG4571(pData.id);
		GGlobal.control.listen(UIConst.ACTCOM_RANK, self.onUpdate, self);
		self.btnGo.addClickListener(self.goHandler, self);
	}

	/**销毁 */
	public closePanel(): void {
		let self = this;
		IconUtil.setImg(self.bg, null);
		self.list.numItems = 0;
		self.item2.clean();
		self.item3.clean();
		self.item4.clean();
		self.item5.clean();
		Timer.instance.remove(self.onTick, self);
		GGlobal.control.remove(UIConst.ACTCOM_RANK, self.onUpdate, self);
		self.container.setUIRole(null);
		self.btnGo.removeClickListener(self.goHandler, self);
	}

	private _awards = [];
	private _bigAwards = [];
	private itemRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this._awards[idx];
	}

	private itemRender1(idx, obj) {
		var bol: boolean = false;
		if (this._firstVO && this._firstVO.count >= this.bigCount) {
			bol = true;
		}
		let item: ActCom_ListGrid = obj as ActCom_ListGrid;
		item.setVo(this._bigAwards[idx], bol);
	}

	private _firstVO: Vo_SystemRank;
	/**更新数据 */
	private onUpdate() {
		let self = this;
		const end = Model_GlobalMsg.endTime;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		const timeRemain = end - servTime;
		if (timeRemain > 0) {
			self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond4(end - servTime);
			Timer.instance.listen(self.onTick, self, 1000);
		} else {
			self.timeTxt.text = "剩余时间：活动已结束";
			self.btnGo.visible = false;
		}

		for (let i = 2; i < 6; i++) {
			// self["item" + i].setVO(i + (self.vo.qs - 1) * 5, i);
			let cfg:Iwszwxsxspm_325 = self._arr[i - 1];
			self["item" + i].setVO(i,self._arr[i - 1],self._cfg1);		
		}
		self.item2.setData();
		self.item3.setData();
		let color0 = Model_GlobalMsg.myCount >= self.rankCount ? 2 : 6;
		let color1 = Model_GlobalMsg.myCount >= self.bigCount ? 2 : 6;
		self.sbTxt.text = "上榜条件：" + HtmlUtil.fontNoSize(self.showStr + self.rankCount + "次", Color.getColorStr(color0));
		self.bpTxt.text = "大奖条件：" + HtmlUtil.fontNoSize(self.showStr + self.bigCount + "次", Color.getColorStr(color1));

		if (!Model_GlobalMsg.rankData || Model_GlobalMsg.rankData.length <= 0) {
			self.c1.selectedIndex = 0;
		} else {
			self.c1.selectedIndex = 1;
			self._firstVO = Model_GlobalMsg.rankData[0];
			self.nameTxt.text = self._firstVO.name;
			self.authenTxt.text = self.showStr + "：" + self._firstVO.count + "次";
			if (Model_GlobalMsg.myRank == 1) {
				self.nameTxt.color = Color.GREENINT;
				self.nameTxt.bold = true;
			} else {
				self.nameTxt.color = Color.WHITEINT;
			}

			self.container.setUIRole(Model_GlobalMsg.firstJob);
		}

		if (Model_GlobalMsg.myRank == 0 || Model_GlobalMsg.myRank > 20 || Model_GlobalMsg.myCount < self.rankCount) {
			self.myRankTxt.text = "我的排名：未上榜";
		} else {
			self.myRankTxt.text = "我的排名：" + Model_GlobalMsg.myRank;
		}
		self.myAuthenTxt.text = self.showStr + "：" + Model_GlobalMsg.myCount + "次";
		self.bpList.numItems = self._bigAwards.length;
	}

	private onTick() {
		let self = this;
		const end = Model_GlobalMsg.endTime;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		const timeRemain = end - servTime;
		if (timeRemain > 0) {
			self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond4(end - servTime);
			self.btnGo.visible = true;
		} else {
			self.timeTxt.text = "剩余时间：活动已结束";
			Timer.instance.remove(self.onTick, self);
			self.btnGo.visible = false;
		}
	}

	private goHandler() {
		let self = this;
		if (self.vo.id == UIConst.ACTCOM_RANK) {
			GGlobal.layerMgr.open(UIConst.XIANSHAN_XUNSHOU);
		}else if(self.vo.id == UIConst.ACTCOM_JDPM)
		{
			GGlobal.layerMgr.open(UIConst.BAZHENTU_JIANDING);
		}else if(self.vo.id == UIConst.ACTCOM_QYPM)
		{
			GGlobal.layerMgr.open(UIConst.SHAOZHU_QIYUAN);
		}
	}

	private checkNotice() {
		let self = this;
		if (self.vo.id == UIConst.ACTCOM_RANK) {
			let count = Model_Bag.getItemCount(GGlobal.modelxsxs.itemID);
			self.btnGo.checkNotice = count > 0;
		}
	}
}