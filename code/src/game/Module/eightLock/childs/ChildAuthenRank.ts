/**
 * 鉴定排名活动界面
 */
class ChildAuthenRank extends ABActUI{
	public bg: fairygui.GLoader;
	public myRankTxt: fairygui.GRichTextField;
	public myAuthenTxt: fairygui.GRichTextField;
	public sbTxt: fairygui.GRichTextField;
	public bpTxt: fairygui.GRichTextField;
	public timeTxt: fairygui.GTextField;
	public nameTxt: fairygui.GTextField;
	public authenTxt: fairygui.GTextField;
	public list: fairygui.GList;
	public bpList: fairygui.GList;
	public item2: ItemAuthenRank1;
	public item3: ItemAuthenRank1;
	public item4: ItemAuthenRank2;
	public item5: ItemAuthenRank2;
	public c1: fairygui.Controller;
	private container: EmptyComp;
	public btnGo: Button0;

	protected childrenCreated() {
		super.childrenCreated();
		this.list.itemRenderer = this.itemRender;
        this.list.callbackThisObj = this;

		this.bpList.itemRenderer = this.itemRender1;
        this.bpList.callbackThisObj = this;

		this.item2.setVO(2);
		this.item3.setVO(3);
		this.item4.setVO(4);
		this.item5.setVO(5);
	}

	public getView() {
        return fairygui.UIPackage.createObject("eightLock", "ChildAuthenRank").asCom;
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
		var bol:boolean = false;
		if(this._firstVO && this._firstVO.jdCount >= Config.xtcs_004[6802].num)
		{
			bol = true;
		}
		let item: AuthenListGrid = obj as AuthenListGrid;
		item.setVo(this._bigAwards[idx],bol);
	}

	public onShow() {
		let self = this;
		IconUtil.setImg(self.bg, "resource/image/pic/bg5.jpg");
		let cfg = Config.bmjsjdpm_262[1];
		self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.list.numItems = self._awards.length;

		self._bigAwards = JSON.parse(cfg.big);
		self.bpList.numItems = self._bigAwards.length;

		// GGlobal.modelEightLock.CG4571(UIConst.AUTHEN_RANK);
		GGlobal.modelEightLock.CG_OPEN_UI();
		GGlobal.modelEightLock.listen(ModelEightLock.msg_jdpm, self.onUpdate, self);
		self.onUpdate();

		self.btnGo.addClickListener(self.goHandler, self);
	}

	public onHide() {
		let self = this;
		IconUtil.setImg(self.bg, null);
		self.list.numItems = 0;
		self.bpList.numItems = 0;
		GGlobal.modelEightLock.remove(ModelEightLock.msg_jdpm, self.onUpdate, self);
		self.container.setUIRole(null);
		self.btnGo.removeClickListener(self.goHandler, self);
		Timer.instance.remove(self.onTick, self);
	}

	private _firstVO:AuthenRankVO;
	/**更新数据 */
	private onUpdate() {
		let self = this;
		self.item2.setData();
		self.item3.setData();
		const end = ModelEightLock.endTime;
        const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		const timeRemain = end - servTime;
        if (timeRemain > 0) {
			if(timeRemain >= 24*60*60*1000)
			{
            	self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond5(end - servTime);
			}else{
				self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond4(end - servTime);
			}
            Timer.instance.listen(self.onTick, self, 1000);
			if(self.btnGo.visible)
			{
				self.btnGo.checkNotice = GGlobal.modelEightLock.getAuthenNot();
			}
        } else {
            self.timeTxt.text = "剩余时间：活动已结束";
			self.btnGo.visible = false;
			self.btnGo.checkNotice = false;
			const not = GGlobal.modelEightLock.getAuthenNot();
        	GGlobal.reddot.setCondition(UIConst.AUTHEN_RANK, 0, not);
        }

		let color0 = ModelEightLock.myjdCount >= Config.xtcs_004[6801].num ? 2 : 6;
		let color1 = ModelEightLock.myjdCount >= Config.xtcs_004[6802].num ? 2 : 6;
		self.sbTxt.text = "上榜条件：" + HtmlUtil.fontNoSize("符文完美鉴定" + Config.xtcs_004[6801].num + "次", Color.getColorStr(color0));
		self.bpTxt.text = "大奖条件：" + HtmlUtil.fontNoSize("符文完美鉴定" + Config.xtcs_004[6802].num + "次", Color.getColorStr(color1));

		if(!ModelEightLock.rankData || ModelEightLock.rankData.length <= 0)
		{
			self.c1.selectedIndex = 0;
		}else{
			self.c1.selectedIndex = 1;
			self._firstVO = ModelEightLock.rankData[0];
			self.nameTxt.text = self._firstVO.name;
			self.authenTxt.text = "符文完美鉴定：" + self._firstVO.jdCount + "次";
			if(ModelEightLock.myRank == 1)
			{
				self.nameTxt.color = Color.GREENINT;
				self.nameTxt.bold = true;
			}else{
				self.nameTxt.color = Color.WHITEINT;
			}

			if (ModelEightLock.modId > 1000 && ModelEightLock.modId < 100000) {
				var mx = Config.sz_739[ModelEightLock.modId].moxing;
				self.container.setUIRole(mx);
			} else {
				self.container.setUIRole(ModelEightLock.modId);
			}
		}

		if(ModelEightLock.myRank == 0 || ModelEightLock.myRank > 20 || ModelEightLock.myjdCount < Config.xtcs_004[6801].num)
		{
			self.myRankTxt.text = "我的排名：未上榜";
		}else{
			self.myRankTxt.text = "我的排名：" + ModelEightLock.myRank;
		}

		self.myAuthenTxt.text = "鉴定次数：" + ModelEightLock.myjdCount;

		self.bpList.numItems = self._bigAwards.length;
	}

	private onTick() {
        const end = ModelEightLock.endTime;
        const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		const timeRemain = end - servTime;
        if (end - servTime > 0) {
			if(timeRemain >= 24*60*60*1000)
			{
            	this.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond5(end - servTime);
			}else{
				this.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond4(end - servTime);
			}
			this.btnGo.visible = true;
        } else {
            this.timeTxt.text = "剩余时间：活动已结束";
            Timer.instance.remove(this.onTick, this);
			this.btnGo.visible = false;
			this.btnGo.checkNotice = false;
			const not = GGlobal.modelEightLock.getAuthenNot();
        	GGlobal.reddot.setCondition(UIConst.AUTHEN_RANK, 0, not);
        }
    }

	private goHandler() {
		GGlobal.layerMgr.open(UIConst.BAZHENTU_JIANDING);
	}

}