class View_ShaoZhu_QinMiUp extends UIModalPanel {

	public titleIcon: fairygui.GLoader;
	public backIcon: fairygui.GLoader;
	public modelIcon: fairygui.GLoader;
	public sureBt: fairygui.GButton;
	public list: fairygui.GList;
	public promptLb: fairygui.GRichTextField;
	public static URL: string = "ui://p83wyb2bng03i";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ShaoZhu", "View_ShaoZhu_QinMiUp").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		super.childrenCreated();
		self.sureBt.addClickListener(self.closeEventHandler, self);
	}

	private renderHandler(index: number, obj: ViewGridRender) {
		obj.tipEnabled = true;
		obj.vo = this.rewardArr[index];
	}

	private rewardArr: IGridImpl[];
	private awatar: Part;
	public updateShow() {
		let self = this;
		let vo: Vo_ShaoZhu = self._args.vo;
		self.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(vo.qinMiCfg.shouw1));
		IconUtil.setImg(self.titleIcon, "resource/image/son/" + Math.floor(vo.qinMiCfg.jie / 100) + ".png");
		self.list.numItems = self.rewardArr.length;
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
		if (!self.awatar) {
			self.awatar = EffectMgr.addEff("uieff/" + vo.cfg.zs, self.modelIcon.displayObject as fairygui.UIContainer,
				self.modelIcon.width / 2, self.modelIcon.height, 1000, -1, true);
		}
		self.promptLb.visible = self._args.isShow;
	}

	protected onShown(): void {
		let self = this;
		IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "shaozhuBack.png");
		self.updateShow();
	}

	protected onHide(): void {
		let self = this;
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
		IconUtil.setImg(self.backIcon, null);
		GGlobal.layerMgr.close(UIConst.SHAOZHU_QINMI_REWARD)
		self.list.numItems = 0;
	}
}