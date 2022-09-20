class ActCom_SGBZItem extends fairygui.GComponent {

	public nameIcon: fairygui.GLoader;
	public promptLb: fairygui.GRichTextField;
	public chooseLb: fairygui.GRichTextField;
	public list: fairygui.GList;

	public static URL: string = "ui://y9683xrpj158b";

	public static createInstance(): ActCom_SGBZItem {
		return <ActCom_SGBZItem><any>(fairygui.UIPackage.createObject("ActComSGBZ", "ActCom_SGBZItem"));
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

	private renderHandler(index: number, grid: ActCom_SGBZGrid) {
		let self = this;
		grid.setVo(self.rewardArr[index], index, self.vo, Handler.create(self, self.updateChoose));
	}

	private updateChoose() {
		let self = this;
		let model = GGlobal.modelsgbz;
		if (model.selectData[self.vo.id]) {
			self.chooseLb.text = "已选:" + model.selectData[self.vo.id].length + "个";
		} else {
			self.chooseLb.text = "已选:0个";
		}
	}

	private rewardArr: IGridImpl[];
	private vo: Ibzjc_753;
	public setVo(cfg: Ibzjc_753) {
		let self = this;
		let model = GGlobal.modelsgbz;
		self.vo = cfg;
		self.nameIcon.url = CommonManager.getUrl("ActComSGBZ", "name" + cfg.dc);
		self.promptLb.text = "限选" + (5 - cfg.dc) + "个";
		if (model.selectData[cfg.id]) {
			self.chooseLb.text = "已选:" + model.selectData[cfg.id].length + "个";
		} else {
			self.chooseLb.text = "已选:0个";
		}
		self.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.bzjc));
		self.list.numItems = self.rewardArr.length;
	}

	public clean() {
		let self = this;
		self.list.numItems = 0;
	}
}