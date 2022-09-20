/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemGiftBag extends fairygui.GComponent {

	public n1: fairygui.GImage;
	public n0: ViewGridRender;

	public static URL: string = "ui://0z9qzd94y1c12";

	public static createInstance(): ItemGiftBag {
		return <ItemGiftBag><any>(fairygui.UIPackage.createObject("giftBag", "ItemGiftBag"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n1 = <fairygui.GImage><any>(this.getChild("n1"));
		this.n0 = <ViewGridRender><any>(this.getChild("n0"));
		this.setChoose(false);
	}

	public setChoose(v){
		this.n1.visible = v;
	}

	public clean() {
		this.n0.clean();
		this.setChoose(false);
	}

	public index;
	public setDta(data: any[]) {
		this.index = data[0]-1;
		let cfg = data.slice(1,4);
		let vo = ConfigHelp.makeItem(cfg);
		this.n0.vo = vo;
		this.n0.grid.showEff(true);
		this.n0.grid.tipEnabled = false;
	}
}