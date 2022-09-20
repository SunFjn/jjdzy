class ActCom_SGBZGrid extends fairygui.GComponent {

	public grid: ViewGrid;
	public nameLb: fairygui.GRichTextField;
	public selBt: fairygui.GButton;
	public escBt: fairygui.GButton;

	public static URL: string = "ui://y9683xrpj158a";

	public static createInstance(): ActCom_SGBZGrid {
		return <ActCom_SGBZGrid><any>(fairygui.UIPackage.createObject("ActComSGBZ", "ActCom_SGBZGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self)
	}

	private onSel() {
		let self = this;
		let model = GGlobal.modelsgbz;
		if (self.selSate == 0) {
			if (model.selectData[self.vo.id] && model.selectData[self.vo.id].length >= 5 - self.vo.dc) {
				ViewCommonWarn.text("必出奖励已达上限");
				return;
			}
			self.selSate = 1;
			self.selBt.visible = false;
			self.escBt.visible = true;
			if (!model.selectData[self.vo.id]) model.selectData[self.vo.id] = [];
			model.selectData[self.vo.id].push(self.selIndex);
		} else {
			self.selSate = 0;
			self.selBt.visible = true;
			self.escBt.visible = false;
			for (let i = 0; i < model.selectData[self.vo.id].length; i++) {
				if (model.selectData[self.vo.id][i] == self.selIndex) {
					model.selectData[self.vo.id].splice(i, 1);
					break;
				}
			}
		}
		if (self.callHande) {
			self.callHande.run();
		}
	}

	private selIndex = 0;
	private vo: Ibzjc_753;
	private selSate = 0;
	private callHande: Handler;
	public setVo(itemVo: IGridImpl, index: number, vo: Ibzjc_753, handler: Handler = null) {
		let self = this;
		let model = GGlobal.modelsgbz;
		self.callHande = handler;
		self.vo = vo;
		self.selIndex = index;
		self.grid.tipEnabled = true;
		self.grid.isShowEff = true;
		self.grid.vo = itemVo;
		self.nameLb.text = itemVo.name;
		self.nameLb.color = itemVo.qColor;
		if (model.selectData[vo.id] && model.selectData[vo.id].indexOf(index) != -1) {
			self.selSate = 1;
			self.selBt.visible = false;
			self.escBt.visible = true;
		} else {
			self.selSate = 0;
			self.selBt.visible = true;
			self.escBt.visible = false;
		}
		self.selBt.addClickListener(self.onSel, self);
		self.escBt.addClickListener(self.onSel, self);
	}

	public clean() {
		let self = this;
		self.grid.clean();
		self.callHande = null;
		self.selBt.removeClickListener(self.onSel, self);
		self.escBt.removeClickListener(self.onSel, self);
	}
}