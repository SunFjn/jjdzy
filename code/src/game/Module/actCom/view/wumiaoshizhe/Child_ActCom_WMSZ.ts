/**
 * 武庙十哲
 */
class Child_ActCom_WMSZ extends fairygui.GComponent{
	public labTime: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnIntegral: Button2;
	public showList: fairygui.GList;
	public bgImg: fairygui.GLoader;
	public labIntegral: fairygui.GRichTextField;
	public labRank: fairygui.GRichTextField;
	public labTips: fairygui.GRichTextField;
	public labTips1: fairygui.GRichTextField;

	private _vo: Vo_Activity;
	private _showCfg: Array<Iwmsz_779>;
	private _maxRank:number = 0;

	public static URL: string = "ui://5na9ulpx8a0y0";

	public static pkg = "ActCom_WMSZ";

	/** 绑定ui的方法（静态方法） */
	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(Item_ActCom_WMSZ.URL, Item_ActCom_WMSZ);
		f(WMSZIntegralItem.URL, WMSZIntegralItem);
		f(WMSZ_ShowItem.URL, WMSZ_ShowItem);
	}

	public static createInstance(): Child_ActCom_WMSZ {
		return <Child_ActCom_WMSZ><any>(fairygui.UIPackage.createObject("ActCom_WMSZ", "Child_ActCom_WMSZ"));
	}

	public constructor() {
		super();
	}

	initView(pParent: fairygui.GObject) {
		let self = this;
		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;
		self.list.setVirtual();

		self.showList.itemRenderer = self.itemHandle;
		self.showList.callbackThisObj = self;
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
	}

	openPanel(pData?: any) {
		let self = this;
		self._vo = pData;
		self.show();
	}

	closePanel(pData?: any) {
		let self = this;
		self.disposePanel();
	}

	dispose() {
		this.disposePanel();
		super.dispose()
	}

	private disposePanel() {
		let self = this;
		Timer.instance.remove(self.onUpdate, self);
		self.list.numItems = 0;
		self.btnIntegral.removeClickListener(self.onIntegral, self);
		IconUtil.setImg(self.bgImg, null);
		GGlobal.control.remove(UIConst.WMSZ, self.updateView, self);
		GGlobal.control.remove(UIConst.WMSZ_INTEGRAL, self.updateRedDot, self);
		GGlobal.reddot.remove(UIConst.WMSZ, self.updateRedDot, self);
	}

	private show() {
		let self = this;
		Timer.instance.listen(self.onUpdate, self, 1000);
		GGlobal.modelActivity.CG_OPENACT(self._vo.id);
		self.btnIntegral.addClickListener(self.onIntegral, self);
		GGlobal.model_ActWMSZ.CG_OPEN_TARGETAWARD_UI();
		IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + "wumiaoshizhe.jpg");
		GGlobal.control.listen(UIConst.WMSZ, self.updateView, self);
		GGlobal.control.listen(UIConst.WMSZ_INTEGRAL, self.updateRedDot, self);
		GGlobal.reddot.listen(UIConst.WMSZ, self.updateRedDot, self);

		self._showCfg = [];
		for(let key in Config.wmsz_779)
		{
			let cfg:Iwmsz_779 = Config.wmsz_779[key];
			if(Math.floor(cfg.id / 100) == self._vo.qs)
			{
				self._showCfg.push(cfg);
			}
		}
		self.showList.numItems = self._showCfg.length;

		self.updateRedDot();

		self.labTips.text = BroadCastManager.reTxt("积分达到<font color='{0}'>{1}</font>可上榜", "#FF9900", Config.xtcs_004[8423].num);
		self.labTips1.text = BroadCastManager.reTxt("建议不要在<font color='{0}'>00:00-00:05</font>使用道具", "#FF9900");
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
	}

	/**
     * 更新页面数据
     */
	private updateView() {
		let self = this;
		let model = GGlobal.model_ActWMSZ;
		let rankCfg:Array<Iwmpm_779> = [];
		for(let key in Config.wmpm_779)
		{
			let cfg:Iwmpm_779 = Config.wmpm_779[key];
			if(Math.floor(cfg.id / 100) == self._vo.qs)
			{
				rankCfg.push(cfg);
			}
		}
		let lastCfg:Iwmpm_779 = rankCfg[rankCfg.length - 1];
		
		self._maxRank = ConfigHelp.SplitStr(lastCfg.rank)[0][1];
		self.list.numItems = self._maxRank;

		self.labIntegral.text = "我的积分：" + model.myIntegral;
		if(model.myRank <= 0)
		{
			self.labRank.text = "我的排名：" + self._maxRank + "+";
		}else{
			self.labRank.text = "我的排名：" + model.myRank;
		}
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: Item_ActCom_WMSZ = obj as Item_ActCom_WMSZ;
		v.setData(index, this._vo.qs);
	}

	private itemHandle(index: number, obj: fairygui.GComponent): void {
		var v: WMSZ_ShowItem = obj as WMSZ_ShowItem;
		v.setData(this._showCfg[index]);
	}

	/**
	 * 打开积分界面
	 */
	private onIntegral() {
		GGlobal.layerMgr.open(UIConst.WMSZ_INTEGRAL, { qs: this._vo.qs, maxRank: this._maxRank });
	}

	/**
	 * 更新积分奖励红点
	 */
	private updateRedDot()
	{
		this.btnIntegral.checkNotice = GGlobal.reddot.checkCondition(UIConst.WMSZ, 0);
	}
}