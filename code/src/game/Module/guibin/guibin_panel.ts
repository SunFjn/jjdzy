class guibin_panel extends UIModalPanel {
	public frame: fairygui.GLabel;
	public returnBtn: fairygui.GButton;
	public desc: fairygui.GTextField;
	public RewardList: fairygui.GList;
	public copyBtn: fairygui.GButton;
	public iconLoader: fairygui.GLoader;
	public bgLoader: fairygui.GLoader;
	public weixinNumber: fairygui.GRichTextField;
	public numLb: fairygui.GRichTextField;

	private cfgVO: Iguibin_749;

	private rewardListVO: any[];

	public static URL: string = "ui://uwuhem42itpb6";

	public static createInstance(): guibin_panel {
		return <guibin_panel><any>(fairygui.UIPackage.createObject("guibin", "guibin_panel"));
	}

	public constructor() {
		super();
		this.loadRes("guibin", "guibin_atlas0");
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("guibin")
		self.view = fairygui.UIPackage.createObject("guibin", "guibin_panel").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.RewardList.callbackThisObj = self;
		self.RewardList.itemRenderer = self.itemRenderer;
		super.childrenCreated();
	}

	private itemRenderer(index: number, item: ViewGrid) {
		let self = this;
		let vo = self.rewardListVO[index];
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = vo;
	}

	protected onShown() {
		let self = this;
		self.copyBtn.addClickListener(self.onClickCopyBtn, self);
		self.returnBtn.addClickListener(self.closeEventHandler, self);
		let index: number = PlatformManager.getPfIndex();
		self.cfgVO = Config.guibin_749[index];
		if (!self.cfgVO) return;
		self.rewardListVO = ConfigHelp.makeItemListArr(JSON.parse(self.cfgVO.jiangli));
		self.RewardList.numItems = self.rewardListVO.length;
		self.weixinNumber.text = self.cfgVO.wz+"：";
		self.numLb.text = self.cfgVO.weixin + "";
		IconUtil.setImg(self.bgLoader, "resource/image/back/guibinBG.png");
		IconUtil.setImg(self.iconLoader, "resource/image/guibin/" + self.cfgVO.tupian + ".jpg");
	}

	protected onHide() {
		let self = this;
		self.copyBtn.removeClickListener(self.onClickCopyBtn, self);
		self.returnBtn.removeClickListener(self.closeEventHandler, self);
		self.RewardList.numItems = 0;
		self.cfgVO = null;
		GGlobal.layerMgr.close(UIConst.GUI_BIN_VIP);
		IconUtil.setImg(self.bgLoader, null);
		IconUtil.setImg(self.iconLoader, null);
	}

	private onClickCopyBtn() {
		let self = this;
		let str = self.numLb.text
		Model_Setting.onCopy(str, "复制成功")
	}
}