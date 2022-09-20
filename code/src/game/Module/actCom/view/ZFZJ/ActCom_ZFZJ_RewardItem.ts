class ActCom_ZFZJ_RewardItem extends fairygui.GComponent {
	public levelLb: fairygui.GRichTextField;
	public list: fairygui.GList;
	public drawBt: Button1;
	public drawImg: fairygui.GImage;

	public static URL: string = "ui://4h4iwgjrr3jek";

	public static createInstance(): ActCom_ZFZJ_RewardItem {
		return <ActCom_ZFZJ_RewardItem><any>(fairygui.UIPackage.createObject("ActCom_ZFZJ", "ActCom_ZFZJ_RewardItem"));
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
		let self = this;
		grid.isShowEff = grid.tipEnabled = true;
		grid.vo = self.rewardArr[index];
	}

	private onDraw() {
		let self = this;
		if (self.drawBt.checkNotice) {
			GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_getBossReward_9665(self.vo.id);
		} else {
			ViewCommonWarn.text("未达到领取条件");
		}
	}

	private rewardArr: IGridImpl[] = [];
	private vo: Ihfkhzfzj_286;
	public setVo(cfg: Ihfkhzfzj_286) {
		let self = this;
		let model = GGlobal.modelzfzj;
		let state = model.rewardData[cfg.id];
		self.vo = cfg;
		self.levelLb.text = cfg.id + "级";
		self.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.list.numItems = self.rewardArr.length;
		self.drawImg.visible = state == 2;
		self.drawBt.visible = state != 2;
		self.drawBt.checkNotice = state == 1;
		self.drawBt.enabled = state == 1;
		self.drawBt.addClickListener(self.onDraw, self);
	}

	public clean() {
		let self = this;
		self.list.numItems = 0;
		self.drawBt.removeClickListener(self.onDraw, self);
	}
}