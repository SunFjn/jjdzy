/**
 * 少主护送拦截面板
 */
class ShaoZhuEscortInterView extends UIModalPanel{
	public head: ViewHead;
	public list: fairygui.GList;
	public nameLb: fairygui.GTextField;
	public powerLb: fairygui.GTextField;
	public guardNameLb: fairygui.GRichTextField;
	public fightBtn: Button1;
	public leftBtn: Button0;
	private _data:Vo_EscortData;

	public static URL: string = "ui://lnw94ki2lnitl";

	public static createInstance(): ShaoZhuEscortInterView {
		return <ShaoZhuEscortInterView><any>(fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscortInterView"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(EscortRewardItem.URL, EscortRewardItem);
		this.loadRes();
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("ShaoZhuEscort");
		self.view = fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscortInterView").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
		// self.list.setVirtual();
		super.childrenCreated();
	}

	private _awards:IGridImpl[] = [];
	private itemRender(idx, obj) {
		let item: EscortRewardItem = obj as EscortRewardItem;
		item.setdata(this._awards[idx],idx);
	}

	protected onShown(): void {
		let self = this;
		self.addListen();
		self._data = this._args;
		if (!self._data) return;
		let cfg:Iszhs_401 = Config.szhs_401[self._data.guardId];
		if(cfg)
		{
			self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.lj));
			self.list.numItems = self._awards.length;
			self.guardNameLb.text = HtmlUtil.fontNoSize("护送武将：" + cfg.name,Color.getColorStr(cfg.pz));
		}
		self.head.setdata(self._data.headID, -1, null, 0, false, self._data.frameID, self._data.country);
		self.nameLb.text = self._data.playerName;
		self.powerLb.text = "战力：" + self._data.power;
	}

	protected onHide(): void {
		this.removeListen();
		this.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT_INTER);
	}

	private addListen(): void {
		let self = this;
		self.fightBtn.addClickListener(self.onFight, self);
		self.leftBtn.addClickListener(self.onLeft, self);
	}

	private removeListen(): void {
		let self = this;
		self.fightBtn.removeClickListener(self.onFight, self);
		self.leftBtn.removeClickListener(self.onLeft, self);
	}

	/**
	 * 战斗
	 */
	private onFight(){
		if (Model_ShaoZhuEscort.inter <= 0) {
			ViewCommonWarn.text("今日拦截次数已耗尽");
			return;
		}
		GGlobal.modelShaoZhuEscort.CG_INTERCEPT(this._data.playerId);
	}

	/**
	 * 离开
	 */
	private onLeft(){
		this.doHideAnimation();
		this.removeListen();
	}
}