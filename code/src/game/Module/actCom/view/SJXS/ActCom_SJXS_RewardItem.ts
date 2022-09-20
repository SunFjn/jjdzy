class ActCom_SJXS_RewardItem extends fairygui.GComponent {

	public drawImg: fairygui.GImage;
	public needLb: fairygui.GRichTextField;
	public list: fairygui.GList;
	public drawBt: Button1;

	public static URL: string = "ui://iwvd88mqr3jeb";

	public static createInstance(): ActCom_SJXS_RewardItem {
		return <ActCom_SJXS_RewardItem><any>(fairygui.UIPackage.createObject("ActCom_SJXS", "ActCom_SJXS_RewardItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
	}

	private renderHandler(index: number, grid: ViewGrid) {
		grid.isShowEff = grid.tipEnabled = true;
		grid.vo = this.showData[index];
	}

	private drawHandler() {
		let self = this;
		if (self.state == 0) {
			ViewCommonWarn.text("未达到领奖条件");
			return;
		}
		GGlobal.modelsjxs.CG_GodGenThisLife_getTargetAward_9557(self.cfgID);
	}

	private showData: IGridImpl[];
	private cfgID = 0;
	private state = 0;
	public setVo(cfgID: number, state: number) {
		let self = this;
		let model = GGlobal.modelsjxs;
		self.cfgID = cfgID;
		self.state = state;
		let cfg = Config.godmb_288[cfgID];
		self.showData = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.list.numItems = self.showData.length;
		let color = model.drawNum >= cfg.time ? 2 : 6;
		self.needLb.text = ConfigHelp.reTxt("抽奖({0})次", HtmlUtil.fontNoSize(model.drawNum + "/" + cfg.time, Color.getColorStr(color)));
		self.drawImg.visible = state == 2;
		self.drawBt.enabled = state == 1;
		self.drawBt.visible = state != 2;
		self.drawBt.checkNotice = state == 1;
		self.drawBt.addClickListener(self.drawHandler, self);
	}

	public clean() {
		let self = this;
		self.list.numItems = 0;
		self.drawBt.removeClickListener(self.drawHandler, self);
	}
}