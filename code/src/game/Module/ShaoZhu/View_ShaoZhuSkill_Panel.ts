class View_ShaoZhuSkill_Panel extends UIPanelBase {

	public list: fairygui.GList;
	public static URL: string = "ui://p83wyb2beigu13";

	public constructor() {
		super();
		this.setSkin("ShaoZhu", "ShaoZhu_atlas0", "View_ShaoZhuSkill_Panel");
	}

	protected initView(): void {
		let self = this;
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRenderHandler;
	}

	private itemRenderHandler(index: number, obj: ShaoZhuSkillItem) {
		let self = this;
		let cfg = self.skillArr[index];
		obj.updateShow(cfg);
	}

	private skillArr: Isonskill_267[] = [];
	private updateShow() {
		let self = this;
		if (self.skillArr.length <= 0) {
			let arr = JSON.parse(Config.xtcs_004[5804].other);
			for (let i = 0; i < arr[0].length; i++) {
				let cfg = Config.sonskill_267[arr[0][i]];
				self.skillArr.push(cfg);
			}
		}
		self.list.numItems = self.skillArr.length;
	}

	protected onShown(): void {
		this.updateShow();
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.SHAOZHU_ALLSKILL);
		GGlobal.layerMgr.open(UIConst.SHAOZHU_SKILL)
	}
}