class ActCom_ZFZJ_RankItem extends fairygui.GComponent {

	public rankIcon: fairygui.GLoader;
	public rankLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	public list: fairygui.GList;
	public imgNo: fairygui.GImage;

	public static URL: string = "ui://4h4iwgjrr3jem";

	public static createInstance(): ActCom_ZFZJ_RankItem {
		return <ActCom_ZFZJ_RankItem><any>(fairygui.UIPackage.createObject("ActCom_ZFZJ", "ActCom_ZFZJ_RankItem"));
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
		grid.vo = this.rewardArr[index];
	}

	private rewardArr: IGridImpl[] = [];
	public setVo(index: number, roleData: { id: number, name: string, zuiyi: number }, cfg: Ihfkhzfzjrank_286) {
		let self = this;
		if (index <= 3) {
			self.rankLb.text = "";
			self.rankIcon.url = CommonManager.getCommonUrl("rank_" + index);
			self.rankIcon.visible = true;
		} else {
			self.rankLb.text = index + "";
			self.rankIcon.visible = false;
		}
		if (roleData) {
			self.nameLb.text = roleData.name + "\n敬酒：" + roleData.zuiyi;
			self.imgNo.visible = false;
		} else {
			self.nameLb.text = "";
			self.imgNo.visible = true;
		}
		self.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.list.numItems = self.rewardArr.length;
	}
	public clean() {
		this.list.numItems = 0;
	}
}