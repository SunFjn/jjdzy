/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewLvBuBox extends UIModalPanel {

	public frame: fairygui.GComponent;

	public static URL: string = "ui://47jfyc6eqcyl12";

	public static createInstance(): ViewLvBuBox {
		return <ViewLvBuBox><any>(fairygui.UIPackage.createObject("Boss", "ViewLvBuBox"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	public lbCondition: fairygui.GRichTextField;

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("Boss", "ViewLvBuBox").asCom;
		this.contentPane = this.view;
		this.frame = <fairygui.GComponent><any>(this.view.getChild("frame"));
		this.lbCondition = <fairygui.GRichTextField><any>(this.view.getChild("lbCondition"));
		super.childrenCreated();
		this.resetPosition();
	}

	protected grids: ViewGridRender[] = [];
	protected showAward(awards) {

		ConfigHelp.cleanGridview(this.grids);

		this.grids = ConfigHelp.addGridview(awards, this, 132, 140, true, false, 3, 120);
		ConfigHelp.centerGrid(this.grids,60, 140,4,120);
	}

	protected onShown() {
		var id = this._args.rank;
		this.lbCondition.text = " 排名达到第"+id+"名可领取";
		var vos = ConfigHelp.makeItemListArr(this._args.data);
		this.showAward(vos)
	}

	protected onHide() {
		ConfigHelp.cleanGridview(this.grids);
		GGlobal.layerMgr.close(UIConst.LVBUBOX);
	}
}