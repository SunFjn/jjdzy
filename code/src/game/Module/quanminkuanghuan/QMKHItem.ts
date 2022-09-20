class QMKHItem extends fairygui.GComponent {

	public jifenLb: fairygui.GRichTextField;
	public drawBt: Button1;
	public goBt: Button0;
	public drawImg: fairygui.GImage;
	public gridArr: ViewGrid[] = []

	public static URL: string = "ui://vrex0iz4woj23";

	public static createInstance(): QMKHItem {
		return <QMKHItem><any>(fairygui.UIPackage.createObject("QMKH", "QMKHItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		a.jifenLb = <fairygui.GRichTextField><any>(a.getChild("jifenLb"));
		a.drawBt = <Button1><any>(a.getChild("drawBt"));
		a.goBt = <Button0><any>(a.getChild("goBt"));
		a.drawImg = <fairygui.GImage><any>(a.getChild("drawImg"));
		for (let i = 0; i < 4; i++) {
			let grid = <ViewGrid><any>(a.getChild("grid" + i));
			grid.isShowEff = true;
			a.gridArr.push(grid);
		}
		a.drawBt.addClickListener(a.OnDraw, a);
		a.goBt.addClickListener(a.OnDraw, a);
	}

	private OnDraw() {
		if (this.cfg.state == 0) {
			GGlobal.layerMgr.open(this.cfg.UI);
			return;
		}
		GGlobal.modelqmkh.CG_QUANMINKUANGHUAN_DRAWREWARD(this.cfg.id, this.panelId);
	}

	private cfg;
	private completedVal = 0;
	private panelId = 0;
	public show(cfg, value) {
		let a = this;
		let model = GGlobal.modelqmkh;
		a.cfg = cfg;
		a.panelId = value;
		a.completedVal = GGlobal.modelqmkh.completeObj[a.panelId];
		let color = a.completedVal >= cfg.yq ? 2 : 6;
		a.jifenLb.text = cfg.tips + HtmlUtil.fontNoSize("(" + a.completedVal + "/" + cfg.yq + ")", Color.getColorStr(color));
		if (!cfg.state) cfg.state = 0;
		if (cfg.state == 0 && a.completedVal >= cfg.yq) cfg.state = 1;
		a.drawImg.visible = cfg.state == 2;
		a.goBt.visible = cfg.state == 0;
		a.drawBt.visible = a.drawBt.checkNotice = cfg.state == 1;
		let reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		for (let i = 0; i < a.gridArr.length; i++) {
			let grid = a.gridArr[i];
			if (i < reward.length) {
				grid.visible = true;
				grid.vo = reward[i];
				grid.tipEnabled = true;
			} else {
				grid.visible = false;
			}
		}
	}

	public clean() {
		ConfigHelp.cleanGridEff(this.gridArr);
	}
}