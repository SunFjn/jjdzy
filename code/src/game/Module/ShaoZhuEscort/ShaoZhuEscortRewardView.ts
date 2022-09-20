/**
 * 少主护送奖励面板
 */
class ShaoZhuEscortRewardView extends UIModalPanel {
	public head: ViewHead;
	public list: fairygui.GList;
	public rewardBtn: Button1;
	public nameLb: fairygui.GTextField;
	public powerLb: fairygui.GTextField;
	public guardNameLb: fairygui.GRichTextField;

	public static URL: string = "ui://lnw94ki2lnit9";

	public static createInstance(): ShaoZhuEscortRewardView {
		return <ShaoZhuEscortRewardView><any>(fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscortRewardView"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(EscortRewardItem.URL, EscortRewardItem);
		this.loadRes();
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("ShaoZhuEscort");
		// self.isShowMask = false;
		self.view = fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscortRewardView").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
		self.list.setVirtual();
		super.childrenCreated();
	}

	private _awards: IGridImpl[] = [];
	private itemRender(idx, obj) {
		let item: EscortRewardItem = obj as EscortRewardItem;
		item.setdata(this._awards[idx], idx, Model_ShaoZhuEscort.interArr[idx]);
	}

	protected onShown(): void {
		let self = this;
		self.addListen();
		self._awards = ConfigHelp.makeItemListArr(Model_ShaoZhuEscort.rewardArr);
		self.list.numItems = self._awards.length;
		self.head.setdata(Model_ShaoZhuEscort.headID, -1, null, 0, false, Model_ShaoZhuEscort.frameID, Model_ShaoZhuEscort.country);
		self.nameLb.text = Model_ShaoZhuEscort.roleName + "";
		self.powerLb.text = "战力：" + Model_ShaoZhuEscort.power;
		let cfg: Iszhs_401 = Config.szhs_401[Model_ShaoZhuEscort.guardId];
		if (cfg) {
			self.guardNameLb.text = HtmlUtil.fontNoSize("护送武将：" + cfg.name, Color.getColorStr(cfg.pz));
		}
		self.rewardBtn.checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_ESCORT, 0);
	}

	protected onHide(): void {
		this.removeListen();
		this.getAward();
		GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT_REWARD);
		this.list.numItems = 0;
	}

	private addListen(): void {
		let self = this;
		self.rewardBtn.addClickListener(self.getAward, self);
	}

	private removeListen(): void {
		let self = this;
		self.rewardBtn.removeClickListener(self.getAward, self);
	}

	public static show() {
		if (!GGlobal.layerMgr.isOpenView(UIConst.SHAOZHU_ESCORT_REWARD)) {
			GGlobal.layerMgr.open(UIConst.SHAOZHU_ESCORT_REWARD);
		}
	}

	/**
	 * 领取奖励
	 */
	private getAward() {
		GGlobal.modelShaoZhuEscort.CG_GET_AWARD();
	}
}