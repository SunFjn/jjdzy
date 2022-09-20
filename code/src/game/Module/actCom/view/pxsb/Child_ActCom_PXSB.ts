/**
 * 新活动-貔貅散宝
 */
class Child_ActCom_PXSB extends fairygui.GComponent{
	public labTime: fairygui.GRichTextField;
	public tab0: TabButton2;
	public tab1: TabButton2;
	public tab2: TabButton2;
	public list: fairygui.GList;
	public bgImg: fairygui.GLoader;
	public c1: fairygui.Controller;
	public btnGet: Button1;
	public iconG: fairygui.GLoader;
	public xfLab: fairygui.GRichTextField;
	public imgGet: fairygui.GImage;
	public bpReward: PXSBGrid;

	private _pxsbVO:PXSBVO;
	private _vo: Vo_Activity;
	private _tabArr: TabButton2[];
	private _listData = [];
	private awatar: UIRole;
	private godEff: Part;

	public static URL: string = "ui://qb4y6bxephch0";

	public static pkg = "actCom_PXSB";

	/** 绑定ui的方法（静态方法） */
	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(Item_ActCom_PXSB.URL, Item_ActCom_PXSB);
		f(PXSBGrid.URL, PXSBGrid);
	}

	public static createInstance(): Child_ActCom_PXSB {
		return <Child_ActCom_PXSB><any>(fairygui.UIPackage.createObject("actCom_PXSB", "Child_ActCom_PXSB"));
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
		s._tabArr = [];
		for (let i = 0; i < 3; i++) {
			s._tabArr.push(s["tab" + i]);
		}

		s.list.itemRenderer = s.renderHandle;
		s.list.callbackThisObj = s;
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
		GGlobal.control.remove(UIConst.ACTCOM_PXSB, self.updateView, self);
		for (let i = 0; i < self._tabArr.length; i++) {
			self._tabArr[i].removeClickListener(self.updateList, self);
		}
		self.btnGet.removeClickListener(self.onGet, self);
		self.disPoAwat();
		IconUtil.setImg(self.iconG, null);
		IconUtil.setImg(self.bgImg, null);
		self.list.numItems = 0;
	}

	private show() {
		let self = this;
		Timer.instance.listen(self.onUpdate, self, 1000);
		GGlobal.modelActivity.CG_OPENACT(self._vo.id);
		GGlobal.control.listen(UIConst.ACTCOM_PXSB, self.updateView, self);
		for (let i = 0; i < self._tabArr.length; i++) {
			self._tabArr[i].addClickListener(self.updateList, self);
		}
		self.c1.selectedIndex = 0;
		self.btnGet.addClickListener(self.onGet, self);
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
		var item: Item_ActCom_PXSB = obj as Item_ActCom_PXSB;
		item.setData(this._listData[index], this._pxsbVO.day);
	}

	/**
     * 更新页面数据
     */
	private updateView() {
		let self = this;
		let model = GGlobal.model_ActPXSB;
		if(!Model_ActComPXSB.rewardArr || Model_ActComPXSB.rewardArr.length <= 0)  return;

		let len:number = Model_ActComPXSB.rewardArr.length;
		for(let i:number = 0;i < len; i ++)
		{
			let vo:PXSBVO = Model_ActComPXSB.rewardArr[i];
			let cfg:Ipxsbdj_778 = Config.pxsbdj_778[vo.id];
			let btn:TabButton2 = self._tabArr[i];
			btn.title = "消费" + model.getWanText1(cfg.xf);
			btn.checkNotice = model.reddotCheckByIndex(i);
		}
		self.xfLab.text = model.xfNum + "";

		self.updateList();
	}

	private updateList() {
		let self = this;
		self._pxsbVO = Model_ActComPXSB.rewardArr[self.c1.selectedIndex];
		self._listData = Model_ActComPXSB.getListData(self._pxsbVO.arr);
		self.list.numItems = self._listData.length;
		self.btnGet.grayed = self._pxsbVO.status == 0? true:false;
		self.btnGet.checkNotice = self._pxsbVO.status == 1? true:false;
		self.btnGet.visible = self._pxsbVO.status == 0 || self._pxsbVO.status == 1? true:false;
		self.imgGet.visible = self._pxsbVO.status == 2? true:false;

		let cfg:Ipxsbdj_778 = Config.pxsbdj_778[self._pxsbVO.id];
		// self.showPicsByType(cfg.zs);
		IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + cfg.tpz + ".jpg");

		let reward = JSON.parse(cfg.jl)[0];
		self.bpReward.setVo(reward, true);
	}

	/**
	 * 领取大奖
	 */
	private onGet(): void {
		let self = this;
		let model = GGlobal.model_ActPXSB;
		model.CG_GET(1, self._pxsbVO.id);
	}

	private secSkill;
	private showPicsByType(arg: any)
	{
		let showInfo = JSON.parse(arg)[0];
		let type = showInfo[0];
		let value = showInfo[1];
		const self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
		if (self.godEff) {
			EffectMgr.instance.removeEff(self.godEff);
			self.godEff = null;
		}
		switch (type) {
			case 1://展示图片
				IconUtil.setImg(self.iconG, Enum_Path.PIC_URL + value + ".png");
				// self.showEff(true, 1);
				self.iconG.visible = true;
				break;
			case 2://展示模型
				var position = null;
				self.iconG.visible = false;
				position = { x: 530, y: 400 };
				// self.showEff(false, 2);
				if (!self.awatar) {
					self.awatar = UIRole.create();
					self.awatar.uiparent = self._container;
					self.awatar.setScaleXY(0.8, 0.8);
				}
				self.awatar.setPos(position.x, position.y);
				self.awatar.setBody(value);
				self.awatar.setWeapon(value);
				self.awatar.onAdd();

				let cfgh = Config.hero_211[value]
				var skillsArr = ConfigHelp.SplitStr(cfgh.skills);
				var secSkill = skillsArr[1][0];
				if (self.secSkill != secSkill) {
					self.secSkill = secSkill;
					Timer.instance.remove(self.playSkill, self);
					self.playSkill();
				}
				break;
			case 3://展示神兵
				self.iconG.visible = true;
				self.godEff = EffectMgr.addEff("uieff/" + value, self.iconG.displayObject as fairygui.UIContainer, self.iconG.width / 2, self.iconG.height / 2, 1000);
				break;
		}
	}

	private playSkill() {
		let self = this;
		if(self.awatar)
		{
			self.awatar.playSkillID(self.secSkill, false);
			Timer.instance.callLater(self.playSkill, 5000, self);
		}
	}

	private disPoAwat() {
		let self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
		Timer.instance.remove(self.playSkill, self);
		self.secSkill = 0;

		if (self.godEff) {
			EffectMgr.instance.removeEff(self.godEff);
			self.godEff = null;
		}
	}
}