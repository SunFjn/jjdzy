/**
 * 新活动-天降红包
 */
class Child_ActCom_TJHB extends fairygui.GComponent{
	public bgImg: fairygui.GLoader;
	public labTime: fairygui.GRichTextField;
	public list: fairygui.GList;
	public nextTimeTxt: fairygui.GRichTextField;
	public btnFHB: Button2;
	public labCount: fairygui.GRichTextField;

	private _vo: Vo_Activity;

	public static URL: string = "ui://fm0lrzcttl0c0";

	public static pkg = "ActCom_TJHB";

	/** 绑定ui的方法（静态方法） */
	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(TJHBItem.URL, TJHBItem);
		f(ItemHBRecord.URL, ItemHBRecord);
		f(ItemFHB.URL, ItemFHB);
	}

	public static createInstance(): Child_ActCom_TJHB {
		return <Child_ActCom_TJHB><any>(fairygui.UIPackage.createObject("ActCom_TJHB", "Child_ActCom_TJHB"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);

		s.list.itemRenderer = s.renderHandle;
		s.list.callbackThisObj = s;
		s.list.setVirtual();
	}

	initView(pParent: fairygui.GObject) {
	}

	openPanel(pData?: any) {
		let self = this;
		self._vo = pData;
		IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + "tianjianghongbao.jpg");
		self.y = 264;
		self.show();
	}

	closePanel(pData?: any) {
		let self = this;
		self.disposePanel();
		IconUtil.setImg(self.bgImg, null);
		self.btnFHB.removeClickListener(self.onFHB, self);
		Model_ActComTJHB.id = 0;
	}

	dispose() {
		this.disposePanel();
		super.dispose()
	}

	private disposePanel() {
		let self = this;
		Timer.instance.remove(self.onUpdate, self);
		self.list.numItems = 0;
		GGlobal.control.remove(UIConst.ACTCOM_TJHB, self.updateView, self);
		GGlobal.reddot.remove(UIConst.ACTCOM_TJHB, self.updateFaRed, self);
		GGlobal.control.remove(UIConst.TJHB_FHB, self.updateFaRed, self);
	}

	private show() {
		let self = this;
		Timer.instance.listen(self.onUpdate, self);
		GGlobal.modelActivity.CG_OPENACT(self._vo.id);
		GGlobal.control.listen(UIConst.ACTCOM_TJHB, self.updateView, self);
		self.btnFHB.addClickListener(self.onFHB, self);
		GGlobal.model_TJHB.CG_SEND_UI();
		GGlobal.reddot.listen(UIConst.ACTCOM_TJHB, self.updateFaRed, self);
		GGlobal.control.listen(UIConst.TJHB_FHB, self.updateFaRed, self);
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

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: TJHBItem = obj as TJHBItem;
		let vo:HBVo = GGlobal.model_TJHB.hbArr[index];
		v.setVo(vo, Model_ActComTJHB.id == vo.hbId);
	}

	/**
     * 更新页面数据
     */
	private updateView() {
		let self = this;
		let model = GGlobal.model_TJHB;
		self.list.numItems = model.hbArr.length;

		let total:number = Config.xtcs_004[8420].num;
		if(model.residue > 0)
		{
			self.labCount.text = "今日可抢红包数：<font color='#00FF00'>" + model.residue + "/" + total + "</font>";
		}else{
			self.labCount.text = "今日可抢红包数：<font color='#ed1414'>" + model.residue + "/" + total + "</font>";
		}

		if(model.nextId > 0)
		{
			let cfg:Itjhbsys_296 = Config.tjhbsys_296[model.nextId];
			self.nextTimeTxt.text = "下次系统天降红包时间  " + cfg.time;
		}else{
			self.nextTimeTxt.text = "下次系统天降红包时间  00:00";
		}
		self.updateFaRed();
	}

	/**
	 * 打开发红包界面
	 */
	private onFHB() {
		GGlobal.layerMgr.open(UIConst.TJHB_FHB);
	}

	/**
	 * 更新发红包红点
	 */
	private updateFaRed() {
		let self = this;
		let bol:boolean = false;
		let model = GGlobal.model_TJHB;
		let len:number = model.fhbArr.length;
		for(let i:number = 0;i < len;i ++)
		{
			let vo:HBVo = model.fhbArr[i];
			if(vo.sendStatus == 1)
			{
				bol = true;
				break;
			}
		}
		self.btnFHB.checkNotice = bol;
		// self.btnFHB.checkNotice = GGlobal.reddot.checkCondition(UIConst.ACTCOM_TJHB, 1);
	}
}