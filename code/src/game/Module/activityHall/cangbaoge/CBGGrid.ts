/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class CBGGrid extends fairygui.GComponent {

	public grid: ViewGrid;
	public imgSelected: fairygui.GImage;
	public imgSepurise: fairygui.GImage;

	public static URL: string = "ui://1tr9e6d8m0yoz";

	public static createInstance(): CBGGrid {
		return <CBGGrid><any>(fairygui.UIPackage.createObject("cangbaoge", "CBGGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.grid = <ViewGrid><any>(this.getChild("grid"));
		this.imgSelected = <fairygui.GImage><any>(this.getChild("imgSelected"));
		this.imgSepurise = <fairygui.GImage><any>(this.getChild("imgSepurise"));
		this.imgSelected.visible = false;
	}

	public showBgEffect(val) {
		this.imgSelected.visible = val;
	}

	public showGetEffect() {
		EffectMgr.addEff("uieff/" + 10007, this.displayListContainer, 50, 50, 1000, 1000, false);
	}

	idx = 0;
	public setvo(vo: IGridImpl, isBig = false) {
		this.grid.vo = vo;
		this.grid.showEff(true);
		this.grid.tipEnabled = true;
		if(vo){
			this.idx = vo.id;
		}
		this.imgSepurise.visible = isBig;
	}

	public setEffect(v){
		this.grid.showEff(v);
	}
}