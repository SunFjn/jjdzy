/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class SMCard extends fairygui.GComponent {

	public grid: ViewGrid;
	public lbLv: fairygui.GRichTextField;
	public btn: fairygui.GButton;

	public static URL: string = "ui://gf2tw9lz77k9e";

	public static createInstance(): SMCard {
		return <SMCard><any>(fairygui.UIPackage.createObject("superMarbles", "SMCard"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	clickHD = () => {
		if (GGlobal.modelSuperMarbles.closeNum >= 3) {
			if (this.state == 1) {
				GGlobal.modelSuperMarbles.CG_optAwards(this.idx, this.state ==1? 2 : 1);
			} else {
				ViewCommonWarn.text("最多只可屏蔽3份");
				GGlobal.control.notify(UIConst.ACTCOMCJDZ);
			}
		} else {

			GGlobal.modelSuperMarbles.CG_optAwards(this.idx, this.state==1 ? 2 : 1);
		}
	}

	public clean() {
		const self = this;
		self.grid.vo = null;
		self.btn.removeClickListener(self.clickHD, self);
	}

	idx = 0;
	state = 0;
	public setdata(data: { idx: number, type: number, id: number, count: number, isclose: number }, idx) {
		const self = this;
		let vo: IGridImpl = ConfigHelp.makeItem([data.type, data.id, data.count]);
		self.grid.isShowEff = true;
		self.grid.tipEnabled = true;
		self.grid.vo = vo;
		self.btn.addClickListener(self.clickHD, self);
		self.state = data.isclose;
		self.btn['setState'](data.isclose == 1 ? fairygui.GButton.DOWN : fairygui.GButton.UP);
		self.lbLv.text = ["一", "二", "三", "四", "五", "五", "五"][idx] + "等奖";
		self.idx = idx + 1;
	}
}