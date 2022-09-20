class CaoCaotem extends fairygui.GComponent {

	public lbRank: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbLv: fairygui.GRichTextField;
	public btnCheck: fairygui.GButton;

	public static URL: string = "ui://n6fub9ddeq414";

	public static createInstance(): CaoCaotem {
		return <CaoCaotem><any>(fairygui.UIPackage.createObject("CaoCaoLaiXi", "CaoCaotem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	private onCheck() {
		let self = this;
		for (let key in Config.cclxpm_754) {
			let rankArr = JSON.parse(Config.cclxpm_754[key].mc);
			if (self.rank >= rankArr[0][0] && self.rank <= rankArr[0][1]) {
				let arr = JSON.parse(Config.cclxpm_754[key].jl);
				GGlobal.layerMgr.open(UIConst.CAOCAO_LAIXI_BOX, { rank: self.rank, data: arr });
				break;
			}
		}
	}

	private rank: number = 0;
	public setdata(data: any[]) {
		let self = this;
		self.rank = data[0];
		self.lbRank.text = "" + data[0];
		self.lbName.text = "" + data[1];
		self.lbLv.text = "" + ConfigHelp.getYiWanText(data[2]);
		self.btnCheck.addClickListener(self.onCheck, self);
	}

	public clean() {
		let self = this;
		self.btnCheck.removeClickListener(self.onCheck, self);
	}
}