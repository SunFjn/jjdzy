class ActCom_SGBZGrid1 extends fairygui.GComponent {

	public boxBt: fairygui.GButton;
	public grid: ViewGrid;
	public nameLb: fairygui.GRichTextField;

	public static URL: string = "ui://y9683xrpj158e";

	public static createInstance(): ActCom_SGBZGrid1 {
		return <ActCom_SGBZGrid1><any>(fairygui.UIPackage.createObject("ActComSGBZ", "ActCom_SGBZGrid1"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	private boxIndex = 0;
	public setVo(index: number, vo?: IGridImpl) {
		let self = this;
		self.boxIndex = index;
		if (vo) {
			self.grid.tipEnabled = true;
			self.grid.isShowEff = true;
			self.grid.vo = vo;
			self.boxBt.visible = false;
			self.grid.visible = true;
			self.nameLb.text = vo.name;
			self.nameLb.color = vo.qColor;
		} else {
			self.boxBt.visible = true;
			self.grid.visible = false;
			self.nameLb.text = "宝箱";
			self.nameLb.color = Color.getColorInt(1);
			self.boxBt.addClickListener(self.onBox, self);
		}
	}

	private onBox() {
		let self = this;
		let cfg;
		if (Config.cjxh_753[GGlobal.modelsgbz.drawNum + 1]) {
			cfg = Config.cjxh_753[GGlobal.modelsgbz.drawNum + 1];
		} else {
			cfg = Config.cjxh_753[GGlobal.modelsgbz.drawNum];
		}
		ViewAlert.show("是否花费" + HtmlUtil.fontNoSize(JSON.parse(cfg.xh)[0][2] + "元宝", Color.getColorStr(2)) + "开启宝箱？", Handler.create(self, function () {
			if (ConfigHelp.checkEnough(cfg.xh, false)) {
				GGlobal.modelsgbz.CG_CountryTreasure_getreward_8653(self.boxIndex);
			} else {
				ModelChongZhi.guideToRecharge();
			}
		}));
	}

	public clean() {
		let self = this;
		self.grid.clean();
		self.boxIndex = 0;
		self.boxBt.removeClickListener(self.onBox, self);
	}
}