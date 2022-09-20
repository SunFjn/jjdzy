/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

class FengHuoScoreItem extends fairygui.GComponent {

	public n10: fairygui.GImage;
	public n11: fairygui.GImage;
	public lbCondition: fairygui.GRichTextField;
	public n4: Button0;
	public n5: fairygui.GImage;

	public n1: ViewGrid;
	public n2: ViewGrid;
	public n3: ViewGrid;
	public n12: ViewGrid;

	public static URL: string = "ui://edvdots4kzd9l";

	public static createInstance(): FengHuoScoreItem {
		return <FengHuoScoreItem><any>(fairygui.UIPackage.createObject("FengHuoLY", "FengHuoScoreItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let sf = this;
		sf.n10 = <fairygui.GImage><any>(sf.getChild("n10"));
		sf.n11 = <fairygui.GImage><any>(sf.getChild("n11"));
		sf.lbCondition = <fairygui.GRichTextField><any>(sf.getChild("lbCondition"));
		sf.n1 = <ViewGrid><any>(sf.getChild("n1"));
		sf.n2 = <ViewGrid><any>(sf.getChild("n2"));
		sf.n3 = <ViewGrid><any>(sf.getChild("n3"));
		sf.n12 = <ViewGrid><any>(sf.getChild("n12"));
		sf.n4 = <Button0><any>(sf.getChild("n4"));
		sf.n5 = <fairygui.GImage><any>(sf.getChild("n5"));
		sf.n4.addClickListener(sf.onClick, sf)
		sf.grids = [sf.n1, sf.n2, sf.n3, sf.n12];
	}

	private onClick() {
		GGlobal.modelFengHuoLY.CG_SCOREAWARD_3569(this.idx);
	}

	private grids: ViewGrid[];
	public clean() {
		let sf = this;
		for (let i = 0; i < 4; i++) {
			sf.grids[i].showEff(false);
		}
	}

	idx;
	public setdata(data) {
		let sf = this;
		let idx = data[0];
		let state = data[1];
		this.idx = idx;
		let cfg = Config.fhlypotion_254[idx];
		sf.n5.visible = state == 2;
		sf.n4.visible = state != 2;
		sf.n4.enabled = state == 1;
		sf.n4.checkNotice = state == 1;
		let m = GGlobal.modelFengHuoLY.myScore;
		if (m >= cfg.potion) {
			sf.lbCondition.text = "积分达到<font color='#00FF00'>（" + m + "/" + cfg.potion + "）</font>"
		} else {
			sf.lbCondition.text = "积分达到<font color='#fe0000'>（" + m + "/" + cfg.potion + "）</font>"
		}
		let award = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		for (let i = 0; i < 4; i++) {
			if (award[i]) {
				sf.grids[i].visible = true;
				sf.grids[i].vo = award[i];
				sf.grids[i].showEff(true);
				sf.grids[i].tipEnabled = true;
			} else {
				sf.grids[i].showEff(false);
				sf.grids[i].visible = false;
			}
		}
	}
}