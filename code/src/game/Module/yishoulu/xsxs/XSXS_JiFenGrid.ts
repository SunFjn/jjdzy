class XSXS_JiFenGrid extends fairygui.GComponent {

	public grid: ViewGrid;
	public numLb: fairygui.GRichTextField;
	public jifenLb: fairygui.GRichTextField;
	public noticeGroup: fairygui.GGroup;
	public noticeImg: fairygui.GImage;
	public imgHas: fairygui.GImage;

	public static URL: string = "ui://7y83phvndsdyp";

	public static createInstance(): XSXS_JiFenGrid {
		return <XSXS_JiFenGrid><any>(fairygui.UIPackage.createObject("YiShouLu", "XSXS_JiFenGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public vo: Ixsxspoint_283;
	public setVo(cfg: Ixsxspoint_283) {
		let self = this;
		let model = GGlobal.modelxsxs;
		self.vo = cfg;
		let arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.grid.tipEnabled = false;
		self.grid.isShowEff = true;
		self.grid.vo = arr[0];
		self.noticeGroup.visible = model.rewardData[cfg.id] > 0;
		self.numLb.visible = model.rewardData[cfg.id] > 1;
		self.numLb.text = model.rewardData[cfg.id] + "";
		self.jifenLb.text = "积分:" + cfg.point;
		self.imgHas.visible = model.rewardData[cfg.id] == -1;
	}

	public vo1: Ixltfmb_758
	public setTfVo(cfg: Ixltfmb_758) {
		let self = this;
		let model = GGlobal.modelTalent;
		self.vo1 = cfg;
		let arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.jl));
		self.grid.tipEnabled = false;
		self.grid.isShowEff = true;
		self.grid.vo = arr[0];
		self.noticeGroup.visible = model.targetData[cfg.id] > 0;
		self.numLb.visible = model.targetData[cfg.id] > 1;
		self.numLb.text = model.targetData[cfg.id] + "";
		self.jifenLb.text = cfg.cs + "次";
		self.imgHas.visible = model.targetData[cfg.id] == -1;
	}

	public clean() {
		this.grid.clean();
	}
}