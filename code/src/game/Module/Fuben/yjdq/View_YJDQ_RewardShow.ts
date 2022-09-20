class View_YJDQ_RewardShow extends UIModalPanel {

	public list: fairygui.GList;

	public static URL: string = "ui://pkuzcu87b8vea";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("FuBen", "View_YJDQ_RewardShow").asCom;
		this.contentPane = this.view;
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandle;
		super.childrenCreated();
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		let grid: ViewGridRender = obj as ViewGridRender;
		let vo: IGridImpl;
		if (this.rewardArr[index][0] == Enum_Attr.ITEM) {
			vo = VoItem.create(this.rewardArr[index][1]);
			vo.count = this.rewardArr[index][2];
		} else if (this.rewardArr[index][0] == Enum_Attr.EQUIP) {
			vo = VoEquip.create(this.rewardArr[index][1]);
			vo.count = this.rewardArr[index][2];
		} else {
			vo = Vo_Currency.create(this.rewardArr[index][0]);
			vo.count = this.rewardArr[index][2];
		}
		grid.vo = vo;
	}

	private rewardArr: Array<any> = [];
	public updateShow(): void {
		let cfg = Config.yiqi_007[Model_YJDQ.curPass];
		this.rewardArr = JSON.parse(cfg.pile);
		this.list.numItems = this.rewardArr.length;
	}

	protected onShown(): void {
		this.updateShow();
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.FUBEN_YJDQ_REWARDSHOW);
		this.list.numItems = 0;
	}
}