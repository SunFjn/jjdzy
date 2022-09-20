class ViewMineralTips extends UIModalPanel {

	public moneyIcon0: fairygui.GLoader;
	public moneyIcon1: fairygui.GLoader;
	public openBt: fairygui.GButton;
	public startBt: fairygui.GButton;
	public moneyLb0: fairygui.GRichTextField;
	public moneyLb1: fairygui.GRichTextField;

	public static URL: string = "ui://yqpfulef7cuy5i";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("crossKing", "ViewMineralTips").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		let cfg = Config.kfkz_275[Model_CrossMineral.MAX_LEVEL];
		let arr = JSON.parse(cfg.max1);
		let itemVo0 = ConfigHelp.makeItem(arr[0]);
		let itemVo1 = ConfigHelp.makeItem(arr[1]);
		IconUtil.setImg(self.moneyIcon0, Enum_Path.ICON70_URL + itemVo0.icon + ".png");
		IconUtil.setImg(self.moneyIcon1, Enum_Path.ICON70_URL + itemVo1.icon + ".png");
		self.moneyLb0.text = itemVo0.count + "";
		self.moneyLb1.text = itemVo1.count + "";
		super.childrenCreated();
		self.openBt.addClickListener(self.OnOpen, self);
		self.startBt.addClickListener(self.OnStart, self);
	}

	private OnStart() {
		this.doHideAnimation();
		GGlobal.modelCrossMineral.CG_START_MINE();
	}

	private OnOpen() {
		this.doHideAnimation();
		GGlobal.layerMgr.open(UIConst.CROSS_MINERAL_REFRESH);
	}


	protected onShown(): void {

	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.CROSS_MINE_PROMPT);
	}
}