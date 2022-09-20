/**
 * 新活动-对对联
 */
class Child_ActCom_DDL extends fairygui.GComponent{
	public bgImg: fairygui.GLoader;
	public vres: ViewResource;
	public labTime: fairygui.GRichTextField;
	public shanglian: fairygui.GRichTextField;
	public xialian: fairygui.GRichTextField;
	public hengfu: fairygui.GRichTextField;
	public item0: DDLItem;
	public item1: DDLItem;
	public item2: DDLItem;
	public item3: DDLItem;
	public item4: DDLItem;
	public item5: DDLItem;
	public item6: DDLItem;
	public againBtn: Button0;
	public okBtn: Button1;
	public labRecover: fairygui.GRichTextField;
	public labCount: fairygui.GRichTextField;
	public rewardItem0: DDLRewardItem;
	public rewardItem1: DDLRewardItem;
	public rewardItem2: DDLRewardItem;
	public rewardItem3: DDLRewardItem;
	public rewardItem4: DDLRewardItem;
	public expBar: fairygui.GProgressBar;
	public btnRank: Button2;
	private _curSelect:number = 0;

	private _vo: Vo_Activity;
	private itemArr: DDLItem[];
	public xialianPos:number[];
	private _rewardArr = [];
	private _xialianStr:string = "";
	private _cfg:Iddl_297;

	public static URL: string = "ui://ke8qv0ckehld0";

	public static pkg = "ActCom_DDL";

	/** 绑定ui的方法（静态方法） */
	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(DDLItem.URL, DDLItem);
		f(ItemRankDDL.URL, ItemRankDDL);
		f(DDLRewardItem.URL, DDLRewardItem);
	}

	public static createInstance(): Child_ActCom_DDL {
		return <Child_ActCom_DDL><any>(fairygui.UIPackage.createObject("ActCom_DDL", "Child_ActCom_DDL"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
	}

	initView(pParent: fairygui.GObject) {
		let s = this;
		s.itemArr = [s.item0, s.item1, s.item2, s.item3, s.item4, s.item5, s.item6];
		s._rewardArr = [s.rewardItem0, s.rewardItem1, s.rewardItem2, s.rewardItem3, s.rewardItem4];
	}

	openPanel(pData?: any) {
		let self = this;
		self._vo = pData;
		IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + "duiduilian.jpg");
		self.y = 264;
		self.show();
	}

	closePanel(pData?: any) {
		let self = this;
		self.disposePanel();
		IconUtil.setImg(self.bgImg, null);
	}

	dispose() {
		this.disposePanel();
		super.dispose()
	}

	private disposePanel() {
		let self = this;
		Timer.instance.remove(self.onUpdate, self);
		GGlobal.control.remove(UIConst.ACTCOM_DDL, self.updateView, self);
		let len:number = self.itemArr.length;
		for (let i = 0; i < len; i++) {
			self.itemArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onXialian, self);
		}
		self.againBtn.removeClickListener(self.onAgain, self);
		self.okBtn.removeClickListener(self.onOK, self);
		self.btnRank.removeClickListener(self.onBtnRank, self);
		self._xialianStr = "";
		self.xialianPos = [];
		self.xialian.text = "";
	}

	private show() {
		let self = this;
		self.vres.setType(1);
		Timer.instance.listen(self.onUpdate, self, 1000);
		GGlobal.modelActivity.CG_OPENACT(self._vo.id);
		GGlobal.control.listen(UIConst.ACTCOM_DDL, self.updateView, self);
		let len:number = self.itemArr.length;
		for (let i = 0; i < len; i++) {
			self.itemArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, self.onXialian, self);
		}
		self.againBtn.addClickListener(self.onAgain, self);
		self.okBtn.addClickListener(self.onOK, self);
		self.btnRank.addClickListener(self.onBtnRank, self);
	}

	private onUpdate() {
		let self = this;
		const end = self._vo ? self._vo.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			self.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			self.labTime.text = "00:00:00";
		}

		if (GGlobal.model_DDL.remainTime > 0) {
			GGlobal.model_DDL.remainTime --;
			self.labRecover.text = "恢复时间：<font color='#15f234'>" + DateUtil.getMSBySec3(GGlobal.model_DDL.remainTime) + "</font>";
		} else {
			self.labRecover.text = "";
		}
	}

	/**
     * 更新页面数据
     */
	private updateView(bol:boolean = false) {
		let model = GGlobal.model_DDL;
		let self = this;
		self._cfg = Config.ddl_297[model.id];
		if(!self._cfg)  return;

		self.hengfu.text = self._cfg.name;
		self.shanglian.text = self._cfg.up;

		self.okBtn.checkNotice = false;
		let itemCount:number = Model_Bag.getItemCount(410429);
		if(model.duilianCount > 0 || (itemCount <= 0 && model.duilianCount <= 0))
		{
			self.vres.visible = false;
			self.labCount.text = "剩余对联次数：" + model.duilianCount + "/10";
			// self.okBtn.checkNotice = true;
		}else{
			self.vres.visible = true;
			self.labCount.text = "对联：";
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + "410429.png", self.vres.getChild("icon").asLoader);
			self.vres.text = "" + itemCount;
			// if(itemCount > 0)
			// {
			// 	self.okBtn.checkNotice = true;
			// }
		}

		let len:number = model.rewardArr.length;
		let max:number = 0;
		for (let i = 0; i < len; i++) {
			let vo:DDLVO = model.rewardArr[i];
			self._rewardArr[i].setVo(vo);
			let cfg:Iddlreward_297 = Config.ddlreward_297[vo.id];
			max = cfg.num;
		}

		self.expBar.max = max;
		self.expBar.value = model.correctCount;

		if(bol)
		{
			self.resetItem();
		}
	}

	private onXialian(e: egret.TouchEvent): void {
		var v = e.currentTarget as DDLItem;
		let self = this;
		self._curSelect = v.index;
		let len:number = self.itemArr.length;
		for (let i = 0; i < len; i++) {
			let item:DDLItem = self.itemArr[i];
			if(item.index == v.index)
			{
				item.setSelect(true);
			}else{
				item.setSelect(false);
			}
		}
		let cfg: Iddl_297 = v.cfg;
		if (cfg == null) return;
		let index:number = self.xialianPos.indexOf((v.index + 1));
		if(index >= 0)  return;

		self.xialianPos.push((v.index + 1));
		self._xialianStr += v.str;
		self.xialian.text = self._xialianStr;
		v.content.text = "";
	}

	/**
	 * 重来
	 */
	private onAgain(): void {
		let self = this;
		self.resetItem();
	}

	/**
	 * 重置
	 */
	private resetItem()
	{
		let self = this;
		self.xialianPos = [];
		self._xialianStr = "";
		self.xialian.text = "";
		let model = GGlobal.model_DDL;
		let len:number = self.itemArr.length;
		for (let i = 0; i < len; i++) {
			let item:DDLItem = self.itemArr[i];
			item.setData(self._cfg, model.xiaLians[i], i);
			if(item.index == self._curSelect)
			{
				item.setSelect(true);
			}else{
				item.setSelect(false);
			}
		}
	}

	/**
	 * 确定
	 */
	private onOK(): void {
		let self = this;
		let len:number = self.xialianPos.length;
		let arr = [];
		let model = GGlobal.model_DDL;
		model.CG_COMMIT(self.xialianPos);
	}

	/**
	 * 打开排名奖励界面
	 */
	private onBtnRank() {
		GGlobal.layerMgr.open(UIConst.DDL_RANK, { qs: this._vo.qs });
	}
}